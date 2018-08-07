// 取出存储的图片并设置为第一位置  测试分享时能否识别为自定义的分享图片
var leftFigure = window.localStorage.getItem("leftFigure");
console.log(leftFigure);
$("#shareImg").attr({
	'src' : leftFigure
})
var Ifcollect = false;
var collect_img = {
	collected : "/Static/images/v1.0/info/user/icon_sced.png",
	uncollect : "/Static/images/v1.0/info/user/icon_sc.png"
}
//zsscode
function columnLiClick(columnid,dom){
	var index = dom.index();			
	$(".my-label-list label").each(function(index2,item){
		$(".my-label-list label").css("background","#ebecf1");
		$(".my-label-list label").css("color","#333");
		$(".my-label-list label").eq(index).css("background","#FD8237 ");
		$(".my-label-list label").eq(index).css("color","#fff");
	});
    setTimeout(function(){
    	window.location.href = "zixun.html?columnid="+columnid;
    },300)			
} 
var url = window.location.href;
var reg = new RegExp("(^|&|/?)articleId=([^&]*)(&|$)");
var articleId = url.match(reg);
if(articleId){
	$.ajax({
		type:"GET",
		dataType:"json",
	    url: REMOTE_DATA_URL + "/iation/haocai/seoContents",
	    data:{"articleId":articleId[2]},
	    success:function(res){
	    	if(res.code==200){
	    		//更改标题
				if(res.data.title){
					$("title").text(res.data.title)
				}
				//更改搜索关键
				if(res.keywords){
					$("meta[name=keywords]").attr("content",res.data.keywords)
				}
				if(res.description){
					$("meta[name=description]").attr("content",res.data.description)
				}
	    	}
	    },
	    error:function(){}
	});
}
		
$(document).ready(function($) {
			//zsscode			
			mui.init();
			mui('.mui-scroll-wrapper').scroll();
			getArticlePLcount();
			ifCollectByUser();
			initEvent();
			
			//弹出栏目选择框监听
			$("#menu").click(function(){
		    	$("#nav_more_view").show();
    		})
			$("#nav_more_close").click(function(){
				$("#nav_more_view").hide();
			})
			get("/iation/haocai/index", start);
			//首次进入回调
		    function get(urlname, fn) {
		        var result;
		        $.ajax({
		            type: "get",
		            url: REMOTE_DATA_URL + urlname,
		            async: true,
		            data: {
		                "identity": HCQD.identity(),
		                "platform": HCQD.platform()
		            },
		            xhrFields: {
		                withCredentials: true
		            },
		            crossDomain: true,
		            complete: function(data) {
		                result = data.responseJSON;
		                console.log(data)
//		                if (result && result.code == 200 && result.data) {
//		                    if (fn) {
//		                        fn(result)
//		                    }
//		                } else {
//		                    $(".f_error").show()
//		                    return
//		                }		
		            },
		        });
		    }
		    
			//首次获取咨询内容
		    function start(list){ 
		    	var data = list.data;
		    	var columnInfo =  data.columnInfo || [];
		    	//渲染栏目html
        		var columnHtml = getcolumnHtml(columnInfo);
        		$('.my-label-list').empty().append(columnHtml)      		       		
		    }
		    //创建栏目菜单项页面
		    function getcolumnHtml(columnInfo){
		    	var columnHtml = "";		
		    	$.each(columnInfo, function(index, el) {
		    		var _id = HCCP.FUNC.getUrlParam("columnid");	    				    		
					if(_id == el.columnid){
		    			columnHtml += "<label style='background: #FD8237 ;color: #fff;' columnid=" + el.columnid + " onclick='columnLiClick("+el.columnid+",$(this));'>"+el.columnname+"</label>";
		    		}else{
		    			columnHtml += "<label columnid=" + el.columnid + " onclick='columnLiClick("+el.columnid+",$(this));'>"+el.columnname+"</label>";
		    		}
		        });
		        return columnHtml;
		    }
		    
			var url = HCCP.FUNC.getUrlParam("jump"),
				title = HCCP.FUNC.getUrlParam("title"),
				keywords = HCCP.FUNC.getUrlParam("keywords"),
				description = HCCP.FUNC.getUrlParam("description"),
				back = document.getElementsByClassName("back")[0],
				//zsscode
				columnid = HCCP.FUNC.getUrlParam("columnid")
				;

				back.onclick = function(){
					window.localStorage.removeItem("jumpZixunDetail")
					//window.history.back()
					//zsscode
					if(sessionStorage.route){
						window.history.back()
					}else{
						window.location.href = "zixun.html?columnid="+columnid;
					}					
				}

			

			if(articleId){
				url = REMOTE_DATA_URL + "/iation/articledetail1/"+articleId[2]+"?platform=3&iationType=haocai";
			}else{
				//更改标题
				if(title){
					$("title").text(title)
				}
				//更改搜索关键
				if(keywords){
					$("meta[name=keywords]").attr("content",keywords)
				}
				if(description){
					$("meta[name=description]").attr("content",description)
				}
			}

			if(url){
				console.log(url);
	            $iframe = $('<iframe frameborder="0" id="jrhc" name="jrhc" marginwidth="0" marginheight="0" frameborder="0" scrolling="no"  width="100%" height="100%"> </iframe>')
	            $iframe.attr({
	                src: url
	            });	
				$("section").append($iframe);	
				console.log("body width:"+$(document).width())			
				$("#jrhc").css("width",$(document).width()+"px");
				console.log($("#jrhc").css("width"));
			}
		})

function initEvent(){
	var articleId = HCCP.FUNC.getUrlParam("articleId");//文章id
	//底部栏点击事件
	$(".za_footer_wrap a").click(function(){
//		if(!USER.ifLogin()){//跳转登录界面
//			window.location.href = "../../user/user_login.html?router=detail"+"&url="+encodeURIComponent(window.location.href);
//			return;
//		}
		var index = $(this).index();
		switch(index){
            case 0 :
            	sessionStorage.eidtFlag = 1;
                window.location.href = "../../user/"+USER.hrefUrl.commented + "?articleId="+encodeURIComponent(HCCP.FUNC.getUrlParam("articleId"));
                break;
            case 1 :
                window.location.href = "../../user/"+USER.hrefUrl.commented + "?articleId="+encodeURIComponent(HCCP.FUNC.getUrlParam("articleId"));
                break;
            case 2 ://收藏
				doCollection();
                break;           
        }
	})
	
//	$("#jrhc").load(function(){
//		console.log("body width:"+$(document).width())			
//		$("#jrhc").css("width",$(document).width()+"px");
//		console.log($("#jrhc").css("width"));
//	})
}
//收藏文章操作
function doCollection(){
	var res = HCCP.ajax.post(
		'/iation/article/collection',{
			"articleid":HCCP.FUNC.getUrlParam("articleId")
		});
	console.log(JSON.stringify(res))	
	if(res && res.code == 200){
		if(res.data.flag == 0){
			layer.open({ content: res.message,skin: 'msg',time: 2});
			$(".do-sc img").attr("src",collect_img.collected);
		}
		if(res.data.flag == 1){
			$(".do-sc img").attr("src",collect_img.uncollect);
			layer.open({ content: res.message,skin: 'msg',time: 2});
		}		
	}else if(res && res.code == 401){
		window.location.href = "../../user/user_login.html?router=detail"+"&url="+encodeURIComponent(window.location.href);
	}
	else{//
		layer.open({ content: res.message,skin: 'msg',time: 3});
	}
}
//获取该文章的总评论数量
function getArticlePLcount(){
	if(HCCP.FUNC.getUrlParam("articleId")){
		var res = HCCP.ajax.post('/iation/reply/list',{
			"articleId": HCCP.FUNC.getUrlParam("articleId"),
			"page": 1,
			"num": 5
		});
		console.log(JSON.stringify(res))
		if(res && res.code == 200){
			if(res.data.list instanceof Array && res.data.list.length <= 0){//无评论消息
				$("#msgtotal").hide();
				return;
			}			
			$("#msgtotal").text(res.data.list.total);
			$("#msgtotal").show();
		}
	}
}
//判断该片文章是否被当前用户点赞
function ifCollectByUser(){
	if(localStorage.uid == ""){
		return false;
	}
	var res = HCCP.ajax.post('/iation/article/iscollection',{
		"articleId": HCCP.FUNC.getUrlParam("articleId"),
		"uid": localStorage.uid
	});
	console.log(JSON.stringify(res))
	if(res && res.code == 200){
		if(res.data == true){
			$(".do-sc img").attr("src",collect_img.collected);
			return true;
		}else{
			$(".do-sc img").attr("src",collect_img.uncollect);
			return false;
		}
	}else{
		return false;
	}
}

