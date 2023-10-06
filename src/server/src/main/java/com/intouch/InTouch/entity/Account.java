package com.intouch.InTouch.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "accounts")
@Getter
@Setter
@NoArgsConstructor
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "snapchat_username")
    private String snapchatUsername;

    @Column(name = "instagram_username")
    private String instagramUsername;

    @Column(name = "facebook_username")
    private String facebookUsername;

    public Account(String snapchatUsername, String instagramUsername, String facebookUsername) {
        this.snapchatUsername = snapchatUsername;
        this.instagramUsername = instagramUsername;
        this.facebookUsername = facebookUsername;
    }
}
