/**
 * Created by xionggang on 2017/8/1.
 * des:金融机构收款补录首页
 * jspPath:WEB-INF/views/avf/financial/finance_detail.jsp
 */
EUI.FinanceCredit = EUI.extend(EUI.CustomUI, {
    renderTo: "",
    cfgData: "",
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
        this.addEvents();
        g.initSearchForm();
        g.initDownList();
    },
    initDownList:function(){
        var g = this;
        //追加状态
        var obj = {'data1':[{statusCode:null,statusDetail:'全部'},
            // {statusCode:'5050',statusDetail:'待补录'},
            {statusCode:'7050',statusDetail:'已收款'},
            {statusCode:'7090',statusDetail:'融资已关闭'}
        ]};
        tabHeadSearch.clickElement(obj,g.cfgId,'businessDealStatus');
    },
    initData: function() {
        var tableData = [{
            id: "1",
            num: "67245",
            name: "四川虹信软件有限公司",
            mainEnterprise: "核心企业",
            rzMoney: "1238，412",
            dateLimit: "1",
            state: "0"
        }, {
            id: "1",
            num: "67245",
            name: "四川虹信软件有限公司",
            mainEnterprise: "核心企业",
            rzMoney: "1238，412",
            dateLimit: "1",
            state: "1"
        }];
        return tableData;
    },
    initGrid: function() {
        var g = this;
        //配置表格
        var cfgData = {
            url:_ctxPath+"/avf/financingReceipt/financingReceiptList.json",//获取后端数据
            rownumbers: false,
            rowNum: 10,
            loadonce: false,
            mtype : "get",
            colModel: [{
                name: "id", //列显示的名称
                index: "id", //传到服务器端用来排序的列名称
                hidden: true //隐藏不显示这一组
            }, {
                label: "融资需求编号",
                name: "financingNeedsNo",
                index: "financingNeedsNo"
            }, {
                label: "供应商",
                name: "supplyShortName",
                index: "supplyShortName"
            }, {
                label: "核心企业",
                name: "companyShortName",
                index: "companyShortName",
            },{
                label: "融资金额(元)<b class='sorting desc' data='totalMoney'></b>",
                name: "financeMoney",
                index: "financeMoney",
                formatter: function(value, id, rowdata) {
                    return '<span class="font20 bold">￥' + $.formatMoney(rowdata.financeMoney,2) + '</span>';
                }
            }, {
                name: "financeStart",
                index: "financeStart",
                hidden:true,
            },{
                label: "期限<b class='sorting desc' data='financeStart'></b>",
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
                label: "状态<b class='b_btn b_state' data='businessDealStatus'></b>",
                name: "businessDealStatus",
                index: "businessDealStatus",
                formatter: function(value, id, rowdata) {
                    if( 5050 < parseInt(rowdata.businessDealStatus) && parseInt(rowdata.businessDealStatus) < 7050 ){
                        return '<span data-id="' + rowdata.id + '">待补录</span>';
                    }else if(parseInt(rowdata.businessDealStatus) <= 5050 || ( parseInt(rowdata.businessDealStatus) >= 7050 && parseInt(rowdata.businessDealStatus) < 7090) ){
                        return '<span data-id="' + rowdata.id + '">已收款</span>';
                    }else{
                        return '融资已关闭';
                    }
                }
            }, {
                label: "操作",
                name: "operate",
                index: "operate",
                width:200,
                formatter: function(value, id, rowdata) {
                    var addUrl = "/avf/financingReceipt/financingReceiptMakeupPage?id="+rowdata.id;
                    var detailUrl = "/avf/financingReceipt/financingReceiptDetails?id="+rowdata.id;
                    var returnHtml = "";
                    if(5050 < parseInt(rowdata.businessDealStatus) && parseInt(rowdata.businessDealStatus) < 7050){
                        returnHtml ='<a href="'+addUrl+'"  class="table_btn" data-id="' + rowdata.id + '">补录</a>';
                    }else if(parseInt(rowdata.businessDealStatus) <= 5050 || ( parseInt(rowdata.businessDealStatus) >= 7050 && parseInt(rowdata.businessDealStatus) < 7090) ){
                        returnHtml ='<a href="javascript:void(0)"  class="table_btn" id="close_credit" data-id="' + rowdata.id + '" title="关闭">关闭</a><a href="'+addUrl+'"  class="sxf_btn icon_edit mr20" data-id="' + rowdata.id + '" title="编辑"></a><a href="'+detailUrl+'"  class="sxf_btn icon_detail" data-id="' + rowdata.id + '" title="查看明细"></a>';
                    }else{
                        returnHtml ='<a href="'+detailUrl+'"  class="sxf_btn icon_detail" data-id="' + rowdata.id + '"></a>';
                    }
                    return returnHtml;

                }
            }]
        }
        return cfgData;
    },
    addEvents: function() {
        var g = this;
        $("#close_credit").live("click",function(){
            var creditId = $(this).attr("data-id");
            EUI.getCmp(g.cfgId).refreshGrid();
            console.log(creditId);
            var fun = function(){
                EUI.Store({
                    url:_ctxPath+"/avf/financingReceipt/closeReceipt.json",
                    params:{"id":creditId},
                    success:function(msg){
                        EUI.getCmp(g.cfgId).refreshGrid();
                    },
                    failure:function (msg) {
                        errorInfo("关闭失败！");
                    }
                });
            }
            dealInfoWin("是否关闭！",fun);
        })
    },
    //初始化高级查询表单
    initSearchForm:function(){
        var g = this;
        var options = {
            id: "searchForm1", //表单id
            renderTo: "formBox1",//表单容器id
            submitId:"submitId",//提交按钮id
            tableId:g.cfgId,//要刷新的表格id
            title:"高级查询",//查询标题
            formGrid: [
                {
                xtype: "ComboBox",
                field: ["companyCode"], // 表示哪些值需要提交到后端
                name: "companyName",
                labelWidth: 120,
                id: "companyCode",
                title: "核心企业",
                width: 280,
                allowBlank: true,
                displayText: "请选择核心企业",
                async: true, // 是否异步，true为异步
                store: {
                    type:"get",
                    url: _ctxPath + "/avf/financingRelConfigure/findCompanyByFinCode.json"
                }, // 从后台获取数据的地址
                editable: true, // 是否可编辑
                loadMask: true, // 是否有遮罩层
                showSearch: false, // 是否展开下拉框
                searchText:"companyCode", // 下拉框的内容
                canClear: true,
                deforeLoad: function(store) {},
                afterLoad: function(data) {

                },
                afterSelect:function(data){
                    EUI.getCmp("supplyCode").store.params.companyCode = data.data.companyCode
                }
            },{
                xtype: "ComboBox",
                field: ["supplyCode"], // 表示哪些值需要提交到后端
                name: "supplyName",
                labelWidth: 120,
                id: "supplyCode",
                title: "供应商",
                width: 280,
                allowBlank: true,
                displayText: "请选择供应商",
                async: true, // 是否异步，true为异步
                store: {
                    type:"get",
                    url: _ctxPath + "/avf/financingRelConfigure/findSupplyByFinCodeAndCompanyCode.json",
                    params:{"companyCode":""}
                }, // 从后台获取数据的地址
                editable: true, // 是否可编辑
                loadMask: true, // 是否有遮罩层
                showSearch: false, // 是否展开下拉框
                searchText:"supplyCode", // 下拉框的内容
                canClear: true,
                deforeLoad: function(store) {},
                afterLoad: function(data) {

                },
                afterSelect:function(data){

                }
            },
                {
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
        g.searchWin = new showSearchWin(options);
    }
});