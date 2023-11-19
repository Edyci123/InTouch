package com.intouch.InTouch.repos;

import com.intouch.InTouch.entity.ChatRoom;
import com.intouch.InTouch.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Integer> {

    Optional<ChatRoom> findBySenderAndRecipient(User sender, User recipient);

}
