package com.intouch.InTouch.utils.dtos.users;


import com.intouch.InTouch.entity.Account;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PartialUpdateUserRequest {
    private Account accounts;
    private String username;
}
