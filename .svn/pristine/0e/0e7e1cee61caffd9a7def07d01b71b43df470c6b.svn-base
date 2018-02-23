package com.rcsit.scf.bsp.domain.enums;

/**
 * Created by hmily on 2017/5/3.
 */
public enum UserIdentityType {
    ENTERPRISE("核心企业"),
    SUPPLIER("供应商"),
    FINANCIAL("金融机构");
    private String text;

    public static UserIdentityType getIdentity(String type){
        if ( type .equalsIgnoreCase("ENTERPRISE"))
            return ENTERPRISE;
        else if (type.equalsIgnoreCase("SUPPLIER"))
            return SUPPLIER;
        else
            return FINANCIAL;
    }

    UserIdentityType(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }
}
