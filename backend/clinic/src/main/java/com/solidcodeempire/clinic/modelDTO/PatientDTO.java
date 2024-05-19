package com.solidcodeempire.clinic.modelDTO;

import com.solidcodeempire.clinic.enums.PatientStatus;
import com.solidcodeempire.clinic.enums.Sex;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class PatientDTO{
    private int id;
    private String firstName;
    private String middleName;
    private String lastName;
    private String phoneNumber;
    private int socialSecurityNumber;
    private int insuranceNumber;
    private Sex sex;
    private Timestamp dateOfBirth;
    private String placeOfBirth;
    private PatientStatus status;
    private AddressDTO address;
}
