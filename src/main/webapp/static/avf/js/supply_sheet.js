/**
 * Created by xionggang on 2017/8/1.
 * des:供应商确认通知单
 * jspPath:WEB-INF/views/avf/supplier/confirm_sheet.jsp
 */
$("#agree_sheet").live("click", function () {
    var data = null;
    if($("#agree_sheet").hasClass("confirm_ok") == false){
        var id = $(this).attr('data');
        // keySignpublicSeal();
        // data =  AztSignSealFrom.AztWebSignSealkeyPublic.ESASaveSignData();
        // if(data){
            EUI.Store({
                url: _ctxPath + "/avf/notice/noticeConfirm.json?id="+id,
                type : "get",
                success: function (msg) {
                    showToPageInfo("成功确认通知单！","/avf/notice/noticesListPage?identityType=SUPPLIER");
                },
                failure: function (msg) {
                    errorInfo(msg.msg);
                }
            });
       // }else{
       //      errorInfo("未获取到数字签章数据,无法确认通知单!");
       //  }
    }
});