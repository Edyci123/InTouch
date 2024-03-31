package com.intouch.InTouch.rest;

import com.intouch.InTouch.entity.User;
import com.intouch.InTouch.service.UserService;
import com.intouch.InTouch.utils.JwtTokenUtil;
import com.intouch.InTouch.utils.dtos.auth.*;
import com.intouch.InTouch.utils.exceptions.InvalidCodeException;
import com.intouch.InTouch.utils.exceptions.UserAlreadyExistsException;
import com.intouch.InTouch.utils.exceptions.UserNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserService userService;

    @Autowired
    public  AuthController(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            User user = (User) authentication.getPrincipal();
            user.setEmail(user.getUsername());
            String accessToken = jwtTokenUtil.generateAccessToken(user);
            AuthResponse response = new AuthResponse(user.getEmail(), accessToken);

            return ResponseEntity.ok(response);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bad credentials!");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            userService.register(registerRequest);
        } catch (UserAlreadyExistsException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/reset/code")
    public ResponseEntity<?> getCode(@RequestBody AuthResetCodeEmail authResetCodeEmail) throws UserNotFoundException {
        userService.createCode(authResetCodeEmail.getEmail());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/reset/password")
    public ResponseEntity<?> resetPassword(@RequestBody AuthCodeAndPassword authCodeAndPassword) throws UserNotFoundException, InvalidCodeException {
        userService.validateCodeChangePassword(authCodeAndPassword.getEmail(), authCodeAndPassword.getCode(), authCodeAndPassword.getPassword());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/account/exists")
    public ResponseEntity<?> checkExistence(@RequestBody AccountExistence accountExistence) throws UserNotFoundException {
        userService.checkUserExistence(accountExistence.getEmail());
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
