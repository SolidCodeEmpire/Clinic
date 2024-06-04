package com.solidcodeempire.clinic.controller;

import com.solidcodeempire.clinic.model.AuthenticationResponse;
import com.solidcodeempire.clinic.service.AuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public record LoginCredentials(String username, String password) {}

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginCredentials request) {
        return ResponseEntity.ok(authenticationService
                .authenticate(request.username(), request.password()));
    }
}
