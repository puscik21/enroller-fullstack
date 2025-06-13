package com.company.enroller.exception;

import org.springframework.http.HttpStatus;

import java.time.Instant;

public record ExceptionResult(String message, HttpStatus httpStatus, Instant time) {
}

