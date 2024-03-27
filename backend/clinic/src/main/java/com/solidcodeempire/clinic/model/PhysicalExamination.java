package com.solidcodeempire.clinic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class PhysicalExamination {
    @Id
    private int id;

    private String result;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(nullable = false)
    private Appointment appointment;

    @ManyToOne(cascade = CascadeType.ALL)
    private ExaminationDictionary name;
}
