package com.solidcodeempire.clinic.repository;

import com.solidcodeempire.clinic.model.LabSupervisor;
import com.solidcodeempire.clinic.modelDTO.LabSupervisorManagementDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabSupervisorRepository extends CrudRepository<LabSupervisor, Long> {
    LabSupervisor findById(long id);

    @Query("select new com.solidcodeempire.clinic.modelDTO.LabSupervisorManagementDTO(p.id, p.name, p.surname, " +
            "new com.solidcodeempire.clinic.modelDTO.ClinicUserDTO(u.username, u.email, u.password, u.userType, u.isActive)) " +
            "from LabSupervisor p join p.user u")
    Iterable<LabSupervisorManagementDTO> findAllLabSupervisorsAdministrator();
}
