package com.tipikae.yourcaryourway.chatpoc.service;

import com.tipikae.yourcaryourway.chatpoc.model.InputMessage;
import com.tipikae.yourcaryourway.chatpoc.model.OutputMessage;
import org.springframework.stereotype.Service;

/**
 * Chat service.
 */
@Service
public class ChatService implements IChatService {

    /**
     * Message handler.
     *
     * @param inputMessage Input message.
     * @return OutputMessage
     */
    public OutputMessage handleMessage(InputMessage inputMessage) {
        return new OutputMessage(inputMessage.getFrom(), inputMessage.getText());
    }
}
