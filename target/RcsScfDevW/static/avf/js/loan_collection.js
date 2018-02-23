/**
 * Created by Administrator on 2017/8/1.
 * des:金融机构放款补录js
 * jspPath:WEB-INF/views/avf/financial/loan_collection.jsp
 */
//初始融资机构-放款补录的表格
EUI.LoanCollection = EUI.extend(EUI.CustomUI, {
    renderTo: "",
    height: 'auto',
    initComponent: function () {
        var _this = this;
        _this.initGrid();
        _this.addEvents();
        _this.initSearchForm();
    },
    initGrid: function () {
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
                url:_ctxPath+"/avf/financingLoan/financingLoanList.json",//获取后端数据
                rowNum: 10,//一页显示几条数据
                mtype:"get",
                loadonce:false,//true数据一次性加载,每页返回加载每页的数据
                //shrinkToFit: false,//表格宽度自适应
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
                    label: "融资金额（元）<b class='sorting no_sort' data='financeMoney'></b>",
                    name: "financeMoney",
                    index: "financeMoney",
                    width:200,
                    formatter: function (value, id, rowdata) {
                        return '<span class="font20">￥' + $.formatMoney(rowdata.financeMoney,2) + '</span>';
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
                    formatter: function (value, id, rowdata) {
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
                    width: 180,
                    formatter: function (value, id, rowdata) {
                        if (parseInt(rowdata.businessDealStatus) == 5050) {
                            return '<div class="btn_defend ml_25 financing_loan_make" data='+rowdata.id+'>放款</div>';
                        } else if(parseInt(rowdata.businessDealStatus) == 6010){
                            return '<div class="w104 search_a"><a class="sxf_btn icon_edit financing_loan_edit" data='+rowdata.id+' title="再次放款"></a><a class="sxf_btn icon_detail mgl16 financing_loan_details" data='+rowdata.id+' title="查看明细"></a></div>';
                        } else{
                            return '<div class="w104 search_a"><a class="sxf_btn icon_detail mgl16 financing_loan_details" data='+rowdata.id+' title="查看明细"></a></div>';
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
    addEvents: function () {
        $('.financing_loan_make').live('click', function () {
            var id = $(this).attr('data');
            window.location.href =_ctxPath+ '/avf/financingLoan/financingLoanMakeUpPage?id='+id;
        });
        $('.financing_loan_edit').live('click', function () {
            var id = $(this).attr('data');
            window.location.href =_ctxPath+ '/avf/financingLoan/financingLoanMakeUpPage?id='+id;
        });
        $('.financing_loan_details').live('click', function () {
            var id = $(this).attr('data');
            window.location.href =_ctxPath+ '/avf/financingLoan/financingLoanDetailsPage?id='+id;
        });
        //追加状态
        var obj = {'data1':[{statusCode:null,statusDetail:'全部'},
            {statusCode:'5050',statusDetail:'待放款'},
            {statusCode:'6010',statusDetail:'已放款'},
            {statusCode:'7050',statusDetail:'已收款'},
        ]};
        tabHeadSearch.clickElement(obj,'approvalTab','businessDealStatus');
    }
});
