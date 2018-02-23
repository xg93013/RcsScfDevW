/**
 * Created by Administrator on 2017/8/16.
 * des:供应商编辑融资申请js
 * jspPath:WEB-INF/views/avf/supplier/edit_finance.jsp
 */
var selectData = [];
$(function () {
    //融资银行
    EUI.ComboBoxBank = EUI.extend(EUI.CustomUI, {
        renderTo: "",
        initComponent: function () {
            var g = this;
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
                    value:$('#getFinInsName').val(),
                    async: true, // 是否异步，true为异步
                    store: {
                        url: _ctxPath+"/avf/financingRelConfigure/findRelByCompanyCodeAndSupplyCode.json?companyCode="+$('#getCompanyCode').val(),
                    }, // 从后台获取数据的地址
                    editable: false, // 是否可编辑
                    loadMask: true, // 是否有遮罩层
                    showSearch: false, // 是否展开下拉框
                    searchText: "name", // 下拉框的内容
                    canClear: true,
                    afterSelect: function (d) {
                        //选择融资银行查询基本信息
                        $('#bankRateFollow').text(parseFloat(d.data.bankRate).toFixed(2));
                        $('#rateB').css('display','');
                    }
                }],
            });
        }
    });
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
                    displayText: '意向融资金额',
                    //displayText: "请输入数字,只能输入正数",
                    //hintText: "默认值为1.298，只能输入正数（四舍五入）",
                    allowBlank: false,
                    value: $('#getIntentionFmoney').val(),
                    maxValue: $('#getIntentionFmoney').val(), // 允许输入的最大值
                    minValue: 1.00, // 允许输入的最小值
                    precision: 2, // 输入的数据精确到多少位，默认值0表示精确到个位
                    allowNegative: false, // 设置是否可以输入负数，false为不能输入负数
                    allowChar: "0123456789", // 允许输入的数字
                    fullPrecision: true,
                    validateText: "允许输入的最大值"+$('#getIntentionFmoney').val(),
                    validater: function(value) {
                        if(value <= $('#getIntentionFmoney').val()) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }]
            });
            g.addEvent();
            clearFloat();
        },
        addEvent: function () {
            //失去焦点  得到融资比例
            $('#txtMoney').live('blur',function () {
                var valMoney = EUI.getCmp('txtMoney').getValue();
                if( valMoney == '' || valMoney > $('#getIntentionFmoney').val() ||  valMoney < 1){
                    $('#txtMoney input').addClass('ux-field-invalid');
                    $('#financeRate').text('');
                    return;
                }
                var rate = valMoney/$.unformatMoney($('#totalMoney').text());
                var formatRate = Math.round(rate*100);
                $('#financeRate').text(formatRate);
            });
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
                    xtype : "DateField",
                    title: "意向融资期限",
                    displayText: '意向融资期限',
                    labelWidth: 141,
                    width: 297,
                    height: 40,
                    name : "dateField", // 设置日期选择框的name,用于后台接受此name
                    id : "dateField",
                    style: {
                        'text-align': 'right',
                        'float': 'none'
                    },
                    allowBlank: false, //是否可以为空
                    value:new Date($('#getIntentionFterm').val()).format("yyyy-MM-dd"),
                    minDate : String(new Date().format("yyyyMMdd")), // 设置能够选择的最小日期，日期格式为"20170301"
                    msg : "选择的日期范围未在设置之内", // 对不符合的日期设置提示消息
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
                    displayText: '意向融资备注',
                    labelWidth: 141,
                    width: 650,
                    style: {
                        'text-align': 'right',
                        'float': 'none'
                    },
                    height: 40,
                    name: "name",
                    id: "txtRemark",
                    value:$('#getIntentionFremark').val(),
                }]
            });
            clearFloat();
        }
    });
});
//编辑融资申请下拉列表
EUI.ComboBoxSupplier = EUI.extend(EUI.CustomUI, {
    renderTo: "",
    initComponent: function () {
        var g = this;
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
                    xtype: "FieldGroup",
                    title: "核心企业",
                    height: 40,
                    labelWidth: 70,
                    items: ["<div class='lh36'>"+$('#getCompanyName').val()+"</div>"]
                },{
                    xtype : "AutoCompleteBox",
                    title : "账款到期日",
                    field : ["maturityDate"],// 需要传递到后端的值
                    id : "maturityDate",
                    name : "maturityDate",
                    width: 210,
                    height: 40,
                    labelWidth: 120,
                    editable : true,
                    // allowBlank: false,
                    async:true,//异步请求
                    loadonce:false,
                    store: {
                        url: _ctxPath+"/avf/accountRPInfo/supplyGetMaturityDateByCompanyCode.json",
                        params: {'companyCode':$('#getCompanyCode').val()},
                    }, // 从后台获取数据的地址
                    searchField : ["maturityDate"],// 当在输入框里面输入值时会自动搜索匹配相应的值
                    showField : 'maturityDate',// 显示拉下列表的内容
                    loaded : true,
                    displayText : "请选择账款到期日",
                    // hintText : "无默认选项",
                    afterSelect: function (d) {
                        selectData = [];
                        /*初始化表格数据 数量 价格*/
                        EUI.getCmp("tabFinancial2").setDataInGrid([]);
                        getRecMoney();//向表格增加数据
                        $('#invoiceNum').text('0');
                        $('#allMoney').text('0.00');
                        $('.check_all').removeClass('back_check_2').addClass('back_check_1');
                    }
                }],
            }],
        });
        //clearFloat();
    }
});
//编辑融资申请-应收账款表格
EUI.AddFinance1 = EUI.extend(EUI.CustomUI, {
    renderTo: null,
    renderTo1: null,
    renderTo2: null,
    renderToBank: null,
    renderToMoney: null,
    renderToTerm: null,
    renderToRate: null,
    comboBoxSupplier: null,
    data: null,
    height: 'auto',
    initComponent: function () {
        var _this = this;
        _this.comboBoxSupplier = new EUI.ComboBoxSupplier({
            renderTo: this.renderTo1,
        });
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
            gridCfg:{
                loadonce: true, //true数据一次性加载,每页返回加载每页的数据
                //url:_ctxPath+"/avf/accountRPInfo/accountRPInfoList.json",//获取后端数据
                rowNum:10,//一页显示几条数据
                //multiselect:true,//复选框
                //rownumbers: false, //去掉表格序号
                //hasPager:false,
                colModel: _this.colModel(0),
                //每页数据加载完执行
                gridComplete:function (data) {
                    // console.log($('#ul_tab_0 .check_every'));
                    // console.log($('.ui-pg-input').val());
                    if($('#ul_tab_0 .check_all').hasClass('back_check_2')){
                        $('#ul_tab_0 .check_all').removeClass('back_check_2').addClass('back_check_1');
                    }
                    //点击每页，判断每页之前已选的发票，并且勾选
                    var count = 0; var num = 0;
                    $('#ul_tab_0 .check').removeClass('back_check_2').addClass('back_check_1');
                    if(selectData.length > 0 ){
                        for(var i = 0; i < selectData.length;i++){
                            if(selectData[i].page == $('.ui-pg-input').val()){
                                count++;
                                num = selectData[i].count;
                            }
                            EUI.getCmp("tabFinancial1").setSelectRowById(selectData[i].data.id);
                            $('#ul_tab_0 .check_every[fc-data='+selectData[i].data.id+']').removeClass('back_check_1').addClass('back_check_2');
                        }
                    }
                    if(count == num && count > 0){
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
            gridCfg:{
                loadonce: true, //true数据一次性加载,每页返回加载每页的数据
                hasPager:false,
                colModel: _this.colModel(1),
            }
        });
    },
    colModel: function (flag,data) {
        return  [{
            label: '<div class="check check_all back_check_1"></div>',
            name: "checkbox", //列显示的名称
            index: "checkbox", //传到服务器端用来排序的列名称
            width: 30,
            formatter: function (value, id, rowdata) {
                return '<div class="check check_every back_check_1" fc-data='+rowdata.id+' data=' + rowdata.recPayMoney + '></div>';
            }
        },{
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
            label: "应收账款金额",
            name: "recPayMoney",
            index: "recPayMoney",
            formatter: function(value, id, rowdata) {
                // if(flag == 0){
                    return '￥'+$.formatMoney(rowdata.recPayMoney,2);
                // }else{
                //     return rowdata.recPayMoney;
                // }
            }
        }, {
            label: "账款到期日",
            name: "maturityDate",
            index: "maturityDate",
            //width: 120,
            formatter: function(value, id, rowdata) {
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
    choiceAll:function (flag) {
        EUI.getCmp('tabFinancial1').getGridData();
        checkboxAll(flag);
    },
    addEvents: function () {
        getRecMoney();//向表格增加数据
        var _this = this;
        $('#g_tabFinancial1_rn').append('序号');
        $('#ul_tab_1').css('display','none');
        $('.ul_list li').click(function(){
            //_this.choiceCheckbox(1);
            _this.choiceAll(1);
            $('.ul_list li').removeClass('li_1');
            $(this).addClass('li_1');
            console.log($(this).index());
            var index = $(this).index();
            for(var i = 0;i < $('.ul_list li').length;i++){
                $('#ul_tab_'+i).css('display','none');
            }
            $('#ul_tab_'+index).css('display','');
            //判断之前所有发票的表格当前页是否有已勾选的发票，有则选中
            var count = 0; var num = 0;
            $('#ul_tab_0 .check').removeClass('back_check_2').addClass('back_check_1');
            if(selectData.length > 0){
                for(var i = 0; i < selectData.length;i++){
                    if(selectData[i].page == $('.ui-pg-input').val()){
                        count++;
                        num = selectData[i].count;
                    }
                    EUI.getCmp("tabFinancial1").setSelectRowById(selectData[i].data.id);
                    $('#ul_tab_0 .check_every[fc-data='+selectData[i].data.id+']').removeClass('back_check_1').addClass('back_check_2');
                }
            }
            if(count == num && count > 0){
                $('#ul_tab_0 .check_all').removeClass('back_check_1').addClass('back_check_2');
            }
        });
        //获取已存在应收账款
        EUI.Store({
            url: _ctxPath+"/avf/accountRPInfo/accountRPInfoList.json",
            params: {
                query:JSON.stringify({
                    "financingNeedsNo":$('#getFinancingNeedsNo').val(),
                    "companyCode":$('#getCompanyCode').val(),
                    "businessDealStatus":"1060",
                }),
                rows:10000
            },
            type:'GET',
            success: function(response) {
                EUI.getCmp("tabFinancial2").setDataInGrid(response.rows);
                totalMoney(response);
                for(var i in response.rows){
                    var id = response.rows[i].id;
                    $('#ul_tab_0 .check_every[fc-data='+id+']').removeClass('back_check_1').addClass('back_check_2');
                }
                if($('#ul_tab_0 .check_every').length == $('#ul_tab_0 .back_check_2').length){
                    $('#ul_tab_0 .check_all').removeClass('back_check_1').addClass('back_check_2');
                }
            },
            failure:function (response) {
                errorInfo(response.msg);
            }
        });
        //提交
        $('#confirm_next').click(function () {
            //验证文本框
            var eletor = ['finIns','txtMoney','dateField'];
            var count = 0;
            var rpIds = '',checkEveryCount = 0;
            var objParams = {};
            for(var i in eletor){
                if(eletor[i] == 'txtMoney'){
                    var valMoney = EUI.getCmp(eletor[i]).getValue();
                    if( valMoney == '' || valMoney > $('#invoiceTotalMoney').val() ||  valMoney < 1){
                        count++;
                        $('#'+eletor[i]+' input').addClass('ux-field-invalid');
                    }
                }else{
                    if( EUI.getCmp(eletor[i]).getValue() == ''){
                        count ++;
                        $('#'+eletor[i]+' input').addClass('ux-field-invalid');
                    }
                }
            }
            if(count >= 1){
                if( EUI.getCmp('finIns').getValue() == ''){
                    errorInfo('请选择融资银行');
                }
                return;
            }
            $('#ul_tab_1 .check_every.back_check_2').each(function () {
                checkEveryCount++;
                if(checkEveryCount == $('#ul_tab_1 .check_every.back_check_2').length){
                    rpIds += $(this).attr('fc-data');
                }else{
                    rpIds += $(this).attr('fc-data')+',';
                }
            });
            objParams.demandHead = {
                    bankRate: $('#bankRateFollow').text(),
                    id: $('#getId').val(),
                    intentionFmoney: EUI.getCmp("txtMoney").getValue(),
                    intentionFremark: EUI.getCmp("txtRemark").getValue(),
                    intentionFterm: EUI.getCmp("dateField").getValue(),
                    totalMoney: $.unformatMoney($('#allMoney').text()),
                    financingNeedsNo:$('#getFinancingNeedsNo').val(),
                    companyCode:$('#getCompanyCode').val(),
                    companyName:$('#getCompanyName').val(),
                    supplyCode:$('#getSupplyCode').val(),
                    supplyName:$('#getSupplyName').val(),
                    businessDealInfo:$('#getBusinessDealInfo').val(),
                    businessDealStatus:$('#getBusinessDealStatus').val()
            };
            objParams.rpIds = rpIds;
            objParams.demandHead = $.extend(objParams.demandHead,EUI.getCmp("finIns").getSubmitValue());
            objParams.demandHead = JSON.stringify($.extend({finInsCode:$('#getFinInsCode').val()},objParams.demandHead));
            EUI.Store({
                url: _ctxPath+"/avf/financingDemand/updateDemand.json",
                params:objParams,
                type:'POST',
                success: function(response) {
                    showToPageInfo(response.msg,_ctxPath+'/avf/financingDemand/toDemandPage?type=supplier');
                },
                failure:function (response) {
                    errorInfo(response.msg);
                }
            });
        });
        //清空
        $('.btn_cancel').click(function () {
            EUI.getCmp("finIns").setValue('');
            EUI.getCmp("txtMoney").setValue('');
            EUI.getCmp("txtRemark").setValue('');
            EUI.getCmp("dateField").setValue('');
            $('#bankRateFollow').text('');
            $('#rateB').css('display','none');
        });
    },
});
/*单选*/
function checkboxList(flag) {
    $('#ul_tab_'+flag+ ' .check').live("click", function() {
        var page = $('.ui-pg-input').val();//当前页数
        var invoiceNum = parseInt($('#invoiceNum').text());
        var allMoney = parseFloat($('#allMoney').text()).toFixed(2);
        var _this = $(this);
        var delFlag = 0;
        if ($(this).hasClass('check_all')) {
        } else {
            var count = $('#ul_tab_'+flag+ ' .check_every').length;
            var count2 = 0;
            if (_this.hasClass('back_check_1')) {
                var getRowData = EUI.getCmp("tabFinancial1").getRowData(_this.attr('fc-data'));
                //判断账款到期日是否相同
                if(selectData.length != 0){
                    if(selectData[0].data.maturityDate != getRowData.maturityDate){
                        errorInfo('请选择账款到期日相同的发票');
                        return;
                    }
                }
                //判断账款到期不能小于当前日期
                var nowDate = String(new Date().format('yyyy-MM-dd'));
                if(getRowData.maturityDate < nowDate){
                    errorInfo('请选择账款到期日不能小于当前日期的发票');
                    return;
                }
                _this.removeClass('back_check_1').addClass('back_check_2');
                //push数据
                selectData.push({page:page,data:getRowData,count:count});
                console.log(selectData);
            } else {
                delFlag = 1;
                //pull出数据
                for(var i = (selectData.length - 1);i >= 0;i--){
                    if(_this.attr('fc-data') == selectData[i].data.id){
                        selectData.splice(i,1);
                    }
                }
                console.log(selectData);
                _this.removeClass('back_check_2').addClass('back_check_1');
            }
            count2 = $('#ul_tab_'+flag+ ' .check_every.back_check_2').length;
            if(flag == 0) {
                if (count == count2) {
                    $('#ul_tab_' + flag + ' .check_all').removeClass('back_check_1').addClass('back_check_2');
                } else {
                    $('#ul_tab_' + flag + ' .check_all').removeClass('back_check_2').addClass('back_check_1');
                }
            }
        }
        var totalMoney = 0,getSelectData = [];
        for(var i = 0;i < selectData.length;i++){
            if(typeof(selectData[i].data.recPayMoney) == 'string'){
                selectData[i].data.recPayMoney = $.unformatMoney(selectData[i].data.recPayMoney.substr(1));
            }
            getSelectData.push(selectData[i].data);
        }
        EUI.getCmp("tabFinancial2").setDataInGrid(getSelectData);
        for(var key in getSelectData){
            totalMoney += parseFloat(getSelectData[key].recPayMoney);
        }
        $('#invoiceNum').text(getSelectData.length);
        $('#allMoney,#totalMoney').text($.formatMoney(totalMoney,2));
        //设置意向融资金额提示语的最大值
        EUI.getCmp('txtMoney').maxValue = String(totalMoney);//设置意向融资金额的最大值
        EUI.getCmp('txtMoney').validateText = "允许输入的最大值"+String(totalMoney);//设置意向融资金额的提示语信息
        $('#getIntentionFmoney').val(totalMoney);
        EUI.getCmp('txtMoney').setValue(totalMoney);
        $('#financeRate').text('100');
        $('#ul_tab_1 .check').removeClass(' back_check_1').addClass(' back_check_2');
    });
}
/*全选*/
function checkboxAll(flag) {
    $('#ul_tab_'+flag+ ' .check_all').click(function () {
        var page = $('.ui-pg-input').val();//显示页数
        var count = $('#ul_tab_'+flag+' .check_every').length;//显示每页的条数
        var invoiceNum = parseInt($('#invoiceNum').text());
        var allMoney = parseFloat($('#allMoney').text()).toFixed(2);
        var _this = $(this);
        if ($(this).hasClass('check_all')) {
            //全选选中
            if (_this.hasClass('back_check_1')) {

                //push全选数据
                var updateData = [];
                if(selectData.length > 0 ){
                    for(var j = 0; j< selectData.length;j++){
                        updateData.push(selectData[j].data.id);
                    }
                }
                //判断全选是否有相同的账款到期日的发票
                var ifData = [],errorCount = 0,compareDateCount = 0;
                var nowDate = String(new Date().format('yyyy-MM-dd'));
                $('#ul_tab_'+flag+' .check_every').each(function () {
                    var g = $(this);
                    var getRowData = EUI.getCmp("tabFinancial1").getRowData(g.attr('fc-data'));
                    ifData.push(getRowData.maturityDate);
                    if(selectData.length != 0 && selectData[0].data.maturityDate != getRowData.maturityDate){
                        errorCount++;
                    }
                    if(getRowData.maturityDate <= nowDate){
                        compareDateCount++;
                    }
                });
                if(errorCount > 0){
                    errorInfo('请选择账款到期日相同的发票');
                    return;
                }
                if(selectData.length == 0){
                    ifData.sort();
                    for(var i = 0; i < ifData.length - 1; i++){
                        if(ifData[i] != ifData[i+1]){
                            errorInfo('请选择账款到期日相同的发票');
                            return;
                        }
                    }
                }
                //判断账款到期不能小于当前日期
                if(compareDateCount > 0){
                    errorInfo('请选择账款到期日不能小于当前日期的发票');
                    return;
                }

                $('#ul_tab_'+flag+' .check_every').each(function () {
                    var g = $(this);
                    var getRowData = EUI.getCmp("tabFinancial1").getRowData(g.attr('fc-data'));

                    // if(selectData.length != 0 && selectData[0].maturityDate != getRowData.maturityDate){
                    //     errorInfo('请选择账款到期日相同的发票');
                    //     return;
                    // }
                    if(updateData.length == 0){
                        selectData.push({page:page,data:getRowData,count:count});
                    }else{
                        if($.inArray(g.attr('fc-data'), updateData) < 0){
                            selectData.push({page:page,data:getRowData,count:count});
                        }else{

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
                if(flag == 0){
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
                $('#ul_tab_'+flag+ ' .check_every').removeClass('back_check_1').addClass('back_check_2');
            } else {
                //pull全选的数据
                $('#ul_tab_'+flag+' .check_every').each(function () {
                    var g = $(this);
                    for(var i = (selectData.length - 1);i >= 0 ;i--){
                        if(selectData[i].data.id == g.attr('fc-data')){
                            selectData.splice(i,1);
                        }
                    }
                });
                console.log(selectData);
                if(flag == 0){
                    var dataAll = EUI.getCmp('tabFinancial1').getGridData();
                    for(var i in dataAll){
                        EUI.getCmp('tabFinancial2').deleteRow(dataAll[i].id);
                    }
                }
                _this.removeClass('back_check_2').addClass('back_check_1');
                $('#ul_tab_'+flag+ ' .check_every').removeClass('back_check_2').addClass('back_check_1');
            }
            var totalMoney = 0,getSelectData = [];
            for(var i = 0;i < selectData.length;i++){
                getSelectData .push(selectData[i].data);
            }
            for(var key in getSelectData){
                if(typeof (getSelectData[key].recPayMoney) == 'string'){
                    totalMoney += $.unformatMoney(getSelectData[key].recPayMoney.substr(1));
                    getSelectData[key].recPayMoney = $.unformatMoney(getSelectData[key].recPayMoney.substr(1));
                }else{
                    totalMoney += parseFloat(getSelectData[key].recPayMoney);
                }
            }
            EUI.getCmp("tabFinancial2").setDataInGrid(getSelectData);
            if(flag == 0){
                $('#ul_tab_1 .check').removeClass(' back_check_1').addClass(' back_check_2');
            }
            $('#invoiceNum').text(getSelectData.length);
            $('#allMoney,#totalMoney').text($.formatMoney(totalMoney,2));
            //设置意向融资金额提示语的最大值
            $('#getIntentionFmoney').val(totalMoney);
            EUI.getCmp('txtMoney').maxValue = String(totalMoney);//设置意向融资金额的最大值
            EUI.getCmp('txtMoney').validateText = "允许输入的最大值"+String(totalMoney);//设置意向融资金额的提示信息
            $('#financeRate').text('100');
            EUI.getCmp('txtMoney').setValue(totalMoney);
        }
    });
}
//获取已存在的应收账款
function  getRecMoney() {
    EUI.Store({
        url: _ctxPath+"/avf/accountRPInfo/accountRPInfoList.json",
        params: {
            query:JSON.stringify({
                // "businessDealStatus":"1050",
                "companyCode":$('#getCompanyCode').val(),
                "maturityDate":EUI.getCmp('maturityDate').getValue(),
                "financingNeedsNo":$('#getFinancingNeedsNo').val(),
                "availableRP":true
            }),
            rows:10000
        },
        success: function (d) {
            //获取已存在应收账款
            EUI.getCmp('tabFinancial1').setDataInGrid(d.rows);
            if(d.rows == null){
                return;
            }
            EUI.Store({
                url: _ctxPath+"/avf/accountRPInfo/accountRPInfoList.json",
                params: {
                    query:JSON.stringify({
                        "financingNeedsNo":$('#getFinancingNeedsNo').val(),
                        "companyCode":$('#getCompanyCode').val(),
                        "businessDealStatus":"1060",
                    }),
                    rows:10000
                },
                type:'GET',
                success: function(response) {
                    //把已选的应收账款存到selectData
                   var rowsArrayId = [];
                   var totalNum = d.rows.length;
                   var totalPage = parseInt(totalNum/10);
                   var lastNum = totalNum%10;
                   for(var i in response.rows){
                       rowsArrayId.push(response.rows[i].id);
                   }
                    for(var j in d.rows){
                        if($.inArray(d.rows[j].id,rowsArrayId) >= 0){
                            d.rows[j].maturityDate = GetDateT(new Date(d.rows[j].maturityDate));
                            if(parseInt((parseInt(j)+1)/10) == parseInt(totalPage)){
                                selectData.push({page:parseInt((parseInt(j)+1)/10+1),data:d.rows[j],count:lastNum});
                            }else{
                                selectData.push({page:parseInt((parseInt(j)+1)/10+1),data:d.rows[j],count:10});
                            }
                        }
                    }
                    console.log(selectData);
                },
                failure:function (response) {
                    errorInfo(response.msg);
                }
            });
        },
        failure: function (response) {
            errorInfo(response.msg);
        }
    });
}
//计算已存在账款的总金额
function totalMoney(data) {
    var allMoney = 0,invoiceNum = 0;
    //计算已存在发票数量以及价格
    for(var key in data.rows){
        allMoney += data.rows[key].recPayMoney;
    }
    $('#invoiceNum').text(data.rows.length);
    $('#allMoney').text($.formatMoney(allMoney,2));
    $('#tabFinancial2 .back_check_1').addClass('back_check_2').removeClass('back_check_1');
    $('.ul_list li').removeClass('li_1');
    $('.ul_list li').eq(1).addClass('li_1');
    $('#ul_tab_0').css('display','none');
    $('#ul_tab_1').css('display','block');
}
$(function () {
    var verdor =  JSON.parse($('#verdor').text());
    $('#linkMan').text(verdor.linkMan);
    $('#linkManEmail').text(verdor.linkManEmail);
    $('#linkManMobile').text(verdor.linkManMobile);
    $('#linkManTel').text(verdor.linkManTel);
});

