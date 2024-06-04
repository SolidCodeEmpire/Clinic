package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.enums.PatientStatus;
import com.solidcodeempire.clinic.exception.EntityNotFoundException;
import com.solidcodeempire.clinic.model.Address;
import com.solidcodeempire.clinic.model.Patient;
import com.solidcodeempire.clinic.repository.AddressRepository;
import com.solidcodeempire.clinic.repository.PatientRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;
    private final AddressRepository addressRepository;

    public Patient getPatientById(int id) {
         return patientRepository.findById(id)
                 .orElseThrow(() -> new EntityNotFoundException("Patient"));
    }

    public List<Patient> getPatient(String firstName, String lastName, Integer socialSecurityNumber){
        return patientRepository.findPatient(firstName, lastName, socialSecurityNumber);
    }

    @Transactional
    public void createPatient(Patient newPatient) {
        newPatient.setId(0);
        Address address = newPatient.getAddress();
        address.setId(0);
        newPatient.setStatus(PatientStatus.ACTIVATED);
        newPatient.setAddress(address);
        address.setPatient(newPatient);
        addressRepository.save(address);
        patientRepository.save(newPatient);

    }

    public Iterable<Patient> getPatientsList(Pageable page) {
        return patientRepository.findAllPatients(page);
    }

    public void deletePatient(int id){
        Patient patient = getPatientById(id);
        patient.setStatus(PatientStatus.DEACTIVATED);
        patientRepository.save(patient);
    }

    @Transactional
    public void updatePatient(Patient updatedPatient) {
        deletePatient(updatedPatient.getId());
        createPatient(updatedPatient);
    }

}
