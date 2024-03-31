package com.intouch.InTouch.utils;

import com.intouch.InTouch.entity.User;
import com.intouch.InTouch.utils.exceptions.UserNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class UserUtils {
    public static User getUserFromOptional(Optional<User> optUser) throws UserNotFoundException {
        if (optUser.isPresent()) {
            return optUser.get();
        } else {
            throw new UserNotFoundException("User not found!");
        }
    }

    public static String getEmail() {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        if (currentUserEmail.startsWith(" ")) {
            currentUserEmail = currentUserEmail.substring(1);
        }
        return currentUserEmail;
    }
}
