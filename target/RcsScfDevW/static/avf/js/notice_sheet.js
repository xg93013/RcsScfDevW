/**
 * Created by xionggang on 2017/8/1.
 * des:供应商通知单
 * jspPath:WEB-INF/views/avf/supplier/sheet.jsp
 */
EUI.NoticeSheet = EUI.extend(EUI.CustomUI, {
	renderTo: "",
	cfgId: "",
	initComponent: function() {
		var g = this;
		EUI.GridPanel({
			renderTo: this.renderTo,
			xtype: "GridPanel",
			padding: 0, //设置表格的内边距
			overflow: "hidden",
			height:"auto",
			id: g.cfgId,
			autoLoad: true, //自动加载
			gridCfg: g.initGrid()
		});
		g.addEvents();
		g.initSearchForm();
		g.initDownList();
	},
    initDownList:function(){
        var g = this;
        //追加状态
        var obj = {'data1':[
            {statusCode:null,statusDetail:'全部'},
            {statusCode:'3010',statusDetail:'待确认'},
            {statusCode:'3020',statusDetail:'已确认'},
        ]};
        tabHeadSearch.clickElement(obj,g.cfgId,'businessDealStatus');
        // tabHeadSearch.clickElement(obj,'sheetTab','businessDealStatus');
    },
	initGrid: function() {
		var g = this;
		//配置表格
		var cfgData = {
			url:_ctxPath+"/avf/notice/noticesList.json?tab=notice",
			rowNum:10,
			rownumbers: false,
            mtype : "post",
			loadonce: false, //一次性加载数据，和autoLoad都为true时，则可以一次加载所有数据
			colModel: [{
				name: "id", //列显示的名称
				index: "id", //传到服务器端用来排序的列名称
				hidden: true //隐藏不显示这一组
			},{
				label: "核心企业",
				name: "companyShortName",
				index: "companyShortName",
				formatter: function(value, id, rowdata) {
					return '<span>' + rowdata.companyShortName + '</span>';
				}
			}, {
				label: "融资银行",
				name: "finInsShortName",
				index: "finInsShortName",
				formatter: function(value, id, rowdata) {
					if(rowdata.finInsShortName == "" || rowdata.finInsShortName == undefined){
						return "";
					}else{
                        return '<span>' + rowdata.finInsShortName + '</span>';
					}

				}
			}, {
				label: "银行利率(%)",
				name: "bankRate",
				index: "bankRate",
				width:120,
				formatter:function(value, id, rowdata){
                    return parseFloat(rowdata.bankRate).toFixed(2);
				}
			}, {
				label: "融资金额(元)<b class='sorting no_sort' data='financeMoney'></b>",
				name: "financeMoney",
				index: "financeMoney",
				formatter: function(value, id, rowdata) {
					return '<span class="font18 bold">￥' + $.formatMoney(rowdata.financeMoney,2) + '</span>';
				}
			},{
                label: "发票总金额<b class='sorting no_sort' data='invoiceTotalMoney'></b>",
                name: "invoiceTotalMoney",
                index: "invoiceTotalMoney",
				hidden:true
            }, {
				label: "融资比例(%)",
				name: "financeProportion",
				index: "financeProportion",
				width:120,
                formatter: function(value, id, rowdata) {
                    // return '<span class="font18 bold">' + Math.round(rowdata.financeMoney/rowdata.invoiceTotalMoney*100) + '</span>';
                    return rowdata.financeProportion*100;
                }
			}, {
				label: "融资起始日",
				name: "financeStart",
				index: "financeStart",
                formatter: function(value, id, rowdata) {
                    return '<span class="font16">' +GetDateT(new Date(rowdata.financeStart)) + '<br/>';
                }
			}, {
				label: "融资到期日",
				name: "financeEnd",
				index: "financeEnd",
                formatter: function(value, id, rowdata) {
                    return '<span class="font16">' +GetDateT(new Date(rowdata.financeEnd)) + '<br/>';
                }
			}, {
				label: "状态<b class='b_btn b_state' data='businessDealStatus'></b>",
				name: "businessDealStatus",
				index: "businessDealStatus",
				width:120,
				formatter: function(value, id, rowdata) {
					return(rowdata.businessDealStatus == "3010") ? '待确认' : '已确认';
				}
			}, {
				label: "操作",
				name: "",
				index: "",
				width: 170,
				formatter: function(value, id, rowdata) {
                    var url = "/avf/notice/noticeConfirmPage?identityType=SUPPLIER&id="+rowdata.id;
                    var detailUrl = "/avf/notice/noticeDetailPage?identityType=SUPPLIER&id="+rowdata.id;

                    //_ctxPath+ '/avf/notice/noticeDetailPage?id='+id+'&identityType=ENTERPRISE'
					return(rowdata.businessDealStatus == "3010") ? '<a href="'+url+'"  class="table_btn" data-id="' + rowdata.id + '">通知单确认</a>' : '<a href="'+detailUrl+'"  class="sxf_btn icon_detail" data-id="' + rowdata.id + '"></a>';
				}
			}]
		}
		return cfgData;
	},
	addEvents: function() {

	},
    //初始化高级查询表单
    initSearchForm:function() {
        var g = this;
        var options = {
            id: "repaymentForm", //表单id
            renderTo: "formBox1",//表单容器id
            submitId: "submitId",//提交按钮id
            tableId: g.cfgId,//要刷新的表格id
            title: "高级查询",//查询标题
            formGrid: [{
                xtype: "ComboBox",
                field: ["companyCode"], // 表示哪些值需要提交到后端
                name: "companyName",
                labelWidth: 122,
                id: "companyCode",
                title: "核心企业",
                width: 280,
                allowBlank: true,
                displayText: "请选择核心企业",
                async: true, // 是否异步，true为异步
                store: {
                    type: "get",
                    url: _ctxPath + "/avf/financingRelConfigure/findRelBySupplyCode.json"
                }, // 从后台获取数据的地址
                editable: true, // 是否可编辑
                loadMask: true, // 是否有遮罩层
                showSearch: false, // 是否展开下拉框
                searchText: "companyCode", // 下拉框的内容
                canClear: true,
                deforeLoad: function (store) {
                },
                afterLoad: function (data) {

                },
                afterSelect: function (d) {
                    EUI.getCmp("finInsCode").store.params.companyCode=d.data.companyCode;
                }
            }, {
                xtype: "ComboBox",
                field: ["finInsCode"], // 表示哪些值需要提交到后端
                name: "finInsName",
                labelWidth: 122,
                id: "finInsCode",
                title: "资金提供方",
                width: 280,
                allowBlank: true,
                displayText: "请选择资金提供方",
                async: true, // 是否异步，true为异步
                store: {
                    type: "get",
                    url: _ctxPath + "/avf/financingRelConfigure/findRelByCompanyCodeAndSupplyCode.json",
                    params: {'companyCode':''}
                }, // 从后台获取数据的地址
                editable: true, // 是否可编辑
                loadMask: true, // 是否有遮罩层
                showSearch: false, // 是否展开下拉框
                searchText: "finInsCode", // 下拉框的内容
                canClear: true,
                deforeLoad: function (store) {
                },
                afterLoad: function (data) {

                },
                afterSelect: function (data) {

                }
            }, {
                xtype: "FieldGroup",
                width: 500,
                title: "融资期限",
                labelWidth: 122,
                itemspace: 10,
                items: [{
                    xtype: "DateField",
                    width: 105,
                    allowBlank: true,
                    displayText: "融资开始日",
                    name: "financeStart",
                    id: "financeStart",
                    checkInitValue: false,
                    validateText: "请输入正确的融资开始日！"
                }, {
                    xtype: "DateField",
                    labelWidth: 45,
                    width: 105,
                    title: "到",
                    id: "financeEnd",
                    name: "financeEnd",
                    checkInitValue: false,
                    allowBlank: true,
                    displayText: "融资到期日", // 显示在文本框内的提示语
                    validateText: "融资到期日必须大于融资开始日",
                    validaterDate: function (data) {
                        var financeStart = new Date(EUI.getCmp("financeStart").getValue());
                        var maturityDate = new Date(data);
                        if (maturityDate >= financeStart) {
                            return true;
                        }
                    }
                }]
            }, {
                xtype: "FieldGroup",
                width: 500,
                itemspace: 10,
                items: [{
                    xtype: "NumberField",
                    width: 85,
                    labelWidth: 122,
                    precision: 0,
                    // value:0,
                    allowBlank: true,
                    // minlength:1,
                    title: "融资金额范围",
                    // minValue:1,
                    displayText: "最小融资金额",
                    name: "minMoney",
                    unit: "元",
                    id: "minMoney",
                    checkInitValue: false,
                    validateText: "请输入正确的最小融资金额！"
                }, {
                    xtype: "NumberField",
                    precision: 0,
                    labelWidth: 45,
                    width: 85,
                    // value:0,
                    title: "到",
                    // minlength:1,
                    // minValue:1,
                    id: "maxMoney",
                    name: "maxMoney",
                    checkInitValue: false,
                    allowBlank: true,
                    displayText: "最大融资金额", // 显示在文本框内的提示语
                    validateText: "最大融资金额不能小于最小融资金额",
                    unit: "元",
                    validater: function (value) {
                        var minMoney = parseFloat(EUI.getCmp("minMoney").getValue().toFixed(2));
                        if (minMoney > value) {
                            return false;
                        }
                    }
                }]
            }] //表单配置
        }
        searchWin = new showSearchWin(options);
    }
});