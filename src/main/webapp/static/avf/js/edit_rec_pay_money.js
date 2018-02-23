/**
 * Created by Administrator on 2017/8/2.
 * des:核心企业、供应商编辑应收、应付账款js
 * jspPath:WEB-INF/views/avf/enterprise/edit_rec_pay_money.jsp
 */
var selectData = [];//已选的发票
EUI.reyPayMoneyForm = EUI.extend(EUI.CustomUI, {
    renderTo: null,
    renderTo1: null,
    comboBoxBank: null,
    height: 'auto',
    data: null,
    title: null,
    displayText: null,
    url: null,
    code: null,
    name: null,
    value: null,
    title1: null,
    initComponent: function () {
        var identity = $('.identity').val(), companyCode = '';
        if (identity == 'ENTERPRISE') {
            companyCode = $('#getSupplyCode').val();
        } else {
            companyCode = $('#getCompanyCode').val();
        }
        this.comboBoxBank = new EUI.FormBatchNumbers({
            renderTo: this.renderTo1,
            'companyCode': companyCode,
        });
        this.initGrid();
        this.addEvents();
        this.blurEvents();
    },
    initGrid: function () {
        var g = this;
        EUI.Container({
            renderTo: this.renderTo,
            layout: "border", //布局方式
            border: false, //是否显示边框，false为不显示
            isOverFlow: false, //内容溢出时是否显示下拉滚动条，false为不显示
            height: 'auto',
            items: [{
                xtype: "FormPanel",
                region: "center",
                id: "scanForm",
                height: 120,
                padding: 0,
                layout: 'form',
                items: [{
                    xtype: "AutoCompleteBox",
                    title: "会计年度",
                    // field : ["dateYear"],// 需要传递到后端的值
                    id: "dateYear",
                    name: "dateYear",
                    width: 210,
                    height: 40,
                    labelWidth: 120,
                    editable: true,
                    async: true,//异步请求
                    searchField: ["dateYear"],// 当在输入框里面输入值时会自动搜索匹配相应的值
                    showField: ["dateYear"],// 显示拉下列表的内容
                    loaded: true,
                    displayText: "请选择会计年度",
                    hintText: "无默认选项",
                    value: $('#getDateYear').val(),
                    data: dateYear,
                }, {
                    xtype: "TextField",
                    title: g.title1,
                    width: 210,
                    height: 40,
                    allowBlank: false, //是否可以为空
                    name: "voucherNo",
                    id: "voucherNo",
                    labelWidth: 120,
                    displayText: g.title1,
                    readonly: "readonly",
                    value: $('#getVoucherNo').val(),
                    //validateText: "应付凭证号重复",
                    validater: function (value) {
                        if ($(".remarks").length == 0) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }, {
                    xtype: "TextField",
                    title: "行项号",
                    width: 210,
                    height: 40,
                    name: "lineItemNumber",
                    id: "lineItemNumber",
                    labelWidth: 120,
                    value: $('#getLineItemNumber').val(),
                    maxLenth: 5,
                    validateText: "请输入5位行项号！",
                    validater: function (value) {
                        if (value.length <= 5 ) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }, {
                    xtype: "ComboBox",
                    title: g.title,
                    field: [g.code], // 表示哪些值需要提交到后端
                    name: g.name,
                    id: 'companySupply',
                    labelWidth: 120,
                    displayText: g.displayText,
                    height: 40,
                    width: 200,
                    value: g.value,
                    async: true, // 是否异步，true为异步
                    store: {
                        url: g.url,
                    }, // 从后台获取数据的地址
                    editable: false, // 是否可编辑
                    loadMask: true, // 是否有遮罩层
                    showSearch: false, // 是否展开下拉框
                    searchText: "name", // 下拉框的内容
                    canClear: true,
                    beforeSelect: function (data) {
                        console.log(data);
                    },
                    afterSelect: function (d) {
                        var companyCode = d.data.companyCode;
                        $('#companyCode').val(companyCode);
                        selectData = [];
                        /*初始化表格数据 数量 价格*/
                        EUI.getCmp("tabFinancial2").setDataInGrid([]);
                        $('#invoiceNum').text('0');
                        $('#allMoney').text('0.00');
                        $('.check_all').removeClass('back_check_2').addClass('back_check_1');
                        /*eui附加表格请求参数*/
                        EUI.getCmp('tabFinancial1').setPostParams({
                            companyCode: d.data.companyCode,
                        }, true);
                        var identity = $('.identity').val();
                        if (identity == 'ENTERPRISE') {
                            EUI.getCmp("batchNumber").store.params.companyCode = d.data.supplyCode;
                        } else {
                            EUI.getCmp("batchNumber").store.params.companyCode = d.data.companyCode;
                        }
                    }
                }, {
                    xtype: "FieldGroup",
                    title: "是否添加发票明细",
                    height: 40,
                    labelWidth: 158,
                    style: {
                        "margin-top": "20px",
                    },
                    items: ['<div class="radio">' +
                    '<p><b class="radio_1" data="0"></b><span>是</span><b class="radio_2" data="1"></b><span>否</span></p>' +
                    '</div>']
                }],
            }],
        });
        $('input[name=lineItemNumber]').attr('maxlength', '5');
        clearFloat();
    },
    blurEvents: function () {
        //判断凭证号是否唯一
        valideCertificate("voucherNo");
    },
    addEvents: function () {
        //点击单选框
        $('.radio b').click(function () {
            var _this = $(this);
            $('.radio b.radio_1').addClass('radio_2').removeClass('radio_1');
            _this.addClass('radio_1').removeClass('radio_2');
            if ($('.radio b.radio_1').attr('data') == 1) {
                $('#showHideAccounts').css('display', '');
                $('#showHideBatchNumbers').css('display', 'none');
            } else {
                $('#showHideBatchNumbers').css('display', '');
                $('#showHideAccounts').css('display', 'none');
                return false;
            }
        });
        //判断是否存在发票明细
        var rowsArrayId = [];
        EUI.Store({
            url: _ctxPath + "/avf/accountRPInfo/findInvoicesByPayableCertificateAndBatchNumber.json",
            params: {
                'batchNumber': $('#getBatchNumbers').val(),
                'voucherNo': $('#getVoucherNo').val()
            },
            success: function (d) {
                //传参数发票表格1
                EUI.getCmp('tabFinancial1').setPostParams({
                    'batchNumber': $('#getBatchNumbers').val(),
                }, true);
                // console.log(d.rows);
                if (d.rows == null) {
                    $('.radio b.radio_1').addClass('radio_2').removeClass('radio_1');
                    $('.radio b.radio_2').eq(1).addClass('radio_1').removeClass('radio_2');
                    $('#showHideBatchNumbers').css('display', 'none');
                    $('#showHideAccounts').css('display', '');
                } else {
                    EUI.getCmp('tabFinancial2').setDataInGrid(d.rows);
                    for (var i in d.rows) {
                        rowsArrayId.push(d.rows[i].id);
                    }
                    var allMoney = 0, invoiceNum = 0, haveInvoiceArr = [];
                    //计算已存在发票数量以及价格
                    for (var key in d.rows) {
                        allMoney += d.rows[key].vatMoney;
                    }
                    $('#invoiceNum').text(d.rows.length);
                    $('#allMoney').text($.formatMoney(allMoney));
                    $('#tabFinancial2 .back_check_1').addClass('back_check_2').removeClass('back_check_1');
                }
            },
            failure: function (response) {
                errorInfo(response.msg);
            }
        });
        //查询编辑时对应批次号、应收应付凭证所有发票
        EUI.Store({
            url: _ctxPath + "/avf/accountRPInfo/findInvoicesByBatchNumber.json",
            params: {
                'batchNumber': $('#getBatchNumbers').val(),
                'type': 'edit',
                'voucherNo': $('#getVoucherNo').val(),
                'rows': '10000'
            },
            success: function (d) {
                var totalNum = 0;
                if (d.rows != null) {
                    totalNum = d.rows.length;
                }
                var totalPage = parseInt(totalNum / 10);
                var lastNum = totalNum % 10;
                for (var j in d.rows) {
                    if ($.inArray(d.rows[j].id, rowsArrayId) >= 0) {
                        d.rows[j].maturityDate = GetDateT(new Date(d.rows[j].maturityDate));
                        if (parseInt((parseInt(j) + 1) / 10) == parseInt(totalPage)) {
                            selectData.push({
                                page: parseInt((parseInt(j) + 1) / 10 + 1),
                                data: d.rows[j],
                                count: lastNum
                            });
                        } else {
                            selectData.push({page: parseInt((parseInt(j) + 1) / 10 + 1), data: d.rows[j], count: 10});
                        }
                    }
                }
                console.log(selectData);
                EUI.getCmp("tabFinancial1").setDataInGrid(d.rows);
                //把已选发票在所有发票里选中
                for (var i in rowsArrayId) {
                    var id = rowsArrayId[i];
                    $('#ul_tab_0 .check_every[fc-data=' + id + ']').removeClass('back_check_1').addClass('back_check_2');
                }
                if ($('#ul_tab_0 .check_every').length == $('#ul_tab_0 .back_check_2').length) {
                    $('#ul_tab_0 .check_all').removeClass('back_check_1').addClass('back_check_2');
                }
            },
            failure: function (response) {
                errorInfo(response.msg);
            }
        });
    }
});
//批次号
EUI.FormBatchNumbers = EUI.extend(EUI.CustomUI, {
    renderTo: "",
    width: 320,
    companyCode: null,
    initComponent: function () {
        var g = this;
        g.searchInvoice();
        EUI.Container({
            renderTo: this.renderTo,
            height: 'auto',
            items: [{
                xtype: "AutoCompleteBox",
                title: "批次号",
                field: ["batchNumber"],// 需要传递到后端的值
                id: "batchNumber",
                name: "batchNumber",
                width: 210,
                height: 40,
                labelWidth: 120,
                value: $('#getBatchNumbers').val(),
                editable: true,
                async: true,//异步请求
                loadonce: false,
                store: {
                    url: _ctxPath + "/avf/accountRPInfo/findBatchNumbers.json",
                    params: {'companyCode': g.companyCode},
                }, // 从后台获取数据的地址
                searchField: ["batchNumber"],// 当在输入框里面输入值时会自动搜索匹配相应的值
                showField: this.name,// 显示拉下列表的内容
                loaded: true,
                displayText: "请选择批次号",
                hintText: "无默认选项",
                // tbar:"底部选项卡",//底部工具栏
                // value : "选项1",
                // submitValue:{
                // id:"xx1"
                // },
                afterLoad: function (data) { // 远程加载数据完成时才会触发
                    // this.setSubmitValue(data[0]);
                    console.log(EUI.getCmp("companySupply").getSubmitValue());
                },
                beforeSelect: function (data) {
                    console.log(EUI.getCmp("companySupply").getValue());
                },
                afterSelect: function (d) {
                    console.log(EUI.getCmp("companySupply").getValue());
                    selectData = [];
                    /*初始化表格数据 数量 价格*/
                    EUI.getCmp("tabFinancial2").setDataInGrid([]);
                    // EUI.getCmp("tabFinancial1").setDataInGrid([]);
                    $('#invoiceNum').text('0');
                    $('#allMoney').text('0.00');
                    $('.check_all').removeClass('back_check_2').addClass('back_check_1');
                    // EUI.getCmp('tabFinancial1').setPostParams({
                    //     batchNumber:EUI.getCmp("batchNumber").getValue(),
                    // },true);

                    EUI.Store({
                        url: _ctxPath + "/avf/accountRPInfo/findInvoicesByBatchNumber.json",
                        params: {
                            'batchNumber': d.data.batchNumber,
                            'type': 'edit',
                            'voucherNo': $('#getVoucherNo').val(),
                            'rows': 10000
                        },
                        // url: _ctxPath+"/avf/accountRPInfo/findInvoicesByBatchNumber.json",
                        // params: {batchNumber:d.data.batchNumber,rows:10000},
                        success: function (data) {
                            // if(d.data.batchNumber == haveInvoice.batchNumber) {
                            //     for (var key in haveInvoice.invoiceInfo) {
                            //         data.rows.push(haveInvoice.invoiceInfo[key]);
                            //     }
                            // }
                            EUI.getCmp("tabFinancial1").setDataInGrid(data.rows);
                            // showToPageInfo(status.msg,_ctxPath +"/avf/accountRPInfo/accountRPInfoPage");
                        },
                        failure: function (response) {
                            errorInfo(response.msg);
                        }
                    });
                    // //把已存在发票添加到该批次下的所有发票
                    // if(haveInvoice.batchNumber == d.data.batchNumber){
                    //     EUI.getCmp('tabFinancial1').setDataInGrid(haveInvoice.invoiceInfo);
                    // }
                    // //所有发票中，和已存在发票相同就选中
                    // for(var key in haveInvoice.invoiceInfo){
                    //     $('#ul_tab_0 .check_every[fc-data='+haveInvoice.invoiceInfo[key].id+']').removeClass('back_check_1').addClass('back_check_2');
                    // }
                    // if($('#ul_tab_0 .check_every').length == $('#ul_tab_0 .back_check_2').length){
                    //     $('#ul_tab_0 .check_all').removeClass('back_check_1').addClass('back_check_2');
                    // }
                }
                // data : data
            }]
        });
        clearFloat();
    },
    searchInvoice: function () {

    }
});
//应付、应收账款金额、账款到期日
EUI.AccountForm = EUI.extend(EUI.CustomUI, {
    renderTo: null,
    //comboBoxBank: null,
    height: 'auto',
    data: null,
    title: null,
    initComponent: function () {
        /*this.comboBoxBank = new EUI.ComboBoxBank({
         renderTo: this.renderTo
         });*/
        this.initGrid();
        $('#showHideAccounts').css('display', 'none');
    },
    initGrid: function () {
        var g = this;
        EUI.Container({
            renderTo: this.renderTo,
            // layout: "border", //布局方式
            // padding: 20, //内边距
            border: false, //是否显示边框，false为不显示
            isOverFlow: false, //内容溢出时是否显示下拉滚动条，false为不显示
            height: 170,
            items: [{
                xtype: "FormPanel",
                region: "center",
                id: "accountForm",
                height: 120,
                padding: 0,
                layout: 'form',
                items: [{
                    xtype: "NumberField",
                    title: g.title,
                    width: 184,
                    height: 40,
                    precision: 2, //设置精度
                    // maxValue: $('#intentionMoney').val(), // 允许输入的最大值
                    minValue: 1, // 允许输入的最小值
                    allowNegative: false,// 设置是否可以输入负数，false为不能输入负数
                    allowChar: "0123456789",// 允许输入的数字
                    fullPrecision: true,// 若填写的数据没有达到需要精确的位数，则用0自动补齐
                    allowBlank: false, //是否可以为空
                    value: $('#getRecPayMoney').val(),
                    name: "recPayMoney",
                    id: "recPayMoney",
                    unit: "元", // 单位
                    displayText: g.title,
                    labelWidth: 120,
                    // validateText: "请输入正确的12位发票代码！",
                    // displayText: "发票代码",
                    // validater: function(value) {
                    //     var reg = /\b\d{12}\b/;
                    //     if(reg.test(value)) {
                    //         return true;
                    //     } else {
                    //         return false;
                    //     }
                    // }

                }, {
                    xtype: "DateField",
                    title: "账款到期日",
                    //format: "Y-m-d", // 采用年月日的格式
                    labelWidth: 120, //设置label的宽度
                    //maxDate: null, // 设置能够选择的最大日期
                    minDate: new Date().format('yyyyMMdd'), // 设置能够选择的最小日期，日期格式为"20170301"
                    width: 205,
                    height: 40,
                    listWidth: 150,
                    allowBlank: false, //是否可以为空
                    displayText: '账款到期日',
                    name: "maturityDate", // 设置日期选择框的name,用于后台接受此name
                    id: "maturityDate",
                    value: new Date($('#getMaturityDate').val()).format('yyyy-MM-dd'),
                    // value: new Date($('#financeEnd').val()).format('yyyy-MM-dd'),
                    //msg: "选择的日期范围未在设置之内", // 如果选择的日期未在设置的minDate或者maxDate之中，就显示设置的提示消息
                    // triggerCss: "ux-date-trigger", // 日期选择触发的样式
                    // triggerClickCss: "",
                    // afterValid: function () { // 事件：对日期校验后的操作
                    //    // console.log(EUI.getCmp("intentionFterm").getValue());
                    // },
                    afterSelect: function (data) { // 事件：选中日期后做的操作
                        var a = EUI.getCmp("intentionFterm").getValue();
                        console.log(a);
                    }
                },
                ],

            }],
        });
        clearFloat();
    },
    //提交表单
    getFormValue: function () {
    },
    addEvents: function () {
        //点击单选框
    },
});
//编辑应收、应付账款-发票表格
EUI.AddFinance1 = EUI.extend(EUI.CustomUI, {
    renderTo: null,
    renderTo2: null,
    comboBoxSupplier: null,
    data: null,
    height: 'auto',
    initComponent: function () {
        var _this = this;
        _this.initGridAll();
        _this.initGridSome();
        _this.addEvents();
        _this.choiceAll(1);
        _this.choiceCheckbox(0);
        _this.choiceCheckbox(1);
    },
    initGridAll: function () {
        var _this = this;
        EUI.GridPanel({
            renderTo: _this.renderTo,
            padding: 0, //设置表格的内边距
            exportXls: false,
            searchConfig: null,
            showRefresh: false,
            id: 'tabFinancial1',
            height: 'auto',
            gridCfg: {
                loadonce: true, //true数据一次性加载,每页返回加载每页的数据
                rowNum: 10,//一页显示几条数据
                //multiselect:true,//复选框
                rownumbers: false, //去掉表格序号
                //hasPager:false,
                colModel: _this.colModel(0),
                //每页数据加载完执行
                gridComplete: function (data) {
                    // console.log($('#ul_tab_0 .check_every'));
                    // console.log($('.ui-pg-input').val());
                    if ($('#ul_tab_0 .check_all').hasClass('back_check_2')) {
                        $('#ul_tab_0 .check_all').removeClass('back_check_2').addClass('back_check_1');
                    }
                    var count = 0;
                    var num = 0;
                    $('#ul_tab_0 .check').removeClass('back_check_2').addClass('back_check_1');
                    if (selectData.length > 0) {
                        for (var i = 0; i < selectData.length; i++) {
                            if (selectData[i].page == $('.ui-pg-input').val()) {
                                count++;
                                num = selectData[i].count;
                            }
                            EUI.getCmp("tabFinancial1").setSelectRowById(selectData[i].data.id);
                            $('#ul_tab_0 .check_every[fc-data=' + selectData[i].data.id + ']').removeClass('back_check_1').addClass('back_check_2');
                        }
                    }
                    if (count == num && count > 0) {
                        $('#ul_tab_0 .check_all').removeClass('back_check_1').addClass('back_check_2');
                    }
                }
            }
        });
    },
    initGridSome: function () {
        var _this = this;
        EUI.GridPanel({
            renderTo: _this.renderTo2,
            padding: 0, //设置表格的内边距
            exportXls: false,
            searchConfig: null,
            showRefresh: false,
            id: 'tabFinancial2',
            height: 'auto',
            gridCfg: {
                loadonce: true, //true数据一次性加载,每页返回加载每页的数据
                hasPager: false,
                rownumbers: false, //去掉表格序号
                colModel: _this.colModel(1),
            }
        });
    },
    colModel: function (flag, data) {
        return [{
            label: '<div class="check check_all back_check_1"></div>',
            name: "checkbox", //列显示的名称
            index: "checkbox", //传到服务器端用来排序的列名称
            width: 30,
            formatter: function (value, id, rowdata) {
                return '<div class="check check_every back_check_1" fc-data=' + rowdata.id + ' data=' + rowdata.vatMoney + '></div>';
            }
        }, {
            label: "序号",
            name: "id", //列显示的名称
            index: "id", //传到服务器端用来排序的列名称
            hidden: true //隐藏不显示这一组
        }, {
            label: "发票代码",
            name: "invoiceCode",
            index: "invoiceCode",
            width: 200,

        }, {
            label: "发票号码",
            name: "invoiceNo",
            index: "invoiceNo",
            // width: 109,

        }, {
            label: "价税合计",
            name: "vatMoney",
            index: "vatMoney",
            //width: 100,
            formatter: function (value, id, rowdata) {
                // if(flag == 0){
                return '￥' + $.formatMoney(rowdata.vatMoney, 2);
                // }else{
                //     return rowdata.vatMoney;
                // }
            }
        }, {
            label: "金额",
            name: "taxFreeSum",
            index: "taxFreeSum",
            // width: 100,
            formatter: function (value, id, rowdata) {
                // if(flag == 0){
                return '￥' + $.formatMoney(rowdata.taxFreeSum, 2);
                // }else{
                //     return rowdata.taxFreeSum;
                // }
            }

        }, {
            label: "税额",
            name: "vatSum",
            index: "vatSum",
            //width: 100,
            formatter: function (value, id, rowdata) {
                // if(flag == 0){
                return '￥' + $.formatMoney(rowdata.vatSum, 2);
                // }else{
                //     return rowdata.vatSum;
                // }

            }

        }, {
            label: "所属公司",
            name: "companyShortName",
            index: "companyShortName",
            //width: 120,

        }, {
            label: "开票日期",
            name: "invoDate",
            index: "invoDate",
            // width: 124,
            formatter: function (value, id, rowdata) {
                // if(flag == 0){
                //     return GetDateT(new Date(rowdata.invoDate));
                // }else{
                return rowdata.invoDate;
                // }
            }

        }, {
            label: "批次号 ",
            name: "batchNumber",
            index: "batchNumber",
            // width: 100,
        }, {
            label: "账款到期日",
            name: "maturityDate",
            index: "maturityDate",
            //width: 124,
            formatter: function (value, id, rowdata) {
                // if(flag == 0){
                return GetDateT(new Date(rowdata.maturityDate));
                // }else{
                //     return rowdata.maturityDate;
                // }

            }
        }];
    },
    choiceCheckbox: function (flag) {
        checkboxList(flag);
    },
    choiceAll: function (flag) {
        EUI.getCmp('tabFinancial1').getGridData();
        checkboxAll(flag);
    },
    addEvents: function () {
        var _this = this;
        //首页隐藏所有发票这块
        $('#ul_tab_0').css('display', 'none');
        $('.ul_list li').click(function () {
            //把已存在发票添加到该批次下的所有发票
            _this.choiceAll(0);
            $('.ul_list li').removeClass('li_1');
            $(this).addClass('li_1');
            console.log($(this).index());
            var index = $(this).index();
            for (var i = 0; i < $('.ul_list li').length; i++) {
                $('#ul_tab_' + i).css('display', 'none');
            }
            $('#ul_tab_' + index).css('display', '');
            var count = 0;
            var num = 0;
            $('#ul_tab_0 .check').removeClass('back_check_2').addClass('back_check_1');
            if (selectData.length > 0) {
                for (var i = 0; i < selectData.length; i++) {
                    if (selectData[i].page == $('.ui-pg-input').val()) {
                        count++;
                        num = selectData[i].count;
                    }
                    EUI.getCmp("tabFinancial1").setSelectRowById(selectData[i].data.id);
                    $('#ul_tab_0 .check_every[fc-data=' + selectData[i].data.id + ']').removeClass('back_check_1').addClass('back_check_2');
                }
            }
            if (count == num && count > 0) {
                $('#ul_tab_0 .check_all').removeClass('back_check_1').addClass('back_check_2');
            }
            if ($('#ul_tab_0 .check_every').length == $('#ul_tab_0 .back_check_2').length) {
                $('#ul_tab_0 .check_all').removeClass('back_check_1').addClass('back_check_2');
            }
        });
    }
});
//更新
$(function () {
    $('#editReyPayMoney').click(function () {
        var radioData = $('.radio_1').attr('data');
        var scanForm = EUI.getCmp("scanForm").getFormValue();
        var identity = $('.identity').val();
        if (identity == 'ENTERPRISE') {
            scanForm = $.extend({'supplyCode': $('#getSupplyCode').val()}, scanForm);
        } else {
            scanForm = $.extend({'companyCode': $('#getCompanyCode').val()}, scanForm);
        }
        var batchNumber = {'batchNumber': EUI.getCmp("batchNumber").getValue()};
        var objScan = $.extend(scanForm, batchNumber);
        objScan.id = $('#id').val();
        if (!EUI.getCmp("scanForm").isValid()) {
            errorInfo('应付凭证号、行项号、供应商有误！');
            return;
        }
        if (radioData == 1) {
            var objAccount = EUI.getCmp("accountForm").getFormValue();
            objAccount.id = $('#id').val();
            if (!EUI.getCmp("accountForm").isValid()) {
                errorInfo('账款到期日、金额不能为空！');
                return;
            }
            objScan = {'RPInfo': JSON.stringify($.extend(objScan, objAccount))};
        } else {
            var ele = $('#tabFinancial2 td .back_check_2');
            var invoiceIds = '', i = 0, len = ele.length;
            ele.each(function () {
                i++;
                if (i == len) {
                    invoiceIds += $(this).attr('fc-data');
                } else {
                    invoiceIds += $(this).attr('fc-data') + ',';
                }
            });
            if (invoiceIds == '') {
                errorInfo('请选择发票！');
                return;
            }
            objScan = {'RPInfo': JSON.stringify(objScan), 'invoiceIds': invoiceIds};
        }
        EUI.Store({
            url: _ctxPath + "/avf/accountRPInfo/updateAccountRPInfo.json",
            params: objScan,
            success: function (status) {
                showToPageInfo(status.msg, _ctxPath + "/avf/accountRPInfo/accountRPInfoPage");
            },
            failure: function (response) {
                errorInfo(response.msg);
            }
        });
    });
    //取消
    $('#reyPayMoneyCancel').click(function () {
        window.location.href = _ctxPath + '/avf/accountRPInfo/accountRPInfoPage';
    });
});
/*单选*/
function checkboxList(flag) {
    $('#ul_tab_' + flag + ' .check').live("click", function () {
        var page = $('.ui-pg-input').val();//当前页数
        var invoiceNum = parseInt($('#invoiceNum').text());
        var allMoney = parseFloat($('#allMoney').text()).toFixed(2);
        var _this = $(this);
        var delFlag = 0;
        if ($(this).hasClass('check_all')) {
        } else {
            var count = $('#ul_tab_' + flag + ' .check_every').length;
            var count2 = 0;
            if (_this.hasClass('back_check_1')) {
                var getRowData = EUI.getCmp("tabFinancial1").getRowData(_this.attr('fc-data'));
                //判断账款到期日是否相同
                if (selectData.length != 0) {
                    if (selectData[0].data.maturityDate != getRowData.maturityDate) {
                        errorInfo('请选择账款到期日相同的发票');
                        return;
                    }
                }
                //判断账款到期不能小于当前日期
                var nowDate = String(new Date().format('yyyy-MM-dd'));
                if (getRowData.maturityDate <= nowDate) {
                    errorInfo('请选择账款到期日不能小于当前日期的发票');
                    return;
                }
                _this.removeClass('back_check_1').addClass('back_check_2');
                //push数据
                selectData.push({page: page, data: getRowData, count: count});
                console.log(selectData);
                if (flag == 0) {
                }
            } else {
                delFlag = 1;
                //pull出数据
                for (var i = (selectData.length - 1); i >= 0; i--) {
                    if (_this.attr('fc-data') == selectData[i].data.id) {
                        selectData.splice(i, 1);
                    }
                }
                console.log(selectData);
                _this.removeClass('back_check_2').addClass('back_check_1');
            }
            count2 = $('#ul_tab_' + flag + ' .check_every.back_check_2').length;
            if (flag == 0) {
                if (count == count2) {
                    $('#ul_tab_' + flag + ' .check_all').removeClass('back_check_1').addClass('back_check_2');
                } else {
                    $('#ul_tab_' + flag + ' .check_all').removeClass('back_check_2').addClass('back_check_1');
                }
            }
        }
        var totalMoney = 0, getSelectData = [];
        for (var i = 0; i < selectData.length; i++) {
            if (typeof(selectData[i].data.vatMoney) == 'string') {
                selectData[i].data.vatMoney = $.unformatMoney(selectData[i].data.vatMoney.substr(1));
                selectData[i].data.taxFreeSum = $.unformatMoney(selectData[i].data.taxFreeSum.substr(1));
                selectData[i].data.vatSum = $.unformatMoney(selectData[i].data.vatSum.substr(1));
            } else {

            }

            getSelectData.push(selectData[i].data);
        }
        EUI.getCmp("tabFinancial2").setDataInGrid(getSelectData);
        for (var key in getSelectData) {
            totalMoney += parseFloat(getSelectData[key].vatMoney);
        }
        $('#invoiceNum').text(getSelectData.length);
        $('#allMoney').text($.formatMoney(totalMoney, 2));
        $('#ul_tab_1 .check').removeClass(' back_check_1').addClass(' back_check_2');
    });
}
/*全选*/
function checkboxAll(flag) {
    $('#ul_tab_' + flag + ' .check_all').click(function () {
        var page = $('.ui-pg-input').val();//显示页数
        var count = $('#ul_tab_' + flag + ' .check_every').length;//显示每页的条数
        var invoiceNum = parseInt($('#invoiceNum').text());
        var allMoney = parseFloat($('#allMoney').text()).toFixed(2);
        var _this = $(this);
        if ($(this).hasClass('check_all')) {
            //全选选中
            if (_this.hasClass('back_check_1')) {

                //push全选数据
                var updateData = [];
                if (selectData.length > 0) {
                    for (var j = 0; j < selectData.length; j++) {
                        updateData.push(selectData[j].data.id);
                    }
                }
                //判断全选是否有相同的账款到期日的发票
                var ifData = [], errorCount = 0, compareDateCount = 0;
                var nowDate = String(new Date().format('yyyy-MM-dd'));
                $('#ul_tab_' + flag + ' .check_every').each(function () {
                    var g = $(this);
                    var getRowData = EUI.getCmp("tabFinancial1").getRowData(g.attr('fc-data'));
                    ifData.push(getRowData.maturityDate);
                    if (selectData.length != 0 && selectData[0].data.maturityDate != getRowData.maturityDate) {
                        errorCount++;
                    }
                    if (getRowData.maturityDate <= nowDate) {
                        compareDateCount++;
                    }
                });
                if (errorCount > 0) {
                    errorInfo('请选择账款到期日相同的发票');
                    return;
                }
                if (selectData.length == 0) {
                    ifData.sort();
                    for (var i = 0; i < ifData.length - 1; i++) {
                        if (ifData[i] != ifData[i + 1]) {
                            errorInfo('请选择账款到期日相同的发票');
                            return;
                        }
                    }
                }
                //判断账款到期不能小于当前日期
                if (compareDateCount > 0) {
                    errorInfo('请选择账款到期日不能小于当前日期的发票');
                    return;
                }

                $('#ul_tab_' + flag + ' .check_every').each(function () {
                    var g = $(this);
                    var getRowData = EUI.getCmp("tabFinancial1").getRowData(g.attr('fc-data'));

                    // if(selectData.length != 0 && selectData[0].maturityDate != getRowData.maturityDate){
                    //     errorInfo('请选择账款到期日相同的发票');
                    //     return;
                    // }
                    if (updateData.length == 0) {
                        selectData.push({page: page, data: getRowData, count: count});
                    } else {
                        if ($.inArray(g.attr('fc-data'), updateData) < 0) {
                            selectData.push({page: page, data: getRowData, count: count});
                        } else {

                        }
                        // for(var i = 0;i < updateData.length;i++){
                        //     if(updateData[i].data.id == g.attr('fc-data')){
                        //
                        //     }else{
                        //         selectData.push({page:page,data:EUI.getCmp("tabFinancial1").getRowData(g.attr('fc-data')),count:count});
                        //     }
                        // }
                    }
                });
                console.log(selectData);
                if (flag == 0) {
                    // var dataAll = EUI.getCmp('tabFinancial1').getGridData();
                    // for(var i in dataAll){
                    //     dataAll[i].vatMoney = $.unformatMoney(dataAll[i].vatMoney);
                    //     dataAll[i].vatSum = $.unformatMoney(dataAll[i].vatSum);
                    //     dataAll[i].taxFreeSum = $.unformatMoney(dataAll[i].taxFreeSum);
                    // }
                    // EUI.getCmp("tabFinancial2").setDataInGrid(dataAll);
                    $('#ul_tab_1 .check').removeClass(' back_check_1').addClass(' back_check_2');
                }
                // $('#ul_tab_'+flag+' .check_every').each(function () {
                //     allMoney = parseFloat(parseFloat(allMoney) + parseFloat($(this).attr('data'))).toFixed(2);
                //     invoiceNum += 1;
                // });
                _this.removeClass(' back_check_1').addClass(' back_check_2');
                $('#ul_tab_' + flag + ' .check_every').removeClass('back_check_1').addClass('back_check_2');
            } else {
                //pull全选的数据
                $('#ul_tab_' + flag + ' .check_every').each(function () {
                    var g = $(this);
                    for (var i = (selectData.length - 1); i >= 0; i--) {
                        if (selectData[i].data.id == g.attr('fc-data')) {
                            selectData.splice(i, 1);
                        } else {
                        }
                    }
                });
                //把取消已存在的发票放到所有发票中
                console.log(selectData);
                if (flag == 0) {
                    var dataAll = EUI.getCmp('tabFinancial1').getGridData();
                    for (var i in dataAll) {
                        EUI.getCmp('tabFinancial2').deleteRow(dataAll[i].id);
                    }
                }
                _this.removeClass('back_check_2').addClass('back_check_1');
                $('#ul_tab_' + flag + ' .check_every').removeClass('back_check_2').addClass('back_check_1');
            }
            var totalMoney = 0, getSelectData = [];
            for (var i = 0; i < selectData.length; i++) {
                getSelectData.push(selectData[i].data);
            }
            for (var key in getSelectData) {
                if (typeof (getSelectData[key].vatMoney) == 'string') {
                    totalMoney += $.unformatMoney(getSelectData[key].vatMoney.substr(1));
                    getSelectData[key].vatMoney = $.unformatMoney(getSelectData[key].vatMoney.substr(1));
                    getSelectData[key].taxFreeSum = $.unformatMoney(getSelectData[key].taxFreeSum.substr(1));
                    getSelectData[key].vatSum = $.unformatMoney(getSelectData[key].vatSum.substr(1));
                } else {
                    totalMoney += parseFloat(getSelectData[key].vatMoney);
                }

            }
            EUI.getCmp("tabFinancial2").setDataInGrid(getSelectData);
            if (flag == 0) {
                $('#ul_tab_1 .check').removeClass(' back_check_1').addClass(' back_check_2');
            }
            $('#invoiceNum').text(getSelectData.length);
            $('#allMoney').text($.formatMoney(totalMoney, 2));
        }
    });
}