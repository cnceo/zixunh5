$(document).ready(function() {
    HCCP.K3ID = [12];
    HCCP.k3 = new Object();
    HCCP.k3.playIdObj = {
        1 : "直选",
        2 : "组三",
        3 : "组六"
    }
    HCCP.k3.selectTips = [
		"",
		"每位至少选择1个号码",
		"请至少选择2个号码",
		"请至少选择3个号码",
	];
	HCCP.k3.selectTitle = {
		1:'若中奖：奖金<em class="hc-color-red">1040</em>元',
		2:'若中奖：奖金<em class="hc-color-red">346</em>元',
		3:'若中奖：奖金<em class="hc-color-red">173</em>元',
	}
    _init();
    
    //绑定点击事件
    bindEvent();
    getServerTime();
     //执行期号
    getInitData();
    //如果是带数据进来的
	if(HCCP.k3.tuo && HCCP.k3.tuo.length) {
		setDefaultData();
	}
    
   
});
function _init() {
	HCCP.k3.lotyId = HCCP.FUNC.getUrlParam('clickValueInt');
	if(!HCCP.k3.lotyId || HCCP.K3ID.indexOf(+HCCP.k3.lotyId) < 0){
		// HCCP.FUNC.go(URL_INDEX);
		// return;
		HCCP.k3.lotyId = 12;
	}
	//取存号
	try {
		var basic = JSON.parse(HCCP.dataS.local.get("basicTb"));
	} catch(e) {}
	if(basic && basic['lotyId'] && basic['lotyId'] == HCCP.k3.lotyId && basic['playId'] && HCCP.k3.playIdObj.hasOwnProperty(basic['playId'])){
		//判断下玩法
		HCCP.k3.playId = +basic['playId'];
		
		HCCP.k3.dantuo = basic['dantuo']?1:0;
		if(basic['type'] != undefined){
			HCCP.k3.type = basic['type'];
		}else {
			HCCP.k3.type = 0;
		}
		HCCP.k3.tuo = basic['tuo'] || "";
	}else{
		HCCP.k3.playId = 1;
		HCCP.k3.type = 0;
		HCCP.k3.dantuo = 0;
		HCCP.k3.tuo = [];
		HCCP.dataS.local.del("basicTb");
		HCCP.dataS.local.del("default_betcontent");
		HCCP.dataS.local.del("content");
	}
	$('body').show();

	HCCP.k3.betObj = new Object();
	HCCP.k3.data = new Object();
	HCCP.k3.catch = new Object();
	HCCP.k3.defaultSet = {
		limit:30,
		yl:0,
		zx:0,
		tj:0
	}
	setBasic();

	try {
		var default_betcontent = JSON.parse(HCCP.dataS.local.get("default_betcontent"));
	} catch(e) {}
	if(default_betcontent && default_betcontent[HCCP.k3.basic.lotyId]){
		HCCP.k3.default_betcontent = default_betcontent[HCCP.k3.basic.lotyId];
	}else{
		HCCP.k3.default_betcontent = null;
		HCCP.dataS.local.del("default_betcontent");
	}

	try {
		var content = JSON.parse(HCCP.dataS.local.get("content"));
	} catch(e) {}
	if(content && content[HCCP.k3.basic.lotyId]) {
		HCCP.k3.content = content;
	}else{
		HCCP.k3.content = null;
		HCCP.dataS.local.del("content");
	}
}
function setDefaultData(){
	var arr = HCCP.k3.tuo;
	var playId = HCCP.k3.playId;
	var _parent = $('.bet-play-'+playId);
	if(HCCP.k3.playId == 1){
		var a = arr.replace(/ /g,"").split("|")
		var strArr1 = a[0].split("")
		var strArr2 = a[1].split("")
		var strArr3 = a[2].split("")
		for(var i = 0,len = strArr1.length; i<len; i++){
			$('.bwnum [val="'+strArr1[i]+'"]',_parent).addClass('am-lott-ball-red');
		}
		for(var i = 0,len = strArr2.length; i<len; i++){
			$('.swnum [val="'+strArr2[i]+'"]',_parent).addClass('am-lott-ball-red');
		}
		for(var i = 0,len = strArr3.length; i<len; i++){
			$('.gwnum [val="'+strArr3[i]+'"]',_parent).addClass('am-lott-ball-red');
		}
	}else if(HCCP.k3.playId == 2){
		arr = arr.replace(/ /g,"").split("")
		for(var i = 0,len = arr.length; i<len; i++){
			$('.z3num [val="'+arr[i]+'"]',_parent).addClass('am-lott-ball-red');
		}
	}else if(HCCP.k3.playId == 3){
		arr = arr.replace(/ /g,"").split("")
		for(var i = 0,len = arr.length; i<len; i++){
			$('.z6num [val="'+arr[i]+'"]',_parent).addClass('am-lott-ball-red');
		}
	}
	calcZs()
}
function changeDisplay(){
	var lotyName = HCCP.k3.playIdObj[HCCP.k3.playId] || '';
	$('.header-drop').text(lotyName);
	var arr = ['','1','2','3'];
	$('[playname]').removeClass('active').filter('[playname = "' + arr[HCCP.k3.playId] + '"]').addClass('active');

	$('[class *= bet-play-]').hide().filter('.bet-play-'+HCCP.k3.playId).show();

	//判断type 显示对应图表
	getChart(null,1);
	addSelectNum();
	calcZs();
	changeSetting();
	//重置所有选中号码
	$(".am-lott-ball-red").removeClass('am-lott-ball-red')
}
function changeTab(){
	var that = $(this),
		index = that.index();
	if(that.hasClass('active')){
		return;
	}
	HCCP.k3.type = index;
	setBasic();
	getChart(null,1);
	changeSetting();
}
//绑定点击事件
function bindEvent(){
	var o = 'click';
	//切换玩法
    $(".header-title").on(o,".header-drop",showPlay);
    $(".hc-nav").on(o,"[playname]",selectPlay); 
    $('[class *= "bet-play-"]').on(o,'nav>li',changeTab);
    //选号
    $(".red_ball").on(o, selectBall);
    //提交
	$(".submit").on(o,doConfirm);
	//设置
	$('.chartSetting').on(o,showSetting);
	$('.set-cancel').on(o,cancelSetting);
	$('.set-sure').on(o,sureSetting);
	$('.set-con').on(o,'li',setToggle);
	$(window).resize(CreateLine);
	
}
function setBasic(){
	HCCP.k3.basic = {
		lotyId : HCCP.k3.lotyId,
		playId : HCCP.k3.playId,
		type : HCCP.k3.type,
		dantuo : HCCP.k3.dantuo,
		tuo: HCCP.k3.tuo
	}
	HCCP.k3.basic_ = {
		lotyId : HCCP.k3.lotyId,
		playId : HCCP.k3.playId
	}
	HCCP.dataS.local.set("basicTb", JSON.stringify(HCCP.k3.basic));
	HCCP.dataS.local.set("basic", JSON.stringify(HCCP.k3.basic_));
}
//设置玩法
function selectPlay() {
    var that = $(this);
    if(that.hasClass('active')){
        $(".hc-nav").toggle();
        return;
    }
	HCCP.k3.playId = $(this).attr('playname') || 1;
	HCCP.k3.type = 0;
	HCCP.k3.dantuo = 0;
    $(".hc-nav").toggle();
    setBasic();

    changeDisplay();
}
function getChart(flag,isTab,sort){
	var lotyId = +HCCP.k3.lotyId;
	var playId = HCCP.k3.playId;
	var type = HCCP.k3.type;
	var limit = HCCP.k3.defaultSet.limit
	var tpObj = {
		1:['1', '8', '9', '10'],
		2:['1', '2'],
		3:['1', '2'],
	}
	var tp = tpObj[playId][type];
	//tab切换
	var wrap = $('.bet-play-'+playId);
	var tab = $('nav>li',wrap);
	tab.removeClass('active').eq(type).addClass('active');
	var wrapLi = $('.chart-main>li',wrap);
	var tb = wrapLi.eq(type);
	wrapLi.hide();
	tb.show();
	//取遗漏
	var dataObj = HCCP.k3.data;
	var key = tp;
	

	if(!flag && dataObj[key] && dataObj[key]['oLimit'] == limit && dataObj[key]['nextIssue'] &&  dataObj[key]['nextIssue'] == HCCP.k3.fullIssue){
		init_chart(dataObj[key],key,0,isTab,sort);
	}else{
		var chart = HCCP.info.chart(lotyId, playId, tp, limit),
			data;
		if(chart && chart.code == 200) {
			data = chart.data;
		} else {
			data = false;
		}
		init_chart(data,key,1,0,sort);
	}
	//变换底部样式
	if(type == 0){
		change_0()
	}else{
		change_1()
	}
	
	//显示隐藏遗漏
	var yl = HCCP.k3.defaultSet.yl
	if(yl){
		$(".ylkj").hide()
	}else{
		$(".ylkj").show()
	}
	//显示隐藏折现
	var zx = HCCP.k3.defaultSet.zx
	if(zx){
		$("canvas").hide()
	}else{
		$("canvas").show()
	}
	//显示隐藏统计
	var tj = HCCP.k3.defaultSet.tj
	if(tj){
		$(".hc-tj").hide()
	}else{
		$(".hc-tj").show()
	}

	
	
	
}
function init_chart(data,key,flag,isTab,sort){ //数据  缓存key 是否直接更新数据   是否tab切换（1s拉取数据）
	if(data){
		var playId = HCCP.k3.playId;
		var type = HCCP.k3.type;
		var wrap = $('.bet-play-'+playId);
		var wrapLi = $('.chart-main>li',wrap);

		var tb = wrapLi.eq(type).children('.chart_');
		if(playId == 1 && type==0){
			var tb = wrapLi.eq(type);
		}

		if(flag){
			var limit = HCCP.k3.defaultSet.limit
			HCCP.k3.data[key] = data;
			HCCP.k3.data[key]['oLimit'] = limit;
		}

		if(sort || !HCCP.k3.catch[playId+'_'+type] || HCCP.k3.catch[playId+'_'+type] != JSON.stringify(data)){
			HCCP.k3.catch[playId+'_'+type] = JSON.stringify(data);
			var table = '';
			if(playId == 1){
				if(type == 0){
					table = getKJ(data);
				}else if(type == 1 || type == 2 || type == 3){
					table = getALLZS(data);
				}
			}else if(playId == 2||playId == 3){
				if(type == 0){
					table = getKJ(data);
				}else if(type == 1){
					table = getALLZS(data);
				}
			}
			tb.empty().append(table);
			$(".red_ball").off();
			$(".red_ball").on("click", selectBall);


			if(playId == 1 && (type == 1 || type == 2 || type == 3)){
				CreateLine();
			}
			if((playId == 1)){
				scrollEvent();
			}
			tb.find('.common tr:last-child')[0].scrollIntoView();
		}
		
		//判断下是否更新开奖 定时器
		var isUpdate = 0;
		if(key == 1){
			var dt = HCCP.k3.data[key]['history'];
			var last = dt[dt.length -1] || {};
			if(!last['kjhm'] || !last['kjhm'].length){
				isUpdate = 1;
			}
		}else if(key == '1_3' || key == '6_3' || key == '7_3'){
			var dt = HCCP.k3.data[key]['coldHot'] || [];
			var last = dt[0];
			if(!last || last['currentOmit'] == -1){
				isUpdate = 1;
			}
		}else{
			var dt = HCCP.k3.data[key]['omit'];
			var last = [];
			for(var j in dt){
				last.push(j);
			}
			last.sort(function(a,b){return a<b?1:-1;});
			if(!last[0] || dt[last[0]] instanceof Array){
				isUpdate = 1;
			}
		}
		if(isUpdate){
			//10秒取一次图表信息
			if(typeof(updated_chart) != "undefined") {
				clearTimeout(updated_chart);
			}
			if(isTab){
				updated_chart = window.setTimeout("getChart(1);", 1000);
			}else{
				updated_chart = window.setTimeout("getChart(1);", 10000);
			}
		}
	} else {
		//10秒取一次图表信息
		if(typeof(updated_chart) != "undefined") {
			clearTimeout(updated_chart);
		}
		updated_chart = window.setTimeout(getChart, 10000);
	}

}

//生成图表
function getKJ(data){
	var table='';
	if(data && data.history && data.history.length){
		var res = data.history;
		var dxAry = ['','小','大'];
		var dsAry = ['','单','双'];
		var issue,numAry,sjhAry,num,xt,sjh,html='';
		$.each(res,function(x,item){
			issue = item.issue.toString().substr(-3) || '';
			if(!item['kjhm'] || !item['kjhm'].length){
				html += '<tr>';
				html += '<td>'+issue+'期</td>';
				html += '<td colspan="4">等待开奖...</td>';
				html += '</tr>';
				return;
			}
			numAry = FUNC.filterAry(item.kjhm);
			sjhAry = FUNC.filterAry(item.tryNumber);
			num = numAry.join(' ');
			sjh = sjhAry.join(' ');
			xt = item.form?item.form:'';
		
			html += '<tr>';
			html += '<td>'+issue+'期</td>';
			html += '<td><span class="award-num-sm">'+num+'</span></td>';
			html += '<td>'+ xt +'</td>';
			html += '<td>'+ sjh +'</td>';
			html += '</tr>';
		})
		table = '<table class="hc-bg table-fixed-top">';
		table += '<colgroup><col width="25%"/><col width="25%"/><col width="25%"/><col width="25%"/></colgroup>';
		table += '<tbody><tr><td>期号</td><td>开奖号码</td><td>形态</td><td>试机号</td></tr></tbody></table>';

		table += '<div class="wrap-common"><table class="common row1_c"><colgroup><col width="25%"/><col width="25%"/><col width="25%"/><col width="25%"/></colgroup>';
		table += '<tbody>'+html+'</tbody>';
		table += '</table></div>';
	}
	
	return table;
}
function getALLZS(data){
	var playId = HCCP.k3.playId;
	var type =  HCCP.k3.type  
	var table='';
	var getFoot = function (f1,f2,f3,f4){
		var getTd = function (arr){
			var str = '',n;
			for(var i = 0; i<=9; i++){
				n = arr[i] == undefined ? '' : arr[i];
				str += '<td>'+n+'</td>';
			}
			return str;
		}
		var html='';
		if(f1 && f2  && f3 && f4 && f1.length && f2.length && f3.length && f4.length){
			html = '<tfoot class="hc-tj"><tr><td>出现次数</td>'+getTd(f1);
			html += '</tr><tr><td>平均遗漏</td>'+getTd(f2);
			html += '</tr><tr><td>最大遗漏</td>'+getTd(f3);
			html += '</tr><tr><td>最大连出</td>'+getTd(f4);
			html += '</tr></tfoot>';
		}else {
			html = '<tfoot class="hc-tj"><tr><td colspan="4">出现次数</td><td class="hc-grey" colspan="6" rowspan="4">等待开奖后更新</td></tr>';
			html += '<tr><td colspan="4">平均遗漏</td></tr>';
			html += '<tr><td colspan="4">最大遗漏</td></tr>';
			html += '<tr><td colspan="4">最大连出</td></tr></tfoot>';
		}
		return html;
	}
	if(data && data.omit && !$.isEmptyObject(data.omit)){
		var res = data.omit;
		var issue,numAry,obj,num,tmp,omi,html='';
		$.each(res,function(x,item){
			issue = x.toString().substr(-3) || '';
			if(item instanceof Array && item.length == 0){
				html += '<tr><td>'+issue+'期</td><td colspan="9">等待开奖...</td></tr>';
				return ;
			}
			tmp="";
			$.each(item,function(index,ele){
				if(ele == 0 ){
					if(type == 1){
						if(playId == 1){
							var type_ = "bwkj bwkj_"
						}else{
							var type_ = "bwkj"
						}
						
					}else if(type == 2){
						if(playId == 1){
							var type_ = "swkj swkj_"
						}else{
							var type_ = "swkj"
						}
						
					}else if(type == 3){
						if(playId == 1){
							var type_ = "gwkj gwkj_"
						}else{
							var type_ = "gwkj"
						}
					}else{
						var type_ =""
					}
					tmp += "<td><span class='"+type_+"'>"+index+"</span></td>"
					return
				}
				if(ele == -2 || ele == -3){
					ele = ele.toString().substr(1);
					tmp += "<td><span class='allkj'>"+index+"<span>"+"<span class='repeatNum_2'>"+ele+"</span></td>";
					return
				}
				tmp+="<td><span class='ylkj'>"+ele+"</span></td>"
			})
			
			html += '<tr>';
			html += '<td>'+issue+'期</td>';
			html += tmp
			html += '</tr>';
		})
		table += '<div class="wrap-common myCanvas">'
		table += '<div class="hc-zx canvasHz"></div>'
		table += '<table class="common row1_c row_bt"><colgroup><col width="17%"/></colgroup>';
		table += '<tbody>'+html+'</tbody>';
		table += getFoot(data.occurrenceTimes, data.avgOmit, data.maxOmit, data.maxCombo);
		table += '</table></div>';
	}
	return table;
}




//显示下拉玩法
function showPlay() {
    $(".hc-nav").toggle();
    $(".hc-nav").on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function() {});   
}
//得到当前期号
function getInitData() {
    //取当前期号数据
    var issue = HCCP.trade.issue(HCCP.k3.lotyId);
    if(issue && issue.code == 200){
        init_issue(issue.data);
    }else if(issue && issue.code != 200) {
        HCCP.FUNC.alert(issue.message);
        return false;
    }else {
        HCCP.FUNC.alert("网络繁忙，请稍候再试");
        return false;
    }
    changeDisplay();
}
//得到期号
function getIssue(){
    var issue = HCCP.trade.issue(HCCP.k3.lotyId),
        data;
    if(issue && issue.code == 200){
        data = issue.data;
    }else{
        data = false;
    }
    init_issue(data);
}
function init_issue(issue) {
	// 距<hc name="issue"></hc>期截止 : <time class="hc-color-k3yellow" name="cdtime">-- : --</time>
    if(issue && issue.issue) {
        HCCP.k3.fullIssue = issue.issue;
        HCCP.k3.issueS = issue.issue.toString().substr(-3);
        HCCP.k3.serverTime = issue.serverTime;
        HCCP.k3.diffServer = HCCP.k3.serverTime*1000 - new Date().getTime();
        HCCP.k3.companyEndTime = issue.companyEndTime;
        if($(".hc-k3-stop").text().trim() == "正在获取期号中...") {
			$(".hc-k3-stop").html('距<span name="issue">' + HCCP.k3.issueS + '</span>期截止：<time class="hc-color-red" name="cdtime">-- : --</time>')
		} else {
			$("[name=issue]").text(HCCP.k3.issueS);
		}
        //计时
        $('.submit').addClass('active');
        countDown();
    } else {
    	$('.submit').removeClass('active');

        $(".hc-k3-stop").text("正在获取期号中...");
        //10秒取一次期号信息
        if(typeof(updated_issue) != "undefined") {
            clearTimeout(updated_issue);
        }
        updated_issue = window.setTimeout(getIssue, 10000);
    }
}
//获取服务器时间
function getServerTime() {
    HCCP.k3.serverTime = HCCP.FUNC.diff_time();
    HCCP.k3.diffServer = HCCP.k3.serverTime*1000 - new Date().getTime();
    window.setTimeout(getServerTime, 300000);
}
//倒计时
function countDown() {
    var lotyId = HCCP.k3.lotyId;
    var serverTime =  Math.ceil((new Date().getTime() + HCCP.k3.diffServer)/1000);
    var companyEndTime = HCCP.k3.companyEndTime;
    var diffTime =  companyEndTime - serverTime;
    var showH = Math.floor(diffTime/3600);
    var showI = Math.floor((diffTime%3600)/60);
    var showS = diffTime%60;
    showH = showH < 10 ? "0"+showH : showH;
    showI = showI < 10 ? "0"+showI : showI;
    showS = showS < 10 ? "0"+showS : showS;

    if(diffTime < 0){ //    截止了
        if(!HCCP.k3.errTimes){HCCP.k3.errTimes =1};
	        HCCP.k3.errTimes++;
	        if(HCCP.k3.errTimes > 3){
	            console.log('下一期获取异常,请刷新页面重试！')
	            return;
	        }
	        //重新去取期号信息
	        if(typeof(everysecond) != "undefined"){
	            clearTimeout(everysecond);
	        }
	        setTimeout(function(){
	        HCCP.k3.overdueIssue = HCCP.k3.fullIssue.toString().substr(-3);
	        getIssue();
	        getChart();
	        HCCP.k3.nowIssue = HCCP.k3.fullIssue.toString().substr(-3);
	        if(HCCP.k3.nowIssue && HCCP.k3.nowIssue !=HCCP.k3.overdueIssue){
	            HCCP.FUNC.alert(HCCP.k3.overdueIssue+'期已截止<br>当前期号为'+HCCP.k3.nowIssue+'期');
	        }else{
	            // HCCP.FUNC.alert(HCCP.k3.overdueIssue+'期已截止');
	        }
        }, 1000);
        // return;
    }else{
        HCCP.k3.errTimes = 1;
        showTime = showH=="00" ? showI+" : "+showS : showH+" : "+showI+" : "+showS;
        $("[name=cdtime]").text(showTime);

        if(typeof(everysecond) != "undefined"){
            clearTimeout(everysecond);
        }
        everysecond = setTimeout(countDown, 1000);
    }
}

//滚动绑定
function scrollEvent(){
	var bet1 = $('.bet-play-1');
		bet1.find('.scroll_t1').off('scroll').scroll(function(){
			var scrollLeft = this.scrollLeft;
			$('.scroll_c1').scrollLeft(scrollLeft);
			$('.scroll_b1').scrollLeft(scrollLeft);
		})
		bet1.find('.scroll_c1').off('scroll').scroll(function(){
			var scrollLeft = this.scrollLeft;
			$('.scroll_t1').scrollLeft(scrollLeft);
			$('.scroll_b1').scrollLeft(scrollLeft);
		})
		bet1.find('.scroll_b1').off('scroll').scroll(function(){
			var scrollLeft = this.scrollLeft;
			$('.scroll_c1').scrollLeft(scrollLeft);
			$('.scroll_t1').scrollLeft(scrollLeft);
		})
}

//選擇红球
function selectBall() {
	$(this).toggleClass("am-lott-ball-red");
	addSelectNum()
	calcZs();
}
function addSelectNum(){
	var playId = HCCP.k3.playId;
	HCCP.k3.betObj[playId] = new Object()
	var _parent = $(".bet-play-"+playId);
	
	var obj = new Object();
	obj[playId] = new Object();
	obj[playId]['tuo'] = new Array();
	var tmp1=[],tmp2=[],tmp3=[];

	if(playId == 1){
		var selectEle1 = _parent.find('.bwnum .red_ball.am-lott-ball-red');
		var selectEle2 = _parent.find('.swnum .red_ball.am-lott-ball-red');
		var selectEle3 = _parent.find('.gwnum .red_ball.am-lott-ball-red');
		selectEle1.each(function(){
			tmp1.push($(this).text());
		})
		selectEle2.each(function(){
			tmp2.push($(this).text());
		})
		selectEle3.each(function(){
			tmp3.push($(this).text());
		})
		obj[playId]['tuo'].push(tmp1)
		obj[playId]['tuo'].push(tmp2)
		obj[playId]['tuo'].push(tmp3)
	}else if(playId == 2 || playId == 3){
		var selectEle = _parent.find('.red_ball.am-lott-ball-red');
		selectEle.each(function(){
			obj[playId]['tuo'].push($(this).text());
		})
	}
	HCCP.k3.betObj[playId] = null;
	HCCP.k3.betObj[playId] = obj;
}
//计算注数
function calcZs() {
	var p1count = $(".bet-play-1 .bwnum .am-lott-ball-red").length;
	var p2count = $(".bet-play-1 .swnum .am-lott-ball-red").length;
	var p3count = $(".bet-play-1 .gwnum .am-lott-ball-red").length;

	var p4count = $(".bet-play-2 .z3num .am-lott-ball-red").length;
	var p5count = $(".bet-play-3 .z6num .am-lott-ball-red").length;

	var playId = HCCP.k3.playId;
	var count = 0;
	if(playId == 1) {
		count = p1count * p2count * p3count;
	} else if(playId == 2){
		count = HCCP.fc3d.count(p4count, playId);
	}else if(playId == 3){
		count = HCCP.fc3d.count(p5count, playId);
	}
	$("hc[name=zs]").text(count);
	HCCP.k3.betObj.zhushu = count;
	$("hc[name=money]").text(count * 2);
	$(".am-footer-money").show();

	var totalEle = $('.p_total');
	var titleEle = $('.selectTitle');
	var txt = HCCP.k3.selectTitle[playId] || '';
	if(playId == 1){
		if(p1count || p2count || p3count){
			totalEle.show();
		}else{
			totalEle.hide()
		}
	}else if(playId == 2){
		if(p4count){
			totalEle.show();
		}else{
			totalEle.hide()
		}
	}else if(playId == 3){
		if(p5count){
			totalEle.show();
		}else{
			totalEle.hide()
		}
	}
	$('.zs').text(count)
	$('.money').text(count*2)
	titleEle.html(txt);
}

function rand1() {
	var playId = HCCP.k3.playId;
	var _parent = $(".bet-play-"+playId);
    var arr = HCCP.fc3d.randOne(playId);
    $(".am-lott-ball-red").removeClass("am-lott-ball-red");
    arr = arr.sort(function(a,b){return a-b})
    $.each(arr, function(x, ball) {
		var y = x + 2;
		ball = ball ;
		if(playId == 1) {
			$(".bet-play-1 .chart-main li:nth-child(" + y + ") .red_ball").eq(ball).addClass("am-lott-ball-red");
		}else if(playId == 2){
			$(".bet-play-2 .chart-main .z3num .red_ball").eq(ball).addClass("am-lott-ball-red");
		}else if(playId == 3){
			$(".bet-play-3 .chart-main .z6num .red_ball").eq(ball).addClass("am-lott-ball-red");
		}
	});

    addSelectNum();
	calcZs();

}


function limitNum(arr, obj){
	var lObj = {};
	var limitObj = obj ? obj:{};
	if(arr && arr.length){
		for(var id = 6; id<8;id++){
			if(limitObj[id]){
				var _arr = limitObj[id].slice(0);
				limitObj[id] = [];
				$.each(_arr, function(x,y){
					limitObj[id].push(y.split(',').sort(function(a,b){return a>b?1:-1}).join(','))
				})
			}
		}
		
		var item,playId,selectAry = [];	
		for (var i = arr.length - 1; i >= 0; i--) {
			item = arr[i];
			playId = item.playId;
			if(playId == 1 || playId == 2 || playId == 3 || playId == 4 || playId == 8){
				selectAry = item.tuo || [];
			}else if(playId == 5){
				for (var m = item.dan.length - 1; m >= 0; m--) {
					for (var n = item.tuo.length - 1; n >= 0; n--) {
						var str = (item.dan[m] + '|'+ item.tuo[n]);
						selectAry.push(str)
					}
				}
			}else if(playId == 6 || playId == 7){
				if(playId == 6){
					var _m = 3;
				}else if(playId==7){
					var _m = 2;
				}
				if(item.isDan){
					var len = item.dan.length,
						dan = item.dan.slice(0),
						tuoAry = FUNC.getCombin(item.tuo, _m-len) || [];
					for (var k = tuoAry.length - 1; k >= 0; k--) {
						var str = dan.concat(tuoAry[k]).sort(function(a,b){return a>b?1:-1}).join(',');
						selectAry.push(str);
					}
				}else{
					var tmp = FUNC.getCombin(item.tuo, _m) || [];
					for (var q = tmp.length - 1; q >= 0; q--) {
						selectAry.push(tmp[q].sort(function(a,b){return a>b?1:-1}).join(','));
					}
				}
			}
			var playAry = limitObj[playId] || [];
			for (var z = selectAry.length - 1; z >= 0; z--) {
				if(selectAry[z] && playAry.indexOf(selectAry[z].toString()) != -1){
					if(!(lObj[playId] instanceof Array)){
						lObj[playId] = new Array();
					}
					lObj[playId].push(selectAry[z]);
				}
			}
		}
	}
	return lObj;
}
function getSelectData(){
	addSelectNum()
	////////////////////////////////
	var betObj = HCCP.k3.betObj,
		playId = HCCP.k3.playId;
	var obj = betObj[playId] || {};

	var newAry = new Array();
	for(var key in obj){
		var arr = new Object();
		arr.playId = key;
		if(key == 1 ){
			var tmpStr1 = obj[key]['tuo'][0].join(" ")
			var tmpStr2 = obj[key]['tuo'][1].join(" ")
			var tmpStr3 = obj[key]['tuo'][2].join(" ")
			arr.tuo = tmpStr1 + " | " + tmpStr2 + " | " + tmpStr3
		}else{
			arr.tuo = obj[key]['tuo'].join(" ");
		}
		arr.isDan = 0;
		arr.zs = obj[key]['zs']||0;  //0000
		arr.money = arr.zs*2
		newAry.push(arr);
	}
	return newAry;
}
function setBetContent(newAry) {
	if(!HCCP.k3.content){
		HCCP.k3.content = new Object();
		HCCP.k3.content[HCCP.k3.lotyId] = new Array();
	}

	if(HCCP.k3.default_betcontent) {
		var index = HCCP.k3.default_betcontent.confirm_id;
		HCCP.k3.content[HCCP.k3.lotyId].splice(index,1);
		HCCP.dataS.local.del("default_betcontent");
	}
	for (var i = newAry.length - 1; i >= 0; i--) {
		HCCP.k3.content[HCCP.k3.lotyId].unshift(newAry[i])
	}
	var content = new Object();
	content[HCCP.k3.lotyId] = newAry;

	HCCP.dataS.local.set("content", JSON.stringify(HCCP.k3.content));
}

function goBack() {
	HCCP.dataS.local.del('basicTb');
	self.location=document.referrer;
}
//提交过去~~
function doConfirm() {
	if(!$(this).hasClass('active')){
		return;
	}
	var tips = HCCP.k3.tips ,
		playId = HCCP.k3.playId,
		selectTips = HCCP.k3.selectTips;
	// 无选号随机一注
	var p1count = $(".bet-play-1 .bwnum .am-lott-ball-red").length;
	var p2count = $(".bet-play-1 .swnum .am-lott-ball-red").length;
	var p3count = $(".bet-play-1 .gwnum .am-lott-ball-red").length;

	var p4count = $(".bet-play-2 .z3num .am-lott-ball-red").length;
	var p5count = $(".bet-play-3 .z6num .am-lott-ball-red").length;
	if(playId == 1){
		if(!p1count && !p2count && !p3count){
			rand1();	
			return;
		}
	}else if(playId == 2){
		if(!p4count){
			rand1();	
			return;
		}
	}else if(playId == 3){
		if(!p5count){
			rand1();	
			return;
		}
	}
	// 有选号不满条件
	var zs = HCCP.k3.betObj.zhushu
	if(zs < 1){
		HCCP.FUNC.alert(selectTips[playId]);
		return;
	}
	// if(setBetContent()){
	// 	console.log("保存成功")
	// }
	var thisSelectData = getSelectData();
	//如果有一注了，那么就设置一下betContent，准备去投注确认页了
	var bonusArr = ['0','1040','346','173']
	if(zs * 2 > bonusArr[playId]){
		HCCP.modal.confirm({
			'msg':'您当前的投注金额大于理论最高奖金，会造成方案亏损，您确认要继续投注吗？',
			confirmCallback:function(){
				setBetContent(thisSelectData);
				HCCP.dataS.local.del('basicTb');
				HCCP.FUNC.go(URL_DIGITAL_CONFIRM, true);
			}
		})
	}else{
		setBetContent(thisSelectData);
		HCCP.dataS.local.del('basicTb');
		HCCP.FUNC.go(URL_DIGITAL_CONFIRM, true);
	}
	
}

//显示设置
function changeSetting(){
	var playId = HCCP.k3.playId,
		type = HCCP.k3.type;
	var setIcon = $('.header-right');
	var wrap = $('.set-wrap');
	var ylEle = $('.set-yl',wrap),
		zxEle = $('.set-zx',wrap),
		tjEle = $('.set-tj',wrap);
	if(playId == 1 && (type == 1 || type == 2 || type == 3 )){
		zxEle.show();
	}else{
		zxEle.hide();
	}
	if(type == 0){
		ylEle.hide();
		tjEle.hide();
	}else{
		ylEle.show();
		tjEle.show();
	}
}
//setting
function showSetting(){
	var playId = HCCP.k3.playId;
	var type = HCCP.k3.type;
	var wrap = $('.set-wrap');
	var obj = HCCP.k3.defaultSet;
	var qs = obj['limit']?obj['limit']:30;
	var yl = obj['yl'] == 1?1:0;
	var zx = obj['zx'] == 1?1:0;
	var tj = obj['tj'] == 1?1:0;
	var qsEle = $('.set-qs',wrap),
		ylEle = $('.set-yl',wrap),
		zxEle = $('.set-zx',wrap),
		tjEle = $('.set-tj',wrap);
	qsEle.find('li').filter('[data-numissue='+qs+']').addClass('active').siblings().removeClass('active');
	ylEle.find('li').eq(yl).addClass('active').siblings().removeClass('active');
	zxEle.find('li').eq(zx).addClass('active').siblings().removeClass('active');
	tjEle.find('li').eq(tj).addClass('active').siblings().removeClass('active');

	wrap.show();

}
function cancelSetting(){
	var wrap = $('.set-wrap');
	wrap.hide();
	$('.active',wrap).removeClass('active');
}
function sureSetting(){
	var wrap = $('.set-wrap');
	var qs = $('.set-qs li.active',wrap).attr('data-numissue') || 30;
	var yl = $('.set-yl li.active',wrap).index() == 1 ? 1 : 0;
	var zx = $('.set-zx li.active',wrap).index() == 1 ? 1 : 0;
	var tj = $('.set-tj li.active',wrap).index() == 1 ? 1 : 0;
	HCCP.k3.defaultSet = {
		limit:qs,
		yl:yl,
		zx:zx,
		tj:tj
	};
	(function(){
		var betEle = $('#hc-bet-play');
		var setObj = HCCP.k3.defaultSet;
		var qs = setObj.limit,
			yl = setObj.yl,
			zx = setObj.zx,
			tj = setObj.tj;

		if(yl == 0){
			betEle.attr('data-yl','0');
		}else{
			betEle.attr('data-yl','1');
		}

		if(zx == 0){
			betEle.attr('data-zx','0');
		}else{
			betEle.attr('data-zx','1');
		}

		if(tj == 0){
			betEle.attr('data-tj','0');
		}else{
			betEle.attr('data-tj','1');
		}
	})();
	getChart()
	cancelSetting();
}
function setToggle(){
	var that = $(this);
	that.addClass('active').siblings().removeClass('active');
}

function CreateLine() {
	var type = HCCP.k3.type;
	if(type == 1){
		var c = '#ed4f5e';
		var ele = $('.bwkj_');
		var tmpele = $('.bet-play-1 .chart-main .bwnum')
	}else if(type == 2){
		var c = '#f29233';
		var ele = $('.swkj_');
		var tmpele = $('.bet-play-1 .chart-main .swnum')
	}else if(type == 3){
		var c = '#3d93ec';
		var ele = $('.gwkj_');
		var tmpele = $('.bet-play-1 .chart-main .gwnum')
	}
	var wrap = $('.myCanvas',tmpele);
	var cav = $('.canvasHz',tmpele);
	cav.empty();
    for ( var j=ele.length-1;j>0;j--) {
        var tid = ele.eq(j);
        var fid = ele.eq(j-1);

        var f_width = fid.outerWidth();
        var f_height = fid.outerHeight();

        var t_offset = tid.position();
        var t_top = t_offset.top;
        var t_left = t_offset.left;

        var f_offset = fid.position();
        var f_top = f_offset.top;
        var f_left = f_offset.left;

        var cvs_left = Math.min(f_left, t_left);
        var cvs_top = Math.min(f_top, t_top);
        var cvs = document.createElement("canvas");
        cvs.width =Math.abs(f_left - t_left) < f_width ? f_width/2 : Math.abs(f_left - t_left);
        cvs.height =Math.abs(f_top - t_top);
        cvs.style.top = cvs_top + parseInt(f_height / 2)+ "px";
        cvs.style.left = cvs_left + parseInt(f_width / 2)+ "px";
        cvs.style.position = "absolute";
        var cxt = cvs.getContext("2d");
        cxt.save();
        cxt.translate(0.5,0.5);
        cxt.lineWidth =1;
        cxt.strokeStyle=c;
        cxt.beginPath();
        cxt.moveTo((f_left - cvs_left), (f_top - cvs_top));
        cxt.lineTo((t_left - cvs_left), (t_top - cvs_top));
        cxt.closePath();
        cxt.stroke();
        cxt.restore();
        cav.append(cvs);
    }
}
function change_0(){
	$("footer .footer_right").hide()
	$("footer .fm_p1").hide()
 
	$("footer .footer_message").css({
		paddingRight: '0.10rem',
		paddingTop:"0.15rem",
		textAlign:"center"
	});
}
function change_1(){
	$("footer .footer_right").show()
	$("footer .fm_p1").show()
 
	$("footer .footer_message").css({
		padding:" 0.06rem 0.7rem 0rem 0.1rem",
		textAlign:"left"
	});
}








