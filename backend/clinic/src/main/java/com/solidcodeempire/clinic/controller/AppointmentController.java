package com.solidcodeempire.clinic.controller;

import com.solidcodeempire.clinic.model.Appointment;
import com.solidcodeempire.clinic.modelDTO.AppointmentDTO;
import com.solidcodeempire.clinic.service.AppointmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name="Appointment")
public class AppointmentController {

    private final AppointmentService appointmentService;
    final private ModelMapper modelMapper;

    @GetMapping("/appointments")
    @Operation(summary="Gets appointments list")
    public List<AppointmentDTO> getAppointmentsList(@RequestParam int doctorId,
                                                    @RequestParam Timestamp startDate,
                                                    @RequestParam Timestamp endDate) {
        return (List<AppointmentDTO>) appointmentService.getAppointmentsList(doctorId, startDate, endDate);
    }

    @GetMapping("/appointment/{id}")
    @Operation(summary="Get appointments specified by id")
    public AppointmentDTO getAppointmentById(@PathVariable("id") int id) {
        Appointment appointment = appointmentService.getAppointmentById(id);
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
        appointmentService.deleteAppointment(id);
    }

    @PatchMapping(path = "/appointment/{id}")
    @Operation(summary="Updates existing appointment")
    public void updateAppointment(@RequestBody AppointmentDTO appointmentDTO) {
        Appointment appointment = modelMapper.map(appointmentDTO, Appointment.class);
        appointmentService.deleteAppointment(appointment.getId());
        appointmentService.createAppointment(appointment,
                appointmentDTO.getDoctorId(),
                appointmentDTO.getPatientId(),
                appointmentDTO.getMedicalRegistrarId());

    }
}
