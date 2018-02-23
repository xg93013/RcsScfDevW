package com.rcsit.scf.bsp.exception;

/**
 * Created by hmily on 2017/5/25.
 */
public class LogoutErrorException  extends  MessageRuntimeException{
    public LogoutErrorException() {
        super("error.logout.error");
    }
}
