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
    private String name;
    private String surname;
    private int licenseNumber;
    private List<AppointmentDTO> appointments;

    public DoctorDTO(int id, String name, String surname, int licenseNumber) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.licenseNumber = licenseNumber;
    }
}
