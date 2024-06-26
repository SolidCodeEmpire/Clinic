package com.solidcodeempire.clinic.controller;

import com.solidcodeempire.clinic.model.ExaminationDictionary;
import com.solidcodeempire.clinic.service.ExaminationDictionaryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name="Examination Dictionary")
public class ExaminationDictionaryController {

    private final ExaminationDictionaryService examinationDictionaryService;

    @GetMapping("/examination_dictionary")
    @Operation(summary="Gets list with all elements in examination dictionary")
    public List<ExaminationDictionary> getExaminationDictionaryList() {
        return (List<ExaminationDictionary>) examinationDictionaryService.getExaminationDictionaryList();
    }

    @GetMapping("/examination_dictionary/{code}")
    @ResponseBody
    @Operation(summary="Get element from examination dictionary specified by code")
    public ExaminationDictionary getExaminationDictionary(@PathVariable("code") String code) {
        return examinationDictionaryService.getExaminationDictionaryById(code);
    }
}