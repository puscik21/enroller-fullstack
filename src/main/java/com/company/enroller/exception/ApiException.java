package com.company.enroller.exception;

import lombok.Getter;
import org.slf4j.event.Level;
import org.springframework.http.HttpStatus;

@Getter
public abstract class ApiException extends RuntimeException {
    private final HttpStatus httpStatus;
    private final Level logLevel;

    public ApiException(String message, HttpStatus httpStatus, Level logLevel) {
        super(message);
        this.httpStatus = httpStatus;
        this.logLevel = logLevel;
    }
}
