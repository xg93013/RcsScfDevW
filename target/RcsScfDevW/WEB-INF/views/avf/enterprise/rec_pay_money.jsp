<%--
  User: Wenjun Sun
  Date: 2017/8/30
  Time: 10:24
  des:核心企业、供应商、金融机构应付、应收账款
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"
contentType="text/html; charset=UTF-8"%>
<%@ include file="/base/header.jsp"%>
<!DOCTYPE html>
<%
    Cookie[] requestCookies = request.getCookies();
    for (Cookie cookie : requestCookies) {
        if (cookie.getName().equalsIgnoreCase("userIdentityType"))
            request.setAttribute("userIdentityType", URLDecoder.decode(cookie.getValue(), "utf-8"));
    }
%>
<html>
<head>
    <!--xg addcss-->
    <link rel="stylesheet" href="/static/avf/css/mainView.css" />
    <link rel="stylesheet" href="/static/avf/css/commom_heart.css" />
    <link rel="stylesheet" href="/static/avf/css/heart_commpany.css" />
    <!--xg addjs-->
    <script type="text/javascript" src="/static/base/js/public.js"></script>
    <script type="text/javascript" src="/static/base/js/common.js"></script>
    <script type="text/javascript" src="/static/avf/js/rec_pay_money.js" ></script>
    <%--<!--<%&#45;&#45;<title>融资管理平台</title>&#45;&#45;%>-->--%>
    <style>
        .off_state p {
            display: block;
        }
    </style>
    <script type="text/javascript">
        EUI.onReady(function() {
            var ApplyFinance = new EUI.ApplyFinance({
                renderTo : "recPayMoneyList",
                //padding: 5,
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
            <li><a href="/avf/invoice/toWaitPage?type=enterprise">首页</a></li>
            <li><a href="#">&gt;&nbsp; <c:if test="${userIdentityType == 'ENTERPRISE'}">应付账款</c:if>
                <c:if test="${userIdentityType != 'ENTERPRISE'}">应收账款</c:if></a></li>
        </ul>
    </div>
    <input class="identity" type="hidden" value="${userIdentityType}">
    <!--tab_list end-->
    <div class="container1200 step_content">
        <c:if test="${userIdentityType == 'ENTERPRISE'}">
            <c:set var="tab_state" scope="session" value="2"/>
            <%@ include file="/base/tab_enterprise.jsp"%>
        </c:if>
        <c:if test="${userIdentityType == 'SUPPLIER'}">
            <c:set var="tab_state" scope="session" value="2"/>
            <%@ include file="/base/tab_supplier.jsp"%>
        </c:if>
        <c:if test="${userIdentityType == 'FINANCIAL'}">
            <c:set var="tab_state" scope="session" value="2"/>
            <%@ include file="/base/tab_financial.jsp"%>
        </c:if>
        <div class="rz_result">
            <div class="info_bar mt10 mb10">
                <%--<c:if test="${userIdentityType != 'FINANCIAL'}">--%>
                <c:if test="${userIdentityType == 'ENTERPRISE'}">
                    <div class="re_con_right fr ml10">
                        <div class="re_conr_items"><div class="dr_ticket" id="addRecPayMoney"><em></em><span>
                            <c:if test="${userIdentityType == 'ENTERPRISE'}">新增应付账款</c:if>
                            <%--<c:if test="${userIdentityType != 'ENTERPRISE'}">新增应收账款</c:if>--%>
                        </span></div></div>
                    </div>
                </c:if>
                <div class="search_module fr">
                    <div class="search_blur fl">
                        <input type="text" />
                        <div class="search_btns"><span class="sxf_btn icon_search"></span></div>
                    </div>
                    <a href="javascript:void(0)" class="blueBg" id="detail_query">高级查询</a>
                    <a href="javascript:void(0)" class="blueBg" id="detail_fresh">刷新</a>
                </div>
            </div>
            <div id="recPayMoneyList"></div>
        </div>
    </div>
</div>
<!--footer-->
<%--<%@ include file="/base/footer.jsp"%>--%>
<!--footer end-->
</body>
</html>