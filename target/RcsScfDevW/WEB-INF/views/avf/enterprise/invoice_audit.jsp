<%--
	User:xionggang
	Date:2017/08/30
	Time:10:10
	des:核心企业录入发票审核
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
		<script type="text/javascript" src="/static/base/js/public.js" ></script>
		<script type="text/javascript" src="/static/base/js/common.js" ></script>
		<script type="text/javascript" src="/static/base/js/jquery.zclip.min.js" ></script>
		<script type="text/javascript" src="/static/avf/js/invoice_audit.js" ></script>

		<script>
			EUI.onReady(function() {
//			    var docNo = EUI.util.getUrlParam("docNo");
			    var invoiceId = document.getElementById("invoiceId").value;
			    var docNo = document.getElementById("DocNum").value;
				new EUI.InvoiceAudit({
					renderTo: "checkTicket",
					cfgId: "AuditTable",
                    docNo:docNo,
                    invoiceId:invoiceId
				});
			});
		</script>
		<%--<title>融资管理平台</title>--%>
	</head>

	<body>
		<!--main content-->
		<div class="main_content">
			<!--tab_list-->
			<div class="container1200">
				<ul class="tab_list">
					<li><a href="/avf/invoice/toWaitPage?type=enterprise">首页</a></li>
					<li><a href="/avf/invoice/toWaitPage?type=enterprise">&nbsp;&gt;&nbsp;准备发票</a></li>
					<li><a href="javascript:void(0)">&nbsp;&gt;&nbsp;发票审核</a></li>
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
							<p class="font14">供应商：</p>
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
				<div class="rz_result"><div id="checkTicket" class="checkTicket"></div></div>
				<div class="bordert_box">
					<div class="line_item"><input type="radio" name="check_radio" id="pass" class="radio_box" value="1020" checked="checked"/><label for="pass" class="lbl_txt">通过</label></div>
					<div class="line_item">
						<input type="radio" name="check_radio" class="radio_box" id="nopass" value="1011"/>
						<label for="nopass" class="lbl_txt">不通过</label>
						<select class="normal_text" id="check_items">
							<option value="0">请选择</option>
							<option value="1">原因1</option>
							<option value="2">原因2</option>
							<option value="3">原因3</option>
						</select>
						<input type="text" name="pass" placeholder="请输入您的原因" class="normal_text" id="otherRea"/>
					</div>
					<div class="ticket_btn_box fl">
						<div id="check_btn" class="submit_btn check_btn fl">提交</div>
					</div>
				</div>
			</div>
		</div>
		<!--main content end-->

		<%--<%@ include file="/base/footer.jsp"%>--%>
	</body>

</html>