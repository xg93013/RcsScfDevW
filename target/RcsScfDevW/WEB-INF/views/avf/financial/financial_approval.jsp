<%--
  User: Wenjun Sun
  Date: 2017/8/30
  Time: 10:24
  des:金融机构融资审批
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"
		 contentType="text/html; charset=UTF-8"%>
<%@ include file="/base/header.jsp"%>
<!DOCTYPE html>
<html>
	<head>
		<!--xg addcss-->
		<link rel="stylesheet" href="/static/avf/css/mainView.css" />
		<link rel="stylesheet" href="/static/avf/css/commom_heart.css" />
		<link rel="stylesheet" href="/static/avf/css/heart_commpany.css" />
		<!--xg addjs-->	
		<script type="text/javascript" src="/static/base/js/public.js"></script>
		<script type="text/javascript" src="/static/base/js/common.js"></script>
		<script type="text/javascript" src="/static/avf/js/finance_approval.js" ></script>
		<style>
			.off_state p {
				display:block;
			}
		</style>
		<script type="text/javascript">
			EUI.onReady(function() {
				var financeApproval = new EUI.FinanceApproval({
					renderTo : "rzApproval",
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
					<li><a href="#">&gt;&nbsp;融资审批</a></li>
				</ul>
			</div>
			<!--tab_list end-->
			<div class="container1200 step_content">
				<c:set var="tab_state" scope="session" value="1"/>
				<%@ include file="/base/tab_financial.jsp"%>
				<div class="rz_result">
					<div class="info_bar mt10 mb10">
						<div class="rz_p fl">
							<p>待处理<span class="org_color">${waitDealQuota}</span>项</p>
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
					<div id="rzApproval"></div>
				</div>
			</div>
		</div>
		<!--footer-->
		<%--<%@ include file="/base/footer.jsp"%>--%>
		<!--footer end-->
	</body>
</html>
