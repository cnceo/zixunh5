var betObj = new Object();
$(document).ready(function() {
	//标识进入了双色球
	try {
		var basic = JSON.parse(HCCP.dataS.local.get("basic"));
	} catch(e) {}
	if(basic == null || basic.lotyId == undefined || basic.lotyId != 16) {
		basic = new Object();
		basic.lotyId = 16;
	} 
	if(basic.playId == undefined || !basic.playId) {
		basic.playId = 1;
	}
	betObj.lotyId = basic.lotyId;
	betObj.playId = 0;

	HCCP.dataS.local.set("basic", JSON.stringify(basic));
	//设置球
	init_data();
	// 绑定一下事件
	bindEve()
	//加载开奖信息
	loadAward()
	//加载走势图
	loadZoushi()
	//加载一下期号
	loadIssue()
	// 筛选
	filter();
	// $('.tendency').on('click', function() {
		
		
	// });
});
// 筛选
function filter(){
		//点击设置
	var startStatus = [30,0,0];
	var tempStatue = [30,0,0];
	$('.setting').on('click', function(event) {
		$('#filter_popup').show();
	});
	// 筛选期号
	$('.name_filter').on('click', 'span', function(event) {
		event.preventDefault();
		$(this).addClass('active').siblings().removeClass('active')
		tempStatue[0]=$(this).attr("data-indexof");
		// console.log(tempStatue)
	});
	//筛选
	$('.yilou').on('click','.cheakSelect', function(event) {
		event.preventDefault();
		/* Act on the event */
		$('.yilou .cheakSelect').removeClass('active')
		$(this).addClass('active')
		tempStatue[1]=$(this).attr('isCheack')
		// console.log(tempStatue)

	});
	$('.tongji').on('click','.cheakSelect', function(event) {
		event.preventDefault();
		/* Act on the event */
		$('.tongji .cheakSelect').removeClass('active')
		$(this).addClass('active')
		tempStatue[2]=$(this).attr('isCheack')
		// console.log(tempStatue)
	});
	$('.f_submit').on('click',  function(event) {
		event.preventDefault();
		/* Act on the event */
		for(i in tempStatue){
			startStatus[i] = tempStatue[i]
		}
		// console.log(startStatus)
		//加载开奖信息
		loadAward(startStatus[0])
		//加载走势图
		loadZoushi(startStatus[0])
		if(startStatus[1]==0){
			$('.omitBall').show()			
		}else{
			$('.omitBall').hide()
		}
		if(startStatus[2]==0){
			$('.li_tongji').show()
			$('.trtongji').show()
		}else{
			$('.li_tongji').hide()
			$('.trtongji').hide()
		}

		$('#filter_popup').hide();
	});
	$('.f_reset').on('click',  function(event) {
		// console.log(startStatus)
		$('.name_filter span').removeClass('active')
		$("[data-indexof="+ startStatus[0] +"]").addClass('active')
		//加载开奖信息
		loadAward(startStatus[0])
		//加载走势图
		loadZoushi(startStatus[0])
		$('.yilou .cheakSelect').removeClass('active')
		$('.tongji .cheakSelect').removeClass('active')
		$('.yilou [isCheack='+ startStatus[1] +']').addClass('active')
		$('.tongji [isCheack='+ startStatus[2] +']').addClass('active')
		
		if(startStatus[1]==0){
			$('.omitBall').show()
		}else{
			$('.omitBall').hide()	
		}
		if(startStatus[2]==0){
			$('.li_tongji').show()
			$('.trtongji').show()
		}else{
			$('.li_tongji').hide()
			$('.trtongji').hide()
		}
		$('#filter_popup').hide();
	});
	$( ".award_content tbody tr:last-child")[0].scrollIntoView(true);
}
//从新渲染
function reload(){
	//加载开奖信息
	loadAward()
	//加载走势图
	loadZoushi()
	//加载一下期号
	loadIssue()
}
// 事件绑定(没有委托需重新绑定)
function bindEve(){
	//绑定选球
	$(".red_ball").on('click',  selectRedBall);
	//绑定确认
	$(".submit").on('click',  goBuy);
	// 绑定滚动
	$(".right_ ").scroll(function() {
		var scrollLeft = this.scrollLeft
		$('.top_right').scrollLeft(scrollLeft)
		$('.ssq_red_ball').scrollLeft(scrollLeft)
	});
	$(".top_right ").scroll(function() {
		var scrollLeft = this.scrollLeft
		$('.right_').scrollLeft(scrollLeft)
		$('.ssq_red_ball').scrollLeft(scrollLeft)

	});	
	$(".ssq_red_ball").scroll(function(e) {
		var even = e||window.event
		var scrollLeft = this.scrollLeft
		$('.right_').scrollLeft(scrollLeft)
		$('.top_right').scrollLeft(scrollLeft)
	});	
	//tab切换
	$('.award').on('click', function() {
		$('.tab').removeClass('choose')
		$(this).addClass('choose')
		$('.tabLi').hide()
		$('.award_detail').show()
		$('.top_').hide()
		$('.yilou').hide()
		$('.tongji').hide()
	});
	$('.tendency').on('click', function() {
		$('.tab').removeClass('choose')
		$(this).addClass('choose')
		$('.tabLi').hide()
		$('.tendency_detail').show()
		$('.top_').show()
		$('.yilou').show()
		$('.tongji').show()
		$(".right_ tr:last-child")[0].scrollIntoView(true);
	});

}
// 加载开奖信息
function loadAward(num){
	if(num || num!=null){
		var number = num
	}else{
		var number = 30
	}
	// console.log(number)
	var latelyissue = HCCP.qlc.latelyissue(number);
	if(latelyissue.code == 200) {
		//加载开奖信息
		backHtml_(latelyissue.data);
	}
}
//加载走势
function loadZoushi(num){
	if(num || num!=null){
		var number = num
	}else{
		var number = 30
	}
	// console.log(number)
	//取一下信息
	var trendinfo = HCCP.ajax.get('/info/trendinfo/16?limit='+number+'&type=1')
	if(trendinfo.code == 200){
		addTendency(trendinfo)
	}
}
// 加载期号信息
function loadIssue(){
	var issueData =HCCP.qlc.issue()
	// console.log(issueData)
	if(issueData.code == 200) {
		// 初始化倒计时期号
		init_iss(issueData)
		//加载剩余时间
		var timer;
		shengyu(issueData)
	}
}
//显示初始倒计时期数
function init_iss(issueData){
	var issue = ''+issueData.data.issue
	issue = issue.substr(4)
	$('.nextIssue').html(issue);
}
//先快速显示一下期号（后面还有校准）
function hqqh(issue){
    var issue = issue.substr(4);
    var issue_next = parseInt(issue) + 1
    if(issue_next<10){
    	issue_next="00"+issue_next
    }else if(issue_next<100){
    	issue_next="0"+issue_next
    }
    $('.nextIssue').html(issue_next);
    HCCP.modal.alert({
    	msg:issue+"期已经截止，"+issue_next+"期开始投注"
    });

	// return;

}
// 加载剩余时间
function shengyu(json){
    var serverTime="";
    var data='';	
    serverTime = json.data.serverTime;
    timer=setInterval(function () {
        date=json.data.companyEndTime
        serverTime++;

        var sytime=(date-serverTime)*1000;
        sytime = Math.floor(sytime/1000);
        var issue=""+json.data.issue;
        // console.log(sytime)
        if(sytime==0){
        	clearInterval(timer);
            hqqh(issue);
            //全部重新渲染
            reload()
        }
        var H=Math.floor(sytime/3600);
        var M=Math.floor(sytime%3600/60);
    
        var s= sytime%60;
        if(M<10){
            M='0'+M;
        }
        if(s<10){
            s='0'+s;
        }
        if(H<10){
            H='0'+H;
        }
        if(H<=0){
            $('.CounterTime').html(M+':'+s);
        }else if(H>0) {
            $('.CounterTime').html(H+ ':' +M+':'+s)
        }
    },1000)
    
    //每5分钟加载一次，缩小误差
    setInterval(function(){
    	clearInterval(timer);
        loadIssue()
    },300000)
}

function addTendency(data){
	// console.log(data)
	var data=data.data
	var issueHtml="";
	var totalHtml="";
	var omitHtml=sHtmoccurrenceTimeHtml=avgOmitHtml=maxOmitHtml=maxComboHtml="";
	var num = FUNC.getJsonLen(data.omit)
	$.each(data.omit,function(issue, omitArr) {
		issueHtml+="<li class='omitLi'>"+issue.substr(4)+"期</li>"

		omitHtml+="<tr class='omitTr'>"
		$.each(omitArr,function(index, omitNum ) {
			var number = index+1
			numner = number>=10?number:"0"+number
			if(omitNum==0){
				omitHtml+='<td><span class="redBall">'+ numner+'</span></td>'
			}else if(omitNum==-1){
				omitHtml+='<td><span class="blueBall">'+numner+'</span></td>'
			}else{
				omitHtml+='<td><span class="omitBall">'+omitNum+'</span></td>'
			}
		})
		omitHtml+="</tr>"
	});

	//出现次数 
	sHtmoccurrenceTimeHtml+="<tr class='TimeTr trtongji'>"
	$.each(data.occurrenceTimes,function(index, TimesNum ) {
		sHtmoccurrenceTimeHtml+='<td><span>'+ TimesNum+'</span></td>'
	})
	sHtmoccurrenceTimeHtml+='</tr>'
	//平均遗漏
	avgOmitHtml+="<tr class='avgOmitTr trtongji'>"
	$.each(data.avgOmit,function(index, avgOmitNum ) {
		avgOmitHtml+='<td><span>'+ avgOmitNum+'</span></td>'
	})
	avgOmitHtml+='</tr>'
	//最大遗漏
	maxOmitHtml+="<tr class='maxOmitTr trtongji'>"
	$.each(data.maxOmit,function(index, maxOmitNum ) {
		maxOmitHtml+='<td><span>'+ maxOmitNum+'</span></td>'
	})
	maxOmitHtml+='</tr>'
	//最大连出
	maxComboHtml+="<tr class='maxComboTr trtongji'>"
	$.each(data.maxCombo,function(index, maxComboNum ) {
		maxComboHtml+='<td><span>'+ maxComboNum+'</span></td>'
	})
	maxComboHtml+='</tr>'
	//左边多加4个
	issueHtml+='<li class="li_time li_tongji">'+"出现次数"+'</li>'
	issueHtml+='<li class="li_avg li_tongji">'+"平均遗漏"+'</li>'
	issueHtml+='<li class="li_omit li_tongji">'+"最大遗漏"+'</li>'
	issueHtml+='<li class="li_combo li_tongji">'+"最大连出"+'</li>'

	totalHtml+=omitHtml+sHtmoccurrenceTimeHtml+avgOmitHtml+maxOmitHtml+maxComboHtml
	$('.right_ table').html(totalHtml)
	$('.left_ ul').html(issueHtml)
	//最后一行加个色
	$(".omitTr:last").css({
		background: '#fbdfc3',
		// borderBottom:"2px solid #d7c3b3"
	});
	$(".omitLi:last").css({
		background: '#fbdfc3',
		// borderBottom:"2px solid #d7c3b3"
	});

}
function init_data() {
	//设置红球（拖码），篮球（胆码）
	var redball = setBall(30);
	$(".ssq_red_ball ul").append(redball);
	betObj.content = new Object();
	betObj.content.playId = betObj.playId;
	betObj.content.tuocount = 0;
	betObj.content.dancount = 0;
	betObj.content.tuo = new Array();
	betObj.content.dan = new Array();
}
function backHtml_(data){
	var data = data;
	backHtml="";
	backHtml+="<table><colgroup><col width='24%'/><col width='76%'/></colgroup>"
        // backHtml+='<thead><tr><td>期号</td><td>开奖号码</td></tr></thead>'
        backHtml+='<tbody>'
        $.each(data.history, function(i, item){
            // 期数
            var issue = item.issue.toString()
            issue=issue.substr(4)

            backHtml+='<tr>'
            backHtml+='<td>'+issue+'期</td>'
            backHtml+='<td>'
            $.each(item.red, function(num, content){
                backHtml +='<span class="hc-color-red">'+content+'</span>' 
            }) ;
            $.each(item.blue, function(num, content){
                backHtml +='<span class="hc-color-blue">'+content+'</span>'
            }) 
        });
    backHtml+='</td></tr></tbody></table>'
    $(".award_content").html(backHtml)
}

function selectRedBall() {
	$(this).toggleClass("redball_selected");
		//增加删除球数
		if($(this).hasClass("redball_selected")) {
			betObj.content.tuocount+=1;
			betObj.content.tuo.push($(this).text());
			if(betObj.content.dan.length!=0){
				for(i in betObj.content.dan){
					if($(this).text()==betObj.content.dan[i]){
						$(".ssq_blue_ball ul li:nth-child(" + parseInt($(this).text()) + ") .blue_ball").removeClass("blueball_selected");
						betObj.content.dancount-=1;
						betObj.content.dan.splice(jQuery.inArray($(this).text(), betObj.content.dan), 1);
						if(betObj.content.dancount < 0) {
							betObj.content.dancount = 0;
						}
					}
					
				}
			}
		} else {
			betObj.content.tuocount-=1;
			betObj.content.tuo.splice(jQuery.inArray($(this).text(), betObj.content.tuo), 1);
			if(betObj.content.tuocount < 0) {
				betObj.content.tuocount = 0;
			}
		}
	//算注数
	calcZS();
	havaSlect()
	// console.log(betObj)
}
//算注数
function calcZS(){
	var zhushu = 0;
	var amount = 0;
	if(betObj.playId==0){
		if(betObj.content.tuocount >= 1){
			$(".buyctn").show();
			$(".buytil").hide();
			$("hc[name=zs]").text(0);
			$("hc[name=money]").text(0);
			if(betObj.content.tuocount >= 7) {
				zhushu = FUNC.zh(betObj.content.tuocount,7)
				// 传注数
				betObj.content.zs=zhushu
				$("hc[name=zs]").text(zhushu);
				$("hc[name=money]").text(zhushu * 2);
				
			}	
		}else{

			$(".buyctn").hide();
			$(".buytil").show();
		}
	}
	function zushu(n,m){
        var result = factorial(n)/factorial(n-m)/factorial(m)
        function factorial(num){
            return num > 1 ? num * factorial(num-1) : 1;
        }
        return result
    }
}
function havaSlect(){
	if(betObj.content.tuocount >= 0){
		var havaSlectHtml=""
		var tmp=betObj.content.tuo.sort()
		$.each(tmp,function(index, el) {
			havaSlectHtml+="<span class=\"hc-color-red havaSlect\">"
			havaSlectHtml+=el+"</span>"
		});
		$(".yixuan_detail").html("").append(havaSlectHtml)
	}
}
function goBuy() {
	//如果一个也没选，就先只做一次随机，
	if(betObj.playId==0){
		if(betObj.content.tuocount == 0) {
			randOne();
			calcZS()
			havaSlect()
			
			return;
		}
		//如果不满一注，那么提示
		if(betObj.content.tuocount < 7 ) {
			HCCP.FUNC.alert("请至少选择7号码。");
			return;
		}
		// if($("hc[name=money]").text()>20000){
		// 	HCCP.FUNC.alert("单行投注金额不能超过2万元");
		// 	return;
		// }
	}else if(betObj.playId==1){
		// if($("hc[name=money]").text()>20000){
		// 	HCCP.FUNC.alert("单行投注金额不能超过2万元");
		// 	return;
		// }
		if(betObj.content.dancount == 0) {
			HCCP.FUNC.alert('请至少选择1个胆码')
			return;
		}
		if(betObj.content.tuocount <2 ){
			HCCP.FUNC.alert('请至少选择2个托码')
			return;
		}
		if(betObj.content.tuocount + betObj.content.dancount < 8){
			HCCP.FUNC.alert('请至少选择8个号码(胆码+拖码)')
			return;
		}
	}
	//如果满一注，往前走
	goConfirm();
}

function goConfirm() {
	var content = new Array();
	var tmp = new Object();
	tmp.playId = betObj.content.playId;
	tmp.tuo = betObj.content.tuo;
	tmp.dan = betObj.content.dan
	tmp.zs = betObj.content.zs
	tmp.tuo.sort();
	tmp.dan.sort();

	var id = HCCP.dataS.local.get("betid");
	try{
		var betContent = JSON.parse(HCCP.dataS.local.get("content"));
	}catch(e){}
	
	if(!betContent || !betContent[betObj.lotyId]) {
		//直接新加
		betContent = new Object();
		betContent[betObj.lotyId] = new Array();
	}

	if(id && betContent[betObj.lotyId][id]) {
		betContent[betObj.lotyId][id] = tmp;
	} else {
		betContent[betObj.lotyId].push(tmp)
	}

	HCCP.dataS.local.set("content", JSON.stringify(betContent));
	//然后到确认支付页
	HCCP.FUNC.go(URL_DIGITAL_CONFIRM,true);
}

function randOne() {
	var rs = new Array();
	tmp = HCCP.MATH.random(1, 30, 7);
	for(i in tmp) {
		if(tmp[i] < 10) {
			tmp[i] = "0" + tmp[i];
		}else{
			tmp[i] = tmp[i].toString();
		}
	}
	rs = tmp;

	betObj.content.tuo = rs;
	betObj.content.dan = [];
	betObj.content.tuocount = 7;
	betObj.content.dancount = 0 ;

	$(".redball_selected").removeClass("redball_selected");
	$(".blueball_selected").removeClass("blueball_selected");

	for(k in betObj.content.tuo) {
		$(".ssq_red_ball ul li:nth-child(" + betObj.content.tuo[k] + ") .red_ball").addClass("redball_selected");
	}
	return;
}
//设置一下球，加遗漏
function setBall(num,color) {
	var bHtml = '';
	for(var i = 1; i <= num; i++) {
		bHtml += "<li><div class=\"";
		if(color == "blue") {
			bHtml += "blue_ball";
		} else {
			bHtml += "red_ball";
		}
		bHtml += "\">";
		if(i < 10) {
			bHtml += "0" + i;
		} else {
			bHtml += i;
		}
		bHtml += "</div>";

		bHtml += "</li>";
	}
	return bHtml;
}

function loty_goback(){
	HCCP.FUNC.go(URL_INDEX);
}
