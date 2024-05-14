package com.solidcodeempire.clinic.modelDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PhysicalExaminationDTO {
    private int id;
    private String result;
    private int appointmentId;
    private String examinationDictionaryCode;
}