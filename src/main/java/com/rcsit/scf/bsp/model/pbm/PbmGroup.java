package com.rcsit.scf.bsp.model.pbm;

import com.rcsit.scf.bsp.domain.PbmBaseDomain;

/**
 * Created by hmily on 2017/5/5.
 */
public class PbmGroup extends PbmBaseDomain {

    //企业集团代码
    private String groupCompanyCode;
    //企业集团名字
    private String groupCompanyName;
    //企业集团简称
    private String groupCompanyShortName;

    public String getGroupCompanyCode() {
        return groupCompanyCode;
    }

    public void setGroupCompanyCode(String groupCompanyCode) {
        this.groupCompanyCode = groupCompanyCode;
    }

    public String getGroupCompanyName() {
        return groupCompanyName;
    }

    public void setGroupCompanyName(String groupCompanyName) {
        this.groupCompanyName = groupCompanyName;
    }

    public String getGroupCompanyShortName() {
        return groupCompanyShortName;
    }

    public void setGroupCompanyShortName(String groupCompanyShortName) {
        this.groupCompanyShortName = groupCompanyShortName;
    }
}
