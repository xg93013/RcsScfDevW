package com.rcsit.scf.bsp.exception;


import com.rcsit.scf.bsp.utils.ResourceBundleUtil;

/**
 * 异常类，根据业务不同，继承此类
 */
public class MessageRuntimeException extends RuntimeException {
    private String messageKey;


    public MessageRuntimeException(String messageKey) {
        this.messageKey = messageKey;
    }

    @Override
    public String getMessage() {
        try {
            return ResourceBundleUtil.getString(messageKey, "messages");
        } catch (Exception e) {
            return messageKey;
        }
    }
}
