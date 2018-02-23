/**
 * Created by Administrator on 2017/8/1.
 * des:核心企业、供应商、金融机构查看应收、应付账款详情js
 * jspPath:WEB-INF/views/avf/enterprise/view_rec_pay_money.jsp
 */
EUI.InvoiceDetail = EUI.extend(EUI.CustomUI, {
    renderTo: null,
    height: 'auto',
    initComponent: function () {
        var _this = this;
        _this.initGrid();
        _this.loadData();
    },
    initGrid: function () {
        var _this = this;
        EUI.GridPanel({
            width: 1160,
            renderTo: _this.renderTo,
            padding: 0, //设置表格的内边距
            exportXls: false,
            searchConfig: null,
            showRefresh: false,
            id: "invoiceDetailTab",
            height: 'auto',
            gridCfg: {
                rownumbers: false, //去掉表格序号
                //url:_ctxPath+"/avf/accountRPInfo/findInvoicesByPayableCertificateAndBatchNumber.json",//获取后端数据
                rowNum: 10,//一页显示几条数据
                hasPager: false,
                loadonce: true,//true数据一次性加载,每页返回加载每页的数据
                // shrinkToFit: true,//表格宽度自适应
                colModel: [{
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
                }, {
                    label: "价税合计",
                    name: "vatMoney",
                    index: "vatMoney",
                    //width: 100,
                    formatter: function (value, id, rowdata) {
                        return '￥' + $.formatMoney(rowdata.vatMoney, 2);
                    }
                }, {
                    label: "金额",
                    name: "taxFreeSum",
                    index: "taxFreeSum",
                    // width: 100,
                    formatter: function (value, id, rowdata) {
                        return '￥' + $.formatMoney(rowdata.taxFreeSum, 2);
                    }
                }, {
                    label: "税额",
                    name: "vatSum",
                    index: "vatSum",
                    //width: 100,
                    formatter: function (value, id, rowdata) {
                        return '￥' + $.formatMoney(rowdata.vatSum, 2);
                    }
                }, {
                    label: "所属公司",
                    name: "companyShortName",
                    index: "companyShortName",
                }, {
                    label: "开票日期",
                    name: "invoDate",
                    index: "invoDate",
                    formatter: function (value, id, rowdata) {
                        return GetDateT(new Date(rowdata.invoDate));
                    }
                }, {
                    label: "批次号 ",
                    name: "batchNumber",
                    index: "batchNumber",
                }, {
                    label: "账款到期日",
                    name: "maturityDate",
                    index: "maturityDate",
                    width: 200,
                    formatter: function (value, id, rowdata) {
                        return GetDateT(new Date(rowdata.maturityDate));
                    }
                }]
            }
        });
    },
    loadData: function () {
        //获取发票
        EUI.Store({
            url: _ctxPath + "/avf/accountRPInfo/findInvoicesByPayableCertificateAndBatchNumber.json",
            params: {'batchNumber': $('#getBatchNumber').val(), 'voucherNo': $('#getVoucherNo').val()},
            success: function (d) {
                if (d.rows == null) {
                    $('#invoiceDiv').css('display', 'none');
                    $('#accountsDiv').css('display', 'block');
                } else {
                    var allMoney = 0;
                    EUI.getCmp('invoiceDetailTab').setDataInGrid(d.rows);
                    $('#invoiceNum').text(d.rows.length);
                    for (var i in d.rows) {
                        allMoney += d.rows[i].vatMoney;
                    }
                    $('#allMoney').text($.formatMoney(allMoney, 2));
                    $('#invoiceDiv').css('display', 'block');
                    $('#accountsDiv').css('display', 'none');
                }
            },
            failure: function (response) {
                errorInfo(response.msg);
            }
        });
    }
});