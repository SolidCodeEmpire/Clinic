package com.solidcodeempire.clinic.configuration;

import com.solidcodeempire.clinic.filter.JwtAuthenticationFilter;
import com.solidcodeempire.clinic.service.UserDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {
    private final UserDetailsService userDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        req -> req
                                .requestMatchers("/login/**", "/swagger-ui/**").permitAll()

                                .requestMatchers(
                                        "/admin/**",
                                        "/doctor/**",
                                        "/doctors/**",
                                        "/lab_supervisor/**",
                                        "/lab_supervisors/**",
                                        "/lab_technicians/**",
                                        "/lab_technician/**",
                                        "/medical_registrar/**",
                                        "/medical_registrars/**"
                                ).hasAuthority("ADMIN")

                                .requestMatchers("/physical_examinations/**", "/physical_examination/**").hasAuthority("DOCTOR")

                                .requestMatchers(HttpMethod.GET, "/examination_dictionary/**").hasAnyAuthority("LAB_TECHNICIAN", "LAB_SUPERVISOR", "DOCTOR")
                                .requestMatchers("/examination_dictionary/**").hasAnyAuthority("DOCTOR", "ADMIN", "MEDICAL_REGISTRAR")

                                .requestMatchers(HttpMethod.GET, "/patient/**").hasAnyAuthority("DOCTOR", "MEDICAL_REGISTRAR")
                                .requestMatchers("/patient/**", "/patients/**").hasAuthority("MEDICAL_REGISTRAR")

                                .requestMatchers(HttpMethod.GET, "/laboratory_examination/**", "/laboratory_examinations/**").hasAnyAuthority("DOCTOR", "LAB_SUPERVISOR", "LAB_TECHNICIAN")
                                .requestMatchers(HttpMethod.POST, "/laboratory_examination/**").hasAuthority("DOCTOR")
                                .requestMatchers(HttpMethod.PATCH, "/laboratory_examination/**").hasAnyAuthority("LAB_TECHNICIAN", "LAB_SUPERVISOR")

                                .requestMatchers(HttpMethod.GET, "/appointment/**", "/appointments/**").hasAnyAuthority("DOCTOR", "MEDICAL_REGISTRAR")
                                .requestMatchers(HttpMethod.POST, "/appointment/**").hasAuthority("MEDICAL_REGISTRAR")
                                .requestMatchers(HttpMethod.PATCH, "/appointment/**").hasAuthority("DOCTOR")
                                .requestMatchers(HttpMethod.DELETE, "/appointment/**").hasAnyAuthority("DOCTOR", "MEDICAL_REGISTRAR")

                                .requestMatchers(HttpMethod.GET, "/doctors/**", "/doctor/**").hasAnyAuthority("DOCTOR", "MEDICAL_REGISTRAR", "ADMIN")

                                .anyRequest().permitAll()

                ).userDetailsService(userDetailsService)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception{
        return configuration.getAuthenticationManager();
    }
}

// physical_exam - doctor
// patitent - medical_registrar | getById - doctor
// labolatory_exam - get, patch(doktor do momentu az nie jest wykonane) - doctor, lab_tech, lab_super | create - doctor | delete - lab_super, lab_tech
// appintment - create - registrar |  delete - registrar, doctor | patch - doctor | get - registrar, doctor
// medical_registrar - admin
// lab_tech - admin
// lab_super - admin
// exam_dict - all
// doctor - admin
