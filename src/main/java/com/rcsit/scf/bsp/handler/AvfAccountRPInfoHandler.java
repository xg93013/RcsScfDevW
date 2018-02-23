package com.rcsit.scf.bsp.handler;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.rcsit.scf.bsp.constant.ServerConstant;
import com.rcsit.scf.bsp.model.avf.AvfAccountsRPInfo;
import com.rcsit.scf.bsp.utils.HttpClientUtil;
import org.apache.commons.collections.map.HashedMap;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 应收应付账款凭证
 * Created by hmily on 2017/7/24.
 */
public class AvfAccountRPInfoHandler {

    /**
     *  应收应付账款列表
     * @param page
     * @param rows
     * @param token
     * @param keyWord
     * @param query
     * @param order
     * @return
     */
    public JSONObject findAccountsRPInfos(int page, int rows, String token,String keyWord,String query, String order){
        Map<String,Object> param = new HashedMap();
        param.put("page",page);
        param.put("rows",rows);
        param.put("token",token);
        param.put("keyWord",keyWord);
        param.put("query",query);
        param.put("order",order);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_AVF_ACCOUNT_RPInfos, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return JSONObject.parseObject(jsonObject.getString("data"));
    }

    /**
     * 获取批次号
     * @param token
     * @return
     */
    public Object getBatchNumbers(String token,String companyCode){
        String param="token="+token+"&companyCode="+companyCode;
        String result = HttpClientUtil.httpGets(ServerConstant.URL_AVF_ACCOUNT_BATCHNUMBER, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return jsonObject.getJSONArray("data");
    }

    /**
     * 根据批次号获取发票数据
     * @param token
     * @param batchNumber
     * @return
     */
    public JSONObject getInvoiceListByBatch(String token,String type,String voucherNo, String batchNumber,int page,int rows){
        String param = "token="+token+"&batchNumber="+batchNumber+"&page="+page+"&rows="+rows+"&type="+type+"&voucherNo="+voucherNo;
        String result = HttpClientUtil.httpGets(ServerConstant.URL_AVF_ACCOUNT_INVOICES, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return JSONObject.parseObject(jsonObject.getString("data"));
    }

    public AvfAccountsRPInfo findById(String token,String id){
        String param = "token="+token+"&id="+id;
        String result = HttpClientUtil.httpGets(ServerConstant.URL_AVF_ACCOUNT_INFO, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return JSONObject.parseObject(jsonObject.getString("data"),new TypeReference<AvfAccountsRPInfo>(){});
    }

    /**
     * 根据应收应付账款凭证获取发票数据
     * @param token
     * @param voucherNo
     * @return
     */
    public JSONObject getInvoiceListByVoucherNo(String token,String voucherNo,int page,int rows){
        String param = "token="+token+"&voucherNo="+voucherNo+"&page="+page+"&rows="+rows;
        String result = HttpClientUtil.httpGets(ServerConstant.URL_AVF_ACCOUNT_VOUCHERNO_INVOICES, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return JSONObject.parseObject(jsonObject.getString("data"));
    }

    /**
     * 删除
     * @param token
     * @param id
     */
    public void deleteAccountsRPInfoById(String token,String id){
        String param = "token="+token+"&id="+id;
        String result = HttpClientUtil.httpGets(ServerConstant.URL_AVF_ACCOUNT_DELETE, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
    }


    /**
     * 新增应收应付凭证
     */
    public void saveAccountRPInfo(String token,String invoiceIds,String avfAccountsRPInfo) throws Exception {
        Map<String,String> param = new HashMap<>();
        param.put("token",token);
        param.put("invoiceIds",invoiceIds);
        param.put("RPInfo",avfAccountsRPInfo);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_AVF_ACCOUNT_SAVE, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
    }

    /**
     * 更新应收应付凭证
     */
    public void updateAccountRPInfo(String token,String invoiceIds,String avfAccountsRPInfo) throws Exception {
        Map<String,String> param = new HashMap<>();
        param.put("token",token);
        param.put("invoiceIds",invoiceIds);
        param.put("RPInfo",avfAccountsRPInfo);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_AVF_ACCOUNT_UPDATE, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
    }


    /**
     * 根据凭证号，批次号查找发票
     * @param token
     * @param voucherNo
     * @param batchNumber
     * @return
     */
    public JSONObject findByPayableCertificateAndBatchNumber(String token,String voucherNo, String batchNumber,int page,int rows) {
        Map<String ,Object > param = new HashMap<>();
        param.put("token",token);
        param.put("voucherNo",voucherNo);
        param.put("batchNumber",batchNumber);
        param.put("page",page);
        param.put("rows",rows);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_AVF_VOUCHER_BATCHNUMBER_INVOICES, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return  JSONObject.parseObject(jsonObject.getString("data"));
    }

    public boolean hasVoucherNo(String token,String voucherNo){
        String param = "token="+token+"&voucherNo="+voucherNo;
        String result = HttpClientUtil.httpGets(ServerConstant.URL_AVF_VOUCHER_HASVOUCHER, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return  jsonObject.getBoolean("data");
    }

    public JSONArray supplyGetMaturityDateByCompanyCode(String token, String companyCode) {
        String param = "token="+token+"&companyCode="+companyCode;
        String result = HttpClientUtil.httpGets(ServerConstant.URL_AVF_SUPPLY_MATURITY_COMPANYCODE, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        return JSONArray.parseArray(jsonObject.getString("data"));
    }

    public List<AvfAccountsRPInfo> findRPInfosByNeedsNo(String token,String needsNo){
        String result = HttpClientUtil.httpGets(ServerConstant.URL_AVF_FIND_RPINFOS_BY_NEEDSNO, "token=" + token + "&needsNo=" + needsNo);
        JSONObject jsonObject = JSONObject.parseObject(result);
        return JSONObject.parseObject(jsonObject.getString("data"),new TypeReference<List<AvfAccountsRPInfo>>(){});
    }
}
