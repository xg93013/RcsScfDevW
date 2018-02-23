var dataPrepareInvoice = [{
		id: 1,
		name: 520009894,
		name1: '四川长虹网络有限公司',
		name2: '7678900',
		name3: '3',
		name4: '待维护'
	},
	{
		id: 2,
		name: 520009894,
		name1: '四川长虹网络有限公司',
		name2: '7678900',
		name3: '3',
		name4: '待维护'
	},
	{
		id: 3,
		name: 520009894,
		name1: '四川长虹网络有限公司',
		name2: '7678900',
		name3: '3',
		name4: '待维护'
	},
];

var dataPrepareInvoice2 = [{
		id: 1,
		name: '长虹集团',
		name1: '长虹集团',
		name2: '3.14',
		name3: 7678900,
		name4: '3.14',
		name5: '',
		name6: '',
		name7: 0
	},
	{
		id: 2,
		name: '九州集团',
		name1: '长虹集团',
		name2: '3.14',
		name3: 7678900,
		name4: '3.14',
		name5: '2017-03-23',
		name6: '2017-03-23',
		name7: 1
	},
	{
		id: 3,
		name: '长虹集团',
		name1: '长虹集团',
		name2: '3.14',
		name3: 7678900,
		name4: '3.14',
		name5: '',
		name6: '',
		name7: 2
	},
];

var invoice = [{
		id: 1,
		name: '234567689',
		name1: '23456748',
		name2: '7678900',
		name3: '7678900',
		name4: '7678900',
		name5: '',
		name6: '',
		name7: '',
		name8: '',
		name9:'2017-09-08 18:45'
},{
		id: 2,
		name: '234567689',
		name1: '23456748',
		name2: '7678900',
		name3: '7678900',
		name4: '7678900',
		name5: '',
		name6: '',
		name7: '',
		name8: '',
		name9:'2017-09-08 18:45'
}
];
//格式化金额
for(var i in dataPrepareInvoice) {
	dataPrepareInvoice[i].name2 = $.formatMoney(dataPrepareInvoice[i].name2, 2);
}
//初始化核心企业-申请融资的表格
EUI.GridPanelApplyFinancing = EUI.extend(EUI.CustomUI, {
	renderTo: "",
	//height: 'auto',
	initComponent: function() {
		var _this = this;
		EUI.Container({
			renderTo: this.renderTo,
			height: 'auto',
			items: [{
				xtype: "GridPanel",
				padding: 0, //设置表格的内边距
				exportXls: false,
				searchConfig: null,
				showRefresh: false,
				id: "applyFinancingTab",
				//autoLoad: true, //自动加载
				height: 'auto',
				gridCfg: {
					rownumbers: false, //去掉表格序号
					loadonce: true, //一次性加载数据，和autoLoad都为true时，则可以一次加载所有数据
					//shrinkToFit: false,//表格宽度自适应
					colModel: [{
						label: "序号",
						name: "id", //列显示的名称
						index: "id", //传到服务器端用来排序的列名称

						hidden: true //隐藏不显示这一组
					}, {
						label: "<span>融资需求编号</span><b></b>",
						name: "name",
						index: "name",

					}, {
						label: "<span>供应商</span><b></b>",
						name: "name1",
						index: "name1",

					}, {
						label: "<span>融资金额</span><b></b>",
						name: "name2",
						index: "name2",
						formatter: function(value, id, rowdata) {
							return '<span class="font20">' + rowdata.name2 + '</span>';
						}

					}, {
						label: "<span>融资期限</span><b></b>",
						name: "name3",
						index: "name3",
						formatter: function(value, id, rowdata) {
							return '<span class="font20">' + rowdata.name3 + '</span>个月';
						}

					}, {
						label: "<span>状态</span><b></b>",
						name: "name4",
						index: "name4",

					}, {
						label: "操作",
						name: "name5",
						index: "name5",
						formatter: function(value, id, rowdata) {
							if(parseInt(rowdata.id) % 2 == 0) {
								return '<div class="btn_defend defend_account">维护延长账款</div>';
							} else {
								return '<div class="btn_detail look_detail">查看详细</div>';
							}

						}
					}],
					data: dataPrepareInvoice,
				}
			}]
		});
		_this.addEvents();
	},
	afterRender: function() {
		console.log('渲染完成');
	},
	addEvents: function() {
		var _self = this;
		/*$('.del_table').live('click', function() {
			var _this = $(this);
			messageDemo.messageBox(function(){
				var tableRowId = _this.attr('id');
			    var gridPanel = EUI.getCmp("tablePrepareInvoice");
			    gridPanel.deleteRow(tableRowId);
			});
		});*/
		$('.defend_account').live('click', function() {
			window.location.href = 'extend_account.html';
		});
		$('.look_detail').live('click', function() {
			window.location.href = 'finance_detail.html';
		});
	},
});
//初始化通知单的表格
EUI.GridPanelSheet = EUI.extend(EUI.CustomUI, {
	renderTo: "",
	initComponent: function() {
		EUI.Container({
			renderTo: this.renderTo,
			items: [{
				xtype: "GridPanel",
				padding: 0, //设置表格的内边距
				exportXls: false,
				searchConfig: null,
				showRefresh: false,
				id: "sheetTab",
				//autoLoad: true, //自动加载
				height: 400,
				gridCfg: {
					loadonce: true, //一次性加载数据，和autoLoad都为true时，则可以一次加载所有数据
					//shrinkToFit: false,//表格宽度自适应
					rownumbers: false, //去掉表格序号
					colModel: [{
						label: "序号",
						name: "id", //列显示的名称
						index: "id", //传到服务器端用来排序的列名称						
						hidden: true, //隐藏不显示这一组
					}, {
						label: "<span>融资需求编号</span><b></b>",
						name: "name",
						index: "name",

					}, {
						label: "<span>供应商</span><b></b>",
						name: "name1",
						index: "name1",

					}, {
						label: "<span>实际金额</span><b></b>",
						name: "name2",
						index: "name2",
						formatter: function(value, id, rowdata) {
							return '<span class="font20">' + rowdata.name2 + '</span>';
						}

					}, {
						label: "<span>实际期限</span><b></b>",
						name: "name3",
						index: "name3",
						formatter: function(value, id, rowdata) {
							return '<span class="font20">' + rowdata.name3 + '</span>个月';
						}

					}, {
						label: "<span>状态</span><b></b>",
						name: "name4",
						index: "name4",

					}, {
						label: "操作",
						name: "name5",
						index: "name5",
						formatter: function(value, id, rowdata) {
							if(parseInt(rowdata.id) % 3 == 2) {
								return '<div class="btn_defend sheet_confirm">通知单确认</div>';
							} else if(parseInt(rowdata.id) % 3 == 1) {
								return '<div class="btn_detail">查看明细</div>';
							}else{
								return '<div class="btn_wait">等待供应商确认</div>';
							}

						}
					}, {
						label: "操作",
						formatter: function(value, id, rowdata) {
							return '<div class="del_sheet btn_div">删除</div><div class="edit_sheet btn_div">编辑</div>';

						}
					}],
					data: dataPrepareInvoice,
				}
			}]
		});
		this.addEvents();
	},
	afterRender: function() {
		console.log('渲染完成');
	},
	addEvents: function() {
		var _self = this;
		/*$('.del_table').live('click', function() {
			var _this = $(this);
			messageDemo.messageBox(function() {
				var tableRowId = _this.attr('id');
				var gridPanel = EUI.getCmp("sheetTab");
				gridPanel.deleteRow(tableRowId);
			});
		});*/
		$('.sheet_confirm').live('click',function(){
			window.location.href = 'confirm_sheet.html';
		});
	},
});

//初始化供应商-申请融资的表格
EUI.GridPanelApplyFinancing2 = EUI.extend(EUI.CustomUI, {
	renderTo: "",
	initComponent: function() {
		var _this = this;
		EUI.Container({
			renderTo: this.renderTo,
			items: [{
				xtype: "GridPanel",
				padding: 0, //设置表格的内边距
				exportXls: false,
				searchConfig: null,
				showRefresh: false,
				id: "applyFinancingTab2",
				//autoLoad: true, //自动加载
				//height: 400,
				gridCfg: {
					rownumbers: false, //去掉表格序号
					loadonce: true, //一次性加载数据，和autoLoad都为true时，则可以一次加载所有数据
					shrinkToFit: false, //表格宽度不自适应
					//height:300,
					colModel: [{
						label: "序号",
						name: "id", //列显示的名称
						index: "id", //传到服务器端用来排序的列名称
						width: 50,

						//hidden: true //隐藏不显示这一组
					}, {
						label: "公司名称",
						name: "name",
						index: "name",
						width: 124,

					}, {
						label: "融资银行",
						name: "name1",
						index: "name1",
						width: 124,

					}, {
						label: "银行利率（%）",
						name: "name2",
						index: "name2",
						width: 120,
					}, {
						label: "融资金额（元）",
						name: "name3",
						index: "name3",
						width: 120,

					}, {
						label: "融资比例（%）",
						name: "name4",
						index: "name4",
						width: 120,

					}, {
						label: "融资起始日",
						name: "name5",
						index: "name5",
						width: 110,

					}, {
						label: "融资到期日",
						name: "name6",
						index: "name6",
						width: 110,

					}, {
						label: "状态",
						name: "name7",
						index: "name7",
						width: 110,
						style: {
							'text-align': 'left',
						},
						formatter: function(value, id, rowdata) {
							if(rowdata.name7 == 0) {
								return '未通过';
							} else if(rowdata.name7 == 1) {
								return '银行处理中';
							} else {
								return '已通过';
							}
						}

					}, {
						label: "操作",
						name: "name8",
						index: "name8",
						width: 150,
						formatter: function(value, id, rowdata) {
							return '<div class="btn_detail look_detail">查看详细</div>';
						}
					}],
					data: dataPrepareInvoice2,
				}
			}]
		});
		_this.addEvents();
	},
	afterRender: function() {
		console.log('渲染完成');
	},
	addEvents: function() {
		var _self = this;
		/*$('.del_table').live('click', function() {
			var _this = $(this);
			messageDemo.messageBox(function(){
				var tableRowId = _this.attr('id');
			    var gridPanel = EUI.getCmp("tablePrepareInvoice");
			    gridPanel.deleteRow(tableRowId);
			});
		});*/
		$('.look_detail').live('click', function() {
			window.location.href = 'finance_detail.html';
		});
	},
});


//初始化供应商-新增融资申请的表格
EUI.tabAddFinance = EUI.extend(EUI.CustomUI, {
	renderTo: "",
	initComponent: function() {
		var _this = this;
		EUI.Container({
			renderTo: this.renderTo,
			style:{
				'padding':'0px',
			},
			items: [{
				xtype: "GridPanel",
				padding: 0, //设置表格的内边距
				exportXls: false,
				searchConfig: null,
				showRefresh: false,
				id: "tabAddFinance",
				//autoLoad: true, //自动加载
				//height: 400,
				gridCfg: {
					rownumbers: false, //去掉表格序号
					loadonce: true, //一次性加载数据，和autoLoad都为true时，则可以一次加载所有数据
					shrinkToFit: false, //表格宽度不自适应
					//height:200,
					colModel: [{
						label: '<div class="check check_all back_check_1"></div>',
						name: "checkbox", //列显示的名称
						index: "checkbox", //传到服务器端用来排序的列名称
						width: 30,
						formatter: function(value, id, rowdata) {
							return '<div class="check check_every back_check_1"></div>';
						}

						//hidden: true //隐藏不显示这一组
					},{
						label: "序号",
						name: "id", //列显示的名称
						index: "id", //传到服务器端用来排序的列名称
						width: 50,

						//hidden: true //隐藏不显示这一组
					}, {
						label: "发票代码",
						name: "name",
						index: "name",
						width: 99,

					}, {
						label: "发票号码",
						name: "name1",
						index: "name1",
						width: 99,

					}, {
						label: "价格合计",
						name: "name2",
						index: "name2",
						width: 100,
					},{
						label: "金额",
						name: "name3",
						index: "name4",
						width: 100,

					}, {
						label: "税额",
						name: "name4",
						index: "name4",
						width: 100,

					}, {
						label: "所属公司",
						name: "name5",
						index: "name5",
						width: 100,

					}, {
						label: "公司代码",
						name: "name6",
						index: "name6",
						width: 100,

					},{
						label: "开票日期",
						name: "name7",
						index: "name7",
						width: 100,

					}, {
						label: "批次号 ",
						name: "name8",
						index: "name8",
						width: 100,

					},{
						label: "发票录入日期",
						name: "name9",
						index: "name9",
						width: 138,
					}],
					data: invoice,
				}
			}]
		});
		_this.addEvents();
		_this.checkbox();
	},
	afterRender: function() {
		console.log('渲染完成');
	},
	addEvents: function() {
		var _self = this;
		/*$('.del_table').live('click', function() {
			var _this = $(this);
			messageDemo.messageBox(function(){
				var tableRowId = _this.attr('id');
			    var gridPanel = EUI.getCmp("tablePrepareInvoice");
			    gridPanel.deleteRow(tableRowId);
			});
		});*/
		/*$('.btn_defend').live('click', function() {
			window.location.href = 'extend_account.html';
		});*/
	},
	checkbox: function(){
		$('.check').click(function() {
		var _this = $(this);
		if($(this).hasClass('check_all')){	
			if(_this.hasClass('back_check_1')) {
				_this.removeClass(' back_check_1').addClass(' back_check_2');
				$('.check_every').removeClass('back_check_1').addClass('back_check_2');
			} else {
				_this.removeClass('back_check_2').addClass('back_check_1');
				$('.check_every').removeClass('back_check_2').addClass('back_check_1');
	
			}
		}else{
			var count = $('.check_every').length;
			var count1 = 0; 
			var count2 = 0;
			if(_this.hasClass('back_check_1')) {
				_this.removeClass('back_check_1').addClass('back_check_2');			
			} else {
				_this.removeClass('back_check_2').addClass('back_check_1');
			}
			count1 = $('.check_every.back_check_1').length;
			count2 = $('.check_every.back_check_2').length;
			if(count == count2){
				$('.check_all').removeClass('back_check_1').addClass('back_check_2');
			}else{
				$('.check_all').removeClass('back_check_2').addClass('back_check_1');
			}
	
		}
			
		});
	}
});

EUI.tabAddFinance2 = EUI.extend(EUI.CustomUI, {
	renderTo: "",
	initComponent: function() {
		var _this = this;
		EUI.Container({
			renderTo: this.renderTo,
			style:{
				'padding':'0px',
			},
			items: [{
				xtype: "GridPanel",
				padding: 0, //设置表格的内边距
				exportXls: false,
				searchConfig: null,
				showRefresh: false,
				id: "tabAddFinance2",
				//autoLoad: true, //自动加载
				//height: 400,
				gridCfg: {
					rownumbers: false, //去掉表格序号
					loadonce: true, //一次性加载数据，和autoLoad都为true时，则可以一次加载所有数据
					shrinkToFit: false, //表格宽度不自适应
					//height:200,
					colModel: [{
						label: '<div class="check_all back_check_1"></div>',
						name: "checkbox", //列显示的名称
						index: "checkbox", //传到服务器端用来排序的列名称
						width: 30,
						formatter: function(value, id, rowdata) {
							return '<div class="check_every back_check_1"></div>';
						}

						//hidden: true //隐藏不显示这一组
					},{
						label: "序号",
						name: "id", //列显示的名称
						index: "id", //传到服务器端用来排序的列名称
						width: 50,

						//hidden: true //隐藏不显示这一组
					}, {
						label: "发票代码",
						name: "name",
						index: "name",
						width: 99,

					}, {
						label: "发票号码",
						name: "name1",
						index: "name1",
						width: 99,

					}, {
						label: "价格合计",
						name: "name2",
						index: "name2",
						width: 100,
					},{
						label: "金额",
						name: "name3",
						index: "name4",
						width: 100,

					}, {
						label: "税额",
						name: "name4",
						index: "name4",
						width: 100,

					}, {
						label: "所属公司",
						name: "name5",
						index: "name5",
						width: 100,

					}, {
						label: "公司代码",
						name: "name6",
						index: "name6",
						width: 100,

					},{
						label: "开票日期",
						name: "name7",
						index: "name7",
						width: 100,

					}, {
						label: "批次号 ",
						name: "name8",
						index: "name8",
						width: 100,

					},{
						label: "发票录入日期",
						name: "name9",
						index: "name9",
						width: 138,
					}],
					data: invoice,
				}
			}]
		});
		_this.addEvents();
	},
	afterRender: function() {
		console.log('渲染完成');
	},
	addEvents: function() {
		var _self = this;
		/*$('.del_table').live('click', function() {
			var _this = $(this);
			messageDemo.messageBox(function(){
				var tableRowId = _this.attr('id');
			    var gridPanel = EUI.getCmp("tablePrepareInvoice");
			    gridPanel.deleteRow(tableRowId);
			});
		});*/
		/*$('.btn_defend').live('click', function() {
			window.location.href = 'extend_account.html';
		});*/
	},
});

$(function(){
	//样式li的切换
	$('#ul_tab_1').css('display','none');
	$('.ul_list li').click(function(){
		$('.ul_list li').removeClass('li_1');
		$(this).addClass('li_1');
		console.log($(this).index());
		var index = $(this).index();
		for(var i = 0;i < $('.ul_list li').length;i++){
			$('#ul_tab_'+i).css('display','none');
		}
		$('#ul_tab_'+index).css('display','');
	});
	
	//确认选中发票进入下一步
	$('#confirm_next').click(function() {
		window.location.href = 'add_finance2.html';
	});
});
