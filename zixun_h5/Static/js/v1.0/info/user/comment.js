var options = { //页面操作属性对象
	cpage: 1,
	isMore: true, //是否分页
	plFor: 0, //评论文章0  评论他人1
	id: "",
	parentid: "",
	articleid: "",
	userid: ""
}
var noMoreText = "<div class='za-comment-title' style='margin-top: -9px;text-align: center;'>" +
	"<img style='width: 17px;margin-right: 5px;' src='/Static/images/v1.0/info/user/icon_nomore.png' />" +
	"<span>到底了,快去发表自己的看法吧！</span></div>";

var success_html = "<img style='height:45px;width:45px;margin-bottom:15px;' src='/Static/images/v1.0/info/user/icon_success.png'/></br>";

$(function() {
	if(!sessionStorage.plFor) {
		sessionStorage.plFor = 0;
	}
	if(sessionStorage.pl_content1 && sessionStorage.pl_content1 != "" && localStorage.username && localStorage.username != "") { //表示登录成功
		$("#pltext").val(sessionStorage.pl_content1);
		//评论谁
		if(parseInt(sessionStorage.plFor) == 0) { //文章
			PLarticle(sessionStorage.pl_content1);
		} else { //他人
			PLOtherUser(sessionStorage.pl_content1, parseInt(sessionStorage.pl_parentid), parseInt(sessionStorage.pl_userid));
		}
	}
	initEvent();
	$("#rm_warp").hide();
	$("#pl_warp").hide();
	queryCommentList();
	queryRMcommentList();
	//现在用为域名问题先不用这种办法	
	//	if(sessionStorage.eidtFlag == 1){
	//		$("#pltext").focus();
	//		sessionStorage.eidtFlag = 0;
	//	}	
	var eidtFlag = HCCP.FUNC.getUrlParam("eidtFlag");
	if(eidtFlag) {
		$("#pltext").focus();
	}
})

function initEvent() {
	//textarea框 高度自适应    	
	$.fn.autoHeight = function() {
		function autoHeight(elem) {
			elem.style.height = 'auto';
			//elem.scrollTop = 0; //防抖动
			elem.style.height = elem.scrollHeight + 'px';
			if(elem.style.height >= '64px') {
				elem.style.maxHeight = 64 + 'px';
			}
		}
		this.each(function() {
			autoHeight(this);
			$(this).on('keyup', function() {
				autoHeight(this);
			});
		});
	}
	$('textarea[autoHeight]').autoHeight();

	//绑定下拉刷新事件
	pullDown(".content_wrap", ".content_inner", '', 2.5, function(e) { //绑定下拉刷新事件
		$("#refresh").show();
		//这里不用异步，会有问题改为同步
		queryRMcommentList();
		options.cpage = 1;
		options.isMore = true;
		$("#content").empty()
		queryCommentList();
		this.back(1);
	})
	//上拉滚动到底部加载事件
	$('.content_inner').on('scroll', scroll_);

	$("#pltext").blur(function() {
		//		$("#pltext").css("height","32px")
	});
	$("#pltext").focus(function() {
		//		$("#pltext").css("height","64px")
	});
	//发布按钮点击
	$("#fbBtn").click(function() {
		options.plFor = 0;
		sessionStorage.plFor = options.plFor;
		$("#pltext").focus();
	})
	//评论图标点击
	$("#offCanvasBtn").click(function() {
		options.plFor = 0;
		sessionStorage.plFor = options.plFor;
		$("#pltext").focus();
	})
	//发送按钮
	$("#sendbtn").click(function() {
		//判断内容是否为空
		var replyText = $("#pltext").val();
		if(replyText == "" || replyText == null) {
			$("#commetSuccess  p").html("评论内容不能为空")
			$("#commetSuccess").show();
			setTimeout(function() {
				$("#commetSuccess").hide();
			}, 2000)
			return;
		}
		//把输入的内容放入缓存  用于登录后返回的展示
		sessionStorage.pl_content1 = replyText;
		//评论谁
		if(options.plFor == 0) { //文章
			PLarticle(replyText);
		} else { //他人
			PLOtherUser(replyText, options.parentid, options.userid);
		}
	})
}
//查询评论列表
function queryCommentList() {
	var res = HCCP.ajax.post("/iation/reply/list", {
		"articleId": HCCP.FUNC.getUrlParam("articleId"),
		"page": options.cpage,
		"num": 5
	})
	console.log(res)
	console.log(JSON.stringify(res))
	if(res && res.code == 200) {
		if(res.data.list instanceof Array && res.data.list.length <= 0 && options.cpage == 1) { //首次进入加载无数据
			$("#no-content-msg").show();
			$(".za-comment-title").hide();
			options.isMore = false;
			return;
		}
		if(res.data.list instanceof Array && res.data.list.length <= 0 && options.cpage > 1) { //上啦加载无数据
			options.isMore = false;
			$("#content").append(noMoreText);
			return;
		}
		$("#totalnum").text("(" + res.data.list.total + ")")
		$("#pl_warp").show();
		var contentHtml = createHtml(res.data.list.data);
		if(contentHtml){
			$("#pinglun").show();
		}
		$("#content").append(contentHtml);
		options.cpage++;
		hiddenText();
	} else if(res && res.code == 401) {
		//登录失效    	
	} else if(res) {
		HCCP.modal.alert({
			msg: res.message
		})
	} else {
		HCCP.modal.alert({
			msg: "网络异常，请稍后再试"
		})
	}
}

function createHtml(obj) {
	var html = "";
	//根据 parent_id 判断  parent_id = 0；文章评论
	for(var i = 0; i < obj.length; i++) {
		var data = obj[i]; //reply_nums
		var u_name = data.nickname == null || data.nickname == "" ? USER.params.fliterPhone(data.username) : data.nickname; //用户昵称
		if(data.parent_id == 0) { //文章评论
			//			if(data.reply_nums > 0){
			html += "<li id='li_" + data.id + "' userid='" + data.user_id + "' keyid='" + data.id + "' articleid='" + data.article_id + "' parentid='" + data.parent_id + "' ><span class='u-img'><img class='img' src='" + USER.headImg(data.avatar) + "'/></span>";
			//			}else{
			//				html += "<li id='li_"+data.id+"' userid='"+data.user_id+"' keyid='"+data.id+"' articleid='"+data.article_id+"' parentid='"+data.parent_id+"' onclick='goDetial($(this));'><span class='u-img'><img class='img' src='"+data.avatar+"'/></span>";	        	        
			//			}        
			html += "<div class='detail'><div class='cmt-name-wrap'><a class='cmt-name'>" + u_name + "</a></div>";
			html += "<div class='cmt-title'><time class='time'>" + USER.params.desDate(data.created_at) + "</time>";
			html += "<span class='btn-report j-ToggleReport' onclick='zanClick($(this)," + data.id + "," + data.user_id + ");'>" + data.points_nums + "</span></div>";
			if(data.content.length > 60) {
				html += "<div class='cmt-content' onclick='initOverText($(this));'>" + data.content + "<p class='za-hide-class'>收起</p></div>";
			} else {
				html += "<div class='cmt-content'>" + data.content + "</div>";
			}
			if(data.reply_nums > 0) {
				html += "<p keyid='" + data.id + "' style='color:#FD8237 ;font-size:12px;' onclick='goDetial($(this));'>共" + data.reply_nums + "条回复></p>";
			}
			html += "<div class='cmt-bar'><em onclick='replyClick($(this)," + data.id + "," + data.user_id + ");' class='cmt-btn2 btn-reply j-ToggleReply'>回复</em><span onclick='reportClick($(this)," + data.id + ");' class='za-jubao-font'>举报</span>";
			html += "</div></div></li>";
		} else { //回复用户评论  的 评论
			//			if(data.reply_nums > 0){
			html += "<li id='li_" + data.id + "' userid='" + data.user_id + "' keyid='" + data.id + "' articleid='" + data.article_id + "' parentid='" + data.parent_id + "' ><span class='u-img'><img class='img' src='" + USER.headImg(data.avatar) + "'/></span>";
			//			}else{
			//				html += "<li id='li_"+data.id+"' userid='"+data.user_id+"' keyid='"+data.id+"' articleid='"+data.article_id+"' parentid='"+data.parent_id+"' onclick='goDetial($(this));'><span class='u-img'><img class='img' src='"+data.avatar+"'/></span>";	        	        
			//			}
			html += "<div class='detail'><div class='cmt-name-wrap'><a class='cmt-name'>" + u_name + "</a></div>";
			html += "<div class='cmt-title'><time class='time'>" + USER.params.desDate(data.created_at) + "</time>";
			html += "<span class='btn-report j-ToggleReport' onclick='zanClick($(this)," + data.id + "," + data.user_id + ");'>" + data.points_nums + "</span></div>";
			var p_name = data.parent.nickname == null || data.parent.nickname == "" ? USER.params.fliterPhone(data.parent.username) : data.parent.nickname; //父级用户昵称	       
			if(data.content.length > 60) {
				html += "<div class='cmt-content' onclick='initOverText($(this));'><span style='color: #FD8237 ;'>回复@" + p_name + "：</span>" + data.content + "<p class='za-hide-class'>收起</p></div>";
			} else {
				html += "<div class='cmt-content'><span style='color: #FD8237 ;'>回复@" + p_name + "：</span>" + data.content + "</div>";
			}
			if(data.reply_nums > 0) {
				html += "<p keyid='" + data.id + "' style='color:#FD8237 ;font-size:12px;' onclick='goDetial($(this));'>共" + data.reply_nums + "条回复></p>";
			}
			html += "<div class='cmt-bar'><em onclick='replyClick($(this)," + data.id + "," + data.user_id + ");' class='cmt-btn2 btn-reply j-ToggleReply'>回复</em><span onclick='reportClick($(this)," + data.id + ");' class='za-jubao-font'>举报</span>";
			html += "</div></div></li>";
		}
		//		initOverText();			
	}

	return html;
}
//隐藏超出文字
function hiddenText() {
	$(".cmt-content").each(function(index, item) {
		item.setAttribute("displayLength", "120");
		$(this).text_overflow();
	})
}

function initOverText(e) {
	if(e && e.stopPropagation) {
		e.stopPropagation();
	} else {
		window.event.cancelBubble = true;
	}
	e.attr("displayLength", "120")
	e.un_displayPart();
}

//查询热门评论列表
function queryRMcommentList() {
	//layer.open({type:2,content: '加载中'})
	var res = HCCP.ajax.post("/iation/hotreply/list", {
		"articleId": HCCP.FUNC.getUrlParam("articleId"),
		"page": 1,
		"num": 5
	})
	console.log(JSON.stringify(res))
	if(res && res.code == 200) {
		if(res.data.list instanceof Array && res.data.list.length <= 0) { //无数据
			$("#rm_warp").hide();
			$("#pl_warp").css("marginTop", "40px");
			return;
		}
		$("#pl_warp").css("marginTop", "0px");
		var contentHtml = createHtml(res.data.list.data);
		console.log(contentHtml);
		if(contentHtml){
			$("#rmpinglun").show();
		}
		$("#rm_warp").show();
		$("#content-rm").empty().prepend(contentHtml);
		hiddenText();
		setTimeout(function() {
			layer.closeAll();
		}, 300)
	} else if(res && res.code == 401) {
		setTimeout(function() {
			layer.closeAll();
		}, 300)
		//登录失效
		//window.location.href = USER.hrefUrl.login+"?router=collect";
	} else if(res) {
		setTimeout(function() {
			layer.closeAll();
		}, 300)
		HCCP.modal.alert({
			msg: res.message
		})
	} else {
		HCCP.modal.alert({
			msg: "网络异常，请稍后再试"
		})
	}
}
//跳转该评论的回复详情页
function goDetial(e) {
	window.location.href = "commentDetail.html?articleId=" + encodeURIComponent(HCCP.FUNC.getUrlParam("articleId")) + "&parentId=" + e.attr("keyid");
	console.log(e.attr("keyid"))
}
//回复图标点击
function replyClick(e, replyid, userid) {
	if(e && e.stopPropagation) {
		e.stopPropagation();
	} else {
		window.event.cancelBubble = true;
	}
	options.plFor = 1; //评论回复他人
	sessionStorage.plFor = options.plFor;
	$("#pltext").focus();
	options.parentid = replyid;
	options.userid = userid;
	//存缓存
	sessionStorage.pl_parentid = options.parentid;
	sessionStorage.pl_userid = options.userid;
}
//举报图标点击
function reportClick(e, replyid) {
	if(e && e.stopPropagation) {
		e.stopPropagation();
	} else {
		window.event.cancelBubble = true;
	}
	console.log(JSON.stringify(e))
	window.location.href = "report.html?replyid=" + replyid;
}
//点赞图标点击
function zanClick(e, replyid, userid) {
	if(e && e.stopPropagation) {
		e.stopPropagation();
	} else {
		window.event.cancelBubble = true;
	}
	console.log(replyid + "\n" + userid);
	//点赞优化没有登录的用户也可以点赞
	var res = HCCP.ajax.post("/iation/reply/like", {
		"replyid": replyid,
		"parentUserid": userid
	})
	console.log(JSON.stringify(res))
	if(res && res.code == 200) {
		e.removeClass("btn-report").addClass("btn-report-2");
		e.text(parseInt(e.text()) + 1);
	} else if(res && res.code == 600) {
		$("#commetSuccess  p").html("赞过啦")
			$("#commetSuccess").show();
			setTimeout(function() {
				$("#commetSuccess").hide();
			}, 2000)
	} else if(res && res.code == 401) {
		window.location.href = USER.hrefUrl.login + "?router=comment" + "&url=" + encodeURIComponent(window.location.href); //跳转登录界面
	} else if(res) {
		HCCP.modal.alert({
			msg: res.message
		})
	} else {
		HCCP.modal.alert({
			msg: "网络异常，请稍后再试"
		})
	}
}
//评论文章
function PLarticle(answer) {
	var res = HCCP.ajax.post("/iation/reply/answer", {
		"articleId": HCCP.FUNC.getUrlParam("articleId"),
		"parentId": 0,
		"answer": answer
	})
	console.log(JSON.stringify(res))
	if(res && res.code == 200) {
		$("#commetSuccess  p").html("发表成功!")
		$("#commetSuccess").show();
		sessionStorage.pl_content1 = "";
		setTimeout(function() {
			$("#commetSuccess").hide();
			window.location.reload()
		}, 2500)
	} else if(res && res.code == 401) {
		window.location.href = USER.hrefUrl.login + "?router=comment" + "&url=" + encodeURIComponent(window.location.href); //跳转登录界面
	} else if(res) {
		HCCP.modal.alert({
			msg: res.message
		})
	} else {
		HCCP.modal.alert({
			msg: "网络异常，请稍后再试"
		})
	}
}
//评论其他用户的评论
function PLOtherUser(answer, replyid, userid) {
	var res = HCCP.ajax.post("/iation/reply/answer", {
		"articleId": HCCP.FUNC.getUrlParam("articleId"),
		"parentId": replyid,
		"parentUid": userid,
		"answer": answer
	})
	console.log(JSON.stringify(res))
	if(res && res.code == 200) {
		$("#commetSuccess  p").html("发表成功!")
		$("#commetSuccess").show();
		sessionStorage.pl_content1 = "";
		sessionStorage.pl_parentid = "";
		sessionStorage.pl_userid = "";
		setTimeout(function() {			
			$("#commetSuccess").hide();
			window.location.reload()
		}, 2500)
	} else if(res && res.code == 401) {
		window.location.href = USER.hrefUrl.login + "?router=comment" + "&url=" + encodeURIComponent(window.location.href); //跳转登录界面
	} else if(res) {
		HCCP.modal.alert({
			msg: res.message
		})
	} else {
		HCCP.modal.alert({
			msg: "网络异常，请稍后再试"
		})
	}
}
//剪辑文字内容
function cutString(str, len) {
	//length属性读出来的汉字长度为1
	if(str.length * 2 <= len) {
		return str;
	}
	var strlen = 0;
	var s = "";
	for(var i = 0; i < str.length; i++) {
		s = s + str.charAt(i);
		if(str.charCodeAt(i) > 128) {
			strlen = strlen + 2;
			if(strlen >= len) {
				return s.substring(0, s.length - 1) + "...";
			}
		} else {
			strlen = strlen + 1;
			if(strlen >= len) {
				return s.substring(0, s.length - 2) + "...";
			}
		}
	}
	return s;
}

//上拉滚动到底部加载滚动事件
function scroll_() {
	var nScrollHight = 0; // 滚动距离总长(注意不是滚动条的长度)
	var nScrollTop = 0; // 滚动到的当前位置
	document.getElementsByClassName("content_inner")[0].style.height = window.innerHeight - 44 + "px";
	var nDivHight = $(".content_inner").height();
	nScrollHight = $(this)[0].scrollHeight;
	nScrollTop = $(this)[0].scrollTop;
	if(nScrollTop + nDivHight == nScrollHight) {
		if(options.isMore) {
			queryCommentList();
		}
	}
}