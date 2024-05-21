package com.solidcodeempire.clinic.repository;


import com.solidcodeempire.clinic.model.Patient;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface PatientRepository extends CrudRepository<Patient, Long> {
    Optional<Patient> findById(long ID);

    @Query("SELECT p FROM Patient p join fetch p.address WHERE (:firstName IS NULL OR p.firstName ILIKE %:firstName%) " +
            "AND (:lastName IS NULL OR p.lastName ILIKE %:lastName%) " +
            "AND (:socialSecurityNumber IS NULL OR CAST(p.socialSecurityNumber AS string) LIKE %:socialSecurityNumber%)")
    List<Patient> findPatient(String firstName, String lastName, Integer socialSecurityNumber);

    @Query("select p from Patient p join fetch p.address")
    List<Patient> findAllPatients(Pageable page);
}

