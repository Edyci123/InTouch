package com.intouch.InTouch.service;

import com.intouch.InTouch.entity.Account;
import com.intouch.InTouch.entity.User;
import com.intouch.InTouch.repos.UserRepository;
import com.intouch.InTouch.utils.exceptions.UserAlreadyExistsException;
import com.intouch.InTouch.utils.exceptions.UserNotFoundException;
import com.intouch.InTouch.utils.pojos.auth.RegisterRequest;
import com.intouch.InTouch.utils.pojos.users.UserResponse;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@Service
public class UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Transactional
    public void updateAccount(Account account) throws UserNotFoundException {
        User user = getUserFromOptional(userRepository.findByEmail(getEmail()));
        user.setAccount(account);
        userRepository.save(user);
    }

    public void register(RegisterRequest registerRequest) throws UserAlreadyExistsException {

        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User already exists!");
        }

        User user = new User();
        BeanUtils.copyProperties(registerRequest, user);
        user.setPassword(encodedPassword(registerRequest.getPassword()));
        userRepository.save(user);
    }

    public Map<String, Object> getUserPage(String email, int page, int size) {
        List<UserResponse> userList = new ArrayList<>();
        Pageable pageable = PageRequest.of(page, size);

        Page<User> pageUsers;
        if (email == null) {
            pageUsers = userRepository.findAll(pageable);
        } else {
            pageUsers = userRepository.findByEmailContaining(email, pageable);
        }

        userList = pageUsers.getContent().stream()
                .map(val -> new UserResponse(val.getEmail(), val.getAccount()))
                .filter(val -> !Objects.equals(val.getEmail(), getEmail()))
                .collect(Collectors.toList());
         Map<String, Object> res = new HashMap<>();
         res.put("users", userList);
         res.put("currentPage", pageUsers.getNumber());
         res.put("totalPages", pageUsers.getTotalPages());
         res.put("totalItems", pageUsers.getTotalElements());

         return res;
    }

    public UserResponse getCurrentUser() throws UserNotFoundException {
        User user = getUserFromOptional(userRepository.findByEmail(getEmail()));
        return new UserResponse(user.getEmail(), user.getAccount());
    }

    private String encodedPassword(String password) {
        return passwordEncoder.encode(password);
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
