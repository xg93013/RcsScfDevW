package com.rcsit.scf.bsp.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.rcsit.scf.bsp.domain.PageModel;
import com.rcsit.scf.bsp.domain.ResponseModel;
import com.rcsit.scf.bsp.exception.InvoiceInfoEditException;
import com.rcsit.scf.bsp.exception.RequestErrorException;
import com.rcsit.scf.bsp.handler.AvfWaitFinInvoiceHandler;
import com.rcsit.scf.bsp.model.avf.AvfWaitFinInvoiceHead;
import com.rcsit.scf.bsp.model.avf.AvfWaitFinInvoiceInfo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


/**
 * 待融资发票
 * Created by chenkai on 2017/5/9.
 */
@Controller
@RequestMapping(value = "/avf/invoice")
public class AvfWaitFinInvoiceController extends BaseController {

    private AvfWaitFinInvoiceHandler avfWaitFinInvoiceHandler = new AvfWaitFinInvoiceHandler();


    /**
     * 发票页面跳转
     * @author
     * @param  type enterprise 核心企业   supplier 供应商
     * @return
     */
    @RequestMapping(value = "/toWaitPage")
    public String toWaitPage(Model model,@RequestParam(value = "type",defaultValue = "supplier")String type,@CookieValue("token")String token){
        JSONObject data = avfWaitFinInvoiceHandler.getWaitVerifyQuota(token);
        model.addAttribute("waitNumber",data);
        return "avf/"+type+"/invoice_prepare";
    }
    /**
     * 发票页面列表查询
     * @author
     * @param token
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/waitList")
    public Object waitList(@CookieValue("token")String token,
                           @RequestParam(value = "page",defaultValue = "1")int page,
                           @RequestParam(value = "rows" ,defaultValue = "25")int rows,
                           @RequestParam(value = "keyWord" ,defaultValue = "")String keyWord,
                           @RequestParam(value = "query" ,defaultValue = "")String query,
                           @RequestParam(value = "order",defaultValue = "")String order){
        JSONObject data = avfWaitFinInvoiceHandler.doWaitList(token,page,rows,keyWord,query,order);
        return new PageModel(data);
    }

    /**
     * 手动录入发票跳转页面
     * @param  type enterprise 核心企业   supplier 供应商
     * @return
     */
    @RequestMapping(value = "/toAddInvoice")
    public String toAddInvoice(@RequestParam(value = "type",defaultValue = "supplier")String type){
        return "avf/"+type+"/entry_invoice";
    }
    /**
     * 手动录入发票
     * @author
     * @param
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/manualAddInvoice")
    public ResponseModel manualAddInvoice(@CookieValue("token")String token,
                                          @RequestParam("head") String invoiceHead,
                                          @RequestParam("infos")String infos) {
        avfWaitFinInvoiceHandler.doManualAddInvoice(token, invoiceHead, infos);
        return ResponseModel.SUCCESS();
    }
    /**
     * 录入发票唯一验证
     * @author
     * @param token
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/invoiceOnlyVerify")
    public ResponseModel invoiceOnlyVerify(@CookieValue("token")String token,
                                     @RequestParam("invoiceCode")String invoiceCode,
                                     @RequestParam("invoiceNo")String invoiceNo){
        boolean isExist = avfWaitFinInvoiceHandler.doInvoiceOnlyVerify(token, invoiceCode, invoiceNo);
        return ResponseModel.SUCCESS(isExist);
    }

    /**
     * 待融资发票详情和审核
     * @param type true 跳转审核  false跳转详情
     * @return
     */
    @RequestMapping(value = "/toInvoiceDetailPage")
    public String toInvoiceDetailPage(Model model,@CookieValue("token")String token,boolean type,String id){
        AvfWaitFinInvoiceHead head = avfWaitFinInvoiceHandler.findInvoiceHeadById(token,id);
        model.addAttribute("waitFinHead",head);
        if(type){
            return "avf/enterprise/invoice_audit";  //跳转审核页面
        }
        return "avf/enterprise/invoice_details";   //跳转详情页面
    }
    /**
     * 待融资发票详情和审核
     * @param docNo
     * @param page
     * @param rows
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/invoiceDetail")
    public Object invoiceDetail(@CookieValue("token")String token,@RequestParam("docNo")String docNo, @RequestParam("page")int page, @RequestParam(value = "rows" ,defaultValue = "25")int rows){
        JSONObject data = avfWaitFinInvoiceHandler.doInvoiceDetail(token,docNo,page,rows);
        return new PageModel(data);
    }

    /**
     * 待融资发票审核
     * @param id
     * @param businessDealStatus
     * @param dealInfo
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/invoiceExamine")
    public ResponseModel invoiceExamine(
                                  @CookieValue("token")String token,
                                  @RequestParam("id")String id,
                                  @RequestParam("businessDealStatus") String businessDealStatus,
                                  String dealInfo ){
        try {
            avfWaitFinInvoiceHandler.doInvoiceExamine(token,id, businessDealStatus,dealInfo);
        } catch (Exception e) {
            throw new RequestErrorException(e.getMessage());
        }
        return ResponseModel.SUCCESS();
    }
    /**
     * 导入发票
     * @author
     * @param token
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/importInvoice")
    public ResponseModel importInvoice(@CookieValue("token")String token, @RequestParam("file") MultipartFile file){
        try {
            avfWaitFinInvoiceHandler.doImportInvoice(token, file);
        } catch (Exception e) {
            throw new RequestErrorException(e.getMessage());
        }
        return ResponseModel.SUCCESS();
    }
    /**
     * 删除发票
     * @author
     * @param token
     * @param id
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/deleteInvoiceHead")
    public ResponseModel deleteInvoiceHead(@CookieValue("token")String token,
                                           @RequestParam("id")String id){
        avfWaitFinInvoiceHandler.doDeleteInvoiceHead(token,id);
        return ResponseModel.SUCCESS();
    }
    /**
     * 跳转编辑页面
     * @param id
     * @return
     */
    @RequestMapping(value = "/toEditInvoice")
    public String toEditInvoice(Model model,@CookieValue("token")String token,String id){
        AvfWaitFinInvoiceHead head = avfWaitFinInvoiceHandler.findInvoiceHeadById(token,id);
        if (null == head )
            throw new InvoiceInfoEditException();

        List<AvfWaitFinInvoiceInfo> finInvoiceInfos = avfWaitFinInvoiceHandler.findInvoiceInfoByHeadId(token, id);
        model.addAttribute("batchNumber",finInvoiceInfos.get(0).getBatchNumber());
        model.addAttribute("finInvoiceInfos", JSON.toJSONString(finInvoiceInfos));
        model.addAttribute("finInvoiceHead", JSON.toJSONString(head));
        return "avf/enterprise/invoice_edit";
    }

 /*
    @ResponseBody
    @RequestMapping(value = "/findInvoiceInfoByHeadId")
    public Object findInvoiceInfoByHeadId(@CookieValue("token")String token,@RequestParam("id")String id){
        List<AvfWaitFinInvoiceInfo> invoiceInfos = this.avfWaitFinInvoiceHandler.findInvoiceInfoByHeadId(token, id);
        return invoiceInfos;
    }*/
    /**
     * 编辑发票
     * @author
     * @param
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/editInvoice")
    public ResponseModel editInvoice(@CookieValue("token")String token,
                                      @RequestParam("head") String head,
                                      @RequestParam("infos")String infos) {
        avfWaitFinInvoiceHandler.doEditInvoice(token, head, infos);
        return ResponseModel.SUCCESS();
    }
}
