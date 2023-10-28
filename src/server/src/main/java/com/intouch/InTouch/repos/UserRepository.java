package com.intouch.InTouch.repos;

import com.intouch.InTouch.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    Page<User> findByEmailContaining(String email, Pageable pageable);

    Optional<User> findByCode(String code);

}
