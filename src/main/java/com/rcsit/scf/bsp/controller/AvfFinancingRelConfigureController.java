package com.rcsit.scf.bsp.controller;

import com.rcsit.scf.bsp.domain.ResponseModel;
import com.rcsit.scf.bsp.handler.AvfFinancingRelConfigureHandler;
import com.rcsit.scf.bsp.model.avf.AvfFinancingRelConfigure;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 融资关系
 * Created by hmily on 2017/5/18.
 */
@Controller
@RequestMapping(value = "/avf/financingRelConfigure")
public class AvfFinancingRelConfigureController extends BaseController {


    private AvfFinancingRelConfigureHandler avfFinancingRelConfigureHandler = new AvfFinancingRelConfigureHandler();

    /**
     * 供应商查询关联的核心企业
     * @param token
     * @return
     */

    @ResponseBody
    @RequestMapping(value = "/findRelBySupplyCode")
    public Object findRelBySupplyCode(@CookieValue("token")String token,Model model){
        List<AvfFinancingRelConfigure> relConfigures = avfFinancingRelConfigureHandler.findRelBySupplyCode(token);
        return ResponseModel.SUCCESS(relConfigures);
    }


    /**
     * 供应商查询金融机构
     * @param token
     * @param companyCode
     * @return
     */

    @ResponseBody
    @RequestMapping(value = "/findRelByCompanyCodeAndSupplyCode")
    public Object  findRelByCompanyCodeAndSupplyCode(@CookieValue("token")String token, @RequestParam("companyCode")String companyCode,Model model){
        List<AvfFinancingRelConfigure> relConfigures = avfFinancingRelConfigureHandler.findRelByCompanyCodeAndSupplyCode(token, companyCode);
        return ResponseModel.SUCCESS(relConfigures);
    }

    /**
     * 根据核心企业查询供应商
     * @param
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/findRelByCompanyCode")
    public Object findRelByCompanyCode(@CookieValue("token")String token){
        List<AvfFinancingRelConfigure> relConfigures = avfFinancingRelConfigureHandler.findRelByCompanyCode(token);
        return ResponseModel.SUCCESS(relConfigures);
    }

    /**
     * 根据核心企业查询金融机构
     * @param
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/findFinByCompanyCode")
    public Object findFinByCompanyCode(@CookieValue("token")String token){
        List<AvfFinancingRelConfigure> relConfigures = avfFinancingRelConfigureHandler.findFinByCompanyCode(token);
        return ResponseModel.SUCCESS(relConfigures);
    }


    /**
     * 根据金融机构查询核心企业
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/findCompanyByFinCode")
    public Object findCompanyByFinCode(@CookieValue("token")String token){
        List<AvfFinancingRelConfigure> relConfigures = this.avfFinancingRelConfigureHandler.findCompanyByFinCode(token);
        return  ResponseModel.SUCCESS(relConfigures);
    }


    /**
     * 根据金融机构查询供应商
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/findSupplyByFinCodeAndCompanyCode")
    public Object findSupplyByFinCodeAndCompanyCode(@CookieValue("token")String token,@RequestParam("companyCode")String companyCode) {
        List<AvfFinancingRelConfigure> relConfigures = this.avfFinancingRelConfigureHandler.findSupplyByFinCodeAndCompanyCode(token, companyCode);
        return ResponseModel.SUCCESS(relConfigures);
    }
}