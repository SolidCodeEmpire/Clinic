package com.solidcodeempire.clinic.repository;

import com.solidcodeempire.clinic.model.Doctor;
import com.solidcodeempire.clinic.modelDTO.DoctorDTO;
import com.solidcodeempire.clinic.modelDTO.DoctorManagementDTO;
import lombok.NonNull;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends CrudRepository<Doctor, Long> {

    @EntityGraph(attributePaths = "appointments")
    @Query("select d from Doctor d join fetch d.user u where d.id = :id and u.isActive = TRUE")
    Optional<Doctor> findById(long id);

    @Query("select new com.solidcodeempire.clinic.modelDTO.DoctorManagementDTO(p.id, p.firstName, p.lastName, p.licenseNumber, " +
            "new com.solidcodeempire.clinic.modelDTO.ClinicUserDTO(u.username, u.email, u.password, u.userType, u.isActive)) " +
            "from Doctor p join p.user u")
    List<DoctorManagementDTO> findAllDoctorAdministrator();

    @EntityGraph(attributePaths = "appointments")
    @Query("select d from Doctor d join d.user u where u.isActive = TRUE")
    List<Doctor> findAll();
}
