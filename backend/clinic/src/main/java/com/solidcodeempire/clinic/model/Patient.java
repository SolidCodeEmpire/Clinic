package com.solidcodeempire.clinic.model;

import com.solidcodeempire.clinic.enums.Sex;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
public class Patient {
    @Id
    @GeneratedValue
    private int id;

    @Column(nullable = false)
    private String name;

    private String middleName;

    @Column(nullable = false)
    private String surname;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private int socialSecurityNumber;

    private int insuranceNumber;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Sex sex;

    @Column(nullable = false)
    private Date dateOfBirth;

    private String placeOfBirth;

    @OneToOne(cascade = CascadeType.ALL)
    private Address address;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "patient", cascade = CascadeType.ALL)
    private List<Appointment> appointments;
}
