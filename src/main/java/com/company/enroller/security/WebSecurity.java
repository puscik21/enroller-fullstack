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

        // Tworzymy instancję naszego filtra do logowania
        JWTAuthenticationFilter authenticationFilter = new JWTAuthenticationFilter(authManager, jwtProperties);
        // Upewniamy się, że Spring wie, który URL obsługuje ten filtr (chociaż jest to już w konstruktorze)
        authenticationFilter.setFilterProcessesUrl("/api/login");

        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authz -> authz
                        // Ważne: Zmieniamy requestMatchers, aby uwzględnić POST dla /api/participants
                        .requestMatchers(HttpMethod.POST, "/api/login", "/api/participants").permitAll()
                        .anyRequest().authenticated()
                )
                // Krok 1: Zastępujemy standardowy filtr logowania naszym własnym.
                .addFilter(authenticationFilter)

                // Krok 2: Dodajemy nasz filtr do sprawdzania tokenów PRZED standardową obsługą logowania.
                // Dzięki temu dla każdego żądania (innego niż /api/login) najpierw sprawdzimy token JWT.
                .addFilterBefore(new JWTAuthorizationFilter(authManager, jwtProperties.getSecret()), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
