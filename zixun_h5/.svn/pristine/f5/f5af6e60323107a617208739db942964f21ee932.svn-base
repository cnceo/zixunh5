var end = "";
var isEnd = false;//判断 时间 是否截止
var user_id = "";
var hasFuhuo = false;//用户是否复活

$(function(){
	//修改当前链接给分享使用    		
	var user = HCCP.FUNC.getUrlParam("user");
	var uid = HCCP.FUNC.getUrlParam("uid");
	var username = HCCP.FUNC.getUrlParam("uname");
	var imgUrl = HCCP.FUNC.getUrlParam("imgUrl");
	user_id = uid;	
	isReset(uid);//是否复活	
	var nowtime = HCCP.FUNC.getUrlParam("nowtime");
	$(".za-share-header img").attr("src",imgUrl)
	$(".za-share-header p").text(username)	
	if(user == "own"){//主用户 进入界面
		$(".za-footer-warp").hide();//隐藏 我也要参与
		if(hasFuhuo){//复活成功
			$(".za-share-footer p").text("");
			$(".za-share-footer p").css("height","0.1rem")
			$("#z-btn").attr("class","fuhuo-s");			
		}		
		var stateObject = {};
		var title = "助力好友";
		var newUrl = "/worldcup/cg_share.html?user=other&type=fuhuo&uid="+uid+"&nowtime="+nowtime+"&uname="+username+"&imgUrl="+imgUrl;
		//替换当前URL 不放入历史记录	
		window.history.replaceState(stateObject,title,newUrl);						
	}else{//其他用户 进入
		$(".za-share-footer p").text("");	
		$(".za-share-footer p").css("height","0.1rem")
		//这里要  查询该用户 是否 复活成功  判断是否截止
		if(hasFuhuo){//此用户 已经 复活
			$('#z-btn').css("height","0.4rem");			
			$("#z-btn").attr("class","fuhuo-ed");			
		}else if(!hasFuhuo && isEnd){
			$("#z-btn").attr("class","fuhuo-f");
		}else{
			$("#z-btn").attr("class","help");
		}
		//设置截止时间戳
		var endDate = new Date(parseInt(nowtime));
		endDate.setHours(endDate.getHours() + 12)
		end = endDate;
		setInterval(function(){
			countTime(endDate)
		},1000)
	}  	
	initEvent();
})
//判断用户 是否 复活成功
function isReset(uid){
	var res = HCCP.ajax.post("/iation/worldcup/isReset",{
		"user_id":uid
	});
	console.log(JSON.stringify(res));
	if(res && res.code == 200){//复活成功
		hasFuhuo = true;
	}else{
		hasFuhuo = false;
	}
}
function initEvent(){
	//点击  帮他一把
	$(".help").click(function(){
		layer.open({
		    content: '新人注册成功即可帮他助力'
		    ,btn: '马上注册',
		    yes:function(index){
		    	window.location.href =  "../user/user_register.html?router=detail"+"&url="+encodeURIComponent(window.location.href)+"&type=fuhuo&uid="+user_id;
		    }
		});
	})
	//点击 立即邀请
	$(".yaoqing").click(function(){
		if(isWeiXin()) {
			$("#opemt").attr("class", "za-opemt-weixin");
		} else {
			$("#opemt").attr("class", "za-opemt");
		}
		$("#opemt").show()
	})
	//遮盖层点击
	$("#opemt").click(function() {
		$("#opemt").hide()
	})
	//我也要参与
	$(".za-footer-warp").click(function(){
		window.location.href = "cg_index.html";
	})
}
//判断是否为微信内置浏览器
function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	console.log(ua); //mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
	if(ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}

//倒计时定时器
function countTime(end) {  
    //获取当前时间戳  
    var now = Date.parse(new Date());
    //设置截止时间戳  
//  var str="2018/06/22 00:00:00";
//  var end = Date.parse(new Date(str));             
    //时间差  
    var leftTime = end - now; 
    //定义变量 d,h,m,s保存倒计时的时间  
    var h,m,s;
    var h1,h2,m1,m2,s1,s2;  
    if (leftTime>=0) {   
        h = Math.floor(leftTime/1000/60/60); 
		if(h >= 10){
			h1 = h.toString().substring(0,1);
			h2 = h.toString().substr(1)
		}else{
			h1 = '0';
			h2 = h;
		}
		m = Math.floor(leftTime/1000/60%60);
		if(m >= 10){
			m1 = m.toString().substring(0,1);
			m2 = m.toString().substr(1)
		}else{
			m1 = '0';
			m2 = m;
		}	              
        s = Math.floor(leftTime/1000%60);
        if(s >= 10){
			s1 = s.toString().substring(0,1);
			s2 = s.toString().substr(1)
		}else{
			s1 = '0';
			s2 = s;
		}
		//将倒计时赋值到div中  
        document.getElementById("_h1").innerHTML = h1;
        document.getElementById("_h2").innerHTML = h2;
        document.getElementById("_m1").innerHTML = m1;  
        document.getElementById("_m2").innerHTML = m2;
        document.getElementById("_s1").innerHTML = s1;
        document.getElementById("_s2").innerHTML = s2;
    }else{//时间 截止了
    	isEnd = true;
    }
    //递归每秒调用countTime方法，显示动态时间效果  
//  setTimeout(countTime(end),1000);     
}
