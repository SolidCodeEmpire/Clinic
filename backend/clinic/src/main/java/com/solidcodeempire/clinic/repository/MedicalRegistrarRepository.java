package com.solidcodeempire.clinic.repository;

import com.solidcodeempire.clinic.model.MedicalRegistrar;
import com.solidcodeempire.clinic.modelDTO.MedicalRegistrarManagementDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalRegistrarRepository extends CrudRepository<MedicalRegistrar, Long> {
    MedicalRegistrar findById(long id);

    //TODO fix error n+1
    @Query("select new com.solidcodeempire.clinic.modelDTO.MedicalRegistrarManagementDTO(p.id, p.name, p.surname, " +
            "new com.solidcodeempire.clinic.modelDTO.ClinicUserDTO(u.username, u.email, u.password, u.userType, u.isActive)) " +
            "from MedicalRegistrar p join p.user u")
    List<MedicalRegistrarManagementDTO> findAllMedicalRegistrarAdministrator();
}
