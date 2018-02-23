<%--
	User:xionggang
	Date:2017/08/30
	Time:10:20
	des:供应商通知单页面
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"
		 contentType="text/html; charset=UTF-8"%>
<%@ include file="/base/header.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="/static/avf/css/commom_heart.css" />
	<link rel="stylesheet" href="/static/avf/css/heart_commpany.css" />
	<!--xg addcss-->
	<link rel="stylesheet" href="/static/avf/css/mainView.css" />
	<link rel="stylesheet" href="/static/avf/css/supplyMain.css" />

	<!--xg addjs-->
	<script type="text/javascript" src="/static/base/js/public.js" ></script>
	<script type="text/javascript" src="/static/base/js/common.js" ></script>
	<script type="text/javascript" src="/static/avf/js/notice_sheet.js" ></script>
	<script>
        EUI.onReady(function(){
            new EUI.NoticeSheet({
                renderTo: "notice_sheet",
                cfgId: "noticeSheet"
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
			<li><a href="/avf/invoice/toWaitPage?type=supplier">首页</a></li>
			<li><a href="javascript:void(0)">&nbsp;&gt;&nbsp;通知单</a></li>
		</ul>
	</div>
	<!--tab_list end-->

	<div class="container1200 step_content">
		<c:set var="tab_state" scope="session" value="4"/>
		<%@ include file="/base/tab_supplier.jsp"%>
		<div class="rz_container">
			<div class="re_con_left fl">
				<p class="font18 mg20">待确认<span class="font20 org_color">${needConfirmQuota}</span>项</p>
			</div>
			<div class="re_con_right fr">
				<div class="search_module fl">
					<div class="search_blur fl">
						<input type="text" />
						<div class="search_btns"><span class="sxf_btn icon_search"></span></div>
					</div>
					<a href="javascript:void(0)" class="blueBg" id="detail_query">高级查询</a>
					<a href="javascript:void(0)" class="blueBg" id="detail_fresh">刷新</a>
				</div>
			</div>
		</div>
		<div class="rz_result">
			<div id="notice_sheet" ></div>
		</div>
	</div>

</div>
<!--main content end-->

<!--footer-->
<%--<%@ include file="/base/footer.jsp"%>--%>
<!--footer end-->
</body>
</html>