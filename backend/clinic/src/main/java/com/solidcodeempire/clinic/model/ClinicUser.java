package com.solidcodeempire.clinic.model;

import com.solidcodeempire.clinic.enums.UserType;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
public class ClinicUser implements UserDetails {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserType userType;

    @Column(nullable = false)
    private Boolean isActive;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    private Doctor doctor;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    private LabTechnician labTechnician;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    private LabSupervisor labSupervisor;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    private MedicalRegistrar medicalRegistrar;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(userType.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
