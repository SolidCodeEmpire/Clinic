package com.solidcodeempire.clinic.controller;

import com.solidcodeempire.clinic.model.PhysicalExamination;
import com.solidcodeempire.clinic.modelDTO.PhysicalExaminationDTO;
import com.solidcodeempire.clinic.service.PhysicalExaminationService;
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
@Tag(name="Physical Examination")
public class PhysicalExaminationController {
    final private PhysicalExaminationService physicalExaminationService;
    final private ModelMapper modelMapper;

    @GetMapping("/physical_examinations")
    @Operation(summary="Gets physical examinations list")
    public List<PhysicalExaminationDTO> getPhysicalExaminationsList() {
        return (List<PhysicalExaminationDTO>) physicalExaminationService.getPhysicalExaminationsList();
    }

    @GetMapping("/physical_examination/{id}")
    @Operation(summary="Get physical examination specified by id")
    public PhysicalExaminationDTO getPhysicalExaminationById(@PathVariable("id") int id) {
        PhysicalExamination physicalExamination = physicalExaminationService.getPhysicalExaminationById(id);
        if (physicalExamination == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Physical examination with provided ID does not exists."
            );
        }
        return modelMapper.map(physicalExamination, PhysicalExaminationDTO.class);
    }

    @PostMapping(path = "/physical_examination")
    @Operation(summary="Creates new physical examination")
    public void createPhysicalExamination(@RequestBody PhysicalExaminationDTO physicalExaminationDTO) {
        PhysicalExamination physicalExamination = modelMapper.map(physicalExaminationDTO, PhysicalExamination.class);
        physicalExaminationService.createPhysicalExamination(physicalExamination,
                physicalExaminationDTO.getAppointmentId(),
                physicalExaminationDTO.getExaminationDictionaryCode());
    }

    @PatchMapping(path = "/physical_examination/{id}")
    @Operation(summary="Updates existing physical examination")
    public void updatePhysicalExamination(@RequestBody PhysicalExaminationDTO physicalExaminationDTO) {
        try {
            PhysicalExamination physicalExamination = modelMapper.map(physicalExaminationDTO, PhysicalExamination.class);
            physicalExaminationService.updatePhysicalExamination(physicalExamination,
                    physicalExaminationDTO.getAppointmentId(),
                    physicalExaminationDTO.getExaminationDictionaryCode());
        }catch (NullPointerException exception){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Physical examination with provided ID does not exists."
            );
        }
    }
}