package com.solidcodeempire.clinic.repository;

import com.solidcodeempire.clinic.model.LabTechnician;
import com.solidcodeempire.clinic.modelDTO.ClinicUserDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LabTechnicianRepository extends CrudRepository<LabTechnician, Long> {
    @Query("select p from LabTechnician p join p.user u where p.id = :id and u.isActive = true")
    LabTechnician findById(long id);

    @Query("select new com.solidcodeempire.clinic.modelDTO.ClinicUserDTO(u.id, u.username, u.email, u.password, u.userType, u.isActive, p.id, p.firstName, p.lastName) " +
            "from LabTechnician p join p.user u where u.isActive = TRUE")
    List<ClinicUserDTO> findAllLabTechniciansAdministrator();

    @Query("select new com.solidcodeempire.clinic.modelDTO.ClinicUserDTO(u.id, u.username, u.email, u.password, u.userType, u.isActive, p.id, p.firstName, p.lastName) " +
            "from LabTechnician p join p.user u where u.id = :id")
    Optional<ClinicUserDTO> findLabTechnicianById(int id);

    @Query("select p from LabTechnician p join p.user u where u.isActive = true")
    List<LabTechnician> findAllLabTechnicians();
}
