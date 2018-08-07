var all = {
	data:{
		page:1,
		num:10,
		isMore:true
	}
}
sessionStorage.route = 0;
$(function(){
	queryList();
	initEvent();
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
}
function queryList(){
	var res = HCCP.ajax.get("/iation/worldcup/SilenceList",{
		page :all.data.page,
		num : all.data.num
	})
	console.log(JSON.stringify(res))
	if(res && res.code == 200 && res.data.articleInfo.length < all.data.num && all.data.page == 1){//第一次 就加载完成
		createHtml(res.data.articleInfo);
		all.data.isMore = false;
		return;
	}else if(res && res.code == 200 && res.data.articleInfo.length < all.data.num && all.data.page > 1){//分页 加载完成
		createHtml(res.data.articleInfo);
		all.data.isMore = false;
		return;
	}else if(res && res.code == 200){
		createHtml(res.data.articleInfo);
		all.data.page++;
	}else if(res){
		layer.open({content:res.message,skin:'msg',time:3})
	}
}
function createHtml(obj){
	var html = "";
	for(var i = 0;i<obj.length;i++){
		var data = obj[i];
		var sj_number = USER.params.getRandomNum(1000000,99999999);					
		html += "<div onclick='gotoDetail("+data.articleId+");' class='za-content-warp'><div class='za-content-bg' style='background-image: url("+data.leftFigure+");'>";
		html += "<div class='za-title-bottom mui-ellipsis'>"+data.title+"</div>";
		html += "<div class='za-read-top'>阅读量"+data.article_hits+"</div>";
		html += "</div></div>";
	}
	$("#content").append(html)
}
function gotoDetail(_id){
	sessionStorage.route = 2;
	window.location.href = "../info/zixun/zixun_detail.html?articleId="+_id;
}
function scroll_(){
	var nScrollHight = 0; // 滚动距离总长(注意不是滚动条的长度)
	var nScrollTop = 0; // 滚动到的当前位置
	//document.getElementsByClassName("content-warp")[0].style.height = window.innerHeight-44 + "px";
	var nDivHight = $(".content_inner").height();	
	nScrollHight = $(this)[0].scrollHeight;
	nScrollTop = $(this)[0].scrollTop;
	if(nScrollTop + nDivHight >= nScrollHight-1){
		console.log('is botom')
		if(all.data.isMore){
			queryList();
		}
	}
}




