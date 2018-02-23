package com.rcsit.scf.bsp.controller;

import com.rcsit.scf.bsp.domain.ResponseModel;
import com.rcsit.scf.bsp.handler.PbmFinancialInstitutionHandler;
import com.rcsit.scf.bsp.model.pbm.PbmFinancialInstitution;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 * 金融机构
 * Created by hmily on 2017/6/8.
 */
@Controller
@RequestMapping("/pbm/financial")
public class PbmFinancialInstitutionController extends BaseController {

    private PbmFinancialInstitutionHandler pbmInstitutionHandler = new PbmFinancialInstitutionHandler();

    /**
     * 查询金融机构信息
     * @param token
     * @param finCode
     * @return
     */
    @ResponseBody
    @RequestMapping("/finDetail")
    public ResponseModel finDetail(@CookieValue("token") String token, @RequestParam("finCode")String finCode){
        PbmFinancialInstitution financeDetail = pbmInstitutionHandler.financeDetail(finCode, token);
        return ResponseModel.SUCCESS(financeDetail);
    }
}
