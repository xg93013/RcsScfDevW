/**
 * Created by xionggang on 2017/8/1.
 * des:金融机构收款补录补录页面
 * jspPath:WEB-INF/views/avf/financial/credit_add.jsp
 */
EUI.creditAddForm = EUI.extend(EUI.CustomUI, {
	renderTo: "",
	loanDate:"",//放款日期
    financeMoney:"",//融资金额
	initComponent: function() {
		var g = this;
		g.getDefaultValue();
		EUI.Container({
			renderTo: this.renderTo,
			width: 850,
			height: "auto",
			items: [{
				xtype: "FormPanel",
				itemspace: 20,
				height: "auto",
				id: "addCreditForm",
				items: [{
						xtype: "NumberField",
						title: "收款金额",
						labelWidth: 100,
						width: 178,
						height: 35,
						name:"receivablesMoney",
						id:"receivablesMoney",
						unit: '元',
						value:g.financeMoney,
                    	// hintText: "金额不能大于融资金额"+$("#financeMoney").val(),
						maxValue: Number.MAX_VALUE, // 允许输入的最大值
						minValue: Number.NEGATIVE_INFINITY, // 允许输入的最小值
						precision: 2, // 输入的数据精确到多少位，默认值0表示精确到个位
						allowNegative: false, // 设置是否可以输入负数，false为不能输入负数
						allowChar: "0123456789", // 允许输入的数字
						fullPrecision: true,// 若填写的数据没有达到需要精确的位数，则用0自动补齐
                    	validateText:"金额不能大于融资金额"+g.financeMoney,
						validater: function(value) {
							// var financeMoney = parseFloat($("#financeMoney").val());
							if(parseFloat(value) > g.financeMoney){
								return false;
							}
						}
					} , {
						xtype: "DateField",
						title: "收款日期",
						format: "Y-m-d", // 采用年月日的格式
						labelWidth: 100, //设置label的宽度
						// maxDate: String(new Date($("#financeEnd").val()).format("yyyyMMdd")), // 设置能够选择的最大日期
						// minDate: null, // 设置能够选择的最小日期，日期格式为"20170301"
						width: 205,
                    	// hintText: "收款日期要求大于放款日期"+g.loanDate,
						height: 40,
						listWidth: 150,
						//allowBlank: false, //是否可以为空
						name: "receivablesDate", // 设置日期选择框的name,用于后台接受此name
						id: "receivablesDate",
						value: g.loanDate,
						// msg: "选择的日期范围未在设置之内", // 如果选择的日期未在设置的minDate或者maxDate之中，就显示设置的提示消息
						// triggerCss: "ux-date-trigger", // 日期选择触发的样式
						// triggerClickCss: "",
						afterValid: function(value) { // 事件：对日期校验后的操作

						},
						afterSelect: function(data) { // 事件：选中日期后做的操作

						}
					}
				]
			}]
		});
		g.addEvent();
		g.setLabelWidth();
	},
	//提交补录信息
	addEvent: function() {
        $('.close_store b').click(function() {
            if($(this).hasClass('b_1')) {
                $(this).removeClass('b_1').addClass('b_2');
            } else {
                $(this).removeClass('b_2').addClass('b_1');
            }
        });
        $('.close_store span').click(function() {
            if($(".close_store b").hasClass('b_1')) {
                $(".close_store b").removeClass('b_1').addClass('b_2');
            } else {
                $(".close_store b").removeClass('b_2').addClass('b_1');
            }
        });
        //确认收款补录
		$("#sub_credit").live("click", function() {
			var g = this;
			var flag = false;
			var addDate = new Date(EUI.getCmp("receivablesDate").getValue()).format("yyyy-MM-dd");
			if(!EUI.getCmp("addCreditForm").isValid() || EUI.getCmp("receivablesMoney").getValue() == "") {
                errorInfo("请输入正确的补录金额！");
				return false;
			}
			if(addDate < g.loanDate){
                errorInfo("收款日期大于放款日:"+g.loanDate);
                return false;
			}
            var addCredit = EUI.getCmp("addCreditForm").getFormValue();
            addCredit.id = $("#addId").val();
            EUI.Store({
                url: _ctxPath+'/avf/financingReceipt/financingReceiptMakeup.json',
                params:addCredit,
                async:false,
                success: function (msg) {
                    showToPageInfo("补录成功!","/avf/financingReceipt/financingReceiptPage");
                },
                failure: function (msg) {
                    errorInfo(msg.msg);
                }
            });
		})
	},
	setLabelWidth: function() {
		var g = this;
		$(".ux-field-label span").css({
			"float": "none",
			"margin-right": "10px"
		});
        $('#addCreditForm .ux-line-row').eq(0).append('<div class="tip">金额不能大于融资金额'+g.financeMoney+'元</div>');
        $('#addCreditForm .ux-line-row').eq(1).append('<div class="tip">收款日期要求大于放款日期'+g.loanDate+'</div>');
	},
	getDefaultValue:function(){
		var g = this;
		if($("#loanDate").val()!=""){
            g.loanDate = new Date($("#loanDate").val()).format("yyyy-MM-dd");
		}else{
            g.loanDate = new Date().format("yyyy-MM-dd");
		}
		g.financeMoney = parseFloat($("#financeMoney").val());

	}
});