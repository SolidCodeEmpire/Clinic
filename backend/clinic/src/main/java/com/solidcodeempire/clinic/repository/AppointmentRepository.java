package com.solidcodeempire.clinic.repository;

import com.solidcodeempire.clinic.model.Appointment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends CrudRepository<Appointment, Long> {
    //TODO findById generates more than 1 query to database
    Appointment findById(long ID);
}
