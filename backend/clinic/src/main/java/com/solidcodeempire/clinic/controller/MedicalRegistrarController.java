package com.solidcodeempire.clinic.controller;

import com.solidcodeempire.clinic.model.MedicalRegistrar;
import com.solidcodeempire.clinic.modelDTO.MedicalRegistrarDTO;
import com.solidcodeempire.clinic.modelDTO.MedicalRegistrarManagementDTO;
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
@Tag(name="Medical Registrar")
public class MedicalRegistrarController {
    final private MedicalRegistrarService medicalRegistrarService;
    final private ModelMapper modelMapper;

    @GetMapping("/medical_registrars")
    @Operation(summary="Gets medical registrars list")
    public List<MedicalRegistrarDTO> getMedicalRegistrarsList() {
        List<MedicalRegistrarManagementDTO> medicalRegistrarsList =
                (List<MedicalRegistrarManagementDTO>) medicalRegistrarService.getMedicalRegistrarsList();
        return medicalRegistrarsList.stream()
                .map(medicalRegistrar -> modelMapper.map(medicalRegistrar, MedicalRegistrarDTO.class))
                .collect(Collectors.toList());
    }

    @GetMapping("/medical_registrar/{id}")
    @ResponseBody
    @Operation(summary="Get medical registrar specified by ID")
    public MedicalRegistrarDTO getMedicalRegistrar(@PathVariable("id") int id) {
        MedicalRegistrar medicalRegistrar = medicalRegistrarService.getMedicalRegistrarById(id);
        if (medicalRegistrar == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Medical Registrar with provided ID does not exists."
            );
        }
        return modelMapper.map(medicalRegistrar, MedicalRegistrarDTO.class);
    }
}
