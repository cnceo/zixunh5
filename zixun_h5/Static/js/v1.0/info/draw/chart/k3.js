$(document).ready(function() {
    HCCP.K3ID = [30,31,32];
    HCCP.k3 = new Object();
    HCCP.k3.playObj = {
        1 : "和值",
        2 : "三同号",
        3 : "二同号",
        4 : "三不同号",
        5 : "二不同号",
        6 : "三连号通选",
        7 : "三不同胆拖",
        8 : "二不同胆拖"
    }
    HCCP.k3.playIdObj = {
        1 : "和值",
        2 : "三同号",
        3 : "三同号",
        4 : "二同号",
        5 : "二同号",
        6 : "三不同号",
        7 : "二不同号"
    }
    HCCP.k3.selectTips = [
		"",
		"三不同最多只能选取2个胆码",
		'二不同最多只能选取1个胆码',
		"请至少选择1个胆码",
		"请至少选择2个拖码",
		"请至少选择4个号码(胆码+拖码)",
		"二同号单选，请至少选择一个不同号",
		"二同号单选，请至少选择一个相同号码",
		"请至少选择3个号码",
		"请至少选择2个号码",
	];
	HCCP.k3.selectTitle = {
		1:'猜开奖号码相加的和，奖金<em class="hc-color-k3yellow">9-80</em>元',
		3:'猜豹子（3个号相同），奖金<em class="hc-color-k3yellow">240</em>元',
		4:'开奖号包含所选对子即中奖，奖金<em class="hc-color-k3yellow">15</em>元',
		6:'选择3个不同号码，奖金<em class="hc-color-k3yellow">40</em>元',
		7:'选择2个不同号码，奖金<em class="hc-color-k3yellow">8</em>元'
	}
    _init();
	//如果是带数据进来的
	if(HCCP.k3.tuo && HCCP.k3.tuo.length) {
		setDefaultData();
	}
    //绑定点击事件
    bindEvent();
    getServerTime();
    //执行期号
    getInitData();

});
function _init() {
	HCCP.k3.lotyId = HCCP.FUNC.getUrlParam('clickValueInt');
	if(!HCCP.k3.lotyId || HCCP.K3ID.indexOf(+HCCP.k3.lotyId) < 0){ // 不存在HCCP.k3.lotyId 重置一波
		HCCP.k3.lotyId = 30;
	}
	//取存号
	try {
		var basic = JSON.parse(HCCP.dataS.local.get("basicTb"));
	} catch(e) {}
	if(basic && basic['lotyId'] && basic['lotyId'] == HCCP.k3.lotyId && basic['playId'] && HCCP.k3.playIdObj.hasOwnProperty(basic['playId'])){
		//判断下玩法
		HCCP.k3.playId = +basic['playId'];
		if(HCCP.k3.playId == 2){
			HCCP.k3.playId = 3;
		}
		if(HCCP.k3.playId == 5){
			HCCP.k3.playId = 4;
		}
		HCCP.k3.dantuo = basic['dantuo']?1:0;
		if(basic['type'] != undefined){
			HCCP.k3.type = basic['type'];
		}else {
			HCCP.k3.type = 0;
		}
		HCCP.k3.tuo = basic['tuo'] || [];
	}else{
		HCCP.k3.playId = 1;
		HCCP.k3.type = 0;
		HCCP.k3.dantuo = 0;
		HCCP.k3.tuo = [];
		HCCP.dataS.local.del("basicTb");
		HCCP.dataS.local.del("default_betcontent");
		HCCP.dataS.local.del("confirm_betcontent");
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
	HCCP.k3.defaultSort = {
		'1': {
				active:0,
				direction:1
			},
		'6': {
				active:0,
				direction:1
			},
		'7': {
				active:0,
				direction:1
			}
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
		var confirm_betcontent = JSON.parse(HCCP.dataS.local.get("confirm_betcontent"));
	} catch(e) {}
	if(confirm_betcontent && confirm_betcontent[HCCP.k3.basic.lotyId]) {
		HCCP.k3.confirm_betcontent = confirm_betcontent;
	}else{
		HCCP.k3.confirm_betcontent = null;
		HCCP.dataS.local.del("confirm_betcontent");
	}
}
function setDefaultData(){
	var arr = HCCP.k3.tuo;
	var playId = HCCP.k3.playId;
	var _parent = $('.bet-play-'+playId);
	for(var i = 0,len = arr.length; i<len; i++){
		$('[k3val="'+arr[i]+'"]',_parent).addClass('active');
	}

}
function changeDisplay(){
	var lotyName = HCCP.k3.playIdObj[HCCP.k3.playId] || '';
	$('.header-drop').text(lotyName);
	var arr = ['','1','3','3','4','4','6','7'];
	$('[playname]').removeClass('active').filter('[playname = "' + arr[HCCP.k3.playId] + '"]').addClass('active');

	$('[class *= bet-play-]').hide().filter('.bet-play-'+HCCP.k3.playId).show();

	//判断type 显示对应图表
	getChart(null,1);
	addSelectNum();
	calcZs();
	changeSetting();
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
	resetScroll();
}
//绑定点击事件
function bindEvent(){
	var o = 'click';
	//切换玩法
    $(".header-title").on(o,".header-drop",showPlay);
    $(".hc-nav").on(o,"[playname]",selectPlay); 
    $('[class *= "bet-play-"]').on(o,'nav>li',changeTab);
    //排序
    $('#hc-bet-play').on(o,'[data-sort]',tableSort);
    //选号
    $("[k3val]").on(o, selectBall);
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
	HCCP.dataS.local.set("basicTb", JSON.stringify(HCCP.k3.basic));
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
	var limit  = type == 3 ? 100 : HCCP.k3.defaultSet.limit;
	var tpObj = {
		1:['1', '2', '4', '3'],
		2:['1', '2', '10'],
		3:['1', '2', '10'],
		4:['1', '2', '6'],
		5:['1', '2', '6'],
		6:['1', '2', '10', '3'],
		7:['1', '2', '8', '3']
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
	if(type == 3){
		var key = playId+'_'+type;
	}else{
		var key = tp;
	}

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
	
}
function init_chart(data,key,flag,isTab,sort){ //数据  缓存key 是否直接更新数据   是否tab切换（1s拉取数据）
	if(data){
		var playId = HCCP.k3.playId;
		var type = HCCP.k3.type;
		var wrap = $('.bet-play-'+playId);
		var wrapLi = $('.chart-main>li',wrap);
		var tb = wrapLi.eq(type);

		if(flag){
			var limit = type == 3 ? 100 : HCCP.k3.defaultSet.limit;
			HCCP.k3.data[key] = data;
			HCCP.k3.data[key]['oLimit'] = limit;
		}

		if(sort || !HCCP.k3.catch[playId+'_'+type] || HCCP.k3.catch[playId+'_'+type] != JSON.stringify(data)){
			HCCP.k3.catch[playId+'_'+type] = JSON.stringify(data);
			var table = '';
			if(playId == 1){
				if(type == 0){
					table = getKJ(data);
				}else if(type == 1){
					table = getJBZS(data);
				}else if(type == 2){
					table = getHZZS(data);
				}else if(type == 3 ){
					table = getLR(data);
				}
			}else if(playId == 2||playId == 3){
				if(type == 0){
					table = getKJ_XT(data);
				}else if(type == 1){
					table = getJBZS(data);
				}else if(type == 2){
					table = getXTZS(data);
				}
			}else if(playId == 4 || playId == 5){
				if(type == 0){
					table = getKJ_XT(data);
				}else if(type == 1){
					table = getJBZS(data);
				}else if(type ==2){
					table = getHMFB(data);
				}
			}else if(playId == 6){
				if(type == 0){
					table = getKJ_XT(data);
				}else if(type == 1){
					table = getJBZS(data);
				}else if(type == 2){
					table = getXTZS(data);
				}else if(type == 3){
					table = getLR_BT(data);
				}
			}else if(playId == 7){
				if(type == 0){
					table = getKJ_XT(data);
				}else if(type == 1){
					table = getJBZS(data);
				}else if(type == 2){
					table = getHMZS(data);
				}else if(type == 3){
					table = getLR_BT(data);
				}
			}
			tb.empty().append(table);
			if(playId == 1 && type == 2){
				CreateLine();
			}
			if(type != 3){
				tb.find('.common tr:last-child')[0].scrollIntoView();	
			}
			if((playId == 1 || playId == 7) && type == 2){
				scrollEvent();
			}
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

//和值
function getKJ(data){
	var table='';
	if(data && data.history && data.history.length){
		var res = data.history;
		var dxAry = ['','小','大'];
		var dsAry = ['','单','双'];
		var issue,numAry,num,hz,dx,ds,html='';

		$.each(res,function(x,item){
			issue = item.issue.toString().substr(-2) || '';
			if(!item['kjhm'] || !item['kjhm'].length){
				html += '<tr>';
				html += '<td>'+issue+'期</td>';
				html += '<td colspan="4">等待开奖...</td>';
				html += '</tr>';
				return;
			}

			numAry = FUNC.filterAry(item.kjhm).sort(function(a,b){return a>b?1:-1;});
			num = numAry.join(' ');
			hz = item.sum_val?item.sum_val:'';
			dx = dxAry[item.size]?dxAry[item.size]:'';
			ds = dsAry[item.parity]?dsAry[item.parity]:'';

			html += '<tr>';
			html += '<td>'+issue+'期</td>';
			html += '<td><span class="award-num-sm">'+num+'</span></td>';
			html += '<td>'+ hz +'</td>';
			html += '<td>'+ dx +'</td>';
			html += '<td>'+ ds +'</td>';
			html += '</tr>';
		})
		table = '<table class="hc-bg table-fixed-top">';
		table += '<colgroup><col width="15%" /><col width="40%"/></colgroup>';
		table += '<tbody><tr><td>期号</td><td>开奖号码</td><td>和值</td><td>大小</td><td>单双</td></tr></tbody></table>';
		table += '<div class="wrap-common"><table class="common row1_c"><colgroup><col width="15%"/><col width="40%"/></colgroup>';
		table += '<tbody>'+html+'</tbody>';
		table += '</table></div>';
	}
	return table;
}
function getJBZS(data){
	var table='';
	var getNumTimes = function (arr){
		var tmp = arr || [];
		var obj = {};
		for (var i = tmp.length - 1; i >= 0; i--) {
			if(!obj[tmp[i]]){
				obj[tmp[i]] = 1;
			}else {
				obj[tmp[i]] = +obj[tmp[i]] + 1;
			}
		}
		return obj;
	}
	var getEm = function (num){
		var arr = (num instanceof Array) ? num.slice(0) : [];
		var obj = {};
		var times = getNumTimes(arr);
		for(var n = 1; n<7; n++){
			if(arr.indexOf(n.toString())<0){
				obj[n] = '';
			}else{
				if(times[n]>1){
					obj[n] = '<em times="'+times[n]+'" class="ballnum times">'+n+'</em>';
				}else{
					obj[n] = '<em class="ballnum">'+n+'</em>';
				}
			}
		}
		return obj;
	}
	var getFoot = function (f1,f2,f3,f4){
		var getTd = function (arr){
			var str = '',n;
			for(var i = 0; i<6; i++){
				n = arr[i] == undefined ? '' : arr[i];
				str += '<td>'+n+'</td>';
			}
			return str;
		}
		var html='';
		if(f1 && f2  && f3 && f4 && f1.length && f2.length && f3.length && f4.length){
			html = '<tfoot class="hc-tj"><tr><td colspan="4">出现次数</td>'+getTd(f1);
			html += '</tr><tr><td colspan="4">平均遗漏</td>'+getTd(f2);
			html += '</tr><tr><td colspan="4">最大遗漏</td>'+getTd(f3);
			html += '</tr><tr><td colspan="4">最大连出</td>'+getTd(f4);
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
		var issue,numAry,obj,num,hz,kd,omi,html='';
		$.each(res,function(x,item){
			issue = x.toString().substr(-2) || '';
			if(item instanceof Array && item.length == 0){
				html += '<tr><td>'+issue+'期</td><td colspan="9">等待开奖...</td></tr>';
				return ;
			}
			numAry = FUNC.filterAry(item.kjhm).sort(function(a,b){return a>b?1:-1;});
			hz = item.hz || '';
			kd = item.kd!=undefined ? item.kd : '';
			obj = getEm(numAry);
			num = numAry.join(' ');
			omi = item.omit || [];

			html += '<tr>';
			html += '<td>'+issue+'期</td>';
			html += '<td><span class="award-num-sm">'+num+'</span></td>';
			html += '<td>'+ hz +'</td>';
			html += '<td>'+ kd +'</td>';
			for(var i = 0; i<6; i++){
				var yl = omi[i] == undefined ? '--' : omi[i];
				html += '<td><span class="yl"><em class="hc-yl">'+ yl +'</em>'+ obj[i+1] +'</span></td>';
			}
			html += '</tr>';
		})

		table = '<table class="hc-bg table-fixed-top">';
		table += '<colgroup><col width="15%" /><col width="15%"/></colgroup>';
		table += '<tbody><tr><td>期号</td><td>开奖号码</td><td>和值</td><td>跨度</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr></tbody></table>';
		table += '<div class="wrap-common"><table class="common row1_c row_bt"><colgroup><col width="15%"/><col width="15%"/></colgroup>';
		table += '<tbody>'+html+'</tbody>';
		table += getFoot(data.occurrenceTimes, data.avgOmit, data.maxOmit, data.maxCombo);
		table += '</table></div>';
	}
	return table;
}
function getHZZS(data){
	var table='';
	var getFoot = function (f1,f2,f3,f4){
		var getTd = function (arr){
			var str = '',n;
			for(var i = 0; i<14; i++){
				n = arr[i] == undefined ? '' : arr[i];
				str += '<td>'+n+'</td>';
			}
			return str;
		}
		var html='';
		if(f1 && f2  && f3 && f4 && f1.length && f2.length && f3.length && f4.length){
			html = '<tfoot class="hc-tj"><tr>'+getTd(f1);
			html += '</tr><tr>'+getTd(f2);
			html += '</tr><tr>'+getTd(f3);
			html += '</tr><tr>'+getTd(f4);
			html += '</tr></tfoot>';
		}else {
			html = '<tfoot class="hc-tj"><tr><td class="col_row hc-grey" colspan="14" rowspan="4">等待开奖后更新</td></tr></tfoot>';
		}
		return html;
	}
	if(data && data.omit && !$.isEmptyObject(data.omit)){
		var res = data.omit;
		var issue,omi,hz,html=lHtml='';
		$.each(res,function(x,item){
			issue = x.toString().substr(-2) || '';
			if(item instanceof Array && item.length == 0){
				lHtml += '<tr><td>'+issue+'期</td></tr>';
				html += '<tr><td class="col_row1" colspan="14">等待开奖...</td></tr>';
				return ;
			}
			hz = item.hz || '';
			omi = item.omit || [];
			lHtml += '<tr><td>'+issue+'期</td></tr>';

			html += '<tr>';
			for(var i = 0; i<14; i++){
				if(hz == i+4){
					var em = '<em class="ballnum">'+hz+'</em>';
				}else{
					var em = '';
				}
				var yl = omi[i] == undefined ? '--':omi[i];
				html += '<td><span class="yl square"><em class="hc-yl">'+ yl +'</em>'+ em +'</span></td>';
			}
			html += '</tr>';
		})

		table = '<dl class="hc-dl hc-bg table-fixed-top">';
        table += '<dt><table><tbody><tr><td>期号</td></tr></tbody></table></dt>';
        table += '<dd class="scroll_bar scroll_t1"><table class="hc-scroll"><tbody><tr>';
       	for(var k = 4; k<18;k++){
       		table += '<td>'+k+'</td>';
       	}
        table += '</tr></tbody></table></dd></dl>'
        table += '<dl class="hc-dl table-fixed-center wrap-common">';
        table += '<dt><table class="common row1_c row_bt"><tbody>'+lHtml;
        table += '</tbody><tfoot class="hc-tj"><tr><td>出现次数</td></tr><tr><td>平均遗漏</td></tr><tr><td>最大遗漏</td></tr><tr><td>最大连出</td></tr></tfoot></table></dt>';
		table += '<dd id="myCanvas" class="scroll_bar scroll_c1"><table class="hc-scroll common row_bt">';
		table += '<tbody>'+html+'</tbody>';
		table += '<div id="canvasHz" class="hc-zx"></div>'
		table += getFoot(data.occurrenceTimes, data.avgOmit, data.maxOmit, data.maxCombo);
		table += '</table>';
	}
	return table;
}
function getLR(data){
	var table='';
	if(data && data.coldHot && data.coldHot.length){
		var res = data.coldHot;
		var item,num,t_3,t_5,t_10,t_yl,html='';
		var sortObj = HCCP.k3.defaultSort[HCCP.k3.playId] || {};
		var activeIndex = (sortObj['active'] <= 4 && sortObj['active'] >= 0) ? sortObj['active'] : 0;
		var direction = sortObj['direction'] == 1 ? 1 : 0;
		var keyArr = ['number','coldHot30','coldHot50','coldHot100','currentOmit'];
		var titleArr = ['和值','30期','50期','100期','遗漏'];
		var key = keyArr[activeIndex];
		var tmp = res.slice(0).sort(function(a,b){
			if(direction){
				return a[key]>b[key]?1:-1;	
			}else{
				return a[key]<b[key]?1:-1;	
			}
		})
		var arr1 = [],arr2 = [], arr3 = [],arr4 =[],arr5 = [];
		$.each(tmp,function(x,y){
			arr1.push(y['number']);
			arr2.push(y['coldHot30']);
			arr3.push(y['coldHot50']);
			arr4.push(y['coldHot100']);
			arr5.push(y['currentOmit']);
		})
		var arrM1 = HCCP.MATH.array.max(arr1),
			arrM2 = HCCP.MATH.array.max(arr2),
			arrM3 = HCCP.MATH.array.max(arr3),
			arrM4 = HCCP.MATH.array.max(arr4),
			arrM5 = HCCP.MATH.array.max(arr5);
		var c1=c2=c3=c4=c5='';
		for(var i=0;i<14;i++){
			c1=c2=c3=c4=c5='';
			item =  (tmp[i] instanceof Object) ? tmp[i] : {};
			num = item.number == undefined ? '--' : item.number;
			t_3 = item.coldHot30 == undefined ? '--' : item.coldHot30;
			t_5 = item.coldHot50 == undefined ? '--' : item.coldHot50;
			t_10 = item.coldHot100 == undefined ? '--' : item.coldHot100;
			t_yl = (item.currentOmit == undefined || item.currentOmit == -1)? '--' : item.currentOmit;
			if(num == arrM1){c1 = 'hc-color-k3yellow';}
			if(t_3 == arrM2){c2 = 'hc-color-k3yellow';}
			if(t_5 == arrM3){c3 = 'hc-color-k3yellow';}
			if(t_10 == arrM4){c4 = 'hc-color-k3yellow';}
			if(t_yl == arrM5){c5 = 'hc-color-k3yellow';}
			html += '<tr>';
			html += '<td><span class="'+c1+'">'+num+'</span></td>';
			html += '<td><span class="'+c2+'">'+t_3+'</span></td>';
			html += '<td><span class="'+c3+'">'+t_5+'</span></td>';
			html += '<td><span class="'+c4+'">'+t_10+'</span></td>';
			html += '<td><span class="'+c5+'">'+t_yl+'</span></td>';
			html += '</tr>';
		}
		table = '<table class="hc-bg table-fixed-top">';
		table += '<colgroup><col width="20%" /><col width="20%"/><col width="20%" /><col width="20%"/></colgroup>';
		table += '<tbody><tr>';
		var _a,_b;
		for(var j = 0; j < 5; j++){
			if(j == activeIndex){
				_a = 'active';
				_b = direction;
			}else{
				_a = '';
				_b = '0';
			}
			table += '<td data-sort="'+_b+'" class="'+_a+'"><span>'+titleArr[j]+'</span></td>';
		}
		table += '</tr></tbody></table>';
		table += '<div class="wrap-common"><table class="common nolastBg"><col width="20%" /><col width="20%"/><col width="20%" /><col width="20%"/></colgroup>';
		table += '<tbody>'+html+'</tbody>';
		table += '</table></div>';
	}
	return table;
}
//三同
function getKJ_XT(data){
	var table='';
	if(data && data.history && data.history.length){
		var res = data.history;
		var formAry = ['','二同号','三同号','三不同','三连号'];
		var issue,numAry,num,xt,html='';
		
		$.each(res,function(x,item){
			issue = item.issue.toString().substr(-2) || '';
			if(!item['kjhm'] || !item['kjhm'].length){
				html += '<tr>';
				html += '<td>'+issue+'期</td>';
				html += '<td colspan="2">等待开奖...</td>';
				html += '</tr>';
				return;
			}

			numAry = FUNC.filterAry(item.kjhm).sort(function(a,b){return a>b?1:-1;});
			num = numAry.join(' ');

			xt = formAry[item.form]?formAry[item.form]:'';

			html += '<tr>';
			html += '<td>'+issue+'期</td>';
			html += '<td><span class="award-num-sm">'+num+'</span></td>';
			html += '<td>'+ xt +'</td>';
			html += '</tr>';
		})
		table = '<table class="hc-bg table-fixed-top">';
		table += '<colgroup><col width="15%" /></colgroup>';
		table += '<tbody><tr><td>期号</td><td>开奖号码</td><td>形态</td></tr></tbody></table>';
		table += '<div class="wrap-common"><table class="common row1_c"><colgroup><col width="15%"/></colgroup>';
		table += '<tbody>'+html+'</tbody>';
		table += '</table></div>';
	}
	return table;
}
function getXTZS(data){
	var table='';
	var getFoot = function (f1,f2,f3,f4){
		var getTd = function (arr){
			var str = '',n;
			for(var i = 0; i<4; i++){
				n = arr[i] == undefined ? '' : arr[i];
				str += '<td>'+n+'</td>';
			}
			return str;
		}
		var html='';
		if(f1 && f2  && f3 && f4 && f1.length && f2.length && f3.length && f4.length){
			html = '<tfoot class="hc-tj"><tr><td colspan="2">出现次数</td>'+getTd(f1);
			html += '</tr><tr><td colspan="2">平均遗漏</td>'+getTd(f2);
			html += '</tr><tr><td colspan="2">最大遗漏</td>'+getTd(f3);
			html += '</tr><tr><td colspan="2">最大连出</td>'+getTd(f4);
			html += '</tr></tfoot>';
		}else {
			html = '<tfoot class="hc-tj"><tr><td colspan="2">出现次数</td><td class="hc-grey" colspan="4" rowspan="4">等待开奖后更新</td></tr>';
			html += '<tr><td colspan="2">平均遗漏</td></tr>';
			html += '<tr><td colspan="2">最大遗漏</td></tr>';
			html += '<tr><td colspan="2">最大连出</td></tr></tfoot>';
		}
		return html;
	}
	if(data && data.omit && !$.isEmptyObject(data.omit)){
		var res = data.omit;
		var issue,numAry,obj,num,omi,html='';
		var formAry = ['三同号','三不同','二同号','二不同'];

		$.each(res,function(x,item){
			issue = x.toString().substr(-2) || '';
			if(item instanceof Array && item.length == 0){
				html += '<tr><td>'+issue+'期</td><td colspan="5">等待开奖...</td></tr>';
				return ;
			}
			numAry = FUNC.filterAry(item.kjhm).sort(function(a,b){return a>b?1:-1;});
			num = numAry.join(' ');
			omi = item.omit || [];		

			html += '<tr>';
			html += '<td>'+issue+'期</td>';
			html += '<td><span class="award-num-sm">'+num+'</span></td>';	
			for(var i = 0; i<4; i++){
				var yl = omi[i] == undefined ? '--' : omi[i];
				if(yl == 0 && formAry[i]){
					var em = '<em class="ballnum">'+formAry[i]+'</em>';
				}else{
					var em = '';
				}
				html += '<td><span class="yl s_ch s_ch'+i+'"><em class="hc-yl">'+ yl +'</em>'+ em +'</span></td>';
			}
			html += '</tr>';
		})

		table = '<table class="hc-bg table-fixed-top">';
		table += '<colgroup><col width="15%" /><col width="15%"/></colgroup>';
		table += '<tbody><tr><td>期号</td><td>开奖号码</td><td>三同号</td><td>三不同</td><td>二同号</td><td>二不同</td></tr></tbody></table>';
		table += '<div class="wrap-common"><table class="common row1_c row_bt"><colgroup><col width="15%"/><col width="15%"/></colgroup>';
		table += '<tbody>'+html+'</tbody>';
		table += getFoot(data.occurrenceTimes, data.avgOmit, data.maxOmit, data.maxCombo);
		table += '</table></div>';
	}
	return table;
}
//二同
function getHMFB(data){
	var table='';
	var getFoot = function (f1,f2,f3,f4){
		var getTd = function (arr){
			var str = '',n;
			for(var i = 12; i<18; i++){
				n = arr[i] == undefined ? '' : arr[i];
				str += '<td>'+n+'</td>';
			}
			return str;
		}
		var html='';
		if(f1 && f2  && f3 && f4 && f1.length && f2.length && f3.length && f4.length){
			html = '<tfoot class="hc-tj"><tr><td colspan="2">出现次数</td>'+getTd(f1);
			html += '</tr><tr><td colspan="2">平均遗漏</td>'+getTd(f2);
			html += '</tr><tr><td colspan="2">最大遗漏</td>'+getTd(f3);
			html += '</tr><tr><td colspan="2">最大连出</td>'+getTd(f4);
			html += '</tr></tfoot>';
		}else {
			html = '<tfoot class="hc-tj"><tr><td colspan="2">出现次数</td><td class="hc-grey" colspan="6" rowspan="4">等待开奖后更新</td></tr>';
			html += '<tr><td colspan="2">平均遗漏</td></tr>';
			html += '<tr><td colspan="2">最大遗漏</td></tr>';
			html += '<tr><td colspan="2">最大连出</td></tr></tfoot>';
		}
		return html;
	}
	if(data && data.omit && !$.isEmptyObject(data.omit)){
		var res = data.omit;
		var issue,omi,numAry,num,html='';

		$.each(res,function(x,item){
			
			issue = x.toString().substr(-2) || '';
			if(item instanceof Array && item.length == 0){
				html += '<tr><td>'+issue+'期</td><td colspan="7">等待开奖...</td></tr>';
				return ;
			}
			numAry = FUNC.filterAry(item.kjhm).sort(function(a,b){return a>b?1:-1;});
			omi = item.omit || [];
			num = numAry.join(' ');

			html += '<tr>';
			html += '<td>'+issue+'期</td>';
			html += '<td><span class="award-num-sm">'+num+'</span></td>';
			for(var i = 1; i<7; i++){
				var k = +i + 11;
				var yl = omi[k] == undefined ? '--' : omi[k];
				if(yl == 0){
					var em = '<em class="ballnum">'+i+''+i+'</em>';
				}else{
					var em = '';
				}
				html += '<td><span class="yl square"><em class="hc-yl">'+ yl +'</em>'+ em +'</span></td>';
			}
			html += '</tr>';
		})

		table = '<table class="hc-bg table-fixed-top">';
		table += '<colgroup><col width="15%" /><col width="15%"/></colgroup>';
		table += '<tbody><tr><td>期号</td><td>开奖号码</td><td>11</td><td>22</td><td>33</td><td>44</td><td>55</td><td>66</td></tr></tbody></table>';
		table += '<div class="wrap-common"><table class="common row1_c row_bt"><colgroup><col width="15%"/><col width="15%"/></colgroup>';
		table += '<tbody>'+html+'</tbody>';
		table += getFoot(data.occurrenceTimes, data.avgOmit, data.maxOmit, data.maxCombo);
		table += '</table></div>';
	}
	return table;
}
//三不同
function getLR_BT(data){
	var table='';
	if(data && data.coldHot && data.coldHot.length){
		var res = data.coldHot;
		var item,num,t_3,t_5,t_10,t_yl,html='';
		var sortObj = HCCP.k3.defaultSort[HCCP.k3.playId] || {};
		var activeIndex = (sortObj['active'] <= 4 && sortObj['active'] >= 0) ? sortObj['active'] : 0;
		var direction = sortObj['direction'] == 1 ? 1 : 0;
		var keyArr = ['number','coldHot30','coldHot50','coldHot100','currentOmit'];
		var titleArr = ['号码','30期','50期','100期','遗漏'];
		var key = keyArr[activeIndex];
		var tmp = res.slice(0).sort(function(a,b){
			if(direction){
				return a[key]>b[key]?1:-1;	
			}else{
				return a[key]<b[key]?1:-1;	
			}
		})
		var arr1 = [],arr2 = [], arr3 = [],arr4 =[],arr5 = [];
		$.each(tmp,function(x,y){
			arr1.push(y['number']);
			arr2.push(y['coldHot30']);
			arr3.push(y['coldHot50']);
			arr4.push(y['coldHot100']);
			arr5.push(y['currentOmit']);
		})
		var arrM1 = HCCP.MATH.array.max(arr1),
			arrM2 = HCCP.MATH.array.max(arr2),
			arrM3 = HCCP.MATH.array.max(arr3),
			arrM4 = HCCP.MATH.array.max(arr4),
			arrM5 = HCCP.MATH.array.max(arr5);
		var c1=c2=c3=c4=c5='';
		for(var i=0;i<6;i++){
			c1=c2=c3=c4=c5='';
			item =  (tmp[i] instanceof Object) ? tmp[i] : {};
			num = item.number == undefined ? '--' : item.number;
			t_3 = item.coldHot30 == undefined ? '--' : item.coldHot30;
			t_5 = item.coldHot50 == undefined ? '--' : item.coldHot50;
			t_10 = item.coldHot100 == undefined ? '--' : item.coldHot100;
			t_yl = (item.currentOmit == undefined || item.currentOmit == -1)? '--' : item.currentOmit;
			
			if(num == arrM1){c1 = 'hc-color-k3yellow';}
			if(t_3 == arrM2){c2 = 'hc-color-k3yellow';}
			if(t_5 == arrM3){c3 = 'hc-color-k3yellow';}
			if(t_10 == arrM4){c4 = 'hc-color-k3yellow';}
			if(t_yl == arrM5){c5 = 'hc-color-k3yellow';}
			html += '<tr>';
			html += '<td><span class="'+c1+'">'+num+'</span></td>';
			html += '<td><span class="'+c2+'">'+t_3+'</span></td>';
			html += '<td><span class="'+c3+'">'+t_5+'</span></td>';
			html += '<td><span class="'+c4+'">'+t_10+'</span></td>';
			html += '<td><span class="'+c5+'">'+t_yl+'</span></td>';
			html += '</tr>';
		}
		table = '<table class="hc-bg table-fixed-top">';
		table += '<colgroup><col width="20%" /><col width="20%"/><col width="20%" /><col width="20%"/></colgroup>';
		table += '<tbody><tr>';
		var _a,_b;
		for(var j = 0; j < 5; j++){
			if(j == activeIndex){
				_a = 'active';
				_b = direction;
			}else{
				_a = '';
				_b = '0';
			}
			table += '<td data-sort="'+_b+'" class="'+_a+'"><span>'+titleArr[j]+'</span></td>';
		}
		table += '</tr></tbody></table>';
		table += '<div class="wrap-common"><table class="common nolastBg"><col width="20%" /><col width="20%"/><col width="20%" /><col width="20%"/></colgroup>';
		table += '<tbody>'+html+'</tbody>';
		table += '</table></div>';
	}
	return table;
}
//二不同
function getHMZS(data){
	var table='';
	var getFoot = function (f1,f2,f3,f4){
		var getTd = function (arr){
			var str = '',n;
			for(var i = 0; i<15; i++){
				n = arr[i] == undefined ? '' : arr[i];
				str += '<td>'+n+'</td>';
			}
			return str;
		}
		var html='';
		if(f1 && f2  && f3 && f4 && f1.length && f2.length && f3.length && f4.length){
			html = '<tfoot class="hc-tj"><tr>'+getTd(f1);
			html += '</tr><tr>'+getTd(f2);
			html += '</tr><tr>'+getTd(f3);
			html += '</tr><tr>'+getTd(f4);
			html += '</tr></tfoot>';
		}else {
			html = '<tfoot class="hc-tj"><tr><td class="col_row hc-grey" colspan="15" rowspan="4">等待开奖后更新</td></tr></tfoot>';
		}
		return html;
	}
	if(data && data.omit && !$.isEmptyObject(data.omit)){
		var res = data.omit;
		var issue,omi,numAry,num,html=lHtml='';

		$.each(res,function(x,item){
			
			issue = x.toString().substr(-2) || '';
			if(item instanceof Array && item.length == 0){
				lHtml += '<tr><td>'+issue+'期</td><td class="waitKJ">- - -</td></tr>';
				html += '<tr><td colspan="15">等待开奖...</td></tr>';
				return ;
			}
			numAry = FUNC.filterAry(item.kjhm).sort(function(a,b){return a>b?1:-1;});
			num = numAry.join(' ');
			omi = item.omit || [];
			lHtml += '<tr><td>'+issue+'期</td><td>'+num+'</td></tr>';

			html += '<tr>';
			for(var i=0,j=1; j<6;j++){
				for(var k = j+1; k<7; k++){
					var yl = omi[i] == undefined ? '--':omi[i];
					if(yl == 0){
						var em = '<em class="ballnum">'+j+''+k+'</em>';
					}else{
						var em = '';
					}
					i++;
					html += '<td><span class="yl square"><em class="hc-yl">'+ yl +'</em>'+ em +'</span></td>';
				}
			}
			html += '</tr>';
		})

		table = '<dl class="hc-dl2 hc-bg table-fixed-top">';
        table += '<dt><table><tbody><tr><td>期号</td><td>开奖号码</td></tr></tbody></table></dt>';
        table += '<dd class="scroll_bar scroll_t2"><table class="hc-scroll2"><tbody><tr>';
        for(var m=1; m<6;m++){
			for(var n = m+1; n<7; n++){
				table += '<td>'+m+''+n+'</td>';
			}
		}
        table += '</tr></tbody></table></dd></dl>'
        table += '<dl class="hc-dl2 table-fixed-center wrap-common">';
        table += '<dt><table class="common row1_c row_bt"><tbody>'+lHtml;
        table += '</tbody><tfoot class="hc-tj"><tr><td colspan="2">出现次数</td></tr><tr><td colspan="2">平均遗漏</td></tr><tr><td colspan="2">最大遗漏</td></tr><tr><td colspan="2">最大连出</td></tr></tfoot></table></dt>';
		table += '<dd class="scroll_bar scroll_c2"><table class="hc-scroll2 common row_bt">';
		table += '<tbody>'+html+'</tbody>';
		table += getFoot(data.occurrenceTimes, data.avgOmit, data.maxOmit, data.maxCombo);
		table += '</table>';
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
        addprize(issue.data.playIdentity);
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
// 加奖 and 新增
function addprize(data) {
 	if (data && !$.isEmptyObject(data)) {
 		$.each(data, function(key, val) {
 			$('[addprizename="' + key + '"]').parent().addClass('addsign' + val)
 		})
 	}
}
function init_issue(issue) {
	// 距<hc name="issue"></hc>期截止 : <time class="hc-color-k3yellow" name="cdtime">-- : --</time>
    if(issue && issue.issue) {
        HCCP.k3.fullIssue = issue.issue;
        HCCP.k3.issueS = issue.issue.toString().substr(-2);
        HCCP.k3.serverTime = issue.serverTime;
        HCCP.k3.diffServer = HCCP.k3.serverTime*1000 - new Date().getTime();
        HCCP.k3.companyEndTime = issue.companyEndTime;
        if($(".hc-k3-stop").text().trim() == "正在获取期号中...") {
			$(".hc-k3-stop").html('距<span name="issue">' + HCCP.k3.issueS + '</span>期截止：<time class="hc-color-k3yellow" name="cdtime">-- : --</time>')
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
	        HCCP.k3.overdueIssue = HCCP.k3.fullIssue.toString().substr(-2);
	        getIssue();
	        getChart();
	        HCCP.k3.nowIssue = HCCP.k3.fullIssue.toString().substr(-2);
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
function resetScroll(){
	var bet1 = $('.bet-play-1'),
		bet7 = $('.bet-play-7');
		$('.scroll_t1,.scroll_c1,.scroll_b1',bet1).scrollLeft(0);
		$('.scroll_t2,.scroll_c2',bet7).scrollLeft(0);
}
function scrollEvent(){
	var bet1 = $('.bet-play-1'),
		bet7 = $('.bet-play-7');
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
		bet7.find('.scroll_t2').off('scroll').scroll(function(){
			var scrollLeft = this.scrollLeft;
			$('.scroll_c2').scrollLeft(scrollLeft);
		})
		bet7.find('.scroll_c2').off('scroll').scroll(function(){
			var scrollLeft = this.scrollLeft;
			$('.scroll_t2').scrollLeft(scrollLeft);
		})
}

//购买
function selectBall() {
	var playId = HCCP.k3.playId;
	
	var that = $(this);
	that.toggleClass('active');

	addSelectNum();
	calcZs();
}
function addSelectNum(){
	var playId = HCCP.k3.playId;
	var _parent = $(".bet-play-"+playId);
	
	var obj = new Object();
	obj[playId] = new Object();
	obj[playId]['tuo'] = new Array();

	var selectEle = _parent.find('[k3val].active');
	selectEle.each(function(){
		obj[playId]['tuo'].push($(this).attr("k3val"));
	})

	HCCP.k3.betObj[playId] = null;
	HCCP.k3.betObj[playId] = obj;
}
//计算注数
function calcZs(){
	var playId = +HCCP.k3.playId;
	var selectJson = HCCP.k3.betObj[playId] || {};
	var zs = 0,hasSelect = 0;
	var hasTips = 0,showTips = 0;

	var obj = selectJson[playId]?selectJson[playId]:{};
	var	arrTuo = FUNC.filterAry(obj['tuo']);
	if(playId == 1 || playId == 3 || playId == 4){
		zs = arrTuo.length;
	}else if(playId == 6){
		zs = FUNC.zh(arrTuo.length,3);
	}else if(playId == 7){
		zs = FUNC.zh(arrTuo.length,2);
	}

	if(arrTuo.length){  //提示
		hasSelect = 1;
		if(playId == 6 && arrTuo.length < 3){
			hasTips = 1;
			showTips = 8;
		}else if(playId == 7 && arrTuo.length < 2){
			hasTips = 1;
			showTips = 9;
		}
	}
	var tmp = {
		playId:playId,
		tuo:arrTuo,
		zs:zs
	}
	var bonus = getBonusTitle(tmp);
	var money = zs * 2;

	var totalEle = $('.p_total');
	var titleEle = $('.selectTitle');
	$('.zs',totalEle).text(zs);
	$('.money',totalEle).text(money);
	var txt = HCCP.k3.selectTitle[playId] || '';
	if(playId == 1 || playId == 7){
		if(bonus.min == bonus.max){
			var btxt = '若中奖,奖金<em class="hc-color-k3yellow">'+ bonus.max +'元 ';	
		}else{
			var btxt = '若中奖,奖金<em class="hc-color-k3yellow">'+bonus.min +'-'+ bonus.max +'元 ';
		}
	}else{
		var btxt = '若中奖,奖金<em class="hc-color-k3yellow">'+ bonus.max +'元 ';	
	}
	if(hasSelect){
		titleEle.html(btxt);
		totalEle.show();
	}else{
		totalEle.hide();
		titleEle.html(txt);
	}
	HCCP.k3.tips = {
		hasSelect : hasSelect,
		hasTips : hasTips,
		showTips : showTips
	}
}
function getBonusTitle(item){
	var bonus1 = {
			4:80,
			5:40,
			6:25,
			7:16,
			8:12,
			9:10,
			10:9,
			11:9,
			12:10,
			13:12,
			14:16,
			15:25,
			16:40,
			17:80
		},
		bonus2 = {
			2:40,
			3:240,
			4:15,
			5:80,
			6:40,
			7:8,
			8:10
		}
	var arr = [];
	var playId = item['playId'],
		tuo = item['tuo'];
	if(playId == 1){
		for(var i = 0,len=tuo.length; i<len; i++){
			var b = bonus1[tuo[i]] || 0;
			arr.push(b);
		}
	}else{
		var  b= bonus2[playId] || 0;
		arr.push(b);
		if(playId == 7){
			if(tuo.length>2){
				arr.push(b*3);
			}
		}
	}
	if(!arr.length){arr.push(0)}
	var max = HCCP.MATH.array.max(arr);
	var min = HCCP.MATH.array.min(arr);
	return {max:max,min:min}

}
function rand1() {
	var playId = HCCP.k3.playId;
	var _parent = $(".bet-play-"+playId);
    var arr = randOne();
    if(playId == 1){
    	arr = randOne(true);
    	var len = eval(arr.join("+"));
    	$('[k3val]',_parent).removeClass('active').filter('[k3val="'+len+'"]').addClass('active');
    }else if(playId == 3 || playId == 4){
    	$('[k3val]',_parent).removeClass('active').eq(+arr[0] - 1).addClass('active');
    }else if(playId == 6){
    	_parent.find('[k3val]').removeClass('active');
    	for(var i=0;i<3;i++){
    		_parent.find('[k3val]').eq(+arr[i] - 1).addClass('active');
    	}
    }else if(playId == 7){
    	_parent.find('[k3val]').removeClass('active');
    	for(var i=0;i<2;i++){
    		_parent.find('[k3val]').eq(+arr[i] - 1).addClass('active');
    	}
    }else{
    	//木有了
    }

    addSelectNum();
	calcZs();
}
function randOne(repeat){
	var arr,len;
	if(repeat){
		do{
			arr =  HCCP.MATH.random(1, 6, 3, true);
			len = eval(arr.join("+"));
		}while(len == 3 || len == 18)
		return arr;	
	}else{
		arr = HCCP.MATH.random(1, 6, 3);
		return arr;	
	}
	
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
	var betObj = HCCP.k3.betObj,
		playId = HCCP.k3.playId;
	var obj = betObj[playId] || {};

	var newAry = new Array();
	for(var key in obj){
		var arr = new Object();
		arr.playId = key;
		arr.dan = obj[key]['dan']||[];
		arr.tuo = obj[key]['tuo']||[];
		arr.isDan = 0;
		arr.zs = obj[key]['zs']||0;  //0000
		newAry.push(arr);
	}
	return newAry;
}
function setBetContent(newAry) {
	if(!HCCP.k3.confirm_betcontent){
		HCCP.k3.confirm_betcontent = new Object();
		HCCP.k3.confirm_betcontent[HCCP.k3.lotyId] = new Array();
	}

	if(HCCP.k3.default_betcontent) {
		var index = HCCP.k3.default_betcontent.confirm_id;
		HCCP.k3.confirm_betcontent[HCCP.k3.lotyId].splice(index,1);
		HCCP.dataS.local.del("default_betcontent");
	}
	for (var i = newAry.length - 1; i >= 0; i--) {
		HCCP.k3.confirm_betcontent[HCCP.k3.lotyId].unshift(newAry[i])
	}

	var confirm_betcontent = new Object();
	confirm_betcontent[HCCP.k3.lotyId] = newAry;

	HCCP.dataS.local.set("confirm_betcontent", JSON.stringify(HCCP.k3.confirm_betcontent));
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
	if(!tips || !tips.hasSelect){
		// 胆拖不随机	
		rand1();	
		return;
	}
	//有选号不满条件
	if(tips.hasTips){
		HCCP.FUNC.alert(selectTips[tips.showTips]);
		return;
	}
	var thisSelectData = getSelectData();
	//判断限号
	var limitJ = limitNum(thisSelectData, HCCP.k3.limitObj);
	if(!$.isEmptyObject(limitJ)){
		var limitObj = HCCP.k3.limitObj ? HCCP.k3.limitObj:{};
		for(var key in limitJ){
			var playAry = limitObj[key] || [];
			var limitNumStr = playAry.join('&nbsp;&nbsp;&nbsp;&nbsp;');
			if(key == 2 || key == 8){
				limitNumStr = '';
			}
			HCCP.modal.alert({
				title:'官方限号',
				msg:'以下组合玩法及投注号码暂不接受投注<br/>【'+ HCCP.getPlayName(HCCP.k3.lotyId, key) + '】&nbsp;'+ limitNumStr + '组合',
				alertBtn:'返回修改'
			})
			break;
		}
		return false;
	}
	// 判断是否盈利
	var bonus = getBonus(thisSelectData);
	if($('.p_total .money').text() > bonus.max){
		HCCP.modal.confirm({
			'msg':'您当前的投注金额大于理论最高奖金，会造成方案亏损，您确认要继续投注吗？',
			confirmCallback:function(){
				setBetContent(thisSelectData);
				HCCP.dataS.local.del('basicTb');
				HCCP.FUNC.go(URL_K3_CONFIRM, true);
			}
		})
	}else{
		setBetContent(thisSelectData);
		HCCP.dataS.local.del('basicTb');
		HCCP.FUNC.go(URL_K3_CONFIRM, true);
	}

	
}
function getBonus(tempA){
	var ary = tempA instanceof Array ? tempA.slice(0) : [];
	var bonus1 = {
			4:80,
			5:40,
			6:25,
			7:16,
			8:12,
			9:10,
			10:9,
			11:9,
			12:10,
			13:12,
			14:16,
			15:25,
			16:40,
			17:80
		};
	var	bonus2 = {
			2:40,
			3:240,
			4:15,
			5:80,
			6:40,
			7:8,
			8:10
		};	
	var allOpenCode = FUNC.getCombin([1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6],3);
	var max = min = 0;
	for (var i = 0; i < allOpenCode.length; i++) {
		var total = 0;
		var openCode = allOpenCode[i].sort(function(a,b){return a>b?1:-1});
		var uniqueCode = FUNC.unique(openCode);
		var openCodeStr = openCode.join('');
		$.each(ary, function(x,y){
			var playId = y.playId;
			var dan = y.dan || [];
			var tuo = y.tuo || [];
			if(playId == 1){
				var sum = eval(openCode.join('+'));
				tuo.map(function(y){ 
					if(y == sum){
						total += bonus1[y] * 1;
					}
				})
			}else if(playId == 2){  //三同号通选
				if(tuo.length && uniqueCode.length == 1){
					total += bonus2[playId] * 1;
				}
			}else if(playId == 3){
				if(uniqueCode.length == 1){
					tuo.map(function(y){
						if(y == openCodeStr){
							total += bonus2[playId] * 1;
						}
					})	
				}
			}else if(playId == 4){
				if(uniqueCode.length < 3){
					var double = openCode[0];
					if(openCode[1] == openCode[2]){
						double = openCode[1];
					}
					tuo.map(function(y){
						if(double == y.substr(0,1)){
							total += bonus2[playId] * 1;
						}
					})	
				}
			}else if(playId == 5){
				if(uniqueCode.length == 2){
					var double = openCode[0];
					if(openCode[1] == openCode[2]){
						double = openCode[1];
					}
					var simpleCode = double == uniqueCode[0] ? uniqueCode[1] : uniqueCode[0];
					for (var m = dan.length - 1; m >= 0; m--) {
						if(dan[m].substr(0,1) == double){
							for (var n = tuo.length - 1; n >= 0; n--) {
								if(tuo[n] == simpleCode){
									total += bonus2[playId] * 1;
									break;
								}
							}
							break;
						}
					}

				}
			}else if(playId == 6 || playId == 7){
				var n = playId == 6 ? 3 : 2;
				if(FUNC.intersect(openCode, dan).length == dan.length){
					var intersect = FUNC.intersect(openCode, tuo);
					if(intersect.length >= n-dan.length){
						total += FUNC.zh(intersect.length, n-dan.length) *  bonus2[playId];
					}
				}
			}else if(playId == 8){
				if(tuo.length){
					if(uniqueCode.length == 3 && openCode[2]-openCode[0] == 2){
						total += bonus2[playId] * 1;
					}
				}
			}
		})
		if(total > 0){
			if(min <= 0 || min > total){
				min = total; 
			}
			if(max <= 0 || max < total){
				max = total;
			}	
		}
	}
	return {'max':max,'min':min};
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
	if((playId == 1 || playId == 6 || playId == 7) && type == 3){
		setIcon.hide();
	}else{
		setIcon.show();
	}
	if(playId == 1 && type == 2){
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
	var wrap = $('#myCanvas');
	var cav = $('#canvasHz');
	var ele = $('.square:has(.ballnum)',wrap);
	cav.empty();
	var c = '#5e7f72';
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
        cvs.width =Math.abs(f_left - t_left) < f_width ? f_width : Math.abs(f_left - t_left);
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

function tableSort(){
	var that = $(this),
		index = that.index(),
		direction = that.attr('data-sort');
	if(that.hasClass('active')){
		direction = direction == 1 ? 0 : 1;
	}
	HCCP.k3.defaultSort[HCCP.k3.playId].active = index;
	HCCP.k3.defaultSort[HCCP.k3.playId].direction = direction;
	getChart(0,0,1);
}







