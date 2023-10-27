package com.intouch.InTouch.utils.dtos.friends;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class FriendsListsByStatusResponse {
    List<FriendResponse> accepted;
    List<FriendResponse> pending;
    List<FriendResponse> sent;

}
