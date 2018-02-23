/**
 * Created by Administrator on 2017/8/29.
 * des:核心企业确认通知单js
 * jspPath:WEB-INF/views/avf/enterprise/confirm_sheet.jsp
 */
var timer = 5;
$(function () {
    // 同意通知单
    $('#agree').click(function () {
        var _this = $(this);
        EUI.Store({
            url: _ctxPath+'/avf/notice/noticeConfirm.json',
            params:{id:_this.attr('data')},
            async:false,
            success: function (d) {
                //showToPageInfo(d.msg,'/avf/notice/noticesListPage?identityType=ENTERPRISE');
                //涉及通知单电子签章，下期优化
                $('#overlay').css('display','');
                $('#loadingTip').css('display','');
                Countdown();
            },
            failure: function (d) {
                errorInfo(d.msg);
                //messageDemo.messageError(d.msg);
            }
        });
    });
    $('.overlay').click(function(){
        $('#overlay').css('display','none');
        $('#loadingTip').css('display','none');
        timer = 0;
        Countdown();
    });
});
//倒计时
var clear;
function Countdown() {
    if (timer >= 1) {
        timer -= 1;
        $('#second').text(timer);
        clear = setTimeout(function() {
            Countdown();
        }, 1000);
    }else{
        clearInterval(clear);
        $('#agree').css('display','none');
        $('.confirm').css('display', 'block');
        // $('.showInfo  .list_2').addClass('list_2_over').removeClass('list_2');
        $('.showInfo  .list_2_over_over').addClass('list_2').removeClass('list_2_over_over');
        $('#overlay').css('display','none');
        $('#loadingTip').css('display','none');
    }
}

