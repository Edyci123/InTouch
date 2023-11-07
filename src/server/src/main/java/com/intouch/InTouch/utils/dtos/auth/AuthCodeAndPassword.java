package com.intouch.InTouch.utils.dtos.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AuthCodeAndPassword {
    private String email;
    private String newPassword;
    private String code;
}
