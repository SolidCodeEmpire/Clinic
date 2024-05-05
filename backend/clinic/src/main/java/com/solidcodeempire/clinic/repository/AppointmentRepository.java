package com.solidcodeempire.clinic.repository;

import com.solidcodeempire.clinic.model.Appointment;
import com.solidcodeempire.clinic.modelDTO.AppointmentDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends CrudRepository<Appointment, Long> {
    Appointment findById(long ID);

    @Query("select new com.solidcodeempire.clinic.modelDTO.AppointmentDTO(a.id, a.description, a.diagnosis, a.status, a.registeredDate, a.finishedDate, p.id, m.id, d.id) " +
            "from Appointment a join a.patient p join a.medicalRegistrar m join a.doctor d")
    List<AppointmentDTO> findAllAppointments();
}
