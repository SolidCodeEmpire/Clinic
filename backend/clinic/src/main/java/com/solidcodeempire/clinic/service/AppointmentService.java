package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.enums.AppointmentStatus;
import com.solidcodeempire.clinic.model.Appointment;
import com.solidcodeempire.clinic.model.Doctor;
import com.solidcodeempire.clinic.model.MedicalRegistrar;
import com.solidcodeempire.clinic.model.Patient;
import com.solidcodeempire.clinic.modelDTO.AppointmentDTO;
import com.solidcodeempire.clinic.repository.AppointmentRepository;
import com.solidcodeempire.clinic.repository.DoctorRepository;
import com.solidcodeempire.clinic.repository.MedicalRegistrarRepository;
import com.solidcodeempire.clinic.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AppointmentService {

    final private AppointmentRepository appointmentRepository;
    final private DoctorRepository doctorRepository;
    final private MedicalRegistrarRepository medicalRegistrarRepository;
    final private PatientRepository patientRepository;

    public Iterable<AppointmentDTO> getAppointmentsList() {
        return appointmentRepository.findAllAppointments();
    }

    public Appointment getAppointmentById(int id) {
        return appointmentRepository.findById(id);
    }

    public void createAppointment(Appointment newAppointment, int doctorId, int patientId, int medicalRegistrarId) {
        Doctor doctor = doctorRepository.findById(doctorId);
        Patient patient = patientRepository.findById(patientId);
        MedicalRegistrar medicalRegistrar = medicalRegistrarRepository.findById(medicalRegistrarId);
        newAppointment.setDoctor(doctor);
        newAppointment.setPatient(patient);
        newAppointment.setMedicalRegistrar(medicalRegistrar);
        if(doctor != null && patient != null && medicalRegistrar != null){
            appointmentRepository.save(newAppointment);
        }
    }

    public void deleteAppointment(int id) {
        Appointment appointment = appointmentRepository.findById(id);
        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
    }

    public void updateAppointment(Appointment newAppointment, int doctorId, int patientId, int medicalRegistrarId) {
        Appointment appointment = appointmentRepository.findById(newAppointment.getId());
        Doctor doctor = doctorRepository.findById(doctorId);
        Patient patient = patientRepository.findById(patientId);
        MedicalRegistrar medicalRegistrar = medicalRegistrarRepository.findById(medicalRegistrarId);
        newAppointment.setId(appointment.getId());
        newAppointment.setDoctor(doctor);
        newAppointment.setPatient(patient);
        newAppointment.setMedicalRegistrar(medicalRegistrar);
        if(doctor != null && patient != null && medicalRegistrar != null){
            appointmentRepository.save(newAppointment);
        }
    }
}
