<%--
  User: Wenjun Sun
  Date: 2017/8/30
  Time: 10:24
  des:金融机构拒绝融资审批
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
		<script type="text/javascript" src="/static/base/js/public.js" ></script>
		<script type="text/javascript" src="/static/base/js/common.js" ></script>
		<script type="text/javascript" src="/static/avf/js/refuse_finance.js" ></script>
		<script type="text/javascript" src="/static/avf/js/finance_detail.js" ></script>
		<script type="text/javascript">
            EUI.onReady(function() {
                var financeDetail = new EUI.FinanceDetail({
                    renderTo : "showInvoice"
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
									<input type="hidden" id="financingApproveHeadDetailsId" value="${financingApproveHeadDetails.id}">
									<input id="refusedId" type="hidden" value="${financingApproveHeadDetails.id}">
									<span><label>供应商名称：</label><font>${pbmVerdor.supplyName}</font><a class="name_detail ml10 supply_detail" data="${pbmVerdor.supplyCode}">详情</a></span>
									<span><label>融资需求编号：</label><font>${financingApproveHeadDetails.financingNeedsNo}</font></span>
								</div>
								<div class="fl">
									<span><label>核心企业名称：</label><font>${financingApproveHeadDetails.companyName}</font><a class="name_detail ml10 company_detail" data="${financingApproveHeadDetails.companyCode}">详情</a></span>
								</div>
							</div>
							<div class="whyzzk_money">
								<div class="w360 fl">
									<span>意向融资金额(融资比例<font class="round" data="${financingApproveHeadDetails.intentionFmoney/financingApproveHeadDetails.invoiceTotalMoney*100}"></font>%)</span>
									<span><label class="f30 cfd7138 money" data="${financingApproveHeadDetails.intentionFmoney}"></label><font>元</font></span>
									<input type="hidden" id="intentionMoney" value="${financingApproveHeadDetails.intentionFmoney}">
								</div>
								<div class="w299 fl">
									<span class="w330">意向融资期限:</span>
									<%--<span class="w330"><label class="f30 cfd7138 month"  id="month" data="${demandHead.financeStart}" fc-data="${demandHead.financeEnd}">12</label><font>个月（到期日<font class="time" id="endTime" data="${demandHead.financeEnd}"></font>）</font></span>--%>
									<%--</div>--%>
									<span class="w330"><label class="f30 cfd7138 time" data="<c:if test="${financingApproveHeadDetails.businessDealStatus == '2020'}">${financingApproveHeadDetails.intentionFterm}</c:if><c:if test="${financingApproveHeadDetails.businessDealStatus != '2020'}">${financingApproveHeadDetails.financeEnd}</c:if>"></label></span>
								</div>
								<div class="fl">
									<span><label>融  资  银  行：</label><font>${financingApproveHeadDetails.finInsName}</font></span>
									<span><label>银行参考利率：</label><font class="rate" data="${financingApproveHeadDetails.bankRate}"></font>%</span>
								</div>
							</div>
							<div class="whyzzk_explain"><span class="fl"><label>意向融资说明:</label><font>${financingApproveHeadDetails.intentionFremark}</font></span>
								<%--<a class="fr" href="#">详细信息>></a>--%>
							</div>
						</div>
						<div class="wyzzk_top_right fr" style="height: 195px;">
							<p class="p_1"><span class="f20 lh30">应收账款总计 <font>${financingApproveHeadDetails.invoiceTotalNumber}</font> 笔：</span>
								<br/>总金额 <font class="f36 money" data="${financingApproveHeadDetails.invoiceTotalMoney}"></font> <font class="f16">元</font>
							</p>
							<a class="invoice_detail">应收账款详情<b class="b_invoice"></b></a>
							<%--<p class="f16 p_2"><a href="">详细信息>></a></p>--%>
						</div>
					</div>
					<%--显示应收账款详情--%>
					<div class="show_invoice mg20">
						<p class="p_invoice">总计<font>${financingApproveHeadDetails.invoiceTotalNumber}</font>笔应收账款，总金额<font class="money" data="${financingApproveHeadDetails.invoiceTotalMoney}">xxx</font>元</p>
						<div class="tab_invoice">
							<div id="showInvoice"></div>
						</div>
					</div>
					<div class="btn_refuse">
						<div class="btn_submit fl" id="financialSubmit">拒绝</div>
						<div class="btn_1 btn_cancel fl ml20" id="finacialCancel">取消</div>
					</div>
					<div class="refused" style="display:none;">
						<p class="p_1">已拒绝!</p>
						<%--<p class="p_2">【<span>金融机构</span>】<span>用户名E</span>与<span>2017-12-21</span>已拒绝</p>--%>
					</div>
			</div>
		</div>
		<!--footer start-->
		<%--<%@ include file="/base/footer.jsp"%>--%>
		<!--footer end-->
	</body>
</html>
