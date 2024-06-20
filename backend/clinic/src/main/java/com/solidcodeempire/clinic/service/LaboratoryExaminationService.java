package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.enums.ExaminationStatus;
import com.solidcodeempire.clinic.exception.EntityNotFoundException;
import com.solidcodeempire.clinic.model.*;
import com.solidcodeempire.clinic.modelDTO.LaboratoryExaminationDTO;
import com.solidcodeempire.clinic.repository.LaboratoryExaminationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class LaboratoryExaminationService {

    private final LaboratoryExaminationRepository laboratoryExaminationRepository;
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

    public void cloneLabExam(LaboratoryExamination oldExam, Appointment appointment) {
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
        newExam.setAppointment(appointment);

        laboratoryExaminationRepository.save(newExam);
}

    public void createLaboratoryExamination(LaboratoryExamination newlaboratoryExamination, int appointmentId, int labTechnicianId, int labSupervisorId, String code) {
        Appointment appointment = appointmentService.getAppointmentById(appointmentId);

        ExaminationDictionary examinationDictionary = examinationDictionaryService.getExaminationDictionaryById(code);
        newlaboratoryExamination.setId(0);
        newlaboratoryExamination.setStatus(ExaminationStatus.REGISTERED);
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
}
