package com.solidcodeempire.clinic.repository;

import com.solidcodeempire.clinic.model.MedicalRegistrar;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalRegistrarRepository extends CrudRepository<MedicalRegistrar, Long> {
    MedicalRegistrar findById(long id);

    //TODO fix error n+1
    @Query("select p from MedicalRegistrar p join fetch p.user")
    List<MedicalRegistrar> findAllMedicalRegistrar();
}
