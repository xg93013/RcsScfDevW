<%--
  User: Wenjun Sun
  Date: 2017/8/30
  Time: 10:24
  des:核心企业通知单
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
		<!--xg addjs-->
		<script type="text/javascript" src="/static/base/js/common.js" ></script>
		<script type="text/javascript" src="/static/base/js/public.js" ></script>
		<script type="text/javascript" src="/static/avf/js/sheet.js" ></script>
		<style>
			.off_state p {
				display: block;
			}
		</style>
		<script type="text/javascript">
			EUI.onReady(function() {
				var sheet = new EUI.Sheet({
					renderTo : "rzSheet",
                    renderTo1 : "rzTrade",
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
					<li><a href="#">&gt;&nbsp;通知单</a></li>
				</ul>
			</div>
			<!--tab_list end-->
			<div class="container1200 step_content">
				<c:set var="tab_state" scope="session" value="4"/>
				<%@ include file="/base/tab_enterprise.jsp"%>
				<div class="container1188 rz_result">
					<div class="rz_p">
						<p class="fl">待确认: <span class="org_color">${needConfirmQuota} </span>项</p>
						<ul class="ul_sheet ml10"><li class="bac" data="0">通知单</li><li class="bor_b0" data="1">成交单</li></ul>
						<div class="search_module fr">
							<div class="search_blur fl">
								<input type="text" />
								<div class="search_btns"><span class="sxf_btn icon_search"></span></div>
							</div>
							<a href="javascript:void(0)" class="blueBg" id="detail_query">高级查询</a>
							<a href="javascript:void(0)" class="blueBg" id="detail_fresh">刷新</a>
						</div>
						<%--<span class="trade_ticket btn fr  mt15">放款成交单（<font>9</font>）</span>--%>
					</div>
					<div>
						<div id="rzSheet"></div>
						<div id="rzTrade" style="display: none;"></div>
					</div>
				</div>
			</div>
		</div>
		<!--footer-->
		<%--<%@ include file="/base/footer.jsp"%>--%>
		<!--footer end-->
	</body>
</html>
