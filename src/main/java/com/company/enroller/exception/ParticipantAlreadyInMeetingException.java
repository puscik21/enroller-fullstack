package com.company.enroller.exception;

import org.slf4j.event.Level;
import org.springframework.http.HttpStatus;

public class ParticipantAlreadyInMeetingException extends ApiException {

    public ParticipantAlreadyInMeetingException(Long id, String login) {
        super("A participant with login '%s' already in '%d' meeting.".formatted(login, id), HttpStatus.CONFLICT, Level.WARN);
    }
}
