package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.enums.UserType;
import com.solidcodeempire.clinic.model.ClinicUser;
import com.solidcodeempire.clinic.model.MedicalRegistrar;
import com.solidcodeempire.clinic.repository.ClinicUserRepository;
import com.solidcodeempire.clinic.repository.MedicalRegistrarRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MedicalRegistrarService {

    final private MedicalRegistrarRepository medicalRegistrarRepository;
    final private ClinicUserRepository clinicUserRepository;
    public Iterable<MedicalRegistrar> getMedicalRegistrarsList() {
        return medicalRegistrarRepository.findAllMedicalRegistrar();
    }

    public MedicalRegistrar getMedicalRegistrarById(int id) {
        return medicalRegistrarRepository.findById(id);
    }

    @Transactional
    public void createMedicalRegistrar(MedicalRegistrar newMedicalRegistrar) {
        newMedicalRegistrar.setId(0);
        ClinicUser newUser = newMedicalRegistrar.getUser();
        newUser.setId(0);
        newUser.setIsActive(true);
        newUser.setUserType(UserType.MEDICAL_REGISTRAR);
        newUser.setMedicalRegistrar(newMedicalRegistrar);
        medicalRegistrarRepository.save(newMedicalRegistrar);
        clinicUserRepository.save(newUser);
    }

    public void deleteMedicalRegistrar(int id) {
        MedicalRegistrar medicalRegistrar = medicalRegistrarRepository.findById(id);
        ClinicUser user =  medicalRegistrar.getUser();
        user.setIsActive(false);
        clinicUserRepository.save(user);
    }

    public void updateMedicalRegistrar(MedicalRegistrar newMedicalRegistrar) {
        MedicalRegistrar medicalRegistrar = medicalRegistrarRepository.findById(newMedicalRegistrar.getId());
        ClinicUser newUser = newMedicalRegistrar.getUser();
        newUser.setId(medicalRegistrar.getUser().getId());
        newUser.setUserType(UserType.MEDICAL_REGISTRAR);
        newUser.setMedicalRegistrar(medicalRegistrar);
        medicalRegistrarRepository.save(newMedicalRegistrar);
        clinicUserRepository.save(newUser);
    }
}
