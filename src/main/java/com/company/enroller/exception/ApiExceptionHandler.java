package com.company.enroller.exception;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.event.Level;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.Instant;

@Slf4j
@ControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(value = ApiException.class)
    public ResponseEntity<ExceptionResult> handleRequestException(ApiException e) {
        String message = "Sending response %s. %s".formatted(e.getHttpStatus().toString(), e.getMessage());
        return logAndPrepareResponse(e, e.getHttpStatus(), e.getLogLevel(), message);
    }

    private ResponseEntity<ExceptionResult> logAndPrepareResponse(RuntimeException e, HttpStatus status, Level logLevel, String message) {
        ExceptionResult result = new ExceptionResult(e.getMessage(), status, Instant.now());
        logAtLevel(logLevel, message);
        return ResponseEntity.status(status).body(result);
    }

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ExceptionResult> handleException(Exception e) {
        String message = String.format("Failed to handle request: %s, status: %s, stacktrace: ", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        return logWithStackTraceAndPrepareResponse(e, HttpStatus.INTERNAL_SERVER_ERROR, message);
    }

    private ResponseEntity<ExceptionResult> logWithStackTraceAndPrepareResponse(Exception e, HttpStatus status, String message) {
        ExceptionResult result = new ExceptionResult(e.getMessage(), status, Instant.now());
        log.error(message, e);
        return ResponseEntity.status(status).body(result);
    }

    private void logAtLevel(Level logLevel, String message) {
        switch (logLevel) {
            case INFO -> log.info(message);
            case WARN -> log.warn(message);
            case ERROR -> log.error(message);
        }
    }
}
