var USER = {
	params:{
		checkEmty:function(val,msg,id){
			if(val == "" || val == null){
				if(id){
					$("#"+id).text(msg+"不能为空")
				}else{
					layer.open({content:msg+"不能为空",skin: 'msg',time: 2});
				}
				return false;
			}return true;

		},
		checkPhone:function(phone,id){
			if(!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(phone))){
				//手机号格式不对
				if(id){
					$("#"+id).text("手机号码格式不对")
				}else{
					layer.open({content:"手机号码格式不对",skin: 'msg',time: 2});
				}
				return false;		
			}return true;
		},
		fliterPhone:function(phone){
			if(phone && phone.length >= 11){
				return phone.substring(0,7) + "****";
			}
		},
		getRandomNum:function(Min,Max){//生成随机整数
			var Range = Max - Min;   
			var Rand = Math.random();   
			return(Min + Math.round(Rand * Range));   
		},
		sex:function(sex){
			if(sex == 1){
				return "男";
			}else if(sex == 2){
				return "女";
			}else{
				return "未设置";
			}
		},
		reDate:function(dateStr){//替换日期格式
			if(dateStr != null && dateStr != ""){
				return dateStr.replace(/\//g,'-');
			}else{
				return dateStr;
			}
		},
		translateDate:function(dateStr){//时间戳转化成时间h m s 
			var date = new Date(dateStr*1000);//如果date为10位不需要乘1000
		    var Y = date.getFullYear() + '-';
		    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
		    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
		    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
		    return M+D;
		},
		desDate:function(dateStr){//时间戳与当前时间戳 相减  返回小时
			var dateNow = Date.parse(new Date());
			var total = parseInt(dateNow) - parseInt(dateStr+'000');			
			var hour = parseInt(total/(60*60*1000));//计算整数小时数
			var min = parseInt(total/(60*1000));//计算整数小时数
			if(min <= 2){
				return "刚刚";
			}
			if(min < 60){
				return min+"分钟前";
			}
			if(hour < 24){
				return hour+"小时前";
			}
			if(hour >= 24 && hour <= 168){
				return Math.floor(hour/24) + "天前";
			}
			if(hour > 168){
				return USER.params.translateDate(dateStr)
			}
			
		}
	},
	save:function(userObj){
		localStorage.setItem("uid",userObj.uid);
		localStorage.setItem("username",userObj.nickname);
		localStorage.setItem("sex",userObj.sex);
		localStorage.setItem("userImgUrl",userObj.avatar);
		return;
	},
	del:function(){
		localStorage.setItem("uid","");
		localStorage.setItem("username","");
		localStorage.setItem("sex","");
		localStorage.setItem("userImgUrl","");
		return;
	},
	ifLogin:function(){
		var uid = localStorage.getItem("uid");
		if(uid == undefined || uid == "" || uid == null ){
			return false;
		}return true;
	},
	img:{
		sexIcon:{
			man:"/Static/images/v1.0/info/user/user_sex_man.png",
			women:"/Static/images/v1.0/info/user/user_sex_women.png"
		},
		default_head:"/Static/images/v1.0/info/user/user_default.png",
		default_head_pl:"/Static/images/v1.0/info/user/user_default_pl.png"
	},
	headImg:function(userImgUrl){
		if(userImgUrl == null || userImgUrl == "" || userImgUrl == undefined){
			return USER.img.default_head_pl;
		}else{
			return userImgUrl;
		}
	},	
	hrefUrl:{
		login:"user_login.html",
		userinfo:"user_info.html",
		baseinfo:"user_baseInfo.html",
		findpass:"user_findPassword.html",
		index:"user_index.html",
		setting:"user_setting.html",
		changepass:"user_chanagePassword.html",
		about:"user_about.html",
		collection:"user_collection.html",
		message:"user_message.html",
		commented:"comment.html"
	},
	brower:{
		    
	},
	router:function(router){
		switch (router){
			case "index":
				return "user_index.html";
				break;
			case "info":
				return "user_info.html";
				break;
			case "setting":
				return "user_setting.html";
				break;
			case "collect":
				return "user_collection.html";
				break;
			case "message":
				return "user_message.html";
				break;
			default:
				return "user_index.html";
				break;
		}
	}
}
var pullDown = function(moveobj, targetobj, offset, bounce, callback) {
        var offset = offset || $("#refresh").height();
        var start,
            end,
            a = bounce || 2,
            isCanDo = false, //是否移动滑块
            isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
            hasTouch = 'ontouchstart' in window && !isTouchPad;
        moveobj = $(moveobj),
            // targetobj = $("[class=id_"+targetobj+"]");
            targetobj = $(targetobj)
        /*操作方法*/
        var fn = {
            isLock: false, //是否锁定整个操作
            //移动容器
            translate: function(diff) {
                moveobj.css({
                    "-webkit-transform": "translate(0," + diff + "px) translateZ(0px)",
                    "transform": "translate(0," + diff + "px) translateZ(0px)"
                });
            },
            transitiontime: function() {
                moveobj.css({
                    "-webkit-transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)",
                    "transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)",
                });
            },
            //设置效果时间
            setTranslition: function(dura) {
                moveobj.css({
                    "transition-duration": dura,
                    "-webkit-transition-duration": dura
                });
            },
            //返回到初始位置
            back: function(refresh) {
                if (refresh) {
                    var date = new Date();
                    var hours = date.getHours()<10?"0"+date.getHours():date.getHours()
                    var mint = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes()
                    var s = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds()
                    var timestr = hours+":"+mint+":"+s
                    $(".pull_time").text(timestr);
                }
                fn.setTranslition("300ms");
                fn.translate(0);
                //标识操作完成
                fn.isLock = false;
            }
        };
        fn.transitiontime();
        fn.translate(0);
        //滑动开始
        targetobj.on("touchstart", function(e) {
            if ($(this).scrollTop() <= 0 && !fn.isLock) {
                var even = e || window.event;
                //标识操作进行中
                fn.isLock = true;
                isCanDo = true;
                //保存当前鼠标Y坐标
                start = hasTouch ? even.targetTouches[0].pageY : even.pageY;
                end = start;
                //消除滑块动画时间
                fn.setTranslition("0ms");
            }
        });
        //滑动中
        targetobj.on("touchmove", function(e) {
            if ($(this).scrollTop() <= 0 && isCanDo) {
                var even = e || window.event;
                //保存当前鼠标Y坐标
                end = hasTouch ? even.targetTouches[0].pageY : even.pageY;
                if (start < end) {
                    even.preventDefault();
                    //消除滑块动画时间
                    fn.setTranslition("0ms");
                    //移动滑块
                    fn.translate((end - start) / a);
                    if ((end - start) / a >= offset) {
                        $(".pull_txt").text("松开立即刷新");
                    } else {
                        $(".pull_txt").text("下拉即可刷新");
                    }

                }

            }
        });

        //滑动结束
        targetobj.on("touchend", function(e) {
            if (isCanDo) {
                isCanDo = false;
                //判断滑动距离是否大于等于指定值
                if ((end - start) / a >= offset) {
                    //设置滑块回弹时间
                    fn.setTranslition('300ms');
                    //保留提示部分
                    $(".pull_txt").text("载入中...");
                    fn.translate(offset);
                    var onefn = function() {
                        $(this).off("transitionend webkitTransitionEnd MSTransitionEnd oTransitionEnd", onefn);
                        //执行回调函数
                        if (callback && typeof callback == "function") {
                            callback.call(fn, e);
                        } else {
                            fn.back();
                        }
                    }
                    moveobj.on("transitionend webkitTransitionEnd MSTransitionEnd oTransitionEnd", onefn);
                } else {
                    //返回初始状态
                    fn.back();
                }
            }
        });
    }









