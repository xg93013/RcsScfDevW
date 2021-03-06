/**
 * Created by xionggang on 2017/8/1.
 * des:核心企业融资跟踪
 * jspPath:WEB-INF/views/avf/enterprise/finance_track.jsp
 */
EUI.Finance_track = EUI.extend(EUI.CustomUI, {
	renderTo: "",
	cfgId: "",
	track_check_item:0,
	checkBoxList:[],
    ComboBoxCode:"supplyCode",
	ComboBoxName:"supplyName",
	labelName:"供应商",
	ComboBoxUrl:"/avf/financingRelConfigure/findRelByCompanyCode.json",
	initComponent: function() {
		var g = this;
		EUI.GridPanel({
			renderTo: this.renderTo,
			xtype: "GridPanel",
			padding: 0, //设置表格的内边距
			overflow: "hidden",
			height:"auto",
			id: g.cfgId,
			width:"1160",
			autoLoad: true, //自动加载
			gridCfg: g.initGrid()
		});
		g.addEvent();
		g.setCheckStyle();
        g.getAllCheckItem();
        g.initSearchForm();
	},
	addEvent:function(){
		var g = this;
		//展开详细信息
		$(".track_down_item").live("click",function(){
			if($(this).find(".track_down").hasClass("icon_down")){
				$(this).find(".track_down").removeClass("icon_down").addClass("icon_up");
				$(this).parent().next(".track_down_box").show();
                $(this).parent().parent().parent().parent().siblings().find(".track_down_box").hide();
                $(this).parent().parent().parent().parent().siblings().find(".track_down").removeClass("icon_up").addClass("icon_down");
			}else{
				$(this).find(".track_down").removeClass("icon_up").addClass("icon_down");
				$(this).parent().next(".track_down_box").hide();
			}
		});
		$(".track_box").parent("td").attr("title","");
		//统计选中
		$(".track_check").live("click",function(){
			var id = $(this).attr("data-id");
            if($(this).hasClass("default_checkbox")){
                $(this).removeClass("default_checkbox").addClass("checked_checkbox");
                g.setDataInCheckList(id);

            }else{
                $(this).removeClass("checked_checkbox").addClass("default_checkbox");
                g.removeDataInCheckList(id);
            }
			g.getAllCheckItem();
		});
        $(".ui-pg-input,.ui-pg-selbox").bind( "change", function() {
			g.setCheckStyle();
		})
		$("#import_ticket").live("click",function(){
			if(g.checkBoxList.length == 0){
                errorInfo("请选择一条融资跟踪信息！");
			}
			else{
                var checkListLength = $(".track_check").length;
                var params = "";
                if(g.checkBoxList.length != checkListLength){
                    window.location.href = _ctxPath+"/avf/financingTracking/downLoadTrackingExcel?ids="+g.checkBoxList+"";
                }else{
                    window.location.href = _ctxPath+"/avf/financingTracking/downLoadTrackingExcel?all=true";
                }
			}
		});
        //全选
        $("#import_all").live("click",function(){
            g.checkBoxList = [];
            $(".track_check").each(function(){
                var id = $(this).attr("data-id");
                g.checkBoxList.push(id);
            })
            $(".track_check").addClass("checked_checkbox").removeClass("default_checkbox");
            g.getAllCheckItem();
        });
	},
    //初始化表格
	initGrid: function() {
		var g = this;
		//配置表格
		var cfgData = {
         	url:_ctxPath+"/avf/financingTracking/financingTrackingIndexList.json",//获取后端数据
            rownumbers: false,
            rowNum: 10,
         	mtype : "get",
			// aynsc:true,
			loadonce: false, //一次性加载数据，和autoLoad都为true时，则可以一次加载所有数据
			colModel: [{
         		label:"id",
				name:"id",
				index:"id",
				hidden:true
			},{
				label: "应付凭证",
				name: "avfAccountsRPInfos", //列显示的名称
				index: "avfAccountsRPInfos", //传到服务器端用来排序的列名称
				hidden: true, //隐藏不显示这一组
			},{
                label: "备注",
                name: "payableCertificate", //列显示的名称
                index: "payableCertificate", //传到服务器端用来排序的列名称
                hidden: true, //隐藏不显示这一组
                formatter:function(value, id, rowdata){
                	if(rowdata.payableCertificate == null){
                        rowdata.payableCertificate = "无";
					}
				}
            }, {
                label: "通知单",
                name: "notice", //列显示的名称
                index: "notice", //传到服务器端用来排序的列名称
                hidden: true, //隐藏不显示这一组
            }, {
                label: "需求编号",
                name: "financingNeedsNo", //列显示的名称
                index: "financingNeedsNo", //传到服务器端用来排序的列名称
                hidden: true //隐藏不显示这一组
            },{
				label: "供应商名称",
				name: "supplyShortName",
				index: "supplyShortName",
				hidden: true //隐藏不显示这一组
			}, {
				label: "金融机构名称",
				name: "finInsShortName",
				index: "finInsShortName",
				hidden: true //隐藏不显示这一组
			},{
                label: "融资金额",
                name: "financeMoney",
                index: "financeMoney",
                hidden: true //隐藏不显示这一组
            },{
                label: "融资开始日",
                name: "financeStart",
                index: "financeStart",
                hidden: true //隐藏不显示这一组
            }, {
				label: "融资到期日",
				name: "financeEnd",
				index: "financeEnd",
                hidden: true //隐藏不显示这一组
			},{
				label: "融资利率",
				name: "financeRate",
				index: "financeRate",
                hidden: true //隐藏不显示这一组
			},{
				label: "融资利息",
				name: "financePer",
				index: "financePer",
                hidden: true //隐藏不显示这一组
			},{
				label: "融资比例",
				name: "financePercent",
				index: "financePercent",
                hidden: true //隐藏不显示这一组
			},{
				label: "期限",
				name: "intentionFterm",
				index: "intentionFterm",
                hidden: true //隐藏不显示这一组
			},{
                label: "",
                name: "",
                index: "",
                title:false,
				width:1160,
				formatter:function(value, id, rowdata){
                	var vNoList = rowdata.avfAccountsRPInfos;
                    var htmls = "";
                	var vNOHtml = "";
                    var invoiceHtmls = "";
                    var bankRate,financeProportion,loanDate,financeMoney,loanMoney,intentionFmoney,receivablesMoney,receivablesDate,supplyShortName,finInsShortName = "";
                    if(rowdata.notice != undefined){
                        bankRate = rowdata.notice.bankRate;
                        financeProportion = rowdata.notice.financeProportion;
                        loanDate = rowdata.notice.loanDate;
                        intentionFmoney = rowdata.notice.intentionFmoney;
                        receivablesDate = rowdata.notice.receivablesDate;
                        receivablesMoney = rowdata.notice.receivablesMoney;
                        financeMoney = rowdata.notice.financeMoney;
                        loanMoney = rowdata.notice.loanMoney;
                        supplyShortName = rowdata.notice.supplyShortName;
                        finInsShortName = rowdata.notice.finInsShortName;
                    }
                	$.each(vNoList,function(i,item){
                        vNOHtml += item.voucherNo+"、";
                        $.each(item.avfFinInvoiceInfos,function(i,itemIntro){
                            var voucherNo = "无";
                            if(item.voucherNo != ""){
                                voucherNo = item.voucherNo;
                            }
                            invoiceHtmls += '<tr>';
                            invoiceHtmls += '<td>'+voucherNo+'</td>';
                            invoiceHtmls += '<td>'+itemIntro.invoiceCode+'</td>';
                            invoiceHtmls += '<td>'+itemIntro.invoiceNo+'</td>';
                            invoiceHtmls += '<td>'+itemIntro.vatMoney+'</td>';
                            invoiceHtmls += '<td>'+itemIntro.taxFreeSum+'</td>';
                            invoiceHtmls += '<td>'+itemIntro.vatSum+'</td>';
                            invoiceHtmls += '<td>'+itemIntro.companyShortName+'</td>';
                            invoiceHtmls += '<td>'+itemIntro.invoDate+'</td>';
                            invoiceHtmls += '<td>'+itemIntro.batchNumber+'</td>';
                            invoiceHtmls += '<td>'+GetDateT(new Date(itemIntro.maturityDate))+'</td>';
                            invoiceHtmls += '</tr>';
                        })
					});
                    htmls+='<div class="track_box">';
						htmls+='<div class="track_title">';
							htmls+='<div class="track_items w40"><span class="default_checkbox track_check" data-id="'+rowdata.id+'"></span> </div>';
							htmls+='<div class="track_items w80"><span class="track_year">'+new Date(GetDateT(new Date(rowdata.financeStart))).getFullYear()+'</span></div>';
							htmls+='<div class="track_items w1000">';
								htmls+='<div class="track_list">';
									htmls+='<span class="track_list_items voucherNo" title="'+vNOHtml+'">应付凭证：'+vNOHtml+'</span>';
									htmls+='<span class="track_list_items">需求编号：'+rowdata.financingNeedsNo+'</span>';
									htmls+='<span class="track_list_items">'+rowdata.supplyShortName+'</span>';
									htmls+='<span class="track_list_items wp15">'+rowdata.finInsShortName+'</span>';
									htmls+='<span class="track_list_items">到期日：'+GetDateT(new Date(rowdata.financeEnd))+'</span>';
								htmls+='</div>';
								htmls+='<div class="track_list no_border_bot">';
									htmls+='<span class="track_list_items">融资金额：'+$.formatMoney(rowdata.intentionFmoney,2)+'元</span>';
									htmls+='<span class="track_list_items">融资利率：'+$.formatMoney(bankRate,2)+'</span>';
									htmls+='<span class="track_list_items">融资利息：'+$.formatMoney(rowdata.intentionFmoney*bankRate/100,2)+'元</span>';
									htmls+='<span class="track_list_items wp15">融资比例：'+ financeProportion*100 +'%</span>';
									htmls+='<span class="track_list_items">期限：'+GetDateT(new Date(rowdata.financeStart))+'~'+GetDateT(new Date(rowdata.financeEnd))+'</span>';
								htmls+='</div>';
							htmls+='</div>';
							htmls+='<div class="track_items track_down_item"><span class="sxf_btn icon_down track_down"></span></div>';
						htmls+='</div>';
						htmls+='<div class="track_down_box">';
							htmls+='<div class="track_process">';
								htmls+='<p>放款--日期：'+GetDateT(new Date(loanDate))+' 金额：'+$.formatMoney(financeMoney,2)+' ('+finInsShortName+')</p>';
								htmls+='<p>还款--日期：'+GetDateT(new Date(loanDate))+' 金额：'+$.formatMoney(loanMoney,2)+'</p>';
								htmls+='<p>收款--日期：'+GetDateT(new Date(receivablesDate))+' 金额：'+$.formatMoney(receivablesMoney,2)+'（'+supplyShortName+'）</p>';
								htmls+='<p>备注：'+rowdata.payableCertificate+'</p>';
							htmls+='</div>';
							htmls+='<div class="track_tickets">';
								htmls+='<table class="track_tickets_table">';
									htmls+='<thead>';
										htmls+='<tr>';
											htmls+='<td>凭证号</td>';
											htmls+='<td>发票代码</td>';
											htmls+='<td>发票号码</td>';
											htmls+='<td>价税合计</td>';
											htmls+='<td>金额</td>';
											htmls+='<td>税额</td>';
											htmls+='<td>所属公司</td>';
											htmls+='<td>开票日期</td>';
											htmls+='<td>批次号</td>';
											htmls+='<td>账款到期日</td>';
										htmls+='</tr>';
									htmls+='</thead>';
									htmls+='<tbody>';
										htmls += invoiceHtmls;
									htmls+='</tbody>';
								htmls+='</table>';
							htmls+='</div>';
						htmls+='</div>';
					htmls+='</div>';
                	return htmls;
				}
			}],
            loadComplete:function(data){
                $(".total_track").html(data.records);
			}
		}
		return cfgData;
	},
	//统计选择的项目
	getAllCheckItem:function(){
		var g = this;
        $(".total_check").html(g.checkBoxList.length);
	},
    //添加选择的项
	setDataInCheckList:function(id){
		var g = this;
        if(g.checkBoxList.length == 0) {
            g.checkBoxList.push(id);
        }
        var s = false;//默认不存在id
        $.each(g.checkBoxList, function(i,item) {
            if(item == id){
                s = true;
                return false;
            }
        });
        if(!s){
            //不存在id则添加
            g.checkBoxList.push(id);
        }
	},
    //移除选择的项
    removeDataInCheckList:function(id){
		var g = this;
        $.each(g.checkBoxList, function(i,item) {
            if(item == id){
                g.checkBoxList.splice(i,1);
                return false;
            }
        });
	},
    //设置复选框样式
	setCheckStyle:function(){
		var g = this;
		$(".track_check").each(function(i,item){
			var flag = $(this).attr("data-id");
            var s = false;//默认不存在id
            $.each(g.checkBoxList, function(i,item) {
                if(item == flag){
                    s = true;
                    return false;
                }
            });
            if(!s){
                //不存在id则添加
                $(this).addClass("default_checkbox").removeClass("checked_checkbox");
            }else{
                $(this).addClass("checked_checkbox").removeClass("default_checkbox");
			}
		});
	},
    //初始化高级查询表单
    initSearchForm:function(){
        var g = this;
        var options = {
            id: "repaymentForm", //表单id
            renderTo: "formBox1",//表单容器id
            submitId:"submitId",//提交按钮id
            tableId:g.cfgId,//要刷新的表格id
            title:"高级查询",//查询标题
            formGrid: [
            //     {
            //     xtype: "ComboBox",
            //     field: ["companyCode"], // 表示哪些值需要提交到后端
            //     name: "companyName",
            //     labelWidth: 122,
            //     id: "companyCode",
            //     title: "核心企业",
            //     width: 280,
            //     allowBlank: true,
            //     displayText: "请选择核心企业",
            //     async: true, // 是否异步，true为异步
            //     store: {
            //         type: "get",
            //         url: _ctxPath + "/avf/financingRelConfigure/findRelBySupplyCode.json"
            //     }, // 从后台获取数据的地址
            //     editable: true, // 是否可编辑
            //     loadMask: true, // 是否有遮罩层
            //     showSearch: false, // 是否展开下拉框
            //     searchText: "companyCode", // 下拉框的内容
            //     canClear: true,
            //     deforeLoad: function (store) {
            //     },
            //     afterLoad: function (data) {
            //
            //     },
            //     afterSelect: function (d) {
            //         EUI.getCmp("finInsCode").store.params.companyCode=d.data.companyCode;
            //     }
            // }, {
            //     xtype: "ComboBox",
            //     field: ["finInsCode"], // 表示哪些值需要提交到后端
            //     name: "finInsName",
            //     labelWidth: 122,
            //     id: "finInsCode",
            //     title: "资金提供方",
            //     width: 280,
            //     allowBlank: true,
            //     displayText: "请选择资金提供方",
            //     async: true, // 是否异步，true为异步
            //     store: {
            //         type: "get",
            //         url: _ctxPath + "/avf/financingRelConfigure/findRelByCompanyCodeAndSupplyCode.json",
            //         params: {'companyCode':''}
            //     }, // 从后台获取数据的地址
            //     editable: true, // 是否可编辑
            //     loadMask: true, // 是否有遮罩层
            //     showSearch: false, // 是否展开下拉框
            //     searchText: "finInsCode", // 下拉框的内容
            //     canClear: true,
            //     deforeLoad: function (store) {
            //     },
            //     afterLoad: function (data) {
            //
            //     },
            //     afterSelect: function (data) {
            //
            //     }
            // },
                {
                xtype: "FieldGroup",
                width:500,
                title:"融资期限",
                labelWidth: 122,
                itemspace:10,
                items: [{
                    xtype: "DateField",
                    width: 105,
                    allowBlank: true,
                    displayText: "融资开始日",
                    name: "financeStart",
                    id:"financeStart",
                    checkInitValue:false,
                    validateText: "请输入正确的融资开始日！"
                },{
                    xtype: "DateField",
                    labelWidth: 45,
                    width: 105,
                    title:"到",
                    id:"financeEnd",
                    name: "financeEnd",
                    checkInitValue:false,
                    allowBlank: true,
                    displayText: "融资到期日", // 显示在文本框内的提示语
                    validateText:"融资到期日必须大于融资开始日",
                    validaterDate:function(data){
                        var financeStart = new Date(EUI.getCmp("financeStart").getValue());
                        var maturityDate = new Date(data);
                        if(maturityDate >= financeStart){
                            return true;
                        }
                    }
                }]
            },{
                xtype: "FieldGroup",
                width:500,
                itemspace:10,
                items: [{
                    xtype: "NumberField",
                    width: 85,
                    labelWidth: 122,
                    precision : 0,
                    // value:0,
                    allowBlank: true,
                    // minlength:1,
                    title:"融资金额",
                    // minValue:1,
                    displayText: "最小融资金额",
                    name: "minMoney",
                    unit: "元",
                    id:"minMoney",
                    checkInitValue:false,
                    validateText: "请输入正确的最小融资金额！"
                },{
                    xtype: "NumberField",
                    precision : 0,
                    labelWidth: 45,
                    width: 85,
                    // value:0,
                    title: "到",
                    // minlength:1,
                    // minValue:1,
                    id:"maxMoney",
                    name: "maxMoney",
                    checkInitValue:false,
                    allowBlank: true,
                    displayText: "最大融资金额", // 显示在文本框内的提示语
                    validateText:"最大融资金额不能小于最小融资金额",
                    unit: "元",
                    validater:function(value){
                        var minMoney = parseFloat(EUI.getCmp("minMoney").getValue().toFixed(2));
                        if(minMoney>value){
                            return false;
                        }
                    }
                }]
            }] //表单配置
        }
        searchWin = new showSearchWin(options);
    }
});