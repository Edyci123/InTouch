package com.intouch.InTouch.service;

import com.intouch.InTouch.entity.Account;
import com.intouch.InTouch.entity.User;
import com.intouch.InTouch.repos.UserRepository;
import com.intouch.InTouch.utils.exceptions.UserAlreadyExistsException;
import com.intouch.InTouch.utils.exceptions.UserNotFoundException;
import com.intouch.InTouch.utils.pojos.auth.RegisterRequest;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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
