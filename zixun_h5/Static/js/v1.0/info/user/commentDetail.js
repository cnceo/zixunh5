var options = {//页面操作属性对象
	cpage : 1,
	isMore : true,		//是否分页
	plFor : 1,		//评论文章0  评论他人1
	id:"",
	parentid:"",
	articleid:"",
	parentName:"",
	userid:""
}
var noMoreText = "<div class='za-comment-title' style='margin-top: -9px;text-align: center;'>"
 + "<img style='width: 17px;margin-right: 5px;' src='/Static/images/v1.0/info/user/icon_nomore.png' />"
 + "<span>到底了,快去发表自己的看法吧！</span></div>";
 
var success_html = "<img style='height:45px;width:45px;margin-bottom:15px;' src='/Static/images/v1.0/info/user/icon_success.png'/></br>"; 
 
$(function(){
	if(!sessionStorage.plFor){
		sessionStorage.plFor = 0;
	}
	if(sessionStorage.pl_content2 && sessionStorage.pl_content2 != ""  && localStorage.username && localStorage.username != ""){
		$("#pltext").val(sessionStorage.pl_content2);
		PLOtherUser(sessionStorage.pl_content2,parseInt(sessionStorage.pl_parentid2),parseInt(sessionStorage.pl_userid2));
	}
	options.parentid = HCCP.FUNC.getUrlParam("parentId");
	initEvent();
	$("#rm_warp").hide();	
	$("#pl_warp").hide();
	queryChildreplyList()
})
window.onload = function(){
	var u_id = HCCP.FUNC.getUrlParam("userid");
	if(u_id){
		$(".content_inner").animate({ scrollTop: $(".content_inner").scrollTop() + $("#li_"+u_id).offset().top - $(".content_inner").offset().top -150 }, 1000);		
	}
	//$("#li_"+u_id).css("background","#999")
}
function initEvent(){	
	//textarea框 高度自适应    	
	$.fn.autoHeight = function(){    
        function autoHeight(elem){
            elem.style.height = 'auto';
            //elem.scrollTop = 0; //防抖动
            elem.style.height = elem.scrollHeight + 'px';
            if(elem.style.height >= '64px'){elem.style.maxHeight = 64+'px';}
        }
        this.each(function(){
            autoHeight(this);
            $(this).on('keyup', function(){
                autoHeight(this);
            });
        });     
    }
	$('textarea[autoHeight]').autoHeight();
	
    //上拉滚动到底部加载事件
    $('.content_inner').on('scroll', scroll_);
    
    $("#pltext").blur(function(){
//		$("#pltext").css("height","32px")
	});
	$("#pltext").focus(function(){
//		$("#pltext").css("height","64px")
	});
	//发布按钮点击
	$("#fbBtn").click(function(){
		options.plFor = 1;
    	$("#pltext").focus();
	})   
    //发送按钮
    $("#sendbtn").click(function(){
    	//判断内容是否为空
    	var replyText = $("#pltext").val();
    	if(replyText == "" || replyText == null){
    		layer.open({content: '评论内容不能为空',skin: 'msg',time: 2});
    		return;
    	}
    	sessionStorage.pl_content2 = replyText;
    	//评论他人
    	PLOtherUser(replyText,options.parentid,options.userid);
    })
}
//子评论
function createHtml(obj){
	var html = "";
	//根据 parent_id 判断  parent_id = 0；文章评论
	for(var i = 0; i < obj.length; i++){
		var data = obj[i];
		var u_name = data.nickname == null || data.nickname == "" ? USER.params.fliterPhone(data.username):data.nickname;//用户昵称
		html += "<li style='background:transparent;' id='li_"+data.id+"' userid='"+data.user_id+"' keyid='"+data.id+"' articleid='"+data.article_id+"' parentid='"+data.parent_id+"'><span class='u-img'><img class='img' src='"+USER.headImg(data.avatar)+"'/></span>";
        html += "<div class='detail'><div class='cmt-name-wrap'><a class='cmt-name'>"+u_name+"</a></div>";
        html += "<div class='cmt-title'><time class='time'>"+USER.params.desDate(data.created_at)+"</time>";
        html += "<span class='btn-report j-ToggleReport' onclick='zanClick($(this),"+data.id+","+data.user_id+");'>"+data.points_nums+"</span></div>";
//      html += "<div class='cmt-content'><span style='color: #FD8237 ;'>回复@"+options.parentName+"：</span>"+data.content+"</div>";
        if(data.content.length > 60){
	    	html += "<div class='cmt-content' onclick='initOverText($(this));'>"+data.content+"<p class='za-hide-class'>收起</p></div>";
	    }else{
	    	html += "<div class='cmt-content'>"+data.content+"</div>";
	    }
        html += "<div class='cmt-bar'><span onclick='reportClick($(this),"+data.id+");' class='za-jubao-font'>举报</span>";
        html += "</div></div></li>";       
	}
	return html;
}
//查询子评论列表
function queryChildreplyList(){
	//layer.open({type:2,content: '加载中'})
	var res = HCCP.ajax.post("/iation/childreply/list",{
		"articleId":HCCP.FUNC.getUrlParam("articleId"),
		"parentId":HCCP.FUNC.getUrlParam("parentId"),
		"page":options.cpage,"num":20
	})
	console.log(JSON.stringify(res))
	if(res && res.code == 200){
//  	if(res.data.list instanceof Array && res.data.list.length <= 0 && options.cpage == 1){//首次进入加载无数据
//  		$("#no-content-msg").show();
//  		options.isMore = false;
//  		return;
//  	}
		$("#rm_warp").show();//主评论
    	var mainHtml = createMainHtml(res.data.list.main);
    	$("#content-rm").html(mainHtml);    	
    	if(res.data.list.child && res.data.list.child.data.length < 20 && options.cpage > 1){//往后页面 加载完数据
    		options.isMore = false;
    		if(res.data.list.child){
	    		$("#totalnum").text("("+res.data.list.child.total+")")
		    	$("#pl_warp").show();
		    	var contentHtml = createHtml(res.data.list.child.data);//子评论
		    	$("#content").append(contentHtml);    	    	
		    	options.cpage++;
		    	hiddenText();
		    	setTimeout(function(){layer.closeAll();},300)
	    	}
    		$("#content").append(noMoreText);
    	}
    	if(res.data.list.child && res.data.list.child.data.length < 20 && options.cpage == 1){//第一页  就加载完数据
    		options.isMore = false;
    		if(res.data.list.child){
	    		$("#totalnum").text("("+res.data.list.child.total+")")
		    	$("#pl_warp").show();
		    	var contentHtml = createHtml(res.data.list.child.data);//子评论
		    	$("#content").append(contentHtml);    	    	
		    	options.cpage++;
		    	hiddenText();
		    	setTimeout(function(){layer.closeAll();},300)
	    	}
    		$("#content").append(noMoreText);
    	}
    	
//  	if(res.data.list.child){
//  		$("#totalnum").text("("+res.data.list.child.total+")")
//	    	$("#pl_warp").show();
//	    	var contentHtml = createHtml(res.data.list.child.data);//子评论
//	    	$("#content").append(contentHtml);    	    	
//	    	options.cpage++;
//	    	hiddenText();
//	    	setTimeout(function(){layer.closeAll();},300)
//  	}    	
   }else if(res && res.code == 401){
    	//登录失效
    	//window.location.href = USER.hrefUrl.login+"?router=collect";
   }else if(res){ 
      	HCCP.modal.alert({
            msg:res.message
        })  
    }
}
function createMainHtml(obj){
	var html = "";
	var data = obj;	
	options.parentid = data.id;//主评论userid
	var u_name = data.nickname == null || data.nickname == "" ? USER.params.fliterPhone(data.username):data.nickname;//用户昵称
	options.parentName = u_name;//主评论用户名
	html += "<li id='li_"+data.id+"' userid='"+data.user_id+"' keyid='"+data.id+"' articleid='"+data.article_id+"' parentid='"+data.parent_id+"'><span class='u-img'><img class='img louzhu' src='"+USER.headImg(data.avatar)+"'/></span>";
    html += "<div class='detail'><div class='cmt-name-wrap'><a class='cmt-name'>"+u_name+"</a></div>";
    html += "<div class='cmt-title'><time class='time'>"+USER.params.desDate(data.created_at)+"</time>";
    html += "<span class='btn-report j-ToggleReport' onclick='zanClick($(this),"+data.id+","+data.user_id+");'>"+data.points_nums+"</span></div>";
        
    if(data.content.length > 60){
    	html += "<div class='cmt-content' onclick='initOverText($(this));'>"+data.content+"<p class='za-hide-class'>收起</p></div>";
    }else{
    	html += "<div class='cmt-content'>"+data.content+"</div>";
    }
    
    html += "<div class='cmt-bar'><em onclick='replyClick($(this),"+data.id+","+data.user_id+");' class='cmt-btn2 btn-reply j-ToggleReply'>回复</em><span onclick='reportClick($(this),"+data.id+");' class='za-jubao-font'>举报</span>";
    html += "</div></div></li>";
    sessionStorage.pl_parentid2 = data.id;
    sessionStorage.pl_userid2 = data.user_id;
    return html;
}
//隐藏超出文字
function hiddenText(){
	$(".cmt-content").each(function(index,item){
		item.setAttribute("displayLength","120");
		$(this).text_overflow();
	})
}
function initOverText(e){		
	if(e && e.stopPropagation){  
        e.stopPropagation();  
    }else{  
        window.event.cancelBubble = true;  
    }
	e.attr("displayLength","120")
	e.un_displayPart();
}
//跳转该评论的回复详情页
//function goDetial(e){
//	window.location.href = "commentDetail.html?articleId="+encodeURIComponent(HCCP.FUNC.getUrlParam("articleId"))+"&parentId="+e.attr("parentid");
//	console.log(e.attr("keyid"))
//}
//回复图标点击
function replyClick(e,replyid,userid){
	if(e && e.stopPropagation){  
        e.stopPropagation();  
    }else{  
        window.event.cancelBubble = true;  
    } 
    options.plFor = 1;//评论回复他人
    $("#pltext").focus();
    options.parentid = replyid;
    options.userid = userid;
    sessionStorage.pl_parentid2 = options.parentid;
    sessionStorage.pl_userid2 = options.userid;
}
//举报图标点击
function reportClick(e,replyid){
	if(e && e.stopPropagation){  
        e.stopPropagation();  
    }else{  
        window.event.cancelBubble = true;  
    } 
	console.log(JSON.stringify(e))
	window.location.href = "report.html?replyid="+replyid;
}
//点赞图标点击
function zanClick(e,replyid,userid){
	if(e && e.stopPropagation){  
        e.stopPropagation();  
    }else{  
        window.event.cancelBubble = true;  
    }
    console.log(replyid + "\n" + userid)    
    var res = HCCP.ajax.post("/iation/reply/like",{
		"replyid":replyid,
		"parentUserid":userid
	})   
    console.log(JSON.stringify(res))
    if(res && res.code == 200){
    	e.removeClass("btn-report").addClass("btn-report-2");
    	e.text(parseInt(e.text())+1);
    }else if(res && res.code == 600){
    	layer.open({content: '赞过啦！',skin: 'msg',time: 2});
    }else if(res && res.code == 401){
    	window.location.href = USER.hrefUrl.login+"?router=commentDetail"+"&url="+encodeURIComponent(window.location.href);//跳转登录界面
    }else if(res){
    	HCCP.modal.alert({msg:res.message})
    }else{
    	HCCP.modal.alert({msg:"网络异常，请稍后再试"})
    }
}
//评论其他用户的评论
function PLOtherUser(answer,replyid,userid){
	var res = HCCP.ajax.post("/iation/reply/answer",{
		"articleId":HCCP.FUNC.getUrlParam("articleId"),
		"parentId":replyid,
		"parentUid":userid,
		"answer":answer
	})
	console.log(JSON.stringify(res))
	if(res && res.code == 200){
		layer.open({content: success_html+'发表成功',skin: 'demo-css',time:3});
		sessionStorage.pl_content2 = "";
		setTimeout(function(){window.location.reload()},2500)
	}else if(res && res.code == 401){
		window.location.href = USER.hrefUrl.login+"?router=commentDetail"+"&url="+encodeURIComponent(window.location.href);//跳转登录界面
	}else{
		HCCP.modal.alert({
            msg:res.message
        })  
	}
}

//上拉滚动到底部加载滚动事件
function scroll_() {	
	var nScrollHight = 0; // 滚动距离总长(注意不是滚动条的长度)
	var nScrollTop = 0; // 滚动到的当前位置
	document.getElementsByClassName("content_inner")[0].style.height = window.innerHeight-44 + "px";
	var nDivHight = $(".content_inner").height();	
	nScrollHight = $(this)[0].scrollHeight;
	nScrollTop = $(this)[0].scrollTop;
	if(nScrollTop + nDivHight == nScrollHight){
		if(options.isMore){
			queryChildreplyList();
		}
	}			
}













