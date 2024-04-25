package com.solidcodeempire.clinic.modelDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DoctorManagementDTO {
    private int id;
    private String name;
    private String surname;
    private int licenseNumber;
    private ClinicUserDTO clinicUser;
}