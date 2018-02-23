package com.rcsit.scf.bsp.controller;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.rcsit.scf.bsp.handler.PbmVerdorHandler;
import com.rcsit.scf.bsp.model.pbm.PbmVerdor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


/** 供应商
 * Created by chenkai on 2017/5/27.
 */
@Controller
@RequestMapping(value = "/pbm/verdor")
public class PbmVerdorController extends BaseController {

    private PbmVerdorHandler pbmVerdorHandler = new PbmVerdorHandler();

    /**
     * 供应商详情
     * @param supplyCode
     * @return
     */
    @RequestMapping(value = "/verdorDetail")
    public String verdorDetail(Model model, @RequestParam("supplyCode")String supplyCode, @CookieValue("token")String token){
        String data = pbmVerdorHandler.doVerdorDetail(supplyCode,token);
        PbmVerdor pv = JSONObject.parseObject(data, new TypeReference<PbmVerdor>(){});
        model.addAttribute("verdor",pv);
        return "avf/supplier/verdor_detail";
    }
}