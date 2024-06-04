package com.solidcodeempire.clinic.controller;

import com.solidcodeempire.clinic.model.Patient;
import com.solidcodeempire.clinic.modelDTO.PatientDTO;
import com.solidcodeempire.clinic.service.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Tag(name="Patient")
public class PatientController {

    public static final int DEFAULT_PAGE_SIZE = 20;
    public static final int MINIMAL_PAGE_SIZE = 1;
    public static final int FIRST_PAGE = 0;

    final private PatientService patientService;
    final private ModelMapper modelMapper;
    @GetMapping("/patients")
    @Operation(summary="Gets patients list")
    public List<PatientDTO> getPatientsList(@RequestParam int page, @RequestParam int pageSize) {
        // To do - add cache
        page = page > FIRST_PAGE ? page : FIRST_PAGE;
        pageSize = pageSize > MINIMAL_PAGE_SIZE ? pageSize : DEFAULT_PAGE_SIZE;

        List<Patient> patientsList = (List<Patient>)patientService.getPatientsList(PageRequest.of(page, pageSize));
        return patientsList.stream()
                .map(patient -> modelMapper.map(patient, PatientDTO.class))
                .collect(Collectors.toList());
    }

    @GetMapping("/patient/{id}")
    @ResponseBody
    @Operation(summary="Get patient specified by ID")
    public PatientDTO getPatientById(@PathVariable("id") int id) {
        Patient patient = patientService.getPatientById(id);
        return modelMapper.map(patient, PatientDTO.class);
    }

    @GetMapping("/patient/filter")
    @ResponseBody
    @Operation(summary="Get patient specified by first name, last name or social security number")
    public List<PatientDTO> getPatient(@RequestParam(required = false) String firstName,
                                 @RequestParam(required = false) String lastName,
                                 @RequestParam(required = false) Integer socialSecurityNumber) {
        List<Patient> patientList = patientService.getPatient(firstName,lastName, socialSecurityNumber);
        return patientList.stream()
                .map(patient -> modelMapper.map(patient, PatientDTO.class))
                .collect(Collectors.toList());
    }

    @PostMapping(path = "/patient")
    @Operation(summary="Create Patient")
    public void createPatient(@RequestBody PatientDTO patientDTO) {
        Patient patient = modelMapper.map(patientDTO, Patient.class);
        patientService.createPatient(patient);
    }

    @DeleteMapping("/patient/{id}")
    @Operation(summary="Deactivates patient")
    public void deletePatient(@PathVariable("id") int id) {
        patientService.deletePatient(id);
    }

    @PatchMapping("patient/{id}")
    @Operation(summary="Updates patient")
    public void updatePatient(@RequestBody PatientDTO patientDTO) {
        Patient patient = modelMapper.map(patientDTO, Patient.class);
        patientService.updatePatient(patient);
    }
}
