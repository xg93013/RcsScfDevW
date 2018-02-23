/**
 * Created by xionggang on 2017/8/1.
 * des:供应商公共头部状态导航
 * jspPath:supplier everyone
 */
$(function () {
    EUI.Store({
        url: _ctxPath+"/avf/statistical/verifyQuota.json",
        type:'GET',
        success: function(response) {
           var j = 0;
            $('.msg_num').each(function () {
                var g = $(this);
                if( j == 0){
                    if(response.wait.feedbackNumber != 0){
                        g.append("<span>"+response.wait.feedbackNumber+"</span>");
                    }
                }else if( j == 1){

                }else if(j == 2){
                    if(response.demand.bideNumber != 0){
                        g.append("<span class='bideNumber'>"+response.demand.bideNumber+"</span>");
                    }
                }else if(j == 3){
                    if(response.needConfirmQuota != 0){
                        g.append("<span>"+response.needConfirmQuota+"</span>");
                    }
                }else if(j == 4){

                }
                j++;
            });
        },
        failure:function (response) {
            errorInfo(response.msg);
        }
    });
});
