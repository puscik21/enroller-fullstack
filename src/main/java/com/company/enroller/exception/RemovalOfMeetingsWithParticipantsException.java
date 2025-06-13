package com.company.enroller.exception;

import org.slf4j.event.Level;
import org.springframework.http.HttpStatus;

public class RemovalOfMeetingsWithParticipantsException extends ApiException {

    public RemovalOfMeetingsWithParticipantsException(String title) {
        super("Cannot delete meeting '%s', as it have participants".formatted(title), HttpStatus.CONFLICT, Level.WARN);
    }
}
