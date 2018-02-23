<%--
  User: Wenjun Sun
  Date: 2017/8/30
  Time: 10:24
  des:供应商申请融资
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"
		 contentType="text/html; charset=UTF-8"%>
<%@ include file="/base/base.jsp"%>
<%@ include file="/base/header.jsp"%>
<!DOCTYPE html>
<html>
	<head>
		<!--xg addcss-->
		<link rel="stylesheet" href="/static/avf/css/mainView.css" />
		<link rel="stylesheet" href="/static/avf/css/commom_heart.css" />
		<link rel="stylesheet" href="/static/avf/css/heart_commpany.css" />
		<!--xg addjs-->
		<script type="text/javascript" src="/static/base/js/public.js" ></script>
		<script type="text/javascript" src="/static/base/js/common.js" ></script>
		<script type="text/javascript" src="/static/avf/js/apply_finance_sup.js" ></script>
		<style>
			.supply_rz_nav a.tab_01 {
			    background: url(/static/avf/images/tab_bg1.png) center no-repeat;
			    width: 314px;
			    left: 0;
			    z-index: 9;
			}
			.off_state p {
			    display: block;
			}
		</style>
		<script type="text/javascript">
			EUI.onReady(function() {
				var applyFinance2 = new EUI.ApplyFinance2({
					renderTo : "rzFinance",
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
					<li><a href="/avf/invoice/toWaitPage?type=supplier">首页</a></li>
					<li><a href="/avf/invoice/toWaitPage?type=supplier">&nbsp;&gt;&nbsp;申请融资</a></li>
				</ul>
			</div>
			<!--tab_list end-->
			<div class="container1200 step_content">
				<c:set var="tab_state" scope="session" value="3"/>
				<%@ include file="/base/tab_supplier.jsp"%>
				<div class="rz_container">
					<p class="company_p">${demandNumber.supplyName}</p>
					<div class="re_con_left fl">
						<p>待审核：<span class="org_color f20" id="bideNumber">${demandNumber.bideNumber}</span>项</p>
						<%--<p>已通过：<span class="org_color">${demandNumber.confirmNumber}</span>项</p>--%>
						<p>已驳回：<span class="org_color f20">${demandNumber.feedbackNumber}</span>项</p>
						<p>剩余额度：<span class="org_color money f20" data="${demandNumber.totalMoney}"></span>元</p>
					</div>
					<div class="re_con_right fr ml10">
						<div class="re_conr_items"><div class="dr_ticket" id="startFinance"><em></em><span>新增融资</span></div></div>
					</div>
					<div class="search_module fr">
						<div class="search_blur fl">
							<input type="text" />
							<div class="search_btns"><span class="sxf_btn icon_search"></span></div>
						</div>
						<a href="javascript:void(0)" class="blueBg" id="detail_query">高级查询</a>
						<a href="javascript:void(0)" class="blueBg" id="detail_fresh">刷新</a>
					</div>
				</div>
				<div class="rz_result">
					<div id="rzFinance"></div>
				</div>
			</div>
		</div>
		<!--main content end-->
		<!--footer-->
		<%--<%@ include file="/base/footer.jsp"%>--%>
		<!--footer end-->
	</body>
</html> 