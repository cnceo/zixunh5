var p_flag = true;//播放标志
var all = {
	data:{
		page:1,
		num:5,
		isMore:true
	}
}
//取出看过的文章储存的cookie id
var zanCookie = HCCP.dataS.cookie.get("zanId");
$(function(){
	//initVideo();
	$("#opemt").css("height",document.documentElement.clientWidth*667/375+"px")
	initEvent();
	queryList();
})

function initEvent(){
	$("#goback").click(function(){
		window.history.go(-1);
	})
	pullDown(".content_wrap", ".content_inner", '', 2.5, function(e) { //绑定下拉刷新事件 		
	    all.data.page = 1;
	    all.data.isMore = true;
	    $("#content").html('');
	    queryList();
	    this.back(1);
	    return;
    })
	$(".content_inner").on('scroll', scroll_);
	//遮盖层点击
	$("#opemt").click(function(){
		$("#opemt").hide()
	})
}

function initVideo(){
	var video = document.getElementById("videoBtn")
	video.onpause = function(){
		p_flag = true;
		video.controls=false;
    	video.style.height = "0px";		
    }
	video.onplay = function(){
		p_flag = false;
		video.controls=true;
    	video.style.height = "300px";
	}
}
function queryList(){
	var res = HCCP.ajax.get("/iation/worldcup/TogetherList",{
		page :all.data.page,
		num : all.data.num
	})
	console.log(JSON.stringify(res))
	if(res && res.code == 200 && res.data.length < 5 && all.data.page == 1){//第一次 就加载完成
		createHtml(res.data);
		all.data.isMore = false;
		return;
	}else if(res && res.code == 200 && res.data.length < 5 && all.data.page > 1){//分页 加载完成
		createHtml(res.data);
		all.data.isMore = false;
		return;
	}else if(res && res.code == 200){
		createHtml(res.data);
		all.data.page++;
	}else if(res){
		layer.open({content:res.message,skin:'msg',time:3})
	}
}
function createHtml(obj){
	var html = "";
	for(var i = 0;i<obj.length;i++){
		var data = obj[i];
//		var sj_number = USER.params.getRandomNum(1000000,99999999);
		var sj_number = data.id;
		var zan_af = inCookies(data.id) ? 'za-content-zan-ed' : 'za-content-zan';//是否被点赞过的样式控制
		var zan_af_p = inCookies(data.id) ? 'zan-z-color' : '';
		html += "<div class='za-content-warp'><div id='bg_"+sj_number+"' class='za-content-bg' style='background-image: url("+data.img_url+");'";
		html += "onclick=\"gotoPlay('"+sj_number+"','"+data.id+"','"+data.img_url+"','"+data.video_url+"','"+data.title+"','"+data.hit_num+"','"+data.like_num+"');\">";
		html += "<img src='/Static/images/v1.0/worldcup/lx_play.png' />";
		html += "<video id='video_"+sj_number+"' controls='controls' src="+data.video_url+"></video></div>";
		html += "<h4 class='mui-ellipsis-2'>"+data.title+"</h4>";
		html += "<div class='mui-row'><div class='mui-col-xs-4'><p id='hit_num_"+sj_number+"'>播放量"+data.hit_num+"</p></div>";
		html += "<div class='mui-col-xs-8'><div id='zan_"+sj_number+"' onclick='doZan("+sj_number+","+data.id+");' class='"+zan_af+"'></div><p class='"+zan_af_p+"' id='zan_p_"+sj_number+"'>"+data.like_num+"</p></div>";
//		html += "<div class='mui-col-xs-4' onclick=\"doShare('"+data.title+"','"+data.video_url+"','"+data.img_url+"');\"><div class='za-content-share'></div><p>分享</p></div></div></div>";
		html += "</div></div>";
	}
	$("#content").append(html)
}
function gotoPlay(vid,_id,img_url,video_url,title,hit_num,like_num){	
//	var video = document.getElementById("video_"+vid)
//	var bg = document.getElementById("bg_"+vid);
//	bg.style.backgroundImage = "none";
//	video.style.zIndex = "99999";
//	video.play(); 
//	var res = HCCP.ajax.get("/iation/worldcup/TogetherHit",{
//		id:parseInt(_id)
//	})
	window.location.href = "lx_play.html?id="+_id+"&img_url="+img_url+"&video_url="+video_url+"&title="+title+"&hit_num="+hit_num+"&like_num="+like_num;
}
function doZan(sid,_id){
	if(zanCookie){
        if(!inCookies(_id)){//没有被点击过
            zanCookie = _id+","+zanCookie;
            HCCP.dataS.cookie.set("zanId",zanCookie,"d30",document.domain.slice(2))            
            $("#zan_"+sid).attr('class',"za-content-zan-ed");
			$("#zan_p_"+sid).addClass("zan-z-color");
			$("#zan_p_"+sid).text(parseInt($("#zan_p_"+sid).text())+1);		
			var res = HCCP.ajax.get("/iation/worldcup/TogetherLike",{
				id : parseInt(_id)
			})
			console.log(JSON.stringify(res))            
        }
    }else{//没有被点击过
    	$("#zan_"+sid).attr('class',"za-content-zan-ed");
		$("#zan_p_"+sid).addClass("zan-z-color");
		$("#zan_p_"+sid).text(parseInt($("#zan_p_"+sid).text())+1);		
		var res = HCCP.ajax.get("/iation/worldcup/TogetherLike",{
			id : parseInt(_id)
		})
		console.log(JSON.stringify(res))
        zanCookie = _id;
        HCCP.dataS.cookie.set("zanId",_id,"d30",document.domain.slice(2))
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
function doShare(title,url,imgurl){
	var config = {};
	config.title = title;
	config.url = url;
	config.desc = title;
	config.img = imgurl;
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

function scroll_(){
	var nScrollHight = 0; // 滚动距离总长(注意不是滚动条的长度)
	var nScrollTop = 0; // 滚动到的当前位置
	//document.getElementsByClassName("content-warp")[0].style.height = window.innerHeight-44 + "px";
	var nDivHight = $(".content_inner").height();	
	nScrollHight = $(this)[0].scrollHeight;
	nScrollTop = $(this)[0].scrollTop;
	if(nScrollTop + nDivHight >= nScrollHight-2){
		console.log('is botom')
		if(all.data.isMore){
			queryList();
		}
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