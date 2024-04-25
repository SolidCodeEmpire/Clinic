package com.solidcodeempire.clinic.model;

import com.solidcodeempire.clinic.enums.ExaminationStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@Getter
@Setter
public class LaboratoryExamination {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    private String doctorsNotes;

    @Column(nullable = false)
    private Timestamp orderDate;

    @Column(nullable = false)
    private String result;

    private Timestamp finishedDate;

    private String supervisorsNotes;

    private Timestamp validationDate;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(nullable = false, name="appointment_id", referencedColumnName = "id")
    private Appointment appointment;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ExaminationStatus status;

    @ManyToOne(cascade = CascadeType.ALL)
    private LabTechnician labTechnician;

    @ManyToOne(cascade = CascadeType.ALL)
    private LabSupervisor labSupervisor;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(nullable = false, name = "examination_dictionary_code", referencedColumnName = "code")
    private ExaminationDictionary examinationDictionary;
}
