package com.rcsit.scf.bsp.model.avf;

import com.rcsit.scf.bsp.domain.Domain;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.collections.CollectionUtils;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 可融资发票信息
 * Created by chenkai on 2017/5/5.
 */
public class AvfFinInvoiceInfo extends Domain {
    //录入编号
    private String docNo;
    //企业集团代码
    private String groupCompanyCode;
    //企业集团名称
    private String groupCompanyName;
    //企业集团简称
    private String groupCompanyShortName;
    //公司代码
    private String companyCode;
    //公司名称
    private String companyName;
    //公司简称
    private String companyShortName;
    //供应商代码
    private String supplyCode;
    //供应商名称
    private String supplyName;
    //供应商简称
    private String supplyShortName;
    //备注说明
    private String remarks;
    //发票代码
    private String invoiceCode;
    //发票号码
    private String invoiceNo;
    //不含税金额
    private BigDecimal taxFreeSum;
    //含税金额
    private BigDecimal vatMoney;
    //税额
    private BigDecimal vatSum;
    //开票日期
    private String invoDate;
    //账款到期日
    private Date maturityDate;
    //批次号
    private String batchNumber;
    //业务处理状态
    private int businessDealStatus;
    //业务处理描述
    private String businessDealInfo;
    //应付账款凭证
    private String payableCertificate;

    public String getDocNo() {
        return docNo;
    }

    public void setDocNo(String docNo) {
        this.docNo = docNo;
    }

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

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getInvoiceCode() {
        return invoiceCode;
    }

    public void setInvoiceCode(String invoiceCode) {
        this.invoiceCode = invoiceCode;
    }

    public String getInvoiceNo() {
        return invoiceNo;
    }

    public void setInvoiceNo(String invoiceNo) {
        this.invoiceNo = invoiceNo;
    }

    public BigDecimal getTaxFreeSum() {
        return taxFreeSum;
    }

    public void setTaxFreeSum(BigDecimal taxFreeSum) {
        this.taxFreeSum = taxFreeSum;
    }

    public BigDecimal getVatMoney() {
        return vatMoney;
    }

    public void setVatMoney(BigDecimal vatMoney) {
        this.vatMoney = vatMoney;
    }

    public BigDecimal getVatSum() {
        return vatSum;
    }

    public void setVatSum(BigDecimal vatSum) {
        this.vatSum = vatSum;
    }

    public String getInvoDate() {
        return invoDate;
    }

    public void setInvoDate(String invoDate) {
        this.invoDate = invoDate;
    }

    public Date getMaturityDate() {
        return maturityDate;
    }

    public void setMaturityDate(Date maturityDate) {
        this.maturityDate = maturityDate;
    }

    public String getBatchNumber() {
        return batchNumber;
    }

    public void setBatchNumber(String batchNumber) {
        this.batchNumber = batchNumber;
    }

    public int getBusinessDealStatus() {
        return businessDealStatus;
    }

    public void setBusinessDealStatus(int businessDealStatus) {
        this.businessDealStatus = businessDealStatus;
    }

    public String getBusinessDealInfo() {
        return businessDealInfo;
    }

    public void setBusinessDealInfo(String businessDealInfo) {
        this.businessDealInfo = businessDealInfo;
    }

    public String getPayableCertificate() {
        return payableCertificate;
    }

    public void setPayableCertificate(String payableCertificate) {
        this.payableCertificate = payableCertificate;
    }
    public static List<AvfFinInvoiceInfo> toInfoList(List<AvfWaitFinInvoiceInfo> invoiceInfos) throws InvocationTargetException, IllegalAccessException {
        List<AvfFinInvoiceInfo> result = new ArrayList<AvfFinInvoiceInfo>();
        if (CollectionUtils.isNotEmpty(invoiceInfos)) {
            for (AvfWaitFinInvoiceInfo avfWaitFinInvoiceInfo : invoiceInfos) {
                AvfFinInvoiceInfo avfFinInvoiceInfo = new AvfFinInvoiceInfo();
                BeanUtils.copyProperties(avfWaitFinInvoiceInfo,avfFinInvoiceInfo);
                avfFinInvoiceInfo.setId(avfFinInvoiceInfo.getUuid());  //设置id
                result.add(avfFinInvoiceInfo);
            }
        }
        return result;
    }
}
