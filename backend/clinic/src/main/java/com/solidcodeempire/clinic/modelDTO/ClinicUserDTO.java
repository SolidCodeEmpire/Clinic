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
    private int userId;
    private String username;
    private String email;
    private String password;
    private UserType userType;
    private Boolean isActive;
    private int id;
    private String firstName;
    private String lastName;
    private int licenseNumber;

    public ClinicUserDTO(int userId, String username, String email, String password, UserType userType, Boolean isActive, int id, String firstName, String lastName) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.password = password;
        this.userType = userType;
        this.isActive = isActive;
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
