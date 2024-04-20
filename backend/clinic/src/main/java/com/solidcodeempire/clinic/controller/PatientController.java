package com.solidcodeempire.clinic.controller;

import com.solidcodeempire.clinic.model.Patient;
import com.solidcodeempire.clinic.modelDTO.PatientDTO;
import com.solidcodeempire.clinic.service.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.record.RecordModule;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name="Patient")
public class PatientController {
    final private PatientService patientService;
    private final ModelMapper modelMapper = new ModelMapper().registerModule(new RecordModule());
    @GetMapping("/patients")
    @Operation(summary="Gets patients list")
    public List<PatientDTO> getPatientsList() {
        Iterable<Patient> patientsList = patientService.getPatientsList();
        List<PatientDTO> patientDTOList = new ArrayList<PatientDTO>();
        patientsList.forEach(patient -> {
            PatientDTO patientDTO = convertToDto(patient);
            patientDTOList.add(patientDTO);
        });
        return patientDTOList;
    }

    @GetMapping("/patient/{id}")
    @ResponseBody
    @Operation(summary="Get patient specified by ID")
    public PatientDTO getPatient(@PathVariable("id") int id) {
        return convertToDto(patientService.getPatientById(id));
    }

    @PostMapping(path = "/patient")
    @Operation(summary="Create Patient")
    public void createPatient(@RequestBody PatientDTO patientDTO) {
        Patient patient = convertToEntity(patientDTO);
        Patient patientAdded = patientService.createPatient(patient);
    }

    @DeleteMapping("/patient/{id}")
    @Operation(summary="Deactivates patient")
    public void deletePatient(@PathVariable("id") int id) {
        try {
            patientService.deletePatient(id);
        }catch (NullPointerException exception){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("patient/{id}")
    @Operation(summary="Updates patient")
    public void updatePatient(@RequestBody PatientDTO patientDTO) {
        try {
            Patient patient = convertToEntity(patientDTO);
            patientService.updatePatient(patient);
        }catch (NullPointerException exception){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }


    private PatientDTO convertToDto(Patient patient) {
        //To do
        return modelMapper.map(patient, PatientDTO.class);
    }

    private Patient convertToEntity(PatientDTO patientDTO) {
        //To do
        return modelMapper.map(patientDTO, Patient.class);
    }
}
