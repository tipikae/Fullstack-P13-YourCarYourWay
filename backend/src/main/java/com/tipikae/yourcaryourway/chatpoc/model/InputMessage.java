package com.tipikae.yourcaryourway.chatpoc.model;

import lombok.Data;

/**
 * Incoming message.
 */
@Data
public class InputMessage {

    private String from;
    private String text;
}
