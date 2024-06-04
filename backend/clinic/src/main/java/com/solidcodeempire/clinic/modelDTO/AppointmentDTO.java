package com.solidcodeempire.clinic.modelDTO;

import com.solidcodeempire.clinic.enums.AppointmentStatus;
import com.solidcodeempire.clinic.model.LaboratoryExamination;
import com.solidcodeempire.clinic.model.PhysicalExamination;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDTO {
    private int id;
    private String description;
    private String diagnosis;
    private AppointmentStatus status;
    private Timestamp visitDate;
    private Timestamp modifiedDate;
    private int patientId;
    private String patientFirstName;
    private String patientLastName;
    private int medicalRegistrarId;
    private int doctorId;
    private List<PhysicalExaminationDTO> physicalExamination;
    private List<LaboratoryExaminationDTO> laboratoryExamination;

    public AppointmentDTO(int id, String description, String diagnosis, AppointmentStatus status, Timestamp visitDate, Timestamp modifiedDate, int patientId, String patientFirstName, String patientLastName, int medicalRegistrarId, int doctorId) {
        this.id = id;
        this.description = description;
        this.diagnosis = diagnosis;
        this.status = status;
        this.visitDate = visitDate;
        this.modifiedDate = modifiedDate;
        this.patientId = patientId;
        this.patientFirstName = patientFirstName;
        this.patientLastName = patientLastName;
        this.medicalRegistrarId = medicalRegistrarId;
        this.doctorId = doctorId;
    }
}
