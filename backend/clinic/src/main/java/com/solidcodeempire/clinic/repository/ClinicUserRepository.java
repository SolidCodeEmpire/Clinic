package com.solidcodeempire.clinic.repository;

import com.solidcodeempire.clinic.model.ClinicUser;
import com.solidcodeempire.clinic.model.MedicalRegistrar;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClinicUserRepository  extends CrudRepository<ClinicUser, Long> {

}
