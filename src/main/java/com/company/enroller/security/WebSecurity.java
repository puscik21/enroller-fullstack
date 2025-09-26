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
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableConfigurationProperties(JwtProperties.class)
public class WebSecurity {

    private final JwtProperties jwtProperties;
    private final AuthenticationConfiguration authenticationConfiguration;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        AuthenticationManager authManager = authenticationConfiguration.getAuthenticationManager();

        JWTAuthenticationFilter authenticationFilter = new JWTAuthenticationFilter(authManager, jwtProperties);

        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers(HttpMethod.POST, "/api/login", "/api/participants").permitAll()
                        .anyRequest().authenticated()
                )
                // KROK 1: Dodajemy filtr autoryzacji PRZED standardowym filtrem logowania.
                // Będzie on sprawdzał token JWT przy każdym żądaniu (poza tymi z permitAll).
                .addFilterBefore(new JWTAuthorizationFilter(authManager, jwtProperties.getSecret()), UsernamePasswordAuthenticationFilter.class)

                // KROK 2: Zastępujemy standardowy filtr naszym własnym, używając addFilterAt.
                // Mówimy Springowi: "W miejscu, gdzie normalnie byłby UsernamePasswordAuthenticationFilter,
                // wstaw mój JWTAuthenticationFilter". To jest najbardziej jawne polecenie.
                .addFilterAt(authenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
