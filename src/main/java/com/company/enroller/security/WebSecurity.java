package com.company.enroller.security;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableConfigurationProperties(JwtProperties.class)
public class WebSecurity {

    private final JwtProperties jwtProperties;
    // Wstrzykujemy AuthenticationConfiguration, aby bezpiecznie pobrać AuthenticationManager
    private final AuthenticationConfiguration authenticationConfiguration;

    // Ten bean jest już niepotrzebny, jeśli używamy AuthenticationConfiguration
    // private final ParticipantProvider participantProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Pobieramy AuthenticationManager w bezpieczny sposób
        AuthenticationManager authManager = authenticationConfiguration.getAuthenticationManager();

        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // Tworzymy filtry tutaj, przekazując im authManager.
                // To przerywa cykl zależności beanów.
                .addFilter(new JWTAuthenticationFilter(authManager, jwtProperties))
                .addFilter(new JWTAuthorizationFilter(authManager, jwtProperties.getSecret()))
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers(HttpMethod.POST, "/api/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/participants").permitAll()
                        .anyRequest().authenticated()
                );

        return http.build();
    }

    // Ten bean jest teraz zbędny, ponieważ pobieramy AuthenticationManager
    // bezpośrednio z AuthenticationConfiguration w metodzie powyżej.
    // @Bean
    // public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
    //     return config.getAuthenticationManager();
    // }

    // Ten bean również jest zbędny. Spring Security automatycznie znajdzie
    // Twój ParticipantProvider, ponieważ jest to bean typu @Service.
    // @Bean
    // public UserDetailsService userDetailsService() {
    //     return participantProvider;
    // }
}
