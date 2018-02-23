/**
 * Created by Administrator on 2017/8/1.
 * des:核心企业维护延长账款js
 * jspPath:WEB-INF/views/avf/enterprise/extend_account.jsp
 */
//维护延长账款表单
EUI.ExtendAccount = EUI.extend(EUI.CustomUI, {
    renderTo: null,
    data: null,
    initComponent: function () {
        this.initGrid();
        this.addEvents();
        this.subMainForm();
    },
    initGrid: function () {
        EUI.Container({
            renderTo: this.renderTo,
            layout: "border", //布局方式
            border: false, //是否显示边框，false为不显示
            isOverFlow: false, //内容溢出时是否显示下拉滚动条，false为不显示
            height: 170,
            items: [{
                xtype: "FormPanel",
                region: "center",
                id: "scanForm",
                height: 120,
                padding: 0,
                layout: 'form',
                items: [{
                    xtype: "FieldGroup",
                    title: "计划融资金额",
                    height: 40,
                    labelWidth: 120,
                    items: ["<div class='date'><span id='money'>" + $.formatMoney($('#intentionMoney').val(),2) + "</span><span class='font16'>元</span></div>"]
                }, {
                        xtype: "FieldGroup",
                        title: "计划融资到期日",
                        //width: 332,
                        height: 40,
                        labelWidth: 120,
                        style: {
                            "margin-top": "20px",
                        },
                        items: ["<div class='date'><span id='intentionTime'>"+GetDateT(new Date($('#financeEnd').val()))+"</span>" +
                        // "<span class='font16'>(约<font class='font20'>"+$('#month').text()+"</font>个月)</span>" +
                        "</div>"]
                    },
                    {
                        xtype: "NumberField",
                        title: "意向融资金额",
                        width: 168,
                        height: 40,
                        precision: 2, //设置精度
                        maxValue: $('#intentionMoney').val(), // 允许输入的最大值
                        minValue: 1, // 允许输入的最小值
                        allowNegative : false,// 设置是否可以输入负数，false为不能输入负数
                        allowChar : "0123456789",// 允许输入的数字
                        fullPrecision : true,// 若填写的数据没有达到需要精确的位数，则用0自动补齐
                        allowBlank: false, //是否可以为空
                        value:$('#intentionMoney').val(),
                        name: "intentionFmoney",
                        id: "intentionFmoney",
                        displayText:'意向融资金额',
                        unit: "元", // 单位
                        labelWidth: 120,
                    }, {
                        xtype: "DateField",
                        title: "意向融资到期日",
                        labelWidth: 120, //设置label的宽度
                        minDate: new Date($('#financeEnd').val()).format('yyyyMMdd'), // 设置能够选择的最小日期，日期格式为"20170301"
                        width: 195,
                        height: 40,
                        listWidth: 150,
                        allowBlank: false, //是否可以为空
                        name: "intentionFterm", // 设置日期选择框的name,用于后台接受此name
                        id: "intentionFterm",
                        displayText:'意向融资到期日',
                        value: new Date($('#financeEnd').val()).format('yyyy-MM-dd'),
                    }],
            }],
        });
        clearFloat();
    },
    //提交表单
    subMainForm: function () {
        //申请融资
        $("#applyAccount").live("click", function () {
            if( $('.radio b.radio_1').attr('data') == 0){
                var data = {isPast:true,intentionFmoney:$.unformatMoney($('#money').text()),intentionFterm:$('#intentionTime').text(),id:$('#demandHeadId').val()}
            }else{
                if (!EUI.getCmp("scanForm").isValid()) {
                    errorInfo('融资金额或期限不能为空！');
                    return;
                }
                var data = EUI.getCmp("scanForm").getFormValue();
                data.isPast = false;//同意或修改的标志
                data.id = $('#demandHeadId').val();//同意或修改的标志
            }
            //表单验证通过
                EUI.Store({
                    url: _ctxPath + "/avf/financingDemand/maintainExtendMoney.json",
                    params: data,
                    success: function (status) {
                        showToPageInfo(status.msg,_ctxPath +"/avf/financingDemand/toDemandPage?type=enterprise");
                    },
                    failure: function (response) {
                        errorInfo(response.msg);
                    }
                });
        });
        //取消申请融资
        $("#accountCancel").live("click", function () {
            window.location.href= _ctxPath +"/avf/financingDemand/toDemandPage?type=enterprise";
        });
    },
    addEvents: function () {
        //点击单选框
        $('.radio b').click(function () {
            var _this = $(this);
            $('.radio b.radio_1').addClass('radio_2').removeClass('radio_1');
            _this.addClass('radio_1').removeClass('radio_2');
            if ($('.radio b.radio_1').attr('data') == 1) {
                $('#showInfoForm').css('display', '');
            } else {
                $('#showInfoForm').css('display', 'none');
                return false;
            }
        });
    }
});