var cpage = 1;
var isMore = true;
$(function() {
	initEvent();
	$("#refresh").hide();
	$("#content").html('');
	querymyCollection();
})

function initEvent() {
	//绑定下拉刷新事件
	pullDown(".content_wrap", ".content_inner", '', 2.5, function(e) { //绑定下拉刷新事件
		$("#refresh").show();
		//这里不用异步，会有问题改为同步
		var res = HCCP.ajax.get("/iation/haocai/userArticleCollection", {
			"uid": localStorage.uid,
			"page": cpage
		})
		console.log(JSON.stringify(res))
		if(res && res.code == 200) {
			this.back(1);
			if(res.data.length == 0 && cpage == 1) {
				$("#no-content-msg").show();
				$("#refresh").hide();
				isMore = false;
				return;
			}
			if(res.data.length == 0 && cpage > 1) { //无更多数据
				layer.open({
					content: '已无更多数据',
					skin: 'msg',
					time: 3
				});
				isMore = false;
				return;
			}
			var contentHtml = createHtml(res.data);
			$("#content").prepend(contentHtml);
			cpage++;
		}  else if(res && res.code == 401) {
			//登录失效
			window.location.href = USER.hrefUrl.login + "?router=collect";
			this.back(1);
		} else if(res) {
			HCCP.modal.alert({
				msg: res.message
			})
			this.back(1);
		}
	})
	//上拉滚动到底部加载事件
	$('.content_inner').on('scroll', scroll_);
}

function querymyCollection() {
	var res = HCCP.ajax.get("/iation/haocai/userArticleCollection", {
		"uid": localStorage.uid,
		"page": cpage
	})
	console.log(JSON.stringify(res))
	if(res && res.code == 200) {
		//
		if(res.data.length == 0 && cpage == 1) { //首次加载无数据
			$("#no-content-msg").show();
			isMore = false;
			return;
		}
		if(res.data.length == 0 && cpage > 1) { //无更多数据
			layer.open({
				content: '已无更多数据',
				skin: 'msg',
				time: 3
			});
			isMore = false;
			return;
		}
		var contentHtml = createHtml(res.data);
		$("#content").append(contentHtml);
		cpage++;
	} else if(res && res.code == 401) {
		//登录失效
		window.location.href = USER.hrefUrl.login + "?router=collect";
	} else if(res) {
		HCCP.modal.alert({
			msg: res.message
		})
	}
}

function createHtml(obj) {
	var html = "";
	for(var i = 0; i < obj.length; i++) {
		var data = obj[i];
		html += "<li class='mui-table-view-cell mui-media' onclick=\"goDetial('" + data.articleId + ',' + data.column_enname + "');\"><a >";
		html += "<img class='mui-media-object mui-pull-left' src='" + data.leftFigure + "'>";
		html += "<div class='mui-media-body'><p class='mui-ellipsis-2'>" + data.title + "</p>";
		html += "<span class='za-read-span'><span></span>" + data.article_hits + "</span>";
		html += "</div></a></li>";
	}
	return html;
}

function goDetial(mess) {
	var articleId = mess.split(",")[0];
	var column_enname = mess.split(",")[1];
	sessionStorage.route = 1;
	//	window.location.href = "../info/zixun/zixun_detail.html?articleId="+articleId;
	//var  tempUrl = NEWS_DETAIL_URL +"/" +  column_enname + '/'+ articleId + '.html';
	var tempUrl = URL + column_enname + '/' + articleId + '.html';
	window.location.href = tempUrl;
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
		if(isMore) {
			querymyCollection();
		}
	}
}