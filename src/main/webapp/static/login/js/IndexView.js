var yzmcode;
$(function(){
	getCookie();
    startBanner();
    setYzmCode();
    getFocus();
    document.onkeydown = function(event) {
        var target, code, tag;
        if (!event) {
            event = window.event; //针对ie浏览器
            target = event.srcElement;
            code = event.keyCode;
            if (code == 13) {
                tag = target.tagName;
                if (tag == "TEXTAREA") { return true; }
                else {
                    if(login_now()){
                        setCookie();
                        $("#submit_btn").click();
                    }
                    return false;
                }
            }
        }
        else {
            target = event.target; //针对遵循w3c标准的浏览器，如Firefox
            code = event.keyCode;
            if (code == 13) {
                tag = target.tagName;
                if (tag == "INPUT") {
                    if(login_now()){
                        setCookie();
                        $("#submit_btn").click();
                    }
                    return false;
                }
                else { return true; }
            }
        }
    };

    // $("body").keydown(function(e){
     //    var curKey = e.which;
     //    禁用enter提交form
     //    var target, code, tag;
     //    if (!event) {
     //        event = window.event; //针对ie浏览器
     //        target = event.srcElement;
     //        code = event.keyCode;
     //        if (code == 13) {
     //            tag = target.tagName;
     //            if (tag == "TEXTAREA") { return true; }
     //            else { return false; }
     //        }
     //    }
     //    else {
     //        target = event.target; //针对遵循w3c标准的浏览器，如Firefox
     //        code = event.keyCode;
     //        if (code == 13) {
     //            tag = target.tagName;
     //            if (tag == "INPUT") { return false; }
     //            else { return true; }
     //        }
     //    }
     //    // if(curKey == 13) {
     //    //     var flag = login_now();
     //    //     if(flag){
     //    //         setCookie();
     //    //         // $("#submit_btn").click();
     //    //     };
     //    // }
	// });
	$("#login_btn").click(function(){
		if(login_now()){
            setCookie();
			$("#submit_btn").click();
		};
	});
	$(".rember_label").click(function(){
		if($(".rember_pwd em").hasClass("checked")){
            $(".rember_pwd em").removeClass("checked");
		}else{
            $(".rember_pwd em").addClass("checked");
		}
	});
	$(".rember_pwd em").click(function(){
        if($(this).hasClass("checked")){
            $(this).removeClass("checked");
        }else{
            $(this).addClass("checked");
        }
	});

});

function setYzmCode(){
    //判断当前浏览器是否支持h5的canvas,如果支持则采用h5的canvas绘制验证码
    if(!!document.createElement('canvas').getContext){
        //图形验证码*/
        yzmcode = new GVerify("yzmCode");
    }else{
        yzmcode = new vCode("yzmCode");
    }

}
function getCookie() {
    if($.cookie('username') != null && $.cookie('username') != '' && $.cookie('password') != null && $.cookie('password') != '') { //选中保存秘密的复选框
        // $("#rember_pwd").attr('checked', true);
        $('#loginName').val($.cookie('username'));
        $('#loginPwd').val($.cookie('password'));
		$(".rember_pwd em").addClass("checked");
    }else{
        $(".rember_pwd em").removeClass("checked");
	}
}

function setCookie() {
    var uName =$('#loginName').val();
    var psw = $('#loginPwd').val();
    if($(".rember_pwd em").hasClass("checked")){//保存密码
        $.cookie('username', uName, {
            expires: 7,
            path: '/'
        });
        $.cookie('password', psw, {
            expires: 7,
            path: '/'
        });
    } else { //删除cookie
        $.cookie('username', '', {
            expires: -1,
            path: '/'
        });
        $.cookie('password', '', {
            expires: -1,
            path: '/'
        });
    }
}
function login_now(){
	var errImg = "<img src='/static/login/images/errors.png'/>";
	var nameEg = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
    var passwdEg = /^[a-zA-Z0-9_][a-zA-Z0-9_]{5,15}$/;
	var mobileEg = /^((\(\d{3}\))|(\d{3}\-))?13\d{9}$/;
	var emailEg = /^\w+([-+.]\w+)*@\w+([-.]\\w+)*\.\w+([-.]\w+)*$/;
	var username = $("#loginName");
	var passwd = $("#loginPwd");
	var userYzm = $("#userYzm");
	var check = $(".login_checkbox");
	if(username.val()=="" || !nameEg.test(username.val())){
		username.parent(".lform_item").addClass("red_border");
		$(".info_text").html(errImg+"<span>请输入正确的用户名！</span>");
        username.focus();
		return false;
	} else {
		username.parent(".lform_item").removeClass("red_border");
	}
	if(passwd.val()=="") {
        passwd.parent(".lform_item").addClass("red_border");
        $(".info_text").html(errImg+"<span>密码不能为空！</span>");
        passwd.focus();
        return false;
    }else if(passwd.val().length<6){
        passwd.parent(".lform_item").addClass("red_border");
        $(".info_text").html(errImg+"<span>密码不能少于6位！</span>");
        passwd.focus();
        return false;
	} else if(!passwdEg.test(passwd.val())){
		passwd.parent(".lform_item").addClass("red_border");
		$(".info_text").html(errImg+"<span>请输入正确密码！</span>");
        passwd.focus();
		return false;
	} else {
		passwd.parent(".lform_item").removeClass("red_border");
	}
	if(userYzm.val()=="" || !yzmcode.validate(userYzm.val())){
		userYzm.parent(".lform_item").addClass("red_border");
		$(".info_text").html(errImg+"<span>请输入正确验证码！</span>");
        userYzm.focus();
		return false;
	} else {
		userYzm.parent(".lform_item").removeClass("red_border");
	}
    // $.ajax({
    //     type: 'get',
    //     url: _ctxPath+"/ura/user/login.json",
    //     data: {loginName:username.val(),loginPwd:passwd.val()},
    //     dataType: "json",
    //     success: function(data){
		// 	console.log(data);
		// },
		// error:function(){
		// 	console.log("error");
		// }
    // });
   	return true;
}
function startBanner(){
    //banner轮播
    var bannerSlider = new Slider($('#banner_tabs'), {
        time: 5000,
        delay: 400,
        event: 'click',
        auto: true,
        mode: 'fade',
        controller: $('#bannerCtrl'),
        activeControllerCls: 'active'
    });
    $('#banner_tabs .flex-prev').click(function() {
        bannerSlider.prev()
    });
    $('#banner_tabs .flex-next').click(function() {
        bannerSlider.next()
    });
}
function getFocus(){
    $("#loginName").keyup(function(){
        $(".info_text").html("");
    });
    $("#loginPwd").keyup(function(){
        $(".info_text").html("");
    })
    $("#userYzm").keyup(function(){
        var code = event.keyCode;
        if(code != 13){
            $(".info_text").html("");
        }
    })
}
