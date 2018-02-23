package com.rcsit.scf.bsp.domain.enums;

/**
 * Created by wangdayin.
 * 录入方式
 */
public enum InputType {
    H("手动"), A("自动"), I("手工");

    private String text;

    InputType(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }
}
