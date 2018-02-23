package com.rcsit.scf.bsp.model.avf;

import com.rcsit.scf.bsp.domain.Domain;
import com.rcsit.scf.bsp.model.ura.UraSysUser;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 应收账款转让通知单
 * Created by chenkai on 2017/5/9.
 */
public class AvfAccountsRecTraNotice extends Domain {
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
    //金融机构代码
    private String finInsCode;
    //金融机构名称
    private String finInsName;
    //金融机构简称
    private String finInsShortName;
    //融资需求编号
    private String financingNeedsNo;
    //融资需求编号id
    private String financingNeedsNoId;
    //通知单编号
    private String noticeNo;
    //通知时间
    private Date noticeTime;
    //融资金额
    private BigDecimal financeMoney;
    //融资期限
    private Date financeTerm;
    //银行利率
    private BigDecimal bankRate;
    //币种
    private String currency;
    //发票总金额
    private BigDecimal invoiceTotalMoney;
    //发票数量
    private int invoiceTotalNumber;
    //账款到期日
    private Date maturityDate;
    /* //融资到期日
     private Date finMaturityDate;*/
    //发票号码
    private String invoiceNo;
    //发票代码
    private String invoiceCode;
    //业务处理状态
    private int businessDealStatus;
    //业务处理描述
    private String businessDealInfo;
    //宽限期
    private Date gracePeriod;
    //融资比例
    private BigDecimal financeProportion;
    //备注说明
    private String remarks;
    //放款金额
    private BigDecimal loanMoney;
    //放款日期
    private Date loanDate;
    //收款金额
    private BigDecimal receivablesMoney;
    //收款日期
    private Date receivablesDate;
    //序列
    private int sequenceIndex;
    //融资利息
    private BigDecimal financeInterest;  //20170524
    //平台账款编号
    private String platformLedgerNo;
    //企业账款编号
    private String enterpriseLedgerNo;
    //账款来源
    private String ledgerSource;

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

    public AvfAccountsRecTraNotice() {
    }

    public AvfAccountsRecTraNotice(String id , int businessDealStatus, String businessDealInfo, UraSysUser user) {
        this.businessDealStatus = businessDealStatus;
        this.businessDealInfo = businessDealInfo;
        this.setId(id);
        this.setEditor(user.getUserName());
        this.setEditorId(user.getId());
        this.setEditTime(new Date());

    }

    public AvfAccountsRecTraNotice(String id , int businessDealStatus, String businessDealInfo, BigDecimal Money, Date Date, UraSysUser user) {
        this(id, businessDealStatus, businessDealInfo,user);
        this.loanMoney = Money;
        this.loanDate = Date;
    }

    public AvfAccountsRecTraNotice(String id , BigDecimal receivablesMoney, Date receivablesDate, int businessDealStatus, String businessDealInfo, UraSysUser user) {
        this(id, businessDealStatus, businessDealInfo,user);
        this.receivablesMoney = receivablesMoney;
        this.receivablesDate = receivablesDate;
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

    public String getPlatformLedgerNo() {
        return platformLedgerNo;
    }

    public void setPlatformLedgerNo(String platformLedgerNo) {
        this.platformLedgerNo = platformLedgerNo;
    }

    public String getEnterpriseLedgerNo() {
        return enterpriseLedgerNo;
    }

    public void setEnterpriseLedgerNo(String enterpriseLedgerNo) {
        this.enterpriseLedgerNo = enterpriseLedgerNo;
    }

    public String getLedgerSource() {
        return ledgerSource;
    }

    public void setLedgerSource(String ledgerSource) {
        this.ledgerSource = ledgerSource;
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

    public String getFinancingNeedsNo() {
        return financingNeedsNo;
    }

    public void setFinancingNeedsNo(String financingNeedsNo) {
        this.financingNeedsNo = financingNeedsNo;
    }

    public String getFinancingNeedsNoId() {
        return financingNeedsNoId;
    }

    public void setFinancingNeedsNoId(String financingNeedsNoId) {
        this.financingNeedsNoId = financingNeedsNoId;
    }

    public String getNoticeNo() {
        return noticeNo;
    }

    public void setNoticeNo(String noticeNo) {
        this.noticeNo = noticeNo;
    }

    public Date getNoticeTime() {
        return noticeTime;
    }

    public void setNoticeTime(Date noticeTime) {
        this.noticeTime = noticeTime;
    }

    public BigDecimal getFinanceMoney() {
        return financeMoney;
    }

    public void setFinanceMoney(BigDecimal financeMoney) {
        this.financeMoney = financeMoney;
    }

    public Date getFinanceTerm() {
        return financeTerm;
    }

    public void setFinanceTerm(Date financeTerm) {
        this.financeTerm = financeTerm;
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

    public BigDecimal getInvoiceTotalMoney() {
        return invoiceTotalMoney;
    }

    public void setInvoiceTotalMoney(BigDecimal invoiceTotalMoney) {
        this.invoiceTotalMoney = invoiceTotalMoney;
    }

    public int getInvoiceTotalNumber() {
        return invoiceTotalNumber;
    }

    public void setInvoiceTotalNumber(int invoiceTotalNumber) {
        this.invoiceTotalNumber = invoiceTotalNumber;
    }

    public Date getMaturityDate() {
        return maturityDate;
    }

    public void setMaturityDate(Date maturityDate) {
        this.maturityDate = maturityDate;
    }


    public String getInvoiceNo() {
        return invoiceNo;
    }

    public void setInvoiceNo(String invoiceNo) {
        this.invoiceNo = invoiceNo;
    }

    public String getInvoiceCode() {
        return invoiceCode;
    }

    public void setInvoiceCode(String invoiceCode) {
        this.invoiceCode = invoiceCode;
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

    public Date getGracePeriod() {
        return gracePeriod;
    }

    public void setGracePeriod(Date gracePeriod) {
        this.gracePeriod = gracePeriod;
    }

    public BigDecimal getFinanceProportion() {
        return financeProportion;
    }

    public void setFinanceProportion(BigDecimal financeProportion) {
        this.financeProportion = financeProportion;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public BigDecimal getLoanMoney() {
        return loanMoney;
    }

    public void setLoanMoney(BigDecimal loanMoney) {
        this.loanMoney = loanMoney;
    }

    public Date getLoanDate() {
        return loanDate;
    }

    public void setLoanDate(Date loanDate) {
        this.loanDate = loanDate;
    }

    public BigDecimal getReceivablesMoney() {
        return receivablesMoney;
    }

    public void setReceivablesMoney(BigDecimal receivablesMoney) {
        this.receivablesMoney = receivablesMoney;
    }

    public Date getReceivablesDate() {
        return receivablesDate;
    }

    public void setReceivablesDate(Date receivablesDate) {
        this.receivablesDate = receivablesDate;
    }

    public AvfAccountsRecTraNotice init(AvfAccountsRecTraNotice notice,UraSysUser user){
        this.businessDealStatus =notice.getBusinessDealStatus();
        this.businessDealInfo = notice.getBusinessDealInfo();
        this.setEditor(user.getUserName());
        this.setEditorId(user.getId());
        this.setEditTime(new Date());
        return this;
    }

    public int getSequenceIndex() {
        return sequenceIndex;
    }


    public void setSequenceIndex(int sequenceIndex) {
        this.sequenceIndex = sequenceIndex;
    }

    public BigDecimal getFinanceInterest() {
        return financeInterest;
    }

    public void setFinanceInterest(BigDecimal financeInterest) {
        this.financeInterest = financeInterest;
    }
}
