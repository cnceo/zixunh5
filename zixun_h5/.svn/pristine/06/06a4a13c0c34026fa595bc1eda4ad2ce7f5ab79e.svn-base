var cpage = {
	zan : 1,
	pl : 1,
	xt : 1
};
var clickLoad = {
	pl:true,
	xt:true,
	zan:true
}
var indexPage = 0;//当前是 哪个页面  赞0、评论1、系统2

(function(mui) {
	mui('.mui-scroll-wrapper').scroll({
		indicators: false //是否显示滚动条
	});
	var item1 = document.getElementById("item1mobile");
	var item2 = document.getElementById('item2mobile');
	var item3 = document.getElementById('item3mobile');
	var bottomline = "<div class='za-bottom-red-line'><span></span></div>";
	document.getElementById('slider').addEventListener('slide', function(e) {		
		setTimeout(function(){
			$(".za-bottom-red-line").remove();
		    $(".mui-control-item.mui-active").append(bottomline);
		},100)	
		if (e.detail.slideNumber === 0) {//点赞 消息
			sessionStorage.indexPage = 0;
			if(clickLoad.zan == true){
				$("#zan-content").prepend(queryZanMsg())//查询点赞消息
				clickLoad.zan = false;
			}
		}
		else if (e.detail.slideNumber === 1) {//【评论消息
			sessionStorage.indexPage = 1;
			if(clickLoad.pl == true){
				$("#pl-content").prepend(queryPLMsg())
				clickLoad.pl = false;			
			}			
//			if(IFsessionStorage(sessionStorage.pllist_html)){
//				$("#pl-content").empty().prepend(sessionStorage.pllist_html)
//			}else{
//				$("#pl-content").prepend(queryPLMsg())
//				var html_list = document.getElementById("pl-content").innerHTML;
//				sessionStorage.pllist_html = html_list;
//			}
		} else if (e.detail.slideNumber === 2) {//系统消息
			sessionStorage.indexPage = 2;
			if(clickLoad.xt == true){
				$("#xt-content").prepend(queryXTMsg())
				clickLoad.xt = false;			
			}	
//			if(IFsessionStorage(sessionStorage.xtlist_html)){
//				$("#xt-content").empty().prepend(sessionStorage.xtlist_html)
//			}else{
//				$("#xt-content").empty().prepend(queryXTMsg())
//				var html_list = document.getElementById("xt-content").innerHTML;
//				sessionStorage.xtlist_html = html_list;
//			}
		}
			
	});
})(mui);

$(function(){
	initEvent();
	if(IFsessionStorage(sessionStorage.indexPage)){
		if(sessionStorage.indexPage == 0){
			firstLoad();
		}else{
			var slider = mui('#slider').slider();
			slider.gotoItem(sessionStorage.indexPage,0);//滚动到 上次用户当前的tab 0位无滑动效果
		}		
	}else{		
		sessionStorage.indexPage = 0;
		firstLoad();
	}		
})
//判断缓存不为空的函数
function IFsessionStorage(o){
	if(o != "" && o != null && o != undefined){
		return true;
	}return false;
}
//首次进入界面 加载数据
function firstLoad(){
	$("#zan-content").html('').prepend(queryZanMsg())//查询点赞消息
//	var html_list = document.getElementById("zan-content").innerHTML;
//	sessionStorage.zanlist_html = html_list;
}
function initEvent(){
	//绑定下拉刷新事件mui-slider-item mui-control-content mui-active  item1mobile
//  pullDown(".mui-slider-group", ".mui-slider-group", '', 2.5, function(e) { //绑定下拉刷新事件
    pullDown("#item1mobile", "#item1mobile", '', 2.5, function(e) { //绑定下拉刷新事件
        //这里不用异步，会有问题改为同步
        $("#zan-content").prepend(queryZanMsg());
//      var html_list = document.getElementById("zan-content").innerHTML;
//		sessionStorage.zanlist_html = html_list;
	    this.back(1);
	    return;
    })
    pullDown("#item2mobile", "#item2mobile", '', 2.5, function(e) { //绑定下拉刷新事件 		
        $("#pl-content").prepend(queryPLMsg());
//      var html_list = document.getElementById("pl-content").innerHTML;
//		sessionStorage.pllist_html = html_list;
	    this.back(1);
	    return;
    })
    pullDown("#item3mobile", "#item3mobile", '', 2.5, function(e) { //绑定下拉刷新事件
		$("#xt-content").prepend(queryXTMsg())
//		var html_list = document.getElementById("xt-content").innerHTML;
//		sessionStorage.xtlist_html = html_list;
	    this.back(1);
	    return;
    })
}
//(点赞消息1，评论消息2 ,系统消息3,
function queryZanMsg(){
	var res = HCCP.ajax.get("/iation/haocai/message/notification",{
		"uid":localStorage.uid,
		"type":1,
		"page":cpage.zan
	})
	console.log(JSON.stringify(res))
	if(res && res.code == 200){
    	if(res.data.data.length == 0 && cpage.zan == 1){//没有 点赞 数据
    		$("#zan-content").empty();
    		$("#scroll1>.mui-scroll>center").show();
    		return null;
    	}else{
    		var obj = res.data.data;
    		cpage.zan++;
    		changePinglun(res);
    		return createZanHtml(obj);
    	}
    }else if(res && res.code == 401){
    	//登录失效
    	window.location.href = USER.hrefUrl.login+"?router=message";
    	return null;
    }else if(res){
      	HCCP.modal.alert({
            msg:res.message
        })
      	return null;
    }	
}
//更改评论图标数量
function changePinglun(res){
	//评论数量图标
	if(res.data.mes_count.reply > 0){
		$("#usermsg").text(res.data.mes_count.reply);
		$("#usermsg").show();
		if(res.data.mes_count.reply >= 10){
			$("#usermsg").removeClass("za-massage-badge-1").addClass("za-massage-badge-2");
		}
		if(res.data.mes_count.reply > 99){
			$("#usermsg").text("99+");
		}
	}else{
		$("#usermsg").hide();
	}
}
function createZanHtml(obj){
	var html = "";
	for(var i=0;i<obj.length;i++){
		var data = obj[i];
		var avatar = data.avatar == "" ? USER.img.default_head : data.avatar;
		html += "<li onclick='gotoDetail("+data.article_id+","+data.reply_id+");' class='mui-table-view-cell mui-media'><a>";
		html += "<img class='mui-media-object mui-pull-left' src='"+avatar+"'>";
		html += "<div class='mui-media-body'><h4 class='mui-ellipsis'>"+data.nickname+"</h4>";
		html += "<p class='mui-ellipsis'><strong>赞了您的评论：</strong>"+data.content+"</p>";
		html += "<span >"+data.created_at+"</span></div></a></li>";
	}	
	return html;
}
//跳转评论详情页
function gotoDetail(article_id,cid){
	window.location.href = "commentDetail.html?articleId="+article_id+"&parentId="+cid+"&userid="+cid;
}

//评论 列表
function queryPLMsg(){
	var res = HCCP.ajax.get("/iation/haocai/message/notification",{
		"uid":localStorage.uid,
		"type":2,
		"page":cpage.pl
	})
	console.log(JSON.stringify(res))
	if(res && res.code == 200){
    	if(res.data.data.length == 0 && cpage.pl == 1){//没有 点赞 数据
    		$("#pl-content").empty();
    		$("#scroll2>.mui-scroll>center").show();
    		return null;
    	}else{
    		var obj = res.data.data;
    		cpage.pl++;
    		changePinglun(res);
    		return createPLHtml(obj);
    	}
    }else if(res && res.code == 401){
    	//登录失效
    	window.location.href = USER.hrefUrl.login+"?router=message";
    	return null;
    }else if(res){
      	HCCP.modal.alert({
            msg:res.message
        })
      	return null;
    }	
}
function createPLHtml(obj){
	var html = "";
	for(var i=0;i<obj.length;i++){
		var data = obj[i];	
		var avatar = data.avatar == "" ? USER.img.default_head : data.avatar;
		html += "<li onclick='gotoDetail("+data.article_id+","+data.parent_id+");' class='mui-table-view-cell mui-media'><a>";
		html += "<img class='mui-media-object mui-pull-left' src='"+avatar+"'>";
		html += "<div class='mui-media-body'><h4 class='mui-ellipsis'>"+data.nickname+"</h4>";
		html += "<p class='mui-ellipsis'><strong>回复您的评论：</strong>"+data.content+"</p>";
		html += "<span >"+data.created_at+"</span></div></a></li>";
	}
	return html;
}
//系统消息
function queryXTMsg(){
	var res = HCCP.ajax.get("/iation/haocai/message/notification",{
		"uid":localStorage.uid,
		"type":3,
		"page":cpage.xt
	})
	console.log(JSON.stringify(res))
	if(res && res.code == 200){
    	if(res.data.data.length == 0 && cpage.xt == 1){//没有 点赞 数据
    		$("#xt-content").empty();
    		$("#scroll3>.mui-scroll>center").show();
    		return null;
    	}else{
    		var obj = res.data.data;
    		cpage.xt++;
    		return createXTHtml(obj);
    	}
    }else if(res && res.code == 401){
    	//登录失效
    	window.location.href = USER.hrefUrl.login+"?router=message";
    	return null;
    }else if(res){
      	HCCP.modal.alert({
            msg:res.message
        })
      	return null;
    }	
}
function createXTHtml(obj){
	var html = "";
	for(var i=0;i<obj.length;i++){
		var data = obj[i];	
		html += "<div class='za-xt-li'>";
		html += "<h4>"+data.title+"</h4>";
		html += "<span>"+data.created_at+"</span>";
		html += "<div class='za-xt-li-body'>"+data.message+"</div></div>";
	}
	return html;
}
