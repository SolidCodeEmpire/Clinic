package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.exception.EntityNotFoundException;
import com.solidcodeempire.clinic.model.LabTechnician;
import com.solidcodeempire.clinic.modelDTO.ClinicUserDTO;
import com.solidcodeempire.clinic.repository.LabTechnicianRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LabTechnicianService {

    private final LabTechnicianRepository labTechnicianRepository;

    public List<ClinicUserDTO> getDetailedLabTechniciansList(){
        return labTechnicianRepository.findAllLabTechniciansAdministrator();
    }

    public Iterable<LabTechnician> getLabTechniciansList() {
        return labTechnicianRepository.findAllLabTechnicians();
    }

    public ClinicUserDTO getDetailedLabTechnicianById(int id) {
        return labTechnicianRepository.findLabTechnicianById(id)
                .orElseThrow(() -> new EntityNotFoundException("Lab Technician"));
    }

    public LabTechnician getLabTechnicianById(int id) {
        return labTechnicianRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Lab Technician"));
    }

    public void saveLabTechnician(LabTechnician newLabTechnician) {
        labTechnicianRepository.save(newLabTechnician);
    }

}
