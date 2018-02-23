<%--
	User:xionggang
	Date:2017/08/30
	Time:10:10
	des:核心企业发票详情
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
		<link rel="stylesheet" href="/static/avf/css/invoice_details.css" />
		
		<!--xg js-->
		<script type="text/javascript" src="/static/base/js/common.js" ></script>
		<script type="text/javascript" src="/static/base/js/public.js" ></script>
		<script type="text/javascript" src="/static/avf/js/invoice_details.js" ></script>
		<script>
			EUI.onReady(function(){
                var docNo = document.getElementById("DocNum").value;
				new EUI.InvoiceDetail({
					renderTo: "ticket_pro_box",
					cfgId: "InvoiceDetail",
					docNo:docNo
				});
			})
		</script>
		
		<title>融资管理平台</title>
	</head>

	<body>
		
		<!--main content-->
		<div class="main_content">
			<!--tab_list-->
			<div class="container1200">
				<ul class="tab_list">
					<li><a href="/avf/invoice/toWaitPage?type=enterprise">首页</a></li>
					<li><a href="/avf/invoice/toWaitPage?type=enterprise">&nbsp;&gt;&nbsp;准备发票</a></li>
					<li><a href="javascript:void(0)">&nbsp;&gt;&nbsp;发票详情</a></li>
				</ul>
			</div>
			<!--tab_list end-->
			
			<!--发票详情-->
			<div class="container1200 ticket_pro">
				<div class="ticket_pro_top">
					<input type="hidden" value="${waitFinHead.docNo}" id="DocNum"/>
					<input type="hidden" value="${waitFinHead.id}" id="invoiceId">
					<div class="pro_top_item fl">
						<div class="fl">
							<p class="font14">供应商名称：</p>
							<p class="font20 mg10 copy_text">${waitFinHead.supplyName}</p>
						</div>
					</div>
					<div class="pro_top_item fr">
						<div class="fl">
							<p class="font14">供应商代码：</p>
							<p class="font20 mg10 copy_text">${waitFinHead.supplyCode}</p>
						</div>
					</div>
				</div>
				<!--发票详情列表-->
				<div class="rz_result">
					<div class="ticket_pro_box" id="ticket_pro_box"></div>
				</div>
				
			</div>
		</div>
		<!--main content end-->
		
		<!--footer-->
		<%--<%@ include file="/base/footer.jsp"%>--%>
		<!--footer end-->
	</body>

</html>