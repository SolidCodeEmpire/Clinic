package com.solidcodeempire.clinic.controller;

import com.solidcodeempire.clinic.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class PatientController {
    final private PatientService patientService;

    @GetMapping("/patient/{id}")
    public String getPatient(@PathVariable int id) {

        return patientService.getPatient(id);
    }
}
