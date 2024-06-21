package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.enums.ExaminationStatus;
import com.solidcodeempire.clinic.enums.UserType;
import com.solidcodeempire.clinic.exception.EntityNotFoundException;
import com.solidcodeempire.clinic.model.*;
import com.solidcodeempire.clinic.modelDTO.ClinicUserDTO;
import com.solidcodeempire.clinic.modelDTO.LaboratoryExaminationDTO;
import com.solidcodeempire.clinic.repository.LaboratoryExaminationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class LaboratoryExaminationService {

    private final LaboratoryExaminationRepository laboratoryExaminationRepository;
    private final ClinicUserService clinicUserService;
    private final ExaminationDictionaryService examinationDictionaryService;
    private final AppointmentService appointmentService;
    private final LabTechnicianService labTechnicianService;
    private final LabSupervisorService labSupervisorService;

    public Iterable<LaboratoryExaminationDTO> getLaboratoryExaminationsList(Integer appointmentId, Integer doctorId, ExaminationStatus status, Date date) {
            return laboratoryExaminationRepository.findAllLaboratoryExaminations(appointmentId, doctorId, status, date);
    }

    public LaboratoryExamination getLaboratoryExaminationById(int id) {
        return laboratoryExaminationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Laboratory Examination"));
    }

    public void createLaboratoryExamination(LaboratoryExamination newlaboratoryExamination, int appointmentId, int labTechnicianId, int labSupervisorId, String code) {
        Appointment appointment = appointmentService.getAppointmentById(appointmentId);
        ExaminationDictionary examinationDictionary = examinationDictionaryService.getExaminationDictionaryById(code);

        newlaboratoryExamination.setId(0);
        newlaboratoryExamination.setStatus(ExaminationStatus.REGISTERED);
        newlaboratoryExamination.setValidationDate(null);
        newlaboratoryExamination.setFinishedDate(null);
        newlaboratoryExamination.setSupervisorsNotes(null);
        newlaboratoryExamination.setResult(null);
        newlaboratoryExamination.setAppointment(appointment);
        newlaboratoryExamination.setExaminationDictionary(examinationDictionary);

        if(labTechnicianId != 0){
            LabTechnician labTechnician = labTechnicianService.getLabTechnicianById(labTechnicianId);
            newlaboratoryExamination.setLabTechnician(labTechnician);
        }
        else {
            newlaboratoryExamination.setLabTechnician(null);
        }

        if(labSupervisorId != 0) {
            LabSupervisor labSupervisor = labSupervisorService.getLabSupervisorById(labSupervisorId);
            newlaboratoryExamination.setLabSupervisor(labSupervisor);
        }
        else {
            newlaboratoryExamination.setLabSupervisor(null);
        }

        laboratoryExaminationRepository.save(newlaboratoryExamination);
    }

    public void deleteLaboratoryExamination(int id) {
        LaboratoryExamination laboratoryExamination = getLaboratoryExaminationById(id);
        laboratoryExamination.setStatus(ExaminationStatus.CANCELLED);
        laboratoryExaminationRepository.save(laboratoryExamination);
    }

    public void archiveLaboratoryExamination(LaboratoryExamination laboratoryExamination){
        laboratoryExamination.setStatus(ExaminationStatus.ARCHIVED);
    }

    public void updateLaboratoryExamination(int id, LaboratoryExaminationDTO laboratoryExaminationDTO){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ClinicUserDTO user = clinicUserService.getUserById(((ClinicUser)auth.getPrincipal()).getId());

        int userRoleId = user.getRoleId();
        LaboratoryExamination oldExamination = getLaboratoryExaminationById(id);

        ExaminationStatus status = laboratoryExaminationDTO.getStatus();
        switch (user.getUserType()) {
            case LAB_TECHNICIAN -> {
                if (status == ExaminationStatus.DONE && oldExamination.getStatus() == ExaminationStatus.REGISTERED) {
                    LaboratoryExamination newExamination = cloneLabExam(oldExamination);

                    LabTechnician technician = labTechnicianService.getLabTechnicianById(userRoleId);
                    newExamination.setLabTechnician(technician);
                    newExamination.setStatus(ExaminationStatus.DONE);
                    newExamination.setResult(laboratoryExaminationDTO.getResult());
                    newExamination.setFinishedDate(new Timestamp(System.currentTimeMillis()));
                    laboratoryExaminationRepository.save(newExamination);

                } else if (status == ExaminationStatus.CANCELLED && oldExamination.getStatus() == ExaminationStatus.REGISTERED) {
                    LaboratoryExamination newExamination = cloneLabExam(oldExamination);

                    LabTechnician technician = labTechnicianService.getLabTechnicianById(userRoleId);
                    newExamination.setLabTechnician(technician);
                    newExamination.setStatus(ExaminationStatus.CANCELLED);

                    laboratoryExaminationRepository.save(newExamination);
                }
            }
            case LAB_SUPERVISOR -> {
                if ((status == ExaminationStatus.INVALIDATED || status == ExaminationStatus.VALIDATED) && oldExamination.getStatus() == ExaminationStatus.DONE) {
                    LaboratoryExamination newExamination = cloneLabExam(oldExamination);
                    LabSupervisor supervisor = labSupervisorService.getLabSupervisorById(userRoleId);

                    newExamination.setLabSupervisor(supervisor);
                    newExamination.setStatus(status);
                    newExamination.setSupervisorsNotes(laboratoryExaminationDTO.getSupervisorsNotes());
                    if(status == ExaminationStatus.VALIDATED){
                        newExamination.setValidationDate(new Timestamp(System.currentTimeMillis()));
                    }
                    laboratoryExaminationRepository.save(newExamination);
                }
            }
            default -> {
                // WRONG USER
            }
        }
        oldExamination.setStatus(ExaminationStatus.ARCHIVED);
        laboratoryExaminationRepository.save(oldExamination);
    }

    private LaboratoryExamination cloneLabExam(LaboratoryExamination oldExam) {
        LaboratoryExamination newExam = new LaboratoryExamination();
        newExam.setResult(oldExam.getResult());
        newExam.setDoctorsNotes(oldExam.getDoctorsNotes());
        newExam.setOrderDate(oldExam.getOrderDate());
        newExam.setFinishedDate(oldExam.getFinishedDate());
        newExam.setSupervisorsNotes(oldExam.getSupervisorsNotes());
        newExam.setValidationDate(oldExam.getValidationDate());
        newExam.setStatus(oldExam.getStatus());
        newExam.setLabTechnician(oldExam.getLabTechnician());
        newExam.setLabSupervisor(oldExam.getLabSupervisor());
        newExam.setExaminationDictionary(oldExam.getExaminationDictionary());
        newExam.setAppointment(oldExam.getAppointment());

        return newExam;
    }

    public void cloneLabExam(LaboratoryExamination oldExam, Appointment appointment) {
        LaboratoryExamination newExam = cloneLabExam(oldExam);
        newExam.setAppointment(appointment);

        laboratoryExaminationRepository.save(newExam);
    }
}
