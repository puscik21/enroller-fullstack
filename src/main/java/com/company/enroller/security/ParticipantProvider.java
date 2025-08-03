package com.company.enroller.security;

import com.company.enroller.model.Participant;
import com.company.enroller.persistence.ParticipantService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class ParticipantProvider implements UserDetailsService {

    private final ParticipantService participantService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Participant participant = participantService.getByLogin(username);
        return new User(participant.getLogin(), participant.getPassword(), Collections.emptyList());
    }
}
