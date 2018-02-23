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

		<script type="text/javascript" src="/static/base/js/public.js" ></script>
		<script type="text/javascript" src="/static/base/js/common.js" ></script>
	</head>

	<body>		
		<!--top_common-->
		<!--top_common end-->
		
		<!--main content-->
		<div class="main_content">
			<!--tab_list-->
			<div class="container1200">
				<ul class="tab_list">
					<li><a href="/avf/financingApprove/financingApproveListPage">首页</a></li>
					<li><a href="/avf/financingApprove/financingApproveListPage">&gt;&nbsp;融资审批</a></li>
					<li><a href="#">&gt;&nbsp;拒绝融资</a></li>
				</ul>
			</div>
			<!--tab_list end-->
			
			<div class="container1200 step_content">
				<div class="wyzzk">
					<div class="wyzzk_top_left fl">
						<div class="whyzzk_company">
							<div class="w360 fl">
								<input id="refusedId" type="hidden" value="${financingApproveHeadDetails.id}">
								<span class="span_1">${financingApproveHeadDetails.companyName}</span>
								<span><label>融资需求编号：</label><font>${financingApproveHeadDetails.financingNeedsNo}</font></span>
							</div>
							<div class="w299 fl">
								<span><label><b class="b_1"></b>联系人：</label><font>${pbmVerdor.linkMan}</font></span>
								<span><label><b class="b_3"></b>手机：</label><font>${pbmVerdor.linkManMobile}</font></span>
							</div>
							<div class="fl">
								<span><label><b class="b_2"></b>座机：</label><font>${pbmVerdor.linkManTel}</font></span>
								<span><label><b class="b_4"></b>邮箱：</label><font>${pbmVerdor.linkManEmail}</font></span>
							</div>
						</div>
						<div class="whyzzk_money">
							<div class="w360 fl">
								<span>意向融资金额(融资比例<font class="round" data="${financingApproveHeadDetails.intentionFmoney/financingApproveHeadDetails.invoiceTotalMoney*100}"></font>%)</span>
								<span><label class="f30 cfd7138 money" data="${financingApproveHeadDetails.intentionFmoney}"></label><font>元</font></span>
							</div>
							<div class="w299 fl">
								<span class="w330">融资期限:</span>
								<%--<span class="w330"><label class="f30 cfd7138 month" data="${financingApproveHeadDetails.financeStart}" fc-data="${financingApproveHeadDetails.financeEnd}"></label><font>个月</font></span>--%>
							<%--</div>--%>
								<span class="w330"><label class="f30 cfd7138 time" data="${financingApproveHeadDetails.financeEnd}"></label></span>
							</div>
								<div class="fl">
								<span><label>融  资  银  行：</label><font>${financingApproveHeadDetails.finInsName}</font></span>
								<span><label>银行参考利率：</label><font class="rate" data="${financingApproveHeadDetails.bankRate}">${financingApproveHeadDetails.bankRate}</font>%</span>
							</div>
						</div>
						<div class="whyzzk_explain"><span class="fl"><label>意向融资说明:</label><font>${financingApproveHeadDetails.intentionFremark}</font></span>
							<%--<a class="fr" href="#">详细信息>></a>--%>
						</div>
					</div>
					<div class="wyzzk_top_right fr">
						<p class="p_1"><span class="f20 lh30">发票总计(${financingApproveHeadDetails.invoiceTotalNumber}张)：</span><br/><font class="f36 money" data="${financingApproveHeadDetails.invoiceTotalMoney}"></font><font class="f16">元</font></p>
						<%--<p class="f16 p_2"><a href="">详细信息>></a></p>--%>
					</div>
				</div>
				<div class="refused">
					<p class="p_1">已拒绝!</p>
					<%--<p class="p_2">【<span>金融机构</span>】<span>用户名E</span>与<span>2017-12-21</span>已拒绝</p>--%>
				</div>
			
			</div>
			
		</div>
		<!--main content end-->
		<!--footer-->
		<%--<%@ include file="/base/footer.jsp"%>--%>
		<!--footer end-->
	</body>
</html>
