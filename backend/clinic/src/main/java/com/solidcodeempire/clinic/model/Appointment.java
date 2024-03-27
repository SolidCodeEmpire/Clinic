package com.solidcodeempire.clinic.model;

import com.solidcodeempire.clinic.enums.AppointmentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
public class Appointment {
    @Id
    @GeneratedValue
    private int id;

    @Column(nullable = false)
    private String description;

    private String diagnosis;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;

    @Column(nullable = false)
    private Date registeredDate;

    private Date finishedDate;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(nullable = false)
    private Patient patient;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(nullable = false)
    private MedicalRegistrar medicalRegistrar;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(nullable = false)
    private Doctor doctor;

    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL)
    private List<PhysicalExamination> physicalExamination;

    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL)
    private List<LaboratoryExamination> laboratoryExamination;
}
