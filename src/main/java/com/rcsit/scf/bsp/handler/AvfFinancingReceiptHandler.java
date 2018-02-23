package com.rcsit.scf.bsp.handler;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.rcsit.scf.bsp.constant.ServerConstant;
import com.rcsit.scf.bsp.model.avf.AvfAccountsRecTraNotice;
import com.rcsit.scf.bsp.utils.HttpClientUtil;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by hmily on 2017/5/27.
 */
public class AvfFinancingReceiptHandler {

    public JSONObject getFinancingReceiptList(int page,int rows ,String token,String keyWord,String query,String order){
        Map<String,Object> param = new HashMap<>();
        param.put("page",page);
        param.put("rows",rows);
        param.put("token",token);
        param.put("keyWord",keyWord);
        param.put("query",query);
        param.put("order",order);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_AVF_FINANCING_RECIEPT_RECIPTLIST, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return JSONObject.parseObject(jsonObject.getString("data"));
    }

    public AvfAccountsRecTraNotice getFinancingReceiptDetails(String id ,String token){
        Map<String,String> param = new HashMap<>();
        param.put("id",id);
        param.put("token",token);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_AVF_FINANCING_RECIEPT_RECIPTDETAIL, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return JSONObject.parseObject(jsonObject.getString("data"),new TypeReference<AvfAccountsRecTraNotice>(){});
    }

    public void doFinancingReceiptMakeup(String id ,String receivablesMoney,String receivablesDate,String token ){
        Map<String,String> param = new HashMap<>();
        param.put("id",id);
        param.put("token",token);
        param.put("receivablesMoney",receivablesMoney);
        param.put("receivablesDate",receivablesDate);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_AVF_FINANCING_RECIEPT_MAKEUP, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
    }

    public int waitMakeUpQuota(String token){
        String result = HttpClientUtil.httpGets(ServerConstant.URL_AVF_NOTICE_RECIEPT_MAKEUPQUOTA, "token=" + token);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return jsonObject.getInteger("data");
    }

    public void closeReceipt(String token,String id){
        Map<String ,String> param = new HashMap<>();
        param.put("token",token);
        param.put("id",id);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_AVF_FINANCING_RECIEPT_CLOSE, param);
        HttpClientUtil.isOk(JSONObject.parseObject(result));
    }
}
