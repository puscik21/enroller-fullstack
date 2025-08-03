package com.company.enroller.controller;

import com.company.enroller.controller.utils.ControllerUtils;
import com.company.enroller.controller.utils.SortOrder;
import com.company.enroller.model.Participant;
import com.company.enroller.persistence.ParticipantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/participants")
public class ParticipantRestController {

    private final ParticipantService participantService;

    private static final Set<String> ALLOWED_SORT_BY_FIELDS = Set.of("login");

    @GetMapping
    public List<Participant> getParticipants(@RequestParam(required = false) String key,
                                             @RequestParam(defaultValue = "login") String sortBy,
                                             @RequestParam(defaultValue = "ASC") String sortOrder) {
        if (!ALLOWED_SORT_BY_FIELDS.contains(sortBy)) {
            throw new IllegalArgumentException("Invalid sortBy " + sortBy);
        }
        return participantService.getAll(key, sortBy, SortOrder.valueOf(sortOrder));
    }

    @GetMapping("/{login}")
    public Participant getParticipant(@PathVariable String login) {
        return participantService.getByLogin(login);
    }

    @PostMapping
    public ResponseEntity<Participant> registerParticipant(@RequestBody Participant participant) {
        Participant registeredParticipant = participantService.register(participant);
        URI location = ControllerUtils.getLocation("/{login}", registeredParticipant.getLogin());
        return ResponseEntity.created(location).body(registeredParticipant);
    }

    @PutMapping("/{login}")
    public Participant updateParticipant(@PathVariable String login, @RequestBody Participant participant) {
        return participantService.update(login, participant);
    }

    @DeleteMapping("/{login}")
    public ResponseEntity<Void> deleteParticipant(@PathVariable String login) {
        participantService.removeByLogin(login);
        return ResponseEntity.noContent().build();
    }
}
