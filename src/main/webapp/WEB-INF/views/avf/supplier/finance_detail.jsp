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
	<script type="text/javascript" src="/static/avf/js/finance_detail.js" ></script>
	<style>
		.wyzzk_top_right {
			height: 187px;
		}
		.show_sheet_info_bottom{
			border-bottom: 1px dashed #bfbfbf;
			border-top:0px;
		}
		.show_sheet_info_top label, .show_sheet_info_top span {
			display: inline-block;
		}
		.show_sheet_info_top {
			height: auto;
		}
		<!-- 数字签章的css-->
		.objCss{
			Z-INDEX: 999;
			POSITION: absolute;
			left:1180px;
			top:360px;
			WIDTH: 200px;
			HEIGHT:200px
		}
		@media screen and (max-width: 1400px) {
			.objCss{
				Z-INDEX: 999;
				POSITION: absolute;
				left:980px;
				top:360px;
				WIDTH: 200px;
				HEIGHT:200px
			}
		}
	</style>
	<script type="text/javascript">
        EUI.onReady(function() {
            var financeDetail = new EUI.FinanceDetail({
                renderTo : "showInvoice"
            });

        });
	</script>

</head>

<body>
<!--top_common-->
<!--top_common end-->

<!--main content-->
<div class="main_content">
	<!--tab_list-->
	<div class="container1200">
		<ul class="tab_list">
			<li><a href="/avf/invoice/toWaitPage?type=supplier">首页</a></li>
			<li><a href="/avf/notice/noticesListPage?identityType=SUPPLIER">&gt;&nbsp;通知单</a></li>
			<li><a href="#">&gt;&nbsp;通知单详情</a></li>
		</ul>
	</div>
	<!--tab_list end-->

	<div class="container1200 step_content">
		<div class="wyzzk">
			<div class="wyzzk_top_left fl">
				<div class="whyzzk_company">
					<div class="w360 fl">
						<input id="financingApproveHeadDetailsId" type="hidden" value="${financingDemand.id}">
						<span class="span_1">${pbmVerdor.supplyName}</span>
					</div>
					<div class="w299 fl">
						<span><label>供应商：</label><font>${pbmVerdor.supplyName}</font></span>
					</div>
					<div class="fl">
						<span><label>到期日：</label><font class="time" data="${avfAccountsRecTraNotice.financeEnd}"></font></span>
					</div>
				</div>
				<div class="whyzzk_money">
					<div class="w360 fl">
						<span>开户行名称:</span>
						<span><label class="f20">${pbmVerdor.basicAccountBankName}</label></span>
					</div>
					<div class="w299 fl">
						<span class="w330">账户名称:</span>
						<span class="w330"><label class="f20">${pbmVerdor.basicAccountName}</label></span>
					</div>
					<div class="fl">
						<span>账号:</span>
						<span><label class="f20">${pbmVerdor.basicAccount}</label></span>
					</div>
				</div>
			</div>
			<div class="wyzzk_top_right fr">
				<p class="p_1"><span class="f20 lh30">发票总计(${avfAccountsRecTraNotice.invoiceTotalNumber}张)：</span><br/><font class="f36 money"  data="${avfAccountsRecTraNotice.invoiceTotalMoney}"></font><font class="f16">元</font></p>
			</div>
		</div>
		<div class="show_sheet_info  mg20">
			<div class="show_sheet_info_bottom col_font30">
				${avfAccountsRecTraNotice.finInsName}
			</div>
			<div class="show_sheet_info_top bank_info">
				<div><label>发票总金额：</label><span class="money" data="${avfAccountsRecTraNotice.invoiceTotalMoney}"></span><font>元</font></div>
				<div><label>融资金额：</label><span class="money" data="${financingDemand.intentionFmoney}"></span><font>元</font></div>
				<div><label>融资比例：</label><span class="rate" data="${financingDemand.intentionFmoney/avfAccountsRecTraNotice.invoiceTotalMoney}"></span><font>%</font></div>
				<div><label>融资期限：</label><span class="time" data="${financingDemand.financeEnd}"></span></div>
				<%--<div><label>融资期限：</label><span class="month" data="${financingDemand.financeStart}" fc-data="${financingDemand.financeEnd}"></span><font>个月</font></div>--%>
				<div style="width:100%;"><label>银行参考利率：</label><span class="rate" data="${avfAccountsRecTraNotice.bankRate}"></span><font>%</font></div>
				<div style="width:100%;"><label>意向融资备注：</label><span>${financingDemand.intentionFremark}</span></div>
			</div>

		</div>
		<div class="show_sheet_info  mg20 bank_finance">
			<p>
				<span><label>供方联系人：</label><font>${pbmVerdor.linkMan}</font></span>
				<span><label>供方联系人电话：</label><font>${pbmVerdor.linkManTel}</font></span>
			</p>
			<p>
				<span><label>供方联系人手机：</label><font>${pbmVerdor.linkManMobile}</font></span>
				<span><label>供方联系人邮箱：</label><font>${pbmVerdor.linkManEmail}</font></span>
			</p>
		</div>
		<div class="showInfo">
			<div class="showInfo_list">
				<c:if test="${financingApproveHeadDetails.businessDealStatus <= '2020'}">
					<a class="list_1 l0 w196">维护延长账款</a>
					<a class="list_2_over_over lf177 w214">收到申请</a>
					<a class="list_2_over_over lf373 w214">审核</a>
					<a class="list_2_over_over lf569 w214">确认通知单</a>
				</c:if>
				<c:if test="${financingApproveHeadDetails.businessDealStatus < '2040' && financingApproveHeadDetails.businessDealStatus > '2020'}">
					<a class="list_1_over l0 w196">维护延长账款</a>
					<a class="list_2 lf177 w214">收到申请</a>
					<a class="list_2_over_over lf373 w214">审核</a>
					<a class="list_2_over_over lf569 w214">确认通知单</a>
				</c:if>
				<c:if test="${financingApproveHeadDetails.businessDealStatus >= '2040' && financingApproveHeadDetails.businessDealStatus < '3010'}">
					<a class="list_1_over l0 w196">维护延长账款</a>
					<a class="list_2_over lf177 w214">收到申请</a>
					<a class="list_2 lf373 w214">审核</a>
					<a class="list_2_over_over lf569 w214">确认通知单</a>
				</c:if>
				<c:if test="${financingApproveHeadDetails.businessDealStatus == '3010'}">
					<a class="list_1_over l0 w196">维护延长账款</a>
					<a class="list_2_over lf177 w214">收到申请</a>
					<a class="list_2_over lf373 w214">审核</a>
					<a class="list_2 lf569 w214">确认通知单</a>
				</c:if>
				<a class="list_2_over_over lf766 w214">确认通知单</a>
				<a class="list_3_over_over r0 w192">完成</a>
			</div>
			<div class="showInfo_list_span">
				<span>[核心企业]<font>${avfAccountsRecTraNotice.companyShortName}</font></span>
				<span>中征</span>
				<span>${avfAccountsRecTraNotice.finInsShortName}</span>
				<span>[供应商]${pbmVerdor.supplyShortName}</span>
				<span>[核心企业]<font>${avfAccountsRecTraNotice.companyShortName}</font></span>
			</div>
			<div class="show_invoice">
				<p class="p_invoice">总计<font>${avfAccountsRecTraNotice.invoiceTotalNumber}</font>张发票，发票总金额<font class="money" data="${avfAccountsRecTraNotice.invoiceTotalMoney}">xxx</font>元</p>
				<div class="tab_invoice">
					<div id="showInvoice"></div>
				</div>
			</div>

			<!--<div id='date'></div>-->
		</div>
	</div>

</div>
<!--main content end-->
<!-- 加载数字签章的控件-->
<FORM name=AztSignSealFrom action="">
	<OBJECT class="objCss"
			id=AztWebSignSealkeyPublic
			classid=clsid:07121F49-A0DC-4EBD-A2A2-A0A71DC6FDB9></OBJECT>
	<DIV style="POSITION: absolute; WIDTH: 200px; HEIGHT: 200px"
		 id=jfdiv bgcolor="#ffffff"></DIV>
</FORM>
<!--遮罩层结束-->
<!--footer-->
<%--<%@ include file="/base/footer.jsp"%>--%>
<!--footer end-->
</body>
</html>
