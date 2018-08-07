var all = {
	data:{
		page:1,
		num:5,
		isMore:true,
		firstLoad:true,//第一次进入页面
	}
}
var success_html = "<img style='height:45px;width:45px;margin-bottom:15px;' src='/Static/images/v1.0/worldcup/lx_success.png'/></br>"; 
 
$(function(){
	//第一次 引导页
	if(!localStorage.firstLoad){
		$(".za-first-bottom").show();
		localStorage.firstLoad = false;
	}else{
		$(".za-first-bottom").hide();
		localStorage.firstLoad = true;
	}	
	initEvent();
	queryList();
	all.data.firstLoad = false;//第一次加载完就设置 false
})
var myswiper = new Swiper('.swiper-container', {
	effect: 'fade',
    fade: {
       crossFade: true,
    },
	on:{
	    transitionEnd: function(swiper){
	      changeScroll(this.activeIndex);//切换结束时，告诉我现在是第几个slide
	    },
	    reachEnd: function(){
	        if(all.data.isMore && all.data.page > 1){
	        	setTimeout(function(){
	        		queryList();
	        	},1000)	        	
	        }else if(all.data.page > 1){
	        	layer.open({content:'全部被你看完啦',skin:'msg',time:2})
	        }else if(all.data.page == 1 && !all.data.firstLoad){
	        	layer.open({content:'全部被你看完啦',skin:'msg',time:2})
	        }
	    },
	    reachBeginning: function(){
	        layer.open({content:'已经是最新的啦',skin:'msg',time:2})
	    },
	 },
});
function changeScroll(index){
	var silder = $(".swiper-slide");
	var img = silder.find("img")[index];
	$(".za-bulr-bg").css("background-image","url("+img.src+")")
}
function initEvent(){
	$("#goback").click(function(){
		window.history.go(-1);
	})
	pullDown(".content_wrap", ".content_inner", '', 2.5, function(e) { //绑定下拉刷新事件 		
	    all.data.page = 1;
	    all.data.isMore = true;
	    $(".swiper-wrapper").html('')
	    queryList();
	    myswiper.slideTo(0,10,false);
	    this.back(1);
	    return;
    })
	$(".za-first-bottom").click(function(){
		$(this).hide();
	})
}
function queryList(){
	var res = HCCP.ajax.get("/iation/worldcup/DifferenceList",{
		page :all.data.page,
		num : all.data.num
	})
	console.log(JSON.stringify(res))
	if(res && res.code == 200 && res.data.length > 0 && res.data.length < all.data.num && all.data.page == 1){//第一次 就加载完成
		createHtml(res.data);
		all.data.isMore = false;
		return;
	}else if(res && res.code == 200 && res.data.length > 0 && res.data.length < all.data.num && all.data.page > 1){//分页 加载完成
		createHtml(res.data);
		all.data.isMore = false;
		return;
	}else if(res && res.code == 200 && res.data.length > 0){
		createHtml(res.data);
		all.data.page++;
	}else if(res && res.code == 200 && res.data.length == 0){
		all.data.isMore = false;
		return;
	}else if(res){
		layer.open({content:res.message,skin:'msg',time:3})
	}
}
function createHtml(obj){
	var html = "";
	for(var i = 0;i<obj.length;i++){
		var data = obj[i];
		var sj_number = USER.params.getRandomNum(1000000,99999999);
		if(i==0){
			$(".za-bulr-bg").css("background-image","url("+data.img_url+")")
		}
		html += "<div class='swiper-slide'><div class='za-img-div-warp'><img src='"+data.img_url+"' data-preview-src='' data-preview-group='1'/>";
		html += "<div class='za-date-bottom'>"+USER.params.translateDate(data.created_at)+"</div></div>";
		html += "<h4 class='mui-ellipsis-2'>"+data.title+"</h4>";
		html += "<div class='mui-row'><div class='mui-col-xs-5'><p>阅读量"+data.hit_num+"</p>";
		html += "</div><div class='mui-col-xs-7' onclick=\"downImg('"+data.img_url+"');\"><span></span><p>下载图片</p></div>";
		html += "</div></div>";		
	}
	$(".swiper-wrapper").append(html)	
	myswiper.update();
}

function downImg(imgurl){
	if(HCCP.FUNC.browser().mobile){//如果为移动端
		layer.open({content:'长按图片即可下载',skin:'msg',time:2})
	}else{
		//询问框
	  	layer.open({
	    content: '保存图片？'
	    ,btn: ['确定', '取消']
	    ,yes: function(index){	
			var $a = $("<a></a>").attr("href", imgurl).attr("download", "图片");
    		$a[0].click();
			layer.close(index)
			layer.open({content: success_html+'下载成功',skin: 'demo-css',time:2});
	    }
	   });
	}		  
}
