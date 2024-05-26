package com.solidcodeempire.clinic.model;

import com.solidcodeempire.clinic.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Getter;

public record AuthenticationResponse(String token, int id, UserType userType) {}
