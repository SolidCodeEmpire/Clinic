package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PatientService {

    final private PatientRepository patientRepository;

    public String getPatient(int id) {
        return patientRepository.findById(id).getSurname();
    }
}
