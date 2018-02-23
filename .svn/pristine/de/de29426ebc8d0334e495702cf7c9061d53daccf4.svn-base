package com.rcsit.scf.bsp.controller;

import com.alibaba.fastjson.JSONObject;
import com.rcsit.scf.bsp.domain.PageModel;
import com.rcsit.scf.bsp.domain.ResponseModel;
import com.rcsit.scf.bsp.handler.AvfFinancingLoanHandler;
import com.rcsit.scf.bsp.model.avf.AvfAccountsRecTraNotice;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.lang.reflect.InvocationTargetException;

/**
 * 金融机构融资放款(对通知单操作)
 * Created by hmily on 2017/5/11.
 */
@Controller
@RequestMapping("/avf/financingLoan")
public class AvfFinancingLoanController extends BaseController {

    private AvfFinancingLoanHandler avfFinancingLoanHandler = new AvfFinancingLoanHandler();
    /**
     * 融资放款列表
     */
    @RequestMapping("/financingLoanList")
    @ResponseBody
    public Object financingLoanList(@RequestParam(value = "page",defaultValue = "1")int page,
                                    @RequestParam(value = "rows",defaultValue = "25") int rows ,
                                    @CookieValue("token")String token,
                                    @RequestParam(value = "keyWord",defaultValue = "")String keyWord,
                                    @RequestParam(value = "query",defaultValue = "")String query,
                                    @RequestParam(value = "order",defaultValue = "")String order){
        JSONObject financingLoanList = avfFinancingLoanHandler.getFinancingLoanList(page, rows, token,keyWord,query,order);
        return new PageModel<>(financingLoanList);
    }

    /**
     * 融资放款列表页面
     * @return
     */
    @RequestMapping("/financingLoanListPage")
    public String financingLoanListPage(@CookieValue("token")String token, Model model){
        int waitMakeUpQuota = avfFinancingLoanHandler.waitMakeUpQuota(token);
        model.addAttribute("waitMakeUpQuota",waitMakeUpQuota);
        return "/avf/financial/loan_collection";
    }

    /**
     * 查看融资放款页面

     */
    @RequestMapping("/financingLoanDetailsPage")
    //@ResponseBody
    public String financingLoanDetailsPage(@RequestParam("id")String id, @CookieValue("token")String token,Model model){
        AvfAccountsRecTraNotice financingLoanDetails = avfFinancingLoanHandler.getFinancingLoanDetails(id, token);
        model.addAttribute("financingLoanDetails",financingLoanDetails);
        return "/avf/financial/record_detail_next";
    }

    /**
     * 融资放款补录界面
     * @return
     */
    @RequestMapping("/financingLoanMakeUpPage")
    public String financingLoanMakeUpPage(@RequestParam("id")String id, @CookieValue("token")String token,Model model){
        AvfAccountsRecTraNotice financingLoanDetails = avfFinancingLoanHandler.getFinancingLoanDetails(id, token);
        model.addAttribute("financingLoanDetails",financingLoanDetails);
        return  "/avf/financial/record_detail_first";
    }

    /**
     *
     * (融资补录状态)
     * 金融机构放款补录
     */
    @RequestMapping("/financingLoanMakeup")
    @ResponseBody
    public ResponseModel financingLoanMakeup(@RequestParam("id")String id,
                                             @RequestParam("loanMoney")String loanMoney,
                                             @RequestParam("loanDate")String loanDate,
                                             @CookieValue("token")String token) throws InvocationTargetException, IllegalAccessException {
        avfFinancingLoanHandler.doFinancingLoanMakeup(id, loanMoney, loanDate, token);
        return ResponseModel.SUCCESS();
    }


}
