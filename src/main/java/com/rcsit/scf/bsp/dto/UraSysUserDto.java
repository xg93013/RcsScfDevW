package com.rcsit.scf.bsp.dto;


import com.rcsit.scf.bsp.model.ura.UraSysIdentity;

import java.util.List;

/**
 * Created by hmily on 2017/5/3.
 */
public class UraSysUserDto {

    private String id;

    //用户名称
    private String userName;
    //用户类型
    //private String userType;
    //用户邮箱
    private String email;
    //Token
    private String token;

    private String phone;
    //当前用户身份
    private UraSysIdentity uraSysIdentity;
    //用户拥有的身份列表
    private List<UraSysIdentity> uraSysIdentities;

    public List<UraSysIdentity> getUraSysIdentities() {
        return uraSysIdentities;
    }

    public void setUraSysIdentities(List<UraSysIdentity> uraSysIdentities) {
        this.uraSysIdentities = uraSysIdentities;
    }

    public UraSysIdentity getUraSysIdentity() {
        return uraSysIdentity;
    }

    public void setUraSysIdentity(UraSysIdentity uraSysIdentity) {
        this.uraSysIdentity = uraSysIdentity;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
