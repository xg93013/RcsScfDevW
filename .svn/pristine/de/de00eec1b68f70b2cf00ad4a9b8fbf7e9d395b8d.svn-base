<%--
  User: allenwong
  Date: 2017/8/14
  Time: 17:24
  des:核心企业确认通知单
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
		<!-- 数字签章的css-->
		<style type="text/css">
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
		<script type="text/javascript" src="/static/base/js/public.js" ></script>
		<script type="text/javascript" src="/static/base/js/common.js" ></script>
		<%--<script type="text/javascript" src="/static/avf/js/del_sheet.js" ></script>--%>
		<script type="text/javascript" src="/static/avf/js/enterprise_sheet.js" ></script>
	</head>
	<body>
		<!--main content-->
		<div class="main_content">
			<!--tab_list-->
			<div class="container1200">
				<ul class="tab_list">
					<li><a href="/avf/invoice/toWaitPage?type=enterprise">首页</a></li>
					<li><a href="/avf/notice/noticesListPage?identityType=ENTERPRISE">&gt;&nbsp;通知单</a></li>
					<li><a href="#">&gt;&nbsp;确认通知单</a></li>
				</ul>
			</div>
			<!--tab_list end-->
			<div class="container1200 step_content">
				<%--<div class="wyzzk">--%>
					<%--<div class="wyzzk_top_left fl">--%>
						<%--<div class="whyzzk_company">--%>
							<%--<div class="w360 fl">--%>

								<%--<span class="span_1">${avfAccountsRecTraNotice.supplyName}</span>--%>
								<%--<span><label>融资需求编号：</label><font>${avfAccountsRecTraNotice.financingNeedsNo}</font></span>--%>
							<%--</div>--%>
							<%--<div class="w299 fl">--%>
								<%--<span><label><b class="b_1"></b>联系人：</label><font>${pbmVerdor.linkMan}</font></span>--%>
								<%--<span><label><b class="b_3"></b>手机：</label><font>${pbmVerdor.linkManMobile}</font></span>--%>
							<%--</div>--%>
							<%--<div class="fl">--%>
								<%--<span><label><b class="b_2"></b>座机：</label><font>${pbmVerdor.linkManTel}</font></span>--%>
								<%--<span><label><b class="b_4"></b>邮箱：</label><font>${pbmVerdor.linkManEmail}</font></span>--%>
							<%--</div>--%>
						<%--</div>--%>
						<%--<div class="whyzzk_money">--%>
							<%--<div class="w360 fl">--%>
								<%--<span>融资金额(融资比例<font class="round" data="${avfAccountsRecTraNotice.financeMoney/avfAccountsRecTraNotice.invoiceTotalMoney*100}"></font>%)</span>--%>
								<%--<span><label class="f30 cfd7138 money" data="${avfAccountsRecTraNotice.financeMoney}"></label><font>元</font></span>--%>
							<%--</div>--%>
							<%--<div class="w299 fl">--%>
								<%--<span class="w330">融资期限:</span>--%>
								<%--<span class="w330"><label class="f30 cfd7138 time"  data="${avfAccountsRecTraNotice.financeEnd}"></label></span>--%>
								<%--&lt;%&ndash;<span class="w330"><label class="f30 cfd7138 month"  data="${avfAccountsRecTraNotice.financeStart}" fc-data="${avfAccountsRecTraNotice.financeEnd}">12</label><font>个月（到期日<font class="time" data="${avfAccountsRecTraNotice.financeEnd}"></font>）</font></span>&ndash;%&gt;--%>
							<%--</div>--%>
							<%--<div class="fl">--%>
								<%--<span><label>融  资  银  行：</label><font>${avfAccountsRecTraNotice.finInsName}</font></span>--%>
								<%--<span><label>银行参考利率：</label><font class="rate" data="${avfAccountsRecTraNotice.bankRate}"></font>%</span>--%>
							<%--</div>--%>
						<%--</div>--%>
						<%--<div class="whyzzk_explain"><span class="fl"><label>意向融资说明:</label><font>${financingDemand.intentionFremark}</font></span>--%>
							<%--&lt;%&ndash;<a class="fr" href="#">详细信息>></a>&ndash;%&gt;--%>
						<%--</div>--%>
					<%--</div>--%>
					<%--<div class="wyzzk_top_right fr">--%>
						<%--<p class="p_1"><span class="f20 lh30">发票总计(${financingDemand.invoiceTotalNumber}张)：</span><br/><font class="f36 money" data="${financingDemand.invoiceTotalMoney}"></font><font class="f16">元</font></p>--%>
						<%--&lt;%&ndash;<p class="f16 p_2"><a href="">详细信息>></a></p>&ndash;%&gt;--%>
					<%--</div>--%>
				<%--</div>--%>
				<%--<div class="showInfo">--%>
					<%--<div class="showInfo_list">--%>
						<%--<a class="list_1 l0 w196">维护延长账款</a>--%>
						<%--<a class="list_2 lf177 w214">收到申请</a>--%>
						<%--<a class="list_2 lf373 w214">审核</a>--%>
						<%--<a class="list_2 lf569 w214">确认通知单</a>--%>
						<%--<a class="list_2_over_over lf766 w214">确认通知单</a>--%>
						<%--<a class="list_3_over_over r0 w192">完成</a>--%>
					<%--</div>--%>
					<%--<div class="showInfo_list_span">--%>
						<%--<span>[核心企业]<font>${avfAccountsRecTraNotice.companyShortName}</font></span>--%>
						<%--<span>中征</span>--%>
						<%--<span>${avfAccountsRecTraNotice.finInsShortName}</span>--%>
						<%--<span>[供应商]${avfAccountsRecTraNotice.supplyShortName}</span>--%>
						<%--<span>[核心企业]<font>${avfAccountsRecTraNotice.companyShortName}</font></span>--%>
					<%--</div>--%>
					<%--<div class="show_sheet">--%>
						<%--<p class="f24 lh60">申请通过，请确认以下应收账款转让通知单！</p>--%>
						<%--<div class="show_sheet_info">--%>
							<%--<div class="show_sheet_info_top">--%>
								<%--<div class="confirm" style="display: none;">--%>
									<%--<img src="/static/avf/images/icon_2.png">--%>
								<%--</div>--%>
								<%--<div class="w288 fl">--%>
									<%--<label>金额：</label>--%>
									<%--<span><font class="font_f30 money" data="${avfAccountsRecTraNotice.financeMoney}"></font><font>元</font></span>--%>
								<%--</div>--%>
								<%--<div class="w294 fl">--%>
									<%--<label>期限：</label>--%>
									<%--&lt;%&ndash;<span class="w307" style="font-size: 20px;"><font class="font_f30 month" data="${avfAccountsRecTraNotice.financeStart}" fc-data="${avfAccountsRecTraNotice.financeEnd}">10</font><font>个月</font></span>&ndash;%&gt;--%>
									<%--<span class="w307" style="font-size: 20px;"><font class="font_f30 cfd7138 term" data="${avfAccountsRecTraNotice.financeStart}" fc-data="${avfAccountsRecTraNotice.financeEnd}"></font></span>--%>
								<%--</div>--%>
								<%--<div class="w176 fl tc">--%>
									<%--<label>起始日：</label>--%>
									<%--<span class="time" data="${avfAccountsRecTraNotice.financeStart}"></span>--%>
								<%--</div>--%>
								<%--<div class="w176 fl tc">--%>
									<%--<label>到期日：</label>--%>
									<%--<span class="time" data="${avfAccountsRecTraNotice.financeEnd}"></span>--%>
								<%--</div>--%>
							<%--</div>--%>
							<%--<div class="show_sheet_info_bottom">--%>
								<%--<span class="w288"><label>平台账款编号：</label><font>${avfAccountsRecTraNotice.platformLedgerNo}</font></span>--%>
								<%--<span class="w490"><label>企业账款编号：</label><font>${avfAccountsRecTraNotice.enterpriseLedgerNo}</font></span>--%>
								<%--<span><label>账款来源：</label><font>${avfAccountsRecTraNotice.ledgerSource}</font></span>--%>
							<%--</div>--%>
						<%--</div>--%>
						<%--<div class="btn_form mt20">--%>
						     <%--<span class="btn_submit" id="agree" style="background-color:#00b9f2;border: 1px solid #00b9f2;" data="${avfAccountsRecTraNotice.id}">同&nbsp;意</span>--%>
					    <%--</div>--%>
					<%--</div>--%>

					<%--<!--<div id='date'></div>-->--%>
				<%--</div>--%>
				<div class="wyzzk">
					<div class="wyzzk_top_left fl">
						<div class="whyzzk_company">
							<div class="w360 fl">
								<input id="demandHeadId" type="hidden" value="${avfAccountsRecTraNotice.id}">
								<span class="span_1">${avfAccountsRecTraNotice.supplyName}</span>
								<span><label>融资需求编号：</label><font>${avfAccountsRecTraNotice.financingNeedsNo}</font></span>
							</div>
							<div class="w299 fl">
								<span><label><b class="b_1"></b>联系人：</label><font>${pbmVerdor.linkMan}</font></span>
								<span><label><b class="b_3"></b>手机：</label><font>${pbmVerdor.linkManMobile}</font></span>
							</div>
							<div class="fl">
								<span><label><b class="b_2"></b>座机：</label><font class="show_data" name="fontName">${pbmVerdor.linkManTel}</font></span>
								<span><label><b class="b_4"></b>邮箱：</label><font>${pbmVerdor.linkManEmail}</font></span>
							</div>
						</div>
						<div class="whyzzk_money">
							<div class="w360 fl">
								<span>意向融资金额(融资比例<font class="round" data="${avfAccountsRecTraNotice.financeMoney/financingDemand.totalMoney*100}"></font>%)</span>
								<span><label class="f30 cfd7138 money" data="${avfAccountsRecTraNotice.financeMoney}"></label><font>元</font></span>
								<input type="hidden" id="intentionMoney" value="${avfAccountsRecTraNotice.financeMoney}">
							</div>
							<div class="w299 fl">
								<span class="w330">意向融资期限:</span>
								<%--<span class="w330"><label class="f30 cfd7138 month"  id="month" data="${demandHead.financeStart}" fc-data="${demandHead.financeEnd}">12</label><font>个月（到期日<font class="time" id="endTime" data="${demandHead.financeEnd}"></font>）</font></span>--%>
								<%--</div>--%>
								<span class="w330"><label class="f30 cfd7138 time" data="<c:if test="${avfAccountsRecTraNotice.businessDealStatus == '2020'}">${avfAccountsRecTraNotice.intentionFterm}</c:if><c:if test="${avfAccountsRecTraNotice.businessDealStatus != '2020'}">${avfAccountsRecTraNotice.financeEnd}</c:if>"></label></span>
							</div>
							<div class="fl">
								<span><label>融  资  银  行：</label><font>${avfAccountsRecTraNotice.finInsName}</font></span>
								<span><label>银行参考利率：</label><font class="rate" data="${avfAccountsRecTraNotice.bankRate}"></font>%</span>
							</div>
						</div>
						<div class="whyzzk_explain"><span class="fl"><label>意向融资说明:</label><font>${financingDemand.intentionFremark}</font></span>
							<%--<a class="fr" href="#">详细信息>></a>--%>
						</div>
					</div>
					<div class="wyzzk_top_right fr">
						<p class="p_1">
                            <c:if test="${avfAccountsRecTraNotice.invoiceTotalNumber != 0}">
							    <span class="f20 lh30">发票总计 <font>${avfAccountsRecTraNotice.invoiceTotalNumber}</font> 张：</span>
                            </c:if>
							<br/>总金额 <font class="f36 money" data="${financingDemand.totalMoney}"></font> <font class="f16">元</font>
						</p>
                        <c:if test="${avfAccountsRecTraNotice.invoiceTotalNumber != 0}">
						    <a class="invoice_detail">发票详情<b class="b_invoice"></b></a>
                        </c:if>
						<%--<p class="f16 p_2"><a href="">详细信息>></a></p>--%>
					</div>
				</div>
				<div class="showInfo">
					<div class="showInfo_list">
						<a class="list_1">维护延长账款</a>
						<span class="span_1"></span>
						<a class="list_2 ml_4">收到申请</a>
						<span class="span_1"></span>
						<a class="list_2 ml_4">审核</a>
						<span class="span_1"></span>
						<a class="list_2 ml_4">确认通知单</a>
						<span class="span_1"></span>
						<a class="list_2_over_over ml_4">确认通知单</a>
						<span class="span_1_over"></span>
						<a class="list_3_over_over ml_4">完成</a>
					</div>
					<div class="showInfo_list_span">
						<span>[核心企业]<font>${avfAccountsRecTraNotice.companyShortName}</font></span>
						<span>中征</span>
						<span>${avfAccountsRecTraNotice.finInsShortName}</span>
						<span>[供应商]${avfAccountsRecTraNotice.supplyShortName}</span>
						<span>[核心企业]<font>${avfAccountsRecTraNotice.companyShortName}</font></span>
					</div>
					<div class="show_sheet">
						<p class="f24 lh60">申请通过，请确认以下应收账款转让通知单！</p>
						<div class="show_sheet_info">
							<div class="show_sheet_info_top">
								<div class="confirm" style="display: none;">
									<img src="/static/avf/images/icon_2.png">
								</div>
								<div class="w288 fl">
									<label>金额：</label>
									<span><font class="font_f30 money" data="${avfAccountsRecTraNotice.financeMoney}"></font><font>元</font></span>
								</div>
								<div class="w294 fl">
									<label>期限：</label>
									<%--<span class="w307" style="font-size: 20px;"><font class="font_f30 month" data="${avfAccountsRecTraNotice.financeStart}" fc-data="${avfAccountsRecTraNotice.financeEnd}">10</font><font>个月</font></span>--%>
									<span class="w307" style="font-size: 20px;"><font class="font_f30 term" data="${avfAccountsRecTraNotice.financeStart}" fc-data="${avfAccountsRecTraNotice.financeEnd}"></font></span>
								</div>
								<div class="w176 fl tc">
									<label>起始日：</label>
									<span class="time" data="${avfAccountsRecTraNotice.financeStart}"></span>
								</div>
								<div class="w176 fl tc">
									<label>到期日：</label>
									<span class="time" data="${avfAccountsRecTraNotice.financeEnd}"></span>
								</div>
							</div>
							<div class="show_sheet_info_bottom">
								<span class="w288"><label>平台账款编号：</label><font>${avfAccountsRecTraNotice.platformLedgerNo}</font></span>
								<span class="w490"><label>企业账款编号：</label><font>${avfAccountsRecTraNotice.enterpriseLedgerNo}</font></span>
								<span><label>账款来源：</label><font>${avfAccountsRecTraNotice.ledgerSource}</font></span>
							</div>
						</div>
						<div class="btn_form mt20">
							<span class="btn_submit" id="agree" style="background-color:#FF7043;border: 1px solid #FF7043;" data="${avfAccountsRecTraNotice.id}">通&nbsp;过</span>
							<%--<span class="btn_cancel" id="accountCancel">取消</span>--%>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--遮罩层开始-->
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
		<%--<div class="footer">--%>
			<%--<p>绵阳市高新区XXXXX</p>--%>
			<%--<p>@速信融版权所有</p>--%>
		<%--</div>--%>
		<!--footer end-->
	</body>
</html>