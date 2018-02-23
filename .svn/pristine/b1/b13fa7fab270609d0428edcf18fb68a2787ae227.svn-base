package com.rcsit.scf.bsp.handler;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.rcsit.scf.bsp.bo.Tracking.EnterpriseExcelBo;
import com.rcsit.scf.bsp.bo.Tracking.FinanceExcelBo;
import com.rcsit.scf.bsp.bo.Tracking.SupplierExcelBo;
import com.rcsit.scf.bsp.bo.Tracking.TrackingExcelBo;
import com.rcsit.scf.bsp.constant.ServerConstant;
import com.rcsit.scf.bsp.domain.enums.UserIdentityType;
import com.rcsit.scf.bsp.dto.AvfFinancingTrackingDto;
import com.rcsit.scf.bsp.utils.HttpClientUtil;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.beans.BeanUtils;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by hmily on 2017/8/22.
 */
public class AvfFinancingTrackingHandler {

    public Object financingTrackingIndexList(String token,
                                                                    int page,
                                                                    int rows,
                                                                    String keyWord,
                                                                    String query,
                                                                    String order){
        Map<String ,Object> param = new HashMap<>();
        param.put("token",token);
        param.put("page",page);
        param.put("rows",rows);
        param.put("keyWord",keyWord);
        param.put("query",query);
        param.put("order",order);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_AVF_FINANCING_TRACKING_LIST, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        return JSONArray.parseObject(jsonObject.getString("data"));
    }

    public List<AvfFinancingTrackingDto> downLoadTrackingData(String token,
                                                                    String ids,
                                                                    boolean all){
        Map<String ,Object> param = new HashMap<>();
        param.put("token",token);
        param.put("ids",ids);
        param.put("all",all);
        String result = HttpClientUtil.httpKvPost(ServerConstant.URL_AVF_FINANCING_TRACKING_DOWNLOAD, param);
        JSONObject jsonObject = JSONObject.parseObject(result);
        return JSONObject.parseObject(jsonObject.getString("data"),new TypeReference<List<AvfFinancingTrackingDto>>(){});
    }

    public HSSFWorkbook exportExcel(List<AvfFinancingTrackingDto> trackingDtos,UserIdentityType identityType){
        List<TrackingExcelBo> excelBos = new LinkedList<>();
        //获取到数据
        trackingDtos.forEach(avfFinancingTrackingDto -> {
            TrackingExcelBo excelBo = new TrackingExcelBo();
            BeanUtils.copyProperties(avfFinancingTrackingDto.getAvfAccountsRPInfos().get(0),excelBo);
            BeanUtils.copyProperties(avfFinancingTrackingDto.getNotice(),excelBo);
            BeanUtils.copyProperties(avfFinancingTrackingDto,excelBo);
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
            String finTerm = "";
            if (null!=avfFinancingTrackingDto.getFinanceStart() && null!=avfFinancingTrackingDto.getFinanceEnd()){
                finTerm = sdf.format(avfFinancingTrackingDto.getFinanceStart())
                        + "--"+sdf.format(avfFinancingTrackingDto.getFinanceEnd());
            }
            excelBo.setFinanceTerm(finTerm);
            excelBos.add(excelBo);
        });

        return createExcel(excelBos,identityType);
    }

    private HSSFWorkbook createExcel(List<TrackingExcelBo> excelBos,UserIdentityType identityType){

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet("融资跟踪报表统计");

        HSSFCellStyle style = wb.createCellStyle();
        // 设置居中样式
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 水平居中
        style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER); // 垂直居中
        String[] excelHeader0;
        String[] excelHeader1;
        //获取excel头部信息
        if (identityType.name().equalsIgnoreCase(UserIdentityType.ENTERPRISE.name())){
            excelHeader0 = EnterpriseExcelBo.excelHeader0;
            excelHeader1 = EnterpriseExcelBo.excelHeader1;
        }else if (identityType.name().equalsIgnoreCase(UserIdentityType.SUPPLIER.name())){
            excelHeader0 = SupplierExcelBo.excelHeader0;
            excelHeader1 = SupplierExcelBo.excelHeader1;
        }else {
            excelHeader0 = FinanceExcelBo.excelHeader0;
            excelHeader1 = FinanceExcelBo.excelHeader1;
        }
        HSSFRow row0 = sheet.createRow(0);
        HSSFRow row1 = sheet.createRow(1);
        for (int i =0;i<excelHeader0.length;i++){
            if (i<=12)//12列之后显示的是金额日期等
                sheet.addMergedRegion(new CellRangeAddress(0,1,i,i));
            if (i>12 && i%2 !=0){
                sheet.addMergedRegion(new CellRangeAddress(0,0,i,i+1));
            }

            //添入表头1
            HSSFCell cell = row0.createCell(i);
            cell.setCellValue(excelHeader0[i]);
        }

        for (int i = 0; i < excelHeader1.length; i++) {
            //添入表头2
            HSSFCell cell = row1.createCell(i);
            cell.setCellValue(excelHeader1[i]);
        }
        for (int j =0;j<excelBos.size();j++) {
            HSSFRow row = sheet.createRow(j + 2);
            List<Object> values = new ArrayList();
            if (identityType.name().equalsIgnoreCase(UserIdentityType.ENTERPRISE.name())){
                values = EnterpriseExcelBo.exportFormat(excelBos.get(j));
            }else if (identityType.name().equalsIgnoreCase(UserIdentityType.SUPPLIER.name())){
                values = SupplierExcelBo.exportFormat(excelBos.get(j));
            }else {
                values = FinanceExcelBo.exportFormat(excelBos.get(j));
            }
            for (int z = 0;z <values.size();z++){
                Object o = values.get(z);
                if (o instanceof Date){
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
                    o=sdf.format((Date)o);
                }
                if (null == o)
                    o =new StringBuffer("");
                row.createCell(z).setCellValue(String.valueOf(o));
            }

        }
        return wb;
    }
}
