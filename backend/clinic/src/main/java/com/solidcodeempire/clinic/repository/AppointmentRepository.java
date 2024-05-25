package com.solidcodeempire.clinic.repository;

import com.solidcodeempire.clinic.model.Appointment;
import com.solidcodeempire.clinic.modelDTO.AppointmentDTO;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends CrudRepository<Appointment, Long> {

    @EntityGraph(attributePaths = {"doctor", "medicalRegistrar", "physicalExamination"})
    @Query("select a from Appointment a where (a.status = \"REGISTERED\" or a.status = \"ENDED\") and a.id = :id")
    Optional<Appointment> findById(long id);

    @Query("select new com.solidcodeempire.clinic.modelDTO.AppointmentDTO(a.id, a.description, a.diagnosis, a.status, a.visitDate, p.id, p.firstName, p.lastName, m.id, d.id) " +
            "from Appointment a join a.patient p join a.medicalRegistrar m join a.doctor d " +
            "where d.id = :doctorId and a.visitDate > :startDate and a.visitDate < :endDate and (a.status = \"REGISTERED\" or a.status = \"ENDED\")")
    List<AppointmentDTO> findAllAppointments(int doctorId, Timestamp startDate, Timestamp endDate);
}
