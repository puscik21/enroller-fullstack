package com.company.enroller.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.company.enroller.model.Participant;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;

public class JWTAuthenticationFilter extends AbstractAuthenticationProcessingFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtProperties jwtProperties;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, JwtProperties jwtProperties) {
        super(RegexRequestMatcher.regexMatcher(HttpMethod.POST, "/api/login"));
        this.authenticationManager = authenticationManager;
        this.jwtProperties = jwtProperties;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            Participant participant = new ObjectMapper().readValue(request.getInputStream(), Participant.class);
            Authentication authentication = new UsernamePasswordAuthenticationToken(participant.getLogin(), participant.getPassword(), new ArrayList<>());
            return authenticationManager.authenticate(authentication);
        } catch (IOException e) {
            throw new BadCredentialsException("Invalid login request", e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        String login = ((UserDetails) authResult.getPrincipal()).getUsername();
        LocalDateTime now = LocalDateTime.now();
        String token = JWT.create()
                .withIssuer(jwtProperties.getIssuer())
                .withSubject(login)
                .withIssuedAt(convertToDate(now))
                .withExpiresAt(convertToDate(now.plusSeconds(jwtProperties.getTokenExpirationInSeconds())))
                .withClaim("role", "participant") // TODO: roles object
                .sign(Algorithm.HMAC256(jwtProperties.getSecret()));
        response.getWriter().write(String.format("{\"token\":\"%s\"}", token)); // TODO: better token object
    }

    private static Date convertToDate(LocalDateTime now) {
        return Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
    }
}
