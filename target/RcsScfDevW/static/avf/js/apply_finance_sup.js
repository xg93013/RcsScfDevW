/**
 * Created by Administrator on 2017/8/1.
 * des:供应商申请融资js
 * jspPath:WEB-INF/views/avf/supplier/apply_finance.jsp
 */
EUI.ApplyFinance2 = EUI.extend(EUI.CustomUI, {
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
            width:1160,
			renderTo: _this.renderTo,
			padding: 0, //设置表格的内边距
			exportXls: false,
			searchConfig: null,
			showRefresh: false,
			id: "applyFinancingTab2",
			height: 'auto',
			gridCfg: {
				rownumbers: false, //去掉表格序号
				loadonce: false, //一次性加载数据，和autoLoad都为true时，则可以一次加载所有数据
                url:_ctxPath+"/avf/financingDemand/demandList.json",//获取后端数据
                rowNum:10,//一页显示几条数据
				// shrinkToFit: true, //表格宽度不自适应
				//height:300,
				colModel: [{
					label: "序号",
					name: "id", //列显示的名称
					index: "id", //传到服务器端用来排序的列名称
					width: 50,
					hidden: true //隐藏不显示这一组
				}, {
					label: "核心企业",
					name: "companyShortName",
					index: "companyShortName",
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
					//width: 120,
                    formatter: function(value, id, rowdata) {
                        return parseFloat(rowdata.bankRate).toFixed(2);
                    }
				}, {
					label: "融资金额(元)<b class='sorting no_sort' data='intentionFmoney'></b>",
					name: "intentionFmoney",
					index: "intentionFmoney",
					width: 200,
                    formatter: function(value, id, rowdata) {
                        return '<span class="font20">￥' + $.formatMoney(rowdata.intentionFmoney,2) + '</span>';
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
					// 	return GetDateT(new Date(rowdata.financeStart));
                    // }

				}, {
					name:"intentionFterm",
					index:"intentionFterm",
					hidden:true,
				},{
					label: "融资期限<b class='sorting no_sort' data='financeStart'></b>",
					name: "financeEnd",
					index: "financeEnd",
					width: 300,
                    formatter: function(value, id, rowdata) {
						if(rowdata.businessDealStatus == '2020'){
                            return GetDateT(new Date(rowdata.financeStart))+'~'+GetDateT(new Date(rowdata.intentionFterm));
						}else{
                            return GetDateT(new Date(rowdata.financeStart))+'~'+GetDateT(new Date(rowdata.financeEnd));
						}

                    }
				}, {
					label: "状态<b class='b_btn b_state' data='businessDealInfo'></b>",
					name: "businessDealInfo",
					index: "businessDealInfo",
					width: 200,

				}, {
					label: "操作",
					name: "businessDealStatus",
					index: "businessDealStatus",
					width: 200,
					formatter: function(value, id, rowdata) {
					    if(rowdata.businessDealStatus == '2020'){
                            return '<div class="search_a"><a class="sxf_btn icon_detail look_detail" title="查看明细" data='+rowdata.id+'></a><span class="sxf_btn icon_edit edit_finance ml20" title="编辑" data-id="' + rowdata.id + '"></span><span class="sxf_btn icon_delete del_finance ml20" title="删除" data-id="' + rowdata.id + '"></span></div>';
                        }else{
                            return '<a class="sxf_btn icon_detail look_detail" title="查看明细" data='+rowdata.id+'></a>';
                        }
					}
				}],
			}
		});
	},
    //初始化高级查询表单
    initSearchForm:function(){
        var options = {
            id: "searchForm2", //表单id
            renderTo: "formBox1",//表单容器id
            submitId:"submitId",//提交按钮id
            tableId:"applyFinancingTab2",//要刷新的表格id
            title:"高级查询",//查询标题
            formGrid: [{
                xtype: "ComboBox",
                field: ['companyCode'], // 表示哪些值需要提交到后端
                name: 'companyName',
                labelWidth: 120,
                id: "companyCode",
                title: '核心企业',
                width: 280,
                allowBlank: true,
                displayText: '请选择核心企业',
                async: true, // 是否异步，true为异步
                store: {
                    type:"get",
                    url: _ctxPath + "/avf/financingRelConfigure/findRelBySupplyCode.json"
                }, // 从后台获取数据的地址
                editable: true, // 是否可编辑
                loadMask: true, // 是否有遮罩层
                showSearch: false, // 是否展开下拉框
                searchText: "companyName", // 下拉框的内容
                canClear: true,
                deforeLoad: function(store) {},
                afterLoad: function(data) {

                },
                afterSelect:function(d){
                    EUI.getCmp("finInsCode").store.params.companyCode=d.data.companyCode;
                }
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
                    url: _ctxPath + "/avf/financingRelConfigure/findRelByCompanyCodeAndSupplyCode.json",
                    params: {'companyCode':''},
                }, // 从后台获取数据的地址
                editable: true, // 是否可编辑
                loadMask: true, // 是否有遮罩层
                showSearch: false, // 是否展开下拉框
                searchText: "finInsName", // 下拉框的内容
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
                    width: 109,
                    displayText: '融资开始日',
                    allowBlank: true, //是否可以为空
                    name: "minDate", // 设置日期选择框的name,用于后台接受此name
                    id: "minDate",
                },{
                    xtype: "DateField",
                    title: "到",
                    format: "Y-m-d", // 采用年月日的格式
                    labelWidth: 44, //设置label的宽度
                    width: 109,
                    allowBlank: true, //是否可以为空
                    name: "maxDate", // 设置日期选择框的name,用于后台接受此name
                    id: "maxDate",
                    displayText: '融资到期日',
                    checkInitValue: false,
                    validateText: "融资到期日必须大于融资开始日",
                    validaterDate: function (data) {
                        var financeStart = new Date(EUI.getCmp("minDate").getValue());
                        var maturityDate = new Date(data);
                        if (maturityDate >= financeStart) {
                            return true;
                        }
                    }
                }]
            }] //表单配置
        }
        searchWin = new showSearchWin(options);
    },
	addEvents: function() {
		//查看详情
		$(".look_detail").live("click", function() {
			var id = $(this).attr('data');
			window.location.href=_ctxPath+'/avf/financingApprove/financingApproveHeadDetailsPage?id='+id;
		});
		//删除融资申请
        $(".del_finance").live("click", function() {
            var id = $(this).attr('data-id');
            delInfoWin(_ctxPath + "/avf/financingDemand/deleteDemand.json?id="+id,'applyFinancingTab2',id,function () {
                $('#bideNumber').text(parseInt($('#bideNumber').text()) - 1);
            });
        });
        //编辑融资申请
        $(".edit_finance").live("click", function() {
            var id = $(this).attr('data-id');
            window.location.href=_ctxPath+'/avf/financingDemand/editDemand?id='+id;
        });
		//开始融资
		$('#startFinance').click(function () {
			window.location.href = _ctxPath+'/avf/financingDemand/toAddFinanceFirst';
        });
        //追加状态
        var obj = {'data1':[{statusCode:null,statusDetail:'全部'},
            {statusCode:'2020',statusDetail:'待维护'},
            {statusCode:'2030,2031,2040',statusDetail:'已申请'},
            {statusCode:'1022',statusDetail:'已驳回'}]};
        tabHeadSearch.clickElement(obj,'applyFinancingTab2','businessDealStatus');
	}
});