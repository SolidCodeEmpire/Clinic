package com.solidcodeempire.clinic.modelDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MedicalRegistrarManagementDTO {
    private int id;
    private String firstName;
    private String lastName;
    private ClinicUserDTO clinicUser;
}
