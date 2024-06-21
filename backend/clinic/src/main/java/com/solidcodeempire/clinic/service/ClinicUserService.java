package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.exception.EntityNotFoundException;
import com.solidcodeempire.clinic.exception.UserExistsException;
import com.solidcodeempire.clinic.model.*;
import com.solidcodeempire.clinic.modelDTO.ClinicUserDTO;
import com.solidcodeempire.clinic.repository.ClinicUserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClinicUserService{

    private final MedicalRegistrarService medicalRegistrarService;
    private final DoctorService doctorService;
    private final LabTechnicianService labTechnicianService;
    private final LabSupervisorService labSupervisorService;
    private final ClinicUserRepository clinicUserRepository;
    private final PasswordEncoder passwordEncoder;

    public List<ClinicUserDTO> getUsersList() {
        List<ClinicUserDTO> doctors = doctorService.getDetailedDoctorsList();
        List<ClinicUserDTO> medicalRegistrars = medicalRegistrarService.getDetailedMedicalRegistrarsList();
        List<ClinicUserDTO> labSupervisors = labSupervisorService.getDetailedLabSupervisorsList();
        List<ClinicUserDTO> labTechnicians = labTechnicianService.getDetailedLabTechniciansList();
        List<ClinicUserDTO> users = new ArrayList<>();
        users.addAll(doctors);
        users.addAll(medicalRegistrars);
        users.addAll(labSupervisors);
        users.addAll(labTechnicians);
        return users;
    }

    public ClinicUserDTO getUserById(int id) {
        ClinicUser clinicUser = clinicUserRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User"));
        return switch (clinicUser.getUserType()) {
            case DOCTOR -> doctorService.getDetailedDoctorById(id);
            case LAB_TECHNICIAN -> labTechnicianService.getDetailedLabTechnicianById(id);
            case LAB_SUPERVISOR -> labSupervisorService.getDetailedLabSupervisorById(id);
            case MEDICAL_REGISTRAR -> medicalRegistrarService.getDetailedMedicalRegistrarById(id);
            case ADMIN -> clinicUserRepository.findDTOById(id)
                    .orElseThrow(() -> new EntityNotFoundException("User"));
        };
    }

    public void deleteUser(int id) {
        ClinicUser clinicUser = clinicUserRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User"));
        clinicUser.setIsActive(false);
        clinicUserRepository.save(clinicUser);
    }

    @Transactional
    public void createUser(ClinicUser clinicUser, Object dto) {

        if (clinicUserRepository.findByUsername(clinicUser.getUsername()).isPresent()){
            throw new UserExistsException();
        }

        ClinicUser user = new ClinicUser();
        user.setUsername(clinicUser.getUsername());
        user.setEmail(clinicUser.getEmail());
        user.setPassword(passwordEncoder.encode(clinicUser.getPassword()));
        user.setUserType(clinicUser.getUserType());
        user.setIsActive(true);

        switch (user.getUserType()) {
            case DOCTOR -> {
                Doctor doctor = (Doctor) dto;
                doctor.setId(0);
                user.setDoctor(doctor);
                doctor.setUser(user);
                doctorService.saveDoctor(doctor);
            }
            case LAB_TECHNICIAN -> {
                LabTechnician labTechnician = (LabTechnician) dto;
                labTechnician.setId(0);
                user.setLabTechnician(labTechnician);
                labTechnician.setUser(user);
                labTechnicianService.saveLabTechnician(labTechnician);
            }
            case LAB_SUPERVISOR -> {
                LabSupervisor labSupervisor = (LabSupervisor) dto;
                labSupervisor.setId(0);
                user.setLabSupervisor(labSupervisor);
                labSupervisor.setUser(user);
                labSupervisorService.saveLabSupervisor(labSupervisor);
            }
            case MEDICAL_REGISTRAR -> {
                MedicalRegistrar medicalRegistrar = (MedicalRegistrar) dto;
                medicalRegistrar.setId(0);
                user.setMedicalRegistrar(medicalRegistrar);
                medicalRegistrar.setUser(user);
                medicalRegistrarService.saveMedicalRegistrar(medicalRegistrar);
            }
            case ADMIN -> {}
        }
        clinicUserRepository.save(user);
    }

    @Transactional
    public void updateUser(ClinicUser clinicUser, Object dto) {
        deleteUser(clinicUser.getId());
        ClinicUserDTO oldUser = getUserById(clinicUser.getId());
        if(clinicUser.getPassword().isEmpty()){
            clinicUser.setPassword(oldUser.getPassword());
        }
        createUser(clinicUser, dto);
    }
}
