<%--
	User:xionggang
	Date:2017/08/30
	Time:10:10
	des:核心企业发票准备
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"
		 contentType="text/html; charset=UTF-8"%>
<%@ include file="/base/header.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<!--xg addcss-->
	<link rel="stylesheet" href="/static/avf/css/commom_heart.css" />
	<link rel="stylesheet" href="/static/avf/css/heart_commpany.css" />
	<link rel="stylesheet" href="/static/avf/css/mainView.css" />

	<!--xg addjs-->
	<%--<script type="text/javascript" src="/static/base/js/jquery-2.0.0.min.js" ></script>--%>
	<script type="text/javascript" src="/static/base/js/public.js" ></script>
	<script type="text/javascript" src="/static/base/js/common.js" ></script>
	<script type="text/javascript" src="/static/avf/js/invoice_prepare.js" ></script>
	<script>
        EUI.onReady(function() {
            new EUI.InvoicePrepare({
                renderTo: "rz_box",
                cfgId: "InvoicePre1"
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
		</ul>
	</div>
	<!--tab_list end-->

	<div class="container1200 step_content">
		<c:set var="tab_state" scope="session" value="1"/>
		<%@ include file="/base/tab_enterprise.jsp"%>
		<div class="rz_container">
			<div class="re_con_left fl">
				<p>待审核：<span class="font20 org_color bideNumber">${waitNumber.bideNumber}</span>项</p>
				<%--<p>供应商：<span>${waitNumber.supplyNumber}</span>项</p>--%>
				<p>总金额：<span class="font20 money org_color totalMoney" data="${waitNumber.totalMoney}"></span>元</p>
			</div>
			<div class="re_con_right fr">
				<div class="search_module fl">
					<div class="search_blur fl">
						<input type="text" />
						<div class="search_btns"><span class="sxf_btn icon_search"></span></div>
					</div>
					<a href="javascript:void(0)" class="blueBg" id="detail_query">高级查询</a>
					<a href="javascript:void(0)" class="blueBg" id="detail_fresh">刷新</a>
				</div>
				<div class="prpare_btn fl">
					<a href="javascript:void(0)"  id="import_model" class="blueBg">下载文件模板</a>
					<a href="/avf/invoice/toAddInvoice?type=enterprise"  id="input_invoice" class="orgBg">手动录入发票</a>
					<a href="javascript:void(0)" id="import_ticket" class="btns">导入发票</a>
				</div>
			</div>
		</div>
		<div class="rz_result">
			<div id="rz_box" ></div>
		</div>
	</div>
	<%--<div class="black_win blackCom"></div>--%>
</div>
<!--main content end-->

<%--<%@ include file="/base/footer.jsp"%>--%>
</body>
</html>