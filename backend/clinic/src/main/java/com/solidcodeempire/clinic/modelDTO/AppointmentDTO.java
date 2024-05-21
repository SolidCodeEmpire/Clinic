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
    private int patientId;
    private int medicalRegistrarId;
    private int doctorId;
    private List<PhysicalExaminationDTO> physicalExamination;
    private List<LaboratoryExaminationDTO> laboratoryExamination;

    public AppointmentDTO(int id, String description, String diagnosis, AppointmentStatus status, Timestamp visitDate, int patientId, int medicalRegistrarId, int doctorId) {
        this.id = id;
        this.description = description;
        this.diagnosis = diagnosis;
        this.status = status;
        this.visitDate = visitDate;
        this.patientId = patientId;
        this.medicalRegistrarId = medicalRegistrarId;
        this.doctorId = doctorId;
    }
}
