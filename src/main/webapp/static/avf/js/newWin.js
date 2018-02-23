/**
 * User:xionggang
 * Date:2017/08/30
 * Time:10:30
 * des:公共高级查询
 */
!(function(window, document) {
	function showSearchWin(options) {
		this.options = { //默认options参数值
			id:"",//表单id
			renderTo:"",//容器id
			formGrid:"",//表单配置
			submitId:"",//提交按钮id
			tableId:"",//刷新表格
			title:""//查询标题
		}
		
		if(Object.prototype.toString.call(options) == "[object Object]"){//判断传入参数类型
			for(var i in options) {
				this.options[i] = options[i];
			}
		}else{
			this.options.id = options;
		}
		this._init();
		this.setCssStyle();
		this.addEvent();
		this.moveWindow();
	}

	showSearchWin.prototype = {
		/**初始化方法**/
		_init: function() {
			var x = this;
			$("body").append("<div class='show_win common_search' id='common_search'></div>");
			var htmls = "<p class='update_title' id='update_title'>"+x.options.title+"</p><div class='formPanels' id='"+x.options.renderTo+"'></div>";
			var addHtmls = "<div class='position_box'><div class='content_box'>"+htmls+"</div><div class='close_b close_high'></div></div>";
		    $(".common_search").show().html(addHtmls);
            EUI.Container({
                renderTo: x.options.renderTo,
                width: 450,
                height: "auto",
                items: [{
                    xtype: "FormPanel",
                    itemspace: 20,
                    height: "auto",
                    id: x.options.id,
                    items: x.options.formGrid
                }]
            });
		    x.setBtnDoms();
	        x.closeSearchWin();
	        x.setCssStyle();
            //定位到屏幕中间
            var sHeight = parseFloat($(".common_search").height()) / 2;
            $(".common_search").css({
                "margin-top": "-" + sHeight + "px"
            });
		},
		addEvent:function(){
			var x = this;
			$(".close_high").live("click",function(){
				x.closeSearchWin();
			})
			//重置
			$("#reset_s_btn").live("click",function(){
				EUI.getCmp(x.options.id).reset();
			})
			//提交
			$(".submit_s_btn").live("click",function(){
				x.closeSearchWin();
			})
			//刷新
			$("#detail_fresh").live("click",function(){
				EUI.getCmp(x.options.id).reset();
                $(".search_blur").find("input").val("");
				EUI.getCmp(x.options.tableId).setPostParams({
					"keyWord":"",
					"query":"",
					"order ":""
				},true);

			})
			//模糊查询
			$(".search_btns").live("click",function(){
				var keyWord = $(this).prev().val();//获取模糊查询字段
                EUI.getCmp(x.options.tableId).setPostParams({
                    "keyWord":keyWord,
                    "query":""
                },true);
			});

            $("#"+x.options.submitId).live("click",function(){
            	// console.log(x.options.tableId);
                if(EUI.getCmp(x.options.id).isValid()){
                    var query = EUI.getCmp(x.options.id).getFormValue();
                    for(var key in query){
                        if(query[key] == 0 || query[key] == ""){
                            delete query[key];
						};
                    }
                    var queryArray = JSON.stringify(query);
					if(EUI.getCmp(x.options.tableId) != undefined){
                        EUI.getCmp(x.options.tableId).setPostParams({
                            "keyWord":"",
                            "query":queryArray
                        },true);
					}

                    x.closeSearchWin();
                }
            });
            $("#detail_query").live("click", function() {
                x.openSearchWin();
            });
		},
		/**显示高级查询弹窗**/
		openSearchWin:function(){
			$(".blackCom").show();
			$(".common_search").show();
		},
		/**关闭弹窗**/
		closeSearchWin:function(){
			$(".blackCom").hide();
			$(".common_search").hide();
		},
		/**重构样式**/
		setCssStyle:function(){
			$(".ux-field-label span").css({
	            "float": "none",
	            "margin-right": "10px"
	        });
			$(".ux-field-element").css({
				"border-radius":"4px",
				"height":"36px",
				"line-height":"36px"
			})
			$(".ux-tooltip").css({
				"z-index":"9999"
			});
			$(".ux-list").css({
				"z-index":"10000"
			});
			$(".ux-field .ux-field-text").css({
				"font-size":"14px",
				"color":"#999"
			});
		},
		/**添加按钮**/
		setBtnDoms:function(){
			var x = this;
			var htmls = '<div class="search_btns_box fr">';
			htmls += '<div id="reset_s_btn" class="h_search_btns go_reset fl">清空</div>';
			htmls += '	<div id="'+x.options.submitId+'" class="h_search_btns go_search fl">查询</div>';
			htmls += '	</div>';
			$(".common_search").append(htmls);
			
		},
		getFormValue:function(){
			return EUI.getCmp(this.options.id).getValue();
		},
		moveWindow:function(){
            var moveDiv = document.getElementById("update_title");
            var changeMoveDiv = document.getElementById("common_search");
            moveDiv.onmousedown = function (evt) {
                var oEvent = evt || event;
                var distanceX = oEvent.clientX - changeMoveDiv.offsetLeft;
                var distanceY = oEvent.clientY - changeMoveDiv.offsetTop;
                var sHeight = parseFloat($(".common_search").css("height")) / 2;
                var sWidth = parseInt($(".common_search").css("width")) / 2;
                // alert(oEvent.clientX);
                document.onmousemove = function (evt) {
                    var oEvent = evt || event;
                    //重新计算div的left top值
                    var left = oEvent.clientX - distanceX;
                    var top = oEvent.clientY - distanceY;
                    if (left <= 0) {
                        left = 0;
                    }
                    else if (left >= document.documentElement.clientWidth - changeMoveDiv.offsetWidth) {
                        left = document.documentElement.clientWidth - changeMoveDiv.offsetWidth;
                    }
                    if (top <= 0) {
                        top = 0;
                    }
                    else if (top >= document.documentElement.clientHeight - changeMoveDiv.offsetHeight) {
                        top = document.documentElement.clientHeight - changeMoveDiv.offsetHeight;
                    }
                    // console.log(top);
                    changeMoveDiv.style.top = (top+sHeight) + "px";
                    changeMoveDiv.style.left = (left+sWidth) + "px";
                }
                moveDiv.onmouseup = function () {
                    document.onmousemove = null;
                    moveDiv.onmouseup = null;
                }
            }
		}
	}
	window.showSearchWin = showSearchWin;
})(window, document);