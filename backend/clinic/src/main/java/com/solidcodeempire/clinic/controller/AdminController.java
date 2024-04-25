package com.solidcodeempire.clinic.controller;

import com.solidcodeempire.clinic.model.Doctor;
import com.solidcodeempire.clinic.model.MedicalRegistrar;
import com.solidcodeempire.clinic.modelDTO.DoctorManagementDTO;
import com.solidcodeempire.clinic.modelDTO.MedicalRegistrarManagementDTO;
import com.solidcodeempire.clinic.service.DoctorService;
import com.solidcodeempire.clinic.service.MedicalRegistrarService;
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
@Tag(name="Admin")
@RequestMapping("/admin")
public class AdminController {
    final private MedicalRegistrarService medicalRegistrarService;
    final private DoctorService doctorService;
    final private ModelMapper modelMapper;

    @GetMapping("/medical_registrars")
    @Operation(summary="Gets medical registrars list")
    public List<MedicalRegistrarManagementDTO> getMedicalRegistrarsList() {
        return  (List<MedicalRegistrarManagementDTO>) medicalRegistrarService.getDetailedMedicalRegistrarsList();
    }

    //TODO Error while mapping
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

    @GetMapping("/doctors")
    @Operation(summary="Gets doctors list")
    public List<DoctorManagementDTO> getDoctorsList() {
        return  (List<DoctorManagementDTO>) doctorService.getDetailedDoctorsList();
    }

    //TODO Error while mapping
    @GetMapping("/doctor/{id}")
    @ResponseBody
    @Operation(summary="Get doctor specified by ID")
    public DoctorManagementDTO getDoctor(@PathVariable("id") int id) {
        Doctor doctor = doctorService.getDoctorById(id);
        if (doctor == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Doctor with provided ID does not exists."
            );
        }
        return modelMapper.map(doctor, DoctorManagementDTO.class);
    }

    @PostMapping(path = "/doctor")
    @Operation(summary="Creates doctor")
    public void createDoctor(@RequestBody DoctorManagementDTO doctorManagementDTO) {
        Doctor doctor = modelMapper.map(doctorManagementDTO, Doctor.class);
        doctorService.createDoctor(doctor);
    }

    @DeleteMapping("/doctor/{id}")
    @Operation(summary="Deactivates doctor")
    public void deleteDoctor(@PathVariable("id") int id) {
        try {
            doctorService.deleteDoctor(id);
        }catch (NullPointerException exception){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Doctor with provided ID does not exists."
            );
        }
    }

    @PatchMapping("doctor/{id}")
    @Operation(summary="Updates doctor")
    public void updateDoctor(@RequestBody DoctorManagementDTO doctorManagementDTO) {
        try {
            Doctor doctor = modelMapper.map(doctorManagementDTO, Doctor.class);
            doctorService.updateDoctor(doctor);
        }catch (NullPointerException exception){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Doctor with provided ID does not exists."
            );
        }
    }
}
