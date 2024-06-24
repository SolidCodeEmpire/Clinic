package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.enums.AppointmentStatus;
import com.solidcodeempire.clinic.enums.UserType;
import com.solidcodeempire.clinic.exception.EntityNotFoundException;
import com.solidcodeempire.clinic.model.*;
import com.solidcodeempire.clinic.modelDTO.AppointmentDTO;
import com.solidcodeempire.clinic.modelDTO.ClinicUserDTO;
import com.solidcodeempire.clinic.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;


@Service
@RequiredArgsConstructor(onConstructor_ = {@Lazy})
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorService doctorService;
    private final MedicalRegistrarService medicalRegistrarService;
    private final LaboratoryExaminationService laboratoryExaminationService;
    private final PhysicalExaminationService physicalExaminationService;
    private final ClinicUserService clinicUserService;
    private final PatientService patientService;

    public Iterable<AppointmentDTO> getAppointmentsList(int doctorId, Timestamp startDate, Timestamp endDate) {
        doctorService.getDoctorById(doctorId);
        return appointmentRepository.findAllAppointments(doctorId, startDate, endDate);
    }

    public Appointment getAppointmentById(int id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Appointment"));
    }

    public void createAppointment(Appointment newAppointment, int doctorId, int patientId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ClinicUserDTO user = clinicUserService.getUserById(((ClinicUser)auth.getPrincipal()).getId());

        Doctor doctor = doctorService.getDoctorById(doctorId);
        Patient patient = patientService.getPatientById(patientId);
        MedicalRegistrar medicalRegistrar = medicalRegistrarService.getMedicalRegistrarById(user.getRoleId());
        newAppointment.setId(0);
        newAppointment.setDoctor(doctor);
        newAppointment.setPatient(patient);
        newAppointment.setMedicalRegistrar(medicalRegistrar);
        appointmentRepository.save(newAppointment);
    }

    public void deleteAppointment(int id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ClinicUserDTO user = clinicUserService.getUserById(((ClinicUser)auth.getPrincipal()).getId());
        Appointment appointment = getAppointmentById(id);

        if(appointment.getStatus() == AppointmentStatus.ENDED || appointment.getStatus() == AppointmentStatus.ARCHIVED){
            return;
        }

        if(user.getUserType() != UserType.MEDICAL_REGISTRAR && user.getUserType() != UserType.DOCTOR){
            return;
        }

        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
    }

    public void updateAppointment(int id, AppointmentDTO appointmentDTO){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ClinicUserDTO user = clinicUserService.getUserById(((ClinicUser)auth.getPrincipal()).getId());

        Appointment oldAppointment = getAppointmentById(id);
        if(user.getUserType() == UserType.DOCTOR && user.getRoleId() == oldAppointment.getDoctor().getId()){
            Appointment newAppointment = cloneAppointment(oldAppointment);

            newAppointment.setModifiedDate(new Timestamp(System.currentTimeMillis()));
            newAppointment.setDiagnosis(appointmentDTO.getDiagnosis());
            newAppointment.setStatus(appointmentDTO.getStatus());

            for (LaboratoryExamination labExam : oldAppointment.getLaboratoryExamination()){
                laboratoryExaminationService.cloneLabExam(labExam, newAppointment);
                laboratoryExaminationService.archiveLaboratoryExamination(labExam);
            }

            for (PhysicalExamination phyExam : oldAppointment.getPhysicalExamination()){
                physicalExaminationService.clonePhysicalExam(phyExam, newAppointment);
            }

            oldAppointment.setStatus(AppointmentStatus.ARCHIVED);
            appointmentRepository.save(oldAppointment);
            appointmentRepository.save(newAppointment);
        }
    }

    private Appointment cloneAppointment(Appointment oldAppointment){
        Appointment newAppointment = new Appointment();
        newAppointment.setDescription(oldAppointment.getDescription());
        newAppointment.setDiagnosis(oldAppointment.getDiagnosis());
        newAppointment.setStatus(oldAppointment.getStatus());
        newAppointment.setVisitDate(oldAppointment.getVisitDate());
        newAppointment.setModifiedDate(oldAppointment.getModifiedDate());
        newAppointment.setPatient(oldAppointment.getPatient());
        newAppointment.setMedicalRegistrar(oldAppointment.getMedicalRegistrar());
        newAppointment.setDoctor(oldAppointment.getDoctor());
        return newAppointment;
    }
}
