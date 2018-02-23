/**
 * Created by xionggang on 2017/8/1.
 * des:金融机构公共头部状态导航
 * jspPath:financial everyone
 */
$(function(){
    $.ajax({
        type: 'get',
        url: _ctxPath+"/avf/flow/financingFlow.json",
        success: function(data){
            var flag = 0;
            $('.msg_num').each(function () {
                var g = $(this);
                if( flag == 0){
                    if(data.data.approveQuota != 0){
                        g.append("<span>"+data.data.approveQuota+"</span>");
                    }
                }else if( flag == 1){

                }else if(flag == 2){
                    if(data.data.loanQuato != 0){
                        g.append("<span class='bideNumber'>"+data.data.loanQuato+"</span>");
                    }
                }else if(flag == 3){
                    if(data.data.receiptQuato != 0){
                        g.append("<span>"+data.data.receiptQuato+"</span>");
                    }
                }else if(flag == 4){

                }
                flag++;
            });
        },
        error:function(){

        }
    });
})
