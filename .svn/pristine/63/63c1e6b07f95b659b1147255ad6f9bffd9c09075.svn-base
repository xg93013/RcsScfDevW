package com.rcsit.scf.bsp.handler;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.rcsit.scf.bsp.constant.ServerConstant;
import com.rcsit.scf.bsp.model.avf.AvfFinInvoiceInfo;
import com.rcsit.scf.bsp.model.avf.AvfFinancingDemandHead;
import com.rcsit.scf.bsp.model.avf.bo.AvfFinancingDemandHeadBo;
import com.rcsit.scf.bsp.utils.HttpClientUtil;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by chenkai on 2017/5/26.
 */

public class AvfStatisticalHandler {

    public JSONObject findStatisticalVerifyQuota(String token) {
        String result = HttpClientUtil.httpGets(ServerConstant.URL_AVF_STATISTICAL, "token="+token);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return jsonObject.getJSONObject("data");
    }
}
