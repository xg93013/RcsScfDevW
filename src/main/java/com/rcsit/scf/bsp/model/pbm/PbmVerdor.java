package com.rcsit.scf.bsp.model.pbm;

import com.rcsit.scf.bsp.domain.PbmExtensionDomain;

/**
 * Created by hmily on 2017/5/5.
 */
public class PbmVerdor extends PbmExtensionDomain {
    //供应商代码
    private String supplyCode;
    //供应商名称
    private String supplyName;
    //供应商简称
    private String supplyShortName;
    //征信机构代码
    private String creditAgencyCode;
    //基本户开户行行名
    private String basicAccountBankName;
    //基本户开户行行号
    private String basicAccountBankCode;
    //基本户户名
    private String basicAccountName;
    //基本户账号
    private String basicAccount;
    //财务主管
    private String financeSupervisor;


    public String getBasicAccountName() {
        return basicAccountName;
    }

    public void setBasicAccountName(String basicAccountName) {
        this.basicAccountName = basicAccountName;
    }

    public String getSupplyCode() {
        return supplyCode;
    }

    public void setSupplyCode(String supplyCode) {
        this.supplyCode = supplyCode;
    }

    public String getSupplyName() {
        return supplyName;
    }

    public void setSupplyName(String supplyName) {
        this.supplyName = supplyName;
    }

    public String getSupplyShortName() {
        return supplyShortName;
    }

    public void setSupplyShortName(String supplyShortName) {
        this.supplyShortName = supplyShortName;
    }

    public String getCreditAgencyCode() {
        return creditAgencyCode;
    }

    public void setCreditAgencyCode(String creditAgencyCode) {
        this.creditAgencyCode = creditAgencyCode;
    }

    public String getBasicAccountBankName() {
        return basicAccountBankName;
    }

    public void setBasicAccountBankName(String basicAccountBankName) {
        this.basicAccountBankName = basicAccountBankName;
    }

    public String getBasicAccountBankCode() {
        return basicAccountBankCode;
    }

    public void setBasicAccountBankCode(String basicAccountBankCode) {
        this.basicAccountBankCode = basicAccountBankCode;
    }

    public String getBasicAccount() {
        return basicAccount;
    }

    public void setBasicAccount(String basicAccount) {
        this.basicAccount = basicAccount;
    }

    public String getFinanceSupervisor() {
        return financeSupervisor;
    }

    public void setFinanceSupervisor(String financeSupervisor) {
        this.financeSupervisor = financeSupervisor;
    }
}
