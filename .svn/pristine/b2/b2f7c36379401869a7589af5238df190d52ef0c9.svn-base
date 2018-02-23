package com.rcsit.scf.bsp.bo.Tracking;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by hmily on 2017/8/23.
 */
public class SupplierExcelBo {

    public static final String[] excelHeader0 = {
            "年度","需求编号","核心企业","金融机构",
            "融资金额","融资比例","融资利率","融资利息",
            "融资期限","融资到期日","发票代码","发票号码",
            "应付凭证号",
            "放款（金融机构)","",
            "备注"
    };

    public static final String[] excelHeader1 = {
            "","","","",
            "","","","",
            "","","","",
            "",
            "日期","金额",
            ""
    };

    public static List exportFormat(TrackingExcelBo excelBos){
        List datas = new ArrayList<>();
        datas.add(0, excelBos.getDateYear());
        datas.add(1, excelBos.getFinancingNeedsNo());
        datas.add(2, excelBos.getCompanyName());
        datas.add(3, excelBos.getFinInsName());
        datas.add(4, excelBos.getTotalMoney());
        datas.add(5, excelBos.getFinanceProportion());
        datas.add(6, excelBos.getBankRate());
        datas.add(7, excelBos.getFinanceProportion());
        datas.add(8, excelBos.getFinanceTerm());
        datas.add(9, excelBos.getFinanceEnd());
        datas.add(10, excelBos.getInvoiceCode());
        datas.add(11, excelBos.getInvoiceNo());
        datas.add(12, excelBos.getVoucherNo());
        datas.add(13, excelBos.getLoanDate());
        datas.add(14, excelBos.getLoanMoney());
        datas.add(15, excelBos.getRemarks());
        return datas;
    }


    //会计年度
    private String dateYear;
    //融资需求编号
    private String financingNeedsNo;
    //金融机构名称
    private String finInsName;
    //公司名称
    private String companyName;
    //合计金额
    private BigDecimal totalMoney;
    //银行利率
    private BigDecimal bankRate;
    //融资比例
    private BigDecimal financeProportion;
    //融资利息
    private BigDecimal financeInterest;
    //融资期限
    private String financeTerm;
    //融资到期日
    private Date financeEnd;
    //发票代码
    private String invoiceCode;
    //发票号码
    private String invoiceNo;
    //应收应付凭证号
    private String voucherNo;
    //放款金额
    private BigDecimal loanMoney;
    //放款日期
    private Date loanDate;
    //收款金额
    private BigDecimal receivablesMoney;
    //收款日期
    private Date receivablesDate;
    //备注说明
    private String remarks;
}
