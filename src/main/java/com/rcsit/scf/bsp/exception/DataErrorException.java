package com.rcsit.scf.bsp.exception;

/**
 * Created by hmily on 2017/5/25.
 */
public class DataErrorException extends MessageRuntimeException {

    public DataErrorException() {
        super("error.data.error");
    }
}
