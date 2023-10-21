package com.intouch.InTouch.rest;

import com.intouch.InTouch.utils.exceptions.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;

@RestControllerAdvice
public class ExceptionsControllerAdvice {

    @ExceptionHandler(IOException.class)
    public ResponseEntity<String> handleFileNotFoundException(IOException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("File not found!");
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

}
