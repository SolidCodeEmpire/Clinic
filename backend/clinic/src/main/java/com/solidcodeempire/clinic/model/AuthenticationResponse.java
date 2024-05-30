package com.solidcodeempire.clinic.model;

import com.solidcodeempire.clinic.enums.UserType;

public record AuthenticationResponse(String token, int id, UserType userType) {}
