package com.rcsit.scf.bsp.exception;

/**
 * Created by hmily on 2017/5/3.
 */
public class TokenErrorException extends  MessageRuntimeException{
    public TokenErrorException() {
        super("error.token.disabled");
    }
}
