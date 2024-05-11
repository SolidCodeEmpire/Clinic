package com.solidcodeempire.clinic.repository;

import com.solidcodeempire.clinic.model.LaboratoryExamination;
import com.solidcodeempire.clinic.modelDTO.LaboratoryExaminationDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LaboratoryExaminationRepository extends CrudRepository<LaboratoryExamination, Long> {

    LaboratoryExamination findById(int id);

    @Query("select new com.solidcodeempire.clinic.modelDTO.LaboratoryExaminationDTO(le.id, le.doctorsNotes, le.orderDate, le.result, le.finishedDate, le.supervisorsNotes, le.validationDate, ap.id, le.status, lt.id, ls.id, ed.code) " +
            "from LaboratoryExamination le join le.labTechnician lt join le.labSupervisor ls join le.appointment ap join le.examinationDictionary ed")
    Iterable<LaboratoryExaminationDTO> findAllLaboratoryExaminations();
}
