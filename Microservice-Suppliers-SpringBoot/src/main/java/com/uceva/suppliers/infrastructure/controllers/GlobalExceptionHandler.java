package com.uceva.suppliers.infrastructure.controllers;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.uceva.suppliers.domain.exceptions.DomainValidationException;
import com.uceva.suppliers.domain.exceptions.ResourceConflictException;
import com.uceva.suppliers.domain.exceptions.ResourceNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DomainValidationException.class)
    public ResponseEntity<Map<String, String>> handleValidation(DomainValidationException ex) {
        return build(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> handleUnreadable(HttpMessageNotReadableException ex) {
        return build(HttpStatus.BAD_REQUEST, "El cuerpo de la solicitud no es válido");
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleNotFound(ResourceNotFoundException ex) {
        return build(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(ResourceConflictException.class)
    public ResponseEntity<Map<String, String>> handleConflict(ResourceConflictException ex) {
        return build(HttpStatus.CONFLICT, ex.getMessage());
    }

    private ResponseEntity<Map<String, String>> build(HttpStatus status, String message) {
        return ResponseEntity.status(status).body(Map.of("message", message));
    }
}