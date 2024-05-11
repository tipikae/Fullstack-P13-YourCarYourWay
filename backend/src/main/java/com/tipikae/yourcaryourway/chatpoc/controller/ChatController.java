package com.tipikae.yourcaryourway.chatpoc.controller;

import com.tipikae.yourcaryourway.chatpoc.model.InputMessage;
import com.tipikae.yourcaryourway.chatpoc.model.OutputMessage;
import com.tipikae.yourcaryourway.chatpoc.service.IChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

/**
 * Chat controller.
 */
@Controller
public class ChatController {

    @Autowired
    private IChatService chatService;

    @MessageMapping("/support")
    @SendTo("/topic/support")
    public OutputMessage send(InputMessage inputMessage) throws Exception{
        return chatService.handleMessage(inputMessage);
    }
}
