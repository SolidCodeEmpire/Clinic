package com.solidcodeempire.clinic.model;

import com.solidcodeempire.clinic.enums.AppointmentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
public class Appointment {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String description;

    private String diagnosis;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;

    @Column
    private Timestamp visitDate;

    @Column
    private Timestamp modifiedDate;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(nullable = false, name = "patient_id", referencedColumnName = "id")
    private Patient patient;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(nullable = false, name = "medical_registrar_id", referencedColumnName = "id")
    private MedicalRegistrar medicalRegistrar;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(nullable = false, name = "doctor_id", referencedColumnName = "id")
    private Doctor doctor;

    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL)
    private List<PhysicalExamination> physicalExamination;

    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL)
    private List<LaboratoryExamination> laboratoryExamination;
}
