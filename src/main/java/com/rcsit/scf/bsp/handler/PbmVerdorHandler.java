package com.rcsit.scf.bsp.handler;


import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.rcsit.scf.bsp.constant.ServerConstant;
import com.rcsit.scf.bsp.exception.RequestErrorException;
import com.rcsit.scf.bsp.model.pbm.PbmVerdor;
import com.rcsit.scf.bsp.utils.HttpClientUtil;

/**
 * Created by chenkai on 2017/5/27.
 */
public class PbmVerdorHandler {


    public String doVerdorDetail(String supplyCode,String token) {
        String result = HttpClientUtil.httpGets(ServerConstant.URL_PBM_VERDOR_DETAIL, "supplyCode="+supplyCode+"&token="+token);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return jsonObject.getString("data");
    }
    public PbmVerdor doVerdor(String token) {
        String result = HttpClientUtil.httpGets(ServerConstant.URL_PBM_VERDOR_INFO, "token="+token);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return JSONObject.parseObject(jsonObject.getString("data"), new TypeReference<PbmVerdor>(){});
    }
}
