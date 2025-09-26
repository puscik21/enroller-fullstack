package com.company.enroller.service;

import com.company.enroller.exception.ObjectNotFoundException;
import com.company.enroller.exception.ParticipantAlreadyExistsException;
import com.company.enroller.model.Participant;
import com.company.enroller.repository.ParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final ParticipantRepository participantRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public List<Participant> findAll(String filter, String sortBy, Sort.Direction sortOrder) {
        Sort sort = Sort.by(sortOrder, sortBy);
        if (StringUtils.hasText(filter)) {
            participantRepository.findAllByLoginContainingIgnoreCase(filter, sort);
        }
        return participantRepository.findAll(sort);
    }

    @Transactional(readOnly = true)
    public Participant getByLogin(String login) {
        return participantRepository.findByLogin(login)
                .orElseThrow(() -> new ObjectNotFoundException("Participant with login '%s' not found".formatted(login)));
    }

    @Transactional
    public Participant register(Participant participant) {
        participantRepository.findByLogin(participant.getLogin()).ifPresent(p -> {
            throw new ParticipantAlreadyExistsException(participant.getLogin());
        });
        participant.setPassword(passwordEncoder.encode(participant.getPassword()));
        return participantRepository.save(participant);
    }

    @Transactional
    public Participant update(String login, Participant participant) {
        Participant existingParticipant = getByLogin(login);
        participant.setLogin(existingParticipant.getLogin());
        participant.setPassword(passwordEncoder.encode(participant.getPassword()));
        return participantRepository.save(participant);
    }

    @Transactional
    public void removeByLogin(String login) {
        Participant participant = getByLogin(login);
        participantRepository.delete(participant);
    }
}
