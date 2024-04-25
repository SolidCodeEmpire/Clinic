package com.solidcodeempire.clinic.controller;

import com.solidcodeempire.clinic.model.Doctor;
import com.solidcodeempire.clinic.modelDTO.DoctorDTO;
import com.solidcodeempire.clinic.service.DoctorService;
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

@RestController
@RequiredArgsConstructor
@Tag(name="Doctor")
public class DoctorController {
    final private DoctorService doctorService;
    final private ModelMapper modelMapper;

    @GetMapping("/doctors")
    @Operation(summary="Gets doctors list")
    public List<DoctorDTO> getDoctorsList() {
        return  (List<DoctorDTO>) doctorService.getDoctorsList();
    }

    @GetMapping("/doctor/{id}")
    @ResponseBody
    @Operation(summary="Get doctors specified by ID")
    public DoctorDTO getDoctor(@PathVariable("id") int id) {
        Doctor doctor = doctorService.getDoctorById(id);
        if (doctor == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Doctor with provided ID does not exists."
            );
        }
        return modelMapper.map(doctor, DoctorDTO.class);
    }
}


