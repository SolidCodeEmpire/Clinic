package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.exception.EntityNotFoundException;
import com.solidcodeempire.clinic.model.LabSupervisor;
import com.solidcodeempire.clinic.modelDTO.ClinicUserDTO;
import com.solidcodeempire.clinic.repository.LabSupervisorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LabSupervisorService {
    final private LabSupervisorRepository labSupervisorRepository;

    public List<ClinicUserDTO> getDetailedLabSupervisorsList() {
        return labSupervisorRepository.findAllLabSupervisorsAdministrator();
    }

    public Iterable<LabSupervisor> getLabSupervisorsList() {
        return labSupervisorRepository.findAllLabSupervisors();
    }

    public ClinicUserDTO getDetailedLabSupervisorById(int id) {
        return labSupervisorRepository.findLabSupervisorById(id)
                .orElseThrow(() -> new EntityNotFoundException("Lab Supervisor"));
    }

    public LabSupervisor getLabSupervisorById(int id) {
        return labSupervisorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Lab Supervisor"));
    }

    public void saveLabSupervisor(LabSupervisor newLabSupervisor) {
        labSupervisorRepository.save(newLabSupervisor);
    }

}
