package com.company.enroller.controller;

import com.company.enroller.controller.utils.ControllerUtils;
import com.company.enroller.model.Meeting;
import com.company.enroller.model.Participant;
import com.company.enroller.persistence.MeetingService;
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
@RequestMapping("/api/meetings")
@RequiredArgsConstructor
public class MeetingRestController {

    private final MeetingService meetingService;

    @GetMapping
    public List<Meeting> findMeetings(@RequestParam(value = "title", defaultValue = "") String title,
                                      @RequestParam(value = "description", defaultValue = "") String description,
                                      @RequestParam(value = "sort", defaultValue = "") String sortMode,
                                      @RequestParam(value = "participantLogin", defaultValue = "") String participantLogin) {
        return meetingService.findMeetings(title, description, participantLogin, sortMode);
    }

    @GetMapping("/{id}")
    public Meeting getMeetingById(@PathVariable Long id) {
        return meetingService.getById(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeeting(@PathVariable Long id) {
        meetingService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<Meeting> createMeeting(@RequestBody Meeting meeting) {
        Meeting created = meetingService.add(meeting);
        URI location = ControllerUtils.getLocation("/{id}", created.getId());
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public Meeting updateMeeting(@PathVariable Long id, @RequestBody Meeting meeting) {
        return meetingService.update(id, meeting);
    }

    @GetMapping("/{id}/participants")
    public Set<Participant> getMeetingsParticipants(@PathVariable Long id) {
        return meetingService.getById(id).getParticipants();
    }

    @PostMapping("/{id}/participants/{login}")
    public ResponseEntity<Void> addParticipant(@PathVariable Long id, @PathVariable String login) {
        meetingService.addParticipant(id, login);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}/participants/{login}")
    public ResponseEntity<Void> deleteParticipant(@PathVariable Long id, @PathVariable String login) {
        meetingService.deleteParticipant(id, login);
        return ResponseEntity.noContent().build();
    }
}
