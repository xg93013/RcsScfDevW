package com.rcsit.scf.bsp.controller;

import com.alibaba.fastjson.JSONObject;
import com.rcsit.scf.bsp.domain.ResponseModel;
import com.rcsit.scf.bsp.handler.AvfFinancingApproveHandler;
import com.rcsit.scf.bsp.handler.AvfFinancingLoanHandler;
import com.rcsit.scf.bsp.handler.AvfFinancingReceiptHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 融资流程
 * Created by hmily on 2017/6/16.
 */
@Controller
@RequestMapping("/avf/flow")
public class AvfFlowController {

    /**
     * 融资审批流程
     * @return
     */
    @RequestMapping("/financingFlow")
    @ResponseBody
    public Object financingFlow(@CookieValue("token")String token){
        //收款待补录
        int receiptQuato = new AvfFinancingReceiptHandler().waitMakeUpQuota(token);
        //放款待补录
        int loanQuato = new AvfFinancingLoanHandler().waitMakeUpQuota(token);
        //融资待审批
        int approveQuota = new AvfFinancingApproveHandler().waitDealQuota(token);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("receiptQuato", receiptQuato);
        jsonObject.put("loanQuato", loanQuato);
        jsonObject.put("approveQuota", approveQuota);
        return ResponseModel.SUCCESS(jsonObject);
    }
}
