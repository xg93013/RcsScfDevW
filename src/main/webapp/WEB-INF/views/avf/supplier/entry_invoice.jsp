<%--
	User:xionggang
	Date:2017/08/30
	Time:10:20
	des:供应商录入发票
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

	<!--xg js-->
	<script type="text/javascript" src="/static/base/js/public.js" ></script>
	<script type="text/javascript" src="/static/base/js/common.js" ></script>
	<script type="text/javascript" src="/static/avf/js/entry_invoice.js" ></script>

	<script>
        EUI.onReady(function() {
            new EUI.EntryInvoice({
                renderTo : "supplyticket_box",
                topRenderTo:"ticket_form_2",
                ComboBoxCode:"companyCode",//下拉列表code
                ComboBoxName:"companyName",//下拉列表name
                labelName:"核心企业",
                ComboBoxUrl:"/avf/financingRelConfigure/findRelBySupplyCode.json",//下拉列表url
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
			<li>首页</li>
			<li><a href="/avf/invoice/toWaitPage?type=supplier">&nbsp;&gt;&nbsp;准备发票</a></li>
			<li><a href="javascript:void(0)">&nbsp;&gt;&nbsp;录入发票</a></li>
		</ul>
	</div>
	<!--tab_list end-->

	<div class="container1200 step_content">
		<!--<div id="ticket_form" style="height: 300px;"></div>-->
		<div class="ticket_form_top">
			<div class="ticket_form_l fl" id="ticket_form_2"></div>
			<div class="ticket_form_r fr">
				<div class="submit_ticket">
					<p class="font20 zk_sum">应付账款合计：<span class="font30 tax_money org_color">0</span>元</p>

				</div>
			</div>
		</div>
		<div class="ticket_form_mid">

			<div id="ticket_box_list">
				<div class="ticket_search_box">
					<input type="text" placeholder="发票代码/号码/发票金额/开票日期" class="search_txt" id="search_txt" />
					<input type="button" id="search_bt" class="sxf_btn icon_search search_bt" />
				</div>
				<div class="ticket_list_title">
					<span class="span_w20 text_over">发票代码</span>
					<span class="span_w20 text_over">发票号码</span>
					<span class="span_w20 text_over">价税合计</span>
					<span class="span_w20 text_over">开票日期</span>
					<span class="span_w20 text_over hidden">操作</span>
					<div class="close_ico"></div>
				</div>
				<div class="tickets_list" id="tickets_list">
					<!--<div class="ticket_item">
                        <span class="span_w40 text_over">xgxgx/ad123123</span>
                        <span class="span_w30 text_over">245435</span>
                        <span class="span_w30 text_over">2014-02-23</span>
                        <div class="close_ico"></div>
                    </div>-->
				</div>
			</div>
			<div class="ticket_form_midl fl">
				<%--<p class="ticket_count"><label>发票数量：</label>发票已添加<span class="end_num">0</span>张</p>--%>
				<div id="supplyticket_box"></div>
				<div class="ticket_btn_box fr">
					<div id="reset_btn" class="reset_btn fl">清空</div>
					<div id="submit_btn" class="submit_btn fl"><span class="sxf_btn icon_add ml24"></span><span>添加</span></div>
				</div>
			</div>
			<div class="clear"></div>
			<div class="ticket_btn">
				<div id="submit_ticket_form" class="submit_ticket_form">提交</div>
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