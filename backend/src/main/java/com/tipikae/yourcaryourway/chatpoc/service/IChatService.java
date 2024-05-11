package com.tipikae.yourcaryourway.chatpoc.service;

import com.tipikae.yourcaryourway.chatpoc.model.InputMessage;
import com.tipikae.yourcaryourway.chatpoc.model.OutputMessage;

/**
 * Chat service interface.
 */
public interface IChatService {

    /**
     * Message handler.
     * @param inputMessage Input message.
     * @return OutputMessage
     */
    OutputMessage handleMessage(InputMessage inputMessage);
}
