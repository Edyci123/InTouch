package com.intouch.InTouch.repos;

import com.intouch.InTouch.entity.Friends;
import com.intouch.InTouch.entity.User;
import com.intouch.InTouch.utils.enums.FriendshipStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendsRepository extends JpaRepository<Friends, Integer> {

    @Query("SELECT f FROM Friends f WHERE (f.user1=:u1 and f.user2=:u2) or (f.user1=:u2 and f.user2=:u1)")
    List<Friends> findByUsers(@Param("u1") User user1, @Param("u2") User user2);
    List<Friends> findByUser1(User user1);
    List<Friends> findByUser1AndStatus(User user1, FriendshipStatus status);

//    private final EntityManager entityManager;
//
//    @Autowired
//    public FriendsRepository(EntityManager entityManager) {
//        this.entityManager = entityManager;
//    }
//
//    public void update(Friends friends) {
//        entityManager.persist(friends);
//    }
//
//    public List<Friends> findByUsers(User user1, User user2) {
//        TypedQuery<Friends> query = entityManager.createQuery("SELECT f FROM Friends f WHERE (f.user1=:u1 and f.user2=:u2) or (f.user2=:u1 and f.user1=:u2)", Friends.class);
//        query.setParameter("u1", user1);
//        query.setParameter("u2", user2);
//        return query.getResultList();
//    }
//
//    public List<Friends> findAllFriendsOfAnUser(User user) {
//        TypedQuery<Friends> query = entityManager.createQuery("FROM Friends WHERE user1=:user", Friends.class);
//        query.setParameter("user", user);
//        return query.getResultList();
//    }
//
//    public void deleteFriendship(Friends friends) {
//        entityManager.remove(friends);
//    }
//
//    public void createFriend(User sender, User receiver, FriendshipStatus status) {
//        Friends friends = new Friends(sender, receiver, status);
//        entityManager.persist(friends);
//    }

}
