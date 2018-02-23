package com.rcsit.scf.bsp.model.ura;

import com.rcsit.scf.bsp.domain.Domain;

/**
 * Created by wangdayin.
 */
public class UraSysPermission extends Domain {
    //url
    private String url;
    //权限说明
    private String permissionName;
    //父权限id
    private String parentId;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPermissionName() {
        return permissionName;
    }

    public void setPermissionName(String permissionName) {
        this.permissionName = permissionName;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }
}
