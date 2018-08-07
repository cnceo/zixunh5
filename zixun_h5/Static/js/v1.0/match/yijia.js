var textAll = {
	nodata2 : "<center class='nodata-center'><img src='/Static/images/v1.0/worldcup/nodata2.png' /><p>程序员们正在快马加鞭！客官莫急~</p></center>",
	nodata : "<center class='nodata-center'><img src='/Static/images/v1.0/worldcup/nodata2.png' /><p>编辑们正在快马加鞭！客官莫急~</p></center>",
//	isOver: '<div class="tip_footer">无更多内容</div>'
	isOver: ''
}
var arr = ['26','27','28','hd','bfzb'];
var all = {
	data:{
		mid : arr[0],//子栏目 id
		isMore : {},//是否需要更多数据  false表示没有更多数据 禁止下拉
		cpage : {},//每个cupcolumnid 当前是  第几页
		num : 10,//每页请求 多少条数据
		league_id : 0,//联赛id
	}
}
//初始化分页
for(value in arr){
	resetColumnid(arr[value]);
}
$(function(){
//	layer.open({type: 2,content: '正在加载中...',shadeClose: false})
	$('.mui-tab-item').removeClass('mui-active')
	$('#go_world').addClass('mui-active')
	initPage();//初始化界面
	initEvent();
})
function initIndex(){
	var res = HCCP.ajax.get("/iation/league/index")
	console.log(JSON.stringify(res));
	if(res && res.data){
		var obj = res.data;
		for(el in obj){
			$('.menu-i').eq(el).attr('league_id',obj[el].league_id)
		}
	}
}
function initPage(){	
	//$("[class^='" + mid + "']").show()
	all.data.league_id = HCCP.FUNC.getUrlParam('league_id');
//	if(sessionStorage.bannrHtml && sessionStorage.bannrHtml != "" && sessionStorage.mid && sessionStorage.mid != ""  && arr.indexOf(sessionStorage.mid) > 0){
//		$("#slider").html(sessionStorage.bannrHtml);
//		var slider = mui("#slider");
//		slider.slider({
//			interval: 3000
//		});
//	}else{
		getBanner();
//	}
	if(sessionStorage.mid && sessionStorage.mid != ""  && arr.indexOf(sessionStorage.mid) > 0){		
		$(".tab_border").remove();
		$(".wx_items .item_cell").each(function(i){
			$(".wx_items .item_cell").eq(i).removeClass('current')
		})
		$("[mid^='" + sessionStorage.mid + "']").addClass('current').append("<div class='tab_border'></div>")
		all.data.mid = sessionStorage.mid;
		if(all.data.mid == 'hd'){
	    	resetColumnid(all.data.mid);
	    	$(".hd-content").empty();
	    	getActivityList(all.data.mid);
	    }else if(all.data.mid == 'bfzb'){
	    	resetColumnid(all.data.mid);
	    	$("[class^='id_" + all.data.mid + "']").empty();
	    	getLiveData(all.data.mid);
	    	$('.refresh-right').css('display','block');
	    }else{
	    	resetColumnid(all.data.mid);
	    	$("[class^='id_" + all.data.mid + "']").empty();
	    	getAcrticleList(all.data.mid);
	    }
	    $("[class^=id_]").hide();
		$("[class^='id_" + all.data.mid + "']").show();
	}else{
		$("[class^=id_]").hide();
		$("[class^=id_]").eq(0).show();
		all.data.mid = arr[0];
		$("[mid^='" + all.data.mid + "']").addClass('current').append("<div class='tab_border'></div>")
		//获取前瞻报道文章
		getAcrticleList(all.data.mid);
	}
	initIndex();//获取 各大联赛的 id
}

function initEvent(){
    //底部菜单点击
	$(".mui-tab-item").click(function(e) {
		var index = $(this).index();
		switch(index) {
			case 0:
				window.location.href = "../info/zixun/zixun.html";
				break;
			case 1:
				window.location.href = "index.html";
				break;
			case 2:
				window.location.href = "../info/zixun/zixun_live.html";
				break;
			case 3:
				window.location.href = "../user/user_index.html";
				break;
			default:
				break;
		}
	})
    //右上角菜单  旋转
	var tab_checked = true;
	$(".tab-span").click(function(){
		skipMenu();
	})
	//弹出 或 收起 菜单 同时旋转icon
	function skipMenu(){
		if(tab_checked){
			$(".tab-span").addClass('rodte');	
			$(".tab-span").removeClass('rodte-back');
			$(".tab-menu").fadeIn(500)
		}else{
			$(".tab-span").addClass('rodte-back');
			$(".tab-span").removeClass('rodte');
			$(".tab-menu").fadeOut(300)
		}
		tab_checked = !tab_checked;			
	}
	//弹出菜单时  其他空白处 的点击  收起菜单   	
	$(".tab-menu").on("click", function(ev) {
	    var h = $(ev.target);		    
	    if (h.closest(".tab-warp").length == 0) {
	        //$(".tab-menu").fadeOut(300);
	        skipMenu();
	    }
	});
	$('.i-close').click(function(){
		$('.not-start-warp').fadeOut(300)
	})
	//点击 右上角选择菜单 跳转
	$(".tab-warp .menu-i").click(function(){
		var is_show = $(this).attr('is_show');
		if(is_show == "1"){
			$('.not-start-warp').fadeIn(300);
			setTimeout(function(){
				$('.not-start-warp').fadeOut(300);
			},2000)
			return;
		}
		var index = $(this).index()
		console.log(index)
		$(".tab-warp .menu-i").find('p').css('color','#333');
		$(this).find('p').css('color','#FD8237');
		var league_id = $(this).attr('league_id');
		if(all.data.league_id != league_id){
			sessionStorage.mid = "";
		}
		switch (index){
			case 0:
				window.location.replace("yingchao.html?league_id="+league_id);
				break;
			case 1:
				window.location.replace("fajia.html?league_id="+league_id);
				break;
			case 2:
				window.location.replace("yijia.html?league_id="+league_id);
				break;
			case 3:
				window.location.replace("dejia.html?league_id="+league_id);
				break;
			case 4:
				window.location.replace("xijia.html?league_id="+league_id);
				break;
			default:
				break;
		}
	})	
	//pullDown(".za-fresh-warp", ".lr_nb", '', 2.5, function(e) { //绑定下拉刷新事件 		    
	$('.refresh-right').click(function(){
	    layer.open({type: 2,content: '加载中'});
	    if(all.data.mid == 'hd'){
	    	resetColumnid(all.data.mid);
	    	$(".hd-content").empty();
	    	getActivityList(all.data.mid);
	    }else if(all.data.mid == 'bfzb'){
			topLoadData();
			$('.item-c').find(".date-i").removeClass('fixed-yes').addClass('fixed-no')
			$('.item-c').find(".date-i").css("top",0);
			$('html,body').animate({
				scrollTop : 0
			},100)
	    }else{
	    	resetColumnid(all.data.mid);
	    	$("[class^='id_" + all.data.mid + "']").empty();
	    	getAcrticleList(all.data.mid);
	    }
	    sessionStorage.bannrHtml = "";	    
	    //this.back(1);
	    //$('.za-fresh-warp').css('transform','none');
	    setTimeout(function(){
	    	layer.closeAll();
	    },800)
	    return;
    })
//	pullDown(".id_bfzb", ".id_bfzb", '', 2.5, function(e) { //比分直播下拉加载更多	    
//	    topLoadData();
//	    this.back(1);
//	    setTimeout(function(){   
//	    	$('.id_bfzb').css('transform','none');
//	    },100)	    
//	    return;
//  })
	//中部 栏目 点击
	$(".wx_items .item_cell").click(function(){
		$("[class^=id_]").hide();
		$(".tab_border").remove();
		$(".wx_items .item_cell").each(function(i){
			$(".wx_items .item_cell").eq(i).removeClass('current')
		})
		$(this).addClass('current').append("<div class='tab_border'></div>")
		var _mid = $(this).attr('mid'); 
		$("[class^='id_" + _mid + "']").show()
		all.data.mid = _mid;
		$('.refresh-right').css('display','none');
		if(_mid == 'bfzb'){//比分直播	
			$('.refresh-right').css('display','block');
			$(".item-c").find(".date-i").removeClass('fixed-yes').addClass('fixed-no')
			$('.item-c').eq(item_index).find(".date-i").css("top",0);
			if($("[class^='id_" + _mid + "']").find('.item-c').length == 0){
				getLiveData(_mid);
			}
		}else if(_mid == 'hd'){//请求活动接口
			if($("[class^='id_" + _mid + "']").find('.hd-item').length == 0){
				getActivityList(all.data.mid);
			}
		}else{
			if($("[class^='id_" + _mid + "']").children().length == 0){
				getAcrticleList(all.data.mid);
			}			
		}
		sessionStorage.mid = _mid;		
	})	
	var item_index = 0;//记住  是第几个  item
	//上拉滚动到底部加载事件
	$(window).scroll(function(e) {
		e.preventDefault();	
		$('.za-fresh-warp').css('transform','none');//父元素transform 属性会导致  fixed 无效
		var scrollTop = $(this).scrollTop();
		if(scrollTop == 0) return;
		var scrollHeight = $(document).height();
		var windowHeight = $(this).height();
		if (scrollTop + windowHeight == scrollHeight) {
			console.log('is bottom ')
			bottomLoadData();
		}
		//console.log(scrollTop)
		//图片懒加载用
		layzLoad(scrollTop);				
		var topd = $('.lr_nb').offset().top;//topd - scrollTop 表示到 浏览器顶端的距离
		if(scrollTop >= 229){//控制 五个栏目菜单的 显示
			$('.lr_nb').css('position','fixed');
			$('.lr_nb').css('top','0.44rem');
		}else{
			$('.lr_nb').css('position','relative');
			$('.lr_nb').css('top','0');
		}
		//console.log("  scrollTop: "+scrollTop)
		//控制 日期头部的  显示			
		if(all.data.mid == 'bfzb' && $("[class='id_bfzb']").children('.item-c').length > 0){
			$('.id_bfzb').css('transform','none');			
			var up = false;//判断是 往下滚动  还是 网上滚动
			var top1 = $('.item-c').eq(item_index).offset().top;
			if(scrollTop > 0 && scrollTop > top1 - 82){
				$('.item-c').eq(item_index).find('.date-i').removeClass('fixed-no').addClass('fixed-yes');
				$('.item-c').eq(item_index).find('.date-i').css("top",'0.84rem');
				up = false;//往下 
			}else{
				$('.item-c').eq(item_index).find(".date-i").removeClass('fixed-yes').addClass('fixed-no')
		    	$('.item-c').eq(item_index).find(".date-i").css("top",0);
		    	up = true;//往下上
			}
			//console.log('up:'+up+' index:'+item_index+' offset: '+top1+"  "+$('.item-c').eq(item_index+1).offset().top+"  scrollTop: "+scrollTop)
			if(up){//往上
				if(item_index > 0 && scrollTop < document.getElementsByClassName("item-c")[item_index-1].offsetTop){
		    		item_index--;
		    	}
			}else{//往下
				if(item_index != $(".item-c").length - 1 && scrollTop > document.getElementsByClassName("item-c")[item_index+1].offsetTop){
		    		item_index++;
		    	}
			}			
			if(up && scrollTop < 229){//往上滑到了顶部
		    	$(".item-c").eq(item_index).find(".date-i").removeClass('fixed-yes').addClass('fixed-no')
		    	$(".item-c").eq(item_index).find(".date-i").css("top",0);
		    	item_index = 0;
		    	//topLoadData();//加载比分直播 数据
		    }
			if(up && scrollTop <= 1) {
				console.log('is top ')				
			}
		}						
	});			
	//文章点击事件
//	$('.item').bind('click',function(e){
//		var index = $(this).index()
//		console.log(index)
//	})
}
//获取子栏目
function getChildLeague(){
	var res = HCCP.ajax.get("/iation/league/childLeague?league_id="+all.data.league_id)
	console.log("子栏目："+JSON.stringify(res))
}

//轮播图
function getBanner(){
	var res = HCCP.ajax.get("/iation/league/leagueBanner",{
		'league_id':parseInt(all.data.league_id)
	})
	console.log(JSON.stringify(res))
	if(res && res.data){
		var obj = res.data;
		var html = "";var p_html = "";
		if(!obj.length){
			return;
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
		$("#slider").html(html);
	}
	var slider = mui("#slider");
	slider.slider({
		interval: 3000
	});
	sessionStorage.bannrHtml = $("#slider").html();
}
//获取文章列表
function getAcrticleList(mid){
	var res = HCCP.ajax.get("/iation/league/showList?show_id=20&page=1&num=1",{
		"show_id": mid,
		"page": all.data.cpage[mid],
		"num": all.data.num,		
	})
	console.log("文章列表："+JSON.stringify(res))
	if(res && res.code == 200){
		var obj = res.data.articleInfo;
		if(all.data.cpage[mid] == 1 && obj.length == 0){//首次无数据
			all.data.isMore[mid] = false;
			$("[class^='id_" + mid + "']").html(textAll.nodata);
		}else if(all.data.cpage[mid] == 1 && obj.length > 0 && obj.length < all.data.num){//第一页就加载完所有数据
			all.data.isMore[mid] = false;
			$("[class^='id_" + mid + "']").append(createAcrticleHtml(obj));
			$("[class^='id_" + mid + "']").append(textAll.isOver);
		}else if(all.data.cpage[mid] > 1 && obj.length < all.data.num){//所有数据加载完
			all.data.isMore[mid] = false;
			$("[class^='id_" + mid + "']").append(createAcrticleHtml(obj));
			$("[class^='id_" + mid + "']").append(textAll.isOver);
		}else{
			all.data.isMore[mid] = true;
			$("[class^='id_" + mid + "']").append(createAcrticleHtml(obj));
			all.data.cpage[mid]++;
		}
	}else if(res){
		layer.open({content:res.message,skin:"msg",time:2})
	}else{
		layer.open({content:'网络异常，请稍后再试！',skin:"msg",time:2})
	}	
	layer.closeAll();
}
function createAcrticleHtml(obj){
	var html = "";
	for(el in obj){
		var data = obj[el];
		html += "<div class='item' imgload='false' imgurl='"+data.leftFigure+"' onclick=\"goDetail('"+data.detailurl+"');\"><div class='item_con clearfix'>";
		if(all.data.cpage[all.data.mid] == 1 && el < 3){
			html += "<div class='s_back_content' style='background-image:url("+data.leftFigure+");'></div>";
		}else{
			html += "<div class='s_back_content'></div>";
		}		
		html += "<div class='item_text'><p class='title'>"+data.title+"</p>";
		html += "<p class='empty_p'></p><div class='za-tag'>";
		html += "<div class='read-tag'><span></span>"+data.article_hits+"</div></div>";
		html += "</div></div></div>";
//		<div class="top-tag"><span></span><p>置顶</p></div>		
	}
	return html;
}
function goDetail(url){
	window.location.href = url;
}
//获取活动推荐
function getActivityList(mid){
	var res = HCCP.ajax.get("/iation/league/leagueActivity",{
		"page":all.data.cpage[mid],
		"num":all.data.num
	});
	//console.log(JSON.stringify(res))
	if(res && res.code == 200){
		if(res.data){
			var obj = res.data;
			if(all.data.cpage[mid] == 1 && obj.length == 0){//首次无数据
				all.data.isMore[mid] = false;
				$(".hd-content").html(textAll.nodata2);
			}else if(all.data.cpage[mid] == 1 && obj.length > 0 && obj.length < all.data.num){//第一页就加载完所有数据
				all.data.isMore[mid] = false;
				$(".hd-content").append(createActivityHtml(obj));
				$(".hd-content").append(textAll.isOver);
			}else if(all.data.cpage[mid] > 1 && obj.length < all.data.num){//所有数据加载完
				all.data.isMore[mid] = false;
				$(".hd-content").append(createActivityHtml(obj));
				$(".hd-content").append(textAll.isOver);
			}else{
				all.data.isMore[mid] = true;
				$(".hd-content").append(createActivityHtml(obj));
				all.data.cpage[mid]++;
			}
		}else{
			$(".hd-content").html(textAll.nodata);
		}
	}else if(res){
		layer.open({content:res.message,skin:"msg",time:2})
	}else{
		layer.open({content:'网络异常，请稍后重试',skin:"msg",time:2})
	}
}
function createActivityHtml(obj){
	var html = "";
	for(el in obj){
		var data = obj[el];
		if(el < 2){
			html += "<a href='"+data.activity_url+"' imgload='true' imgurl='"+data.activity_img+"' class='hd-item' style='background-image: url("+data.activity_img+");'></a>";
		}else{
			html += "<a href='"+data.activity_url+"' imgload='false' class='hd-item' imgurl='"+data.activity_img+"'></a>";
		}		
	}
	return html;
}
//图片懒加载用
function layzLoad(scrollTop){
	$('.item').each(function(){
		if($(this).offset().top - scrollTop < 500 && $(this).attr('imgload') == 'false'){
			$(this).find('.s_back_content').css('background-image','url('+$(this).attr('imgurl')+')')
			$(this).attr('imgload','true');
		}
	})
	if(all.data.mid == 'hd'){
		$('.hd-item').each(function(){
			if($(this).offset().top - scrollTop < 550 && $(this).attr('imgload') == 'false'){
				$(this).css('background-image','url('+$(this).attr('imgurl')+')')
				$(this).attr('imgload','true');
			}
		})
	}
	if(all.data.mid == 'bfzb'){
		$('.list-i').each(function(){
			if($(this).offset().top - scrollTop < 550 && $(this).find('.c-left img').attr('imgload') == 'false'){
				$(this).find('.c-left img').attr('src',$(this).find('.c-left img').attr('imgurl'))
				$(this).find('.c-left img').attr('imgload','true');
				$(this).find('.c-right img').attr('src',$(this).find('.c-right img').attr('imgurl'))
				$(this).find('.c-right img').attr('imgload','true');
			}
		})
	}
}
//获取比分直播数据
/*
 * getMore 判断分页获取的  还是 第一次获取的
 * dateStr  日期参数
 * *zss */
var dateArray = new Array();//存放 日期参数 数组 做上下分页
var index_up = 0;//往上走的指针位置
var isMore_up = true;
var index_down = 0;//往下走的指针位置
var isMore_down = true;
function getLiveData(mid){//第一次加载
	var random = Math.random();
	var res = HCCP.ajax.get("/live/getLiveList",{
		"lotyId":1,
		"hctag":"",
		"date":0,
		"random":random
	})	
	if(res && res.code == 200){
		dateArray = res.data.competition.list;
		var dstr = res.data.competition.activeTimeOrIssue;
		var index;
		for(el in dateArray){
			if(dateArray[el].time == dstr){
				index_up = parseInt(el)-1;
				index_down = parseInt(el)+1;
				index = el;
			}
		}
		var obj = res.data.list.list;
		if(obj.length == 0){
			$("[class^='id_" + mid + "']").html(textAll.nodata);
			return;
		}
		$("[class^='id_" + mid + "']").append(createLiveHtml(obj,index));						
	}else if(res){
		layer.open({content:res.message,skin:"msg",time:2})
	}else{
		layer.open({content:'网络异常,请稍后重试',skin:"msg",time:2})
	}		
}
//分页加载
function getLiveDataMore(datestr,index){
	var random = Math.random();
	var res = HCCP.ajax.get("/live/getLiveList",{
		"lotyId":1,
		"hctag":"",
		"date":datestr,
		"random":random
	})	
	if(res && res.code == 200){
		var obj = res.data.list.list;		
		return createLiveHtml(obj,index);
	}else if(res){
		layer.open({content:res.message,skin:"msg",time:2})
		return false;
	}else{
		layer.open({content:'网络异常,请稍后重试',skin:"msg",time:2})
		return false;
	}		
}
function createLiveHtml(obj,index){
	var html = "";
	if(obj.length == 0){return "";}
	html += "<div class='item-c'><div class='date-i'>"+dateArray[index].attribution+"&nbsp;"+getWeek(dateArray[index].attribution)+"</div>";
	html += "<div class='body-c'>";
	for(el in obj){
		var data = obj[el];
		html += "<div class='mui-row list-i'>";
		if(el < 2){
			html += "<div class='mui-col-xs-4 c-left'><img imgload='true' imgurl='"+data.hostLogo+"' src='"+data.hostLogo+"' /><p>"+data.hostSort+"</p></div>";
		}else{
			html += "<div class='mui-col-xs-4 c-left'><img imgload='false' imgurl='"+data.hostLogo+"'/><p>"+data.hostSort+"</p></div>";
		}				
		html += "<div class='mui-col-xs-4 c-center'>";	
		html += "<div class='match-type'>"+data.matchName+"</div>";
		if(data.status == 1){//未开始
			html += "<p style='margin-top: 10px;'>"+data.matchTimeHourAndMin+" 开赛</p>";
			html += "<img src='/Static/images/v1.0/match/i_nostart.png' /><p>未开始</p>";
		}else if(data.status == 2){//正在进行
			html += "<p style='margin-top: 10px;'>"+data.matchTimeHourAndMin+" 开赛&nbsp;&nbsp;<span style='color:#fd8237;'>"+data.statusName+"</span></p>";
			html += "<h2 style='margin: 10px 0 10px 0;'>"+getScore(data.score,0)+"</h2>";
			html += "<p style='margin-bottom: 5px;'>半场"+getScore(data.halfBf,1)+"</p>";
		}else{//已结束
			html += "<p style='margin-top: 10px;'>"+data.matchTimeHourAndMin+" 开赛&nbsp;&nbsp;"+data.statusName+"</p>";
			html += "<h2 style='margin: 10px 0 10px 0;'>"+getScore(data.score,0)+"</h2>";
			html += "<p style='margin-bottom: 5px;'>半场"+getScore(data.halfBf,1)+"</p>";
		}
		html += "</div>";
		
		if(el < 2){
			html += "<div class='mui-col-xs-4 c-right'><img imgload='true' imgurl='"+data.guestLogo+"' src='"+data.guestLogo+"' /><p>"+data.guestSort+"</p></div>";
		}else{
			html += "<div class='mui-col-xs-4 c-right'><img imgload='false' imgurl='"+data.guestLogo+"' /><p>"+data.guestSort+"</p></div>";
		}
		html += "</div>";
	}
	html += "</div></div>";
	return html;
}
//根据  日期字符串  获取星期几
function getWeek(str){
	var dd = new Date(str);
	var week = "星期" + "日一二三四五六".charAt(dd.getDay());
	return week;
}

function getScore(str,f){
	if(!str || str == ""){
		return "";
	}
	var s = str.split(':')
	if(f==0){//全场比分
		return s[0] + ' - ' + s[1];
	}else if(f==1){//半场比分
		return ' '+s[0] + '-' + s[1];
	}	
}
//滚动到 底部加载更多 数据
function bottomLoadData(){
	if(all.data.mid == 'hd'){
		if(all.data.isMore['hd']){
			getActivityList('hd');
		}
	}else if(all.data.mid == 'bfzb'){		
		if(isMore_down && index_up >= 0){
			var html = getLiveDataMore(dateArray[index_up].time,index_up);
			if(html && html == ""){
				$('.id_bfzb').append(textAll.isOver);
				isMore_down = false;
			}else if(html){
				$('.id_bfzb').append(html)
				isMore_down = true;
				index_up--;
			}						
		}else{isMore_down = false;}
	}else{
		if(all.data.isMore[all.data.mid]){
			getAcrticleList(all.data.mid);
		}
	}
}
//滚动到 顶部加载更多
function topLoadData(){
	if(isMore_up && index_down <= dateArray.length - 1){
		var html = getLiveDataMore(dateArray[index_down].time,index_down);
		if(html && html == ""){
			//$('.id_bfzb').append(textAll.isOver);
			isMore_up = false;
		}else if(html){
			$('.id_bfzb').prepend(html)
			isMore_up = true;
			index_down++;
		}						
	}else{isMore_up = false;}
}

//重置所有栏目设置
function resetAllColumnid(mid){
    all = {
        data:{
			mid : '32',//子栏目 id
			isMore : {},//是否需要更多数据  false表示没有更多数据 禁止下拉
			cpage : {},//每个cupcolumnid 当前是  第几页
			num : 10,//每页请求 多少条数据
			league_id : 0,//联赛id
		}
    }
}
//重置单个栏目设置
function resetColumnid(mid){
    all.data.isMore[mid] = true;
    all.data.cpage[mid] = 1;
}
