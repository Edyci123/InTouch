package com.intouch.InTouch.service;

import com.intouch.InTouch.entity.User;
import com.intouch.InTouch.repos.UserRepository;
import com.intouch.InTouch.utils.FileDownloadUtil;
import com.intouch.InTouch.utils.FileUploadUtil;
import com.intouch.InTouch.utils.exceptions.UserNotFoundException;
import org.springframework.core.io.Resource;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class FilesService {

    private UserRepository userRepository;

    public FilesService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public void saveFile(MultipartFile file, String fileName) throws IOException, UserNotFoundException {
        User user = getUserFromOptional(userRepository.findByEmail(getEmail()));
        String fileCode = FileUploadUtil.saveFile(fileName, file);

        user.setPhotoUri("/files/downloads/" + fileCode);
    }

    public Resource getFile(String fileCode) throws IOException {
        return FileDownloadUtil.getResource(fileCode);
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
