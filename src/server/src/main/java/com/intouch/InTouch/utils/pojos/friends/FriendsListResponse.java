package com.intouch.InTouch.utils.pojos.friends;

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
    private List<FriendResponse> friends;
}
