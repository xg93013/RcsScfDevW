<%--
	User:xionggang
	Date:2017/08/30
	Time:10:20
	des:金融机构收款补录补录页面
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"
		 contentType="text/html; charset=UTF-8"%>
<%@ include file="/base/header.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<!--xg addcss-->
	<link rel="stylesheet" href="/static/avf/css/mainView.css" />
	<link rel="stylesheet" href="/static/avf/css/commom_heart.css" />
	<link rel="stylesheet" href="/static/avf/css/heart_commpany.css" />
	<link rel="stylesheet" href="/static/avf/css/supplyMain.css" />
	<link rel="stylesheet" href="/static/avf/css/update_eui.css" />
	<!--xg addjs-->
	<script type="text/javascript" src="/static/base/js/public.js"></script>
	<script type="text/javascript" src="/static/base/js/common.js"></script>
	<script type="text/javascript" src="/static/avf/js/credit_add.js" ></script>
	<script>
        EUI.onReady(function() {
            new EUI.creditAddForm({
                renderTo : "credit_add_form"
            });
        });
	</script>
	<title>融资管理平台</title>
</head>

<body>
<!--main content-->
<div class="main_content">
	<!--tab_list-->
	<div class="container1200">
		<ul class="tab_list">
			<li><a href="/avf/financingApprove/financingApproveListPage">首页</a></li>
			<li><a href="/avf/financingReceipt/financingReceiptPage">&nbsp;&gt;&nbsp;收款补录</a></li>
			<li><a href="javascript:void(0)">&nbsp;&gt;&nbsp;详情</a></li>
		</ul>
	</div>
	<!--tab_list end-->

	<div class="container1200 white_content">
		<div class="credit_top_con">
			<div class="whyzzk_company w1160">
				<div class="w360 fl">
					<input type="hidden" value="${financingReceiptDetails.id}" id="addId">
					<span><label>成交单号：</label><font>${financingReceiptDetails.noticeNo}</font></span>
				</div>
				<div class="w299 fl">
					<span><label>合同单号：</label><font>${financingReceiptDetails.noticeNo}</font></span>
				</div>
			</div>
			<div class="whyzzk_money">
				<div class="w360 fl">
					<span>供应商：</span>
					<input type="hidden" id="financeMoney" value="${financingReceiptDetails.financeMoney}">
					<span><label class="f30">${financingReceiptDetails.supplyName}</label></span>
				</div>
				<div class="w450 fl">
					<input type="hidden" id="financeStart" value="${financingReceiptDetails.financeStart}">
					<span class="w330">核心企业:</span>
					<span class="w330"><label class="f30">${financingReceiptDetails.companyName}</label></span>
				</div>
				<div class="fl">
					<span class="w330">资金提供方:</span>
					<span class="w330"><label class="f30">${financingReceiptDetails.finInsName}</label></span>
				</div>
				<%--<input type="hidden" value="${financingReceiptDetails.financeMoney}" id="financeMoney"/>--%>
				<input type="hidden" value="${financingReceiptDetails.financeEnd}" id="financeEnd"/>
				<input type="hidden" value="${financingReceiptDetails.loanDate}" id="loanDate"/>
			</div>
		</div>

		<!--收款表单-->
		<div id="credit_add_form"></div>
		<div class="btn_refuse ml106">
			<div class="ok_add" id="sub_credit">确认补录</div>
		</div>
	</div>

</div>
<!--main content end-->

<!--遮罩层开始-->
<div id="overlay" class="overlay" style="display: none;"></div>
<!-- Loading提示 DIV -->
<div id="loadingTip" class="loading_tip" style="display: none;">
	<div class="loading_content">
		<img src="/static/avf/images/record.png"/>
		<p> 补录成功...</p>
	</div>
</div>
<!--遮罩层结束-->

<!--footer-->
<%--<%@ include file="/base/footer.jsp"%>--%>
<!--footer end-->
</body>
</html>