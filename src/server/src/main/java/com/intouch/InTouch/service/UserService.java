package com.intouch.InTouch.service;

import com.intouch.InTouch.entity.User;
import com.intouch.InTouch.repos.UserRepository;
import com.intouch.InTouch.rest.pojos.RegisterRequest;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.management.InstanceAlreadyExistsException;


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

    public void register(RegisterRequest registerRequest) throws InstanceAlreadyExistsException {



        User user = new User();
        BeanUtils.copyProperties(registerRequest, user);
        user.setPassword(encodedPassword(registerRequest.getPassword()));
        userRepository.save(user);
    }

    private String encodedPassword(String password) {
        return passwordEncoder.encode(password);
    }
}
