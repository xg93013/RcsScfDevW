package com.rcsit.scf.bsp.constant;

import com.rcsit.scf.bsp.utils.ResourceBundleUtil;

/**
 * Created by hmily on 2017/5/24.
 */
public class ServerConstant extends ResourceBundleUtil {
    //主机地址
    public static final String HOST_ADDRESS = getStringWithDefault("HOST_ADDRESS", "http://127.0.0.1:8080/st");
    //用户登录
    public static final String URL_URA_LOGIN = getStringWithDefault("URL_URA_LOGIN", HOST_ADDRESS + "/ura/user/login.json");
    //获取当前登录用户
    public static final String URL_URA_LOGIN_USER = getStringWithDefault("URL_URA_LOGIN_USER", HOST_ADDRESS + "/ura/user/getCurrentUserInfo.json");
    //获取身份列表
    public static final String URL_URA_USER_IDENTITYLIST = getStringWithDefault("URL_URA_USER_IDENTITYLIST", HOST_ADDRESS + "/ura/user/getIdentityList.json");
    //选择身份登录
    public static final String URL_URA_USER_LOGINWITHIDENTITYID = getStringWithDefault("URL_URA_USER_LOGINWITHIDENTITYLIST", HOST_ADDRESS + "/ura/user/loginWithIdentity.json");
    //登出
    public static final String URL_URA_USER_LOGOUT = getStringWithDefault("URL_URA_USER_LOGOUT", HOST_ADDRESS + "/ura/user/logout.json");
    //修改密码
    public static final String URL_URA_USER_CHANGEPSW = getStringWithDefault("URL_URA_USER_CHANGEPSW", HOST_ADDRESS + "/ura/user/changePsw.json");
    //获取当前登录用户信息
    public static final String URL_URA_USER_CURRENTUSERINFO = getStringWithDefault("URL_URA_USER_CURRENTUSERINFO",HOST_ADDRESS + "/ura/user/getCurrentUserInfo.json");
    //待融资发票列表url
    public static final String URL_AVF_WAIT_LIST = getStringWithDefault("URL_AVF_WAIT_LIST", HOST_ADDRESS + "/avf/invoice/waitList.json");
    //手动录入发票url
    public static final String URL_AVF_WAIT_MANUAL_ADD = getStringWithDefault("URL_AVF_WAIT_MANUAL_ADD", HOST_ADDRESS + "/avf/invoice/manualAddInvoice.json");
    //录入发票唯一验证url
    public static final String URL_AVF_ONLY_VERIFY = getStringWithDefault("URL_AVF_ONLY_VERIFY", HOST_ADDRESS + "/avf/invoice/invoiceOnlyVerify.json");
    //待融资发票详情url
    public static final String URL_AVF_WAIT_INFO = getStringWithDefault("URL_AVF_WAIT_INFO", HOST_ADDRESS + "/avf/invoice/invoiceDetail.json");
    //待融资发票审核url
    public static final String URL_AVF_WAIT_INVOICE_EXAMINE = getStringWithDefault("URL_AVF_WAIT_INVOICE_EXAMINE", HOST_ADDRESS + "/avf/invoice/invoiceExamine.json");
    //导入发票
    public static final String URL_AVF_IMPORT_INVOICE = getStringWithDefault("URL_AVF_IMPORT_INVOICE", HOST_ADDRESS + "/avf/invoice/importInvoice.json");
    //可融资发票列表
    public static final String URL_AVF_APPLY_INFO_LIST=getStringWithDefault("URL_AVF_APPLY_INFO_LIST",HOST_ADDRESS+"/avf/finInvoiceInfo/applyInfoList.json");
    //准备发票统计
    public static final String URL_AVF_WAIT_VERIFY_QUOTA=getStringWithDefault("URL_AVF_APPLY_INFO_LIST",HOST_ADDRESS+"/avf/invoice/waitVerifyQuota.json");
    //准备发票抬头
    public static final String URL_AVF_WAIT_HEAD=getStringWithDefault("URL_AVF_WAIT_HEAD",HOST_ADDRESS+"/avf/invoice/waitFinInvoiceHead.json");
    //删除发票
    public static final String URL_AVF_WAIT_INVOICE_DELETE=getStringWithDefault("URL_AVF_WAIT_INVOICE_DELETE",HOST_ADDRESS+"/avf/invoice/deleteInvoiceHead.json");
    //编辑发票
    public static final String URL_AVF_WAIT_EDIT_INVOICE=getStringWithDefault("URL_AVF_WAIT_EDIT_INVOICE",HOST_ADDRESS+"/avf/invoice/editInvoice.json");


//============================金融机构=====================================
    //查看融资需求抬头详情
    public static final String URL_AVF_FINANCING_DEMANDHEAD_DETAIL = getStringWithDefault("URL_AVF_FINANCING_DEMANDHEAD_DETAIL",HOST_ADDRESS + "/avf/financingApprove/financingApproveHeadDetails.json");
    //待处理
    public static final String URL_AVF_FINANCING_WAITQUATO = getStringWithDefault("URL_AVF_FINANCING_WAITQUATO",HOST_ADDRESS + "/avf/financingApprove/waitDealQuota.json");
    //金融机构查看审核列表
    public static final String URL_AVF_FINANCING_APPROVE_APPROVELIST = getStringWithDefault("URL_AVF_FINANCING_APPROVE_APPROVELIST", HOST_ADDRESS + "/avf/financingApprove/financingApproveList.json");
    //金融机构拒绝融资
    public static final String URL_AVF_FINANCING_FINANCING_REJECT = getStringWithDefault("URL_AVF_FINANCING_FINANCING_REJECT",HOST_ADDRESS + "/avf/financingApprove/doFinancingDemandReject.json");
    //融资需求详情
    public static final String URL_AVF_FINANCING_DEMANINFO_DETAIL = getStringWithDefault("URL_AVF_FINANCING_DEMANDINFO_DETAIL",HOST_ADDRESS + "/avf/financingApprove/financingApproveInfoDetails.json");
    //融资发票详情
    public static final String URL_AVF_FINANCING_INVOICE_INFO = getStringWithDefault("URL_AVF_FINANCING_INVOICE_INFO",HOST_ADDRESS + "/avf/financingApprove/financingInvoiceDetail.json");
    //根据融资需求编号查找融资需求
    public static final String URL_AVF_FINANCING_FINDFINANCING_BYNEEDSID = getStringWithDefault("URL_AVF_FINANCING_FINDFINANCING_BYNEEDSID",HOST_ADDRESS + "/avf/financingDemand/findDemandHeadByNeedsNo.json");

    //融资机构放款列表
    public static final String URL_AVF_FINANCING_LOAN_LOANlIST = getStringWithDefault("URL_AVF_FINANCING_LOAN_LOANlIST",HOST_ADDRESS +"/avf/financingLoan/financingLoanList.json");

    //通知单列表
    public static final String URL_AVF_NOTICE_NOTICELIST = getStringWithDefault("URL_AVF_NOTICE_NOTICELIST",HOST_ADDRESS +"/avf/notice/noticesList.json");
    //通知单详情
    public static final String URL_AVF_NOTICE_NOTICEDETAIL = getStringWithDefault("URL_AVF_NOTICE_NOTICEDETAIL",HOST_ADDRESS +"/avf/notice/noticeDetails.json");
    //通知单详情
    public static final String URL_AVF_NOTICE_NOTICECONFIRM = getStringWithDefault("URL_AVF_NOTICE_NOTICECONFIRM",HOST_ADDRESS +"/avf/notice/noticeConfirm.json");
    //待确认通知单统计
    public static final String URL_AVF_NOTICE_NEEDCONFIRMQUOTA = getStringWithDefault("URL_AVF_NOTICE_NEEDCONFIRMQUOTA",HOST_ADDRESS +"/avf/notice/needConfirmQuota.json");
    //金融机构收款待补录数量
    public static final String URL_AVF_NOTICE_RECIEPT_MAKEUPQUOTA = getStringWithDefault("URL_AVF_NOTICE_RECIEPT_MAKEUPQUOTA",HOST_ADDRESS +"/avf/financingReceipt/waitMakeUpQuota.json");
    //金融机构放款待补录数量
    public static final String URL_AVF_NOTICE_LOAN_MAKEUPQUOTA = getStringWithDefault("URL_AVF_NOTICE_LOAN_MAKEUPQUOTA",HOST_ADDRESS +"/avf/financingLoan/waitMakeUpQuota.json");




    //融资需求申请列表
    public static final String URL_AVF_DEMAND_LIST=getStringWithDefault("URL_AVF_DEMAND_LIST",HOST_ADDRESS+"/avf/financingDemand/demandList.json");
    //融资需求详情申请进度
    public static final String URL_AVF_DEMAND_PROGRESS=getStringWithDefault("URL_AVF_DEMAND_PROGRESS",HOST_ADDRESS+"/avf/financingDemand/demandProgress.json");
    //新增融资申请
    public static final String URL_AVF_SAVE_DEMAND=getStringWithDefault("URL_AVF_SAVE_DEMAND",HOST_ADDRESS+"/avf/financingDemand/saveFinancingDemand.json");
    //维护延长账款
    public static final String URL_AVF_EXTEND_MONEY=getStringWithDefault("URL_AVF_EXTEND_MONEY",HOST_ADDRESS+"/avf/financingDemand/maintainExtendMoney.json");
    //还款融资列表
    public static final String URL_AVF_REPAYMENT_LIST=getStringWithDefault("URL_AVF_REPAYMENT_LIST",HOST_ADDRESS+"/avf/requite/repaymentList.json");
    //还款倒计时
    public static final String URL_AVF_COUNT_DOWN=getStringWithDefault("URL_AVF_COUNT_DOWN",HOST_ADDRESS+"/avf/requite/repaymentCountDown.json");
    //申请融资统计
    public static final String  URL_AVF_DEMAND_VERIFY_QUOTA=getStringWithDefault("URL_AVF_DEMAND_VERIFY_QUOTA",HOST_ADDRESS+"/avf/financingDemand/demandVerifyQuota.json");
    //新增融资选择的可融资发票
    public static final String  URL_AVF_INFO_IDS=getStringWithDefault("URL_AVF_INFO_IDS",HOST_ADDRESS+"/avf/financingDemand/findInvoiceInfoIds.json");


    //融资放款详情
    public static final String URL_AVF_FINANCING_LOAN_LOANDETAIL = getStringWithDefault("URL_AVF_FINANCING_LOAN_LOANDETAIL", HOST_ADDRESS +"/avf/financingLoan/financingLoanDetails.json");
    //融资放款补录
    public static final String URL_AVF_FINANCING_LOAN_MAKEUP = getStringWithDefault("URL_AVF_FINANCING_LOAN_MAKEUP",HOST_ADDRESS +"/avf/financingLoan/financingLoanMakeup.json");
    //融资收款列表
    public static final String URL_AVF_FINANCING_RECIEPT_RECIPTLIST = getStringWithDefault("URL_AVF_FINANCING_RECIEPT_RECIPTLIST",HOST_ADDRESS +"/avf/financingReceipt/financingReceiptList.json");
    //关闭收款补录
    public static final String URL_AVF_FINANCING_RECIEPT_CLOSE = getStringWithDefault("URL_AVF_FINANCING_RECIEPT_CLOSE",HOST_ADDRESS +"/avf/financingReceipt/closeReceipt.json");
    //融资放款详情
    public static final String URL_AVF_FINANCING_RECIEPT_RECIPTDETAIL = getStringWithDefault("URL_AVF_FINANCING_RECIEPT_RECIPTDETAIL",HOST_ADDRESS +"/avf/financingReceipt/financingReceiptDetails.json");
    //融资放款补录
    public static final String URL_AVF_FINANCING_RECIEPT_MAKEUP = getStringWithDefault("URL_AVF_FINANCING_RECIEPT_MAKEUP",HOST_ADDRESS +"/avf/financingReceipt/financingReceiptMakeup.json");

    //核心企业详情
    public static final String URL_PBM_COMPANY_DETAIL = getStringWithDefault("URL_PBM_COMPANY_DETAIL",HOST_ADDRESS +"/pbm/company/companyDetail.json");
    //供应商详情
    public static final String URL_PBM_VERDOR_DETAIL = getStringWithDefault("URL_PBM_VERDOR_DETAIL",HOST_ADDRESS +"/pbm/verdor/verdorDetail.json");
    //供应商信息(新增融资第二步使用)
    public static final String URL_PBM_VERDOR_INFO = getStringWithDefault("URL_PBM_VERDOR_INFO",HOST_ADDRESS +"/pbm/verdor/verdorInfo.json");
    //金融机构详情
    public static final String URL_PBM_FINANCE_DETAIL = getStringWithDefault("URL_PBM_FINANCE_DETAIL",HOST_ADDRESS +"/pbm/financial/finDetail.json");

    //供应商查询核心企业融资关系配置
    public static final String URL_AVF_FINANCINGRELCONFIGURE_SUPPLYCODE = getStringWithDefault("URL_AVF_FINANCINGRELCONFIGURE_SUPPLYCODE",HOST_ADDRESS +"/avf/financingRelConfigure/findRelBySupplyCode.json");
    //供应商查询金融机构融资关系配置
    public static final String URL_AVF_FINANCINGRELCONFIGURE_SUPPLYCODE_COMPANYCODE = getStringWithDefault("URL_AVF_FINANCINGRELCONFIGURE_SUPPLYCODE_COMPANYCODE",HOST_ADDRESS +"/avf/financingRelConfigure/findRelByCompanyCodeAndSupplyCode.json");
    //通过核心企业查询融资关系配置
    public static final String URL_AVF_FINANCINGRELCONFIGURE_COMPANYCODE = getStringWithDefault("URL_AVF_FINANCINGRELCONFIGURE_COMPANYCODE",HOST_ADDRESS +"/avf/financingRelConfigure/findRelByCompanyCode.json");
    //通过核心企业查询金融机构配置
    public static final String URL_AVF_FINANCINGRELCONFIGURE_FIN_COMPANYCODE = getStringWithDefault("URL_AVF_FINANCINGRELCONFIGURE_FIN_COMPANYCODE",HOST_ADDRESS +"/avf/financingRelConfigure/findFinByCompanyCode.json");
    //通过金融机构查询核心企业
    public static final String URL_AVF_FINANCINGRELCONFIGURE_COMPANY_FINCODE = getStringWithDefault("URL_AVF_FINANCINGRELCONFIGURE_COMPANY_FINCODE",HOST_ADDRESS +"/avf/financingRelConfigure/findCompanyByFinCode.json");
    //通过金融机构，核心企业查询供应商
    public static final String URL_AVF_FINANCINGRELCONFIGURE_SUPPLY_COMPANYFINCODE = getStringWithDefault("URL_AVF_FINANCINGRELCONFIGURE_SUPPLY_COMPANYFINCODE",HOST_ADDRESS +"/avf/financingRelConfigure/findSupplyByFinCodeAndCompanyCode.json");
    //前后端处理状态配置
    public static final String URL_AVF_FRONTEND_CONFIGURE_FINDCONFIGURE = getStringWithDefault("URL_AVF_FRONTEND_CONFIGURE_FINDCONFIGURE",HOST_ADDRESS +"/avf/frontEndConfigure/findConfigure.json");
    //综合统计接口
    public static final String URL_AVF_STATISTICAL = getStringWithDefault("URL_AVF_STATISTICAL",HOST_ADDRESS +"/avf/statistical/verifyQuota.json");


    //核心企业还款
    public static final String URL_AVF_REQUITE_QUOTA = getStringWithDefault("URL_AVF_REQUITE_QUOTA",HOST_ADDRESS +"/avf/requite/repaymentQuota.json");


    //应收应付账款列表
    public static final String URL_AVF_ACCOUNT_RPInfos = getStringWithDefault("URL_AVF_ACCOUNT_RPInfos",HOST_ADDRESS +"/avf/accountsRPInfo/accountsRPInfos.json");
    //获取批次号
    public static final String URL_AVF_ACCOUNT_BATCHNUMBER = getStringWithDefault("URL_AVF_ACCOUNT_BATCHNUMBER",HOST_ADDRESS +"/avf/finInvoiceInfo/batchNumbers.json");
    //根据批次号获取发票列表
    public static final String URL_AVF_ACCOUNT_INVOICES = getStringWithDefault("URL_AVF_ACCOUNT_INVOICES",HOST_ADDRESS +"/avf/finInvoiceInfo/batchInfoList.json");
    //查看应收应付详情
    public static final String URL_AVF_ACCOUNT_INFO = getStringWithDefault("URL_AVF_ACCOUNT_INFO",HOST_ADDRESS +"/avf/accountsRPInfo/findAccountsRPInfoById.json");
    //根据应收应付凭证获取发票
    public static final String URL_AVF_ACCOUNT_VOUCHERNO_INVOICES = getStringWithDefault("URL_AVF_ACCOUNT_VOUCHERNO_INVOICES",HOST_ADDRESS +"/avf/finInvoiceInfo/findByPayableCertificate.json");
    //删除应收应付账款
    public static final String URL_AVF_ACCOUNT_DELETE = getStringWithDefault("URL_AVF_ACCOUNT_DELETE",HOST_ADDRESS +"/avf/accountsRPInfo/deleteAccountRPInfo.json");
    //新增应收应付账款
    public static final String URL_AVF_ACCOUNT_SAVE = getStringWithDefault("URL_AVF_ACCOUNT_SAVE",HOST_ADDRESS +"/avf/accountsRPInfo/doSaveAccountsRPInfo.json");
    //更新应收应付账款
    public static final String URL_AVF_ACCOUNT_UPDATE = getStringWithDefault("URL_AVF_ACCOUNT_UPDATE",HOST_ADDRESS +"/avf/accountsRPInfo/updateAccountsRPInfo.json");
    //根据批次号应收应付账款查找发票
    public static final String URL_AVF_VOUCHER_BATCHNUMBER_INVOICES = getStringWithDefault("URL_AVF_VOUCHER_BATCHNUMBER_INVOICES",HOST_ADDRESS +"/avf/finInvoiceInfo/findByPayableCertificateAndBatchNumber.json");
    //凭证号是否存在
    public static final String URL_AVF_VOUCHER_HASVOUCHER = getStringWithDefault("URL_AVF_VOUCHER_HASVOUCHER", HOST_ADDRESS +"/avf/accountsRPInfo/hasVoucherNo.json");
    //供应商根据核心企业查询账款到期日
    public static final String URL_AVF_SUPPLY_MATURITY_COMPANYCODE = getStringWithDefault("URL_AVF_SUPPLY_MATURITY_COMPANYCODE",HOST_ADDRESS +"/avf/accountsRPInfo/supplyGetMaturityDateByCompanyCode.json");
    //根据多个id查询应收应付凭证
    public static final String URL_AVF_RPINFO_FINDBYIDS = getStringWithDefault("URL_AVF_RPINFO_FINDBYIDS",HOST_ADDRESS +"/avf/accountsRPInfo/findRPInfosByIds.json");
    //根据融资需求编号查询下面的凭证列表
    public static final String URL_AVF_RPINLIST_BY_NEEDSNO = getStringWithDefault("URL_AVF_RPINLIST_BY_NEEDSNO",HOST_ADDRESS +"/avf/financingApprove/financingRPInfos.json");
    //




    //删除融资需求
    public static final String URL_AVF_FINANCING_DEMAND_DELETE = getStringWithDefault("URL_AVF_FINANCING_DEMAND_DELETE",HOST_ADDRESS +"/avf/financingDemand/deleteDemand.json");
    //根据发票抬头id查找发票详情
    public static final String URL_AVF_FIND_INVOICEINFO_INVOICEHEAD_ID = getStringWithDefault("URL_AVF_FIND_INVOICEINFO_INVOICEHEAD_ID",HOST_ADDRESS +"/avf/invoice/findInvoiceInfoByHeadId.json");

    //根据融资需求编号查找应收应付凭证
    public static final String URL_AVF_FIND_RPINFOS_BY_NEEDSNO = getStringWithDefault("URL_AVF_FIND_RPINFOS_BY_NEEDSNO",HOST_ADDRESS +"/avf/accountsRPInfo/findRPInfosByNeedsNo.json");

    //根据融资需求Id查找
    public static final String URL_AVF_FIND_DEMAND_BY_ID = getStringWithDefault("URL_AVF_FIND_DEMAND_BY_ID",HOST_ADDRESS +"/avf/financingDemand/findDemandById.json");
    //更新融资需求
    public static final String URL_AVF_UPDATE_DEMAND = getStringWithDefault("URL_AVF_UPDATE_DEMAND",HOST_ADDRESS +"/avf/financingDemand/updateDemand.json");

    //融资跟踪数据
    public static final String URL_AVF_FINANCING_TRACKING_LIST = getStringWithDefault("URL_AVF_FINANCING_TRACKING_LIST",HOST_ADDRESS +"/avf/financingTracking/financingTrackingIndexList.json");

    //融资跟踪下载数据
    public static final String URL_AVF_FINANCING_TRACKING_DOWNLOAD = getStringWithDefault("URL_AVF_FINANCING_TRACKING_DOWNLOAD",HOST_ADDRESS +"/avf/financingTracking/downLoadTrackingData.json");

}
