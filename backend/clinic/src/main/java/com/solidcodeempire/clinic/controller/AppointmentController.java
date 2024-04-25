package com.solidcodeempire.clinic.controller;

import com.solidcodeempire.clinic.model.Appointment;
import com.solidcodeempire.clinic.modelDTO.AppointmentDTO;
import com.solidcodeempire.clinic.service.AppointmentService;
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
@Tag(name="Appointment")
public class AppointmentController {

    private final AppointmentService appointmentService;
    final private ModelMapper modelMapper;

    @GetMapping("/appointments")
    @Operation(summary="Gets appointments list")
    public List<AppointmentDTO> getAppointmentsList() {
        List<Appointment> appointmentsList = (List<Appointment>) appointmentService.getAppointmentsList();
        return appointmentsList.stream()
                .map(appointment -> modelMapper.map(appointment, AppointmentDTO.class))
                .collect(Collectors.toList());
    }

    @GetMapping("/appointment/{id}")
    @Operation(summary="Get appointments specified by id")
    public AppointmentDTO getAppointmentById(@PathVariable("id") int id) {
        Appointment appointment = appointmentService.getAppointmentById(id);
        if (appointment == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Appointment with provided ID does not exists."
            );
        }
        return modelMapper.map(appointment, AppointmentDTO.class);
    }

    @PostMapping(path = "/appointment")
    @Operation(summary="Creates new appointment")
    public void createAppointment(@RequestBody AppointmentDTO appointmentDTO) {
        Appointment appointment = modelMapper.map(appointmentDTO, Appointment.class);
        appointmentService.createAppointment(appointment,
                appointmentDTO.getDoctorId(),
                appointmentDTO.getPatientId(),
                appointmentDTO.getMedicalRegistrarId());
    }

    @DeleteMapping("/appointment/{id}")
    @Operation(summary="Cancels patient appointment")
    public void cancelAppointment(@PathVariable("id") int id) {
        try {
            appointmentService.deleteAppointment(id);
        }catch (NullPointerException exception){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Appointment with provided ID does not exists."
            );
        }
    }

    @PatchMapping(path = "/appointment/{id}")
    @Operation(summary="Updates existing appointment")
    public void updateAppointment(@RequestBody AppointmentDTO appointmentDTO) {
        try {
            Appointment appointment = modelMapper.map(appointmentDTO, Appointment.class);
            appointmentService.updateAppointment(appointment,
                    appointmentDTO.getDoctorId(),
                    appointmentDTO.getPatientId(),
                    appointmentDTO.getMedicalRegistrarId());
        }catch (NullPointerException exception){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Appointment with provided ID does not exists."
            );
        }
    }
}
