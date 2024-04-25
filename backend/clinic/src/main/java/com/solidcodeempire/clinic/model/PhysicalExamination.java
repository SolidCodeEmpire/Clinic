package com.solidcodeempire.clinic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class PhysicalExamination {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String result;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(nullable = false, name = "appointment_id", referencedColumnName = "id")
    private Appointment appointment;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(nullable = false, name = "examination_dictionary_code", referencedColumnName = "code")
    private ExaminationDictionary examinationDictionary;
}
