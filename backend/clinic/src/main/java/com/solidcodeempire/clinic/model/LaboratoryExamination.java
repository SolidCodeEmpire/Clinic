package com.solidcodeempire.clinic.model;

import com.solidcodeempire.clinic.enums.ExaminationStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class LaboratoryExamination {
    @Id
    private int id;

    private String doctorsNotes;

    @Column(nullable = false)
    private Date orderDate;

    private String result;

    private Date finishedDate;

    private String supervisorsNotes;

    private Date validationDate;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(nullable = false)
    private Appointment appointment;

    @Column(nullable = false)
    private ExaminationStatus status;

    @ManyToOne(cascade = CascadeType.ALL)
    private LabTechnician labTechnician;

    @ManyToOne(cascade = CascadeType.ALL)
    private LabSupervisor labSupervisor;

    @ManyToOne(cascade = CascadeType.ALL)
    private ExaminationDictionary name;
}
