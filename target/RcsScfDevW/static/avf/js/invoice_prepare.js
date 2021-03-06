/**
 * Created by xionggang on 2017/8/1.
 * des:核心企业发票准备
 * jspPath:WEB-INF/views/avf/enterprise/invoice_prepare.jsp
 */
EUI.InvoicePrepare = EUI.extend(EUI.CustomUI, {
	renderTo: "",
	cfgId: "",
    timer:3,
    searchWin:"",
    searchWin1:"",
    ComboBoxCode:"",
    ComboBoxName:"",
    ComboBoxUrl:"",
    labelName:"",
	initComponent: function() {
		var g = this;
		EUI.GridPanel({
			renderTo: this.renderTo,
			padding: 0, //设置表格的内边距
			height: "auto",
			id: g.cfgId,
            width:"1160",
			gridCfg: g.initGridTable()
		});
		g.initSearchForm();
		g.addEvents();
        g.initDownList();
        g.addTableElement();
	},
    addTableElement:function(){
	    var g = this;
        if(g.cfgId == "InvoicePre1"){
            $("#jqgh_g_InvoicePre1_rn").append("序号");
            $(".jqgrid-rownum").css({
                "width":"100px",
                "text-align":"center"
            });
        }else{
            $("#jqgh_g_InvoicePre2_rn").append("序号");
        }
    },
	addEvents: function() {
		var g = this;
		//删除一条发票信息
		$(".deleteRow").live("click", function() {
			if(g.cfgId == "InvoicePre1"){
                var deleteId = $(this).attr("data-id");
                var deleteState = $(this).attr("data-state");
                var deleteMoney = parseFloat($(this).attr("data-money"));
                var storeUrl = _ctxPath + "/avf/invoice/deleteInvoiceHead.json?id="+deleteId;
                var func = function () {
                    if(deleteState == "1010"){
                        $(".bideNumber").html(parseInt($(".bideNumber").html())-1);
                    }
                    $(".totalMoney").html($.formatMoney(parseFloat(parseFloat($(".totalMoney").attr("data"))- deleteMoney),2));
                }
                delInfoWin(storeUrl,g.cfgId,deleteId,func);
			}else{
                errorInfo("供应商删除功能正在开发中！");
			}

		});
        //下载文件模板
        $("#import_model").live("click", function() {
            var htmls = '<a href="/static/file/发票批量导入模板.xlsx" class="down_btn excel_down" download="发票批量导入模板.xlsx"></a>';
            // htmls += '<a href="/static/file/发票批量导入模板.xlsx"  class="down_btn txt_down" download="发票批量导入模板.xlsx"></a>';
            showWin(htmls);
        })
        //导入发票
        $("#import_ticket").live("click", function() {
            var htmls = '<div class="import_line">';
            htmls += '<form id= "import_form" name = "import_form" enctype="multipart/form-data" method="post">';
            htmls += '	<input type="text" placeholder="文件地址" id="f_file" class="importfile_input"/>';
            htmls += ' <input type="file" name="file" class="hide_upload" id="t_file" onchange="f_file.value=this.value" hidefocus>';
            htmls += ' <input type="button" value="上传文件" class="importfile_btn" />';
            htmls += '	</div>';
            htmls += '	<div class="import_line">';
            htmls += '	<input type="button" value="取消" class="import_btn cancel_btn"/>';
            htmls += '	<input type="button" value="保存" class="import_btn import_ok" id="import_ok"/>';
            htmls += '<input type="submit" style="display: none" id="sub_import" />';
            htmls += '	</div>';
            htmls += '</form>';
            showWin(htmls);
        })

        //确定导入发票
		$("#import_ok").live("click",function(){
			var fileUrl = $("#f_file").val();
            if($("#f_file").val() != "" && $("#f_file").val() != "请选择上传文件！"){
                if(fileUrl.indexOf("xls")<0 && fileUrl.indexOf("xlsx")<0)
                {
                    alert("请选择格式为.xls或.xlsx的文件！");
                    return false;
                }else{
                    var formData = new FormData($( "#import_form" )[0]);
                    $.ajax({
                        url: _ctxPath+'/avf/invoice/importInvoice.json',
                        type: 'POST',
                        data: formData,
                        async: true,
                        contentType: false,
                        processData: false,
                        beforeSend:function(){
                            $(".position_box").empty().html("<div class='load_img'><p><img src='/static/avf/images/loading.gif' /></p><p class='load_text'>导入中！</p></div>");
                        },
                        success: function (msg) {
                            if(g.cfgId == "InvoicePre1") {
                                seccessInfo("导入发票成功！");
                                pageUrl = _ctxPath + "/avf/invoice/toWaitPage?type=enterprise";
							}
                            if(g.cfgId == "InvoicePre2") {
                                showToPageInfo("导入成功！","/avf/invoice/toWaitPage?type=supplier");
							}
                        },
                        error: function (msg) {
                        	var parseMsg = JSON.parse(msg.responseText);
                            errorInfo(parseMsg.msg);
                        }
                    });
				}
			}
			else{
				$("#f_file").val("请选择上传文件！");
			}
		})
	},
    //文件上传真实按钮
    fclick:function(){
        with(obj) {
            style.posTop = event.srcElement.offsetTop;
            var x = event.x - offsetWidth / 2;
            if(x < event.srcElement.offsetLeft) x = event.srcElement.offsetLeft;
            if(x > event.srcElement.offsetLeft + event.srcElement.offsetWidth - offsetWidth) x = event.srcElement.offsetLeft + event.srcElement.offsetWidth - offsetWidth;
            style.posLeft = x;
        }
    },
    initDownList:function(){
        var g = this;
        var obj = {'data1':[
            {statusCode:null,statusDetail:'全部'},
            {statusCode:'1010',statusDetail:'待审核'},
            {statusCode:'1011',statusDetail:'录入审核拒绝'},
            {statusCode:'1020',statusDetail:'可融资发票'}]};
        tabHeadSearch.clickElement(obj,g.cfgId,"businessDealStatus");
    },
	initGridTable: function() {
		var g = this;
		var cfgData = {};
		//核心企业表格配置
		if(g.cfgId == "InvoicePre1") {
			//配置表格
			cfgData = {
				url:_ctxPath+"/avf/invoice/waitList.json",//获取后端数据
				rownumbers: true,
				rowNum: 10,
                loadonce: false,
                mtype : "get",
                postData:{

                },
				colModel: [{
					name: "id", //列显示的名称
					index: "id", //传到服务器端用来排序的列名称
					hidden: true //隐藏不显示这一组
				},{
                    label:"录入编号",
                    name:"docNo",
                    index:"docNo",
                    hidden:false
                },{
                    label:"应付凭证号",
                    name:"payableCertificate",
                    index:"payableCertificate",
                    hidden:false,
                    formatter: function(value, id, rowdata) {
                        if(rowdata.payableCertificate == ""){
                            return "无凭证";
                        }else {
                            return rowdata.payableCertificate;
                        }
                    }
                },{
					label: "供应商",
					name: "supplyShortName",
					index: "supplyShortName"
				}, {
					label: "合计金额(元)<b class='sorting no_sort' data='totalMoney'></b>",
					name: "totalMoney",
					index: "totalMoney",
					width:200,
					formatter: function(value, id, rowdata) {
						return '<span class="font18 color555 bold">￥' + $.formatMoney(rowdata.totalMoney,2) + '</span>';
					}
				}, {
					label: "数量(张)<b class='sorting no_sort' data='invoiceTotalNumber'></b>",
					name: "invoiceTotalNumber",
					index: "invoiceTotalNumber",
					formatter: function(value, id, rowdata) {
						return '<span class="font18 color555 bold">' + rowdata.invoiceTotalNumber + '</span>';
					}
				}, {
					label: "状态<b class='b_btn b_state' data='businessDealInfo'></b>",
					name: "businessDealInfo",
					index: "businessDealInfo"
				}, {
					label: "操作",
                    name: "businessDealStatus",
                    index: "businessDealStatus",
					width:190,
					formatter: function(value, id, rowdata) {
						//待审核
						var btnHtml = "";
						var editUrl = "/avf/invoice/toEditInvoice?id="+rowdata.id;
						if(rowdata.businessDealStatus == "1010"){
							var url = "/avf/invoice/toInvoiceDetailPage?type=true&id="+rowdata.id;
                            btnHtml =  '<a href="'+url+'"  class="table_btn" data-id="' + rowdata.id + '">立即审核</a>';
						}
						//录入审核拒绝
						if(rowdata.businessDealStatus == "1011"){
                            var url = "/avf/invoice/toInvoiceDetailPage?type=false&id="+rowdata.id;
                            btnHtml = '<a href="'+url+'"  class="sxf_btn icon_detail" data-id="' + rowdata.id + '" title="查看明细"></a>';
						}
						//审核通过
                        if(rowdata.businessDealStatus == "1020"){
                            url = "/avf/invoice/toInvoiceDetailPage?type=false&id="+rowdata.id;
                            btnHtml = '<a href="'+url+'"  class="sxf_btn icon_detail" data-id="' + rowdata.id + '" title="查看明细"></a>';
                        }
                        return '<div class="coop_a">'+btnHtml+'<a href="'+editUrl+'" class="sxf_btn icon_edit mgl16 editRow" data-id="' + rowdata.id + '" title="编辑"></a><span class="sxf_btn icon_delete mgl16 deleteRow" data-id="' + rowdata.id + '" data-money="'+rowdata.totalMoney+'" data-state="'+rowdata.businessDealStatus+'" title="删除"></span></div>';
					}
				}]
			}
		}
		//供应商表格配置
		if(g.cfgId == "InvoicePre2") {
			cfgData = {
                url:_ctxPath+"/avf/invoice/waitList.json",//获取后端数据
                rownumbers: true,
                rowNum: 10,
                loadonce: false,
                mtype : "get",
				colModel: [{
					name: "id", //列显示的名称
					index: "id", //传到服务器端用来排序的列名称
					hidden: true //隐藏不显示这一组
				}, {
					label: "序号",
					name: "docNo",
					index: "docNo",
					width: 80,
					hidden:true
				}, {
					label: "发票代码",
					name: "invoiceCode",
					index: "invoiceCode",
					width:220,
					formatter: function(value, id, rowdata) {
						return '<span>' + rowdata.invoiceCode + '</span>';
					}
				}, {
					label: "发票号码",
					name: "invoiceNo",
					index: "invoiceNo",
					formatter: function(value, id, rowdata) {
						return '<span>' + rowdata.invoiceNo + '</span>';
					}
				}, {
					label: "价税合计(元)<b class='sorting desc' data='vatMoney'></b>",
					name: "vatMoney",
					index: "vatMoney",
					width:260,
                    formatter:function(value,id,rowdata){
                        return '<span class="font18 bold">￥'+$.formatMoney(rowdata.vatMoney,2)+'</span>';
                    }
				}, {
					label: "金额(元)<b class='sorting desc' data='taxFreeSum'></b>",
					name: "taxFreeSum",
					index: "taxFreeSum",
					width:260,
					formatter: function(value, id, rowdata) {
						return '<span class="font18 bold">￥' + $.formatMoney(rowdata.taxFreeSum,2) + '</span>';
					}
				}, {
					label: "税额(元)<b class='sorting desc' data='vatSum'></b>",
					name: "vatSum",
					index: "vatSum",
                    width:160,
					formatter:function(value,id,rowdata){
						return '<span>￥'+$.formatMoney(rowdata.vatSum,2)+'</span>';
					}
				}, {
					label: "所属公司",
					name: "companyShortName",
					index: "companyShortName",
					width: 180,
                    formatter: function(value, id, rowdata) {
                        var url ="/pbm/company/companyDetail?companyCode="+rowdata.companyCode;
                        return '<a href="'+url+'">' + rowdata.companyShortName + '</a>';
                    }
				}, {
					label: "开票日期",
					name: "invoDate",
					index: "invoDate",
                    width: 180,
				}, {
					label: "批次号",
					name: "batchNumber",
					index: "batchNumber"
				}, {
                    label: "状态<b class='b_btn b_state' data='businessDealInfo'></b>",
                    name: "businessDealInfo",
                    index: "businessDealInfo"
                }
                // , {
				// 	label: "操作",
				// 	name: "",
				// 	index: "",
				// 	width: 150,
				// 	formatter: function(value, id, rowdata) {
                 //        var editUrl = "/avf/invoice/toEditInvoice?id="+rowdata.id;
				// 		return '<div class="coop_a fl"><span class="sxf_btn icon_edit editRow" data-id="' + rowdata.id + '" title="编辑"></span><span class="sxf_btn icon_delete deleteRow ml20" data-id="' + rowdata.id + '" title="删除"></span></div>';
                 //        // return '<div class="coop_a"><a href="'+editUrl+'" class="sxf_btn icon_edit mgl16 editRow" data-id="' + rowdata.id + '" title="编辑"></a><span class="sxf_btn icon_delete mgl16 deleteRow" data-id="' + rowdata.id + '" data-money="'+rowdata.totalMoney+'" data-state="'+rowdata.businessDealStatus+'" title="删除"></span></div>';
				// 	}
				// }
				]
			}
		}
		return cfgData;
	},
    //初始化高级查询表单
    initSearchForm:function(){
    	var g = this;
        if(g.cfgId == "InvoicePre1"){
    	    g.ComboBoxCode = "supplyCode";
            g.ComboBoxName = "supplyName";
            g.labelName = "供应商";
            g.ComboBoxUrl = "/avf/financingRelConfigure/findRelByCompanyCode.json";
        }else{
            g.ComboBoxCode = "companyCode";
            g.ComboBoxName = "companyName";
            g.labelName = "核心企业";
            g.ComboBoxUrl = "/avf/financingRelConfigure/findRelBySupplyCode.json";
        }
        var options = {
            id: "searchForm1", //表单id
            renderTo: "formBox1",//表单容器id
            submitId:"submitId",//提交按钮id
            tableId:g.cfgId,//要刷新的表格id
            title:"高级查询",//查询标题
            formGrid: [{
                xtype: "ComboBox",
                field: [g.ComboBoxCode], // 表示哪些值需要提交到后端
                name: g.ComboBoxName,
                labelWidth: 120,
                id: g.ComboBoxCode,
                title: g.labelName,
                width: 280,
                allowBlank: true,
                displayText: "请选择供应商",
                async: true, // 是否异步，true为异步
                store: {
                    type:"get",
                    url: _ctxPath + g.ComboBoxUrl
                }, // 从后台获取数据的地址
                editable: true, // 是否可编辑
                loadMask: true, // 是否有遮罩层
                showSearch: false, // 是否展开下拉框
                searchText:g.ComboBoxCode, // 下拉框的内容
                canClear: true,
                deforeLoad: function(store) {},
                afterLoad: function(data) {

                },
                afterSelect:function(data){

                }
            },
                {
                xtype: "FieldGroup",
                width:500,
                itemspace:10,
                items: [{
                    xtype: "NumberField",
                    width: 85,
                    labelWidth: 120,
                    precision : 0,
                    // value:0,
                    allowBlank: true,
                    // minlength:1,
                    title:"发票数量",
                    // minValue:1,
                    displayText: "最小发票数量",
                    name: "minInvoiceNum",
                    unit: "张",
                    id:"minInvoiceNum",
                    checkInitValue:false,
                    validateText: "请输入正确的发票数量！"
                },{
                    xtype: "NumberField",
                    precision : 0,
                    labelWidth: 45,
                    width: 85,
                    // value:0,
                    title: "到",
                    // minlength:1,
                    // minValue:1,
                    id:"maxInvoiceNum",
                    name: "maxInvoiceNum",
                    checkInitValue:false,
                    allowBlank: true,
                    displayText: "最大发票数量", // 显示在文本框内的提示语
                    validateText:"最大发票数量不能小于最小发票数量",
                    unit: "张",
                    validater:function(value){
                        var minInvoiceNum = parseFloat(EUI.getCmp("minInvoiceNum").getValue().toFixed(2));
                        if(minInvoiceNum>value){
                            return false;
                        }
                    }
                }]
            },{
                xtype: "ComboBox",
                field: ["businessDealStatus"], // 表示哪些值需要提交到后端
                name: "name",
                labelWidth: 120,
                id: "businessDealStatus",
                title: "状态",
                width: 280,
                allowBlank: true,
                displayText: "请选择状态",
                async: true, // 是否异步，true为异步
                // store: {
                //     type:"get",
                //     url: _ctxPath + "/avf/financingRelConfigure/findRelByCompanyCode.json"
                // }, // 从后台获取数据的地址
                data : [{
                    businessDealStatus : "1010",
                    name : "录入待审核"
                }, {
                    businessDealStatus : "1011",
                    name : "录入审核拒绝"
                }, {
                    businessDealStatus : "1020",
                    name : "可融资发票"
                }],
                editable: true, // 是否可编辑
                loadMask: true, // 是否有遮罩层
                showSearch: false, // 是否展开下拉框
                searchText: "businessDealStatus", // 下拉框的内容
                canClear: true,
                deforeLoad: function(store) {},
                afterLoad: function(data) {

                },
                afterSelect:function(data){

                }
            }] //表单配置
        }
        g.searchWin = new showSearchWin(options);
	}
});