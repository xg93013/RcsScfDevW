package com.rcsit.scf.bsp.handler;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.rcsit.scf.bsp.constant.ServerConstant;
import com.rcsit.scf.bsp.model.avf.AvfAccountsRPInfo;
import com.rcsit.scf.bsp.model.avf.AvfFinInvoiceInfo;
import com.rcsit.scf.bsp.model.avf.AvfFinancingDemandHead;
import com.rcsit.scf.bsp.utils.HttpClientUtil;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by chenkai on 2017/5/26.
 */

public class AvfFinancingDemandHandler {

    public JSONObject doDemandList(String token , int page,int rows,String keyWord,String query,String order){
        /*String param="token="+token+"&page="+page+"&rows="+rows+"&keyWord="+keyWord+"&query="+query+"&order="+order;*/
        Map<String , Object> param = new HashMap<>();
        param.put("token",token);
        param.put("page",page);
        param.put("rows",rows);
        param.put("keyWord",keyWord);
        param.put("query",query);
        param.put("order",order);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_AVF_DEMAND_LIST, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return jsonObject.getJSONObject("data");
    }

    public AvfFinancingDemandHead doDemandProgress(String token,String id) {
        String result = HttpClientUtil.httpGets(ServerConstant.URL_AVF_DEMAND_PROGRESS, "token="+token+"&id="+id);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        AvfFinancingDemandHead head = JSONObject.parseObject(jsonObject.getString("data"), new TypeReference<AvfFinancingDemandHead>(){});
        return head;
    }

    public void doSaveFinancingDemand(String token, String demandHead, String infos){
        Map<String,String> param = new HashMap<>();
        param.put("token",token);
        param.put("head",demandHead);
        param.put("infos",infos);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_AVF_SAVE_DEMAND, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
    }

    public void doMaintainExtendMoney(String token, String id, boolean isPast, String intentionFmoney, String intentionFterm) {
        Map<String ,String> param = new HashMap<>();
        param.put("token",token);
        param.put("id",id);
        param.put("isPast",String.valueOf(isPast));
        param.put("intentionFmoney",intentionFmoney);
        param.put("intentionFterm",intentionFterm);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_AVF_EXTEND_MONEY, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
    }

    public AvfFinancingDemandHead findDemandHeadByNeedsNo(String token ,String financingNeedsNo){
        Map<String,String> param = new HashMap<>();
        param.put("token",token);
        param.put("financingNeedsNo",financingNeedsNo);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_AVF_FINANCING_FINDFINANCING_BYNEEDSID, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return JSONObject.parseObject(jsonObject.getString("data"),new TypeReference<AvfFinancingDemandHead>(){});
    }

    public JSONObject getDemandVerifyQuota(String token) {
        String result = HttpClientUtil.httpGets(ServerConstant.URL_AVF_DEMAND_VERIFY_QUOTA, "token="+token);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return jsonObject.getJSONObject("data");
    }

    public List<AvfFinInvoiceInfo> doInvoiceInfoIds(String token, String ids) {
        String param="token="+token+"&ids="+ids;
        String result = HttpClientUtil.httpGets(ServerConstant.URL_AVF_INFO_IDS, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return JSONObject.parseObject(jsonObject.getString("data"),new TypeReference<List<AvfFinInvoiceInfo>>(){});
    }

    public JSONObject doApplyInfoList(String token, String companyCode, int page, int rows) {
        String param="token="+token+"&companyCode="+companyCode+"&page="+page+"&rows="+rows;
        String result = HttpClientUtil.httpGets(ServerConstant.URL_AVF_APPLY_INFO_LIST, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return jsonObject.getJSONObject("data");
    }

    public List<AvfAccountsRPInfo> doRPInfoIds(String token, String ids) {
        String param = "token="+token+"&ids="+ids;
        String result = HttpClientUtil.httpGets(ServerConstant.URL_AVF_RPINFO_FINDBYIDS, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return JSONObject.parseObject(jsonObject.getString("data"),new TypeReference<List<AvfAccountsRPInfo>>(){});
    }

    public void deleteDemand(String token, String id) {
        String result = HttpClientUtil.httpGets(ServerConstant.URL_AVF_FINANCING_DEMAND_DELETE, "token=" + token + "&id=" + id);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
    }

    public AvfFinancingDemandHead findDemandHeadById(String token, String id) {
        String result = HttpClientUtil.httpGets(ServerConstant.URL_AVF_FIND_DEMAND_BY_ID, "token=" + token + "&id=" + id);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return JSONObject.parseObject(jsonObject.getString("data"),AvfFinancingDemandHead.class);
    }

    public void updateDemand(String token, String demandHead, String rpIds) {
        Map<String,String> param = new HashMap<>();
        param.put("token",token);
        param.put("demandHead",demandHead);
        param.put("rpIds",rpIds);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_AVF_UPDATE_DEMAND, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
    }
}
