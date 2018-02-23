/**
 * Created by Administrator on 2017/8/1.
 * des:核心企业、供应商、金融机构应付、应收账款js
 * jspPath:WEB-INF/views/avf/enterprise/view_rec_pay_money.jsp
 */
EUI.ApplyFinance = EUI.extend(EUI.CustomUI, {
    renderTo: null,
    height: 'auto',
    data: null,
    searchWin:"",
    initComponent: function() {
        var _this = this;
        _this.initSearchForm();
        _this.initGrid();
        _this.addEvents();
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
            id: "recPayMoneyTab",
            height: 'auto',
            gridCfg: {
                rownumbers: false, //去掉表格序号
                url:_ctxPath+"/avf/accountRPInfo/accountRPInfoList.json",//获取后端数据
                rowNum: 10,//一页显示几条数据
                loadonce:false,//true数据一次性加载,每页返回加载每页的数据
                // shrinkToFit: true,//表格宽度自适应
                colModel: _this.colModel(),
            }
        });
    },
    colModel: function () {
        var identity =$('.identity').val();
        if(identity == 'ENTERPRISE'){
            return  [{
                label: "序号",
                name: "id", //列显示的名称
                index: "id", //传到服务器端用来排序的列名称
                // width: 50,
                hidden: true //隐藏不显示这一组
            }, {
                label: "供应商代码",
                name: "supplyCode",
                index: "supplyCode",
                //width: 124,

            }, {
                label: "会计年度",
                name: "dateYear",
                index: "dateYear",
                //width: 124,

            }, {
                label: "应付凭证号",
                name: "voucherNo",
                index: "voucherNo",
            }, {
                label: "行项号",
                name: "lineItemNumber",
                index: "lineItemNumber",
            }, {
                label: "供应商名称",
                name: "supplyShortName",
                index: "supplyShortName",
                //width: 124,

            },{
                label: "应付账款金额",
                name: " recPayMoney",
                index: " recPayMoney",
                formatter: function(value, id, rowdata) {
                    return $.formatMoney(rowdata.recPayMoney,2);
                }
            }, {
                label: "账款到期日<b class='sorting no_sort' data='maturityDate'></b>",
                name: "maturityDate",
                index: "maturityDate",
                width: 200,
                formatter: function(value, id, rowdata) {
                    return GetDateT(new Date(rowdata.maturityDate));
                    // return Math.round(rowdata.intentionFmoney/rowdata.invoiceTotalMoney*100);
                }

            }, {
                label: "状态<b class='b_btn b_state' data='businessDealInfo'></b>",
                name: "businessDealInfo",
                index: "businessDealInfo",
            },{
                label: "操作",
                name: "businessDealStatus",
                index: "businessDealStatus",
                width:200,
                formatter: function(value, id, rowdata) {
                    if(parseInt(rowdata.businessDealStatus) == 1050) {
                        return '<div class="coop_a fl"><a href="#"  class="sxf_btn icon_detail view_rec_pay_money" title="查看明细" data-id="' + rowdata.id + '"></a><span class="sxf_btn icon_edit edit_rec_pay_money ml20" title="编辑" data-id="' + rowdata.id + '"></span><span class="sxf_btn icon_delete del_rec_pay_money ml20" title="删除" data-id="' + rowdata.id + '"></span></div>';
                    }else{
                        return '<div class="coop_a fl"><a href="#"  class="sxf_btn icon_detail view_rec_pay_money"title="查看明细" data-id="' + rowdata.id + '"></a></div>';
                    }
                }
            }];
        }else if(identity == 'SUPPLIER'){
            return  [{
                label: "序号",
                name: "id", //列显示的名称
                index: "id", //传到服务器端用来排序的列名称
                // width: 50,
                hidden: true //隐藏不显示这一组
            }, {
                label: "核心企业代码",
                name: "companyCode",
                index: "companyCode",
                //width: 124,

            }, {
                label: "会计年度",
                name: "dateYear",
                index: "dateYear",
                //width: 124,

            }, {
                label: "应收凭证号",
                name: "voucherNo",
                index: "voucherNo",
            }, {
                label: "行项号",
                name: "lineItemNumber",
                index: "lineItemNumber",
            }, {
                label: "核心企业名称",
                name: "companyShortName",
                index: "companyShortName",
                //width: 124,

            },{
                label: "供应商名称",
                name: "supplyShortName",
                index: "supplyShortName",
                //width: 124,

            },{
                label: "应收账款金额",
                name: " recPayMoney",
                index: " recPayMoney",
                formatter: function(value, id, rowdata) {
                    return $.formatMoney(rowdata.recPayMoney,2);
                }
            }, {
                label: "账款到期日<b class='sorting no_sort' data='maturityDate'></b>",
                name: "maturityDate",
                index: "maturityDate",
                width: 200,
                formatter: function(value, id, rowdata) {
                    return GetDateT(new Date(rowdata.maturityDate));
                    // return Math.round(rowdata.intentionFmoney/rowdata.invoiceTotalMoney*100);
                }

            }, {
                label: "状态<b class='b_btn b_state' data='businessDealInfo'></b>",
                name: "businessDealInfo",
                index: "businessDealInfo",
            },{
                label: "操作",
                name: "businessDealStatus",
                index: "businessDealStatus",
                width:200,
                formatter: function(value, id, rowdata) {
                    // if(parseInt(rowdata.businessDealStatus) == 1050) {
                    //     return '<div class="coop_a fl"><a href="#"  class="sxf_btn icon_detail view_rec_pay_money" title="查看明细" data-id="' + rowdata.id + '"></a><span class="sxf_btn icon_edit edit_rec_pay_money ml20" title="编辑" data-id="' + rowdata.id + '"></span><span class="sxf_btn icon_delete del_rec_pay_money ml20" title="删除" data-id="' + rowdata.id + '"></span></div>';
                    // }else{
                        return '<div class="coop_a fl"><a href="#"  class="sxf_btn icon_detail view_rec_pay_money" title="查看明细" data-id="' + rowdata.id + '"></a></div>';
                    // }
                }
            }];
        }else{
            return  [{
                label: "序号",
                name: "id", //列显示的名称
                index: "id", //传到服务器端用来排序的列名称
                // width: 50,
                hidden: true //隐藏不显示这一组
            },{
                label: "公司代码",
                name: "finInsCode",
                index: "finInsCode",
                //width: 124,

            }, {
                label: "会计年度",
                name: "dateYear",
                index: "dateYear",
                //width: 124,

            }, {
                label: "应收凭证号",
                name: "voucherNo",
                index: "voucherNo",
            }, {
                label: "行项号",
                name: "lineItemNumber",
                index: "lineItemNumber",
            },{
                label: "核心企业",
                name: "companyShortName",
                index: "companyShortName",
                //width: 124,

            },{
                label: "供应商",
                name: "supplyShortName",
                index: "supplyShortName",
                //width: 124,

            },{
                label: "应收账款金额",
                name: " recPayMoney",
                index: " recPayMoney",
                formatter: function(value, id, rowdata) {
                    return $.formatMoney(rowdata.recPayMoney,2);
                }
            },{
                label: "账款到期日<b class='sorting no_sort' data='maturityDate'></b>",
                name: "maturityDate",
                index: "maturityDate",
                width: 200,
                formatter: function(value, id, rowdata) {
                    return GetDateT(new Date(rowdata.maturityDate));
                    // return Math.round(rowdata.intentionFmoney/rowdata.invoiceTotalMoney*100);
                }

            }, {
                label: "状态<b class='b_btn b_state' data='businessDealInfo'></b>",
                name: "businessDealInfo",
                index: "businessDealInfo",
            },{
                label: "操作",
                name: "businessDealStatus",
                index: "businessDealStatus",
                width:200,
                formatter: function(value, id, rowdata) {
                    // if(parseInt(rowdata.businessDealStatus) == 2020) {
                    //     return '<div class="btn_defend defend_account" data='+rowdata.id+'>维护延长账款</div>';
                    // } else {
                    //     return '<div class="w104 search_a"><a class="sxf_btn icon_detail look_detail" data='+rowdata.id+' title="查看明细"></a></div>';
                    // }
                    return '<div class="coop_a fl"><a href="#"  class="sxf_btn icon_detail view_rec_pay_money" title="查看明细" data-id="' + rowdata.id + '"></a></div>';
                }
            }];
        }
    },
    //初始化高级查询表单
    initSearchForm:function(){
        var g = this;
        var identity =$('.identity').val();
        var code = '',name = '',title = '',displayText = '',url = '';
        if(identity == 'ENTERPRISE'){
            code = 'supplyCode';
            name = 'supplyName';
            title = '供应商';
            displayText = '请选择供应商';
            url = _ctxPath + "/avf/financingRelConfigure/findRelByCompanyCode.json";
        }else if(identity == 'SUPPLIER'){
            code = 'companyCode';
            name = 'companyName';
            title = '核心企业';
            displayText = '请选择核心企业';
            url = _ctxPath + "/avf/financingRelConfigure/findRelBySupplyCode.json";
        }else{
            code = 'companyCode';
            name = 'companyName';
            title = '核心企业';
            displayText = '请选择核心企业';
            url = _ctxPath + "/avf/financingRelConfigure/findCompanyByFinCode.json";
        }
        var options = {
            id: "searchForm2", //表单id
            renderTo: "formBox1",//表单容器id
            submitId:"submitId",//提交按钮id
            tableId:"recPayMoneyTab",//要刷新的表格id
            title:"高级查询",//查询标题
            formGrid: [{
                xtype: "ComboBox",
                field: [code], // 表示哪些值需要提交到后端
                name: name,
                labelWidth: 120,
                id: "companyCode",
                title: title,
                width: 280,
                allowBlank: true,
                displayText: displayText,
                async: true, // 是否异步，true为异步
                store: {
                    type:"get",
                    url: url
                }, // 从后台获取数据的地址
                editable: true, // 是否可编辑
                loadMask: true, // 是否有遮罩层
                showSearch: false, // 是否展开下拉框
                searchText: code, // 下拉框的内容
                canClear: true,
                deforeLoad: function(store) {},
                afterLoad: function(data) {

                },
                afterSelect:function(d){
                    if(identity == 'FINANCIAL'){
                        EUI.getCmp("supplyCode").store.params.companyCode=d.data.companyCode;
                    }
                }
            },{
                xtype: "TextField",
                title: "行项号",
                width: 290,
                allowBlank: true, //是否可以为空
                name: "lineItemNumber",
                id: "lineItemNumber",
                labelWidth: 120,
                displayText: '行项号',
            },
                //     {
                //     xtype: "FieldGroup",
                //     width:500,
                //     itemspace:10,
                //     items: [{
                //         xtype: "NumberField",
                //         width: 100,
                //         labelWidth: 120,
                //         precision : 2,
                //         value:"",
                //         allowBlank: false,
                //         // minlength:1,
                //         title:"金额范围",
                //         minValue:1,
                //         displayText: "最小金额",
                //         name: "minMoney",
                //         // unit: "元",
                //         id:"minMoney",
                //         checkInitValue:false,
                //         validateText: "请输入正确的金额！"
                //     },{
                //         xtype: "NumberField",
                //         precision : 2,
                //         labelWidth: 68,
                //         width: 80,
                //         value:"",
                //         title: "到",
                //         // minlength:1,
                //         minValue:1,
                //         id:"maxMoney",
                //         name: "maxMoney",
                //         checkInitValue:false,
                //         allowBlank: false,
                //         displayText: "最大金额", // 显示在文本框内的提示语
                //         validateText:"最大金额必须大于最小金额",
                //         unit: "元",
                //         // afterValidate:function(){
                //         //     var minMoney = parseFloat(EUI.getCmp("minMoney").getValue().toFixed(2));
                //         //     var maxMoney = parseFloat(EUI.getCmp("maxMoney").getValue().toFixed(2));
                //         //     EUI.getCmp("vatMoney").setValue(parseFloat((taxFreeSum+vatSum).toFixed(2)));
                //         // },
                //         validater:function(value){
                //             var minMoney = parseFloat(EUI.getCmp("minMoney").getValue().toFixed(2));
                //             if(minMoney>value){
                //                 return false;
                //             }
                //         }
                //     }]
                // },
                {
                    xtype: "FieldGroup",
                    width:500,
                    itemspace:10,
                    items: [{
                            xtype: "DateField",
                            title: "账款到期日",
                            format: "Y-m-d", // 采用年月日的格式
                            labelWidth: 120, //设置label的宽度
                            width: 109,
                            allowBlank: true, //是否可以为空
                            name: "minDate", // 设置日期选择框的name,用于后台接受此name
                            id: "minDate",
                            displayText: '最小账款到期日',
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
                        displayText: '最大账款到期日',
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
        if(identity == 'FINANCIAL'){
            options.formGrid[1] = {
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
            };
        }
        searchWin = new showSearchWin(options);
    },
    addEvents: function() {
        //新增应付账款
        $('#addRecPayMoney').live('click', function () {
            window.location.href=_ctxPath+"/avf/accountRPInfo/addAccountRPInfoPage";
        });
        //编辑应付账款
        $('.edit_rec_pay_money').live('click', function () {
            var id = $(this).attr('data-id');
            window.location.href=_ctxPath+"/avf/accountRPInfo/editAccountRPInfoPage?id="+id;
        });
        //查看详细
        $('.view_rec_pay_money').live('click', function () {
            var id = $(this).attr('data-id');
            window.location.href=_ctxPath+"/avf/accountRPInfo/viewAccountRPInfoPage?id="+id;
        });
        //删除
        $('.del_rec_pay_money').live('click', function () {
            var id = $(this).attr('data-id');
            delInfoWin(_ctxPath + "/avf/accountRPInfo/deleteAccountRPInfo.json?id="+id,'recPayMoneyTab',id);
        });
        //追加状态
        var obj = {'data1':[{statusCode:null,statusDetail:'全部'},
            {statusCode:'1050',statusDetail:'可融资'},
            {statusCode:'1060',statusDetail:'已融资'}]};
        tabHeadSearch.clickElement(obj,'recPayMoneyTab','businessDealStatus');
    }
});