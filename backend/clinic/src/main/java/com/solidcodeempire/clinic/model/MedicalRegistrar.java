package com.solidcodeempire.clinic.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class MedicalRegistrar {
    @Id
    @GeneratedValue
    private int id;

    private String name;

    private String surname;

    @OneToMany(mappedBy = "medicalRegistrar", cascade = CascadeType.ALL)
    private List<Appointment> appointment;

    @OneToOne
    @JoinTable(name = "medical_registrar_user")
    private ClinicUser user;
}
