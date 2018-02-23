/**
 * Created by Administrator on 2017/8/1.
 * des:金融机构融资审批js
 * jspPath:WEB-INF/views/avf/financial/financial_approval.jsp
 */
var timer = 5;
//初始融资机构-融资审批的表格
EUI.FinanceApproval = EUI.extend(EUI.CustomUI, {
	renderTo: "",
	height:'auto',
	initComponent: function() {
		var _this = this;
		_this.initGrid();
		_this.addEvents();
		_this.initSearchForm();
	},
	initGrid: function() {
		var g = this;
		EUI.GridPanel({
			renderTo: g.renderTo,
			padding: 0, //设置表格的内边距
			exportXls: false,
			searchConfig: null,
			showRefresh: false,
			id: "approvalTab",
			height: 'auto',
			gridCfg: {
				rownumbers: false, //去掉表格序号
				//shrinkToFit: false,//表格宽度自适应
                url:_ctxPath+"/avf/financingApprove/financingApproveList.json",//获取后端数据
                rowNum: 10,//一页显示几条数据
                mtype:"get",
                loadonce:false,//true数据一次性加载,每页返回加载每页的数据
				colModel: [{
					label: "序号",
					name: "id", //列显示的名称
					index: "id", //传到服务器端用来排序的列名称
					hidden: true //隐藏不显示这一组
				}, {
					label: "融资需求编号",
					name: "financingNeedsNo",
					index: "financingNeedsNo",

				}, {
					label: "供应商",
					name: "supplyShortName",
					index: "supplyShortName",

				}, {
					label: "核心企业",
					name: "companyShortName",
					index: "companyShortName",
				}, {
					label: "融资金额（元)<b class='sorting no_sort' data='totalMoney'></b>",
					name: "totalMoney",
					index: "totalMoney",
					width:200,
					formatter: function(value, id, rowdata) {
						return '<span class="font20">￥' + $.formatMoney(rowdata.intentionFmoney,2) + '</span>';
					}
				},{
                    name: "financeStart",
                    index: "financeStart",
					hidden:true,
                },{
					label: "期限<b class='sorting no_sort' data='financeStart'></b>",
					name: "financeEnd",
					index: "financeEnd",
                    width:300,
					formatter: function(value, id, rowdata) {
                        var startTime = $.myTime.UnixToDate(rowdata.financeStart);
                        var endTime = $.myTime.UnixToDate(rowdata.financeEnd);
                        if(startTime != 'NaN-NaN-NaN' && endTime != 'NaN-NaN-NaN'){
                            return startTime+'~'+ endTime;
                        }else{
                            return '-- -- --';
                        }
                        // return '<span class="font20">' + $.myTime.UnixToDate(rowdata.financeEnd) + '</span>';
					}

				}, {
					label: "状态<b class='b_btn b_state' data='businessDealInfo'></b>",
					name: "businessDealInfo",
					index: "businessDealInfo",
				}, {
					label: "操作",
					name: "businessDealStatus",
					index: "businessDealStatus",
					formatter: function(value, id, rowdata) {
						if(parseInt(rowdata.businessDealStatus)  == 1022) {
							return '<div class="w104 search_a"><a class="sxf_btn icon_detail look_financial" titlt="查看明细" data='+rowdata.id+'></a></div>';
						} else {
							return '<div class="btn_detail defend_financial" data='+rowdata.id+'>拒绝</div>';
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
            tableId:"approvalTab",//要刷新的表格id
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
                    url: _ctxPath + "/avf/financingRelConfigure/findCompanyByFinCode.json"
                }, // 从后台获取数据的地址
                editable: true, // 是否可编辑
                loadMask: true, // 是否有遮罩层
                showSearch: false, // 是否展开下拉框
                searchText: "companyCode", // 下拉框的内容
                canClear: true,
                deforeLoad: function(store) {},
                afterLoad: function(data) {

                },
                afterSelect:function(d){
                    EUI.getCmp("supplyCode").store.params.companyCode=d.data.companyCode;
                }
            },{
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
                    url: _ctxPath + "/avf/financingRelConfigure/findSupplyByFinCodeAndCompanyCode.json",
                    params: {'companyCode':''}
                }, // 从后台获取数据的地址
                editable: true, // 是否可编辑
                loadMask: true, // 是否有遮罩层
                showSearch: false, // 是否展开下拉框
                searchText: "supplyCode", // 下拉框的内容
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
		//跳转到拒绝页面
		$('.defend_financial').live('click', function() {
            var id =$(this).attr('data');
            window.location.href = _ctxPath+'/avf/financingApprove/financingDemandRejectPage?id='+id;
        });
		//跳转到查看详情页面
        $('.look_financial').live('click', function() {
            var id =$(this).attr('data');
            window.location.href = _ctxPath+'/avf/financingApprove/financingApproveHeadDetailsPage?id='+id;
        });
        //追加状态
        var obj = {'data1':[{statusCode:null,statusDetail:'全部'},
            {statusCode:'5050',statusDetail:'待处理'},
            {statusCode:'1022',statusDetail:'已拒绝'}]};
        tabHeadSearch.clickElement(obj,'approvalTab','businessDealStatus');
	},
});
//放款补录表单
EUI.formRecord = EUI.extend(EUI.CustomUI, {
	renderTo: "",
	height: 'auto',
	width: 268,
    value:null,
	initComponent: function() {
		var g = this;
		if($('#getLoanDate').val() == ''){

        }else{
		    g.value = new Date($('#getLoanDate').val()).format("yyyy-MM-dd");
        }
		EUI.FormPanel({
			renderTo: this.renderTo,
			height: 'auto',
			id:'formMakeUp',
			items: [{
				xtype: "NumberField",
				title: "放款金额",
				labelWidth: 100,
				width: 166,
				height: 35,
				unit: '元',
				allowBlank: false,
				name:'loanMoney',
				maxValue: $('#financeMoney').val(), // 允许输入的最大值
				minValue: 1, // 允许输入的最小值
                value:$('#getLoanMoney').val(),
                displayText: '放款金额',
				precision: 2, // 输入的数据精确到多少位，默认值0表示精确到个位
				allowNegative: false, // 设置是否可以输入负数，false为不能输入负数
				allowChar: "0123456789", // 允许输入的数字
				fullPrecision: true, // 若填写的数据没有达到需要精确的位数，则用0自动补齐

			}, {
				xtype: "DateField",
				title: "放款日期",
				format: "Y-m-d", // 采用年月日的格式
				labelWidth: 100, //设置label的宽度
				maxDate: new Date().format("yyyyMMdd"), // 设置能够选择的最大日期
				minDate: new Date($('#financeStart').val()).format('yyyyMMdd'), // 设置能够选择的最小日期，日期格式为"20170301"
				width: 166,
				height: 34,
				listWidth: 150,
				allowBlank: false, //是否可以为空
                displayText: '放款日期',
				name: "loanDate", // 设置日期选择框的name,用于后台接受此name
				id: "loanDate",
                value:g.value,
				triggerCss: "ux-date-trigger", // 日期选择触发的样式
				triggerClickCss: "",
			}]
		});
		g.addEvent();
		g.removeStar();
	},
	addEvent: function() {
		//确认补录
		$('#confirm_record').click(function () {
           if( !EUI.getCmp("formMakeUp").isValid()){
               return;
		   }
            var makeUp = EUI.getCmp("formMakeUp").getFormValue();
            makeUp.id = $('#makeUpId').val();
            EUI.Store({
                url: _ctxPath+'/avf/financingLoan/financingLoanMakeup.json',
                params:makeUp,
                async:false,
                success: function (d) {
                    showToPageInfo(d.msg,'/avf/financingLoan/financingLoanListPage')
                },
                failure: function (d) {
                    errorInfo(d.msg);
                }
            });
		});
	},
	removeStar: function() {
		$('.close_store b').click(function() {
			if($(this).hasClass('b_1')) {
				$(this).removeClass('b_1').addClass('b_2');
			} else {
				$(this).removeClass('b_2').addClass('b_1');
			}
		});
		$('.ux-field-label .ux-field-must').remove();
		$('#formMakeUp .ux-line-row').eq(0).append('<div class="tip">放款金额不能大于融资金额'+$('#financeMoney').val()+'元</div>');
        $('#formMakeUp .ux-line-row').eq(1).append('<div class="tip">放款日期'+new Date($('#financeStart').val()).format('yyyy-MM-dd')+'~'+new Date().format("yyyy-MM-dd")+'</div>');
	}
});
var clear;
function Countdown() {
    if (timer >= 1) {
        timer -= 1;
        $('#successInfo').text('补录成功'+timer+'秒后自动跳转');
        clear = setTimeout(function() {
            Countdown();
        }, 1000);
    }else{
        clearInterval(clear);
        window.location.href=_ctxPath+'/avf/financingLoan/financingLoanListPage';
    }
}