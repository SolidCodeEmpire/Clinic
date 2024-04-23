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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Tag(name="Admin")
@RequestMapping("/admin")
public class AdminController {
    final private MedicalRegistrarService medicalRegistrarService;
    final private ModelMapper modelMapper;

    @GetMapping("/medical_registrars")
    @Operation(summary="Gets medical registrars list")
    public List<MedicalRegistrarManagementDTO> getMedicalRegistrarsList() {
        return  (List<MedicalRegistrarManagementDTO>) medicalRegistrarService.getMedicalRegistrarsList();
    }

    @GetMapping("/medical_registrar/{id}")
    @ResponseBody
    @Operation(summary="Get medical registrar specified by ID")
    public MedicalRegistrarManagementDTO getMedicalRegistrar(@PathVariable("id") int id) {
        MedicalRegistrar medicalRegistrar = medicalRegistrarService.getMedicalRegistrarById(id);
        if (medicalRegistrar == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Medical Registrar with provided ID does not exists."
            );
        }
        return modelMapper.map(medicalRegistrar, MedicalRegistrarManagementDTO.class);
    }

    @PostMapping(path = "/medical_registrar")
    @Operation(summary="Create medical registrar")
    public void createMedicalRegistrar(@RequestBody MedicalRegistrarManagementDTO medicalRegistrarDTO) {
        MedicalRegistrar medicalRegistrar = modelMapper.map(medicalRegistrarDTO, MedicalRegistrar.class);
        medicalRegistrarService.createMedicalRegistrar(medicalRegistrar);
    }

    @DeleteMapping("/medical_registrar/{id}")
    @Operation(summary="Deactivates medical registrar")
    public void deleteMedicalRegistrar(@PathVariable("id") int id) {
        try {
            medicalRegistrarService.deleteMedicalRegistrar(id);
        }catch (NullPointerException exception){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Medical Registrar with provided ID does not exists."
            );
        }
    }

    @PatchMapping("medical_registrar/{id}")
    @Operation(summary="Updates medical registrar")
    public void updateMedicalRegistrar(@RequestBody MedicalRegistrarManagementDTO medicalRegistrarDTO) {
        try {
            MedicalRegistrar medicalRegistrar = modelMapper.map(medicalRegistrarDTO, MedicalRegistrar.class);
            medicalRegistrarService.updateMedicalRegistrar(medicalRegistrar);
        }catch (NullPointerException exception){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Medical Registrar with provided ID does not exists."
            );
        }
    }
}
