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
    <div class="close_name ofh tc f16"><span>${company.companyName}</span><b class="b_close cu fr mr15"></b></div>
    <table>
        <tr>
            <td>法定代表人：<font>${company.legalRep}</font></td>
            <td>核心企业代码：<font>${company.companyCode}</font></td>
            <td>币种：<font>${company.currencyCode}</font></td>
        </tr>
        <tr>
            <td>所有制性质：<font>${company.ownership}</font></td>
            <td>组织机构代码：<font>${company.organizationCode}</font></td>
            <td>基本开户行：<font>${company.basicAccountBankName}</font></td>
        </tr>
        <tr>
            <td>是否上市公司：<font><c:if test="${company.isListedCompany == 1}">是</c:if><c:if test="${company.isListedCompany != 1}">否</c:if></font></td>
            <td>征信机构代码：<font>${company.creditAgencyCode}</font></td>
            <td>开户行行号：<font>${company.basicAccountBankCode}</font></td>
        </tr>
        <tr>
            <td>邮编：<font>${company.postCode}</font></td>
            <td>社会统一信用代码：<font>${company.socialCreditCode}</font></td>
            <td>开户行账号：<font>${company.basicAccount}</font></td>
        </tr>
        <tr>
            <td colspan="3">经营范围：<font>${company.businessScope}</font></td>
        </tr>
        <tr>
            <td>联系人：<font>${company.linkMan}</font></td>
            <td>手机：<font>${company.linkManMobile}</font></td>
            <td>座机：<font>${company.linkManTel}</font></td>
        </tr>
        <tr>
            <td>邮箱：<font>${company.linkManEmail}</font></td>
            <td colspan="2">地址：<font>${company.address}</font></td>
        </tr>
    </table>
</body>
</html>
