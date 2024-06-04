package com.solidcodeempire.clinic.repository;

import com.solidcodeempire.clinic.model.ClinicUser;
import com.solidcodeempire.clinic.modelDTO.ClinicUserDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClinicUserRepository  extends CrudRepository<ClinicUser, Long> {

    Optional<ClinicUser> findById(int id);

    @Query("select new com.solidcodeempire.clinic.modelDTO.ClinicUserDTO(cu.id, cu.username, cu.email, cu.password, cu.userType, cu.isActive)" +
            "from ClinicUser cu where cu.id = :id and cu.isActive = TRUE")
    Optional<ClinicUserDTO> findDTOById(int id);

    @Query("select cu from ClinicUser cu where cu.username = :username and cu.isActive = TRUE")
    Optional<ClinicUser> findByUsername(String username);
}
