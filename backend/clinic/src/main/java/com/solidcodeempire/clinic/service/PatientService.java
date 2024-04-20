package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.enums.PatientStatus;
import com.solidcodeempire.clinic.model.Patient;
import com.solidcodeempire.clinic.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PatientService {

    final private PatientRepository patientRepository;

    public Patient getPatientById(int id) {
         return patientRepository.findById((long) id);
    }

    public Patient createPatient(Patient newPatient) {
        newPatient.setStatus(PatientStatus.ACTIVATED);
        return patientRepository.save(newPatient);
    }

    public Iterable<Patient> getPatientsList() {
        return patientRepository.findAll();
    }

    public void deletePatient(int id){
        Patient patient = patientRepository.findById((long) id);
        patient.setStatus(PatientStatus.DEACTIVATED);
        patientRepository.save(patient);
    }

    public void updatePatient(Patient updatedPatient) {
        Patient patient = patientRepository.findById(updatedPatient.getId());
        patient = updatedPatient;
        patientRepository.save(patient);
    }
}
