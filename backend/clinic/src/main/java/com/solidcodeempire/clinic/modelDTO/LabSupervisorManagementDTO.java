package com.solidcodeempire.clinic.modelDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LabSupervisorManagementDTO {
    private int id;
    private String name;
    private String surname;
    private ClinicUserDTO clinicUser;
}
