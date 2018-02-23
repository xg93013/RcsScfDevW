<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"
		 contentType="text/html; charset=UTF-8"%>
<%@ include file="/base/base.jsp"%>
<!DOCTYPE html>
<html>
	<head>
		<!--xg addcss-->
		<link rel="stylesheet" href="../../../../static/avf/css/base.css" />
		<link rel="stylesheet" href="../../../../static/avf/css/common.css" />
		
		<link rel="stylesheet" href="../../../../static/avf/css/commom_heart.css" />
		<link rel="stylesheet" href="../../../../static/avf/css/heart_commpany.css" />
		
		<title>首页-申请融资-融资详细信息</title>
		
		
		
	</head>

	<body>		
		<!--top_common-->
		<div class="header_com">
			<div class="header_container">
				<div class="com_left fl mg10">
					<img src="../../../../static/avf/images/logo.png"  />
				</div>
				<div class="com_right fr mg10">
					<div class="person_info fl">
						<a>
							<div class="info_graph fl"></div>
							<!--登录成功-->
							<div class="info_name fl">
								<p class="font12">[核心企业]</p>
								<p class="font18 mg10">用户名</p>
							</div>
							<!--未登录状态-->
							<b></b>
						</a>
					</div>
					<div class="hide_nlist">
						<ul>
							<li><a href="#">核心企业</a></li>
							<li><a href="#">供应商</a></li>
							<li><a href="#">金融机构</a></li>
							<li><a href="#">系统管理</a></li>
							<li><a href="#">密码修改</a></li>
							<li><a href="#">用户中心</a></li>
						</ul>
					</div>
					<div class="person_exit fl ml10">
						<a href="javascript:void(0)" class="exit_link" id="exit_login">退出</a>
					</div>
				</div>
			</div>
		</div>
		<!--top_common end-->
		
		<!--main content-->
		<div class="main_content">
			<!--tab_list-->
			<div class="container1200">
				<ul class="tab_list">
					<li><a href="#">首页</a></li>
					<li><a href="#">&gt;&nbsp;通知单列表</a></li>
					<li><a href="#">&gt;&nbsp;确认通知单</a></li>
					<li><a href="#">&gt;&nbsp;融资详细信息</a></li>
				</ul>
			</div>
			<!--tab_list end-->
			
			<div class="container1200 step_content">
				<div class="container1140">
					<div class="company">
						<div class="company_left fl">
							<p class="f30 color333">供应商的公司名称</p>
							<p class="f16 color666 lh40"><label>供应商：</label><span>0002312345</span></p>
						</div>
						<div class="company_right f26 colorfd7138 fr">
							银行处理中
						</div>
					</div>
					
					<div class="detail">
						<p>
							<span><label>年度：</label><font>2017</font></span>
							<span><label>融资需求编号：</label><font>000213456</font></span>
							<span><label>币种：</label><font>人民币</font></span>
						</p>
						<p>
							<span><label>校验凭证：</label><font>0002312345</font></span>
							<span><label>融资金额：</label><font>34.780.90元</font></span>
							<span><label>融资银行名称：</label><font>建设银行</font></span>
						</p>
						<p>
							<span><label>核心企业公司名称：</label><font>长虹集团</font></span>
							<span><label>融资比例：</label><font>78%</font></span>
							<span><label>收款银行账号：</label><font>0123412421424124</font></span>
						</p>
						<p>
							<span><label>发票数：</label><font class="font_color">5张>></font></span>
							<span><label>融资利率：</label><font>3.40%</font></span>
							<span><label>是否冻结：</label><font>是</font></span>
						</p>
						
						<p>
							<span><label>发票号码：</label><font>0002312345</font></span>
							<span><label>账款到期日：</label><font>2018-12-29</font></span>
							<span><label>冻结日期：</label><font>2018-01-10</font></span>
						</p>
						<p>
							<span><label>批次号：</label><font>02312345</font></span>
							<span><label>融资起息日：</label><font>2018-12-29</font></span>
							<span><label>清账凭证：</label><font>2018-01-10</font></span>
						</p>
						<p>
							<span><label>应付账款日：</label><font>2017-07-01</font></span>
							<span><label>融资到期日：</label><font>2018-12-29</font></span>
							<span><label>清账日期：</label><font>2018-01-10</font></span>
						</p>
					</div>
					
				</div>
			</div>	
			
		</div>
		<!--main content end-->
		
		<!--footer-->
		<%--<div class="footer">--%>
			<%--<p>绵阳市高新区XXXXX</p>--%>
			<%--<p>@速信融版权所有</p>--%>
		<%--</div>--%>
		<!--footer end-->
	</body>
</html>