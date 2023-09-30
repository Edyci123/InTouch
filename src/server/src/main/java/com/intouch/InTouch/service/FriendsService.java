package com.intouch.InTouch.service;

import com.intouch.InTouch.entity.Friends;
import com.intouch.InTouch.entity.User;
import com.intouch.InTouch.repos.FriendsRepository;
import com.intouch.InTouch.repos.UserRepository;
import com.intouch.InTouch.rest.pojos.FriendResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.management.InstanceNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FriendsService {
    private final UserRepository userRepository;
    private final FriendsRepository friendsRepository;

    @Autowired
    public FriendsService(UserRepository userRepository, FriendsRepository friendsRepository) {
        this.userRepository = userRepository;
        this.friendsRepository = friendsRepository;
    }

    public Friends findByUser(int user2Id) throws InstanceNotFoundException {

        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user1 = getUserFromOptional(userRepository.findByEmail(currentUserEmail));

        User user2 = getUserFromOptional(userRepository.findById(user2Id));

        return friendsRepository.findByUsers(user1, user2);
    }

    @Transactional
    public void createFriendship(int user2Id) throws InstanceNotFoundException {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user1 = getUserFromOptional(userRepository.findByEmail(currentUserEmail));
        User user2 = getUserFromOptional(userRepository.findById(user2Id));
        friendsRepository.createFriend(user1, user2, "status");
    }

    public List<FriendResponse> findAllFriends() throws InstanceNotFoundException {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        currentUserEmail = currentUserEmail.substring(1);
        User user = getUserFromOptional(userRepository.findByEmail(currentUserEmail));
        return friendsRepository.findAllFriendsOfAnUser(user).stream().map(val -> {
            FriendResponse friendResponse = new FriendResponse();
            if (val.getUser1().equals(user)) {
                BeanUtils.copyProperties(val.getUser2(), friendResponse);
            } else {
                BeanUtils.copyProperties(val.getUser1(), friendResponse);
            }
            friendResponse.setStatus(val.getStatus());
            return friendResponse;
        }).collect(Collectors.toList());
    }

    private User getUserFromOptional(Optional<User> optUser) throws InstanceNotFoundException {
        if (optUser.isPresent()) {
            return optUser.get();
        } else {
            throw new InstanceNotFoundException("User not found");
        }
    }

}
