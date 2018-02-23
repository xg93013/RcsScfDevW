package com.rcsit.scf.bsp.model.ura;

import com.rcsit.scf.bsp.domain.Domain;

import java.util.List;

/**
 * Created by wangdayin.
 * 系统平台角色
 */
public class UraSysRole extends Domain{
    //角色key
    private String roleKey;
    //角色说明
    private String roleDesc;
    //角色权限
    private List<UraSysPermission> rolePermission;


    public List<UraSysPermission> getRolePermission() {
        return rolePermission;
    }

    public void setRolePermission(List<UraSysPermission> rolePermission) {
        this.rolePermission = rolePermission;
    }

    public String getRoleKey() {
        return roleKey;
    }

    public void setRoleKey(String roleKey) {
        this.roleKey = roleKey;
    }

    public String getRoleDesc() {
        return roleDesc;
    }

    public void setRoleDesc(String roleDesc) {
        this.roleDesc = roleDesc;
    }
}
