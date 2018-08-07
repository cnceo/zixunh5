var all = {
	data:{
		cup_columnid : '',
		isMore : {},//是否需要更多数据  false表示没有更多数据 禁止下拉
		cpage : {},//每个cupcolumnid 当前是  第几页
		num : 10,//每页请求 多少条数据
		isBanner : false,//是否 已经有了 banner图
	}
}

var textAll = {
	nodata : "<center><img src='/Static/images/v1.0/worldcup/nodata.png' /><p>程序员们正在快马加鞭！客官莫急~</p></center>",
	isOver: '<div class="tip_footer">无更多内容</div>'
}
sessionStorage.route = 0;//进入文章详情页 需要设置  0表示返回资讯首页  其他true 表示 history.goback

$(function(){
	initPageValue();//初始化分页
	initPage();//初始化页面
	initEvent();//绑定元素事件	
	console.log("all:"+JSON.stringify(all))	
})
//初始化分页数值
function initPageValue(){
	//初始化 分页
	for(value in ZA_CUP_COLUMNID){
		resetColumnid(ZA_CUP_COLUMNID[value]);
	}
}
function initEvent(){
	//底部菜单点击
	//$(".mui-bar-tab a").click(function(){
//	mui('body').on('tab','.mui-bar-tab a',function(){
//		var index = $(this).index();
//		switch (index){
//			case 0:
//				window.location.href = "../info/zixun/zixun.html";
//				break;
//			case 1:
//				window.location.href = "index.html";
//				break;
//			case 2:
//				window.location.href = "../info/zixun/zixun_live.html";
//				break;
//			case 3:
//				window.location.href = "../user/user_index.html";
//				break;
//			default:
//				break;
//		}
//	})
	$("#go_index").on('tap', function() { 
        window.location.href = "../";
    }); 
    $("#go_world").on('tap', function() { 
        window.location.href = "index.html";
    });
    $("#go_live").on('tap', function() { 
        window.location.href = "../info/zixun/zixun_live.html";
    });
    $("#go_my").on('tap', function() { 
        window.location.href = "../user/user_index.html";
    });
	pullDown(".content_wrap", ".content_inner", '', 2.5, function(e) { //绑定下拉刷新事件 		
	    //根据sessionStorage.cup_columnid  加载  数据
	    var columnid = sessionStorage.cup_columnid;		
	    resetColumnid(columnid);//重设 cpage 分页  清空内容 重新填界面
	    //文章列表页面元素也要 清空  ， banner图不清空、
	    if(columnid != ZA_CUP_COLUMNID.yxhd){$("[class=id_" + columnid+ "]").empty();}
		if(columnid == ZA_CUP_COLUMNID.rm){
        	if(all.data.isMore[ZA_CUP_COLUMNID.rm]){queryRMdata(false);}//查询热门  false表示第一次 查
        }else if(columnid == ZA_CUP_COLUMNID.yxhd){
        	if(all.data.isMore[ZA_CUP_COLUMNID.yxhd]){queryGameData();}//游戏活动
        }else{
        	if(all.data.isMore[columnid]){queryChildData(columnid,false);}//查询子栏目
        }	    
	    this.back(1);
	    return;
    })
	//栏目菜单点击事件
	$(".za-colunm-control a").click(function(){				
		$(".za-colunm-control a").removeClass('za-active');
		$(this).addClass('za-active');//改变文字样式		
		//每次点击判断 是否有 轮播
		if(hasBanner()){
			all.data.isBanner = true;
		}		
		var columnid = $(this).attr("columnid")
		sessionStorage.cup_columnid = columnid;
		//change title
		changeTitle(columnid);
		
		$("[class^=id_]").hide()
		//根据 .item 的数量判断 是否 从未加载过
		var $dom_wrap = $("[class=id_" + columnid + "]");
	    var $item = $dom_wrap.find('.item');
	    if($item.length){
            $(".loading").hide()
            $("[class=id_" + columnid + "]").show()
        }else{
            //这里 去加载数据
            $("[class=id_" + columnid + "]").show()           
            if(columnid == ZA_CUP_COLUMNID.rm){
            	if(all.data.isMore[ZA_CUP_COLUMNID.rm]){queryRMdata(false);}//查询热门  false表示第一次 查
            }else if(columnid == ZA_CUP_COLUMNID.yxhd){
            	if(all.data.isMore[ZA_CUP_COLUMNID.yxhd]){queryGameData();}//游戏活动
            }else{
            	if(all.data.isMore[columnid]){queryChildData(columnid,false);}//查询子栏目
            }
        }
	})
	//上拉滚动到底部加载事件
    $(".content_inner").on('scroll', scroll_);
    //文章点击事件   
    $("body").on('click', '.item:not(.adv)', gotoDetail);
}
//初始化界面
function initPage(){
	$("[class^=id_]").hide();
	if(IFsessionStorage(sessionStorage.cup_columnid)){				
		showSelect(sessionStorage.cup_columnid);
		changeTitle(sessionStorage.cup_columnid);
		var $dom_wrap = $("[class=id_" + sessionStorage.cup_columnid + "]");
	    var $item = $dom_wrap.find('.item');
	    if($item.length){
            $("[class=id_" + sessionStorage.cup_columnid + "]").show()
        }else{
            //这里 去加载数据
            //layer.open({content:'你要去加载数据',skin:"msg",time:2})
            $("[class=id_" + sessionStorage.cup_columnid + "]").show()
            if(sessionStorage.cup_columnid == ZA_CUP_COLUMNID.rm){
            	queryRMdata(false);//查询热门
            }else if(sessionStorage.cup_columnid == ZA_CUP_COLUMNID.yxhd){
            	queryGameData();//游戏活动
            }else{
            	queryChildData(sessionStorage.cup_columnid,false);//查询子栏目
            }            
        }
	}else{//参数错误 不应该会发生，重新在加载数据
		sessionStorage.cup_columnid = ZA_CUP_COLUMNID.rm;
		showSelect(sessionStorage.cup_columnid);
		changeTitle(sessionStorage.cup_columnid);
		$("[class=id_" + sessionStorage.cup_columnid + "]").show()
		layer.open({content:'参数错误',skin:"msg",time:2})
		queryRMdata(false);//查询热门
	}	
}
//根据columnid 更换标题
function changeTitle(cup_columnid){
	switch (cup_columnid){
		case ZA_CUP_COLUMNID.rm:
			$("#cuptitle").text(ZA_CUP_COLUMNNAME.rm);
			break;
		case ZA_CUP_COLUMNID.sstj:
			$("#cuptitle").text(ZA_CUP_COLUMNNAME.sstj);
			break;
		case ZA_CUP_COLUMNID.sdbd:
			$("#cuptitle").text(ZA_CUP_COLUMNNAME.sdbd);
			break;
		case ZA_CUP_COLUMNID.qwsjb:
			$("#cuptitle").text(ZA_CUP_COLUMNNAME.qwsjb);
			break;
		case ZA_CUP_COLUMNID.yxhd:
			$("#cuptitle").text(ZA_CUP_COLUMNNAME.yxhd);
			break;
		default:
			$("#cuptitle").text(ZA_CUP_COLUMNNAME.rm);
			break;
	}
}
//
function IFsessionStorage(o){
	if(o == undefined || o == null || o == ""){
		return false;
	}return true;
}
//判断是否已经有轮播图
function hasBanner(){
	var o = $(".mui-slider").children(".mui-slider-group");
	if(o.length > 0){
		return true;		
	}return false;
}
//热门数据 #isMore 表示 是否是分页查询的
function queryRMdata(isMore){
	var res;
	if(isMore){
		res = HCCP.ajax.get("/iation/worldcup/index/list",{
			"columnid" : ZA_CUP_COLUMNID.rm,
			"load":1,
			"page":all.data.cpage[ZA_CUP_COLUMNID.rm],
			"num":all.data.num
		})
	}else{
		res = HCCP.ajax.get("/iation/worldcup/index/list",{
			"columnid" : ZA_CUP_COLUMNID.rm
		})
	}
	console.log(JSON.stringify(res));
	if(res && res.code == 200){
		if(!all.data.isBanner){
			//banner图
			var bannerHtml = "";
			if(res.data.bannerArr && res.data.bannerArr.length){
				bannerHtml += createBannerHtml(res.data.bannerArr);
				$(".mui-slider").empty().append(bannerHtml);
				$(".mui-slider").css("height","1.85rem");
				$(".wraper").css("padding-bottom","2.29rem");
			}else if(!isMore && all.data.cpage[ZA_CUP_COLUMNID.rm] == 1){
				bannerHtml += createBannerHtml([]);
				//没有banner图
				$(".mui-slider").css("height","0px");
				$(".wraper").css("padding-bottom","0.44rem");
			}			
			var slider = mui("#slider");
	    	slider.slider({
				interval: 2000
			});
		}				
		//文章列表 包括置顶文章
		var commentHtml = "";
		if(res.data.topInfo && res.data.topInfo.length){
			commentHtml += createTopHtml(res.data.topInfo);
		}else{
			commentHtml += createTopHtml([]);
		}
		if(res.data.articleInfo && res.data.articleInfo.length){
			commentHtml += createArticleHtml(res.data.articleInfo);
		}else{
			commentHtml += createArticleHtml([]);
		}
		$("[class=id_" + ZA_CUP_COLUMNID.rm + "]").append(commentHtml);
		if(all.data.cpage[ZA_CUP_COLUMNID.rm] == 1 && res.data.articleInfo.length == 0){//第一次加载就没数据
			$("[class=id_" + ZA_CUP_COLUMNID.rm + "]").append(textAll.nodata);
			all.data.isMore[ZA_CUP_COLUMNID.rm] = false;
			return;
		}else 	
		if(all.data.cpage[ZA_CUP_COLUMNID.rm] == 1 && res.data.articleInfo.length < all.data.num){//第一次就加载完全部数据
			$("[class=id_" + ZA_CUP_COLUMNID.rm + "]").append(textAll.isOver);
			all.data.isMore[ZA_CUP_COLUMNID.rm] = false;
		}else 
		if(all.data.cpage[ZA_CUP_COLUMNID.rm] > 1 && res.data.articleInfo.length < all.data.num){//第X次就加载完全部数据
			$("[class=id_" + ZA_CUP_COLUMNID.rm + "]").append(textAll.isOver);
			all.data.isMore[ZA_CUP_COLUMNID.rm] = false;
		}else{
			all.data.cpage[ZA_CUP_COLUMNID.rm]++;
		}				
	}else if(res){
		layer.open({content:res.message,skin:"msg",time:3})
		all.data.isMore[ZA_CUP_COLUMNID.rm] = false;
		$("[class=id_" + ZA_CUP_COLUMNID.rm + "]").append(textAll.nodata);
	}else{
		layer.open({content:'网络异常，请稍后再试',skin:"msg",time:3})
		all.data.isMore[ZA_CUP_COLUMNID.rm] = false;
		$("[class=id_" + ZA_CUP_COLUMNID.rm + "]").append(textAll.nodata);
	}
}
//其他子栏目数据
function queryChildData(cup_columnid,isMore){
	var res;
	if(isMore){
		res = HCCP.ajax.get("/iation/worldcup/list",{
			"columnid" : cup_columnid,
			"load":1,
			"page":all.data.cpage[cup_columnid],
			"num":all.data.num
		})		
	}else{
		res = HCCP.ajax.get("/iation/worldcup/list",{
			"columnid" : cup_columnid
		})
	}
	console.log(JSON.stringify(res));
	if(res && res.code == 200){
		if(!all.data.isBanner){
			//banner图
			var bannerHtml = "";
			if(res.data.bannerArr && res.data.bannerArr.length){
				bannerHtml += createBannerHtml(res.data.bannerArr);
				$(".mui-slider").empty().append(bannerHtml);
				$(".mui-slider").css("height","1.85rem");
				$(".wraper").css("padding-bottom","2.29rem");
			}else if(!isMore && all.data.cpage[cup_columnid] == 1){
				bannerHtml += createBannerHtml([]);
				//没有banner图
				$(".mui-slider").css("height","0px");
				$(".wraper").css("padding-bottom","0.44rem");
			}			
			var slider = mui("#slider");
	    	slider.slider({
				interval: 2000
			});
		}
		//文章列表 包括置顶文章
		var commentHtml = "";
		if(res.data.topInfo && res.data.topInfo.length){
			commentHtml += createTopHtml(res.data.topInfo);
		}else{
			commentHtml += createTopHtml([]);
		}
		if(res.data.articleInfo && res.data.articleInfo.length){
			commentHtml += createArticleHtml(res.data.articleInfo);
		}else{
			commentHtml += createArticleHtml([]);
		}
		$("[class=id_" + cup_columnid + "]").append(commentHtml);
		if(all.data.cpage[cup_columnid] == 1 && res.data.articleInfo.length == 0){//第一次加载就没数据
			$("[class=id_" + cup_columnid + "]").append(textAll.nodata);
			all.data.isMore[cup_columnid] = false;
			return;
		}else 
		if(all.data.cpage[cup_columnid] == 1 && res.data.articleInfo.length < all.data.num){//第一次就加载完全部数据
			$("[class=id_" + cup_columnid + "]").append(textAll.isOver);
			all.data.isMore[cup_columnid] = false;
		}else 
		if(all.data.cpage[cup_columnid] > 1 && res.data.articleInfo.length < all.data.num){//第X次就加载完全部数据
			$("[class=id_" + cup_columnid + "]").append(textAll.isOver);
			all.data.isMore[cup_columnid] = false;
		}else{
			all.data.cpage[cup_columnid]++;
		}	
	}else if(res){
		layer.open({content:res.message,skin:"msg",time:3})
		all.data.isMore[cup_columnid] = false;
		$("[class=id_" + cup_columnid + "]").append(textAll.nodata);
	}else{
		layer.open({content:'网络异常，请稍后再试',skin:"msg",time:3})
		all.data.isMore[cup_columnid] = false;
		$("[class=id_" + cup_columnid + "]").append(textAll.nodata);
	}	
}
//游戏活动
function queryGameData(){
	var res = HCCP.ajax.get("/iation/worldcup/activity")
	console.log(JSON.stringify(res));
	if(res && res.code == 200){		
		if(!all.data.isBanner){
			//banner图
			var bannerHtml = "";
			if(res.data.bannerArr && res.data.bannerArr.length){
				bannerHtml += createBannerHtml(res.data.bannerArr);
				$(".mui-slider").empty().append(bannerHtml);
				$(".mui-slider").css("height","1.85rem");
				$(".wraper").css("padding-bottom","2.29rem");
			}else{
				bannerHtml += createBannerHtml([]);
				//没有banner图
				$(".mui-slider").css("height","0px");
				$(".wraper").css("padding-bottom","0.44rem");
			}			
			var slider = mui("#slider");
	    	slider.slider({
				interval: 2000
			});
		}		
		if(res.data.list && res.data.list.length){//有数据
			$("[class=id_" + ZA_CUP_COLUMNID.yxhd + "]").show();
			$("#cup_yxhd").html('').append(createGameHtml(res.data.list));
		}else{
			all.data.isMore[ZA_CUP_COLUMNID.yxhd] = false;
			$("[class=id_" + ZA_CUP_COLUMNID.yxhd + "]").html('').append(textAll.nodata);
		}
	}else if(res){
		layer.open({content:res.message,skin:"msg",time:3})
	}else{
		layer.open({content:'网络异常，请稍后再试',skin:"msg",time:3})
	}
}
//设置栏目菜单  选中样式
function showSelect(cup_columnid){
	$(".za-colunm-control a").removeClass('za-active');
	$(".za-colunm-control a").each(function(index,item){
		if(cup_columnid == item.getAttribute('columnid')){
			item.setAttribute("class",'za-active');
		} 
	})
}
//banner图HTML
function createBannerHtml(obj){
	var html = "";var p_html = "";
	if(!obj.length){
		return "";
	}
	html += "<div class='mui-slider-group mui-slider-loop'>";
	var lastObj = obj[obj.length - 1];	
	html += "<div class='mui-slider-item mui-slider-item-duplicate'><a href='"+lastObj.click_value_string+"'>";
	html += "<img src='"+lastObj.banner+"'><p class='mui-slider-title'>"+lastObj.title+"</p></a></div>";
	for(var i = 0 ;i < obj.length ; i++){
		var data = obj[i];
		html += "<div class='mui-slider-item'><a href='"+data.click_value_string+"'>";
		html += "<img src='"+data.banner+"'><p class='mui-slider-title'>"+data.title+"</p></a></div>";			
		if(i == 0){
			p_html += "<div class='mui-indicator mui-active'></div>";
		}else{
			p_html += "<div class='mui-indicator'></div>";
		}
	}
	var firstObj = obj[0];
	html += "<div class='mui-slider-item mui-slider-item-duplicate'><a href='"+firstObj.click_value_string+"'>";
	html += "<img src='"+firstObj.banner+"'><p class='mui-slider-title'>"+firstObj.title+"</p></a></div>";
	html += "</div>";
	html += "<div class='mui-slider-indicator mui-text-right'>";
	html += p_html;
	html += "</div>";
	return html;
}

//置顶文章HTML
function createTopHtml(obj){
	var html = "";
	for(var i = 0 ;i < obj.length ; i++){
		var data = obj[i];
		html += "<div class='item' id='"+data.articleId+"' title='"+data.title+"' jump='"+data.detailurl+"' keywords='"+data.keywords+"' description='"+data.description+"'>";
		html += "<div class='item_con clearfix'>";
		html += "<div class='s_back_content' style='background:url("+data.leftFigure+")no-repeat center center;background-size:cover;'></div>";
		html += "<div class='item_text'>";
		html += "<p class='title'>"+data.title+"</p>";
		html += "<p class='empty_p'></p><p class='wrap_tag'><span class='zdTag'>置顶</span><span class='redTag'>阅读"+data.article_hits+"</span></p>";
		html += "</div></div></div>";
	}
	return html;
}
//普通文章HTML
function createArticleHtml(obj){
	var html = "";
	for(var i = 0 ;i < obj.length ; i++){
		var data = obj[i];
		html += "<div class='item' id='"+data.articleId+"' title='"+data.title+"' jump='"+data.detailurl+"' keywords='"+data.keywords+"' description='"+data.description+"'>";
		html += "<div class='item_con clearfix'>";
		html += "<div class='s_back_content' style='background:url("+data.leftFigure+")no-repeat center center;background-size:cover;'></div>";
		html += "<div class='item_text'>";
		html += "<p class='title'>"+data.title+"</p>";
		html += "<p class='empty_p'></p><p class='wrap_tag'><span class='redTag'>阅读"+data.article_hits+"</span></p>";
		html += "</div></div></div>";
	}
	return html;
}
//游戏活动Html
function createGameHtml(obj){
	var html = "";
	for(var i = 0 ;i < obj.length; i++){
		var data = obj[i];
		html += "<li class='mui-table-view-cell mui-media mui-col-xs-6'><a href='"+data.activity_url+"'>";
		html += "<img class='mui-media-object' src='"+data.activity_img+"'>";
		html += "<div class='mui-media-body'>"+data.activity_name+"</div></a></li>";				    
	}
	return html;
}
//文章跳转详情
function gotoDetail(e){
	$(this).attr("id");
	sessionStorage.route = 2;//设置sessionStorage.route 使详情页返回的时候 history.back
	var _url = URL_ZIXUN_DETAIL+"?articleId="+$(this).attr("id");
	HCCP.FUNC.go(_url);
}
//重置所有栏目设置
function resetAllColumnid(cup_columnid){
    all = {
        data:{
			cup_columnid : cup_columnid?cup_columnid:ZA_CUP_COLUMNID.rm,
			isMore : {},//是否需要更多数据  false表示没有更多数据 禁止下拉
			cpage : {},//每个cupcolumnid 当前是  第几页
			num : 10,//每页请求 多少条数据
		}
    }
}
//重置单个栏目设置
function resetColumnid(cup_columnid){
    all.data.isMore[cup_columnid] = true;
    all.data.cpage[cup_columnid] = 1;
}
//上拉滚动到底部加载滚动事件
function scroll_() {	
	var nScrollHight = 0; // 滚动距离总长(注意不是滚动条的长度)
	var nScrollTop = 0; // 滚动到的当前位置
	//document.getElementsByClassName("content-warp")[0].style.height = window.innerHeight-44 + "px";
	var nDivHight = $(".content_inner").height();	
	nScrollHight = $(this)[0].scrollHeight;
	nScrollTop = $(this)[0].scrollTop;
	if(nScrollTop + nDivHight >= nScrollHight - 1){
		console.log('is bottom')
		var columnid = sessionStorage.cup_columnid;		
		if(columnid == ZA_CUP_COLUMNID.rm){
        	if(all.data.isMore[ZA_CUP_COLUMNID.rm]){queryRMdata(true);}//查询热门  false表示第一次 查
        }else if(columnid == ZA_CUP_COLUMNID.yxhd){
        	if(all.data.isMore[ZA_CUP_COLUMNID.yxhd]){queryGameData();}//游戏活动
        }else{
        	if(all.data.isMore[columnid]){queryChildData(columnid,true);}//查询子栏目
        }
	}			
}





