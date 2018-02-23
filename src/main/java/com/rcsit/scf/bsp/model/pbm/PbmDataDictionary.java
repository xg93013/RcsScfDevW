package com.rcsit.scf.bsp.model.pbm;

import com.rcsit.scf.bsp.domain.Domain;

/**
 * Created by hmily on 2017/5/5.
 */
public class PbmDataDictionary extends Domain {

    //数据类型
    private String type;
    //键
    private String key;
    //值
    private String value;
    //备注
    private String remark;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
