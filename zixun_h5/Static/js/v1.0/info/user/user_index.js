$(function(){
	getUserInfo();
	initPage();
	initEvent();
})
//初始化界面 根据 用户是否登录 展示
function initPage(){	
	if(USER.ifLogin()){//已登录
		$("#username").show();
		$("#tologin").hide();
		$(".za-unlogin-btn").show();						
	}else{//未登录
		$("#username").hide();
		$("#tologin").show();
		$(".za-unlogin-btn").hide();
	}
}
//获取用户信息
function getUserInfo(){
	var res = HCCP.ajax.get('/iation/haocai/userInfo');
	if(res && res.code == 200){
		var userImgUrl = (localStorage.userImgUrl == "" || localStorage.userImgUrl == 'undefined')?USER.img.default_head:localStorage.userImgUrl;
		$("#userimg").attr("src",userImgUrl);//用户头像		
		if(res.data.sex == "1"){//性别图标
			$("#imgsrc").attr("src",USER.img.sexIcon.man);
		}
		if(res.data.sex == "2"){
			$("#imgsrc").attr("src",USER.img.sexIcon.women);
		}
		if(res.data.sex == "0"){
			$("#imgsrc").hide();
		}
		$("#username_span").text(res.data.nickname);//姓名昵称
		//判断用户有多少消息  usermsg
		var count = res.data.mes_count;
		if(count == 0){
			$("#usermsg").hide();return;
		}else if(count != 0 && count < 10){
			$("#usermsg").attr("class","za-massage-badge-1");
			$("#usermsg").empty().text(count);
			$("#usermsg").show();return;
		}else if(count > 10 && count < 100){
			$("#usermsg").attr("class","za-massage-badge-2");
			$("#usermsg").empty().text(count);
			$("#usermsg").show();return;
		}else{
			$("#usermsg").attr("class","za-massage-badge-2");
			$("#usermsg").empty().text("99+");
			$("#usermsg").show();return;
		}		
	}else if(res && res.code == 401){
		//登录已经失效  跳转登录界面
//		window.location.href = USER.hrefUrl.login + "?router=index";return;
		localStorage.setItem("uid","");
	}
}
//初始化 元素事件监听
function initEvent(){
	//跳直播
    $(".go_live").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        HCCP.FUNC.go(URL_ZIXUN_LIVE)
    });
    
    //跳首页
    $(".go_index").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        HCCP.FUNC.go("../")
    });
    //跳世界杯
    $(".go_world").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        HCCP.FUNC.go("../worldcup/index.html")
    });
	
	//点击用户登录
	$("#tologin").click(function(){
	    window.location.href = USER.hrefUrl.login;
		return;
	})
	//用户头像 昵称点击
	$(".za-user-header-wrap").click(function(){		
		if(USER.ifLogin()){
			//跳转用户信息 页面
			window.location.href = USER.hrefUrl.userinfo;
		}else{
			//跳转登录界面
			window.location.href = USER.hrefUrl.login;
		}
	})
	//点击退出登录
	$(".za-unlogin-btn").click(function(){
	    //询问框
		layer.open({
		    content: '您确定要退出登录吗？',btn: ['确定', '取消']
		    ,yes: function(index){
		    	$("#username").hide();
				$("#tologin").show();
				$(".za-unlogin-btn").hide();
			    $("#userimg").attr("src",USER.img.default_head);//默认用户头像
			    USER.del();//删除用户
			    var res = HCCP.ajax.get("/iation/haocai/layOut");
			    layer.closeAll();
		    }
		});	    
	})
	$(".za-unlogin-btn").on("touchstart",function(){
		$(this).css("background","#e76666");
	})
	$(".za-unlogin-btn").on("touchend",function(){
		$(this).css("background","#FD8237 ");
	})
	//消息 收藏 设置
	$(".mui-table-view li").click(function(){
		if(!USER.ifLogin()){//跳转登录界面
			window.location.href = USER.hrefUrl.login + "?router=index";
			return;
		}
		var index = $(this).index();
		switch(index){
            case 0 :
                window.location.href = USER.hrefUrl.message;
                break;
            case 1 :
                window.location.href = USER.hrefUrl.collection;
                break;
            case 2 :
                window.location.href = USER.hrefUrl.setting;
                break;           
        }
	})	
}