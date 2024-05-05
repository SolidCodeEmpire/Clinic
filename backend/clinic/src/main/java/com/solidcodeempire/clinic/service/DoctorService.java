package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.enums.UserType;
import com.solidcodeempire.clinic.model.ClinicUser;
import com.solidcodeempire.clinic.model.Doctor;
import com.solidcodeempire.clinic.modelDTO.DoctorDTO;
import com.solidcodeempire.clinic.modelDTO.DoctorManagementDTO;
import com.solidcodeempire.clinic.repository.ClinicUserRepository;
import com.solidcodeempire.clinic.repository.DoctorRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorService {
    final private DoctorRepository doctorRepository;
    final private ClinicUserRepository clinicUserRepository;

    public Iterable<DoctorManagementDTO> getDetailedDoctorsList() {
        return doctorRepository.findAllDoctorAdministrator();
    }

    //TODO N+1 problem
    public List<Doctor> getDoctorsList() {
        return (List<Doctor>) doctorRepository.findAll();
    }

    public Doctor getDoctorById(int id) {
        return doctorRepository.findById(id);
    }

    @Transactional
    public void createDoctor(Doctor newDoctor) {
        newDoctor.setId(0);
        ClinicUser newUser = newDoctor.getUser();
        newUser.setId(0);
        newUser.setIsActive(true);
        newUser.setUserType(UserType.DOCTOR);
        newUser.setDoctor(newDoctor);
        doctorRepository.save(newDoctor);
        clinicUserRepository.save(newUser);
    }

    public void deleteDoctor(int id) {
        Doctor doctor = doctorRepository.findById(id);
        ClinicUser user =  doctor.getUser();
        user.setIsActive(false);
        clinicUserRepository.save(user);
    }

    public void updateDoctor(Doctor newDoctor) {
        Doctor doctor = doctorRepository.findById(newDoctor.getId());
        ClinicUser newUser = newDoctor.getUser();
        newUser.setId(doctor.getUser().getId());
        newUser.setUserType(UserType.DOCTOR);
        newUser.setDoctor(doctor);
        doctorRepository.save(newDoctor);
        clinicUserRepository.save(newUser);
    }
}
