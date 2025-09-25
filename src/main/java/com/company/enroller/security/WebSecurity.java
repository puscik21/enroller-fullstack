package com.company.enroller.security;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableConfigurationProperties(JwtProperties.class)
public class WebSecurity {

    private final ParticipantProvider participantProvider;
//    private final PasswordEncoder passwordEncoder;
    private final JwtProperties jwtProperties;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
                                                   AuthenticationManager authManager) throws Exception {
        return http.csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(new JWTAuthenticationFilter(authManager, jwtProperties), UsernamePasswordAuthenticationFilter.class)
                .addFilter(new JWTAuthorizationFilter(authManager, jwtProperties.getSecret()))
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers(HttpMethod.POST, "/api/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/participants").permitAll()
                        .anyRequest().authenticated()
                )
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

//    @Bean
//    public AuthenticationProvider authenticationProvider() {
//        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
//        authProvider.setUserDetailsService(participantProvider);
//        authProvider.setPasswordEncoder(passwordEncoder);
//        return authProvider;
//    }

    @Bean
    public UserDetailsService userDetailsService() {
        // Spring sam podniesie DaoAuthenticationProvider i skojarzy go z tym serwisem
        return participantProvider;
    }

//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        // np. BCrypt – ważne, żeby był beanem, bo Spring go potrzebuje do DaoAuthenticationProvider
////        return new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
//        return passwordEncoder;
//    }
}
