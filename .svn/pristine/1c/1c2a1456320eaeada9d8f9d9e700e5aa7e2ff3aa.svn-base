package com.rcsit.scf.bsp.controller;

import com.rcsit.scf.bsp.domain.ResponseModel;
import com.rcsit.scf.bsp.handler.AvfFrontEndConfigureHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by hmily on 2017/5/18.
 */
@Controller
@RequestMapping(value = "/avf/frontEndConfigure")
public class AvfFrontEndConfigureController extends BaseController {

    private AvfFrontEndConfigureHandler avfFrontEndConfigureHandler = new AvfFrontEndConfigureHandler();

    @ResponseBody
    @RequestMapping(value = "/findConfigure")
    public ResponseModel findConfigure(@RequestParam("businessDealStatus")int businessDealStatus, @CookieValue("token")String token){
        avfFrontEndConfigureHandler.findConfigure(businessDealStatus, token);
        return ResponseModel.SUCCESS();
    }
}
