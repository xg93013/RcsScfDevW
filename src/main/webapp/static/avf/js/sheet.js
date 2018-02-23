/**
 * Created by Administrator on 2017/8/1.
 * des:核心企业通知单js
 * jspPath:WEB-INF/views/avf/enterprise/sheet.jsp
 */
EUI.Sheet = EUI.extend(EUI.CustomUI, {
	renderTo: null,
    renderTo1: null,
	width:1188,
	height: 'auto',
	data: null,
	initComponent: function() {
		var _this = this;
		this.initGrid();
		this.addEvents();
		this.initSearchForm();
	},
	initGrid: function() {
		var _this = this;
		EUI.GridPanel({
			renderTo: _this.renderTo,
			padding: 0, //设置表格的内边距
			exportXls: false,
			searchConfig: null,
			showRefresh: false,
			id: "sheetTab",
			height: 'auto',
			gridCfg: {
                url:_ctxPath+"/avf/notice/noticesList.json?tab=notice",//获取后端数据
                rowNum: 10,//一页显示几条数据
                loadonce:false,//true数据一次性加载,每页返回加载每页的数据
				//shrinkToFit: false,//表格宽度自适应
				rownumbers: false, //去掉表格序号
				colModel:_this.getColModel(0),
			}
		});
        EUI.GridPanel({
            renderTo: _this.renderTo1,
            padding: 0, //设置表格的内边距
            exportXls: false,
            searchConfig: null,
            showRefresh: false,
            id: "tradeTab",
            height: 'auto',
            gridCfg: {
                url:_ctxPath+"/avf/notice/noticesList.json?tab=deal",//获取后端数据
                rowNum: 10,//一页显示几条数据
                loadonce:false,//true数据一次性加载,每页返回加载每页的数据
                // shrinkToFit: true,//表格宽度自适应
                rownumbers: false, //去掉表格序号
                colModel:_this.getColModel(1),
            }
        });
	},
    getColModel:function (flag) {
		return [{
            label: "序号",
            name: "id", //列显示的名称
            index: "id", //传到服务器端用来排序的列名称
            hidden: true, //隐藏不显示这一组
        }, {
            label: "供应商",
            name: "supplyShortName",
            index: "supplyShortName",
			width:100,

        }, {
            label: "融资银行",
            name: "finInsShortName",
            index: "finInsShortName",
            width:100,
        }, {
            label: "银行利率(%)",
            name: "bankRate",
            index: "bankRate",
            width:110,
            formatter: function(value, id, rowdata) {
                return parseFloat(rowdata.bankRate).toFixed(2);
            }

        },{
            label: "融资金额(元)<b class='sorting no_sort' data='financeMoney'></b>",
            name: "financeMoney",
            index: "financeMoney",
            width:153,
            // align:'right',
            formatter: function(value, id, rowdata) {
                return '<span class="font20">￥' + $.formatMoney(rowdata.financeMoney,2) + '</span>';
            }
        },{
            label: "融资比例(%)",
            name: "financeProportion",
            index: "financeProportion",
            width:110,
            formatter: function(value, id, rowdata) {
                // return '<span class="font20">' + Math.round(rowdata.financeMoney/rowdata.invoiceTotalMoney*100) + '</span>';
                return rowdata.financeProportion*100;
            }
        },{
            label: "融资起始日",
            name: "financeStart",
            index: "financeStart",
            width:110,
            hidden:true,
        },{
            label: "融资期限<b class='sorting no_sort' data='financeStart'></b>",
            name: "financeEnd",
            index: "financeEnd",
            width:220,
            formatter: function(value, id, rowdata) {
                return GetDateT(new Date(rowdata.financeStart))+'~'+GetDateT(new Date(rowdata.financeEnd));
            }
        }, {
            label: "状态<b class='b_btn b_state' data='businessDealInfo'></b>",
            name: "businessDealInfo",
            index: "businessDealInfo",
            width:150,
        }, {
            label: "操作",
            name: "businessDealStatus",
            index: "businessDealStatus",
            width:175,
            formatter: function(value, id, rowdata) {
                if(parseInt(rowdata.businessDealStatus)  == 3020) {
                    return '<div class="btn_defend sheet_confirm" data='+rowdata.id+'>通知单确认</div>';
                } else{
                    return '<div class="w104 search_a"><a class="sxf_btn icon_detail lookDetail" data='+rowdata.id+' title="查看明细"></a></div>';
                    // return '<div class="btn_detail lookDetail" data='+rowdata.id+'>查看明细</div>';
                }
            }
        }];
    },
    //初始化高级查询表单
    initSearchForm:function(){
        var options = {
            id: "searchForm2", //表单id
            renderTo: "formBox1",//表单容器id
            submitId:"submitId",//提交按钮id
            tableId:"sheetTab",//要刷新的表格id
            title:"高级查询",//查询标题
            formGrid: [{
                xtype: "ComboBox",
                field: ['companyCode'], // 表示哪些值需要提交到后端
                name: 'companyName',
                labelWidth: 120,
                id: "companyCode",
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
            }, {
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
                    allowBlank: true, //是否可以为空
                    name: "minDate", // 设置日期选择框的name,用于后台接受此name
                    id: "minDate",
                    displayText: '融资开始日',
                    afterSelect: function (data) { // 事件：选中日期后做的操作
                        EUI.getCmp("maxDate").minDate = new Date(data).format('yyyyMMdd');
                    }
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
            },
            //     {
            //     xtype: "ComboBox",
            //     field: ["businessDealStatus"], // 表示哪些值需要提交到后端
            //     name: "name",
            //     labelWidth: 120,
            //     id: "businessDealStatus",
            //     title: "状态",
            //     width: 280,
            //     allowBlank: true,
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
		//通知单确认
        $(".sheet_confirm").live("click", function () {
			var id = $(this).attr('data');
			window.location.href =_ctxPath+ '/avf/notice/noticeConfirmPage?id='+id+'&identityType=ENTERPRISE';
		});
        //查看明细
        $(".lookDetail").live("click", function () {
            var id = $(this).attr('data');
            window.location.href =_ctxPath+ '/avf/notice/noticeDetailPage?id='+id+'&identityType=ENTERPRISE';
		});
        //追加状态
        var obj = {'data1':[{statusCode:null,statusDetail:'全部'},
            {statusCode:'3020',statusDetail:'供应商确认'},
            {statusCode:'3030',statusDetail:'核心企业确认'},
            {statusCode:'3040',statusDetail:'已确认'}]};
            tabHeadSearch.clickElement(obj,'sheetTab','businessDealStatus');
            tabHeadSearch.clickElement(obj,'tradeTab','businessDealStatus');
		//切换通知单和成交单
		$('.ul_sheet li').click(function () {
            $('.ul_sheet li').removeClass('bac');
			if($(this).hasClass('bac')){}else{
				$(this).addClass('bac');
			}
			if($(this).attr('data') == 0){
				$('#tradeTab').css('display','none');
                $('#sheetTab').css('display','block');
                searchWin.options.tableId = 'sheetTab';
			}else{
                $('#tradeTab').css('display','block');
                $('#sheetTab').css('display','none');
                searchWin.options.tableId = 'tradeTab';
			}
        });
	}
});