<%--
  Created by IntelliJ IDEA.
  User: winfred
  Date: 2017/6/16
  Time: 9:54
  To change this template use File | Settings | File Templates.
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"
         contentType="text/html; charset=UTF-8" %>
<link rel="stylesheet" href="/static/avf/css/common.css"/>
<script type="text/javascript" src="/static/avf/js/tab_supplier.js"></script>
<html>
<head>
    <%--<jsp:include page="/base/base.jsp"></jsp:include>--%>
    <title>Title</title>
</head>
<body>
<div class="rz_nav supply_rz_nav">
    <a href="/avf/invoice/toWaitPage?type=supplier"
       class="<c:if test="${tab_state=='1'}">tab_01_over</c:if><c:if test="${tab_state!='1'}">tab_01</c:if>">
        <div class="on_state" style="display:
        <c:if test="${tab_state=='1'}">block</c:if>
        <c:if test="${tab_state!='1'}">none</c:if>;">1.准备发票
        </div>
        <div class="off_state" style="display:
        <c:if test="${tab_state=='1'}">none</c:if>
        <c:if test="${tab_state!='1'}">block</c:if>;"><p><span class="msg_num">1.准备发票</span></p></div>
    </a>
    <a href="/avf/accountRPInfo/accountRPInfoPage"
       class="<c:if test="${tab_state=='2'}">tab_02_over</c:if><c:if test="${tab_state!='2'}">tab_02</c:if>">
        <div class="on_state" style="display:
        <c:if test="${tab_state=='2'}">block</c:if>
        <c:if test="${tab_state!='2'}">none</c:if>">2.应收账款</div>
        <div class="off_state" style="display:
        <c:if test="${tab_state=='2'}">none</c:if>
        <c:if test="${tab_state!='2'}">block</c:if>"><p><span class="msg_num">2.应收账款</span></p></div>
    </a>
    <a href="/avf/financingDemand/toDemandPage?type=supplier"
       class="<c:if test="${tab_state=='3'}">tab_03_over</c:if><c:if test="${tab_state!='3'}">tab_03</c:if>">
        <div class="on_state" style="display:
        <c:if test="${tab_state=='3'}">block</c:if>
        <c:if test="${tab_state!='3'}">none</c:if>;">3.申请融资
        </div>
        <div class="off_state" style="display:
        <c:if test="${tab_state=='3'}">none</c:if>
        <c:if test="${tab_state!='3'}">block</c:if>;"><p><span class="msg_num">3.申请融资</span></p></div>
    </a>
    <a href="/avf/notice/noticesListPage?identityType=SUPPLIER"
       class="<c:if test="${tab_state=='4'}">tab_04_over</c:if><c:if test="${tab_state!='4'}">tab_04</c:if>">
        <div class="on_state" style="display:
        <c:if test="${tab_state=='4'}">block</c:if>
        <c:if test="${tab_state!='4'}">none</c:if>">4.通知单
        </div>
        <div class="off_state" style="display:
        <c:if test="${tab_state=='4'}">none</c:if>
        <c:if test="${tab_state!='4'}">block</c:if>;"><p><span class="msg_num">4.通知单</span></p></div>
    </a>
    <a href="/avf/financingTracking/financingTrackingIndex"
       class="<c:if test="${tab_state=='5'}">tab_05_over</c:if><c:if test="${tab_state!='5'}">tab_05</c:if>">
        <div class="on_state" style="display:
        <c:if test="${tab_state=='5'}">block</c:if>
        <c:if test="${tab_state!='5'}">none</c:if>">5.融资跟踪</div>
        <div class="off_state" style="display:
        <c:if test="${tab_state=='5'}">none</c:if>
        <c:if test="${tab_state!='5'}">block</c:if>"><p><span class="msg_num">5.融资跟踪</span></p></div>
    </a>

</div>
</body>
</html>