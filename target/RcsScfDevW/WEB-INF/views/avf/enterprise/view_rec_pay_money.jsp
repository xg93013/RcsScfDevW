<%--
  User: Wenjun Sun
  Date: 2017/8/30
  Time: 10:24
  des:核心企业、供应商、金融机构查看应付、应收账款
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"
         contentType="text/html; charset=UTF-8"%>
<%@ include file="/base/header.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
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
    <script type="text/javascript" src="/static/avf/js/view_rec_pay_money.js" ></script>
    <script type="text/javascript">
            EUI.onReady(function() {
                new EUI.InvoiceDetail({
                    renderTo : "rzInvoice2",
                });
            });
    </script>
</head>
<!--main content-->
<div class="main_content">
    <!--tab_list-->
    <body>
    <!--top_common-->
    <div class="container1200">
        <ul class="tab_list">
            <li><a href="<c:if test="${userIdentityType == 'ENTERPRISE'}">
           /avf/invoice/toWaitPage?type=enterprise
        </c:if><c:if test="${userIdentityType == 'SUPPLIER'}">
           /avf/invoice/toWaitPage?type=supplier
        </c:if><c:if test="${userIdentityType == 'FINANCIAL'}">
           /avf/financingApprove/financingApproveListPage
        </c:if>">首页</a></li>
            <li><a href="/avf/accountRPInfo/accountRPInfoPage">&gt;&nbsp;
                <c:if test="${userIdentityType == 'ENTERPRISE'}">应付账款</c:if>
                <c:if test="${userIdentityType != 'ENTERPRISE'}">应收账款</c:if>
            </a></li>
            <li><a href="#">&gt;&nbsp;
                <c:if test="${userIdentityType == 'ENTERPRISE'}">应付账款明细</c:if>
                <c:if test="${userIdentityType != 'ENTERPRISE'}">应收账款明细</c:if>
            </a></li>
        </ul>
    </div>
    <input class="identity" type="hidden" value="${userIdentityType}">
    <input type="hidden" value="${batchNumbers}">
    <!--tab_list end-->
    <div class="container1200 step_content">
        <input id="getBatchNumber" type="hidden" value="${accountsRPInfo.batchNumber}">
        <input id="getVoucherNo" type="hidden" value="${accountsRPInfo.voucherNo}">
        <c:if test="${userIdentityType == 'ENTERPRISE'}">
            <p class="form_p mt20"><label>核心企业：</label><font>${userName}</font></p>
            <%--<p class="form_p"><label>公司代码：</label><font>${identityList[0].companycode}</font></p>--%>
        </c:if>
        <c:if test="${userIdentityType == 'SUPPLIER'}">
            <p class="form_p mt20"><label>供应商：</label><font>${userName}</font></p>
            <%--<p class="form_p"><label>公司代码：</label><font>${identityList[0].supplycode}</font></p>--%>
        </c:if>
        <p class="form_p mt20"><label>会计年度：</label><font>${accountsRPInfo.dateYear}</font></p>
        <p class="form_p mt20"><label>应<c:if test="${userIdentityType == 'ENTERPRISE'}">付</c:if><c:if test="${userIdentityType != 'ENTERPRISE'}">收</c:if>凭证号：</label><font>${accountsRPInfo.voucherNo}</font></p>
        <p class="form_p mt20"><label>行项号：</label><font>${accountsRPInfo.lineItemNumber}</font></p>
        <c:if test="${userIdentityType == 'ENTERPRISE'}">
            <p class="form_p mt20"><label>供应商：</label><font>${accountsRPInfo.supplyName}</font></p>
        </c:if>
        <c:if test="${userIdentityType == 'SUPPLIER'}">
            <p class="form_p mt20"><label>核心企业：</label><font>${accountsRPInfo.companyName}</font></p>
        </c:if>
        <%--<c:if test="${fn:length(avfFinInvoiceInfos) != 0}">--%>
        <p class="form_p mt20"><label>批次号：</label><font>${accountsRPInfo.batchNumber}</font></p>
        <div id="invoiceDiv" style="border-top: 1px solid #ddd;margin: 10px;">
            <div class="ml20 total_invoice">已有<font id="invoiceNum">0</font>张发票，总金额<font id="allMoney">0.00</font>元</div>
            <div class="rz_result">
                <div id="rzInvoice2"></div>
            </div>
        </div>
        <%--</c:if>--%>
        <%--<c:if test="${fn:length(avfFinInvoiceInfos) == 0}">--%>
        <div id="accountsDiv" style="display: none">
            <p class="form_p mt20"><label>应<c:if test="${userIdentityType == 'ENTERPRISE'}">付</c:if><c:if test="${userIdentityType == 'SUPPLIER'}">收</c:if>账款金额：</label><font class="money" data="${accountsRPInfo.recPayMoney}"></font></p>
            <p class="form_p mt20"><label>账款到期日：</label><font class="time" data="${accountsRPInfo.maturityDate}"></font></p>
        </div>
        <%--</c:if>--%>
        <div class="btn_form">
            <a class="btn_cancel" href="/avf/accountRPInfo/accountRPInfoPage">返回</a>
        </div>
    </div>
</div>
<!--footer-->
<%--<%@ include file="/base/footer.jsp"%>--%>
<!--footer end-->
</body>
</html>