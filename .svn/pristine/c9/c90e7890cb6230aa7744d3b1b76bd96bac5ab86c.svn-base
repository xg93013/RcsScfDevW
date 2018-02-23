package com.rcsit.scf.bsp.handler;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.rcsit.scf.bsp.constant.ServerConstant;
import com.rcsit.scf.bsp.exception.RequestErrorException;
import com.rcsit.scf.bsp.model.avf.AvfFrontEndConfigure;
import com.rcsit.scf.bsp.utils.HttpClientUtil;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by hmily on 2017/5/31.
 */
public class AvfFrontEndConfigureHandler {

    public AvfFrontEndConfigure findConfigure(int businessDealStatus,String token){
        Map<String ,Object> param = new HashMap<>();
        param.put("token",token);
        param.put("businessDealStatus",businessDealStatus);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_AVF_FRONTEND_CONFIGURE_FINDCONFIGURE, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return JSONObject.parseObject(jsonObject.getString("data"), new TypeReference<AvfFrontEndConfigure>() {});
    }
}
