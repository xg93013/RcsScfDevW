<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"
         contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="/static/avf/css/commom_heart.css" />
    <link rel="stylesheet" href="/static/avf/css/heart_commpany.css" />
</head>

<body>
<div class="close_name ofh tc f16"><span>${verdor.supplyName}</span><b class="b_close cu fr mr15"></b></div>
<table>
    <tr>
        <td>法定代表人：<font>${verdor.legalRep}</font></td>
        <td>供应商代码：<font>${verdor.supplyCode}</font></td>
        <td>币种：<font>${verdor.currencyCode}</font></td>
    </tr>
    <tr>
        <td>所有制性质：<font>${verdor.ownership}</font></td>
        <td>组织机构代码：<font>${verdor.organizationCode}</font></td>
        <td>基本开户行：<font>${verdor.basicAccountBankName}</font></td>
    </tr>
    <tr>
        <td>是否上市公司：<font><c:if test="${verdor.isListedCompany == 1}">是</c:if><c:if test="${verdor.isListedCompany != 1}">否</c:if></font></td>
        <td>征信机构代码：<font>${verdor.creditAgencyCode}</font></td>
        <td>开户行行号：<font>${verdor.basicAccountBankCode}</font></td>
    </tr>
    <tr>
        <td>邮编：<font>${verdor.postCode}</font></td>
        <td>社会统一信用代码：<font>${verdor.socialCreditCode}</font></td>
        <td>开户行账号：<font>${verdor.basicAccount}</font></td>
    </tr>
    <tr>
        <td colspan="3">经营范围：<font>${verdor.businessScope}</font></td>
    </tr>
    <tr>
        <td>联系人：<font>${verdor.linkMan}</font></td>
        <td>手机：<font>${verdor.linkManMobile}</font></td>
        <td>座机：<font>${verdor.linkManTel}</font></td>
    </tr>
    <tr>
        <td>邮箱：<font>${verdor.linkManEmail}</font></td>
        <td colspan="2">地址：<font>${verdor.address}</font></td>
    </tr>
</table>
</body>
</html>
