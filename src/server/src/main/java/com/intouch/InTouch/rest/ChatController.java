package com.intouch.InTouch.rest;


import com.intouch.InTouch.entity.ChatMessage;
import com.intouch.InTouch.entity.ChatRoom;
import com.intouch.InTouch.service.ChatMessageService;
import com.intouch.InTouch.service.ChatRoomService;
import com.intouch.InTouch.utils.dtos.chat.UserMessage;
import com.intouch.InTouch.utils.exceptions.UserNotFoundException;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    private ChatMessageService chatMessageService;
    private ChatRoomService chatRoomService;
    private SimpMessagingTemplate messagingTemplate;

    public ChatController(ChatMessageService chatMessageService, ChatRoomService chatRoomService, SimpMessagingTemplate messagingTemplate) {
        this.chatRoomService = chatRoomService;
        this.chatMessageService = chatMessageService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat")
    public void processMessage(@Payload UserMessage userMessage) throws UserNotFoundException {
        ChatRoom chatRoom = chatRoomService.getChatRoom(userMessage.getRecipientEmail());
        ChatMessage chatMessage = chatMessageService.createMessage();
    }



}
