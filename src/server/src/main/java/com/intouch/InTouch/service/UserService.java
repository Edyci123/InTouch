package com.intouch.InTouch.service;

import com.intouch.InTouch.entity.User;
import com.intouch.InTouch.repos.UserRepository;
import com.intouch.InTouch.utils.UserUtils;
import com.intouch.InTouch.utils.dtos.auth.RegisterRequest;
import com.intouch.InTouch.utils.dtos.users.PartialUpdateUserRequest;
import com.intouch.InTouch.utils.dtos.users.UserResponse;
import com.intouch.InTouch.utils.exceptions.InvalidCodeException;
import com.intouch.InTouch.utils.exceptions.UserAlreadyExistsException;
import com.intouch.InTouch.utils.exceptions.UserNotFoundException;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public void partialUpdateUser(PartialUpdateUserRequest updateUserRequest) throws UserNotFoundException {
        User user = UserUtils.getUserFromOptional(userRepository.findByEmail(UserUtils.getEmail()));
        user.setAccount(updateUserRequest.getAccounts());
        user.setUname(updateUserRequest.getUsername());
    }

    public void register(RegisterRequest registerRequest) throws UserAlreadyExistsException {

        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User already exists!");
        }

        User user = new User();
        BeanUtils.copyProperties(registerRequest, user);
        user.setUname(registerRequest.getUsername());
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
                .map(val -> new UserResponse(val.getEmail(), val.getUname(), val.getAccount(), val.getPhotoUri()))
                .filter(val -> !Objects.equals(val.getEmail(), UserUtils.getEmail()))
                .collect(Collectors.toList());
         Map<String, Object> res = new HashMap<>();
         res.put("users", userList);
         res.put("currentPage", pageUsers.getNumber());
         res.put("totalPages", pageUsers.getTotalPages());
         res.put("totalItems", pageUsers.getTotalElements());

         return res;
    }

    public UserResponse getCurrentUser() throws UserNotFoundException {
        User user = UserUtils.getUserFromOptional(userRepository.findByEmail(UserUtils.getEmail()));
        return new UserResponse(user.getEmail(), user.getUname(), user.getAccount(), user.getPhotoUri());
    }

    @Transactional
    public void createCode(String email) throws UserNotFoundException {
        User user = UserUtils.getUserFromOptional(userRepository.findByEmail(email));
        Random random = new Random();
        String code = String.format("%04d", random.nextInt(10000));
        user.setCode(code);
        System.out.println(code);
        //send email
    }

    @Transactional
    public void validateCodeChangePassword(String email, String code, String newPassword) throws UserNotFoundException, InvalidCodeException {
        User user = UserUtils.getUserFromOptional(userRepository.findByEmail(email));
        if (user.getCode().equals(code)) {
            user.setPassword(encodedPassword(newPassword));
        } else {
            user.setAttempts(user.getAttempts() + 1);
            if (user.getAttempts() >= 3) {
                throw new InvalidCodeException("Invalid code! No more attempts available!");
            }
            throw new InvalidCodeException("Invalid code!");
        }
    }

    public void checkUserExistence(String email) throws UserNotFoundException {
        User user = UserUtils.getUserFromOptional(userRepository.findByEmail(email));
    }

    private String encodedPassword(String password) {
        return passwordEncoder.encode(password);
    }

}
