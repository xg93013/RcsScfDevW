<%--
  User: Wenjun Sun
  Date: 2017/8/30
  Time: 10:24
  des:核心企业维护延长账款
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
		<link rel="stylesheet" href="/static/avf/css/update_eui.css" />
		<script type="text/javascript" src="/static/base/js/common.js" ></script>
		<script type="text/javascript" src="/static/base/js/public.js" ></script>
		<script type="text/javascript" src="/static/avf/js/extend_account.js" ></script>
		<style>
			.ux-line-row{
				display: inline-block;
				width: 400px;
			}
		</style>
		<script type="text/javascript">
			EUI.onReady(function() {
				new EUI.ExtendAccount({
					renderTo : "showInfoForm",		 
				});
			});
		</script>
	</head>
	<body>
		<!--main content-->
		<div class="main_content">
			<!--tab_list-->
			<div class="container1200">
				<ul class="tab_list">
					<li><a href="/avf/invoice/toWaitPage?type=enterprise">首页</a></li>
					<li><a href="/avf/financingDemand/toDemandPage?type=enterprise">&gt;&nbsp;申请融资</a></li>
					<li><a href="#">&gt;&nbsp;维护延长账款</a></li>
				</ul>
			</div>
			<!--tab_list end-->
			<div class="container1200 step_content">
				<div class="wyzzk">
					<div class="wyzzk_top_left fl">
						<div class="whyzzk_company">
							<div class="w360 fl">
								<input id="demandHeadId" type="hidden" value="${demandHead.id}">
								<span class="span_1">${demandHead.supplyName}</span>
								<span><label>融资需求编号：</label><font>${demandHead.financingNeedsNo}</font></span>
							</div>
							<div class="w299 fl">
								<span><label><b class="b_1"></b>联系人：</label><font>${verdor.linkMan}</font></span>
								<span><label><b class="b_3"></b>手机：</label><font>${verdor.linkManMobile}</font></span>
							</div>
							<div class="fl">			
								<span><label><b class="b_2"></b>座机：</label><font class="show_data" name="fontName">${verdor.linkManTel}</font></span>
								<span><label><b class="b_4"></b>邮箱：</label><font>${verdor.linkManEmail}</font></span>
							</div>
						</div>
						<div class="whyzzk_money">
							<div class="w360 fl">
								<span>意向融资金额(融资比例<font class="round" data="${demandHead.intentionFmoney/demandHead.totalMoney*100}"></font>%)</span>
								<span><label class="f30 cfd7138 money" data="${demandHead.intentionFmoney}"></label><font>元</font></span>
								<input type="hidden" id="intentionMoney" value="${demandHead.intentionFmoney}">
							</div>
							<div class="w299 fl">
								<span class="w330">意向融资期限:</span>
								<%--<span class="w330"><label class="f30 cfd7138 month"  id="month" data="${demandHead.financeStart}" fc-data="${demandHead.financeEnd}">12</label><font>个月（到期日<font class="time" id="endTime" data="${demandHead.financeEnd}"></font>）</font></span>--%>
							<%--</div>--%>
								<span class="w330"><label class="f30 cfd7138 time" data="<c:if test="${demandHead.businessDealStatus == '2020'}">${demandHead.intentionFterm}</c:if><c:if test="${demandHead.businessDealStatus != '2020'}">${demandHead.financeEnd}</c:if>"></label></span>
							</div>
							<div class="fl">						
								<span><label>融  资  银  行：</label><font>${demandHead.finInsName}</font></span>
								<span><label>银行参考利率：</label><font class="rate" data="${demandHead.bankRate}"></font>%</span>
							</div>
						</div>
						<div class="whyzzk_explain"><span class="fl"><label>意向融资说明:</label><font>${demandHead.intentionFremark}</font></span>
							<%--<a class="fr" href="#">详细信息>></a>--%>
						</div>
					</div>
					<div class="wyzzk_top_right fr">
						<p class="p_1">
							<c:if test="${demandHead.invoiceTotalNumber != 0}">
								<span class="f20 lh30">发票总计 <font>${demandHead.invoiceTotalNumber}</font> 张：</span>
							</c:if>
							<br/>总金额 <font class="f36 money" data="${demandHead.totalMoney}"></font> <font class="f16">元</font>
						</p>
						<c:if test="${demandHead.invoiceTotalNumber != 0}">
							<a class="invoice_detail">发票详情<b class="b_invoice"></b></a>
						</c:if>
						<%--<p class="f16 p_2"><a href="">详细信息>></a></p>--%>
					</div>
				</div>
				<div class="showInfo">
					<div class="showInfo_list">
						<a class="list_1_over_over">维护延长账款</a>
						<span class="span_1_over"></span>
						<a class="list_2_over_over ml_4">收到申请</a>
						<span class="span_1_over"></span>
						<a class="list_2_over_over ml_4">审核</a>
						<span class="span_1_over"></span>
						<a class="list_2_over_over ml_4">确认通知单</a>
						<span class="span_1_over"></span>
						<a class="list_2_over_over ml_4">确认通知单</a>
						<span class="span_1_over"></span>
						<a class="list_3_over_over ml_4">完成</a>
					</div>
					<div class="showInfo_list_span">
						<span>[核心企业]<font>${demandHead.companyShortName}</font></span>
						<span>中征</span>
						<span>${demandHead.finInsShortName}</span>
						<span>[供应商]${demandHead.supplyShortName}</span>
						<span>[核心企业]<font>${demandHead.companyShortName}</font></span>
					</div>
					<div class="radio">
						<p><b class="radio_2" data="0"></b><span><font>同意</font>意向融资金额和期限</span></p>
						<p><b class="radio_1" data="1"></b><span><font>修改</font>意向融资金额或期限</span></p>
						<input type="hidden" id="financeEnd" value="<c:if test="${demandHead.businessDealStatus == '2020'}">${demandHead.intentionFterm}</c:if><c:if test="${demandHead.businessDealStatus != '2020'}">${demandHead.financeEnd}</c:if>">
					</div>
					<div id="showInfoForm">
						
					</div>
					<div class="btn_form">
						<span class="btn_submit ml10" id = "applyAccount"><b></b>提&nbsp;交</span>
						<span class="btn_cancel" id="accountCancel">取消</span>
					</div>
				</div>
			</div>
		</div>
		<!--footer-->
		<%--<%@ include file="/base/footer.jsp"%>--%>
		<!--footer end-->
	</body>
</html>
