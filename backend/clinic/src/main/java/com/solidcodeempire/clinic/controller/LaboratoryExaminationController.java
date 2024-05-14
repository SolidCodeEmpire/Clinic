package com.solidcodeempire.clinic.controller;

import com.solidcodeempire.clinic.model.LaboratoryExamination;
import com.solidcodeempire.clinic.modelDTO.LaboratoryExaminationDTO;
import com.solidcodeempire.clinic.service.LaboratoryExaminationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name="Laboratory Examination")
public class LaboratoryExaminationController {
    private final LaboratoryExaminationService laboratoryExaminationService;
    final private ModelMapper modelMapper;

    @GetMapping("/laboratory_examinations")
    @Operation(summary="Gets laboratory examinations list")
    public List<LaboratoryExaminationDTO> getLaboratoryExaminationsList() {
        return (List<LaboratoryExaminationDTO>) laboratoryExaminationService.getLaboratoryExaminationsList();
    }

    @GetMapping("/laboratory_examination/{id}")
    @Operation(summary="Get laboratory examination specified by id")
    public LaboratoryExaminationDTO getLaboratoryExaminationById(@PathVariable("id") int id) {
        LaboratoryExamination laboratoryExamination = laboratoryExaminationService.getLaboratoryExaminationById(id);
        if (laboratoryExamination == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Laboratory examination with provided ID does not exists."
            );
        }
        return modelMapper.map(laboratoryExamination, LaboratoryExaminationDTO.class);
    }

    @PostMapping(path = "/laboratory_examination")
    @Operation(summary="Creates new laboratory examination")
    public void createLaboratoryExamination(@RequestBody LaboratoryExaminationDTO laboratoryExaminationDTO) {
        LaboratoryExamination laboratoryExamination = modelMapper.map(laboratoryExaminationDTO, LaboratoryExamination.class);
        laboratoryExaminationService.createLaboratoryExamination(laboratoryExamination,
                laboratoryExaminationDTO.getAppointmentId(),
                laboratoryExaminationDTO.getLabTechnicianId(),
                laboratoryExaminationDTO.getLabSupervisorId(),
                laboratoryExaminationDTO.getExaminationDictionaryCode());
    }

    @DeleteMapping("/laboratory_examination/{id}")
    @Operation(summary="Cancels laboratory examination")
    public void deleteLaboratoryExamination(@PathVariable("id") int id) {
        try {
            laboratoryExaminationService.deleteLaboratoryExamination(id);
        }catch (NullPointerException exception){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Laboratory examination with provided ID does not exists."
            );
        }
    }

    @PatchMapping(path = "/laboratory_examination/{id}")
    @Operation(summary="Updates existing laboratory examination")
    public void updateLaboratoryExamination(@RequestBody LaboratoryExaminationDTO laboratoryExaminationDTO) {
        try {
            LaboratoryExamination laboratoryExamination = modelMapper.map(laboratoryExaminationDTO, LaboratoryExamination.class);
            laboratoryExaminationService.updateLaboratoryExamination(laboratoryExamination,
                    laboratoryExaminationDTO.getAppointmentId(),
                    laboratoryExaminationDTO.getLabTechnicianId(),
                    laboratoryExaminationDTO.getLabSupervisorId(),
                    laboratoryExaminationDTO.getExaminationDictionaryCode());
        }catch (NullPointerException exception){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Laboratory examination with provided ID does not exists."
            );
        }
    }
}
