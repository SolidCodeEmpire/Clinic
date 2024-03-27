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
    private int id;

    private String name;

    private String surname;

    @OneToMany(mappedBy = "registered by", cascade = CascadeType.ALL)
    private List<Appointment> appointment;
}
