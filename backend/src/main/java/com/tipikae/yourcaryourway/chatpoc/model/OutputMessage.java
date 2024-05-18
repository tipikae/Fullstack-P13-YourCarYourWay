package com.tipikae.yourcaryourway.chatpoc.model;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Outcoming message.
 */
@Data
@AllArgsConstructor
public class OutputMessage {

    private String from;
    private String text;
}
