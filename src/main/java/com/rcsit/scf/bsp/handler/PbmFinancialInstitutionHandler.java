package com.rcsit.scf.bsp.handler;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.rcsit.scf.bsp.constant.ServerConstant;
import com.rcsit.scf.bsp.exception.RequestErrorException;
import com.rcsit.scf.bsp.model.pbm.PbmFinancialInstitution;
import com.rcsit.scf.bsp.utils.HttpClientUtil;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by hmily on 2017/6/8.
 */
public class PbmFinancialInstitutionHandler {

    public PbmFinancialInstitution financeDetail(String finCode , String token){
        Map<String ,String> param = new HashMap<>();
        param.put("token",token);
        param.put("finCode",finCode);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_PBM_FINANCE_DETAIL, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return JSONObject.parseObject(jsonObject.getString("data"),new TypeReference<PbmFinancialInstitution>(){});
    }
}