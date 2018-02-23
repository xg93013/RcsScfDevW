/**
 * Created by Administrator on 2017/8/1.
 * des:核心企业申请融资js
 * jspPath:WEB-INF/views/avf/enterprise/apply_finance.jsp
 */
EUI.ApplyFinance = EUI.extend(EUI.CustomUI, {
	renderTo: null,
	height: 'auto',
	data: null,
	initComponent: function() {
		var _this = this;
        _this.initGrid();
        _this.addEvents();
        _this.initSearchForm();
	},
	initGrid: function() {
		var _this = this;
		EUI.GridPanel({
			//xtype: "GridPanel",
            width:1160,
			renderTo: _this.renderTo,
			padding: 0, //设置表格的内边距
			exportXls: false,
			searchConfig: null,
			showRefresh: false,
			id: "applyFinancingTab",
			//autoLoad: true, //自动加载
			height: 'auto',
			gridCfg: {
				rownumbers: false, //去掉表格序号
                url:_ctxPath+"/avf/financingDemand/demandList.json",//获取后端数据
                rowNum: 10,//一页显示几条数据
                loadonce:false,//true数据一次性加载,每页返回加载每页的数据
				// shrinkToFit: true,//表格宽度自适应
                colModel: [{
                    label: "序号",
                    name: "id", //列显示的名称
                    index: "id", //传到服务器端用来排序的列名称
                    // width: 50,
                    hidden: true //隐藏不显示这一组
                }, {
                    label: "供应商",
                    name: "supplyShortName",
                    index: "supplyShortName",
                    //width: 124,

                }, {
                    label: "融资银行",
                    name: "finInsShortName",
                    index: "finInsShortName",
                    //width: 124,

                }, {
                    label: "银行利率(%)",
                    name: "bankRate",
                    index: "bankRate",
                    formatter: function(value, id, rowdata) {
                        return parseFloat(rowdata.bankRate).toFixed(2);
                    }
                    //width: 120,
                }, {
                    label: "融资金额(元)<b class='sorting no_sort' data='intentionFmoney'></b>",
                    name: "intentionFmoney",
                    index: "intentionFmoney",
                    width: 200,
                    formatter: function(value, id, rowdata) {
                        return '<span class="font18 color555 bold">￥' + $.formatMoney(rowdata.intentionFmoney,2) + '</span>';
                    }

                }, {
                    label: "发票总金额",
                    name: "totalMoney",
                    index: "totalMoney",
                    hidden:true,

                }, {
                    label: "融资比例(%)",
                    name: "name4",
                    index: "name4",
                    //width: 120,
                    formatter: function(value, id, rowdata) {
                        return Math.round(rowdata.intentionFmoney/rowdata.totalMoney*100);
                    }

                }, {
                    label: "融资起始日",
                    name: "financeStart",
                    index: "financeStart",
                    hidden:true,
                    // width: 130,
                    // formatter: function(value, id, rowdata) {
                    //     return GetDateT(new Date(rowdata.financeStart));
                    // }
                }, {
                    label: "融资期限<b class='sorting no_sort' data='financeStart'></b>",
                    name:"intentionFterm",
                    index:"intentionFterm",
                    width:300,
                    formatter: function(value, id, rowdata) {
                        if(rowdata.businessDealStatus == '2020'){
                            return GetDateT(new Date(rowdata.financeStart))+'~'+GetDateT(new Date(rowdata.intentionFterm));
                        }else{
                            return GetDateT(new Date(rowdata.financeStart))+'~'+GetDateT(new Date(rowdata.financeEnd));
                        }
                    }
                },{
                    label: "融资到期日",
                    name: "financeEnd",
                    index: "financeEnd",
                    // width: 130,
                    hidden:true,
                    // formatter: function(value, id, rowdata) {
                    //     if(rowdata.businessDealStatus == '2020'){
                    //         return GetDateT(new Date(rowdata.intentionFterm));
                    //     }else{
                    //         return GetDateT(new Date(rowdata.financeEnd));
                    //     }
                    // }
                },{
                    label: "状态<b class='b_btn b_state' data='businessDealInfo'></b>",
                    name: "businessDealInfo",
                    index: "businessDealInfo",
                    width: 200,
                    style: {
                        'text-align': 'left',
                    },

                },{
					label: "操作",
					name: "businessDealStatus",
					index: "businessDealStatus",
					width:200,
					formatter: function(value, id, rowdata) {
						if(parseInt(rowdata.businessDealStatus) == 2020) {
							return '<div class="btn_defend defend_account" data='+rowdata.id+'>维护延长账款</div>';
						} else {
							return '<a class="sxf_btn icon_detail look_detail" data='+rowdata.id+' title="查看明细"></a>';
						}

					}
				}],
			}
		});
	},
    //初始化高级查询表单
    initSearchForm:function(){
        var g = this;
        var options = {
            id: "searchForm2", //表单id
            renderTo: "formBox1",//表单容器id
            submitId:"submitId",//提交按钮id
            tableId:"applyFinancingTab",//要刷新的表格id
            title:"高级查询",//查询标题
            formGrid: [{
                xtype: "ComboBox",
                field: ['supplyCode'], // 表示哪些值需要提交到后端
                name: 'supplyName',
                labelWidth: 120,
                id: "supplyCode",
                title: '供应商',
                width: 280,
                allowBlank: true,
                displayText: '请选择供应商',
                async: true, // 是否异步，true为异步
                store: {
                    type:"get",
                    url: _ctxPath + "/avf/financingRelConfigure/findRelByCompanyCode.json"
                }, // 从后台获取数据的地址
                editable: true, // 是否可编辑
                loadMask: true, // 是否有遮罩层
                showSearch: false, // 是否展开下拉框
                searchText: "supplyCode", // 下拉框的内容
                canClear: true,
                deforeLoad: function(store) {},
                afterLoad: function(data) {},
                afterSelect:function(data){}
            },{
                xtype: "ComboBox",
                field: ['finInsCode'], // 表示哪些值需要提交到后端
                name: 'finInsName',
                labelWidth: 120,
                id: "finInsCode",
                title: '融资银行',
                width: 280,
                allowBlank: true,
                displayText: '请选择融资银行',
                async: true, // 是否异步，true为异步
                store: {
                    type:"get",
                    url: _ctxPath + "/avf/financingRelConfigure/findFinByCompanyCode.json"
                }, // 从后台获取数据的地址
                editable: true, // 是否可编辑
                loadMask: true, // 是否有遮罩层
                showSearch: false, // 是否展开下拉框
                searchText: "finInsCode", // 下拉框的内容
                canClear: true,
            },{
                    xtype: "FieldGroup",
                    width:500,
                    itemspace:10,
                    items: [{
                        xtype: "DateField",
                        title: "融资期限",
                        format: "Y-m-d", // 采用年月日的格式
                        labelWidth: 120, //设置label的宽度
                        //maxDate: null, // 设置能够选择的最大日期
                        // minDate: new Date($('#financeEnd').val()).format('yyyyMMdd'), // 设置能够选择的最小日期，日期格式为"20170301"
                        width: 109,
                        allowBlank: true, //是否可以为空
                        name: "minDate", // 设置日期选择框的name,用于后台接受此name
                        id: "minDate",
                        displayText: "融资开始日",
                    },{
                        xtype: "DateField",
                        title: "到",
                        format: "Y-m-d", // 采用年月日的格式
                        labelWidth: 44, //设置label的宽度
                        width: 109,
                        allowBlank: true, //是否可以为空
                        name: "maxDate", // 设置日期选择框的name,用于后台接受此name
                        id: "maxDate",
                        checkInitValue: false,
                        displayText: "融资到期日", // 显示在文本框内的提示语
                        validateText: "融资到期日必须大于融资开始日",
                        validaterDate: function (data) {
                            var financeStart = new Date(EUI.getCmp("minDate").getValue());
                            var maturityDate = new Date(data);
                            if (maturityDate >= financeStart) {
                                return true;
                            }
                        },
                    }]
                },
                // {
                //     xtype: "ComboBox",
                //     field: ["businessDealStatus"], // 表示哪些值需要提交到后端
                //     name: "name",
                //     labelWidth: 120,
                //     id: "businessDealStatus",
                //     title: "状态",
                //     width: 280,
                //     allowBlank: false,
                //     displayText: "请选择状态",
                //     async: true, // 是否异步，true为异步
                //     // store: {
                //     //     type:"get",
                //     //     url: _ctxPath + "/avf/financingRelConfigure/findRelByCompanyCode.json"
                //     // }, // 从后台获取数据的地址
                //     data : [{
                //         businessDealStatus : "0",
                //         name : "全部"
                //     }, {
                //         businessDealStatus : "1011",
                //         name : "已录入"
                //     }, {
                //         businessDealStatus : "1020",
                //         name : "已融资"
                //     }],
                //     editable: true, // 是否可编辑
                //     loadMask: true, // 是否有遮罩层
                //     showSearch: false, // 是否展开下拉框
                //     searchText: "businessDealStatus", // 下拉框的内容
                //     canClear: true,
                //     deforeLoad: function(store) {},
                //     afterLoad: function(data) {
                //
                //     },
                //     afterSelect:function(data){
                //
                //     }
                // }
                ] //表单配置
        }
        searchWin = new showSearchWin(options);
    },
	addEvents: function() {
		//维护延长账款
        $('.defend_account').live('click', function () {
        	var id = $(this).attr('data');
			window.location.href=_ctxPath+"/avf/financingDemand/toMaintainExtendPage?id="+id;
		});
        //查看详细
        $('.look_detail').live('click', function () {
            var id = $(this).attr('data');
            window.location.href=_ctxPath+"/avf/financingApprove/financingApproveHeadDetailsPage?id="+id;
        });
        //追加状态
        var obj = {'data1':[{statusCode:null,statusDetail:'全部'},
            {statusCode:'2020',statusDetail:'待维护'},
            {statusCode:'2030,2031,2040',statusDetail:'已申请'},
            {statusCode:'1022',statusDetail:'已驳回'}]};
        tabHeadSearch.clickElement(obj,'applyFinancingTab','businessDealStatus');
	}
});