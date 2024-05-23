package com.solidcodeempire.clinic.repository;

import com.solidcodeempire.clinic.model.PhysicalExamination;
import com.solidcodeempire.clinic.modelDTO.PhysicalExaminationDTO;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface PhysicalExaminationRepository extends CrudRepository<PhysicalExamination, Long> {
    @EntityGraph(attributePaths = "appointment")
    @Query("select d from PhysicalExamination d where d.id = :id")
    Optional<PhysicalExamination> findById(int id);

    @Query("select new com.solidcodeempire.clinic.modelDTO.PhysicalExaminationDTO(pe.id, pe.result, app.id, ed.code) " +
            "from PhysicalExamination pe join pe.appointment app join pe.examinationDictionary ed " +
            "where (:appointmentId IS NULL OR app.id = :appointmentId)")
    Iterable<PhysicalExaminationDTO> findAllPhysicalExaminations(Integer appointmentId);
}