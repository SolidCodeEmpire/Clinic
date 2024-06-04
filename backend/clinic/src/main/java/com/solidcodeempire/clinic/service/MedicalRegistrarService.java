package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.exception.EntityNotFoundException;
import com.solidcodeempire.clinic.model.MedicalRegistrar;
import com.solidcodeempire.clinic.modelDTO.ClinicUserDTO;
import com.solidcodeempire.clinic.modelDTO.MedicalRegistrarDTO;
import com.solidcodeempire.clinic.repository.MedicalRegistrarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicalRegistrarService {

    private final MedicalRegistrarRepository medicalRegistrarRepository;

    public List<ClinicUserDTO> getDetailedMedicalRegistrarsList() {
        return medicalRegistrarRepository.findAllDetailedMedicalRegistrar();
    }

    public Iterable<MedicalRegistrarDTO> getMedicalRegistrarsList() {
        return medicalRegistrarRepository.findAllMedicalRegistrar();
    }

    public MedicalRegistrar getMedicalRegistrarById(int id) {
        return medicalRegistrarRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Medical Registrar"));
    }

    public ClinicUserDTO getDetailedMedicalRegistrarById(int id) {
        return medicalRegistrarRepository.findDetailedMedicalRegistrarById(id)
                .orElseThrow(() -> new EntityNotFoundException("Medical Registrar"));
    }

    public void saveMedicalRegistrar(MedicalRegistrar newMedicalRegistrar) {
        medicalRegistrarRepository.save(newMedicalRegistrar);
    }
}
