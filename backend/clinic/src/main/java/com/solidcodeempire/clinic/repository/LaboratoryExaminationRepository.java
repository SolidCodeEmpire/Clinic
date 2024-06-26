package com.solidcodeempire.clinic.repository;

import com.solidcodeempire.clinic.enums.ExaminationStatus;
import com.solidcodeempire.clinic.model.LaboratoryExamination;
import com.solidcodeempire.clinic.modelDTO.LaboratoryExaminationDTO;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
public interface LaboratoryExaminationRepository extends CrudRepository<LaboratoryExamination, Long> {

    @EntityGraph(attributePaths = {"appointment", "labTechnician", "labSupervisor"})
    @Query("select d from LaboratoryExamination d where d.id = :id and d.status != \"CANCELLED\" and d.status != \"ARCHIVED\"")
    Optional<LaboratoryExamination> findById(int id);

    @Query("select new com.solidcodeempire.clinic.modelDTO.LaboratoryExaminationDTO(le.id, le.doctorsNotes, le.orderDate, le.result, le.finishedDate, le.supervisorsNotes, le.validationDate, ap.id, le.status, lt.id, ls.id, ed.code, ed.examinationName) " +
            "from LaboratoryExamination le left join le.labTechnician lt left join le.labSupervisor ls join le.appointment ap join le.examinationDictionary ed " +
            "where (:appointmentId IS NULL OR ap.id = :appointmentId) and " +
            "(:doctorId IS NULL OR ap.doctor.id = :doctorId) and " +
            "(:status IS NULL OR le.status = :status) and " +
            "(le.status != \"ARCHIVED\") and " +
            "(cast(:date as date) IS NULL OR cast(le.orderDate as date) = :date)")
    Iterable<LaboratoryExaminationDTO> findAllLaboratoryExaminations(Integer appointmentId, Integer doctorId, ExaminationStatus status, Date date);
}
