package com.intouch.InTouch.repos;

import com.intouch.InTouch.entity.ChatMessage;
import com.intouch.InTouch.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Integer> {

    List<ChatMessage> findByChatRoom(ChatRoom chatRoom);

}
