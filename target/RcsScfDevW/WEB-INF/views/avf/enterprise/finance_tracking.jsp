<%--
	User:xionggang
	Date:2017/08/30
	Time:10:10
	des:核心企业融资跟踪
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
	<link rel="stylesheet" href="/static/avf/css/mainView.css" />

	<!--xg addjs-->
	<%--<script type="text/javascript" src="/static/base/js/jquery-2.0.0.min.js" ></script>--%>
	<script type="text/javascript" src="/static/base/js/public.js" ></script>
	<script type="text/javascript" src="/static/base/js/common.js" ></script>
	<script type="text/javascript" src="/static/avf/js/finance_track.js" ></script>
	<script type="text/javascript">
        EUI.onReady(function() {
            var Finance_track = new EUI.Finance_track({
                renderTo : "finance_track",
                cfgId:"financeTrackTable"
            });
        });
	</script>
	<title></title>
	</head>

	<body>
		<div class="main_content">
			<!--tab_list-->
			<div class="container1200">
				<ul class="tab_list">
					<li><a href="/avf/invoice/toWaitPage?type=enterprise">首页</a></li>
					<li><a href="/avf/invoice/toWaitPage?type=enterprise">&nbsp;&gt;&nbsp;融资跟踪</a></li>
				</ul>
			</div>
			<!--tab_list end-->
			<div class="container1200 step_content">
				<c:if test="${userIdentityType == 'ENTERPRISE'}">
					<c:set var="tab_state" scope="session" value="6"/>
					<%@ include file="/base/tab_enterprise.jsp"%>
				</c:if>
				<c:if test="${userIdentityType == 'SUPPLIER'}">
					<c:set var="tab_state" scope="session" value="5"/>
					<%@ include file="/base/tab_supplier.jsp"%>
				</c:if>
				<c:if test="${userIdentityType == 'FINANCIAL'}">
					<c:set var="tab_state" scope="session" value="5"/>
					<%@ include file="/base/tab_financial.jsp"%>
				</c:if>
				<div class="rz_container">
					<div class="re_con_left fl">
						<p>总共：<span class="font20 org_color total_track">0</span>项</p>
						<!--<p>供应商：<span>1</span>项</p>-->
						<p>已选：<span class="font20 org_color total_check">0</span>项</p>
					</div>
					<div class="re_con_right fr">
						<div class="search_module fl">
							<div class="search_blur fl">
								<input type="text" />
								<div class="search_btns"><span class="sxf_btn icon_search"></span></div>
							</div>
							<a href="javascript:void(0)" class="blueBg" id="detail_query">高级查询</a>
							<a href="javascript:void(0)" class="blueBg" id="detail_fresh">刷新</a>
							<a href="javascript:void(0)" class="blueBg" id="import_all">全选</a>
						</div>
						<div class="prpare_btn fl">
							<a href="javascript:void(0)" id="import_ticket" class="btns">导出</a>

						</div>
					</div>
				</div>
				<div class="rz_result">
					<div id="finance_track" ></div>
				</div>
			</div>
		</div>
		<%--<%@ include file="/base/footer.jsp"%>--%>
	</body>

</html>