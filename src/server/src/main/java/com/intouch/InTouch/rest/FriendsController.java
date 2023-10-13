package com.intouch.InTouch.rest;

import com.intouch.InTouch.service.FriendsService;
import com.intouch.InTouch.utils.enums.FriendshipStatus;
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

    @GetMapping("/{status}")
    public ResponseEntity<?> getFriendsByStatus(@PathVariable String status) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(friendsService.getFriendsByStatus(FriendshipStatus.valueOfLabel(status)));
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PatchMapping("/accept/{userId}")
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

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<?> deleteFriendship(@PathVariable int userId) {
        try {
            friendsService.deleteFriendship(userId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with id " + userId + " not found.");
        } catch (SameUserFriendshipException ex) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(ex.getMessage());
        }
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendFriendRequest(@RequestBody String email) {
        try {
            friendsService.createFriendship(email);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (SameUserFriendshipException ex) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(ex.getMessage());
        }
    }


}
