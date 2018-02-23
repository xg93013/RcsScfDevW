package com.rcsit.scf.bsp.controller;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.rcsit.scf.bsp.domain.PageModel;
import com.rcsit.scf.bsp.domain.ResponseModel;
import com.rcsit.scf.bsp.exception.RequestErrorException;
import com.rcsit.scf.bsp.handler.AvfFinancingDemandHandler;
import com.rcsit.scf.bsp.handler.AvfStatisticalHandler;
import com.rcsit.scf.bsp.handler.PbmVerdorHandler;
import com.rcsit.scf.bsp.model.avf.AvfFinancingDemandHead;
import com.rcsit.scf.bsp.model.avf.bo.AvfFinancingDemandHeadBo;
import com.rcsit.scf.bsp.model.pbm.PbmVerdor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.lang.reflect.InvocationTargetException;

/** 标签页统计数据
 * Created by chenkai on 2017/5/9.
 */
@Controller
@RequestMapping(value = "/avf/statistical")
public class AvfStatisticalController extends BaseController {

    private AvfStatisticalHandler avfStatisticalHandler = new AvfStatisticalHandler();

    /**
     * 统计标签页数据
     * @param
     */
    @ResponseBody
    @RequestMapping(value = "/verifyQuota")
    public Object toDemandPage(@CookieValue("token")String token){
        return avfStatisticalHandler.findStatisticalVerifyQuota(token);
    }
}
