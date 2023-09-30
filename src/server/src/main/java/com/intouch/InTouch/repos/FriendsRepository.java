package com.intouch.InTouch.repos;

import com.intouch.InTouch.entity.Friends;
import com.intouch.InTouch.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FriendsRepository {

    private final EntityManager entityManager;

    @Autowired
    public FriendsRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public Friends findByUsers(User user1, User user2) {
        TypedQuery<Friends> query = entityManager.createQuery("SELECT f FROM Friends f WHERE (f.user1=:u1 and f.user2=:u2) or (f.user2=:u1 and f.user1=:u2)", Friends.class);
        query.setParameter("u1", user1);
        query.setParameter("u2", user2);
        return query.getSingleResult();
    }

    public List<Friends> findAllFriendsOfAnUser(User user) {
        TypedQuery<Friends> query = entityManager.createQuery("FROM Friends WHERE user1=:user or user2=:user", Friends.class);
        query.setParameter("user", user);
        return query.getResultList();
    }

    public void createFriend(User sender, User receiver, String status) {
        Friends friends = new Friends(sender, receiver, status);
        entityManager.persist(friends);
    }

}
