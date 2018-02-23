<%--
  User: Wenjun Sun
  Date: 2017/8/30
  Time: 10:24
  des:金融机构放款补录详情
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
		<link rel="stylesheet" href="/static/avf/css/update_eui.css" />
		<script type="text/javascript" src="/static/base/js/public.js" ></script>
		<script type="text/javascript" src="/static/base/js/common.js" ></script>
		<script type="text/javascript" src="/static/avf/js/finance_approval.js" ></script>
		<title>融资管理平台</title>
		<style>
			.btn_refuse .btn_submit{
				width:205px;
			}
			.ux-field-element {
				width: 205px;
			}
			.ux-field {
			    overflow: hidden;
			}
		</style>
		<script type="text/javascript">
			EUI.onReady(function() {
				var formRecord = new EUI.formRecord({
					renderTo : "recordForm",
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
					<li><a href="/avf/financingLoan/financingLoanListPage">&gt;&nbsp;放款补录</a></li>
					<li><a href="#">&gt;&nbsp;详情</a></li>
				</ul>
			</div>
			<!--tab_list end-->
			<div class="container1200 step_content">
				<div class="wyzzk">
					<div class="wyzzk_top_left">
						<div class="whyzzk_company w1160">
							<div class="w360 fl">
								<input type="hidden" id="makeUpId" value="${financingLoanDetails.id}">
								<input type="hidden" id="getLoanMoney" value="${financingLoanDetails.loanMoney}">
								<input type="hidden" id="getLoanDate" value="${financingLoanDetails.loanDate}">
								<span><label>成交单号：</label><font>${financingLoanDetails.noticeNo}</font></span>
							</div>
							<div class="w299 fl">
								<span><label>合同单号：</label><font>${financingLoanDetails.noticeNo}</font></span>
							</div>
						</div>
						<div class="whyzzk_money">
							<div class="w360 fl">
								<span>供应商：</span>
								<input type="hidden" id="financeMoney" value="${financingLoanDetails.financeMoney}">
								<span><label class="f30">${financingLoanDetails.supplyName}</label></span>
							</div>
							<div class="w450 fl">
								<input type="hidden" id="financeStart" value="${financingLoanDetails.financeStart}">
								<span class="w330">核心企业:</span>
								<span class="w330"><label class="f30">${financingLoanDetails.companyName}</label></span>
							</div>
							<div class="fl">						
								<span class="w330">资金提供方:</span>
								<span class="w330"><label class="f30">${financingLoanDetails.finInsName}</label></span>
							</div>
						</div>
					</div>
				</div>
				<div class="form">
					<div class="record_form">
						<div id="recordForm"></div>
					</div>
					<%--<div class="close_store ml106"><b class="b_1"></b><span>关闭储档</span></div>--%>
					<div class="btn_refuse mt35 ml106">
						<div class="btn_3 btn_submit" id="confirm_record">确认补录</div>					
					</div>
				</div>
			</div>
		</div>
		<!--遮罩层开始-->
		<div id="overlay" class="overlay" style="display: none;"></div>  
	    <!-- Loading提示 DIV -->  
	    <div id="loadingTip" class="loading_tip" style="display: none;">  
	     	<div class="loading_content">
	     		<img src="/static/avf/images/record.png"/>
				<p id="successInfo"></p>
	     	</div>
	    </div>  
	    <!--遮罩层结束-->
		<!--footer-->
		<%--<%@ include file="/base/footer.jsp"%>--%>
		<!--footer end-->
	</body>
</html>
