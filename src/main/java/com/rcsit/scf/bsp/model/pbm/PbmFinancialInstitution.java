package com.rcsit.scf.bsp.model.pbm;

import com.rcsit.scf.bsp.domain.PbmExtensionDomain;

/**
 * Created by hmily on 2017/5/5.
 */
public class PbmFinancialInstitution extends PbmExtensionDomain {

    //金融机构代码
    private String finInsCode;
    //金融机构名称
    private String finInsName;
    //金融机构简称
    private String finInsShortName;
    //金融机构代码证
    private String finInsCodeCard;

    public String getFinInsCode() {
        return finInsCode;
    }

    public void setFinInsCode(String finInsCode) {
        this.finInsCode = finInsCode;
    }

    public String getFinInsName() {
        return finInsName;
    }

    public void setFinInsName(String finInsName) {
        this.finInsName = finInsName;
    }

    public String getFinInsShortName() {
        return finInsShortName;
    }

    public void setFinInsShortName(String finInsShortName) {
        this.finInsShortName = finInsShortName;
    }

    public String getFinInsCodeCard() {
        return finInsCodeCard;
    }

    public void setFinInsCodeCard(String finInsCodeCard) {
        this.finInsCodeCard = finInsCodeCard;
    }
}
