package com.solidcodeempire.clinic.controller;

import com.solidcodeempire.clinic.model.Doctor;
import com.solidcodeempire.clinic.modelDTO.DoctorDTO;
import com.solidcodeempire.clinic.service.DoctorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Tag(name="Doctor")
public class DoctorController {

    private final DoctorService doctorService;
    private final ModelMapper modelMapper;

    @GetMapping("/doctors")
    @Operation(summary="Gets doctors")
    public List<DoctorDTO> getDoctorsList() {
        List<Doctor> doctorList = doctorService.getDoctorsList();
        return doctorList.stream()
                .map(doctor -> modelMapper.map(doctor, DoctorDTO.class))
                .collect(Collectors.toList());
    }

    @GetMapping("/doctor/{id}")
    @ResponseBody
    @Operation(summary="Get doctors specified by ID")
    public DoctorDTO getDoctorById(@PathVariable("id") int id) {
        Doctor doctor = doctorService.getDoctorById(id);
        return modelMapper.map(doctor, DoctorDTO.class);
    }
}


