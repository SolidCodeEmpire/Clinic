package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.model.AuthenticationResponse;
import com.solidcodeempire.clinic.model.ClinicUser;
import com.solidcodeempire.clinic.repository.ClinicUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthenticationService {

    private final ClinicUserRepository clinicUserRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse authenticate(String username, String password) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username,
                        password));

        ClinicUser clinicUser = clinicUserRepository.findByUsername(username).orElseThrow();

        int id = switch (clinicUser.getUserType()) {
            case DOCTOR -> clinicUser.getDoctor().getId();
            case LAB_TECHNICIAN -> clinicUser.getLabTechnician().getId();
            case LAB_SUPERVISOR -> clinicUser.getLabSupervisor().getId();
            case MEDICAL_REGISTRAR -> clinicUser.getMedicalRegistrar().getId();
            case ADMIN -> clinicUser.getId();
        };

        String token = jwtService.generateToken(clinicUser);

        return new AuthenticationResponse(token, id, clinicUser.getUserType());
    }
}
