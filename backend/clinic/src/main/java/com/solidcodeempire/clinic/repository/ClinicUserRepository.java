package com.solidcodeempire.clinic.repository;

import com.solidcodeempire.clinic.model.ClinicUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClinicUserRepository  extends CrudRepository<ClinicUser, Long> {
    Optional<ClinicUser> findById(int id);

}
