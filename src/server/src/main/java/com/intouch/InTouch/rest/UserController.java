package com.intouch.InTouch.rest;

import com.intouch.InTouch.entity.Account;
import com.intouch.InTouch.service.UserService;
import com.intouch.InTouch.utils.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/me")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PatchMapping("/update")
    public ResponseEntity<?> updateAccount(@RequestBody Account account) {
        try {
            userService.updateAccount(account);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

}
