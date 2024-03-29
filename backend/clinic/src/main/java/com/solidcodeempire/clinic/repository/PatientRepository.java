package com.solidcodeempire.clinic.repository;


import com.solidcodeempire.clinic.model.Patient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends CrudRepository<Patient, Long> {
    Patient findById(long ID);
}

