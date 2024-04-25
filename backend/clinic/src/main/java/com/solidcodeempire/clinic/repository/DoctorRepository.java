package com.solidcodeempire.clinic.repository;

import com.solidcodeempire.clinic.model.Doctor;
import com.solidcodeempire.clinic.modelDTO.DoctorDTO;
import com.solidcodeempire.clinic.modelDTO.DoctorManagementDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends CrudRepository<Doctor, Long> {

    //TODO findById generates more than 1 query to database
    Doctor findById(long id);

    @Query("select new com.solidcodeempire.clinic.modelDTO.DoctorManagementDTO(p.id, p.name, p.surname, p.licenseNumber, " +
            "new com.solidcodeempire.clinic.modelDTO.ClinicUserDTO(u.username, u.email, u.password, u.userType, u.isActive)) " +
            "from Doctor p join p.user u")
    List<DoctorManagementDTO> findAllDoctorAdministrator();

    //TODO findAllDoctors don't return list of appointments
    @Query("select new com.solidcodeempire.clinic.modelDTO.DoctorDTO(p.id, p.name, p.surname, p.licenseNumber) " +
            "from Doctor p")
    List<DoctorDTO> findAllDoctors();
}
