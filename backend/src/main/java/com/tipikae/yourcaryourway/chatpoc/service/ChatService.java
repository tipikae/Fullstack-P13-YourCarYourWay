package com.tipikae.yourcaryourway.chatpoc.service;

import com.tipikae.yourcaryourway.chatpoc.model.InputMessage;
import com.tipikae.yourcaryourway.chatpoc.model.OutputMessage;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

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
        String time = new SimpleDateFormat("HH:mm").format(new Date());
        return new OutputMessage(inputMessage.getFrom(), inputMessage.getTo(), inputMessage.getText(), time);
    }
}
