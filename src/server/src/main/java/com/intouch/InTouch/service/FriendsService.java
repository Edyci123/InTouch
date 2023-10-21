package com.intouch.InTouch.service;

import com.intouch.InTouch.entity.Friends;
import com.intouch.InTouch.entity.User;
import com.intouch.InTouch.repos.FriendsRepository;
import com.intouch.InTouch.repos.UserRepository;
import com.intouch.InTouch.utils.enums.FriendshipStatus;
import com.intouch.InTouch.utils.exceptions.SameUserFriendshipException;
import com.intouch.InTouch.utils.exceptions.UserNotFoundException;
import com.intouch.InTouch.utils.dtos.friends.FriendResponse;
import com.intouch.InTouch.utils.dtos.friends.FriendsListResponse;
import com.intouch.InTouch.utils.dtos.friends.FriendsListsByStatusResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class FriendsService {
    private final UserRepository userRepository;
    private final FriendsRepository friendsRepository;

    @Autowired
    public FriendsService(UserRepository userRepository, FriendsRepository friendsRepository) {
        this.userRepository = userRepository;
        this.friendsRepository = friendsRepository;
    }

//    public Friends findByUser(int user2Id) throws InstanceNotFoundException {
//
//        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
//        User user1 = getUserFromOptional(userRepository.findByEmail(currentUserEmail));
//
//        User user2 = getUserFromOptional(userRepository.findById(user2Id));
//
//        return friendsRepository.findByUsers(user1, user2);
//    }

    @Transactional
    public void createFriendship(String email) throws UserNotFoundException, SameUserFriendshipException {
        System.out.println(email);
        User user1 = getUserFromOptional(userRepository.findByEmail(getEmail()));
        User user2 = getUserFromOptional(userRepository.findByEmail(email));
        if (user1.equals(user2)) {
            throw new SameUserFriendshipException("You cannot send a friendRequest to yourself!");
        }

        friendsRepository.save(new Friends(user1, user2, FriendshipStatus.SENT));
        friendsRepository.save(new Friends(user2, user1, FriendshipStatus.PENDING));
    }

    @Transactional
    public void acceptFriendship(int user2Id) throws UserNotFoundException, SameUserFriendshipException {
        User user1 = getUserFromOptional(userRepository.findByEmail(getEmail()));
        User user2 = getUserFromOptional(userRepository.findById(user2Id));
        if (user1.equals(user2)) {
            throw new SameUserFriendshipException("You cannot accept a friendRequest from yourself!");
        }
        List<Friends> friendship = friendsRepository.findByUsers(user1, user2);
        System.out.println(friendship.size());
        friendship.get(0).setStatus(FriendshipStatus.ACCEPTED);
        friendship.get(1).setStatus(FriendshipStatus.ACCEPTED);
    }

    @Transactional
    public void deleteFriendship(int user2Id) throws UserNotFoundException, SameUserFriendshipException {
        User user1 = getUserFromOptional(userRepository.findByEmail(getEmail()));
        User user2 = getUserFromOptional(userRepository.findById(user2Id));
        if (user1.equals(user2)) {
            throw new SameUserFriendshipException("You cannot delete a friendRequest from yourself!");
        }
        List<Friends> friendship = friendsRepository.findByUsers(user1, user2);
        friendsRepository.delete(friendship.get(0));
        friendsRepository.delete(friendship.get(1));
    }

    public Map<String, Object> getFriends(FriendshipStatus status, String username, int page, int size) throws UserNotFoundException {
        User user = getUserFromOptional(userRepository.findByEmail(getEmail()));
        List<FriendResponse> friendsList = new ArrayList<>();
        Pageable pageable = PageRequest.of(page, size);

        Page<Friends> friendsPage;
        if (username == null) {
            friendsPage = friendsRepository.findAllByUser1(user, pageable);
        } else {
            friendsPage = friendsRepository.findByUser1AndStatusAndUser2_UnameContaining(user, status, username, pageable);
        }

        friendsList = friendsPage.getContent().stream()
                .map(val -> new FriendResponse(val.getUser2().getId(),
                        val.getUser2().getEmail(), val.getUser2().getUname(), val.getStatus(), val.getUser2().getAccount())
                )
                .toList();

        Map<String, Object> res = new HashMap<>();

        res.put("friends", friendsList);
        res.put("currentPage", friendsPage.getNumber());
        res.put("totalPages", friendsPage.getTotalPages());
        res.put("totalItems", friendsPage.getTotalElements());

        return res;
    }

    public FriendsListsByStatusResponse findAllFriends() throws UserNotFoundException {
        User user = getUserFromOptional(userRepository.findByEmail(getEmail()));
        List<FriendResponse> friendsList = friendsRepository.findByUser1(user).stream().map(val -> {
            FriendResponse friendResponse = new FriendResponse();
            BeanUtils.copyProperties(val.getUser2(), friendResponse);
            friendResponse.setStatus(val.getStatus());
            return friendResponse;
        }).toList();
        FriendsListsByStatusResponse friendsListsByStatusResponse = new FriendsListsByStatusResponse();
        friendsListsByStatusResponse.setAccepted(friendsList.stream().filter(val -> val.getStatus() == FriendshipStatus.ACCEPTED).toList());
        friendsListsByStatusResponse.setSent(friendsList.stream().filter(val -> val.getStatus() == FriendshipStatus.SENT).toList());
        friendsListsByStatusResponse.setPending(friendsList.stream().filter(val -> val.getStatus() == FriendshipStatus.PENDING).toList());

        return friendsListsByStatusResponse;
    }

    public FriendsListResponse getFriendsByStatus(FriendshipStatus status) throws UserNotFoundException {
        User user = getUserFromOptional(userRepository.findByEmail(getEmail()));
        FriendsListResponse friendsListResponse = new FriendsListResponse();
        friendsListResponse.setFriends(
                friendsRepository.findByUser1AndStatus(user, status)
                        .stream().map(val ->
                                new FriendResponse(val.getUser2().getId(),
                                        val.getUser2().getEmail(), val.getUser2().getUname(), val.getStatus(), val.getUser2().getAccount())
                        )
                        .toList());
        return friendsListResponse;
    }

    private User getUserFromOptional(Optional<User> optUser) throws UserNotFoundException {
        if (optUser.isPresent()) {
            return optUser.get();
        } else {
            throw new UserNotFoundException("User not found!");
        }
    }

    private String getEmail() {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        if (currentUserEmail.startsWith(" ")) {
            currentUserEmail = currentUserEmail.substring(1);
        }
        return currentUserEmail;
    }


}
