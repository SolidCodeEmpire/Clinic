package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.enums.AppointmentStatus;
import com.solidcodeempire.clinic.enums.ExaminationStatus;
import com.solidcodeempire.clinic.enums.UserType;
import com.solidcodeempire.clinic.exception.EntityNotFoundException;
import com.solidcodeempire.clinic.model.*;
import com.solidcodeempire.clinic.modelDTO.AppointmentDTO;
import com.solidcodeempire.clinic.modelDTO.ClinicUserDTO;
import com.solidcodeempire.clinic.repository.AppointmentRepository;
import com.solidcodeempire.clinic.repository.LaboratoryExaminationRepository;
import com.solidcodeempire.clinic.repository.PhysicalExaminationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;


@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PhysicalExaminationRepository physicalExaminationRepository;
    private final DoctorService doctorService;
    private final MedicalRegistrarService medicalRegistrarService;
    //private final LaboratoryExaminationService laboratoryExaminationService;
    private final LaboratoryExaminationRepository laboratoryExaminationRepository;
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
        if(appointment.getStatus() == AppointmentStatus.REGISTERED && user.getUserType() == UserType.MEDICAL_REGISTRAR){
            appointment.setStatus(AppointmentStatus.CANCELLED);
            appointmentRepository.save(appointment);
        }
    }

    public void updateAppointment(int id, AppointmentDTO appointmentDTO){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ClinicUserDTO user = clinicUserService.getUserById(((ClinicUser)auth.getPrincipal()).getId());

        Appointment oldAppointment = getAppointmentById(id);
        if(user.getUserType() == UserType.DOCTOR && user.getRoleId() == oldAppointment.getDoctor().getId()){
            Appointment newAppointment = cloneAppointment(oldAppointment);

            newAppointment.setModifiedDate(new Timestamp(System.currentTimeMillis()));
            newAppointment.setDiagnosis(appointmentDTO.getDiagnosis());

            for (LaboratoryExamination labExam : oldAppointment.getLaboratoryExamination()){
                cloneLabExam(labExam, newAppointment);
                archiveLaboratoryExamination(labExam);
            }

            for (PhysicalExamination phyExam : oldAppointment.getPhysicalExamination()){
                clonePhysicalExam(phyExam, newAppointment);
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

    public void clonePhysicalExam(PhysicalExamination oldExam, Appointment appointment) {
        PhysicalExamination newExam = new PhysicalExamination();

        newExam.setResult(oldExam.getResult());
        newExam.setExaminationDictionary(oldExam.getExaminationDictionary());
        newExam.setAppointment(appointment);

        physicalExaminationRepository.save(newExam);
    }

    private LaboratoryExamination cloneLabExam(LaboratoryExamination oldExam) {
        LaboratoryExamination newExam = new LaboratoryExamination();
        newExam.setResult(oldExam.getResult());
        newExam.setDoctorsNotes(oldExam.getDoctorsNotes());
        newExam.setOrderDate(oldExam.getOrderDate());
        newExam.setFinishedDate(oldExam.getFinishedDate());
        newExam.setSupervisorsNotes(oldExam.getSupervisorsNotes());
        newExam.setValidationDate(oldExam.getValidationDate());
        newExam.setStatus(oldExam.getStatus());
        newExam.setLabTechnician(oldExam.getLabTechnician());
        newExam.setLabSupervisor(oldExam.getLabSupervisor());
        newExam.setExaminationDictionary(oldExam.getExaminationDictionary());
        newExam.setAppointment(oldExam.getAppointment());

        return newExam;
    }

    public void cloneLabExam(LaboratoryExamination oldExam, Appointment appointment) {
        LaboratoryExamination newExam = cloneLabExam(oldExam);
        newExam.setAppointment(appointment);

        laboratoryExaminationRepository.save(newExam);
    }

    public void archiveLaboratoryExamination(LaboratoryExamination laboratoryExamination){
        laboratoryExamination.setStatus(ExaminationStatus.ARCHIVED);
        laboratoryExaminationRepository.save(laboratoryExamination);
    }
}
