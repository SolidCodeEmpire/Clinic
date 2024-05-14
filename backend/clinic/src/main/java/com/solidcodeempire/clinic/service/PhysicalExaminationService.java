package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.enums.ExaminationStatus;
import com.solidcodeempire.clinic.model.Appointment;
import com.solidcodeempire.clinic.model.ExaminationDictionary;
import com.solidcodeempire.clinic.model.LaboratoryExamination;
import com.solidcodeempire.clinic.model.PhysicalExamination;
import com.solidcodeempire.clinic.modelDTO.LaboratoryExaminationDTO;
import com.solidcodeempire.clinic.modelDTO.PhysicalExaminationDTO;
import com.solidcodeempire.clinic.repository.AppointmentRepository;
import com.solidcodeempire.clinic.repository.ExaminationDictionaryRepository;
import com.solidcodeempire.clinic.repository.PhysicalExaminationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PhysicalExaminationService {
    final private PhysicalExaminationRepository physicalExaminationRepository;
    final private ExaminationDictionaryRepository examinationDictionaryRepository;
    final private AppointmentRepository appointmentRepository;

    public Iterable<PhysicalExaminationDTO> getPhysicalExaminationsList() {
        return physicalExaminationRepository.findAllPhysicalExaminations();
    }

    public PhysicalExamination getPhysicalExaminationById(int id) {
        return physicalExaminationRepository.findById(id);
    }

    public void createPhysicalExamination(PhysicalExamination newPhysicalExamination, int appointmentId, String code) {
        Appointment appointment = appointmentRepository.findById(appointmentId);
        ExaminationDictionary examinationDictionary = examinationDictionaryRepository.findByCode(code);
        newPhysicalExamination.setId(0);
        newPhysicalExamination.setAppointment(appointment);
        newPhysicalExamination.setExaminationDictionary(examinationDictionary);
        if(appointment != null && examinationDictionary != null){
            physicalExaminationRepository.save(newPhysicalExamination);
        }
    }

    public void updatePhysicalExamination(PhysicalExamination newPhysicalExamination, int appointmentId, String code) {
        PhysicalExamination physicalExamination = physicalExaminationRepository.findById(newPhysicalExamination.getId());
        Appointment appointment = appointmentRepository.findById(appointmentId);
        ExaminationDictionary examinationDictionary = examinationDictionaryRepository.findByCode(code);
        newPhysicalExamination.setId(physicalExamination.getId());
        newPhysicalExamination.setAppointment(appointment);
        newPhysicalExamination.setExaminationDictionary(examinationDictionary);
        if(appointment != null && examinationDictionary != null){
            physicalExaminationRepository.save(newPhysicalExamination);
        }
    }
}