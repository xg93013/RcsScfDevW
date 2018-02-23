<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
        <jsp:include page="/WEB-INF/htmls/base/base.jsp"></jsp:include>

		<!--xg addcss-->
		<link rel="Shortcut Icon" href="/static/avf/images/logo2.ico" />
		<link rel="stylesheet" href="/static/avf/css/base.css" />
		<link rel="stylesheet" href="/static/avf/css/common.css" />
		<!--

		<link rel="stylesheet" href="/static/avf/css/mainView.css" />
		-->

		<script type="text/javascript" src="/static/avf/js/common.js" ></script>
		<title>融资管理平台</title>

	</head>

	<body>
		 <div id="content" style="background: white;">


			<!--top_common-->
			<div class="header_com">
				<div class="header_container">
					<div class="com_left fl mg10">
						<img  src="/static/avf/images/logo.png"/>
					</div>
					<div class="com_right fr mg10">
						<div class="person_info fl">
							<a>
								<div class="info_graph fl"></div>
								<!--登录成功-->
								<div class="info_name fl">
									<p class="font12">${cookie['userIdentity'].value}</p>
									<p class="font18 mg10">${cookie['userName'].value}</p>
								</div>
								<!--未登录状态-->
								<b></b>
							</a>
							<div class="hide_nlist">
								<ul>
									<li>
										<a href="#">核心企业</a>
									</li>
									<li>
										<a href="#">供应商</a>
									</li>
									<li>
										<a href="#">金融机构</a>
									</li>
									<li>
										<a href="#">系统管理</a>
									</li>
									<li>
										<a href="#">密码修改</a>
									</li>
									<li>
										<a href="#">用户中心</a>
									</li>
									<li>
										<a href="#">融资配置</a>
									</li>
								</ul>
							</div>
						</div>

						<div class="person_exit fl ml10">
							<a href="javascript:void(0)" class="exit_link" id="exit_login">退出</a>
						</div>
					</div>
				</div>
			</div>
			<!--top_common end-->
		</div>
		</div>
	</body>

</html>