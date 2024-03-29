package com.solidcodeempire.clinic.model;

import com.solidcodeempire.clinic.enums.ExaminationType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class ExaminationDictionary {
    @Id
    private int id;

    @Column(nullable = false)
    private ExaminationType examinationType;

    @Column(nullable = false)
    private String examinationName;
}