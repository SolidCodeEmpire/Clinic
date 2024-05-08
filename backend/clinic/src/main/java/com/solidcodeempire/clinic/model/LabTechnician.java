package com.solidcodeempire.clinic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class LabTechnician {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String surname;

    @OneToMany(mappedBy = "labTechnician", cascade = CascadeType.ALL)
    private List<LaboratoryExamination> laboratoryExaminations;

    @OneToOne
    @JoinTable(name = "lab_technician_user")
    private ClinicUser user;
}
