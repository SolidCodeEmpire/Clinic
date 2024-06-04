package com.solidcodeempire.clinic.controller;

import com.solidcodeempire.clinic.model.LabSupervisor;
import com.solidcodeempire.clinic.modelDTO.LabSupervisorDTO;
import com.solidcodeempire.clinic.service.LabSupervisorService;
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
@Tag(name="Lab Supervisor")
public class LabSupervisorController {

    private final LabSupervisorService labSupervisorService;
    private final ModelMapper modelMapper;

    @GetMapping("/lab_supervisors")
    @Operation(summary="Gets lab supervisors list and their laboratory examinations")
    public List<LabSupervisorDTO> getLabSupervisorsList() {
        List<LabSupervisor> labSupervisorList = (List<LabSupervisor>) labSupervisorService.getLabSupervisorsList();
        return labSupervisorList.stream()
                .map(labSupervisor -> modelMapper.map(labSupervisor,LabSupervisorDTO.class))
                .collect(Collectors.toList());
    }

    @GetMapping("/lab_supervisor/{id}")
    @ResponseBody
    @Operation(summary="Get lab supervisor specified by ID and his laboratory examinations")
    public LabSupervisorDTO getLabSupervisor(@PathVariable("id") int id) {
        LabSupervisor labSupervisor = labSupervisorService.getLabSupervisorById(id);
        return modelMapper.map(labSupervisor, LabSupervisorDTO.class);
    }
}
