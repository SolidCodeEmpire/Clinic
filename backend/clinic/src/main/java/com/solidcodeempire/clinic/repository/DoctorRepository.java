package com.solidcodeempire.clinic.repository;

import com.solidcodeempire.clinic.model.Doctor;
import com.solidcodeempire.clinic.modelDTO.DoctorManagementDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends CrudRepository<Doctor, Long> {

    Doctor findById(long id);

    @Query("select new com.solidcodeempire.clinic.modelDTO.DoctorManagementDTO(p.id, p.firstName, p.lastName, p.licenseNumber, " +
            "new com.solidcodeempire.clinic.modelDTO.ClinicUserDTO(u.username, u.email, u.password, u.userType, u.isActive)) " +
            "from Doctor p join p.user u")
    List<DoctorManagementDTO> findAllDoctorAdministrator();

}
