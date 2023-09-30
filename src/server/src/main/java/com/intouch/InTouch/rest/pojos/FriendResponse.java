package com.intouch.InTouch.rest.pojos;

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
    private String status;
}
