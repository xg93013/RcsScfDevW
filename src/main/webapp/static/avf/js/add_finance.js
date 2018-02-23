/**
 * des:供应商新增融资申请js
 * jspPath:WEB-INF/views/avf/supplier/add_finance_first.jsp
 * 以及WEB-INF/views/avf/supplier/add_finance_next.jsp
 */
var selectData = [];
$(function () {
    if ($.session.get('key') != undefined) {
        var sessionDataObj = JSON.parse($.session.get('key'));
        for (var i in sessionDataObj.selectData) {
            selectData.push(sessionDataObj.selectData[i]);
        }
    }
    //融资银行下拉框
    EUI.ComboBoxBank = EUI.extend(EUI.CustomUI, {
        renderTo: "",
        initComponent: function () {
            EUI.Container({
                renderTo: this.renderTo,
                height: 60,
                width: 338,
                style: {
                    'padding': '0px',
                },
                items: [{
                    xtype: "ComboBox",
                    field: ["finInsCode"], // 表示哪些值需要提交到后端
                    name: "finInsName",
                    id: "finIns",
                    allowBlank: false,
                    displayText: "请选择融资银行",
                    height: 40,
                    width: 295,
                    async: true, // 是否异步，true为异步
                    store: {
                        url: _ctxPath + "/avf/financingRelConfigure/findRelByCompanyCodeAndSupplyCode.json?companyCode=" + $('#companyCode').val(),
                    }, // 从后台获取数据的地址
                    editable: false, // 是否可编辑
                    loadMask: true, // 是否有遮罩层
                    showSearch: false, // 是否展开下拉框
                    searchText: "name", // 下拉框的内容
                    canClear: true,
                    afterSelect: function (d) {
                        //选择融资银行查询基本信息
                        $('#bankRateFollow').text(parseFloat(d.data.bankRate).toFixed(2));
                        $('#rateB').css('display', '');
                    }
                }],
            });
        }
    });
    //意向融资金额
    EUI.NumberFinanceMoney = EUI.extend(EUI.CustomUI, {
        renderTo: "",
        width: 320,
        initComponent: function () {
            var g = this;
            EUI.Container({
                renderTo: this.renderTo,
                items: [{
                    xtype: "NumberField",
                    title: "意向融资金额",
                    labelWidth: 141,
                    width: 296,
                    height: 40,
                    id: 'txtMoney',
                    //displayText: "请输入数字,只能输入正数",
                    //hintText: "默认值为1.298，只能输入正数（四舍五入）",
                    allowBlank: false,
                    displayText: "意向融资金额",
                    value: $('#invoiceTotalMoney').val(),
                    maxValue: $('#invoiceTotalMoney').val(), // 允许输入的最大值
                    minValue: 1.00, // 允许输入的最小值
                    precision: 2, // 输入的数据精确到多少位，默认值0表示精确到个位
                    allowNegative: false, // 设置是否可以输入负数，false为不能输入负数
                    allowChar: "0123456789", // 允许输入的数字
                    fullPrecision: true
                    // 若填写的数据没有达到需要精确的位数，则用0自动补齐
                }]
            });
            g.addEvent();
            clearFloat();
        },
        addEvent: function () {
            //失去焦点  得到融资比例
            $('#txtMoney').live('blur', function () {

                var valMoney = EUI.getCmp('txtMoney').getValue();
                if (valMoney == '' || valMoney > $('#invoiceTotalMoney').val() || valMoney < 1) {
                    $('#txtMoney input').addClass('ux-field-invalid');
                    $('#financeRate').text('');
                    return;
                }
                var rate = valMoney / $('#invoiceTotalMoney').val();
                // var formatRate = parseFloat(rate*100).toFixed(2);
                var formatRate = Math.round(rate * 100);
                $('#financeRate').text(formatRate + '%');
            });
            // $("#integer input").on("input propertychange", function () {
            //     var vl = EUI.getCmp("integer").getValue();
            //     EUI.ProcessStatus({ // ProcessStatus不用写renderTo是因为每个页面只允许有一个状态提示框
            //         msg: "数字输入框的值：" + vl
            //     });
            //
            // });
        },
        getTextValue: function () {
            var twoGrade = EUI.getCmp("txtMoney").getValue();
            console.log(twoGrade);
            return twoGrade;
        },
    });
    //意向融资期限
    EUI.NumberFinanceTerm = EUI.extend(EUI.CustomUI, {
        renderTo: "",
        width: 320,
        initComponent: function () {
            EUI.Container({
                renderTo: this.renderTo,
                items: [{
                    xtype: "DateField",
                    title: "意向融资期限",
                    labelWidth: 141,
                    width: 297,
                    height: 40,
                    name: "dateField", // 设置日期选择框的name,用于后台接受此name
                    id: "dateField",
                    style: {
                        'text-align': 'right',
                        'float': 'none'
                    },
                    allowBlank: false, //是否可以为空
                    displayText: "意向融资期限",
                    minDate: String(new Date().format("yyyyMMdd")), // 设置能够选择的最小日期，日期格式为"20170301"
                    msg: "选择的日期范围未在设置之内", // 对不符合的日期设置提示消息
                }]
            });
            clearFloat();
        },
    });
    //意向融资备注
    EUI.NumberBankRate = EUI.extend(EUI.CustomUI, {
        renderTo: "",
        width: 670,
        initComponent: function () {
            EUI.Container({
                renderTo: this.renderTo,
                items: [{
                    xtype: "TextField",
                    title: "意向融资备注",
                    labelWidth: 141,
                    width: 650,
                    style: {
                        'text-align': 'right',
                        'float': 'none'
                    },
                    height: 40,
                    name: "name",
                    displayText: "意向融资备注",
                    id: "txtRemark",
                }]
            });
            clearFloat();
        }
    });
    //保存融资申请-显示应收账款的表格
    EUI.AddFinance2 = EUI.extend(EUI.CustomUI, {
        renderTo: "",
        renderToBank: null,
        renderToMoney: null,
        renderToTerm: null,
        renderToRate: null,
        height: 'auto',
        width: 1180,
        comboBoxBank: null,
        numberFinanceMoney: null,
        numberFinanceTerm: null,
        numberBankRate: null,
        initComponent: function () {
            var _this = this;
            _this.comboBoxBank = new EUI.ComboBoxBank({
                renderTo: _this.renderToBank,
            });
            _this.numberFinanceMoney = new EUI.NumberFinanceMoney({
                renderTo: _this.renderToMoney,
            });
            _this.numberFinanceTerm = new EUI.NumberFinanceTerm({
                renderTo: _this.renderToTerm,
            });
            _this.numberBankRate = new EUI.NumberBankRate({
                renderTo: _this.renderToRate,
            });
            _this.initGrid();
            _this.addEvents();
        },
        initGrid: function () {
            var g = this;
            EUI.GridPanel({
                renderTo: g.renderTo,
                style: {
                    'padding': '0px',
                    'overflow': 'inherit',
                },
                height: 'auto',
                width: 1180,
                padding: 0, //设置表格的内边距
                exportXls: false,
                searchConfig: null,
                showRefresh: false,
                id: "tabShowFinance",
                gridCfg: {
                    //rownumbers: false, //去掉表格序号
                    loadonce: true, //一次性加载数据，和autoLoad都为true时，则可以一次加载所有数据
                    shrinkToFit: true, //表格宽度不自适应
                    url: _ctxPath + "/avf/financingDemand/findAddRPInfoNext.json?ids=" + $('#ids').val(),
                    rowNum: 10,
                    hasPager: false,
                    //height:200,
                    //数据加载完成后执行的方法
                    gridComplete: function (data) {
                        //计算意向融资期限=账款到期日+6
                        EUI.Store({
                            url: _ctxPath + "/avf/financingDemand/findAddRPInfoNext.json",
                            params: {
                                ids: $('#ids').val(),
                            },
                            type: 'GET',
                            success: function (response) {
                                var maturityDate = new Date(response[0].maturityDate);
                                EUI.getCmp("dateField").setValue(new Date(maturityDate.setMonth(maturityDate.getMonth() + 6)).format('yyyy-MM-dd'));
                            },

                        });
                    },
                    colModel: [{
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

                    }, {
                        label: "应收账款金额",
                        name: "recPayMoney",
                        index: "recPayMoney",
                        formatter: function (value, id, rowdata) {
                            return '￥' + $.formatMoney(rowdata.recPayMoney, 2);
                        }
                    }, {
                        label: "账款到期日",
                        name: "maturityDate",
                        index: "maturityDate",
                        //width: 120,
                        formatter: function (value, id, rowdata) {
                            return GetDateT(new Date(rowdata.maturityDate));
                        }

                    }],
                }

            });
        },
        addEvents: function () {
            $('#g_tabShowFinance_rn').append('序号');
            //提交
            $('#addFinanceSubmit').live('click', function () {
                //验证文本框
                var eletor = ['finIns', 'txtMoney', 'dateField'];
                var count = 0;
                var objParams = {};
                for (var i in eletor) {
                    if (eletor[i] == 'txtMoney') {
                        var valMoney = EUI.getCmp(eletor[i]).getValue();
                        if (valMoney == '' || valMoney > $('#invoiceTotalMoney').val() || valMoney < 1) {
                            count++;
                            $('#' + eletor[i] + ' input').addClass('ux-field-invalid');
                        }
                    } else {
                        if (EUI.getCmp(eletor[i]).getValue() == '') {
                            count++;
                            $('#' + eletor[i] + ' input').addClass('ux-field-invalid');
                        }
                    }
                }
                if (count >= 1) {
                    if (EUI.getCmp('finIns').getValue() == '') {
                        errorInfo('请选择融资银行');
                    }
                    return;
                }
                objParams.demandHead = {
                    bankRate: $('#bankRateFollow').text(),
                    intentionFmoney: EUI.getCmp("txtMoney").getValue(),
                    intentionFremark: EUI.getCmp("txtRemark").getValue(),
                    intentionFterm: EUI.getCmp("dateField").getValue(),
                    totalMoney: $.unformatMoney($('#totalMoney').text()),
                    companyCode: $('#companyCode').val(),
                    supplyName: $('#getSupplyName').val(),
                    supplyCode: $('#getSupplyCode').val()
                };
                objParams.rpIds = $('#ids').val();
                objParams.demandHead = JSON.stringify($.extend(objParams.demandHead, EUI.getCmp("finIns").getSubmitValue()));
                EUI.Store({
                    url: _ctxPath + "/avf/financingDemand/saveFinancingDemand.json",
                    params: objParams,
                    type: 'POST',
                    success: function (response) {
                        $.session.clear();
                        showToPageInfo(response.msg, _ctxPath + '/avf/financingDemand/toDemandPage?type=supplier');
                    },
                    failure: function (response) {
                        errorInfo(response.msg);
                    }
                });
            });
            //清空
            $('#addFinanceClear').click(function () {
                EUI.getCmp("finIns").setValue('');
                EUI.getCmp("txtMoney").setValue('');
                EUI.getCmp("txtRemark").setValue('');
                EUI.getCmp("dateField").setValue('');
                $('#bankRateFollow').text('');
                $('#rateB').css('display', 'none');
            });
            //清空session
            $('.clearSession').click(function () {
                $.session.clear();
            });
        },
    });
});

//新增融资申请下拉列表
EUI.ComboBoxSupplier = EUI.extend(EUI.CustomUI, {
    renderTo: "",
    initComponent: function () {
        EUI.Container({
            renderTo: this.renderTo,
            height: 80,
            width: 1000,
            listHeight: 44,
            style: {
                'padding': '0px',
            },
            items: [{
                xtype: "FieldGroup",
                width: 800,
                itemspace: 10,
                items: [{
                    xtype: "ComboBox",
                    field: ["companyCode"], // 表示哪些值需要提交到后端
                    name: "companyName",
                    id: "companyCode",
                    displayText: "请选择所属核心企业（购货方）",
                    height: 40,
                    width: 340,
                    allowBlank: false,
                    async: true, // 是否异步，true为异步
                    store: {
                        url: _ctxPath + "/avf/financingRelConfigure/findRelBySupplyCode.json",
                    }, // 从后台获取数据的地址
                    editable: false, // 是否可编辑
                    loadMask: true, // 是否有遮罩层
                    showSearch: false, // 是否展开下拉框
                    searchText: "name", // 下拉框的内容
                    canClear: true,
                    afterSelect: function (d) {
                        var companyCode = d.data.companyCode;
                        $('#companyCode').val(companyCode);
                        selectData = [];
                        /*初始化表格数据 数量 价格*/
                        EUI.getCmp("tabFinancial2").setDataInGrid([]);
                        $('#invoiceNum').text('0');
                        $('#allMoney').text('0.00');
                        $('.check_all').removeClass('back_check_2').addClass('back_check_1');
                        EUI.getCmp('maturityDate').setValue(null);//设置下一个列表的值为空
                        EUI.getCmp('tabFinancial1').setPostParams({
                            query: JSON.stringify({
                                'maturityDate': '',
                                'businessDealStatus': '1050',
                                'companyCode': d.data.companyCode
                            })
                        }, true);
                        EUI.getCmp('maturityDate').store.params.companyCode = d.data.companyCode;
                    }
                }, {
                    xtype: "AutoCompleteBox",
                    title: "账款到期日",
                    field: ["maturityDate"],// 需要传递到后端的值
                    id: "maturityDate",
                    name: "maturityDate",
                    width: 210,
                    height: 40,
                    labelWidth: 120,
                    editable: true,
                    // allowBlank: false,
                    async: true,//异步请求
                    loadonce: false,
                    store: {
                        url: _ctxPath + "/avf/accountRPInfo/supplyGetMaturityDateByCompanyCode.json",
                        params: {'companyCode': ''},
                    }, // 从后台获取数据的地址
                    searchField: ["maturityDate"],// 当在输入框里面输入值时会自动搜索匹配相应的值
                    showField: 'maturityDate',// 显示拉下列表的内容
                    loaded: true,
                    displayText: "请选择账款到期日",
                    //hintText : "无默认选项",
                    // tbar:"底部选项卡",//底部工具栏
                    // value : "选项1",
                    // submitValue:{
                    // id:"xx1"
                    // },
                    afterLoad: function (data) { // 远程加载数据完成时才会触发
                    },
                    beforeSelect: function (data) {
                    },
                    afterSelect: function (d) {
                        selectData = [];
                        /*初始化表格数据 数量 价格*/
                        EUI.getCmp("tabFinancial2").setDataInGrid([]);
                        $('#invoiceNum').text('0');
                        $('#allMoney').text('0.00');
                        $('.check_all').removeClass('back_check_2').addClass('back_check_1');
                        EUI.getCmp('tabFinancial1').setPostParams({
                            query: JSON.stringify({
                                'maturityDate': d.data.maturityDate,
                                'businessDealStatus': '1050',
                                'companyCode': EUI.getCmp('companyCode').getSubmitValue().companyCode
                            })
                        }, true);
                    }
                },
                ],
            }],
        });
        //处理session填充核心企业、账款到期日
        if ($.session.get('key') != undefined) {
            var sessionDataObj = JSON.parse($.session.get('key'));
            EUI.getCmp('maturityDate').setValue(sessionDataObj.maturityDate);
            EUI.getCmp('companyCode').setValue(sessionDataObj.company.companyName);
        }
        clearFloat();
    },
});
//供应商选择应收账款的表格
EUI.AddFinance1 = EUI.extend(EUI.CustomUI, {
    renderTo: null,
    renderTo1: null,
    renderTo2: null,
    comboBoxSupplier: null,
    data: null,
    height: 'auto',
    initComponent: function () {
        var _this = this;
        _this.comboBoxSupplier = new EUI.ComboBoxSupplier({
            renderTo: this.renderTo1,
        });
        _this.initGridAll();
        _this.initGridSome();
        _this.addEvents();
        _this.choiceAll(0);
        _this.choiceCheckbox(0);
        _this.choiceCheckbox(1);
    },
    initGridAll: function () {
        var _this = this;
        //是否取session的核心企业编码
        var companyCode = '';
        if ($.session.get('key') != undefined) {
            var companyCode = JSON.parse($.session.get('key')).company.companyCode;
        }
        EUI.GridPanel({
            renderTo: _this.renderTo,
            padding: 0, //设置表格的内边距
            exportXls: false,
            searchConfig: null,
            showRefresh: false,
            id: 'tabFinancial1',
            //autoLoad: true, //自动加载
            height: 'auto',
            gridCfg: {
                loadonce: false, //true数据一次性加载,每页返回加载每页的数据
                url: _ctxPath + "/avf/accountRPInfo/accountRPInfoList.json",//获取后端数据
                postData: {
                    query: JSON.stringify({
                        'businessDealStatus': '1050',
                        'companyCode': companyCode,
                        'maturityDate': EUI.getCmp('maturityDate').getValue()
                    }),
                },
                rowNum: 10,//一页显示几条数据
                // multiselect:true,//复选框
                // rownumbers: false, //去掉表格序号
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
                // onSelectAll: function (data) {
                //     console.log('aa');
                //     EUI.getCmp('tabFinancial1').getSelectRow();
                // },
                // onSelectRow: function (data) {
                //     console.log('bb');
                // },
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
                // rownumbers: false, //去掉表格序号
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
                return '<div class="check check_every back_check_1" fc-data=' + rowdata.id + ' data=' + rowdata.recPayMoney + '></div>';
            }
        }, {
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

        }, {
            label: "应收账款金额",
            name: "recPayMoney",
            index: "recPayMoney",
            formatter: function (value, id, rowdata) {
                if (flag == 0) {
                    return '￥' + $.formatMoney(rowdata.recPayMoney, 2);
                } else {
                    return rowdata.recPayMoney;
                }
            }
        }, {
            label: "账款到期日",
            name: "maturityDate",
            index: "maturityDate",
            //width: 120,
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
        //处理session的数据，填充已选表格数据开始
        if ($.session.get('key') != undefined) {
            var sessionDataObj = JSON.parse($.session.get('key'));
            var tabData = [], totalMoney = 0;
            EUI.getCmp('tabFinancial1').setPostParams({
                query: JSON.stringify({
                    'maturityDate': sessionDataObj.maturityDate,
                    'businessDealStatus': '1050',
                    'companyCode': sessionDataObj.company.companyCode
                })
            }, true);
            $('#getCompanyCode').val(sessionDataObj.company.companyCode);
            for (var i in sessionDataObj.selectData) {
                tabData.push(sessionDataObj.selectData[i].data);
                totalMoney += $.unformatMoney(sessionDataObj.selectData[i].data.recPayMoney.substr(1));
            }
            $('#invoiceNum').text(sessionDataObj.selectData.length);
            $('#allMoney').text($.formatMoney(totalMoney));
            EUI.getCmp('tabFinancial2').setDataInGrid(tabData);
            $('#ul_tab_1 .check').removeClass('back_check_1').addClass('back_check_2');
        }
        //处理session的数据，填充已选表格数据结束
        $('#g_tabFinancial1_rn').append('序号');
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
            if (!EUI.getCmp("companyCode").getValue()) {
                errorInfo('请选择核心企业！');
                return;
            }
            // if (!EUI.getCmp("maturityDate").getValue()) {
            //     errorInfo('请选择账款到期日！');
            //     return;
            // }
            if (parseInt($('#invoiceNum').text()) == 0) {
                errorInfo('请选择发票');
                return;
            }
            //把提交的数据存到session里开始
            var sessionData = {
                'company': EUI.getCmp('companyCode').getSubmitValue(),
                'maturityDate': EUI.getCmp('maturityDate').getValue(),
                'selectData': selectData
            }
            if (sessionData.company.companyCode == '') {
                sessionData.company.companyCode = $('#getCompanyCode').val();
            }
            $.session.set('key', JSON.stringify(sessionData));
            //把提交的数据存到session里结束
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
            var companyCode = String(EUI.getCmp("companyCode").getSubmitValue().companyCode);
            if (companyCode == '') {
                companyCode = $('#getCompanyCode').val();
            }
            window.location.href = _ctxPath + '/avf/financingDemand/toAddFinanceNext?ids=' + ids + '&invoiceTotalMoney=' + invoiceTotalMoney + '&invoiceTotalNumber=' + invoiceTotalNumber + '&companyCode=' + companyCode;
        });
    },
});
/*单选*/
function checkboxList(flag) {
    $('#ul_tab_' + flag + ' .check').live("click", function () {
        var page = $('.ui-pg-input').val();//当前页数
        var invoiceNum = parseInt($('#invoiceNum').text());//应收账款的数量
        var allMoney = parseFloat($('#allMoney').text()).toFixed(2);//应收账款总金额
        var _this = $(this);
        var delFlag = 0;
        if ($(this).hasClass('check_all')) {
        } else {
            //不是全选时
            var dataAll = [];
            var count = $('#ul_tab_' + flag + ' .check_every').length;//复选框的数量
            var count2 = 0;
            //当勾选时
            if (_this.hasClass('back_check_1')) {
                //获取所有账款表格的行数据
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
                if (getRowData.maturityDate < nowDate) {
                    errorInfo('请选择账款到期日不能小于当前日期的发票');
                    return;
                }
                //选择之后改变样式
                _this.removeClass('back_check_1').addClass('back_check_2');
                //push数据
                selectData.push({page: page, data: getRowData, count: count});
                console.log(selectData);
            } else {
                //取消勾选时
                delFlag = 1;
                //pull出数据
                for (var i = (selectData.length - 1); i >= 0; i--) {
                    if (_this.attr('fc-data') == selectData[i].data.id) {
                        selectData.splice(i, 1);
                    }
                }
                console.log(selectData);
                //改变复选框的样式
                _this.removeClass('back_check_2').addClass('back_check_1');
            }
            count2 = $('#ul_tab_' + flag + ' .check_every.back_check_2').length;//勾选的数量
            if (flag == 0) {
                //判断勾选的个数是否和所有复选框个数是否相同
                if (count == count2) {
                    $('#ul_tab_' + flag + ' .check_all').removeClass('back_check_1').addClass('back_check_2');
                } else {
                    $('#ul_tab_' + flag + ' .check_all').removeClass('back_check_2').addClass('back_check_1');
                }
            }
        }
        var totalMoney = 0, getSelectData = [];
        for (var i = 0; i < selectData.length; i++) {
            totalMoney += $.unformatMoney(selectData[i].data.recPayMoney.substr(1));
            getSelectData.push(selectData[i].data);
        }
        EUI.getCmp("tabFinancial2").setDataInGrid(getSelectData);
        $('#ul_tab_1 .check').removeClass(' back_check_1').addClass(' back_check_2');
        if (flag == 0) {
            $('#ul_tab_1 .check').removeClass(' back_check_1').addClass(' back_check_2');
        }
        $('#invoiceNum').text(selectData.length);
        $('#allMoney').text($.formatMoney(totalMoney, 2));
        //如果是已选的取消勾选，则删除一行
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
            //当勾选时
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
                        } else {

                        }
                    }
                });
                console.log(selectData);
                if (flag == 0) {
                    $('#ul_tab_1 .check').removeClass(' back_check_1').addClass(' back_check_2');
                }
                //改变当前复选框的样式以及每个复选框的样式
                _this.removeClass(' back_check_1').addClass(' back_check_2');
                $('#ul_tab_' + flag + ' .check_every').removeClass('back_check_1').addClass('back_check_2');
            } else {
                //取消勾选时
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
                totalMoney += $.unformatMoney(selectData[i].data.recPayMoney.substr(1));
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