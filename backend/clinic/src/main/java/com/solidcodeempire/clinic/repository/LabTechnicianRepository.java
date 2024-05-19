package com.solidcodeempire.clinic.repository;

import com.solidcodeempire.clinic.model.LabTechnician;
import com.solidcodeempire.clinic.modelDTO.LabTechnicianDTO;
import com.solidcodeempire.clinic.modelDTO.LabTechnicianManagementDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LabTechnicianRepository extends CrudRepository<LabTechnician, Long> {
    LabTechnician findById(long id);

    @Query("select new com.solidcodeempire.clinic.modelDTO.LabTechnicianManagementDTO(p.id, p.firstName, p.lastName, " +
            "new com.solidcodeempire.clinic.modelDTO.ClinicUserDTO(u.username, u.email, u.password, u.userType, u.isActive)) " +
            "from LabTechnician p join p.user u")
    Iterable<LabTechnicianManagementDTO> findAllLabTechniciansAdministrator();

}
