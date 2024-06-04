package com.solidcodeempire.clinic.service;

import com.solidcodeempire.clinic.exception.ExpiredTokenException;
import com.solidcodeempire.clinic.model.ClinicUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import com.auth0.jwt.JWT;

import javax.crypto.SecretKey;
import java.util.function.Function;
import java.util.Date;

@Service
public class JwtService {

    private final String SECRET_KEY = "cd95c0541646046cbe18e3344cf2218a46156e7c0d44c0917c5000f5927e02aa";

    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public boolean isUsernameValid(String token, ClinicUser clinicUser){
        String username = extractUsername(token);
        return username.equals(clinicUser.getUsername());
    }

    public void isTokenExpired(String token){
        if (JWT.decode(token).getExpiresAt().before(new Date()))
            throw new ExpiredTokenException();
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver){
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    private Claims extractAllClaims(String token){
        return Jwts
                .parser()
                .verifyWith(getSignKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String generateToken(ClinicUser clinicUser){
        return Jwts
                .builder()
                .subject(clinicUser.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .signWith(getSignKey())
                .compact();
    }

    private SecretKey getSignKey() {
        byte[] keyBytes = Decoders.BASE64URL.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
