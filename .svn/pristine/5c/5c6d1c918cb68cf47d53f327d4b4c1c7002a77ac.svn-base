/**
 * Created by allenwong on 2017/8/14.
 * des:核心企业确认通知单js
 * jspPath:WEB-INF/views/avf/enterprise/confirm_sheet.jsp
 */
$('#agree').click(function () {
    keySignpublicSeal();
    var data =  AztSignSealFrom.AztWebSignSealkeyPublic.ESASaveSignData();
    if(data){
        var _this = $(this);
        EUI.Store({
            url: _ctxPath+'/avf/notice/noticeConfirm.json',
            params:{id:_this.attr('data')},
            async:false,
            success: function (d) {
                showToPageInfo("操作成功",'/avf/notice/noticesListPage?identityType=ENTERPRISE');
            },
            failure: function (d) {
                errorInfo(d.msg);
                //messageDemo.messageError(d.msg);
            }
        });
    }else{
        errorInfo("未获取到数字签章数据,无法确认通知单!");
    }
});
