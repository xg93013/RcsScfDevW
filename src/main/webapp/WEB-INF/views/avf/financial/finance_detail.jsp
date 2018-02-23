<%--
  User: Wenjun Sun
  Date: 2017/8/30
  Time: 10:24
  des:核心企业、供应商、金融机构查看融资详情
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"
		 contentType="text/html; charset=UTF-8"%>
<%@ include file="/base/header.jsp"%>

<!DOCTYPE html>
<%
	Cookie[] requestCookies = request.getCookies();
	for (Cookie cookie : requestCookies) {
		if (cookie.getName().equalsIgnoreCase("userIdentityType"))
			request.setAttribute("userIdentityType", URLDecoder.decode(cookie.getValue(), "utf-8"));
	}
%>
<html>
	<head>
		<!--xg addcss-->
		<link rel="stylesheet" href="/static/avf/css/commom_heart.css" />
		<link rel="stylesheet" href="/static/avf/css/heart_commpany.css" />

		<script type="text/javascript" src="/static/base/js/public.js" ></script>
		<script type="text/javascript" src="/static/base/js/common.js" ></script>
		<script type="text/javascript" src="/static/avf/js/finance_detail.js" ></script>
		<script type="text/javascript" src="/static/avf/js/refuse_finance.js" ></script>
		<style>
			/*.wyzzk_top_right {*/
			    /*height: 187px;*/
			/*}*/
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
					<li><a href="<c:if test="${userIdentityType == 'ENTERPRISE'}">/avf/invoice/toWaitPage?type=enterprise</c:if><c:if test="${userIdentityType == 'SUPPLIER'}">/avf/invoice/toWaitPage?type=supplier</c:if><c:if test="${userIdentityType == 'FINANCIAL'}">/avf/financingApprove/financingApproveListPage</c:if>">首页</a></li>
					<li>
						<a href="<c:if test="${userIdentityType == 'ENTERPRISE'}">/avf/financingDemand/toDemandPage?type=enterprise</c:if><c:if test="${userIdentityType == 'SUPPLIER'}">/avf/financingDemand/toDemandPage?type=supplier</c:if><c:if test="${userIdentityType == 'FINANCIAL'}">/avf/financingApprove/financingApproveListPage</c:if>">&gt;&nbsp;<c:if test="${userIdentityType == 'FINANCIAL'}">融资审批</c:if><c:if test="${userIdentityType != 'FINANCIAL'}">申请融资</c:if></a>
					</li>
					<li><a href="#">&gt;&nbsp;融资详情</a></li>
				</ul>
			</div>
			<!--tab_list end-->
			<div class="container1200 step_content">
				<div class="wyzzk">
					<div class="wyzzk_top_left fl">
						<div class="whyzzk_company">
							<input type="hidden" id="financingApproveHeadDetailsId" value="${financingApproveHeadDetails.id}">
							<c:if test="${userIdentityType != 'FINANCIAL'}">
								<div class="w360 fl">
									<input id="demandHeadId" type="hidden" value="${financingApproveHeadDetails.id}">
									<span class="span_1">${pbmVerdor.supplyName}</span>
									<span><label>融资需求编号：</label><font>${financingApproveHeadDetails.financingNeedsNo}</font></span>
								</div>
								<div class="w299 fl">
									<span><label><b class="b_1"></b>联系人：</label><font>${pbmVerdor.linkMan}</font></span>
									<span><label><b class="b_3"></b>手机：</label><font>${pbmVerdor.linkManMobile}</font></span>
								</div>
								<div class="fl">
									<span><label><b class="b_2"></b>座机：</label><font class="show_data" name="fontName">${pbmVerdor.linkManTel}</font></span>
									<span><label><b class="b_4"></b>邮箱：</label><font>${pbmVerdor.linkManEmail}</font></span>
								</div>
							</c:if>
							<c:if test="${userIdentityType == 'FINANCIAL'}">
								<div class="w360 fl">
									<input id="refusedId" type="hidden" value="${financingApproveHeadDetails.id}">
									<span><label>供应商名称：</label><font>${pbmVerdor.supplyName}</font><a class="name_detail ml10 supply_detail" data="${pbmVerdor.supplyCode}">详情</a></span>
									<span><label>融资需求编号：</label><font>${financingApproveHeadDetails.financingNeedsNo}</font></span>
								</div>
								<div class="fl">
									<span><label>核心企业名称：</label><font>${financingApproveHeadDetails.companyName}</font><a class="name_detail ml10 company_detail" data="${financingApproveHeadDetails.companyCode}">详情</a></span>
								</div>
							</c:if>
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
					<div class="wyzzk_top_right fr">
						<p class="p_1"><span class="f20 lh30">应<c:if test="${userIdentityType == 'ENTERPRISE'}">付</c:if><c:if test="${userIdentityType == 'SUPPLIER'}">收</c:if><c:if test="${userIdentityType == 'FINANCIAL'}">收</c:if>账款总计 <font>${financingApproveHeadDetails.invoiceTotalNumber}</font> 笔：</span>
							<br/>总金额 <font class="f36 money" data="${financingApproveHeadDetails.invoiceTotalMoney}"></font> <font class="f16">元</font>
						</p>
						<%--<a class="invoice_detail">应<c:if test="${userIdentityType == 'ENTERPRISE'}">付</c:if><c:if test="${userIdentityType == 'SUPPLIER'}">收</c:if><c:if test="${userIdentityType == 'FINANCIAL'}">收</c:if>账款详情<b class="b_invoice"></b></a>--%>
						<%--<p class="p_1"><span class="f20 lh30">发票总计 <font>${financingApproveHeadDetails.invoiceTotalNumber}</font> 张</span>--%>
							<%--<br/>总金额 <font class="f36 money" data="${financingApproveHeadDetails.invoiceTotalMoney}"></font> <font class="f16">元</font>--%>
						<%--</p>--%>
						<a class="invoice_detail">应<c:if test="${userIdentityType == 'ENTERPRISE'}">付</c:if><c:if test="${userIdentityType == 'SUPPLIER'}">收</c:if><c:if test="${userIdentityType == 'FINANCIAL'}">收</c:if>账款详情<b class="b_invoice"></b></a>
						<%--<p class="f16 p_2"><a href="">详细信息>></a></p>--%>
					</div>
				</div>
				<%--<div class="showInfo">--%>
					<%--<div class="showInfo_list">--%>
						<%--<a class="list_1">维护延长账款</a>--%>
						<%--<span></span>--%>
						<%--<a class="list_1_over_over ml_4">收到申请</a>--%>
						<%--<span></span>--%>
						<%--<a class="list_1_over_over ml_4">审核</a>--%>
						<%--<span></span>--%>
						<%--<a class="list_1_over_over ml_4">确认通知单</a>--%>
						<%--<span></span>--%>
						<%--<a class="list_1_over_over ml_4">确认通知单</a>--%>
						<%--<span></span>--%>
						<%--<a class="list_1_over_over ml_4">完成</a>--%>
					<%--</div>--%>
					<%--<div class="showInfo_list_span">--%>
						<%--<span>[核心企业]<font>${pbmCompany.companyShortName}</font></span>--%>
						<%--<span>中征</span>--%>
						<%--<span>${financeDetail.finInsShortName}</span>--%>
						<%--<span>[供应商]${pbmVerdor.supplyShortName}</span>--%>
						<%--<span>[核心企业]<font>${pbmCompany.companyShortName}</font></span>--%>
					<%--</div>--%>
				<%--</div>--%>
				<div class="showInfo">
					<div class="showInfo_list">
						<c:if test="${financingApproveHeadDetails.businessDealStatus <= '2020'}">
							<a class="list_1_over_over">维护延长账款</a>
							<span class="span_1_over"></span>
							<a class="list_1_over_over ml_4">收到申请</a>
							<span class="span_1_over"></span>
							<a class="list_1_over_over ml_4">审核</a>
							<span class="span_1_over"></span>
							<a class="list_1_over_over ml_4">确认通知单</a>
							<span class="span_1_over"></span>
						</c:if>
						<c:if test="${financingApproveHeadDetails.businessDealStatus < '2040' && financingApproveHeadDetails.businessDealStatus > '2020'}">
							<a class="list_1">维护延长账款</a>
							<span class="span_1"></span>
							<a class="list_1_over_over ml_4">收到申请</a>
							<span class="span_1_over"></span>
							<a class="list_1_over_over ml_4">审核</a>
							<span class="span_1_over"></span>
							<a class="list_1_over_over ml_4">确认通知单</a>
							<span class="span_1_over"></span>
						</c:if>
						<c:if test="${financingApproveHeadDetails.businessDealStatus >= '2040' && financingApproveHeadDetails.businessDealStatus < '3010'}">
							<a class="list_1">维护延长账款</a>
							<span class="span_1"></span>
							<a class="list_1 ml_4">收到申请</a>
							<span class="span_1"></span>
							<a class="list_1_over_over ml_4">审核</a>
							<span class="span_1_over"></span>
							<a class="list_1_over_over ml_4">确认通知单</a>
							<span class="span_1_over"></span>
						</c:if>
						<c:if test="${financingApproveHeadDetails.businessDealStatus == '3010'}">
							<a class="list_1">维护延长账款</a>
							<span class="span_1"></span>
							<a class="list_1 ml_4">收到申请</a>
							<span class="span_1"></span>
							<a class="list_1 ml_4">审核</a>
							<span class="span_1"></span>
							<a class="list_1_over_over ml_4">确认通知单</a>
							<span class="span_1_over"></span>
						</c:if>
						<c:if test="${financingApproveHeadDetails	.businessDealStatus >= '4010'}">
							<a class="list_1">维护延长账款</a>
							<span class="span_1"></span>
							<a class="list_1 ml_4">收到申请</a>
							<span class="span_1"></span>
							<a class="list_1 ml_4">审核</a>
							<span class="span_1"></span>
							<a class="list_1 ml_4">确认通知单</a>
							<span class="span_1"></span>
							<a class="list_1 ml_4">确认通知单</a>
							<span class="span_1"></span>
							<a class="list_1 ml_4">完成</a>
						</c:if>
                        <c:if test="${financingApproveHeadDetails	.businessDealStatus < '4010'}">
							<a class="list_2_over_over ml_4">确认通知单</a>
							<span class="span_1_over"></span>
							<a class="list_2_over_over ml_4">完成</a>
						</c:if>

					</div>
					<div class="showInfo_list_span">
						<span>[核心企业]<font>${pbmCompany.companyShortName}</font></span>
						<span>中征</span>
						<span>${financeDetail.finInsShortName}</span>
						<span>[供应商]${pbmVerdor.supplyShortName}</span>
						<span>[核心企业]<font>${pbmCompany.companyShortName}</font></span>
					</div>
					<div class="show_invoice mb20">
						<p class="p_invoice">总计
							<font>${financingApproveHeadDetails.invoiceTotalNumber}</font>笔应<c:if test="${userIdentityType == 'ENTERPRISE'}">付</c:if><c:if test="${userIdentityType == 'SUPPLIER'}">收</c:if><c:if test="${userIdentityType == 'FINANCIAL'}">收</c:if>账款，总金额
							<font class="money" data="${financingApproveHeadDetails.invoiceTotalMoney}">xxx</font>元
						</p>
						<%--<p class="p_invoice">总计--%>
							<%--<font>${financingApproveHeadDetails.invoiceTotalNumber}</font>张发票，总金额--%>
							<%--<font class="money" data="${financingApproveHeadDetails.invoiceTotalMoney}">xxx</font>元--%>
						<%--</p>--%>
						<div class="tab_invoice">
							<div id="showInvoice"></div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
		<!--main content end-->
		<%--<div id="detail" class="overlay" style="display: none;"></div>--%>
		<%--<div id="detailTip" class="loading_tip" style="width:1020px; margin-left: -510px;display: none;">--%>
			<%--<div class="close_name ofh"><b class="b_close cu fr mr15"></b></div>--%>
			<%--<table>--%>
				<%--<tr>--%>
					<%--<td>法定代表人：<font>张燕</font></td>--%>
					<%--<td>核心企业代码：<font>张燕</font></td>--%>
					<%--<td>币种：<font>张燕</font></td>--%>
				<%--</tr>--%>
				<%--<tr>--%>
					<%--<td>所有制性质：<font>张燕</font></td>--%>
					<%--<td>组织机构代码：<font>张燕</font></td>--%>
					<%--<td>基本开户行：<font>张燕</font></td>--%>
				<%--</tr>--%>
				<%--<tr>--%>
					<%--<td>是否上市公司：<font>张燕</font></td>--%>
					<%--<td>征信机构代码：<font>张燕</font></td>--%>
					<%--<td>开户行行号：<font>张燕</font></td>--%>
				<%--</tr>--%>
				<%--<tr>--%>
					<%--<td colspan="3">经营范围：<font>张燕</font></td>--%>
				<%--</tr>--%>
				<%--<tr>--%>
					<%--<td>联系人：<font>张燕</font></td>--%>
					<%--<td>手机：<font>张燕</font></td>--%>
					<%--<td>座机：<font>张燕</font></td>--%>
				<%--</tr>--%>
				<%--<tr>--%>
					<%--<td>邮箱：<font>张燕</font></td>--%>
					<%--<td colspan="2">地址：<font>张燕</font></td>--%>
				<%--</tr>--%>
			<%--</table>--%>
		<%--</div>--%>
		<!--遮罩层开始-->
		<div id="overlay" class="overlay" style="display: none;"></div>  
	    <!-- Loading提示 DIV -->  
	    <div id="loadingTip" class="loading_tip" style="display: none;">  
	     	<div class="loading_content">
	     		<img src="/static/avf/images/icon_1.png"/>
	     		<p style="display: none;"> 请插入电子签章！</p>
	     		<p> <span>电子签章识别成功！</span><br/><span class="time"><font id="second">20</font>s窗口自动关闭</span></p>
	     		<p style="display: none;"> 电子签章识别中...</p>
	     	</div>
	    </div>  
	    <!--遮罩层结束-->
		<!--footer-->
		<%--<%@ include file="/base/footer.jsp"%>--%>
		<!--footer end-->
	</body>
</html>
