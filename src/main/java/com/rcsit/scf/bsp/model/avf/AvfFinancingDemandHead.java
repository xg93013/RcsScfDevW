package com.rcsit.scf.bsp.model.avf;

import com.rcsit.scf.bsp.domain.Domain;
import com.rcsit.scf.bsp.model.pbm.PbmFinancialInstitution;
import com.rcsit.scf.bsp.model.ura.UraSysIdentity;
import com.rcsit.scf.bsp.model.ura.UraSysUser;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 融资需求申请抬头
 * Created by chenkai on 2017/5/5.
 */
public class AvfFinancingDemandHead extends Domain {
    //融资需求编号
    private String financingNeedsNo;
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
    //金融机构代码
    private String finInsCode;
    //金融机构名称
    private String finInsName;
    //金融机构简称
    private String finInsShortName;
    //银行利率
    private BigDecimal bankRate;
    //币种
    private String currency;
    //账款到期日
    private Date maturityDate;
    //业务处理状态
    private int businessDealStatus;
    //业务处理描述
    private String businessDealInfo;
    //发票总金额
    private BigDecimal invoiceTotalMoney;
    //意向融资金额
    private BigDecimal intentionFmoney;
    //意向融资期限
    private Date intentionFterm;
    //意向融资备注
    private String intentionFremark;
    //宽限期
    private Date gracePeriod;
    //合计金额
    private BigDecimal totalMoney;
    //发票数量
    private int invoiceTotalNumber;
    //应付账款凭证
    private String payableCertificate;
    //序列
    private int sequenceIndex;
    //融资起始日
    private Date financeStart;
    //融资到期日
    private Date financeEnd;

    public Date getFinanceStart() {
        return financeStart;
    }

    public void setFinanceStart(Date financeStart) {
        this.financeStart = financeStart;
    }

    public Date getFinanceEnd() {
        return financeEnd;
    }

    public void setFinanceEnd(Date financeEnd) {
        this.financeEnd = financeEnd;
    }

    public AvfFinancingDemandHead() {
    }

    public AvfFinancingDemandHead(String id , int businessDealStatus, String businessDealInfo,UraSysUser user) {
        this.businessDealStatus = businessDealStatus;
        this.businessDealInfo = businessDealInfo;
        this.setId(id);
        this.setEditor(user.getUserName());
        this.setEditorId(user.getId());
        this.setEditTime(new Date());
    }

    public String getFinancingNeedsNo() {
        return financingNeedsNo;
    }

    public void setFinancingNeedsNo(String financingNeedsNo) {
        this.financingNeedsNo = financingNeedsNo;
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

    public BigDecimal getBankRate() {
        return bankRate;
    }

    public void setBankRate(BigDecimal bankRate) {
        this.bankRate = bankRate;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Date getMaturityDate() {
        return maturityDate;
    }

    public void setMaturityDate(Date maturityDate) {
        this.maturityDate = maturityDate;
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

    public BigDecimal getInvoiceTotalMoney() {
        return invoiceTotalMoney;
    }

    public void setInvoiceTotalMoney(BigDecimal invoiceTotalMoney) {
        this.invoiceTotalMoney = invoiceTotalMoney;
    }

    public BigDecimal getIntentionFmoney() {
        return intentionFmoney;
    }

    public void setIntentionFmoney(BigDecimal intentionFmoney) {
        this.intentionFmoney = intentionFmoney;
    }

    public Date getIntentionFterm() {
        return intentionFterm;
    }

    public void setIntentionFterm(Date intentionFterm) {
        this.intentionFterm = intentionFterm;
    }

    public String getIntentionFremark() {
        return intentionFremark;
    }

    public void setIntentionFremark(String intentionFremark) {
        this.intentionFremark = intentionFremark;
    }

    public Date getGracePeriod() {
        return gracePeriod;
    }

    public void setGracePeriod(Date gracePeriod) {
        this.gracePeriod = gracePeriod;
    }

    public BigDecimal getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(BigDecimal totalMoney) {
        this.totalMoney = totalMoney;
    }

    public int getInvoiceTotalNumber() {
        return invoiceTotalNumber;
    }

    public void setInvoiceTotalNumber(int invoiceTotalNumber) {
        this.invoiceTotalNumber = invoiceTotalNumber;
    }

    public String getPayableCertificate() {
        return payableCertificate;
    }

    public void setPayableCertificate(String payableCertificate) {
        this.payableCertificate = payableCertificate;
    }


    public AvfFinancingDemandHead init(AvfFinancingDemandHead avfFinancingDemandHead) {
        this.setBusinessDealStatus(avfFinancingDemandHead.getBusinessDealStatus());
        this.setBusinessDealInfo(avfFinancingDemandHead.getBusinessDealInfo());
        this.setEditor(avfFinancingDemandHead.getEditor());
        this.setEditorId(avfFinancingDemandHead.getEditorId());
        this.setEditTime(new Date());
        return this;
    }


    public int getSequenceIndex() {
        return sequenceIndex;
    }

    public void setSequenceIndex(int sequenceIndex) {
        this.sequenceIndex = sequenceIndex;
    }

    public void toDemandHead(String financingNeedsNo, UraSysIdentity usi, PbmFinancialInstitution instiution, AvfFinInvoiceInfo invoiceInfo, int businessDealStatus, String businessDealInfo, int sequenceIndex) {
        this.financingNeedsNo = financingNeedsNo;
        this.companyCode = invoiceInfo.getCompanyCode();
        this.companyName = invoiceInfo.getCompanyName();
        this.companyShortName = invoiceInfo.getCompanyShortName();
        this.supplyCode = invoiceInfo.getSupplyCode();
        this.supplyName = invoiceInfo.getSupplyName();
        this.supplyShortName = invoiceInfo.getSupplyShortName();
        this.finInsCode = instiution.getFinInsCode();
        this.finInsName = instiution.getFinInsName();
        this.finInsShortName = instiution.getFinInsShortName();
        this.businessDealStatus = businessDealStatus;
        this.businessDealInfo = businessDealInfo;
        this.sequenceIndex = sequenceIndex;
        this.setId(getUuid());
        this.setCreator(usi.getCompanyName());
        this.setCreatorId(usi.getId());
    }

}
