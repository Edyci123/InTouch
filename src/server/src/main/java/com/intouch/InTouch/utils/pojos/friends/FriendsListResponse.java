package com.intouch.InTouch.utils.pojos.friends;


import com.intouch.InTouch.utils.pojos.friends.FriendResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class FriendsListResponse {
    List<FriendResponse> accepted;
    List<FriendResponse> pending;
    List<FriendResponse> sent;
}
