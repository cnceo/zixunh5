//取一下跳转参数 jumpType = 1 从新资讯页面跳过来
var jumpType = HCCP.FUNC.getUrlParam("jumpType") || ""
$(document).ready(function() {
	var data = HCCP.info.award("11?issue=0&limit=20");
	if (data == undefined) {
		//alert("No Data");
		return;
	}
	var statusCode = data.code;
	if (statusCode != 200) {
		HCCP.FUNC.alert(data.message);
		return;
	}
	//
	init_data(data.data);
	down_pull();
	//滚动监控
	bindReachBottom();
	//增加搜索功能
	$(".search-issue").on('click',function(){
		$('#keyboard').show();
		$(".qr_mask").show();
		$(".search-issue").text('');
	    $('.issue-search-close').addClass('bg-change');
	    $(".search-issue").addClass('add-search-logo');
	});
	$('.kj_issue_search').on('click','.bg-change',function(){
		$('.issue-search-close').removeClass('bg-change');
		$(".search-issue").removeClass('add-search-logo').text('搜索开奖期号，例：2018003');
		$('#keyboard').hide();
		$(".qr_mask").hide();
		if($(this).hasClass('haschecked')){
			location.reload();
		}else{
			$(this).removeClass('haschecked')
		}
	})
	//调起键盘
	$(".search-issue").numKeyBoard({
	 	after: 'body',
	 	'minVal':'',
	 	'maxVal': maxVal,
        keyBoardId:'keyboard',
        callBack: function(num, flag) {
        	if (flag == 'N') {
            }
            if(flag == 'Y'){
            	$('.qr_mask').hide();
            	Gogetissue();
            }
        }
	})
	// 点击遮罩层
   $(".qr_mask").on("click",function(){
    	if($(".search-issue").text()){
    		$('.qr_mask').hide();
    		$('#keyboard').find('.sure').click();
    	}else{
    		if($('.issue-search-close').hasClass('haschecked')){
    			Gogetissue();
	    	}else{
	    		$('#keyboard').find('.sure').click();
	    	}
			$(".search-issue").removeClass('add-search-logo').text('搜索开奖期号，例：2018003');
			$('#keyboard').hide();
			$(".qr_mask").hide();
    	}
    });
	//
	$("body").on('click',".ssq_items ul li", function(){ 
		if(jumpType == "zixun"){
			HCCP.FUNC.go(URL_INFO_KAIJIANG_DLT_DETAIL+"?"+$(this).attr("id")+'&jumpType=zixun');
		}else{
			HCCP.FUNC.go(URL_INFO_KAIJIANG_DLT_DETAIL+"?"+$(this).attr("id"));
		}
	})
	$("footer button").on('click', function(){ HCCP.FUNC.go(URL_TRADE_DLT); });

	//方法
	var maxVal;
	function init_data(data){
		var tHtml = "";
		var tmp ;
		var reg = new RegExp(",","g");
		var ssqdate;
		$.each(data, function(x,item) {
			if(x == 0){ //获取期号查询最大值
				maxVal = item.issue;
			}
			issue=item.issue;
			ssqdate = item.date;
			ssqdate = ssqdate.substr(4,2)+"-"+ssqdate.substr(6,2)+"（"+getWeekByDate(ssqdate)+"）";
			tHtml = "";
			tHtml += "<li";
			if(x==0){
				tHtml += ' class="latest"'		
			}
			tHtml += " id='"+item.issue+"'>";
			if(x==0){
				tHtml += "<div class='arrow_r'></div>"
			}
			tHtml += "<p><span class='issue'>第"+item.issue+"期</span><span class='date'>"+ssqdate+"</span>";
			if(x==0){
				tHtml += "<span class='latest_sign'>最新</span>";
			}
			tHtml += "</p>";
			tmp = item.openCode.replace("\|","<\/span><span>");
			
			tHtml += "<div class='ssq_item'><span>"+tmp.replace(reg,"</span><span>")+"</span></div>";
			$(".ssq_items ul").append(tHtml);
		});
	}
	function init_data2(data){
		var tHtml = "";
		var tmp ;
		var reg = new RegExp(",","g");
		var ssqdate;
		$.each(data, function(x,item) {
			issue=item.issue;
			ssqdate = item.date;
			ssqdate = ssqdate.substr(4,2)+"-"+ssqdate.substr(6,2)+"（"+getWeekByDate(ssqdate)+"）";
			tHtml = "";
			tHtml += "<li";
			tHtml += " id='"+item.issue+"'>";
			//if(x==0){
			//	tHtml += "<div class='arrow_r'></div>"
			//}
			tHtml += "<p><span class='issue'>第"+item.issue+"期</span><span class='date'>"+ssqdate+"</span>";
			tHtml += "</p>";
			tmp = item.openCode.replace("\|","<\/span><span>");

			tHtml += "<div class='ssq_item'><span>"+tmp.replace(reg,"</span><span>")+"</span></div>";
			$(".ssq_items ul").append(tHtml);
		});
	}
	//日期，取星期,dateStr是不需要间隔符的
	function getWeekByDate(dateStr, type) {
		var dayNames = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
		var dayNamesW = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
		var formatTime = dateStr.substr(0, 4) + "/" + dateStr.substr(4, 2) + "/" + dateStr.substr(6, 2);
		var theCCDate = new Date((new Date(formatTime)).getTime());
		if (type == "xq") {
			return dayNamesW[theCCDate.getDay()];
		}
		return dayNames[theCCDate.getDay()];
	}
	function showOver() {
	    var h = '<div class="hc-upload-text hc-text-center hc-padding">好坏呦～伦家都被你看光啦</div>';
	    $('.ssq_items').append(h);
	}
	//下拉加载新数据
	function down_pull(){
		var flag=false;
		$('.wraper .ssq_items').scroll( function(event){
			//当内容滚动到底部时加载新的内容 100当距离最底部100个像素时开始加载.
			if(!flag){
				if ($(this).scrollTop() + $('.wraper .ssq_items').height() + 10 >= $('.wraper .ssq_items ul').height() && $(this).scrollTop() > 10) {
					var data = HCCP.info.award("11?issue="+issue+"&limit=20");
					if(data.data.length<20){
						init_data2(data.data);
						showOver();
						flag=true;
					}else {
						init_data2(data.data);
					}

				}
			}
		})
	}
	//搜索期号
	function Gogetissue(){
		if($(".search-issue").text().length == 7){
			var checkIssue = $(".search-issue").text().trim();
			var data = HCCP.info.award("11?issue="+(+checkIssue+1)+"&limit=1&checkIssue=1");
			if(data.code == 200){
				$(".ssq_items ul").html('');
				init_data2(data.data);
				$('.issue-search-close').addClass('haschecked');
				$(".ssq_items ul li").on('click', function(){ HCCP.FUNC.go(URL_INFO_KAIJIANG_DLT_DETAIL+"?"+$(this).attr("id"));})
			}else{
				if(data.message){
					HCCP.modal.alert({msg:data.message})
				}else{
					HCCP.modal.alert({msg:'系统繁忙'})
				}
			}
			
		}else{
			$(".search-issue").removeClass('add-search-logo').text('搜索开奖期号，例：2018003');
			 $('.issue-search-close').removeClass('bg-change');
			HCCP.modal.alert({ 
				msg:'请输入正确的格式',
				alertCallback:resetload
			});
		}
	}
	 //监听滚动事件
	function bindReachBottom() {
	    var head = $('.kj_issue_search'),
	        height = head.height();
		    $('.ssq_items').on('scroll', function() {
		        var top = $(this).scrollTop();
		        opacity = top / height < 1 ? (1-top / height) : 0;
				if(opacity <= 0.1){
					head.hide()
				}else{
					head.show()
				}
		        head.css('opacity', opacity);
		       
		    })
	}
	function resetload(){
		if($('.issue-search-close').hasClass('haschecked')){
			location.reload();
		}else{
	    }
	}

});