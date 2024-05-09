package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.enums.UserType;
import com.solidcodeempire.clinic.model.ClinicUser;
import com.solidcodeempire.clinic.model.LabSupervisor;
import com.solidcodeempire.clinic.model.LabTechnician;
import com.solidcodeempire.clinic.modelDTO.LabSupervisorManagementDTO;
import com.solidcodeempire.clinic.repository.ClinicUserRepository;
import com.solidcodeempire.clinic.repository.LabSupervisorRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LabSupervisorService {
    final private LabSupervisorRepository labSupervisorRepository;
    final private ClinicUserRepository clinicUserRepository;

    public Iterable<LabSupervisorManagementDTO> getDetailedLabSupervisorsList() {
        return labSupervisorRepository.findAllLabSupervisorsAdministrator();
    }

    public Iterable<LabSupervisor> getLabSupervisorsList() {
        return labSupervisorRepository.findAll();
    }

    public LabSupervisor getLabSupervisorById(int id) {
        return labSupervisorRepository.findById(id);
    }

    @Transactional
    public void createLabSupervisor(LabSupervisor newLabSupervisor) {
        newLabSupervisor.setId(0);
        ClinicUser newUser = newLabSupervisor.getUser();
        newUser.setId(0);
        newUser.setIsActive(true);
        newUser.setUserType(UserType.LAB_SUPERVISOR);
        newUser.setLabSupervisor(newLabSupervisor);
        labSupervisorRepository.save(newLabSupervisor);
        clinicUserRepository.save(newUser);
    }

    public void deleteLabSupervisor(int id) {
        LabSupervisor labSupervisor = labSupervisorRepository.findById(id);
        ClinicUser user =  labSupervisor.getUser();
        user.setIsActive(false);
        clinicUserRepository.save(user);
    }

    public void updateLabSupervisor(LabSupervisor newLabSupervisor) {
        LabSupervisor labSupervisor = labSupervisorRepository.findById(newLabSupervisor.getId());
        ClinicUser newUser = newLabSupervisor.getUser();
        newUser.setId(labSupervisor.getUser().getId());
        newUser.setUserType(UserType.LAB_SUPERVISOR);
        newUser.setLabSupervisor(newLabSupervisor);
        labSupervisorRepository.save(newLabSupervisor);
        clinicUserRepository.save(newUser);
    }
}
