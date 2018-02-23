/**
 * Created by Administrator on 2017/8/1.
 * des:核心企业、供应商新增应收、应付账款js
 * jspPath:WEB-INF/views/avf/enterprise/add_rec_pay_money.jsp
 */
var selectData = [], afterSelectCount = 0;
console.log(dateYear);
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
    title1: null,
    initComponent: function () {
        this.comboBoxBank = new EUI.FormBatchNumbers({
            renderTo: this.renderTo1,
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
            // padding: 20, //内边距
            border: false, //是否显示边框，false为不显示
            isOverFlow: false, //内容溢出时是否显示下拉滚动条，false为不显示
            height: 310,
            items: [{
                xtype: "FormPanel",
                region: "center",
                id: "scanForm",
                height: 300,
                padding: 0,
                layout: 'form',
                items: [{
                    xtype: "AutoCompleteBox",
                    title: "会计年度",
                    field: ["dateYear"],// 需要传递到后端的值
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
                    value: new Date().getFullYear(),
                    data: dateYear
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
                    // validateText: "请输入正确的12位发票代码！",
                    // displayText: "发票代码",
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
                    maxLenth: 5,
                    displayText: "行项号",
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
                    allowBlank: false, //是否可以为空
                    displayText: g.displayText,
                    height: 40,
                    width: 200,
                    async: true, // 是否异步，true为异步
                    store: {
                        url: g.url,
                    }, // 从后台获取数据的地址
                    editable: false, // 是否可编辑
                    loadMask: true, // 是否有遮罩层
                    showSearch: false, // 是否展开下拉框
                    searchText: "name", // 下拉框的内容
                    canClear: true,
                    afterSelect: function (d) {
                        afterSelectCount++;
                        var companyCode = d.data.companyCode;
                        $('#companyCode').val(companyCode);
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
                    //width: 332,
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
    },
});
//批次号
EUI.FormBatchNumbers = EUI.extend(EUI.CustomUI, {
    renderTo: "",
    width: 320,
    companyCode: null,
    initComponent: function () {
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
                editable: true,
                async: true,//异步请求
                loadonce: false,
                store: {
                    url: _ctxPath + "/avf/accountRPInfo/findBatchNumbers.json",
                    params: {'companyCode': ''},
                }, // 从后台获取数据的地址
                searchField: ["batchNumber"],// 当在输入框里面输入值时会自动搜索匹配相应的值
                showField: this.name,// 显示拉下列表的内容
                loaded: true,
                displayText: "请选择批次号",
                hintText: "无默认选项",
                afterSelect: function (d) {
                    console.log(EUI.getCmp("companySupply").getValue());
                    selectData = [];
                    /*初始化表格数据 数量 价格*/
                    EUI.getCmp("tabFinancial2").setDataInGrid([]);
                    $('#invoiceNum').text('0');
                    $('#allMoney').text('0.00');
                    $('.check_all').removeClass('back_check_2').addClass('back_check_1');
                    EUI.getCmp('tabFinancial1').setPostParams({
                        batchNumber: EUI.getCmp("batchNumber").getValue(),
                    }, true);
                }
            }]
        });
        $('input[name=batchNumber]').attr('maxlength', '10');
        clearFloat();
    },
});
//应付、应收账款金额、账款到期日
EUI.AccountForm = EUI.extend(EUI.CustomUI, {
    renderTo: null,
    height: 'auto',
    data: null,
    title: null,
    initComponent: function () {
        this.initGrid();
        $('#showHideAccounts').css('display', 'none');
    },
    initGrid: function () {
        var g = this;
        EUI.Container({
            renderTo: g.renderTo,
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
                    labelWidth: 120,
                    precision: 2, //设置精度
                    // maxValue: $('#intentionMoney').val(), // 允许输入的最大值
                    minValue: 1, // 允许输入的最小值
                    allowNegative: false,// 设置是否可以输入负数，false为不能输入负数
                    allowChar: "0123456789",// 允许输入的数字
                    fullPrecision: true,// 若填写的数据没有达到需要精确的位数，则用0自动补齐
                    allowBlank: false, //是否可以为空
                    displayText: g.title,
                    name: "recPayMoney",
                    id: "recPayMoney",
                    unit: "元", // 单位
                }, {
                    xtype: "DateField",
                    title: "账款到期日",
                    labelWidth: 120, //设置label的宽度
                    //maxDate: null, // 设置能够选择的最大日期
                    minDate: new Date().format('yyyyMMdd'), // 设置能够选择的最小日期，日期格式为"20170301"
                    width: 205,
                    height: 40,
                    listWidth: 150,
                    allowBlank: false, //是否可以为空
                    name: "maturityDate", // 设置日期选择框的name,用于后台接受此name
                    id: "maturityDate",
                    displayText: "账款到期日",
                }],
            }],
        });
        clearFloat();
    },
});
//带有复选框的发票列表
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
        _this.choiceAll(0);
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
                loadonce: false, //true数据一次性加载,每页返回加载每页的数据
                url: _ctxPath + "/avf/accountRPInfo/findInvoicesByBatchNumber.json",//获取后端数据
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
                    for (var i = 0; i < selectData.length; i++) {
                        if (selectData[i].page == $('.ui-pg-input').val()) {
                            count++;
                            num = selectData[i].count;
                        }
                        EUI.getCmp("tabFinancial1").setSelectRowById(selectData[i].data.id);
                        $('#ul_tab_0 .check_every[fc-data=' + selectData[i].data.id + ']').removeClass('back_check_1').addClass('back_check_2');
                    }
                    if (count == num && count > 0) {
                        $('#ul_tab_0 .check_all').removeClass('back_check_1').addClass('back_check_2');
                    }
                },
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
            //autoLoad: true, //自动加载
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
            // width: 100,
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
                if (flag == 0) {
                    return '￥' + $.formatMoney(rowdata.vatMoney, 2);
                } else {
                    return rowdata.vatMoney;
                }

            }
        }, {
            label: "金额",
            name: "taxFreeSum",
            index: "taxFreeSum",
            // width: 100,
            formatter: function (value, id, rowdata) {
                if (flag == 0) {
                    return '￥' + $.formatMoney(rowdata.taxFreeSum, 2);
                } else {
                    return rowdata.taxFreeSum;
                }
            }

        }, {
            label: "税额",
            name: "vatSum",
            index: "vatSum",
            //width: 100,
            formatter: function (value, id, rowdata) {
                if (flag == 0) {
                    return '￥' + $.formatMoney(rowdata.vatSum, 2);
                } else {
                    return rowdata.vatSum;
                }
            }
        }, {
            label: "所属公司",
            name: "companyShortName",
            index: "companyShortName",
            //width: 120,

        },
            {
                label: "开票日期",
                name: "invoDate",
                index: "invoDate",
                // width: 124,
                formatter: function (value, id, rowdata) {
                    if (flag == 0) {
                        return GetDateT(new Date(rowdata.invoDate));
                    } else {
                        return rowdata.invoDate;
                    }
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
                width: 200,
                formatter: function (value, id, rowdata) {
                    if (flag == 0) {
                        return GetDateT(new Date(rowdata.maturityDate));
                    } else {
                        return rowdata.maturityDate;
                    }
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
        $('#ul_tab_1').css('display', 'none');
        $('.ul_list li').click(function () {
            //_this.choiceCheckbox(1);
            _this.choiceAll(1);
            $('.ul_list li').removeClass('li_1');
            $(this).addClass('li_1');
            console.log($(this).index());
            var index = $(this).index();
            for (var i = 0; i < $('.ul_list li').length; i++) {
                $('#ul_tab_' + i).css('display', 'none');
            }
            $('#ul_tab_' + index).css('display', '');
            $('#ul_tab_0 .check').removeClass('back_check_2').addClass('back_check_1');
            //选中之前在所有表格选中的发票
            var count = 0;
            var num = 0;
            for (var i = 0; i < selectData.length; i++) {
                if (selectData[i].page == $('.ui-pg-input').val()) {
                    count++;
                    num = selectData[i].count;
                }
                EUI.getCmp("tabFinancial1").setSelectRowById(selectData[i].data.id);
                $('#ul_tab_0 .check_every[fc-data=' + selectData[i].data.id + ']').removeClass('back_check_1').addClass('back_check_2');
            }
            if (count == num && count > 0) {
                $('#ul_tab_0 .check_all').removeClass('back_check_1').addClass('back_check_2');
            }
        });
        //确认选中发票进入下一步
        $('#confirm_next').click(function () {
            if (parseInt($('#invoiceNum').text()) == 0) {
                errorInfo('请选择发票');
                return;
            }
            var ids = '', i = 0;
            var count = $('#ul_tab_1 .check.check_every.back_check_2').length;
            $('#ul_tab_1 .check.check_every.back_check_2').each(function () {
                i++;
                if (i == count) {
                    ids += $(this).attr('fc-data');
                } else {
                    ids += $(this).attr('fc-data') + ',';
                }
            });
            var invoiceTotalMoney = parseFloat($.unformatMoney($('#allMoney').text())).toFixed(2);
            var invoiceTotalNumber = parseInt($('#invoiceNum').text());
            var companyCode = String($('#companyCode').val());
            window.location.href = _ctxPath + '/avf/financingDemand/toAddFinanceNext?ids=' + ids + '&invoiceTotalMoney=' + invoiceTotalMoney + '&invoiceTotalNumber=' + invoiceTotalNumber + '&companyCode=' + companyCode;
        });
    },
});
//提交
$(function () {
    $('#addReyPayMoney').click(function () {
        var radioData = $('.radio_1').attr('data');
        var objScan = $.extend(EUI.getCmp("scanForm").getFormValue(), {'batchNumber': EUI.getCmp("batchNumber").getValue()});
        if (!EUI.getCmp("scanForm").isValid()) {
            errorInfo('应付凭证号、行项号、供应商有误！');
            return;
        }
        if (radioData == 1) {
            var objAccount = EUI.getCmp("accountForm").getFormValue();
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
            url: _ctxPath + "/avf/accountRPInfo/saveAccountRPInfo.json",
            params: objScan,
            success: function (status) {
                showToPageInfo(status.msg, _ctxPath + "/avf/accountRPInfo/accountRPInfoPage");
            },
            failure: function (response) {
                errorInfo(response.msg);
            }
        });
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
            var dataAll = [];
            var count = $('#ul_tab_' + flag + ' .check_every').length;
            var count2 = 0;
            if (_this.hasClass('back_check_1')) {
                var getRowData = EUI.getCmp("tabFinancial1").getRowData(_this.attr('fc-data'));
                //判断账款到期日是否相同
                if (selectData.length != 0) {
                    // for(var key in selectData){
                    if (selectData[0].data.maturityDate != getRowData.maturityDate) {
                        errorInfo('请选择账款到期日相同的发票');
                        return;
                    }
                    // }
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
            totalMoney += $.unformatMoney(selectData[i].data.vatMoney.substr(1));
            getSelectData.push(selectData[i].data);
        }
        EUI.getCmp("tabFinancial2").setDataInGrid(getSelectData);
        $('#ul_tab_1 .check').removeClass(' back_check_1').addClass(' back_check_2');
        if (flag == 0) {
            $('#ul_tab_1 .check').removeClass(' back_check_1').addClass(' back_check_2');
        }
        $('#invoiceNum').text(selectData.length);
        $('#allMoney').text($.formatMoney(totalMoney, 2));
        if (delFlag == 1) {
            EUI.getCmp('tabFinancial2').deleteRow($(this).attr('fc-data'));
        }
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
                    if (updateData.length == 0) {
                        selectData.push({page: page, data: getRowData, count: count});
                    } else {
                        if ($.inArray(g.attr('fc-data'), updateData) < 0) {
                            selectData.push({page: page, data: getRowData, count: count});
                        }
                    }
                });
                console.log(selectData);
                if (flag == 0) {
                    $('#ul_tab_1 .check').removeClass(' back_check_1').addClass(' back_check_2');
                }
                _this.removeClass(' back_check_1').addClass(' back_check_2');
                $('#ul_tab_' + flag + ' .check_every').removeClass('back_check_1').addClass('back_check_2');
            } else {
                //pull全选的数据
                $('#ul_tab_' + flag + ' .check_every').each(function () {
                    var g = $(this);
                    for (var i = (selectData.length - 1); i >= 0; i--) {
                        if (selectData[i].data.id == g.attr('fc-data')) {
                            selectData.splice(i, 1);
                        }
                    }
                });
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
                totalMoney += $.unformatMoney(selectData[i].data.vatMoney.substr(1));
                getSelectData.push(selectData[i].data);
            }
            EUI.getCmp("tabFinancial2").setDataInGrid(getSelectData);
            if (flag == 0) {
                $('#ul_tab_1 .check').removeClass(' back_check_1').addClass(' back_check_2');
            }
            $('#invoiceNum').text(selectData.length);
            $('#allMoney').text($.formatMoney(totalMoney, 2));
        }
    });
}
