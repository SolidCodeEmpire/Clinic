package com.solidcodeempire.clinic.controller;

import com.solidcodeempire.clinic.enums.ExaminationStatus;
import com.solidcodeempire.clinic.model.LaboratoryExamination;
import com.solidcodeempire.clinic.modelDTO.LaboratoryExaminationDTO;
import com.solidcodeempire.clinic.service.LaboratoryExaminationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name="Laboratory Examination")
public class LaboratoryExaminationController {

    private final LaboratoryExaminationService laboratoryExaminationService;
    private final ModelMapper modelMapper;

    @GetMapping("/laboratory_examinations")
    @Operation(summary="Gets laboratory examinations list")
    public List<LaboratoryExaminationDTO> getLaboratoryExaminationsList(@RequestParam(required = false) Integer appointmentId,
                                                                        @RequestParam(required = false) Integer doctorId,
                                                                        @RequestParam(required = false) ExaminationStatus status,
                                                                        @RequestParam(required = false) Date date) {
        return (List<LaboratoryExaminationDTO>) laboratoryExaminationService.getLaboratoryExaminationsList(appointmentId, doctorId, status, date);
    }

    @GetMapping("/laboratory_examination/{id}")
    @Operation(summary="Get laboratory examination specified by id")
    public LaboratoryExaminationDTO getLaboratoryExaminationById(@PathVariable("id") int id) {
        LaboratoryExamination laboratoryExamination = laboratoryExaminationService.getLaboratoryExaminationById(id);
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
        laboratoryExaminationService.deleteLaboratoryExamination(id);
    }

    @PatchMapping(path = "/laboratory_examination/{id}")
    @Operation(summary="Updates existing laboratory examination")
    public void updateLaboratoryExamination(@PathVariable("id") int id, @RequestBody LaboratoryExaminationDTO laboratoryExaminationDTO) {
        laboratoryExaminationService.updateLaboratoryExamination(id, laboratoryExaminationDTO);
    }
}
