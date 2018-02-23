package com.rcsit.scf.bsp.handler;


import com.alibaba.fastjson.JSONObject;
import com.rcsit.scf.bsp.constant.ServerConstant;
import com.rcsit.scf.bsp.exception.RequestErrorException;
import com.rcsit.scf.bsp.utils.HttpClientUtil;

/**
 * Created by chenkai on 2017/5/27.
 */
public class PbmCompanyHandler {


    public String doCompanyDetail(String companyCode,String token) {
        String result = HttpClientUtil.httpGets(ServerConstant.URL_PBM_COMPANY_DETAIL, "companyCode="+companyCode+"&token="+token);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return jsonObject.getString("data");
    }
}
