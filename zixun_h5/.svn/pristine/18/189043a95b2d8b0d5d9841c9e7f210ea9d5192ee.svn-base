$(document).ready(function() {
	//用try的原因的即使取不到本地时间导致报错也不影响时间选择功能也能正常进行
	try{
        var serverTime = HCCP.common.time();
        if(serverTime || serverTime.code == 200){
            var st = serverTime.data.serverTime * 1000;
        }else{
            if(serverTime.message){
                HCCP.modal.warning({msg:serverTime.message})
            }else{
                HCCP.modal.warning({msg:"系统繁忙"})
            }                    
        }
    }catch(e){
        var st = new Date().getTime();
    }
    
    if(!st){
        st = new Date().getTime();
    }

	var currYear = (new Date(st)).getFullYear();	
	var opt={};
	opt.date = {preset : 'date'};
	opt.datetime = {preset : 'datetime'};
	opt.time = {preset : 'time'};
	opt.default = {
		theme: 'android-ics light', //皮肤样式
		display: 'bottom', //显示方式 
		mode: 'scroller', //日期选择模式
		dateFormat: 'yyyy-mm-dd',
		lang: 'zh',
		showNow: false,
		startYear: currYear - 1, //开始年份
		endYear: currYear, //结束年份
		st: st,   //服務器時間
		yesCallBack: function(){
			var award = HCCP.info.award(2,$(".calen").data("date"));
			if(award || award.code == 200){
				dataLoad(award.data,true);
			}else{
	            if(award.message){
	                HCCP.modal.warning({msg:award.message})
	            }else{
	                HCCP.modal.warning({msg:"系统繁忙"})
	            }                    
	        }
			
		},
		noCallBack: function(){
			//
		}
	};

	$(".calen").mobiscroll($.extend(opt['date'], opt['default']));

	$('.detele-colse').on('click', function () {$('.headinfo').hide();});
	var data = HCCP.info.award(2);
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
	dataLoad(data.data);
//
	$('.wraper .jclq_details').scroll(function(){
		var i = 1000;
		var top = $('.hc-h5-wrap > header').height() || 0;
		$(".jclq_date").each(function(){
			fixedTop(this,top,i++);
		})
	});
	//增加链接
	$('.jclq_item').on('click',function(){
		if($(this).children('.am-ifhas-arrow-right').hasClass('am-arrow-right')){
			var that = $(this).children('.am-ifhas-arrow-right'),
                url = that.data("jumpurl"),
                host = that.data('host'),
                guest = that.data('guest');
            var jumpAnalyse = {
                host:host,
                guest:guest,
                url:url
            }
            localStorage.setItem("jumpAnalyse", JSON.stringify(jumpAnalyse));
            HCCP.FUNC.go(URL_TRADE_ANALY);
			// window.location.href=jczq_infourl
		}else{

		}
	})
	//
	$(document).on('click', ".jclq_date span" , shDay);
	//点击进入下一页
	$("footer button").on('click', function(){ HCCP.FUNC.go(URL_TRADE_JCLQ); });
});

function dataLoad(data,cBool){

	var tHtml;
	var dHtml;
	var gameid;
	var gamedate;
	var gamedateArr = new Array();
	//大循环
	if(data.length==0){
		$(".jclq_details").html('<div class="no_detail"><div></div><p>暂无数据显示</p></div>')
	}
	$.each(data, function(x,item) {
		tHtml = dHtml = '';
		gameid = item.gameId.toString();
		gamedate = gameid.substr(0,8);
		//console.log(gamedateArr[gamedate])
		//第一次出现
		if(gamedateArr[gamedate]==undefined){
			//
			if(cBool){
				$(".jclq_details").html('<div class="jclq_date_items" id="'+gamedate+'"></div>');
			}else{
				$(".jclq_details").append('<div class="jclq_date_items" id="'+gamedate+'"></div>');
			}
			
			dHtml +='<div class="jclq_date"><div>';
			dHtml += gameid.substr(4,2)+"月"+gameid.substr(6,2)+"日";
			dHtml += "（"+getWeekByDate(gamedate)+"）共<hc name='num"+gamedate+"'></hc>场比赛";
			//几天几场比赛   7月2日（周六）共13场比赛
			dHtml += '<span class="arrow_up"></span></div></div>';
			$("#"+gamedate).append(dHtml);
			gamedateArr[gamedate]=1;
		}else{
			gamedateArr[gamedate]++;
		}
		$("hc[name='num"+gamedate+"']").text(gamedateArr[gamedate]);
		tHtml += '<div class="jclq_item"><div class="jclq_item_title">';
		tHtml += '<div class="f_left jclq_ls">';
		item.changci=''+item.changci;
		if(item.changci.length==2){
			item.changci='0'+item.changci
		}else if(item.changci.length==1){
			item.changci='00'+item.changci
		}
		tHtml += '<span>'+item.matchName+'</span><span>'+item.changci+'</span>';
		tHtml += '</div><div class="jclq_item_tt">';
		tHtml += item.guest+'<label class="jclq_bf';
		if(item.hostScore > item.guestScore){
			tHtml += ' jc_bf_3';
		}else if(item.hostScore < item.guestScore){
			tHtml += ' jc_bf_0';
		}else{
			tHtml += ' jc_bf_1';
		}
		tHtml += '">'+item.guestScore +':'+item.hostScore+'</label>'+item.host+'</div></div>';
		tHtml += '<div class="jclq_item_result"><table><tr>';
		tHtml += '<td class="title">胜负</td>';
		tHtml += '<td class="title">让分<span class="rf_g';
		if(item.rf > 0){
			tHtml += " jc_rq_g";
			item.rf = "+"+item.rf;
		}else{
			tHtml += " jc_rq_h";
		}
		tHtml += '">('+item.rf+')</span></td>';
		tHtml += '<td class="title">大小分<span class="dxf_g" >('+item.dxf+")</span></td>";
		tHtml += '<td class="title">胜分差</td>';
		tHtml += '</tr><tr>';

		var resultkey = ["2","3","5","4"];
		$.each(resultkey,function(pid,rst){
			if(item.result[rst] == undefined){
				tHtml += '<td><span>-</span></td>';
			}else{
				$.each(item.result[rst], function(rs,sp) {
					tHtml += '<td>'+getSimpleRealrs(rst,rs)+'<span>'+sp+'</span></td>';
				});
			}

		});
		tHtml += '</tr></table></div>';
		//判断是否有链接  
		tHtml +='<div class="am-ifhas-arrow-right';
		if(item.infoUrl){
			tHtml +=' am-arrow-right" data-jumpurl='+item.infoUrl+' data-guest = '+item.guest+' data-host='+item.host+'></div>';
		}
		tHtml += '</div>';
		$("#"+gamedate).append(tHtml);
	});
}
function fixedTop(ele,top,zIndex) {
	var ele = $(ele),
			childele = ele.children(),
			offset = ele.offset();
	if(offset.top<top){
		childele.css({
			position:"fixed",
			zIndex:zIndex,
			top:top+'px'
		});
	}else{
		childele.css({
			position:"relative",
			top:"0px"
		});
	}
}
//
function shDay(){
	$(this).toggleClass("arrow_down");
	$(this).toggleClass("arrow_up");
	if($(this).hasClass("arrow_down")){
		$(this).css("border-bottom","0");
	}
	var tmp = $(this).parent().parent();
	if($(this).hasClass("arrow_down")){
		//tmp.css("border-bottom","0");
	}else{
		//tmp.css("border-bottom","1px solid #D9D9D9");
	}
	gamedate = tmp.parent().attr("id");
	$("#"+gamedate+" .jclq_item").toggle();
}
function getCcBygameid(gameId) {
	gameId = gameId.toString();
	var dayNames = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
	var gameIdTime = gameId.substr(0, 4) + "/" + gameId.substr(4, 2) + "/" + gameId.substr(6, 2);
	var gameCC = gameId.substr(8);
	var gameCCDate = new Date((new Date(gameIdTime)).getTime());

	return dayNames[gameCCDate.getDay()] + gameCC;
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
$('.back').on('click',function(){
		if(HCCP.FUNC.getUrlParam('sidebar') == 1){
			HCCP.FUNC.go(URL_TRADE_JCLQ);
		}else{
			javascript:history.back(-1);
		}
})
function getSimpleRealrs(play_id, rs) {
	var spfArr = {
		"3": "主胜",
		"0": "客胜",
	};
	var rqspfArr = {
		"3": "主胜",
		"0": "客胜",
	};
	var dxfArr = {
		"0": "小分",
		"3": "大分"
	};
	var sfcArr = {
		"01": "客胜1-5",
		"02": "客胜6-10",
		"03": "客胜11-15",
		"04": "客胜16-20",
		"05": "客胜21-25",
		"06": "客胜26+",
		"11": "主胜1-5",
		"12": "主胜6-10",
		"13": "主胜11-15",
		"14": "主胜16-20",
		"15": "主胜21-25",
		"16": "主胜26+",
	}
	if (play_id == 2) {
		return spfArr[rs];
	} else if (play_id == 3) {
		return rqspfArr[rs];
	} else if (play_id == 4) {
		return sfcArr[rs];
	} else if (play_id == 5) {
		return dxfArr[rs];
	}
}