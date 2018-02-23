package com.rcsit.scf.bsp.controller;


import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.rcsit.scf.bsp.domain.PageModel;
import com.rcsit.scf.bsp.domain.ResponseModel;
import com.rcsit.scf.bsp.handler.*;
import com.rcsit.scf.bsp.model.avf.AvfAccountsRPInfo;
import com.rcsit.scf.bsp.model.avf.AvfFinancingDemandHead;
import com.rcsit.scf.bsp.model.avf.AvfFinancingDemandInfo;
import com.rcsit.scf.bsp.model.pbm.PbmCompany;
import com.rcsit.scf.bsp.model.pbm.PbmFinancialInstitution;
import com.rcsit.scf.bsp.model.pbm.PbmVerdor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.util.List;


/**
 * 金融机构融资审批(融资需求)
 * Created by hmily on 2017/5/10.
 */
@Controller
@RequestMapping(value = "/avf/financingApprove")
public class AvfFinancingApproveController extends BaseController {

    private AvfFinancingApproveHandler avfFinancingApproveHandler = new AvfFinancingApproveHandler();
    private PbmVerdorHandler pbmVerdorHandler = new PbmVerdorHandler();
    private PbmFinancialInstitutionHandler pbmFinancialInstitutionHandler = new PbmFinancialInstitutionHandler();
    private PbmCompanyHandler pbmCompanyHandler = new PbmCompanyHandler();
    private AvfAccountRPInfoHandler avfAccountRPInfoHandler = new AvfAccountRPInfoHandler();

    /**
     * 金融机构融资审批列表数据（已发送至中征平台）
     *
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/financingApproveList")
    public Object financingApproveList(@RequestParam(value = "page", defaultValue = "1") int page,
                                              @RequestParam(value = "rows", defaultValue = "25") int rows,
                                              @CookieValue("token") String token,
                                              @RequestParam(name = "keyWord" ,defaultValue = "")String keyWord,
                                              @RequestParam(name = "query" ,defaultValue = "")String query,
                                              @RequestParam(name = "order",defaultValue = "")String order) {
        JSONObject jsonObject = avfFinancingApproveHandler.financingApproveList(page, rows, token,keyWord,query,order);
        return new PageModel<>(jsonObject);
    }

    /**
     * 金融机构审批页面
     * @return
     */
    @RequestMapping(value = "/financingApproveListPage")
    public String financingApproveListPage(Model model,@CookieValue("token")String token){
        model.addAttribute("waitDealQuota",avfFinancingApproveHandler.waitDealQuota(token));
        return "/avf/financial/financial_approval";
    }

    /**
     * 查看融资申请抬头详情
     *
     * @param id
     * @return
     */
/*    @ResponseBody
    @RequestMapping(value = "/financingApproveHeadDetails")
    public ResponseModel financingApproveHeadDetails(@RequestParam("id") String id, @CookieValue("token") String token,Model model) {
        AvfFinancingDemandHead financingApproveHeadDetails = avfFinancingApproveHandler.getFinancingApproveHeadDetails(id, token);
        String verdorDetail = pbmVerdorHandler.doVerdorDetail(financingApproveHeadDetails.getSupplyCode(), token);
        PbmVerdor pbmVerdor = JSONObject.parseObject(verdorDetail, new TypeReference<PbmVerdor>() {
        });
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("pbmVerdor",pbmVerdor);
        jsonObject.put("details",financingApproveHeadDetails);

        return ResponseModel.SUCCESS(jsonObject);
    }*/

    /**
     *  融资需求抬头详情页面
     * @return
     */
    @RequestMapping(value = "/financingApproveHeadDetailsPage")
    public String financingApproveHeadDetailsPage(@RequestParam("id") String id, @CookieValue("token") String token,Model model){
        AvfFinancingDemandHead financingApproveHeadDetails = avfFinancingApproveHandler.getFinancingApproveHeadDetails(id, token);
        PbmFinancialInstitution financeDetail = pbmFinancialInstitutionHandler.financeDetail(financingApproveHeadDetails.getFinInsCode(), token);
        String companyDetail = pbmCompanyHandler.doCompanyDetail(financingApproveHeadDetails.getCompanyCode(),token);
        PbmCompany pbmCompany = JSONObject.parseObject(companyDetail, new TypeReference<PbmCompany>() {
        });
        String verdorDetail = pbmVerdorHandler.doVerdorDetail(financingApproveHeadDetails.getSupplyCode(), token);
        PbmVerdor pbmVerdor = JSONObject.parseObject(verdorDetail, new TypeReference<PbmVerdor>() {
        });

        List<AvfAccountsRPInfo> avfAccountsRPInfos = this.avfAccountRPInfoHandler.findRPInfosByNeedsNo(token, financingApproveHeadDetails.getFinancingNeedsNo());
        BigDecimal varMoney = new BigDecimal(0);
        for (AvfAccountsRPInfo avfAccountsRPInfo: avfAccountsRPInfos)
            varMoney=varMoney.add(avfAccountsRPInfo.getRecPayMoney());
        financingApproveHeadDetails.setInvoiceTotalNumber(avfAccountsRPInfos.size());
        financingApproveHeadDetails.setInvoiceTotalMoney(varMoney);
        model.addAttribute("pbmVerdor",pbmVerdor);
        model.addAttribute("pbmCompany",pbmCompany);
        model.addAttribute("financingApproveHeadDetails",financingApproveHeadDetails);
        model.addAttribute("financeDetail",financeDetail);
        return "/avf/financial/finance_detail";
    }

    /**
     * 融资拒绝页面
     * @param id
     * @param token
     * @param model
     * @return
     */
    @RequestMapping("/financingDemandRejectPage")
    public String financingDemandRejectPage(@RequestParam("id") String id,
                                            @CookieValue("token") String token,
                                            Model model){
        AvfFinancingDemandHead financingApproveHeadDetails = avfFinancingApproveHandler.getFinancingApproveHeadDetails(id, token);
        String verdorDetail = pbmVerdorHandler.doVerdorDetail(financingApproveHeadDetails.getSupplyCode(), token);
        PbmVerdor pbmVerdor = JSONObject.parseObject(verdorDetail, new TypeReference<PbmVerdor>() {
        });
        List<AvfAccountsRPInfo> avfAccountsRPInfos = this.avfAccountRPInfoHandler.findRPInfosByNeedsNo(token, financingApproveHeadDetails.getFinancingNeedsNo());
        BigDecimal varMoney = new BigDecimal(0);
        for (AvfAccountsRPInfo avfAccountsRPInfo: avfAccountsRPInfos)
            varMoney=varMoney.add(avfAccountsRPInfo.getRecPayMoney());
        financingApproveHeadDetails.setInvoiceTotalNumber(avfAccountsRPInfos.size());
        financingApproveHeadDetails.setInvoiceTotalMoney(varMoney);
        model.addAttribute("financingApproveHeadDetails",financingApproveHeadDetails);
        model.addAttribute("pbmVerdor",pbmVerdor);
        return "/avf/financial/refuse_finance";
    }

    /**
     * 融资需求-已拒绝
     *
     * @param id
     * @return
     * @throws InvocationTargetException
     * @throws IllegalAccessException
     */
    //@ResponseBody
    @RequestMapping(value = "/doFinancingDemandRejectPage")
    public String doFinancingDemandRejectPage(@RequestParam("id") String id,
                                          @CookieValue("token") String token,
                                          Model model) throws InvocationTargetException, IllegalAccessException {
        AvfFinancingDemandHead financingApproveHeadDetails = avfFinancingApproveHandler.getFinancingApproveHeadDetails(id, token);
        String verdorDetail = pbmVerdorHandler.doVerdorDetail(financingApproveHeadDetails.getSupplyCode(), token);
        PbmVerdor pbmVerdor = JSONObject.parseObject(verdorDetail, new TypeReference<PbmVerdor>() {
        });
        model.addAttribute("pbmVerdor",pbmVerdor);
        model.addAttribute("financingApproveHeadDetails",financingApproveHeadDetails);
        return "/avf/financial/refused";
    }


    /**
     * 查看融资 凭证
     * @param id
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/financingRPInfos")
    public Object financingRPInfos(@CookieValue("token")String token ,@RequestParam("id")String id){
       return this.avfFinancingApproveHandler.financingRPInfos(token, id);
    }

    /**
     * 拒绝融资申请操作
     * @param id
     * @param token
     * @return
     */
    @ResponseBody
    @RequestMapping("/doFinancingDemandReject")
    public ResponseModel doFinancingDemandReject(@RequestParam("id") String id,@CookieValue("token") String token){
        avfFinancingApproveHandler.doFinancingDemandReject(id, token);
        return ResponseModel.SUCCESS();
    }

    /**
     * 查看融资申请详情
     *
     * @param id
     * @return
     */
    //@ResponseBody
    @RequestMapping(value = "/financingApproveInfoDetails")
    public String financingApproveInfoDetails(@RequestParam("id") String id, @CookieValue("token") String token,Model model) {
        List<AvfFinancingDemandInfo> financingApproveInfoDetails = avfFinancingApproveHandler.getFinancingApproveInfoDetails(id, token);
        model.addAttribute("detail",financingApproveInfoDetails);
        return "test";
    }


    /**
     * 查看发票详情
     *
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/financingInvoiceDetail")
    public Object financingInvoiceDetail(@RequestParam("id") String id, @CookieValue("token") String token) {
        JSONObject jsonObject = avfFinancingApproveHandler.getFinancingInvoiceDetail(id, token);
        return new PageModel<>(jsonObject);
    }
}
