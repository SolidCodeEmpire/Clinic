package com.solidcodeempire.clinic.repository;

import com.solidcodeempire.clinic.model.MedicalRegistrar;
import com.solidcodeempire.clinic.modelDTO.ClinicUserDTO;
import com.solidcodeempire.clinic.modelDTO.MedicalRegistrarDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MedicalRegistrarRepository extends CrudRepository<MedicalRegistrar, Long> {

    @Query("select p from MedicalRegistrar p join p.user u where p.id = :id and u.isActive = true")
    Optional<MedicalRegistrar> findById(long id);

    @Query("select new com.solidcodeempire.clinic.modelDTO.ClinicUserDTO(u.id, u.username, u.email, u.userType, u.isActive, p.id, p.firstName, p.lastName) " +
            "from MedicalRegistrar p join p.user u where u.isActive = TRUE")
    List<ClinicUserDTO> findAllDetailedMedicalRegistrar();

    @Query("select new com.solidcodeempire.clinic.modelDTO.MedicalRegistrarDTO(p.id, p.firstName, p.lastName) " +
            "from MedicalRegistrar p join p.user u where u.isActive = true ")
    List<MedicalRegistrarDTO> findAllMedicalRegistrar();

    @Query("select new com.solidcodeempire.clinic.modelDTO.ClinicUserDTO(u.id, u.username, u.email, u.password, u.userType, u.isActive, p.id, p.firstName, p.lastName) " +
            "from MedicalRegistrar p join p.user u where u.id = :id")
    Optional<ClinicUserDTO> findDetailedMedicalRegistrarById(int id);
}