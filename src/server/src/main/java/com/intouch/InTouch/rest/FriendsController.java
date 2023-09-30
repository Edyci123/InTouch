package com.intouch.InTouch.rest;

import com.intouch.InTouch.service.FriendsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.InstanceNotFoundException;

@RestController
@RequestMapping("/friends")
public class FriendsController {


    private final FriendsService friendsService;

    @Autowired
    public FriendsController(FriendsService friendsService) {
        this.friendsService = friendsService;
    }

    @GetMapping
    public ResponseEntity<?> getFriendsOfUser() throws InstanceNotFoundException {

        try {
            return ResponseEntity.status(HttpStatus.OK).body(friendsService.findAllFriends());
        } catch (InstanceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

    @PostMapping("/send/{userId}")
    public ResponseEntity<?> sendFriendRequest(@PathVariable int userId) throws InstanceNotFoundException {
        try {
            friendsService.createFriendship(userId);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (InstanceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with id " + userId + " not found.");
        }
    }


}
