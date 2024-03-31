package com.intouch.InTouch.utils.dtos.users;

import com.intouch.InTouch.entity.Account;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private String email;
    private String username;
    private Account accounts;
    private String photoUri;
}
