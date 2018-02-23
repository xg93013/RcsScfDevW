/**
 * Created by xionggang on 2017/8/1.
 * des:核心企业还款倒计时
 * jspPath:WEB-INF/views/avf/enterprise/repayment_time.jsp
 */
EUI.RepaymentInvoice = EUI.extend(EUI.CustomUI, {
    renderTo: "",
    cfgId: "",
    financingNeedsNoId:"",
    invoiceTotalNumber:"",
    initComponent: function() {
        var g = this;
        g.addEvent();
        g.getBackTime();
        g.getfinInsInfo();
        if(g.invoiceTotalNumber != 0){
            EUI.GridPanel({
                renderTo: this.renderTo,
                padding: 0, //设置表格的内边距
                overflow: "hidden",
                height:"auto",
                id: g.cfgId,
                width:"1160",
                gridCfg: g.initGrid()
            });
        }
        g.initSearchForm();
    },
    addEvent:function(){
        var g = this;
        g.financingNeedsNoId = $("#financingNeedsNoId").val();
    },
    getBackTime:function(){
        var g = this;
        g.invoiceTotalNumber = $(".invoiceTotalNumber").html();
        var maturiDateId = $("#maturiDateId").val();
        var financeStart = $("#financeStart").val();
        var financeEnd = $("#financeEnd").val();
        var today = getNowFormatDate();
        EUI.Store({
            url: _ctxPath + "/avf/requite/repaymentCountDown.json",
            params:{id:maturiDateId},
            type : "get",
            async:true,
            success: function (msg) {
                //保存成功
                if(msg.data < 0){
                    msg.data = 0;
                }
                $("#maturiDate").html(msg.data);
            },
            failure: function (data) {
                //保存失败
            }
        });
        var nowTime = "";
        var limitTime = getLimitTime(financeStart,financeEnd);
        if(new Date(financeEnd).format("yyyy-MM-dd") < new Date(today).format("yyyy-MM-dd")){
            nowTime = limitTime;
        }else{
            nowTime = getLimitTime(financeStart,today);
        }

        $(".total_time").html(limitTime);
        $(".ace_time").html(nowTime+"天");
        $(".financeStart").html(new Date(financeStart).format("yyyy-MM-dd"));
        $(".financeEnd").html(new Date(financeEnd).format("yyyy-MM-dd"));
        $(".time_process_now").css({
            "width":nowTime/limitTime*1100+"px"
        })

        $("#limitTime").html(getLimitTime(financeStart,financeEnd));
    },
    initGrid: function() {
        var g = this;
        //配置表格
        var cfgData = {
            url:_ctxPath+"/avf/financingApprove/financingInvoiceDetail.json",//获取后端数据
            rownumbers: false,
            rowNum: 10,
            mtype : "get",
            loadonce: false, //一次性加载数据，和autoLoad都为true时，则可以一次加载所有数据
            postData:{
                "id":g.financingNeedsNoId
            },
            colModel: [{
                name: "id", //列显示的名称
                index: "id", //传到服务器端用来排序的列名称
                hidden: true //隐藏不显示这一组
            }, {
                label: "序号",
                name: "docNo",
                index: "docNo",
                width: 80,
                hidden:true
            }, {
                label: "发票代码",
                name: "invoiceCode",
                index: "invoiceCode",
                width:220,
                formatter: function(value, id, rowdata) {
                    return '<span>' + rowdata.invoiceCode + '</span>';
                }
            }, {
                label: "发票号码",
                name: "invoiceNo",
                index: "invoiceNo",
                formatter: function(value, id, rowdata) {
                    return '<span>' + rowdata.invoiceNo + '</span>';
                }
            }, {
                label: "价税合计(元)",
                name: "vatMoney",
                index: "vatMoney",
                width:260,
                formatter:function(value,id,rowdata){
                    return '<span class="font18 bold">￥'+$.formatMoney(rowdata.vatMoney,2)+'</span>';
                }
            }, {
                label: "金额(元)",
                name: "taxFreeSum",
                index: "taxFreeSum",
                width:260,
                formatter: function(value, id, rowdata) {
                    return '<span class="font18 bold">￥' + $.formatMoney(rowdata.taxFreeSum,2) + '</span>';
                }
            }, {
                label: "税额(元)",
                name: "vatSum",
                index: "vatSum",
                width:160,
                formatter:function(value,id,rowdata){
                    return '<span>￥'+$.formatMoney(rowdata.vatSum,2)+'</span>';
                }
            }, {
                label: "所属公司",
                name: "companyShortName",
                index: "companyShortName",
                width: 180,
                formatter: function(value, id, rowdata) {
                    var url ="/pbm/company/companyDetail?companyCode="+rowdata.companyCode;
                    return '<a href="'+url+'">' + rowdata.companyShortName + '</a>';
                }
            }, {
                label: "开票日期",
                name: "invoDate",
                index: "invoDate",
                width: 180,
            }, {
                label: "批次号",
                name: "batchNumber",
                index: "batchNumber"
            }]
        }
        return cfgData;
    },
    getfinInsInfo:function(){
        var g = this;
        EUI.Store({
            url: _ctxPath + "/avf/financingRelConfigure/findFinByCompanyCode.json",
            type : "get",
            success: function (msg) {
                // console.log(msg.data);
                var obj = [];
                $.each(msg.data, function(i) {
                    objItem = {statusCode:msg.data[i].finInsCode,statusDetail:msg.data[i].finInsShortName};
                    obj.push(objItem);
                });
                var newobj = {'data1':obj};
                tabHeadSearch.clickElement(newobj,g.cfgId,"finInsCode");
            },
            failure: function (msg) {

            }
        });
    },
    //初始化高级查询表单
    initSearchForm:function(){
        var g = this;
        var options = {
            id: "repaymentForm", //表单id
            renderTo: "formBox1",//表单容器id
            submitId:"submitId",//提交按钮id
            tableId:g.cfgId,//要刷新的表格id
            title:"高级查询",//查询标题
            formGrid: [{
                xtype: "ComboBox",
                field: ["supplyCode"], // 表示哪些值需要提交到后端
                name: "supplyName",
                labelWidth: 122,
                id: "supplyCode",
                title: "供应商",
                width: 280,
                allowBlank: true,
                displayText: "请选择供应商",
                async: true, // 是否异步，true为异步
                store: {
                    type:"get",
                    url: _ctxPath + "/avf/financingRelConfigure/findRelByCompanyCode.json"
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
            },{
                xtype: "ComboBox",
                field: ["finInsCode"], // 表示哪些值需要提交到后端
                name: "finInsName",
                labelWidth: 122,
                id: "finInsCode",
                title: "资金提供方",
                width: 280,
                allowBlank: true,
                displayText: "请选择资金提供方",
                async: true, // 是否异步，true为异步
                store: {
                    type:"get",
                    url: _ctxPath + "/avf/financingRelConfigure/findFinByCompanyCode.json"
                }, // 从后台获取数据的地址
                editable: true, // 是否可编辑
                loadMask: true, // 是否有遮罩层
                showSearch: false, // 是否展开下拉框
                searchText:"finInsCode", // 下拉框的内容
                canClear: true,
                deforeLoad: function(store) {},
                afterLoad: function(data) {

                },
                afterSelect:function(data){

                }
            },{
                xtype: "FieldGroup",
                width:500,
                title:"融资期限",
                labelWidth: 122,
                itemspace:10,
                items: [{
                    xtype: "DateField",
                    width: 105,
                    allowBlank: true,
                    displayText: "融资开始日",
                    name: "financeStart",
                    id:"financeStart",
                    checkInitValue:false,
                    validateText: "请输入正确的融资开始日！"
                },{
                    xtype: "DateField",
                    labelWidth: 45,
                    width: 105,
                    title:"到",
                    id:"financeEnd",
                    name: "financeEnd",
                    checkInitValue:false,
                    allowBlank: true,
                    displayText: "融资到期日", // 显示在文本框内的提示语
                    validateText:"融资到期日必须大于融资开始日",
                    validaterDate:function(data){
                        var financeStart = new Date(EUI.getCmp("financeStart").getValue());
                        var maturityDate = new Date(data);
                        if(maturityDate >= financeStart){
                            return true;
                        }
                    }
                }]
            },{
                xtype: "FieldGroup",
                width:500,
                itemspace:10,
                items: [{
                    xtype: "NumberField",
                    width: 85,
                    labelWidth: 122,
                    precision : 0,
                    // value:0,
                    allowBlank: true,
                    // minlength:1,
                    title:"融资金额范围",
                    // minValue:1,
                    displayText: "最小融资金额",
                    name: "minMoney",
                    unit: "元",
                    id:"minMoney",
                    checkInitValue:false,
                    validateText: "请输入正确的最小融资金额！"
                },{
                    xtype: "NumberField",
                    precision : 0,
                    labelWidth: 45,
                    width: 85,
                    // value:0,
                    title: "到",
                    // minlength:1,
                    // minValue:1,
                    id:"maxMoney",
                    name: "maxMoney",
                    checkInitValue:false,
                    allowBlank: true,
                    displayText: "最大融资金额", // 显示在文本框内的提示语
                    validateText:"最大融资金额不能小于最小融资金额",
                    unit: "元",
                    validater:function(value){
                        var minMoney = parseFloat(EUI.getCmp("minMoney").getValue().toFixed(2));
                        if(minMoney>value){
                            return false;
                        }
                    }
                }]
            }] //表单配置
        }
        searchWin = new showSearchWin(options);
    }
});