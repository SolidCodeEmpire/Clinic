package com.solidcodeempire.clinic.controller;

import com.solidcodeempire.clinic.model.Doctor;
import com.solidcodeempire.clinic.model.LabTechnician;
import com.solidcodeempire.clinic.model.MedicalRegistrar;
import com.solidcodeempire.clinic.modelDTO.DoctorDTO;
import com.solidcodeempire.clinic.modelDTO.LabTechnicianDTO;
import com.solidcodeempire.clinic.modelDTO.MedicalRegistrarDTO;
import com.solidcodeempire.clinic.service.LabTechnicianService;
import com.solidcodeempire.clinic.service.MedicalRegistrarService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Tag(name="Lab Technician")
public class LabTechnicianController {
    final private LabTechnicianService labTechnicianService;
    final private ModelMapper modelMapper;

    @GetMapping("/lab_technicians")
    @Operation(summary="Gets lab technicians list and their laboratory examinations")
    public List<LabTechnicianDTO> getLabTechniciansList() {
        List<LabTechnician> labTechnicianList = (List<LabTechnician>) labTechnicianService.getLabTechniciansList();
        return labTechnicianList.stream()
                .map(labTechnician -> modelMapper.map(labTechnician,LabTechnicianDTO.class))
                .collect(Collectors.toList());
    }

    @GetMapping("/lab_technician/{id}")
    @ResponseBody
    @Operation(summary="Get lab technician specified by ID and his laboratory examinations")
    public LabTechnicianDTO getLabTechnician(@PathVariable("id") int id) {
        LabTechnician labTechnician = labTechnicianService.getLabTechnicianById(id);
        if (labTechnician == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Lab technician with provided ID does not exists."
            );
        }
        return modelMapper.map(labTechnician, LabTechnicianDTO.class);
    }
}
