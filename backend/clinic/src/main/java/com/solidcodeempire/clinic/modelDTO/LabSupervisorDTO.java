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
public class LabSupervisorDTO {
    private int id;
    private String firstName;
    private String lastName;
    private List<LaboratoryExaminationDTO> laboratoryExaminations;
}
