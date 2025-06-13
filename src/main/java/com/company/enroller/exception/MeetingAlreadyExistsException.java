package com.company.enroller.exception;

import org.slf4j.event.Level;
import org.springframework.http.HttpStatus;

public class MeetingAlreadyExistsException extends ApiException{

    public MeetingAlreadyExistsException(String title) {
        super("Unable to create. A meeting with title '%s' already exists.".formatted(title), HttpStatus.CONFLICT, Level.WARN);
    }
}
