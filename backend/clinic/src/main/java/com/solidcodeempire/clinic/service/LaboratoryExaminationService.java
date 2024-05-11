package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.enums.ExaminationStatus;
import com.solidcodeempire.clinic.model.*;
import com.solidcodeempire.clinic.modelDTO.LaboratoryExaminationDTO;
import com.solidcodeempire.clinic.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LaboratoryExaminationService {
    final private LaboratoryExaminationRepository laboratoryExaminationRepository;
    final private AppointmentRepository appointmentRepository;
    final private LabSupervisorRepository labSupervisorRepository;
    final private LabTechnicianRepository labTechnicianRepository;
    final private ExaminationDictionaryRepository examinationDictionaryRepository;

    public Iterable<LaboratoryExaminationDTO> getLaboratoryExaminationsList() {
        return laboratoryExaminationRepository.findAllLaboratoryExaminations();
    }

    public LaboratoryExamination getLaboratoryExaminationById(int id) {
        return laboratoryExaminationRepository.findById(id);
    }

    public void createLaboratoryExamination(LaboratoryExamination newlaboratoryExamination, int appointmentId, int labTechnicianId, int labSupervisorId, String code) {
        Appointment appointment = appointmentRepository.findById(appointmentId);
        LabTechnician labTechnician = labTechnicianRepository.findById(labTechnicianId);
        LabSupervisor labSupervisor = labSupervisorRepository.findById(labSupervisorId);
        ExaminationDictionary examinationDictionary = examinationDictionaryRepository.findByCode(code);
        newlaboratoryExamination.setId(0);
        newlaboratoryExamination.setStatus(ExaminationStatus.REGISTERED);
        newlaboratoryExamination.setAppointment(appointment);
        newlaboratoryExamination.setLabSupervisor(labSupervisor);
        newlaboratoryExamination.setLabTechnician(labTechnician);
        newlaboratoryExamination.setExaminationDictionary(examinationDictionary);
        if(appointment != null && labTechnician != null && labSupervisor != null && examinationDictionary != null){
            laboratoryExaminationRepository.save(newlaboratoryExamination);
        }
    }

    public void deleteLaboratoryExamination(int id) {
        LaboratoryExamination laboratoryExamination = laboratoryExaminationRepository.findById(id);
        laboratoryExamination.setStatus(ExaminationStatus.CANCELLED);
        laboratoryExaminationRepository.save(laboratoryExamination);
    }

    public void updateLaboratoryExamination(LaboratoryExamination newlaboratoryExamination, int appointmentId, int labTechnicianId, int labSupervisorId, String code) {
        LaboratoryExamination laboratoryExamination = laboratoryExaminationRepository.findById(newlaboratoryExamination.getId());
        Appointment appointment = appointmentRepository.findById(appointmentId);
        LabTechnician labTechnician = labTechnicianRepository.findById(labTechnicianId);
        LabSupervisor labSupervisor = labSupervisorRepository.findById(labSupervisorId);
        ExaminationDictionary examinationDictionary = examinationDictionaryRepository.findByCode(code);
        newlaboratoryExamination.setId(laboratoryExamination.getId());
        newlaboratoryExamination.setAppointment(appointment);
        newlaboratoryExamination.setLabSupervisor(labSupervisor);
        newlaboratoryExamination.setLabTechnician(labTechnician);
        newlaboratoryExamination.setExaminationDictionary(examinationDictionary);
        if(appointment != null && labTechnician != null && labSupervisor != null && examinationDictionary != null){
            laboratoryExaminationRepository.save(newlaboratoryExamination);
        }
    }
}
