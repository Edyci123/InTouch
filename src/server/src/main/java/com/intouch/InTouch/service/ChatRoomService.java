package com.intouch.InTouch.service;

import com.intouch.InTouch.entity.ChatRoom;
import com.intouch.InTouch.entity.User;
import com.intouch.InTouch.repos.ChatRoomRepository;
import com.intouch.InTouch.repos.UserRepository;
import com.intouch.InTouch.utils.UserUtils;
import com.intouch.InTouch.utils.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    @Autowired
    public ChatRoomService(ChatRoomRepository chatRoomRepository, UserRepository userRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.userRepository = userRepository;
    }

    public ChatRoom getChatRoom(String recipientEmail) throws UserNotFoundException {
        User sender = UserUtils.getUserFromOptional(userRepository.findByEmail(UserUtils.getEmail()));
        User recipient = UserUtils.getUserFromOptional(userRepository.findByEmail(recipientEmail));
        Optional<ChatRoom> chatRoom = chatRoomRepository.findBySenderAndRecipient(sender, recipient);
        if (chatRoom.isPresent()) {
            return chatRoom.get();
        } else {
            String chatId = String.format("%s_%s", sender.getUname(), recipient.getUname());
            ChatRoom newChatRoom = ChatRoom.builder()
                    .chatId(chatId)
                    .sender(sender)
                    .recipient(recipient)
                    .build();

            chatRoomRepository.save(newChatRoom);
            return newChatRoom;
        }
    }

}
