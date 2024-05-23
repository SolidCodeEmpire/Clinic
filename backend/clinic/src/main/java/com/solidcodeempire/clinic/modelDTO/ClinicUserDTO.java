package com.solidcodeempire.clinic.modelDTO;

import com.solidcodeempire.clinic.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClinicUserDTO {
    private int id;
    private String username;
    private String email;
    private String password;
    private UserType userType;
    private Boolean isActive;
    private int roleId;
    private String firstName;
    private String lastName;
    private int licenseNumber;

    public ClinicUserDTO(int id, String username, String email, String password, UserType userType, Boolean isActive, int roleId, String firstName, String lastName) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.userType = userType;
        this.isActive = isActive;
        this.roleId = roleId;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
