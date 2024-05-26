package com.solidcodeempire.clinic.modelDTO;

import com.solidcodeempire.clinic.enums.ExaminationStatus;
import com.solidcodeempire.clinic.model.ExaminationDictionary;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LaboratoryExaminationDTO {
    private int id;
    private String doctorsNotes;
    private Timestamp orderDate;
    private String result;
    private Timestamp finishedDate;
    private String supervisorsNotes;
    private Timestamp validationDate;
    private int appointmentId;
    private ExaminationStatus status;
    private int labTechnicianId;
    private int labSupervisorId;
    private String examinationDictionaryCode;
    private String examinationName;
}
