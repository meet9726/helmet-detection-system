package com.helmet.helmet_detection_backend.config;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;
@Component
public class JWTUtills {

    private final String SECRET = "helmet_secret_key";

    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long expiration = 86400000; // 24 hours
    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }

    public Claims extractUsername(String token) {
   	 return Jwts.parser()
	                .verifyWith((SecretKey) key)
	                .build()
	                .parseSignedClaims(token)
	                .getPayload();
   }
    
//    @Bean
//    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//
//        http.csrf().disable()
//            .authorizeHttpRequests(auth -> auth
//                .requestMatchers("/api/auth/**").permitAll()
//                .requestMatchers("/api/admin/**").hasRole("ADMIN")
//                .anyRequest().authenticated()
//            )
//            .sessionManagement()
//            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//            .and()
//            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }

}
