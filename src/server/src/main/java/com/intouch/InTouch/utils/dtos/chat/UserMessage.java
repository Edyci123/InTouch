package com.intouch.InTouch.utils.dtos.chat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserMessage {

    private String content;
    private String recipientEmail;

}
