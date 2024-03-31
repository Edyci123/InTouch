package com.intouch.InTouch.utils.dtos.friends;

import com.intouch.InTouch.entity.Account;
import com.intouch.InTouch.utils.enums.FriendshipStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FriendResponse {
    private int id;
    private String email;
    private String username;
    private FriendshipStatus status;
    private Account accounts;
    private String photoUri;
}
