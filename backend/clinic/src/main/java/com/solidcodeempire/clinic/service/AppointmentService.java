package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.enums.AppointmentStatus;
import com.solidcodeempire.clinic.exception.EntityNotFoundException;
import com.solidcodeempire.clinic.model.Appointment;
import com.solidcodeempire.clinic.model.Doctor;
import com.solidcodeempire.clinic.model.MedicalRegistrar;
import com.solidcodeempire.clinic.model.Patient;
import com.solidcodeempire.clinic.modelDTO.AppointmentDTO;
import com.solidcodeempire.clinic.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;


@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorService doctorService;
    private final MedicalRegistrarService medicalRegistrarService;
    private final PatientService patientService;

    public Iterable<AppointmentDTO> getAppointmentsList(int doctorId, Timestamp startDate, Timestamp endDate) {
        doctorService.getDoctorById(doctorId);
        return appointmentRepository.findAllAppointments(doctorId, startDate, endDate);
    }

    public Appointment getAppointmentById(int id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Appointment"));
    }

    public int createAppointment(Appointment newAppointment, int doctorId, int patientId, int medicalRegistrarId) {
        Doctor doctor = doctorService.getDoctorById(doctorId);
        Patient patient = patientService.getPatientById(patientId);
        MedicalRegistrar medicalRegistrar = medicalRegistrarService.getMedicalRegistrarById(medicalRegistrarId);
        newAppointment.setId(0);
        newAppointment.setDoctor(doctor);
        newAppointment.setPatient(patient);
        newAppointment.setMedicalRegistrar(medicalRegistrar);
        appointmentRepository.save(newAppointment);
        return (int)appointmentRepository.count();
    }

    public void deleteAppointment(int id) {
        Appointment appointment = getAppointmentById(id);
        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
    }
}
