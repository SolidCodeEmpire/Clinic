package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.enums.UserType;
import com.solidcodeempire.clinic.exception.EntityNotFoundException;
import com.solidcodeempire.clinic.model.*;
import com.solidcodeempire.clinic.modelDTO.ClinicUserDTO;
import com.solidcodeempire.clinic.repository.ClinicUserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClinicUserService {
    final private MedicalRegistrarService medicalRegistrarService;
    final private DoctorService doctorService;
    final private LabTechnicianService labTechnicianService;
    final private LabSupervisorService labSupervisorService;
    final private ClinicUserRepository clinicUserRepository;
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
        clinicUser.setId(0);
        clinicUser.setIsActive(true);
        switch (clinicUser.getUserType()) {
            case DOCTOR -> {
                Doctor doctor = (Doctor) dto;
                doctor.setId(0);
                clinicUser.setDoctor(doctor);
                doctor.setUser(clinicUser);
                doctorService.saveDoctor(doctor);
            }
            case LAB_TECHNICIAN -> {
                LabTechnician labTechnician = (LabTechnician) dto;
                labTechnician.setId(0);
                clinicUser.setLabTechnician(labTechnician);
                labTechnician.setUser(clinicUser);
                labTechnicianService.saveLabTechnician(labTechnician);
            }
            case LAB_SUPERVISOR -> {
                LabSupervisor labSupervisor = (LabSupervisor) dto;
                labSupervisor.setId(0);
                clinicUser.setLabSupervisor(labSupervisor);
                labSupervisor.setUser(clinicUser);
                labSupervisorService.saveLabSupervisor(labSupervisor);
            }
            case MEDICAL_REGISTRAR -> {
                MedicalRegistrar medicalRegistrar = (MedicalRegistrar) dto;
                medicalRegistrar.setId(0);
                clinicUser.setMedicalRegistrar(medicalRegistrar);
                medicalRegistrar.setUser(clinicUser);
                medicalRegistrarService.saveMedicalRegistrar(medicalRegistrar);
            }
        }
        clinicUserRepository.save(clinicUser);
    }

    public void updateUser(ClinicUser newClinicUser, String firstName, String lastName, int licenseNumber) {
        ClinicUser clinicUser = clinicUserRepository.findById(newClinicUser.getId())
                .orElseThrow(() -> new EntityNotFoundException("User"));
        switch (clinicUser.getUserType()) {
            case DOCTOR -> {
                Doctor doctor = clinicUser.getDoctor();
                doctor.setFirstName(firstName);
                doctor.setLastName(lastName);
                doctor.setLicenseNumber(licenseNumber);
                newClinicUser.setId(clinicUser.getId());
                newClinicUser.setUserType(UserType.DOCTOR);
                newClinicUser.setDoctor(doctor);
                doctorService.saveDoctor(doctor);
            }
            case LAB_TECHNICIAN -> {
                LabTechnician labTechnician = clinicUser.getLabTechnician();
                labTechnician.setFirstName(firstName);
                labTechnician.setLastName(lastName);
                newClinicUser.setId(clinicUser.getId());
                newClinicUser.setUserType(UserType.LAB_TECHNICIAN);
                newClinicUser.setLabTechnician(labTechnician);
                labTechnicianService.saveLabTechnician(labTechnician);
            }
            case LAB_SUPERVISOR -> {
                LabSupervisor labSupervisor = clinicUser.getLabSupervisor();
                labSupervisor.setFirstName(firstName);
                labSupervisor.setLastName(lastName);
                newClinicUser.setId(clinicUser.getId());
                newClinicUser.setUserType(UserType.LAB_SUPERVISOR);
                newClinicUser.setLabSupervisor(labSupervisor);
                labSupervisorService.saveLabSupervisor(labSupervisor);
            }
            case MEDICAL_REGISTRAR -> {
                MedicalRegistrar medicalRegistrar = clinicUser.getMedicalRegistrar();
                medicalRegistrar.setFirstName(firstName);
                medicalRegistrar.setLastName(lastName);
                newClinicUser.setId(clinicUser.getId());
                newClinicUser.setUserType(UserType.MEDICAL_REGISTRAR);
                newClinicUser.setMedicalRegistrar(medicalRegistrar);
                medicalRegistrarService.saveMedicalRegistrar(medicalRegistrar);
            }
        }
        clinicUserRepository.save(newClinicUser);
    }
}