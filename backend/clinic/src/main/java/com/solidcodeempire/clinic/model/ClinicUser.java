package com.solidcodeempire.clinic.model;

import com.solidcodeempire.clinic.enums.UserType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
public class ClinicUser {
    @Id
    @GeneratedValue
    private int id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private UserType userType;

    @Column(nullable = false)
    private Boolean isActive;

    @OneToOne(mappedBy = "user")
    private Doctor doctor;

    @OneToOne(mappedBy = "user")
    private LabTechnician labTechnician;

    @OneToOne(mappedBy = "user")
    private LabSupervisor labSupervisor;

    @OneToOne(mappedBy = "user")
    private MedicalRegistrar medicalRegistrar;

}
