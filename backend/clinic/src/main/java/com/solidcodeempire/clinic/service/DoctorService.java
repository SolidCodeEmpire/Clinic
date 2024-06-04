package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.exception.EntityNotFoundException;
import com.solidcodeempire.clinic.model.Doctor;
import com.solidcodeempire.clinic.modelDTO.ClinicUserDTO;
import com.solidcodeempire.clinic.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public List<ClinicUserDTO> getDetailedDoctorsList() {
        return doctorRepository.findAllDoctorAdministrator();
    }

    public List<Doctor> getDoctorsList() {
        return doctorRepository.findAll();
    }

    public ClinicUserDTO getDetailedDoctorById(int id) {
        return doctorRepository.findDoctorById(id)
                .orElseThrow(() -> new EntityNotFoundException("Doctor"));
    }

    public Doctor getDoctorById(int id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Doctor"));
    }

    public void saveDoctor(Doctor newDoctor) {
        doctorRepository.save(newDoctor);
    }
}
