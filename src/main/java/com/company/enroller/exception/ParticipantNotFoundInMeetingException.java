package com.company.enroller.exception;

import org.slf4j.event.Level;
import org.springframework.http.HttpStatus;

public class ParticipantNotFoundInMeetingException extends ApiException {

    public ParticipantNotFoundInMeetingException(Long id, String login) {
        super("A participant with login '%s' was not found in '%d' meeting.".formatted(login, id), HttpStatus.NOT_FOUND, Level.WARN);
    }
}
