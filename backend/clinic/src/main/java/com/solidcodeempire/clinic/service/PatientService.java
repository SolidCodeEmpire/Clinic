package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.enums.PatientStatus;
import com.solidcodeempire.clinic.model.Patient;
import com.solidcodeempire.clinic.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

@Service
@RequiredArgsConstructor
public class PatientService {

    final private PatientRepository patientRepository;

    public Patient getPatientById(int id) {
         return patientRepository.findById((long) id);
    }

    public void createPatient(Patient newPatient) {
        newPatient.setId(0);
        newPatient.setStatus(PatientStatus.ACTIVATED);
        patientRepository.save(newPatient);
    }

    public Iterable<Patient> getPatientsList(Pageable page) {
        return patientRepository.findAllPatients(page);
    }

    public void deletePatient(int id){
        Patient patient = patientRepository.findById((long) id);
        patient.setStatus(PatientStatus.DEACTIVATED);
        patientRepository.save(patient);
    }

    public void updatePatient(Patient updatedPatient) {
        patientRepository.save(updatedPatient);
    }
}
