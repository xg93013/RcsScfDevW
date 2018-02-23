<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"
		 contentType="text/html; charset=UTF-8"%>
<%@ include file="/base/header.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<!--xg addcss-->
	<link rel="stylesheet" href="/static/avf/css/mainView.css" />
	<link rel="stylesheet" href="/static/avf/css/supplyMain.css" />
	<title>融资管理平台</title>
</head>

<body>
<!--main content-->
<div class="main_content">
	<!--tab_list-->
	<div class="container1200">
		<ul class="tab_list">
			<li><a href="/avf/invoice/toWaitPage?type=supplier">首页</a></li>
			<li><a href="/avf/invoice/toWaitPage">&nbsp;&gt;&nbsp;准备发票</a></li>
			<li><a href="javascript:void(0)">&nbsp;&gt;&nbsp;核心企业详情</a></li>
		</ul>
	</div>
	<!--tab_list end-->

	<div class="container1200 step_content height_box">
		<div class="supply_top">
			<div class="supply_t_l">
				<p class="font36">${company.companyName}</p>
			</div>
			<div class="supply_t_r sheet_list">
				<div class="supply_items"><em class="sup_person"></em>联系人：<span>${company.linkMan}</span></div>
				<div class="supply_items"><em class="sup_zuoji"></em>座&emsp;机：<span>${company.linkManTel}</span></div>
				<div class="supply_items"><em class="sup_phone"></em>手&emsp;机：<span>${company.linkManMobile}</span></div>
				<div class="supply_items end_items"><em class="sup_email"></em>邮&emsp;箱：<span>${company.linkManEmail}</span></div>
			</div>
		</div>
		<!--supply list-->
		<div class="supply_list">
			<ul>
				<li>法定代表人：<span>${company.legalRep}</span></li>
				<li>所有制性质：<span>${company.ownership}</span></li>
				<li>是否上市公司：<span><c:if test="${company.isListedCompany == 0}">未上市</c:if><c:if test="${company.isListedCompany == 1}">上市</c:if></span></li>
				<li>邮编：<span>${company.postCode}</span></li>
				<li>地址：<span>${company.postCode}</span></li>
				<li>经营范围：<span>${company.businessScope}</span></li>
			</ul>
			<ul>
				<li>供应商代码：<span>${company.companyCode}</span></li>
				<li>组织机构代码：<span>${company.organizationCode}</span></li>
				<li>征信机构代码：<span>${company.organizationCode}</span></li>
				<li>社会统一信用代码：<span>${company.socialCreditCode}</span></li>
			</ul>
			<ul>
				<li>币种：<span>${company.currencyCode}</span></li>
				<li>基本开户行：<span>${company.basicAccountBankName}</span></li>
				<li>开户行行号：<span>${company.basicAccountBankCode}</span></li>
				<li>开户行账号：<span>${company.basicAccount}</span></li>
			</ul>
		</div>
	</div>

</div>
<!--main content end-->

<!--footer-->
<%--<%@ include file="/base/footer.jsp"%>--%>
<!--footer end-->
</body>

</html>