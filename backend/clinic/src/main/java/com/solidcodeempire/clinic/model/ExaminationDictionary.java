package com.solidcodeempire.clinic.model;

import com.solidcodeempire.clinic.enums.ExaminationType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class ExaminationDictionary {
    @Id
    private String code;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ExaminationType examinationType;

    @Column(nullable = false)
    private String examinationName;

    @OneToMany(mappedBy = "examinationDictionary", cascade = CascadeType.ALL)
    private List<PhysicalExamination> physicalExamination;
    @OneToMany(mappedBy = "examinationDictionary", cascade = CascadeType.ALL)
    private List<PhysicalExamination> laboratoryExamination;
}
