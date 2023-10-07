package com.intouch.InTouch.rest;

import com.intouch.InTouch.service.FriendsService;
import com.intouch.InTouch.utils.exceptions.SameUserFriendshipException;
import com.intouch.InTouch.utils.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/friends")
public class FriendsController {

    private final FriendsService friendsService;

    @Autowired
    public FriendsController(FriendsService friendsService) {
        this.friendsService = friendsService;
    }

    @GetMapping
    public ResponseEntity<?> getFriendsOfUser() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(friendsService.findAllFriends());
        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

    @PostMapping("/accept/{userId}")
    public ResponseEntity<?> acceptFriendRequest(@PathVariable int userId) {
        try {
            friendsService.acceptFriendship(userId);
            return ResponseEntity.ok().build();
        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with id " + userId + " not found.");
        } catch (SameUserFriendshipException ex) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(ex.getMessage());
        }
    }

    @PostMapping("/unfriend/{userId}")
    public ResponseEntity<?> unfriendRequest(@PathVariable int userId) {
        try {
            friendsService.deleteFriendship(userId);
            return ResponseEntity.ok().build();
        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with id " + userId + " not found.");
        } catch (SameUserFriendshipException ex) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(ex.getMessage());
        }
    }

    @PostMapping("/send/{userId}")
    public ResponseEntity<?> sendFriendRequest(@PathVariable int userId) {
        try {
            friendsService.createFriendship(userId);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with id " + userId + " not found.");
        } catch (SameUserFriendshipException ex) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(ex.getMessage());
        }
    }


}
