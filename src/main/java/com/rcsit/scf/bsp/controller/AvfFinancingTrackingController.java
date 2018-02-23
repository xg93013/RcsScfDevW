package com.rcsit.scf.bsp.controller;

import com.rcsit.scf.bsp.domain.enums.UserIdentityType;
import com.rcsit.scf.bsp.dto.AvfFinancingTrackingDto;
import com.rcsit.scf.bsp.handler.AvfFinancingTrackingHandler;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

/**
 * 融资跟踪
 * Created by hmily on 2017/8/2.
 */
@Controller
@RequestMapping(value = "/avf/financingTracking")
public class AvfFinancingTrackingController extends BaseController{

    AvfFinancingTrackingHandler handler = new AvfFinancingTrackingHandler();

    /**
     * 融资跟踪首页
     * @param @RequestParam("identityType")UserIdentityType identityType
     * @return
     */
    @RequestMapping(value = "/financingTrackingIndex")
    public String financingTrackingIndex(){
        return "/avf/enterprise/finance_tracking";
    }

    /**
     * 融资跟踪数据
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/financingTrackingIndexList")
    public Object financingTrackingIndexList(@CookieValue("token")String token,
                                                    @RequestParam(value = "page",defaultValue = "1")int page,
                                                    @RequestParam(value = "rows" ,defaultValue = "25")int rows,
                                                    @RequestParam(value = "keyWord",defaultValue = "")String keyWord,
                                                    @RequestParam(value = "query",defaultValue = "")String query,
                                                    @RequestParam(value = "order",defaultValue = "")String order){

        Object trackingDtos = this.handler.financingTrackingIndexList(token, page, rows, keyWord, query, order);
        return trackingDtos;
    }

    @RequestMapping("/downLoadTrackingExcel")
    public void downLoadTrackingExcel(@CookieValue( value = "token")String token,
                                      @RequestParam( value = "ids",defaultValue = "")String ids,
                                      @RequestParam(value = "all",defaultValue = "false")boolean all,
                                      @CookieValue(value = "userIdentityType")String identityType,
                                      HttpServletResponse response) throws IOException {
        List<AvfFinancingTrackingDto> trackingDtos = this.handler.downLoadTrackingData(token, ids, all);
        HSSFWorkbook hssfWorkbook = this.handler.exportExcel(trackingDtos, UserIdentityType.getIdentity(identityType));
        response.setContentType("application/vnd.ms-excel");
        response.setHeader("Content-disposition", "attachment;filename=TrackingExcel.xls");
        OutputStream ouputStream = response.getOutputStream();
        hssfWorkbook.write(ouputStream);
        ouputStream.flush();
        ouputStream.close();
    }

}
