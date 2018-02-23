<%--
  User: Wenjun Sun
  Date: 2017/8/30
  Time: 10:24
  des:供应商编辑融资申请
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"
         contentType="text/html; charset=UTF-8"%>
<%@ page import="com.rcsit.scf.bsp.model.pbm.PbmVerdor" %>
<%@ page import="com.alibaba.fastjson.JSONObject" %>
<%@ include file="/base/header.jsp"%>
<!DOCTYPE html>
<%
    String verdor = request.getParameter("verdor");
    PbmVerdor pbmVerdor = JSONObject.parseObject(verdor, PbmVerdor.class);
    request.setAttribute("pbmVerdor",pbmVerdor);
%>
<html>
<head>
    <!--xg addcss-->

    <link rel="stylesheet" href="/static/avf/css/heart_commpany.css" />
    <link rel="stylesheet" href="/static/avf/css/commom_heart.css" />
    <link rel="stylesheet" href="/static/avf/css/update_eui.css" />

    <!--xg addjs-->
    <script type="text/javascript" src="/static/base/js/public.js" ></script>
    <script type="text/javascript" src="/static/base/js/common.js" ></script>
    <script type="text/javascript" src="/static/avf/js/edit_finance.js" ></script>
    <style>

    </style>

    <script type="text/javascript">
        EUI.onReady(function() {
            var addFinance1 = new EUI.AddFinance1({
                renderTo : "rzInvoice1",
                renderTo1 : "comboSupplier",
                renderTo2 : "rzInvoice2",
                renderToBank:"chioceBank",
                renderToMoney:"financeMoney",
                renderToTerm:"financeTerm",
                renderToRate:"bankRate",
            });
        });
    </script>
</head>
<body>

<!--main content-->
<div class="main_content">
    <!--tab_list-->
    <div class="container1200">
        <ul class="tab_list">
            <li><a href="/avf/invoice/toWaitPage?type=supplier">首页</a></li>
            <li><a href="/avf/financingDemand/toDemandPage?type=supplier">&nbsp;&gt;&nbsp;申请融资</a></li>
            <li><a href="#">&nbsp;&gt;&nbsp;编辑融资申请</a></li>
        </ul>
    </div>
    <!--tab_list end-->

    <div class="container1200 step_content">
        <div class="container1188">
            <div class="mb20" >
                <div id="comboSupplier"></div>
            </div>
            <input id="getId" type="hidden" value="${demandHead.id}">
            <input id="getFinancingNeedsNo" type="hidden" value="${demandHead.financingNeedsNo}">
            <input id="getCompanyCode" type="hidden" value="${demandHead.companyCode}">
            <input id="getCompanyName" type="hidden" value="${demandHead.companyName}">
            <input id="getSupplyCode" type="hidden" value="${demandHead.supplyCode}">
            <input id="getSupplyName" type="hidden" value="${demandHead.supplyName}">
            <input id="getFinInsCode" type="hidden" value="${demandHead.finInsCode}">
            <input id="getFinInsName" type="hidden" value="${demandHead.finInsName}">
            <input id="getIntentionFmoney" type="hidden" value="${demandHead.intentionFmoney}">
            <input id="getTotalMoney" type="hidden" value="${demandHead.totalMoney}">
            <input id="getIntentionFterm" type="hidden" value="${demandHead.intentionFterm}">
            <input id="getBusinessDealInfo" type="hidden" value="${demandHead.businessDealInfo}">
            <input id="getBusinessDealStatus" type="hidden" value="${demandHead.businessDealStatus}">
            <input id="getIntentionFremark" type="hidden" value="${demandHead.intentionFremark}">
            <ul class="ul_list"><li class="li_1">所有应收账款</li><li class="bor_b0">已选应收账款</li></ul><div class="ml20 total_invoice">已选<font id="invoiceNum">0</font>笔应收账款，应收账款总金额<font id="allMoney">0.00</font>元</div>
            <div class="ul_tab" id="ul_tab_0" data="0">
                <div class="rz_result">
                    <div id="rzInvoice1"></div>
                </div>
            </div>
            <div class="ul_tab" id="ul_tab_1" data="1">
                <div class="rz_result">
                    <div id="rzInvoice2"></div>
                </div>
            </div>
            <div class="container1180">
                <div class="combobox">
                    <div id="chioceBank"></div>
                </div>
                <div class="label_list" style="border-bottom:0px;">
                    <div class="w1"><label>应收账款总金额：</label><span><font class="money" id="totalMoney" data="${demandHead.totalMoney}"></font>元</span></div>
                    <div class="w2" style="height:60px;">
                        <div id="financeMoney"></div>
                    </div>
                    <div class="w1"><label>融资比例：</label><span><font class="round" id="financeRate" data="${demandHead.intentionFmoney/demandHead.totalMoney*100}"></font>%</span></div>
                    <div class="w2" style="height:60px;">
                        <div id="financeTerm"></div>
                    </div>
                    <div class="lh50 w1"><label>银行参考利率：</label><span>
							<font class="rate" id="bankRateFollow" data="${demandHead.bankRate}"></font>
							<font id="rateB">%</font>
						</span></div>
                    <div class="w2" style="height:60px;">
                        <div id="bankRate"></div>
                    </div>
                    <span id="verdor" style="display: none">${verdor}</span>
                    <div class="w1 lh30"><label>供方联系人：</label><span id="linkMan"></span></div>
                    <div class="w2 lh30"><label>供方联系人电话：</label><span id="linkManTel"></span></div>
                    <div class="w1 lh30"><label>供方联系人手机：</label><span id="linkManMobile"></span></div>
                    <div class="w2 lh30"><label>供方联系人邮箱：</label><span id="linkManEmail"></span></div>
                </div>
            </div>
            <div class="btn_next">
                <div class="btn_2 btn_confirm fl" id="confirm_next">提&nbsp;交</div>
                <div class="btn_1 btn_cancel fl ml20">清空</div>
            </div>
        </div>
    </div>

</div>
<!--main content end-->
<!--footer-->
<%--<%@ include file="/base/footer.jsp"%>--%>
<!--footer end-->
</body>
</html>
