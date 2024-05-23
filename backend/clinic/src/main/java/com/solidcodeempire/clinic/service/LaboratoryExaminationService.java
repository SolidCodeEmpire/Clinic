package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.enums.ExaminationStatus;
import com.solidcodeempire.clinic.exception.EntityNotFoundException;
import com.solidcodeempire.clinic.model.*;
import com.solidcodeempire.clinic.modelDTO.LaboratoryExaminationDTO;
import com.solidcodeempire.clinic.repository.ExaminationDictionaryRepository;
import com.solidcodeempire.clinic.repository.LaboratoryExaminationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LaboratoryExaminationService {
    final private LaboratoryExaminationRepository laboratoryExaminationRepository;
    final private ExaminationDictionaryRepository examinationDictionaryRepository;
    final private AppointmentService appointmentService;
    final private LabTechnicianService labTechnicianService;
    final private LabSupervisorService labSupervisorService;

    public Iterable<LaboratoryExaminationDTO> getLaboratoryExaminationsList(Integer appointmentId) {
        return laboratoryExaminationRepository.findAllLaboratoryExaminations(appointmentId);
    }

    public LaboratoryExamination getLaboratoryExaminationById(int id) {
        return laboratoryExaminationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Laboratory Examination"));
    }

    public void createLaboratoryExamination(LaboratoryExamination newlaboratoryExamination, int appointmentId, int labTechnicianId, int labSupervisorId, String code) {
        Appointment appointment = appointmentService.getAppointmentById(appointmentId);
        LabTechnician labTechnician = labTechnicianService.getLabTechnicianById(labTechnicianId);
        LabSupervisor labSupervisor = labSupervisorService.getLabSupervisorById(labSupervisorId);
        ExaminationDictionary examinationDictionary = examinationDictionaryRepository.findByCode(code);
        newlaboratoryExamination.setId(0);
        newlaboratoryExamination.setStatus(ExaminationStatus.REGISTERED);
        newlaboratoryExamination.setAppointment(appointment);
        newlaboratoryExamination.setLabSupervisor(labSupervisor);
        newlaboratoryExamination.setLabTechnician(labTechnician);
        newlaboratoryExamination.setExaminationDictionary(examinationDictionary);
        if(examinationDictionary != null){
            laboratoryExaminationRepository.save(newlaboratoryExamination);
        }
    }

    public void deleteLaboratoryExamination(int id) {
        LaboratoryExamination laboratoryExamination = getLaboratoryExaminationById(id);
        laboratoryExamination.setStatus(ExaminationStatus.CANCELLED);
        laboratoryExaminationRepository.save(laboratoryExamination);
    }

    public void updateLaboratoryExamination(LaboratoryExamination newlaboratoryExamination, int appointmentId, int labTechnicianId, int labSupervisorId, String code) {
        LaboratoryExamination laboratoryExamination = getLaboratoryExaminationById(newlaboratoryExamination.getId());
        Appointment appointment = appointmentService.getAppointmentById(appointmentId);
        LabTechnician labTechnician = labTechnicianService.getLabTechnicianById(labTechnicianId);
        LabSupervisor labSupervisor = labSupervisorService.getLabSupervisorById(labSupervisorId);
        ExaminationDictionary examinationDictionary = examinationDictionaryRepository.findByCode(code);
        newlaboratoryExamination.setId(laboratoryExamination.getId());
        newlaboratoryExamination.setAppointment(appointment);
        newlaboratoryExamination.setLabSupervisor(labSupervisor);
        newlaboratoryExamination.setLabTechnician(labTechnician);
        newlaboratoryExamination.setExaminationDictionary(examinationDictionary);
        if(examinationDictionary != null){
            laboratoryExaminationRepository.save(newlaboratoryExamination);
        }
    }
}
