package com.intouch.InTouch.rest;

import com.intouch.InTouch.entity.Account;
import com.intouch.InTouch.service.UserService;
import com.intouch.InTouch.utils.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(
            @RequestParam(required = false) String email,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return ResponseEntity.ok(userService.getUserPage(email, page, size));
    }

    @GetMapping
    public ResponseEntity<?> getMe() throws UserNotFoundException {
        return ResponseEntity.ok(userService.getCurrentUser());
    }
}
