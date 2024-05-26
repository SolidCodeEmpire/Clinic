package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.exception.EntityNotFoundException;
import com.solidcodeempire.clinic.model.ExaminationDictionary;
import com.solidcodeempire.clinic.repository.ExaminationDictionaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExaminationDictionaryService {
    final private ExaminationDictionaryRepository examinationDictionaryRepository;

    public Iterable<ExaminationDictionary> getExaminationDictionaryList() {
        return examinationDictionaryRepository.findAll();
    }

    public ExaminationDictionary getExaminationDictionaryById(String code) {
        return examinationDictionaryRepository.findByCode(code)
                .orElseThrow(() -> new EntityNotFoundException("Examination Dictionary"));
    }
}