package com.solidcodeempire.clinic.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class EncryptionService {
    public static String hashPassword(String plainPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.encode(plainPassword);
    }
}
