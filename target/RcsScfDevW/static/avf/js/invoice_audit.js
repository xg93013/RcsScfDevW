/**
 * Created by xionggang on 2017/8/1.
 * des:核心企业发票审核
 * jspPath:WEB-INF/views/avf/enterprise/invoice_audit.jsp
 */
EUI.InvoiceAudit = EUI.extend(EUI.CustomUI, {
	renderTo: "",
	cfgId: "",
    docNo:null,
    invoiceId:null,
    timer:3,
	initComponent: function() {
		var g = this;
		EUI.GridPanel({
			renderTo: this.renderTo,
			padding: 0, //设置表格的内边距
			// overflow: "hidden",
			height:"auto",
			width:"1160",
			id: g.cfgId,
			autoLoad: true, //自动加载
			gridCfg: g.initGrid()
		});
		this.addEvents();
	},
	addEvents: function() {
		var g = this;
		//发票审核
		$("#check_btn").live("click",function(){
            var noPassReason;
            var checkParams;
            var radioVal = $('input:radio[name="check_radio"]:checked').val();
            //可融资发票
            if(radioVal == "1020"){
                checkParams = {
                    businessDealStatus:1020,
                    id:g.invoiceId
                }
            }
            //录入审核拒绝
            if(radioVal == "1011"){
                if($("#check_items").val() != 0){
                    noPassReason = $("#check_items").val();
                }else{
                    noPassReason = $("#otherRea").val();
                }
                if($("#check_items").val() == 0 && $("#otherRea").val() == ""){
                    errorInfo("请选择或者输入拒绝理由！");
                    return;
				}
                checkParams = {
                    businessDealStatus:1011,
                    id:g.invoiceId,
                    dealInfo:noPassReason
                }
            }
            EUI.Store({
                url: _ctxPath + "/avf/invoice/invoiceExamine.json",
                params:checkParams,
                type : "post",
                success: function (msg) {
                    showToPageInfo("审核成功！","/avf/invoice/toWaitPage?type=enterprise");
                },
                failure: function (msg) {
                    errorInfo("操作失败");
                }
            });
		});
		//复制信息
        $(".copy_btn").zclip({
            path: "/static/base/js/ZeroClipboard.swf",
            copy: function(){
                return $(this).prev().find(".copy_text").text();
            },
            afterCopy:function(){/* 复制成功后的操作 */
                var $copysuc = $("<div class='copy-tips'><div class='copy-tips-wrap'>复制成功</div></div>");
                $("body").find(".copy-tips").remove().end().append($copysuc);
                $(".copy-tips").fadeOut(3000);
            }
        });
	},
	//初始化配置
	initGrid: function() {
		var g = this;
		//配置表格
		var cfgData = {
            url:_ctxPath+"/avf/invoice/invoiceDetail.json",//获取后端数据
			postData:{
            	docNo:this.docNo
			},
            rownumbers: true,
            rowNum: 10,
            loadonce: false,
            mtype : "get",
			colModel: [{
				name: "id", //列显示的名称
				index: "id", //传到服务器端用来排序的列名称
				hidden: true //隐藏不显示这一组
			}, {
				label: "批次号",
				name: "docNo",
				index: "docNo",
			},{
                label: "发票代码",
                name: "invoiceCode",
                index: "invoiceCode",
            },{
                label: "发票号码",
                name: "invoiceNo",
                index: "invoiceNo",
            },{
                label: "价税合计",
                name: "vatMoney",
                index: "vatMoney",
                formatter: function(value, id, rowdata) {
                    return '<span class="font18 bold">' + $.formatMoney(rowdata.vatMoney,2) + '</span>元';
                }
            },{
                label: "金额",
                name: "taxFreeSum",
                index: "taxFreeSum",
                formatter: function(value, id, rowdata) {
                    return '<span class="font18 bold">' + $.formatMoney(rowdata.taxFreeSum,2) + '</span>元';
                }
            },{
                label: "税额",
                name: "vatSum",
                index: "vatSum",
                formatter: function(value, id, rowdata) {
                    return '<span class="font18 bold">' + $.formatMoney(rowdata.vatSum,2) + '</span>';
                }
            },{
                label: "开票日期",
                name: "invoDate",
                index: "invoDate"
            },{
                label: "账款到期日",
                name: "maturityDate",
                index: "maturityDate",
                width:200,
                formatter:function(value,id,rowdata){
                    return GetDateT(new Date(rowdata.maturityDate));
                }
            }]
		}
		return cfgData;
	}
});