<%--
	User:xionggang
	Date:2017/08/30
	Time:10:20
	des:金融机构收款补录详情页面
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"
		 contentType="text/html; charset=UTF-8"%>
<%@ include file="/base/header.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<!--xg addcss-->
	<link rel="stylesheet" href="/static/avf/css/commom_heart.css" />
	<link rel="stylesheet" href="/static/avf/css/heart_commpany.css" />
	<link rel="stylesheet" href="/static/avf/css/supplyMain.css" />
	<script type="text/javascript" src="/static/base/js/public.js" ></script>
	<script type="text/javascript" src="/static/base/js/common.js" ></script>
	<title>首页-收款补录-详情</title>
	<style>
		.wyzzk {
			border-bottom:0px;
		}
	</style>
</head>
<body>
<!--main content-->
<div class="main_content">
	<!--tab_list-->
	<div class="container1200">
		<ul class="tab_list">
			<li><a href="/avf/financingApprove/financingApproveListPage">首页</a></li>
			<li><a href="/avf/financingReceipt/financingReceiptPage">&gt;&nbsp;收款补录</a></li>
			<li><a href="javascript:void(0)">&gt;&nbsp;详情</a></li>
		</ul>
	</div>
	<!--tab_list end-->

	<div class="container1200 step_content">
		<div class="wyzzk">
			<div class="wyzzk_top_left">
				<div class="whyzzk_company w1160">
					<div class="w360 fl">
						<span><label>成交单号：</label><font>${financingReceiptDetails.noticeNo}</font></span>
					</div>
					<div class="w450 fl">
						<span><label>合同单号：</label><font>${financingReceiptDetails.noticeNo}</font></span>
					</div>
					<div class="fl">
						<span><label>状态：</label><font class="cfd7138">${financingReceiptDetails.businessDealInfo}</font></span>
					</div>
				</div>
				<div class="whyzzk_money">
					<div class="w360 fl">
						<span>供应商：</span>
						<span><label class="f30">${financingReceiptDetails.supplyName}</label></span>
					</div>
					<div class="w450 fl">
						<span class="w330">核心企业:</span>
						<span class="w330"><label class="f30">${financingReceiptDetails.companyName}</label></span>
					</div>
					<div class="fl">
						<span class="w330">资金提供方:</span>
						<span class="w330"><label class="f30">${financingReceiptDetails.finInsName}</label></span>
					</div>
					<div class="w360 fl mt20">
						<span>融资金额：</span>
						<span><label class="f30 money"  data="${financingReceiptDetails.financeMoney}"></label></span>
					</div>
					<div class="w450 fl mt20">
						<span class="w330">融资期限:</span>
						<span><label class="f30 term" data="${financingReceiptDetails.financeStart}" fc-data="${financingReceiptDetails.financeEnd}"></label></span>
					</div>
					<div class="fl mt20">
						<span class="w330">收款补录日期:</span>
						<span class="w330"><label class="f30 time" data="${financingReceiptDetails.receivablesDate}"></label></span>
					</div>
					<div class="w450 fl mt20">
						<span class="w330">收款补录金额:</span>
						<span class="w330"><label class="f30">${financingReceiptDetails.receivablesMoney}</label></span>
					</div>
				</div>

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