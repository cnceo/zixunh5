var vdata = {
	id:"",
	video_url:"",
	title:"",
	img_url:""
}
//取出看过的文章储存的cookie id
var zanCookie = HCCP.dataS.cookie.get("zanId");
$(function(){
	initPage();
	initEvent();
})
function initPage(){
	var id = HCCP.FUNC.getUrlParam("id");
	var img_url = HCCP.FUNC.getUrlParam("img_url");
	var video_url = HCCP.FUNC.getUrlParam("video_url");
	var title = HCCP.FUNC.getUrlParam("title");
	var hit_num = HCCP.FUNC.getUrlParam("hit_num");
	var like_num = HCCP.FUNC.getUrlParam("like_num");
	
	vdata.id = id;
	vdata.video_url = video_url;
	vdata.img_url = img_url;
	vdata.title = title;
	
	$("#bg_11").css("background-image","url("+img_url+")");
	$("#video_11").attr("src",video_url)
	$("#v_title").text(title);
	$("#v_hitnum").text("播放量"+hit_num);
	$("#v_zannum").text(like_num);
	//根据cookie 判断是否已经点赞 过
	var zan_af = inCookies(id) ? 'za-content-zan-ed' : 'za-content-zan';//是否被点赞过的样式控制
	var zan_af_p = inCookies(id) ? 'zan-z-color' : '';
	$("#v_zanicon").attr("class",zan_af);
	$("#v_zannum").attr("class",zan_af_p);
}
function initEvent(){
	$("#goback").click(function(){
		window.history.go(-1);
	})	
	//遮盖层点击
	$("#opemt").click(function(){
		$("#opemt").hide()
	})
	//点击播放
	$("#bg_11").click(function(){
		var video = document.getElementById("video_11")
		var bg = document.getElementById("bg_11");
		bg.style.backgroundImage = "none";
		video.style.zIndex = "999";
		video.play(); 
		var res = HCCP.ajax.get("/iation/worldcup/TogetherHit",{
			id:parseInt(vdata.id)
		})
	})
	//dianzan点赞
	$("#v_zanicon").click(function(){
		if(zanCookie){
	        if(!inCookies(vdata.id)){//没有被点击过
	            zanCookie = vdata.id+","+zanCookie;
	            HCCP.dataS.cookie.set("zanId",zanCookie,"d30",document.domain.slice(2))            
	            $("#v_zanicon").attr('class',"za-content-zan-ed");
				$("#v_zannum").addClass("zan-z-color");
				$("#v_zannum").text(parseInt($("#v_zannum").text())+1);		
				var res = HCCP.ajax.get("/iation/worldcup/TogetherLike",{
					id : parseInt(vdata.id)
				})
				console.log(JSON.stringify(res))            
	        }
	    }else{//没有被点击过
	    	$("#v_zanicon").attr('class',"za-content-zan-ed");
			$("#v_zannum").addClass("zan-z-color");
			$("#v_zannum").text(parseInt($("#v_zannum").text())+1);		
			var res = HCCP.ajax.get("/iation/worldcup/TogetherLike",{
				id : parseInt(vdata.id)
			})
			console.log(JSON.stringify(res))
	        zanCookie = vdata.id;
	        HCCP.dataS.cookie.set("zanId",vdata.id,"d30",document.domain.slice(2))
	    }
	})
}
function doShare(){
	var config = {};
	config.title = vdata.title;
	config.url = vdata.video_url;
	config.desc = vdata.title;
	config.img = vdata.img_url;
	var share_obj = new nativeShare(config);
	var modalBool = share_obj.bool;
	if(modalBool){
		//layer.open({content:'浏览器暂不支持分享',skin:'msg',time:3})	
		if(isWeiXin()){
			$("#opemt").attr("class","za-opemt-weixin");
		}else{
			$("#opemt").attr("class","za-opemt");
		}
		$("#opemt").show()
	}else{
		share_obj.share("weixin")
	}		
}
//是否被点赞过
function inCookies(id){
    var b = false
    if(zanCookie){
        try{
            var arr = zanCookie.split(",");
            var index = $.inArray(id.toString(),arr);
            if(index!=-1){b = true};
            return b
        }catch(e){
            return b
        }
    }else{
        return b
    }
}
//判断是否为微信内置浏览器
function isWeiXin(){
	var ua = window.navigator.userAgent.toLowerCase();
	console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}
