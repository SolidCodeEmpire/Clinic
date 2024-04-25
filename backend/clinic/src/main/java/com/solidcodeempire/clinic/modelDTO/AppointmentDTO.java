package com.solidcodeempire.clinic.modelDTO;

import com.solidcodeempire.clinic.enums.AppointmentStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDTO {
    private int id;
    private String description;
    private String diagnosis;
    private AppointmentStatus status;
    private Timestamp registeredDate;
    private Timestamp finishedDate;
    private int patientId;
    private int medicalRegistrarId;
    private int doctorId;
}
