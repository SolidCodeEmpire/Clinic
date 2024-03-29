package com.solidcodeempire.clinic.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
public class ClinicUser {
    @Id
    private int id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role_id;

    @OneToOne(mappedBy = "user")
    private Doctor doctor;

    @OneToOne(mappedBy = "user")
    private LabTechnician labTechnician;

    @OneToOne(mappedBy = "user")
    private LabSupervisor labSupervisor;

    @OneToOne(mappedBy = "user")
    private MedicalRegistrar medicalRegistrar;

}
