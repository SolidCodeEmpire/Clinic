package com.solidcodeempire.clinic.controller;

import com.solidcodeempire.clinic.service.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Tag(name="Patient")
public class PatientController {
    final private PatientService patientService;

    @GetMapping("/patient/{id}")
    @Operation(summary="Get patient specified by ID")
    public String getPatient(@PathVariable int id) {

        return patientService.getPatient(id);
    }
}
