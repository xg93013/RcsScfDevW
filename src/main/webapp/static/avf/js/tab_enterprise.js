/**
 * Created by xionggang on 2017/8/1.
 * des:核心企业公共头部状态导航
 * jspPath:enterprise everyone
 */
$(function(){
    $.ajax({
        type: 'get',
        url: _ctxPath+"/avf/statistical/verifyQuota.json",
        success: function(data){
            var flag = 0;
            $('.msg_num').each(function () {
                var g = $(this);
                if( flag == 0){
                    if(data.wait.bideNumber != 0){
                        g.append("<span>"+data.wait.bideNumber+"</span>");
                    }
                }else if( flag == 1){

                }else if(flag == 2){
                    if(data.demand.bideNumber != 0){
                        g.append("<span class='bideNumber'>"+data.demand.bideNumber+"</span>");
                    }
                }else if(flag == 3){
                    if(data.needConfirmQuota != 0){
                        g.append("<span>"+data.needConfirmQuota+"</span>");
                    }
                }else if(flag == 4){
                    if(data.bideRepayment != 0){
                        g.append("<span>"+data.bideRepayment+"</span>");
                    }
                }else if(flag == 5){

                }
                flag++;
            });
        },
        error:function(){

        }
    });
})
