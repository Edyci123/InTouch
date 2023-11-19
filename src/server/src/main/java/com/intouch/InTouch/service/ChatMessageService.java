package com.intouch.InTouch.service;

import com.intouch.InTouch.entity.ChatMessage;
import com.intouch.InTouch.entity.ChatRoom;
import com.intouch.InTouch.repos.ChatMessageRepository;
import com.intouch.InTouch.repos.ChatRoomRepository;
import com.intouch.InTouch.repos.UserRepository;
import com.intouch.InTouch.utils.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatMessageService {

    private ChatMessageRepository chatMessageRepository;
    private ChatRoomRepository chatRoomRepository;
    private ChatRoomService chatRoomService;
    private UserRepository userRepository;

    @Autowired
    public ChatMessageService(ChatRoomService chatRoomService, ChatMessageRepository chatMessageRepository, ChatRoomRepository chatRoomRepository, UserRepository userRepository) {
        this.chatRoomService = chatRoomService;
        this.chatMessageRepository = chatMessageRepository;
        this.userRepository = userRepository;
        this.chatRoomRepository = chatRoomRepository;
    }

    public ChatMessage createMessage()

    public ChatMessage getById(int messageId) throws Exception {
        Optional<ChatMessage> chatMessage = chatMessageRepository.findById(messageId);
        if (chatMessage.isPresent()) {
            return chatMessage.get();
        } else {
            throw new Exception("E rau de tot!");
        }
    }

    public List<ChatMessage> getChatMessages(String recipientEmail) throws UserNotFoundException {
        ChatRoom chatRoom = chatRoomService.getChatRoom(recipientEmail);

        return getChatMessages(chatRoom.getChatId());
    }

}
