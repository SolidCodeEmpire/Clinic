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

    public void createLaboratoryExamination(LaboratoryExamination newlaboratoryExamination, int appointmentId, int labTechnicianId, int labSupervisorId, String code) {
        Appointment appointment = appointmentService.getAppointmentById(appointmentId);
        ExaminationDictionary examinationDictionary = examinationDictionaryService.getExaminationDictionaryById(code);
        newlaboratoryExamination.setId(0);
        newlaboratoryExamination.setStatus(ExaminationStatus.REGISTERED);
        newlaboratoryExamination.setAppointment(appointment);
        if(labTechnicianId != 0){
            LabTechnician labTechnician = labTechnicianService.getLabTechnicianById(labTechnicianId);
            newlaboratoryExamination.setLabTechnician(labTechnician);
        }
        else newlaboratoryExamination.setLabTechnician(null);
        if(labSupervisorId != 0) {
            LabSupervisor labSupervisor = labSupervisorService.getLabSupervisorById(labSupervisorId);
            newlaboratoryExamination.setLabSupervisor(labSupervisor);
        }
        else newlaboratoryExamination.setLabSupervisor(null);
        newlaboratoryExamination.setExaminationDictionary(examinationDictionary);
        laboratoryExaminationRepository.save(newlaboratoryExamination);
    }

    public void deleteLaboratoryExamination(int id) {
        LaboratoryExamination laboratoryExamination = getLaboratoryExaminationById(id);
        laboratoryExamination.setStatus(ExaminationStatus.CANCELLED);
        laboratoryExaminationRepository.save(laboratoryExamination);
    }
}
