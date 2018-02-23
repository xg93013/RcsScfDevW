package com.rcsit.scf.bsp.model.ura;

import com.rcsit.scf.bsp.domain.Domain;

import java.util.List;

/**
 * Created by wangdayin.
 * 系统平台用户
 */
public class UraSysUser extends Domain {
    //用户名称
    private String userName;
    //用户类型
    private String userType;
    //用户邮箱
    private String email;
    //密码
    private String password;
    //用户登录账号
    private String loginName;
    //用户手机
    private String phone;
    //用户code
    private String userCode;
    //性别
    private int gender =0;
    //当前身份
    private  UraSysIdentity uraSysIdentity;
    //用户角色
    private List<UraSysRole> userRole;
    //用户身份列表
    private List<UraSysIdentity> uraSysIdentities;

    public List<UraSysIdentity> getUraSysIdentities() {
        return uraSysIdentities;
    }

    public void setUraSysIdentities(List<UraSysIdentity> uraSysIdentities) {
        this.uraSysIdentities = uraSysIdentities;
    }

    public List<UraSysRole> getUserRole() {
        return userRole;
    }

    public void setUserRole(List<UraSysRole> userRole) {
        this.userRole = userRole;
    }

    public String getUserCode() {
        return userCode;
    }

    public void setUserCode(String userCode) {
        this.userCode = userCode;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public int getGender() {
        return gender;
    }

    public void setGender(int gender) {
        this.gender = gender;
    }

    public UraSysIdentity getUraSysIdentity() {
        return uraSysIdentity;
    }

    public void setUraSysIdentity(UraSysIdentity uraSysIdentity) {
        this.uraSysIdentity = uraSysIdentity;
    }
}
