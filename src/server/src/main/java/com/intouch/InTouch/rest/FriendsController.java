package com.intouch.InTouch.rest;

import com.intouch.InTouch.service.FriendsService;
import com.intouch.InTouch.utils.dtos.friends.SendFriendRequest;
import com.intouch.InTouch.utils.enums.FriendshipStatus;
import com.intouch.InTouch.utils.exceptions.FriendshipAlreadyExistsException;
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

    @GetMapping()
    public ResponseEntity<?> getFriendsOfUser(
            @RequestParam(required = false) String username,
            @RequestParam String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) throws UserNotFoundException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(friendsService.getFriends(FriendshipStatus.valueOfLabel(status), username, page, size));

    }

    @GetMapping("/{status}")
    public ResponseEntity<?> getFriendsByStatus(@PathVariable String status) throws UserNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(friendsService.getFriendsByStatus(FriendshipStatus.valueOfLabel(status)));
    }

    @PatchMapping("/accept/{userId}")
    public ResponseEntity<?> acceptFriendRequest(@PathVariable int userId) throws UserNotFoundException {
        try {
            friendsService.acceptFriendship(userId);
            return ResponseEntity.ok().build();
        } catch (SameUserFriendshipException ex) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(ex.getMessage());
        }
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<?> deleteFriendship(@PathVariable int userId) throws UserNotFoundException {
        try {
            friendsService.deleteFriendship(userId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (SameUserFriendshipException ex) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(ex.getMessage());
        }
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendFriendRequest(@RequestBody SendFriendRequest friendRequest) throws UserNotFoundException {
        try {
            friendsService.createFriendship(friendRequest.getEmail());
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (SameUserFriendshipException ex) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(ex.getMessage());
        } catch (FriendshipAlreadyExistsException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }


}
