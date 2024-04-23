package com.solidcodeempire.clinic.modelDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MedicalRegistrarManagementDTO {
    private int id;
    private String name;
    private String surname;
    private ClinicUserDTO clinicUser;
}
