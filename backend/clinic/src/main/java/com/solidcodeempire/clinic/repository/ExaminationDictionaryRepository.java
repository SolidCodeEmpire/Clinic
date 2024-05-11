package com.solidcodeempire.clinic.repository;

import com.solidcodeempire.clinic.model.ExaminationDictionary;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExaminationDictionaryRepository extends CrudRepository<ExaminationDictionary, Long> {
    ExaminationDictionary findByCode(String code);
}
