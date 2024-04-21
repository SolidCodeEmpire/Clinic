package com.solidcodeempire.clinic.repository;


import com.solidcodeempire.clinic.model.Patient;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PatientRepository extends CrudRepository<Patient, Long> {
    Patient findById(long ID);

    @Query("select p from Patient p join fetch p.address")
    List<Patient> findAllPatients(Pageable page);
}

