package com.solidcodeempire.clinic.modelDTO;

import com.solidcodeempire.clinic.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ClinicUserDTO {
    private String username;
    private String email;
    private String password;
    private UserType userType;
    private Boolean isActive;
}
