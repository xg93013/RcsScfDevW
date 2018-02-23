<%--
	User:xionggang
	Date:2017/08/30
	Time:10:20
	des:核心企业还款首页
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"
		 contentType="text/html; charset=UTF-8"%>
<%@ include file="/base/header.jsp"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<!--xg addcss-->
		<link rel="stylesheet" href="/static/avf/css/commom_heart.css" />
		<link rel="stylesheet" href="/static/avf/css/heart_commpany.css" />
		<link rel="stylesheet" href="/static/avf/css/mainView.css" />
		<link rel="stylesheet" href="/static/base/css/fullcalendar.css" />
		<!--xg addjs-->
		<script type="text/javascript" src="/static/base/js/common.js" ></script>
		<script type="text/javascript" src="/static/base/js/public.js" ></script>
		<script type="text/javascript" src="/static/base/js/jquery-ui.custom.min.js" ></script>
		<script type="text/javascript" src="/static/base/js/fullcalendar.js" ></script>
		<script type="text/javascript" src="/static/avf/js/repayment.js" ></script>
		<script>
			EUI.onReady(function(){
				new EUI.Repayment({
					renderTo: "back_money_list",
					cfgId: "BackMoneyForm"
				});
			})
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
					<li><a href="javascript:void(0)">&nbsp;&gt;&nbsp;还款列表</a></li>
				</ul>
			</div>
			<!--tab_list end-->
			
			<div class="container1200 step_content">
					<c:set var="tab_state" scope="session" value="5"/>
					<%@ include file="/base/tab_enterprise.jsp"%>
				<div class="rz_container">
					<div class="re_con_left fl">
						<p>本月累计还款<span id="total_back_num" class="org_color font20">0</span>笔</p>
						<p>累计需还<span id="total_back_money" class="org_color font20">0</span>元    已还<span id="back_money" class="org_color font20">0</span>元</p>
					</div>
					<div class="re_con_right fr">
						<div class="search_module fl">
							<div class="search_blur fl">
								<input type="text" />
								<div class="search_btns"><span class="sxf_btn icon_search"></span></div>
							</div>
							<a href="javascript:void(0)" class="blueBg" id="detail_query">高级查询</a>
							<a href="javascript:void(0)" class="blueBg" id="detail_fresh">刷新</a>
							<a href="javascript:void(0)" id="import_ticket" class="blueBg see_back"><span class="fl">查看还款日历</span><span class="fl sxf_btn icon_downs"></span></a>
						</div>
					</div>
				</div>
				<div class="backMoney_des">
					<div id="calendar"></div>
				</div>
				
				<!--还款清单-->
				<div class="rz_result">
					<div id="back_money_list" ></div>
				</div>
			</div>
			
		</div>
		<!--main content end-->
		
		<!--footer-->
		<%--<%@ include file="/base/footer.jsp"%>--%>
		<!--footer end-->
	</body>
</html>