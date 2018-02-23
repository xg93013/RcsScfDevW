package com.rcsit.scf.bsp.handler;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.rcsit.scf.bsp.constant.ServerConstant;
import com.rcsit.scf.bsp.model.avf.AvfWaitFinInvoiceHead;
import com.rcsit.scf.bsp.model.avf.AvfWaitFinInvoiceInfo;
import com.rcsit.scf.bsp.utils.HttpClientUtil;
import com.rcsit.scf.bsp.utils.ReadExcelUtil;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by chenkai on 2017/5/25.
 */

//@Service
public class AvfWaitFinInvoiceHandler {
    private static Long sizeMax = 5L; //文件大小限制MB为单位

    public JSONObject doWaitList(String token , int page,int rows,String keyWord ,String query,String order){
        //String param="token="+token+"&page="+page+"&rows="+rows+"&keyWord="+keyWord+"&query="+query+"&order="+order;

        Map<String ,Object> param = new HashMap<>();
        param.put("token",token);
        param.put("page",page);
        param.put("rows",rows);
        param.put("keyWord",keyWord);
        param.put("query",query);
        param.put("order",order);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_AVF_WAIT_LIST,param);
                //HttpK(ServerConstant.URL_AVF_WAIT_LIST, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return jsonObject.getJSONObject("data");
    }
    public void doManualAddInvoice(String token ,String invoiceHead,String infos){
        Map<String,String> param = new HashMap<>();
        param.put("token",token);
        param.put("head",invoiceHead);
        param.put("infos",infos);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_AVF_WAIT_MANUAL_ADD, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
    }
    public Boolean doInvoiceOnlyVerify(String token ,String invoiceCode,String invoiceNo) {
        String param="token="+token+"&invoiceCode="+invoiceCode+"&invoiceNo="+invoiceNo;
        String result = HttpClientUtil.httpGets(ServerConstant.URL_AVF_ONLY_VERIFY, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return jsonObject.getBoolean("data");
    }

    public JSONObject doInvoiceDetail(String token,String docNo, int page, int rows) {
        String param="token="+token+"&docNo="+docNo+"&page="+page+"&rows="+rows;
        String result = HttpClientUtil.httpGets(ServerConstant.URL_AVF_WAIT_INFO, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return jsonObject.getJSONObject("data");
    }

    public void doInvoiceExamine(String token,String id, String businessDealStatus,String dealInfo) throws Exception {
        Map<String ,String> param = new HashMap<>();
        param.put("token",token);
        param.put("id",id);
        param.put("businessDealStatus",businessDealStatus);
        param.put("dealInfo",dealInfo);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_AVF_WAIT_INVOICE_EXAMINE, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
    }

    public void doImportInvoice(String token, MultipartFile file) throws Exception {
        //解析excel
        Map<Integer, List<String>> map = ReadExcelUtil.upload(file);
        ReadExcelUtil.removeNullValue(map); //移除map中的value空值
        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("token", token));
        params.add(new BasicNameValuePair("mapJson", JSONObject.toJSONString(map)));
        String result = HttpClientUtil.httpPairsPost(ServerConstant.URL_AVF_IMPORT_INVOICE, params);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
    }

    public JSONObject getWaitVerifyQuota(String token) {
        String result = HttpClientUtil.httpGets(ServerConstant.URL_AVF_WAIT_VERIFY_QUOTA, "token="+token);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return jsonObject.getJSONObject("data");
    }

    public AvfWaitFinInvoiceHead findInvoiceHeadById(String token,String id) {
        String result = HttpClientUtil.httpGets(ServerConstant.URL_AVF_WAIT_HEAD, "token="+token+"&id="+id);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
        return JSONObject.parseObject(jsonObject.getString("data"), new TypeReference<AvfWaitFinInvoiceHead>(){});
    }

    public void doDeleteInvoiceHead(String token, String id) {
        Map<String ,String> param = new HashMap<>();
        param.put("token",token);
        param.put("id",id);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_AVF_WAIT_INVOICE_DELETE, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
    }

    public void doEditInvoice(String token ,String invoiceHead,String infos){
        Map<String,String > param = new HashMap<>();
        param.put("token",token);
        param.put("head",invoiceHead);
        param.put("infos",infos);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_AVF_WAIT_EDIT_INVOICE, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        HttpClientUtil.isOk(jsonObject);
    }

    public List<AvfWaitFinInvoiceInfo> findInvoiceInfoByHeadId(String token, String id) {
        String result = HttpClientUtil.httpGets(ServerConstant.URL_AVF_FIND_INVOICEINFO_INVOICEHEAD_ID, "token=" + token + "&id=" + id);
        JSONObject jsonObject = JSONObject.parseObject(result);
        return JSONObject.parseObject(jsonObject.getString("data"),new TypeReference<List<AvfWaitFinInvoiceInfo>>(){});
    }
}
