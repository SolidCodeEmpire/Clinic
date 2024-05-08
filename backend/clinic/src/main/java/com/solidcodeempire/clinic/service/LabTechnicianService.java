package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.enums.UserType;
import com.solidcodeempire.clinic.model.ClinicUser;
import com.solidcodeempire.clinic.model.LabTechnician;
import com.solidcodeempire.clinic.modelDTO.LabTechnicianManagementDTO;
import com.solidcodeempire.clinic.repository.ClinicUserRepository;
import com.solidcodeempire.clinic.repository.LabTechnicianRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LabTechnicianService {
    final private LabTechnicianRepository labTechnicianRepository;
    final private ClinicUserRepository clinicUserRepository;

    public Iterable<LabTechnicianManagementDTO> getDetailedLabTechniciansList(){
        return labTechnicianRepository.findAllLabTechniciansAdministrator();
    }

    //TODO N+1 problem
    public Iterable<LabTechnician> getLabTechniciansList() {
        return labTechnicianRepository.findAll();
    }

    public LabTechnician getLabTechnicianById(int id) {
        return labTechnicianRepository.findById(id);
    }

    @Transactional
    public void createLabTechnician(LabTechnician newLabTechnician) {
        newLabTechnician.setId(0);
        ClinicUser newUser = newLabTechnician.getUser();
        newUser.setId(0);
        newUser.setIsActive(true);
        newUser.setUserType(UserType.LAB_TECHNICIAN);
        newUser.setLabTechnician(newLabTechnician);
        labTechnicianRepository.save(newLabTechnician);
        clinicUserRepository.save(newUser);
    }

    public void deleteLabTechnician(int id) {
        LabTechnician labTechnician = labTechnicianRepository.findById(id);
        ClinicUser user =  labTechnician.getUser();
        user.setIsActive(false);
        clinicUserRepository.save(user);
    }

    public void updateLabTechnician(LabTechnician newLabTechnician) {
        LabTechnician labTechnician = labTechnicianRepository.findById(newLabTechnician.getId());
        ClinicUser newUser = newLabTechnician.getUser();
        newUser.setId(labTechnician.getUser().getId());
        newUser.setUserType(UserType.LAB_TECHNICIAN);
        newUser.setLabTechnician(newLabTechnician);
        labTechnicianRepository.save(newLabTechnician);
        clinicUserRepository.save(newUser);
    }
}
