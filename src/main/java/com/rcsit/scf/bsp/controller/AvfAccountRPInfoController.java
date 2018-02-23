package com.rcsit.scf.bsp.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.rcsit.scf.bsp.domain.PageModel;
import com.rcsit.scf.bsp.domain.ResponseModel;
import com.rcsit.scf.bsp.exception.DataErrorException;
import com.rcsit.scf.bsp.handler.AvfAccountRPInfoHandler;
import com.rcsit.scf.bsp.model.avf.AvfAccountsRPInfo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Optional;

/**
 * 应收应付账款
 * Created by hmily on 2017/7/20.
 */
@Controller
@RequestMapping(value = "/avf/accountRPInfo")
public class AvfAccountRPInfoController extends BaseController {

    private AvfAccountRPInfoHandler handler = new AvfAccountRPInfoHandler();

    /**
     * 应收应付账款页面
     * @param
     * @return
     */
    @RequestMapping(value = "/accountRPInfoPage")
    public String accountRPInfoPage(){
        return "avf/enterprise/rec_pay_money";
    }


    /**
     * 应收应付账款数据
     * @param page
     * @param rows
     * @param token
     * @param keyWord
     * @param query
     * @return
     */
    @RequestMapping(value = "/accountRPInfoList")
    @ResponseBody
    public Object accountRPInfoList(@RequestParam(value = "page",defaultValue = "1")int page,
                                    @RequestParam(value = "rows",defaultValue = "25") int rows ,
                                    @CookieValue("token")String token,
                                    @RequestParam(value = "keyWord",defaultValue = "")String keyWord,
                                    @RequestParam(value = "query",defaultValue = "")String query,
                                    @RequestParam(value = "order",defaultValue = "")String order) {
        JSONObject jsonObject = this.handler.findAccountsRPInfos(page, rows, token, keyWord, query, order);
        return new PageModel<>(jsonObject);
    }

    /**
     * 查看应收应付账款数据
     * @param token
     * @param id
     * @param model
     * @return
     */
    @RequestMapping(value = "/viewAccountRPInfoPage")
    public String viewAccountRPInfoPage(@CookieValue("token")String token,@RequestParam("id") String id, Model model){
        AvfAccountsRPInfo accountsRPInfo = this.handler.findById(token, id);
        Optional.ofNullable(accountsRPInfo).orElseThrow(DataErrorException::new);
        //List<AvfFinInvoiceInfo> avfFinInvoiceInfos = this.handler.getInvoiceListByVoucherNo(token, accountsRPInfo.getVoucherNo());
        model.addAttribute("accountsRPInfo",accountsRPInfo);
        // model.addAttribute("avfFinInvoiceInfos",avfFinInvoiceInfos);
        return "avf/enterprise/view_rec_pay_money";
    }

    /**
     * 添加应收应付账款页面
     * @return
     */
    @RequestMapping(value = "/addAccountRPInfoPage")
    public String addAccountRPInfoPage(){
       /* Object batchNumbers = this.handler.getBatchNumbers(token);
        model.addAttribute("batchNumbers",batchNumbers);*/
        return "avf/enterprise/add_rec_pay_money";
    }

    @ResponseBody
    @RequestMapping(value = "/findBatchNumbers")
    public ResponseModel findBatchNumbers(@CookieValue("token")String token,@RequestParam("companyCode")String companyCode){
        return ResponseModel.SUCCESS(this.handler.getBatchNumbers(token,companyCode));
    }

    /**
     * 根据批次号获取发票列表
     * type 操作类型，add 新增（取出可录入发票），edit 编辑（取出所有发票）
     * @param token
     * @param batchNumber
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/findInvoicesByBatchNumber")
    public Object findInvoicesByBatchNumber(@CookieValue("token")String token,
                                                   @RequestParam(value = "type",defaultValue = "add")String type,
                                                   @RequestParam(value = "voucherNo",defaultValue = "")String voucherNo,
                                                   @RequestParam("batchNumber")String batchNumber,
                                                   @RequestParam(value = "page",defaultValue = "1")int page,
                                                   @RequestParam(value = "rows",defaultValue = "25") int rows){
        JSONObject jsonObject = this.handler.getInvoiceListByBatch(token,type,voucherNo, batchNumber, page, rows);
        return new PageModel<>(jsonObject);
    }

    /**
     * 根据应收应付凭证号查询发票
     * @param token
     * @param voucherNo
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/findInvoicesByPayableCertificate")
    public Object findInvoicesByPayableCertificate(@CookieValue("token")String token,
                                                          @RequestParam("voucherNo")String voucherNo,
                                                          @RequestParam(value = "page",defaultValue = "1")int page,
                                                          @RequestParam(value = "rows",defaultValue = "25") int rows){
        JSONObject jsonObject = this.handler.getInvoiceListByVoucherNo(token, voucherNo, page, rows);
        return new PageModel<>(jsonObject);
    }

    /**
     * 根据批次号应收应收应付凭证号查找
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/findInvoicesByPayableCertificateAndBatchNumber")
    public Object findInvoicesByPayableCertificateAndBatchNumber(@CookieValue("token")String token,
                                                                        @RequestParam("voucherNo")String voucherNo,
                                                                        @RequestParam("batchNumber")String batchNumber,
                                                                        @RequestParam(value = "page",defaultValue = "1")int page,
                                                                        @RequestParam(value = "rows",defaultValue = "2147483646") int rows){
        JSONObject jsonObject = this.handler.findByPayableCertificateAndBatchNumber(token, voucherNo, batchNumber, page, rows);
        return new PageModel<>(jsonObject);
    }

    /**
     * 添加应收应付账款页面
     * @return
     */
    @RequestMapping(value = "/editAccountRPInfoPage")
    public String editAccountRPInfoPage(@CookieValue("token")String token,@RequestParam("id") String id, Model model){
        AvfAccountsRPInfo accountsRPInfo = this.handler.findById(token, id);
        Optional.ofNullable(accountsRPInfo).orElseThrow(DataErrorException::new);
        model.addAttribute("accountsRPInfo",accountsRPInfo);
        return "avf/enterprise/edit_rec_pay_money";
    }

    /**
     * 新增应收应付账款
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/saveAccountRPInfo")
    public ResponseModel saveAccountRPInfo(@CookieValue("token")String token,@RequestParam(value = "invoiceIds",defaultValue = "")String ids,  @RequestParam("RPInfo")String avfAccountsRPInfo) throws Exception {
        this.handler.saveAccountRPInfo(token, ids, avfAccountsRPInfo);
        return ResponseModel.SUCCESS();
    }

    /**
     * 新增应收应付账款
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/updateAccountRPInfo")
    public ResponseModel updateAccountRPInfo(@CookieValue("token")String token,@RequestParam(value = "invoiceIds",defaultValue = "")String ids, @RequestParam("RPInfo")String avfAccountsRPInfo) throws Exception {
        this.handler.updateAccountRPInfo(token, ids, avfAccountsRPInfo);
        return ResponseModel.SUCCESS();
    }
    /**
     * 删除应收应付凭证
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/deleteAccountRPInfo")
    public ResponseModel deleteAccountRPInfo(@CookieValue("token")String token,@RequestParam("id")String id){
        this.handler.deleteAccountsRPInfoById(token, id);
        return ResponseModel.SUCCESS();
    }

    /**
     * 是否存在凭证号
     * @param token
     * @param voucherNo
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/hasVoucherNo")
    public ResponseModel hasVoucherNo(@CookieValue("token")String token,@RequestParam("payableCertificate")String voucherNo){
        return ResponseModel.SUCCESS(this.handler.hasVoucherNo(token,voucherNo)) ;
    }

    /**
     * 供应商根据核心企业查询账款到期日
     * @param token
     * @param companyCode
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/supplyGetMaturityDateByCompanyCode")
    public ResponseModel supplyGetMaturityDateByCompanyCode(@CookieValue("token")String token,@RequestParam("companyCode")String companyCode){
        JSONArray jsonArray = this.handler.supplyGetMaturityDateByCompanyCode(token, companyCode);
        return ResponseModel.SUCCESS(jsonArray);
    }
}
