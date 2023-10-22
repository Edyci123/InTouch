package com.intouch.InTouch.service;

import com.intouch.InTouch.entity.User;
import com.intouch.InTouch.repos.UserRepository;
import com.intouch.InTouch.utils.FileDownloadUtil;
import com.intouch.InTouch.utils.FileUploadUtil;
import com.intouch.InTouch.utils.UserUtils;
import com.intouch.InTouch.utils.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FilesService {

    private final UserRepository userRepository;

    @Autowired
    public FilesService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public void saveFile(MultipartFile file, String fileName) throws IOException, UserNotFoundException {
        User user = UserUtils.getUserFromOptional(userRepository.findByEmail(UserUtils.getEmail()));
        String fileCode = FileUploadUtil.saveFile(fileName, file);

        user.setPhotoUri("/files/download/" + fileCode);
    }

    public Resource getFile(String fileCode) throws IOException {
        return FileDownloadUtil.getResource(fileCode);
    }
}
