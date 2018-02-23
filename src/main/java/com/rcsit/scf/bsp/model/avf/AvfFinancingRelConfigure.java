package com.rcsit.scf.bsp.model.avf;

import com.rcsit.scf.bsp.domain.Domain;

import java.math.BigDecimal;

/**
 * 融资关系配置表
 * Created by chenkai on 2017/5/9.
 */
public class AvfFinancingRelConfigure extends Domain {
    //企业集团代码
    private String groupCompanyCode;
    //企业集团名称
    private String groupCompanyName;
    //企业集团简称
    private String groupCompanyShortName;
    //供应商代码
    private String supplyCode;
    //供应商名称
    private String supplyName;
    //供应商简称
    private String supplyShortName;
    //金融机构代码
    private String finInsCode;
    //金融机构名称
    private String finInsName;
    //金融机构简称
    private String finInsShortName;
    //公司代码
    private String companyCode;
    //公司名称
    private String companyName;
    //公司简称
    private String companyShortName;
    //银行利率
    private BigDecimal bankRate;
    //备注说明
    private String remarks;

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

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyShortName() {
        return companyShortName;
    }

    public void setCompanyShortName(String companyShortName) {
        this.companyShortName = companyShortName;
    }

    public BigDecimal getBankRate() {
        return bankRate;
    }

    public void setBankRate(BigDecimal bankRate) {
        this.bankRate = bankRate;
    }
}
