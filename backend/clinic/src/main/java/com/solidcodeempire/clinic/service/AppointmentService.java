package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.enums.AppointmentStatus;
import com.solidcodeempire.clinic.exception.EntityNotFoundException;
import com.solidcodeempire.clinic.model.Appointment;
import com.solidcodeempire.clinic.model.Doctor;
import com.solidcodeempire.clinic.model.MedicalRegistrar;
import com.solidcodeempire.clinic.model.Patient;
import com.solidcodeempire.clinic.modelDTO.AppointmentDTO;
import com.solidcodeempire.clinic.repository.AppointmentRepository;
import com.solidcodeempire.clinic.repository.MedicalRegistrarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;


@Service
@RequiredArgsConstructor
public class AppointmentService {

    final private AppointmentRepository appointmentRepository;
    final private DoctorService doctorService;
    final private MedicalRegistrarRepository medicalRegistrarRepository;
    final private PatientService patientService;

    public Iterable<AppointmentDTO> getAppointmentsList(int doctorId, Timestamp startDate, Timestamp endDate) {
        doctorService.getDoctorById(doctorId);
        return appointmentRepository.findAllAppointments(doctorId, startDate, endDate);
    }

    public Appointment getAppointmentById(int id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Appointment"));
    }

    public void createAppointment(Appointment newAppointment, int doctorId, int patientId, int medicalRegistrarId) {
        Doctor doctor = doctorService.getDoctorById(doctorId);
        Patient patient = patientService.getPatientById(patientId);
        MedicalRegistrar medicalRegistrar = medicalRegistrarRepository.findById(medicalRegistrarId);
        newAppointment.setDoctor(doctor);
        newAppointment.setPatient(patient);
        newAppointment.setMedicalRegistrar(medicalRegistrar);
        if(doctor != null && patient != null && medicalRegistrar != null){
            appointmentRepository.save(newAppointment);
        }
    }

    public void deleteAppointment(int id) {
        Appointment appointment = getAppointmentById(id);
        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
    }

    public void updateAppointment(Appointment newAppointment, int doctorId, int patientId, int medicalRegistrarId) {
        Appointment appointment = getAppointmentById(newAppointment.getId());
        Doctor doctor = doctorService.getDoctorById(doctorId);
        Patient patient = patientService.getPatientById(patientId);
        MedicalRegistrar medicalRegistrar = medicalRegistrarRepository.findById(medicalRegistrarId);
        newAppointment.setId(appointment.getId());
        newAppointment.setDoctor(doctor);
        newAppointment.setPatient(patient);
        newAppointment.setMedicalRegistrar(medicalRegistrar);
        if(patient != null && medicalRegistrar != null){
            appointmentRepository.save(newAppointment);
        }
    }
}
