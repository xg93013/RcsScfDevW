/**
 * Created by xionggang on 2017/8/1.
 * des:核心企业发票录入
 * jspPath:WEB-INF/views/avf/enterprise/entry_invoice.jsp
 */
EUI.EntryInvoice = EUI.extend(EUI.CustomUI, {
    renderTo: "",
    topRenderTo: "",
    subData: "", //提交企业信息及发票信息
    ticketData: "", //录入所有发票信息
    totalMoney:0,//发票总额
    labelName:"",//供应商名称
    ComboBoxCode:"",//下拉列表code
    ComboBoxName:"",//下拉列表name
    ComboBoxUrl:"",//下拉列表url
    invoceData:"",//所有已经录入发票信息的
    bitchNumValidate:"0",
    editInvoiceId:"",
    editTotalInvoice:"",
    mainFormEdit:"",
    initComponent: function() {
        var g = this;
        g.ticketData = [];
        g.getAllInvoiceById();
        //发票录入配置
        EUI.Container({
            renderTo: this.renderTo,
            width: 450,
            height: "auto",
            items: [{
                xtype: "FormPanel",
                itemspace: 20,
                height: "auto",
                id: "ticketForm",
                items: g.initInvoiceForm()
            }]
        });
        //主要提交信息
        EUI.Container({
            renderTo: this.topRenderTo,
            width: 950,
            height: "auto",
            items: [{
                xtype: "FormPanel",
                itemspace: 20,
                height: "auto",
                id: "ticketMainForm",
                items: g.initMainForm()
            }]
        });
        g.addEvents();
        g.setLabelWidth(); //设置表单样式
        g.setEditState();
    },
    addEvents: function() {
        var g = this;
        valideCertificate("payableCertificate");
        //提交所有信息
        $("#submit_ticket_form").live("click", function() {
            if(!EUI.getCmp("ticketMainForm").isValid() && g.bitchNumValidate == 1){
                errorInfo("已经存在账款凭证");
                return;
            }
            if(EUI.getCmp("ticketMainForm").isValid() && g.ticketData.length != 0) {
                var mainFormData = EUI.getCmp("ticketMainForm").getFormValue();
                var infos = JSON.stringify(g.ticketData);
                var invoiceTotalNumber = g.ticketData.length;
                var storeUrl = "";
                // var supplyCode = 0;
                if(g.ComboBoxName == "companyName"){
                    mainFormData.companyCode = EUI.getCmp("companyCode").getSubmitValue().companyCode;
                }
                if(g.ComboBoxName == "supplyName"){
                    mainFormData.supplyCode = EUI.getCmp("supplyCode").getSubmitValue().supplyCode;
                }
                if(g.editInvoiceId == ""){
                    storeUrl =  "/avf/invoice/manualAddInvoice.json";
                    // mainFormData.infos = infos;
                    mainFormData.invoiceTotalNumber = invoiceTotalNumber;
                    mainFormData.totalMoney = g.totalMoney
                    mainFormData = JSON.stringify(mainFormData);
                    EUI.Store({
                        url: _ctxPath + storeUrl,
                        params:{"head":mainFormData,"infos":infos},
                        type : "post",
                        success: function (msg) {
                            //保存成功
                            seccessInfo();
                            g.resetMainInfo();
                        },
                        failure: function (msg) {
                            //保存失败
                            errorInfo(msg.msg);
                        }
                    });
                }else{
                    mainFormData.supplyCode = g.mainFormEdit.supplyCode;
                    mainFormData.id = g.editInvoiceId;
                    mainFormData.invoiceTotalNumber = invoiceTotalNumber;
                    mainFormData.totalMoney = g.totalMoney;
                    mainFormData = JSON.stringify(mainFormData);
                    storeUrl =  "/avf/invoice/editInvoice.json";
                    EUI.Store({
                        url: _ctxPath + storeUrl,
                        params:{"head":mainFormData,"infos":infos},
                        type : "post",
                        success: function (msg) {
                            //保存成功
                            seccessInfo();
                            pageUrl = _ctxPath + "/avf/invoice/toWaitPage?type=enterprise"
                        },
                        failure: function (msg) {
                            //保存失败
                            errorInfo(msg.msg);
                        }
                    });
                }
            }
            else{
                errorInfo("请录入正确的发票信息");
            }
        });
        //清空表单
        $(".reset_btn").live("click", function() {
            EUI.getCmp("ticketForm").reset();
        });
        //提交单张发票
        $(".submit_btn").live("click", function() {
            if(EUI.getCmp("ticketForm").isValid()) {
                g.addTicket();
            }
        });
        //删除单张录入发票
        $(".close_ico").live("click", function() {
            var dataId = $(this).parent().attr("data-id");
            $(this).parent().parent().remove();
            $.each(g.ticketData, function(i,item) {
                if(item.invoiceNo == dataId){
                    g.ticketData.splice(i,1);
                    g.totalMoney = parseFloat(g.totalMoney.toFixed(2)) - parseFloat(item.vatMoney.toFixed(2))
                    return false;
                }
            });
            $(".tax_money").html($.formatMoney(parseFloat(g.totalMoney.toFixed(2)),2));
        });
        //修改单条发票信息
        $(".edit_ico").live("click",function(){
            var dataId = $(this).parent().attr("data-id");
            var editInvoice = [];
            if(EUI.getCmp("ticketForm").getFormValue().invoDate != "" || EUI.getCmp("ticketForm").getFormValue().invoiceCode != ""){
                errorInfo("请先完成已有发票的操作！");
            }else{
                $(this).parent().parent().remove();
                $.each(g.ticketData, function(i,item) {
                    if(item.invoiceNo == dataId){
                        editInvoice = g.ticketData.splice(i,1);
                        g.totalMoney = parseFloat(g.totalMoney.toFixed(2)) - parseFloat(item.vatMoney.toFixed(2))
                        return false;
                    }
                });
                $(".tax_money").html($.formatMoney(parseFloat(g.totalMoney.toFixed(2)),2));
                EUI.getCmp("id").setValue(editInvoice[0].id);
                EUI.getCmp("invoiceCode").setValue(editInvoice[0].invoiceCode);
                EUI.getCmp("invoiceNo").setValue(editInvoice[0].invoiceNo);
                EUI.getCmp("taxFreeSum").setValue(editInvoice[0].taxFreeSum);
                EUI.getCmp("vatSum").setValue(editInvoice[0].vatSum);
                EUI.getCmp("vatMoney").setValue(editInvoice[0].vatMoney);
                EUI.getCmp("invoDate").setValue(editInvoice[0].invoDate);
                EUI.getCmp("maturityDate").setValue(editInvoice[0].maturityDate);
            }
        });
        //录入新发票
        $("#batchNumber").find("input").on("focus",function(){
            g.showAllInvoice(g.ticketData);
        });
        //查询单张发票信息
        $("#search_bt").live("click",function(){
            var search_txt = $("#search_txt").val();
            if(search_txt == ""){
                g.showAllInvoice(g.ticketData);
            }else{
                var resultInvoice = [];
                $.each(g.ticketData, function(i,item) {
                    //根据发票代码或者发票号码模糊查询
                    if(item.invoiceNo.indexOf(search_txt) != -1 || item.invoiceCode.indexOf(search_txt) != -1 || item.vatMoney.toString().indexOf(search_txt) != -1 || item.invoDate.indexOf(search_txt) != -1 || item.maturityDate.indexOf(search_txt) != -1){
                        var htmls = "";
                        var invoiceCopy = g.ticketData.concat();//复制数组
                        var oneTicket = invoiceCopy.splice(i,1);
                        resultInvoice.push(oneTicket[0]);
                    }else{
                        $("#tickets_list").empty().append("<div class='empty_info'>没有相关记录！</div>");
                    }
                });
                if(resultInvoice.length != 0){
                    g.showAllInvoice(resultInvoice);
                }
            }
        });
        //发票代码和号码位数限制
        $("#invoiceCode").find("input").attr("maxlength","12");
        $("#invoiceNo").find("input").attr("maxlength","8");
        $("#batchNumber").find("input").attr("maxlength","10");
        $("#taxFreeSum").find("input").live("focus",function(){
          $(this).val("");
        })
        $("#vatSum").find("input").live("focus",function(){
            $(this).val("");
        });
    },
    //查询该应付凭证号是否存在
    getInvoiceBybatchNumber:function(){
        var g =this;
        var payableCertificate = EUI.getCmp("payableCertificate").getValue();
        // console.log(batchNum);
        EUI.Store({
            url: _ctxPath + "/avf/accountRPInfo/hasVoucherNo.json?payableCertificate="+payableCertificate,
            // params:{"voucherNo":batchNum},
            type : "get",
            success: function (msg) {
                //请求成功
                if(msg.data == true){//存在凭证
                    g.bitchNumValidate = 1;
                    $(".remarks").html("凭证号已经存在");
                }else{
                    //不存在凭证
                    g.bitchNumValidate = 0;
                    $(".remarks").html("");
                }
            },
            failure: function (msg) {
                //请求失败
            }
        });
    },
    //重置表单所有信息
    resetMainInfo:function(){
        var g =this;
        EUI.getCmp("ticketMainForm").reset();
        EUI.getCmp("ticketForm").reset();
        $("#tickets_list").empty();
        g.ticketData = [];
        g.totalMoney = 0;
        $(".tax_money").html("0");
        // $(".end_num").html("0");
    },
    //单张发票表单初始化
    initInvoiceForm: function() {
        var formGrid = [{
            xtype: "TextField",
            title: "id",
            labelWidth: 110,
            width: 280,
            id:"id",
            name: "id",
            hidden:"true"
        },{
            xtype: "TextField",
            title: "发票代码",
            labelWidth: 110,
            width: 280,
            // height: 34,
            minlength:0,
            maxlength:12,
            id:"invoiceCode",
            name: "invoiceCode",
            allowBlank: false,
            validateText: "请输入正确的12位发票代码！",
            displayText: "发票代码",
            validater: function(value) {
                var reg = /\b\d{12}\b/;
                if(reg.test(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        }, {
            xtype: "TextField",
            labelWidth: 110,
            width: 280,
            title: "发票号码",
            name: "invoiceNo",
            id:"invoiceNo",
            allowBlank: false,
            displayText: "发票号码", // 显示在文本框内的提示语
            validateText: "请输入正确的8位发票号码！",
            validater: function(value) {
                var reg = /\b\d{8}\b/;
                if(reg.test(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        }, {
            xtype: "FieldGroup",
            width:420,
            itemspace:10,
            items: [{
                xtype: "NumberField",
                width: 70,
                labelWidth: 110,
                precision : 2,
                // value:0,
                allowBlank: false,
                minlength:1,
                title:"金额",
                minValue:1,
                displayText: "金额",
                name: "taxFreeSum",
                unit: "元",
                id:"taxFreeSum",
                checkInitValue:false,
                validateText: "请输入正确的金额！",
                afterValidate:function(value){
                    var taxFreeSum = parseFloat(EUI.getCmp("taxFreeSum").getValue().toFixed(2));
                    var vatSum = parseFloat(EUI.getCmp("vatSum").getValue().toFixed(2));
                    EUI.getCmp("vatMoney").setValue(parseFloat((taxFreeSum+vatSum).toFixed(2)));
                },
                afterClear:function(value){
                    // alert(value);
                }
            },{
                xtype: "NumberField",
                precision : 2,
                labelWidth: 68,
                width: 75,
                // value:0,
                title: "税额",
                minlength:1,
                minValue:1,
                id:"vatSum",
                name: "vatSum",
                checkInitValue:false,
                allowBlank: false,
                displayText: "税额", // 显示在文本框内的提示语
                validateText:"税额不能大于金额",
                unit: "元",
                style:{
                    "margin-top":0
                },
                afterValidate:function(){
                    var taxFreeSum = parseFloat(EUI.getCmp("taxFreeSum").getValue().toFixed(2));
                    var vatSum = parseFloat(EUI.getCmp("vatSum").getValue().toFixed(2));
                    EUI.getCmp("vatMoney").setValue(parseFloat((taxFreeSum+vatSum).toFixed(2)));
                },
                validater:function(value){
                    var taxFreeSum = parseFloat(EUI.getCmp("taxFreeSum").getValue().toFixed(2));
                    if(taxFreeSum<value){
                        return false;
                    }
                }
            }]
        },
            {
                xtype: "NumberField",
                labelWidth: 110,
                precision : 2,
                width: 260,
                height:40,
                readonly: "readonly",
                title: "价税合计",
                allowBlank: false,
                // displayText: "价税合计",
                name: "vatMoney",
                checkInitValue:false,
                unit: "元",
                id:"vatMoney",
                validateText: "请输入正确的价税合计！",
                validater: function(value) {
                    var taxFreeSum = parseFloat(EUI.getCmp("taxFreeSum").getValue().toFixed(2));
                    var vatSum = parseFloat(EUI.getCmp("vatSum").getValue().toFixed(2));
                    if(value != (parseFloat(taxFreeSum+vatSum).toFixed(2))){
                        return false;
                    }
                }
            }, {
                xtype: "DateField",
                labelWidth: 110,
                width: 278,
                id:"invoDate",
                title: "开票日期",
                allowBlank: false,
                displayText: "开票日期",
                validateText:"开票日期不能大于当前日期！",
                name: "invoDate",
                // minDate:"20170626"
                validaterDate:function(data){
                    var nowDate = new Date().format("yyyy-MM-dd");
                    var inputDate = new Date(data).format("yyyy-MM-dd");
                    if(inputDate <= nowDate){
                        return true;
                    }
                },
                afterSelect:function(value){
                    var invoDate = new Date(EUI.getCmp("invoDate").getValue());
                    var endDate = new Date(invoDate.setMonth(invoDate.getMonth() + 3)).format("yyyy-MM-dd");
                    // EUI.getCmp("maturityDate").setValue(endDate);
                }
            }, {
                xtype: "DateField",
                labelWidth: 110,
                width: 278,
                allowBlank: false,
                id:"maturityDate",
                title: "账款到期日",
                // value:"20170626",
                validateText:"账款到期日应该大于开票日期！",
                displayText: "账款到期日",
                name: "maturityDate",
                validaterDate:function(data){
                    var invoDate = new Date(EUI.getCmp("invoDate").getValue());
                    var maturityDate = new Date(data);
                    if(maturityDate >= invoDate){
                        return true;
                    }
                }
            }
        ]
        return formGrid;
    },
    //添加单张发票
    addTicket: function() {
        var g = this;
        var oneTicket = EUI.getCmp("ticketForm").getFormValue();
        var mainFormData = EUI.getCmp("ticketMainForm").getFormValue();
        if(g.ticketData.length == 0) {
            if(mainFormData.batchNumber == ""){
                errorInfo("请先录入批次号！");
            }else{
                oneTicket.batchNumber = mainFormData.batchNumber;
                g.setInvoiceList(oneTicket);
                g.resetInvoiceForm();
            }
        }
        else{
            if(mainFormData.batchNumber == ""){
                errorInfo("请先录入批次号！");
            }else if(mainFormData.batchNumber != "" && mainFormData.batchNumber != g.ticketData[0].batchNumber){
                errorInfo("批次号必须一致！");
            }else{
                var s = false;//默认不存在发票
                $.each(g.ticketData, function(i,item) {
                    if(item.invoiceNo == oneTicket.invoiceNo && item.invoiceCode == oneTicket.invoiceCode){
                        s = true;
                        errorInfo("已经存在发票信息！");
                        return false;
                    }
                    if(g.ticketData[0].maturityDate != oneTicket.maturityDate){
                        s = true;
                        errorInfo("同一批次号下的发票账款到期日必须相同！");
                        return false;
                    }
                });
                if(!s){
                    //不存在发票信息添加发票
                    oneTicket.batchNumber = mainFormData.batchNumber;
                    g.setInvoiceList(oneTicket);
                    g.resetInvoiceForm();
                }
            }
        }
    },
    //重置发票表单
    resetInvoiceForm:function(){
        EUI.getCmp("ticketForm").reset();
    },
    //添加单张发票至列表
    setInvoiceList:function(options){
        var g = this;
        //发票总价
        g.totalMoney += parseFloat(options.vatMoney.toFixed(2));
        g.ticketData.push(options);
        //发票总数量
        // $(".end_num").html(this.ticketData.length);
        $(".tax_money").html($.formatMoney(g.totalMoney.toFixed(2),2));
        g.showAllInvoice(g.ticketData);
    },
    //显示所有发票信息
    showAllInvoice:function(options){
        var g = this;
        if(options.length != 0) {
            var htmls = "";
            $.each(options,function(i,item){
                htmls += '<div class="ticket_item" data-id="' + item.invoiceNo + '">';
                htmls += '<span class="span_w18 text_over">' + item.invoiceCode + '</span>';
                htmls += '<span class="span_w18 text_over">' + item.invoiceNo + '</span>';
                htmls += '<span class="span_w18 text_over">' + $.formatMoney(item.vatMoney,2) + '元</span>';
                htmls += '<span class="span_w18 text_over">' + item.invoDate + '</span>';
                htmls += '<span class="span_w18 text_over">' + item.maturityDate + '</span>';
                htmls += '<span class="span_w10 text_over" data-id="' + item.invoiceNo + '">';
                htmls += '<div class="sxf_btn icon_delete close_ico" title="删除"></div>';
                htmls += '<div class="sxf_btn icon_edit edit_ico mglr20" title="编辑"></div>';
                htmls += '</span>';
                htmls += '</div>';
            });
            $("#tickets_list").empty().append(htmls);
        }
    }
    ,
    //核心企业主要信息
    initMainForm: function() {
        var g = this;
        var lrNum ="";
        var mainFormGrid = [{
            xtype: "TextField",
            readonly: "readonly",
            title: "录入编号",
            value: g.mainFormEdit.docNo,
            labelWidth: 110,
            id:"lrNum",
            width: 270,
            height:36,
            hidden:true,
            name: "lrNum",
            //allowBlank: false,
            displayText: "后台自动生成",
            // 不能为空，必填
        }, {
            xtype: "ComboBox",
            field: [g.ComboBoxCode], // 表示哪些值需要提交到后端
            name: g.ComboBoxName,
            labelWidth: 110,
            value:g.mainFormEdit.supplyName,
            id: g.ComboBoxCode,
            title: g.labelName,
            width: 260,
            allowBlank: false,
            displayText: "请选择"+g.labelName,
            async: true, // 是否异步，true为异步
            store: {
                type:"get",
                url: _ctxPath + g.ComboBoxUrl
            }, // 从后台获取数据的地址
            editable: true, // 是否可编辑
            loadMask: true, // 是否有遮罩层
            showSearch: false, // 是否展开下拉框
            searchText: "supplyName", // 下拉框的内容
            canClear: true,
            deforeLoad: function(store) {},
            afterLoad: function(data) {

            },
            afterSelect:function(data){

            }
        }, {
            xtype: "TextField",
            labelWidth: 110,
            width: 270,
            allowBlank: true,
            title: "应付账款凭证",
            value:g.mainFormEdit.payableCertificate,
            id:"payableCertificate",
            // hintText:"凭证号要求唯一！",
            name: "payableCertificate",
            displayText: "应付账款凭证", // 显示在文本框内的提示语
            validateText:"已经存在该账款凭证",
            validater: function(value) {
                // if(g.editInvoiceId == ""){
                //     if(g.bitchNumValidate == 0){
                //         return true;
                //     }else{
                //         return false;
                //     }
                // }
                if($(".remarks").length != "" && value != ""){
                    return false;
                }else{
                    return true;
                }
            }
        },{
            xtype: "TextField",
            labelWidth: 110,
            width: 270,
            // height: 34,
            value:g.mainFormEdit.batchNumber,
            title: "批次号",
            id:"batchNumber",
            allowBlank: false,
            displayText: "批次号",
            validateText: "批次号位数不能超过10位！",
            name: "batchNumber",
            validater: function(value) {
                if(value.length <=10) {
                    return true;
                } else {
                    return false;
                }
            }
        }, {
            xtype: "TextArea",
            labelWidth: 110,
            width: 566,
            title: "录入说明",
            id:"remarks",
            displayText: "录入说明",
            value:g.mainFormEdit.remarks,
            name: "remarks"
        }]
        return mainFormGrid;
    },
    //设置表单样式
    setLabelWidth: function() {
        $(".ux-field-label span").css({
            "float": "none",
            "margin-right": "10px"
        });
        $("#Container1003 .ux-column-layout").css({
            "margin-top":"0",
            "margin-left":"0",
            "margin-right":"0"
        });
        $("#ticket_box .ux-line-row").css({
            "margin-top":"10px"
        });
        $("#taxFreeSum").css({
            "margin-right":"0"
        });
        $("#Container1003 .ux-field-element").css({
            "width":"110px"
        });
        $("#remarks .ux-field-element").css({
            "width": "578px"
        });
    },
    //根据id查询所有发票
    getAllInvoiceById:function(){
        var g = this;
        if(g.editInvoiceId != ""){
            g.mainFormEdit = JSON.parse($(".finInvoiceHead").attr("data"));
            g.editTotalInvoice = JSON.parse($(".finInvoiceInfos").attr("data"));
            g.mainFormEdit.batchNumber = g.editTotalInvoice[0].batchNumber;
            g.setAllInvoice();
        }

    },
    //获取所有发票
    setAllInvoice:function(){
        var g = this;
        if(g.editTotalInvoice != ""){
            g.ticketData = g.editTotalInvoice;
            $.each(g.ticketData, function(i) {
                g.ticketData[i].maturityDate = GetDateT(new Date(g.ticketData[i].maturityDate));
            });
            g.showAllInvoice(g.editTotalInvoice)
            // console.log(g.mainFormEdit);
            //计算totalMoney
            g.totalMoney = g.mainFormEdit.totalMoney;
            $(".tax_money").html($.formatMoney(g.totalMoney.toFixed(2),2));
        }
    },
    //添加发票编辑表单项的录入样式
    setEditState:function(){
        var g = this;
        if(g.editInvoiceId != ""){
            if(g.mainFormEdit.payableCertificate != ""){
                EUI.getCmp("lrNum").hidden = false;
                EUI.getCmp(g.ComboBoxCode).readonly = true;
                $("#"+g.ComboBoxCode).find("input").attr("disabled","disabled");
                $("#payableCertificate").find("input").attr("disabled","disabled").css({
                    "background":"none",
                    "color":"#999"
                });
                $("#batchNumber").find("input").attr("disabled","disabled");
            }else{
                EUI.getCmp("lrNum").hidden = false;
                EUI.getCmp(g.ComboBoxCode).readonly = true;
                $("#"+g.ComboBoxCode).find("input").attr("disabled","disabled");
            }
            $("#ticketMainForm .ux-line-row").each(function(i,item){
                if($(this).find("input").attr("disabled") == "disabled"){
                    $(this).find("input").css({
                        "background":"none",
                        "color":"#999"
                    });
                }
            })
        }
    }
});