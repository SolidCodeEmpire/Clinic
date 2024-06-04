package com.solidcodeempire.clinic.controller;

import com.solidcodeempire.clinic.model.*;
import com.solidcodeempire.clinic.modelDTO.ClinicUserDTO;
import com.solidcodeempire.clinic.service.ClinicUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name="Admin")
@RequestMapping("/admin")
public class AdminController {

    private final ModelMapper modelMapper;
    private final ClinicUserService clinicUserService;

    @GetMapping("/users")
    @Operation(summary="Gets users list")
    public List<ClinicUserDTO> getUsersList() {
        return clinicUserService.getUsersList();
    }

    @GetMapping("/user/{id}")
    @Operation(summary="Gets user specified by ID")
    public ClinicUserDTO getUserById(@PathVariable("id") int id) {
        return clinicUserService.getUserById(id);
    }

    @DeleteMapping("/user/{id}")
    @Operation(summary="Deactivates user")
    public void deleteUser(@PathVariable("id") int id) {
        clinicUserService.deleteUser(id);
    }

    @PostMapping(path = "/user")
    @Operation(summary="Create user")
    public void createUser(@RequestBody ClinicUserDTO clinicUserDTO) {
        ClinicUser clinicUser = modelMapper.map(clinicUserDTO, ClinicUser.class);
        Object dto = switch (clinicUser.getUserType()){
            case DOCTOR -> modelMapper.map(clinicUserDTO, Doctor.class);
            case LAB_TECHNICIAN -> modelMapper.map(clinicUserDTO, LabTechnician.class);
            case LAB_SUPERVISOR -> modelMapper.map(clinicUserDTO, LabSupervisor.class);
            case MEDICAL_REGISTRAR -> modelMapper.map(clinicUserDTO, MedicalRegistrar.class);
            case ADMIN -> null;
        };
        clinicUserService.createUser(clinicUser, dto);
    }

    @PatchMapping("user/{id}")
    @Operation(summary="Updates user")
    public void updateUser(@RequestBody ClinicUserDTO clinicUserDTO) {
        clinicUserService.deleteUser(clinicUserDTO.getId());
        createUser(clinicUserDTO);
    }
}
