package com.rcsit.scf.bsp.exception;

/**
 * Created by winfred on 2017/6/7.
 */
public class UserNameOrPasswordException extends MessageRuntimeException {
    public UserNameOrPasswordException(String messageKey) {
        super("error.username.or.password");
    }

    public UserNameOrPasswordException() {
        super("error.username.or.password");
    }
}
