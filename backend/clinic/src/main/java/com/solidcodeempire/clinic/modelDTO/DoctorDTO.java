package com.solidcodeempire.clinic.modelDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDTO {
    private int id;
    private String firstName;
    private String lastName;
    private int licenseNumber;
    private List<AppointmentDTO> appointments;

    public DoctorDTO(int id, String firstName, String lastName, int licenseNumber) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.licenseNumber = licenseNumber;
    }
}
