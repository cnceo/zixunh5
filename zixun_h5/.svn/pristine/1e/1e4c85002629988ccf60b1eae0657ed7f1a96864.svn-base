$(document).ready(function() {
    HCCP.K3ID = [10];
    HCCP.k3 = new Object();
    HCCP.k3.selectTips = [
		"",
		"每位至少选择1个不同号码",
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
	// if(HCCP.k3.tuo && HCCP.k3.tuo.length) {
	// 	setDefaultData();
	// }
    
   
});
function _init() {
	HCCP.k3.lotyId = HCCP.FUNC.getUrlParam('clickValueInt');
	if(!HCCP.k3.lotyId || HCCP.K3ID.indexOf(+HCCP.k3.lotyId) < 0){
		// HCCP.FUNC.go(URL_INDEX);
		// return;
		HCCP.k3.lotyId = 10;
	}
	//取存号
	try {
		var basic = JSON.parse(HCCP.dataS.local.get("basicTb"));
	} catch(e) {}
	if(basic && basic['lotyId'] && basic['lotyId'] == HCCP.k3.lotyId){
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
		HCCP.k3.playId = 0;
		HCCP.k3.type = 0;
		HCCP.k3.dantuo = 0;
		HCCP.k3.tuo = [];
		HCCP.dataS.local.del("basicTb");
		HCCP.dataS.local.del("default_betcontent");
		// HCCP.dataS.local.del("content");
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
		'0': {
			active:4,
			direction:0
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
		var content = JSON.parse(HCCP.dataS.local.get("content"));
	} catch(e) {}
	if(content && content[HCCP.k3.basic.lotyId]) {
		HCCP.k3.content = content;
		
	}else{
		HCCP.k3.content = null;
		HCCP.dataS.local.del("content");
	}
}
// function setDefaultData(){
// 	var arr = HCCP.k3.tuo;
// 	var playId = HCCP.k3.playId;
// 	var _parent = $('.bet-play-'+playId);
// 	if(HCCP.k3.playId == 1){
// 		var a = arr.replace(/ /g,"").split("|")
// 		var strArr1 = a[0].split("")
// 		var strArr2 = a[1].split("")
// 		var strArr3 = a[2].split("")
// 		for(var i = 0,len = strArr1.length; i<len; i++){
// 			$('.bwnum [val="'+strArr1[i]+'"]',_parent).addClass('am-lott-ball-red');
// 		}
// 		for(var i = 0,len = strArr2.length; i<len; i++){
// 			$('.swnum [val="'+strArr2[i]+'"]',_parent).addClass('am-lott-ball-red');
// 		}
// 		for(var i = 0,len = strArr3.length; i<len; i++){
// 			$('.gwnum [val="'+strArr3[i]+'"]',_parent).addClass('am-lott-ball-red');
// 		}
// 	}else if(HCCP.k3.playId == 2){
// 		arr = arr.replace(/ /g,"").split("")
// 		for(var i = 0,len = arr.length; i<len; i++){
// 			$('.z3num [val="'+arr[i]+'"]',_parent).addClass('am-lott-ball-red');
// 		}
// 	}else if(HCCP.k3.playId == 3){
// 		arr = arr.replace(/ /g,"").split("")
// 		for(var i = 0,len = arr.length; i<len; i++){
// 			$('.z6num [val="'+arr[i]+'"]',_parent).addClass('am-lott-ball-red');
// 		}
// 	}
// 	// calcZs()
// }
function changeDisplay(){
	//判断type 显示对应图表
	getChart(null,1);
	addSelectNum();
	// calcZs();
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
    $('[class *= "bet-play-"]').on(o,'nav>li',changeTab);
    //选号
    $(".red_ball").on(o, selectBall);
    $(".blue_ball").on(o, selectblueBall);
    //排序
    $('#hc-bet-play').on(o,'[data-sort]',tableSort);
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
		playId : HCCP.k3.playId,
		dantuo : HCCP.k3.dantuo
	}
	HCCP.dataS.local.set("basicTb", JSON.stringify(HCCP.k3.basic));
	HCCP.dataS.local.set("basic", JSON.stringify(HCCP.k3.basic_));
}
function getChart(flag,isTab,sort){
	var lotyId = +HCCP.k3.lotyId;
	var playId = HCCP.k3.playId;
	var type = HCCP.k3.type;
	var limit = HCCP.k3.defaultSet.limit
	var tpObj = {
		1:'1',
		2:'2',
		3:'1',
		4:'2',
	}
	var tp = tpObj[type];
	//tab切换
	var wrap = $('.bet-play-1');
	var tab = $('nav>li',wrap);
	tab.removeClass('active').eq(type).addClass('active');
	var wrapLi = $('.chart-main>li',wrap);
	var tb = wrapLi.eq(type);
	wrapLi.hide();
	tb.show();
	//取遗漏
	var dataObj = HCCP.k3.data;
	var key = type;
	
	if(!flag && dataObj[key] && dataObj[key]['oLimit'] == limit){
		init_chart(dataObj[key],key,0,isTab,sort);
	}else{
		if(type == 0){
			var chart = HCCP.info.latelyissue(10,limit)
		}else if(type == 1 || type == 2){
			var chart = HCCP.info.trendinfo(lotyId,tp,limit)
		}else if(type == 3 || type == 4){
			var chart = HCCP.info.coldhotinfo(lotyId,tp,limit)
		}
		var data;
		if(chart && chart.code == 200) {
			data = chart.data;
		} else {
			data = false;
		}
		init_chart(data,key,1,0,sort);

	}
	// 变换底部样式
	if(type == 0){
		change_0()
	}else{
		change_1()
	}
	if(type == 1 || type == 3){
		$(".blue_select").hide();
		$(".red_select").show();
	}else if(type == 2 || type == 4){
		$(".red_select").hide();
		$(".blue_select").show();
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
		var wrapLi = $('.chart-main>li');

		var tb = wrapLi.eq(type).children('.chart_');
		if(type==0){
			var tb = wrapLi.eq(type);
		}
		if(flag){
			var limit = HCCP.k3.defaultSet.limit
			HCCP.k3.data[key] = data;
			HCCP.k3.data[key]['oLimit'] = limit;
		}
		if(sort || !HCCP.k3.catch[type] || HCCP.k3.catch[type] != JSON.stringify(data)){
			HCCP.k3.catch[type] = JSON.stringify(data);
			var table = '';
			if(type == 0){
				table = getKJ(data);
			}else if(type == 1){
				table = getredballZS(data);
			}else if(type == 2){
				table = getblueballZS(data);
			}else if(type == 3 || type == 4){
				table = getLR(data);
			}
			tb.empty().append(table);
			if(type == 2){

				CreateLine();
			}
			if(type == 1 ||  type == 2 ){
				scrollEvent();
			}
			// 滚动到最后一行
			if(type== 0 || type==1 || type==2 ){
				tb.find('.common tr:last-child')[0].scrollIntoView();
			}
			
			
		}
		// console.log(HCCP.k3.data)
		//判断下是否更新开奖 定时器
		// var isUpdate = 0;
		// if(key == 1){
		// 	var dt = HCCP.k3.data[key]['history'];
		// 	var last = dt[dt.length -1] || {};
		// 	if(!last['kjhm'] || !last['kjhm'].length){
		// 		isUpdate = 1;
		// 	}
		// }else if(key == '2' || key == '3' || key == '7_3'){
		// 	var dt = HCCP.k3.data[key]['coldHot'] || [];
		// 	var last = dt[0];
		// 	if(!last || last['currentOmit'] == -1){
		// 		isUpdate = 1;
		// 	}
		// }else{
		// 	var dt = HCCP.k3.data[key]['omit'];
		// 	var last = [];
		// 	for(var j in dt){
		// 		last.push(j);
		// 	}
		// 	last.sort(function(a,b){return a<b?1:-1;});
		// 	if(!last[0] || dt[last[0]] instanceof Array){
		// 		isUpdate = 1;
		// 	}
		// }
		// if(isUpdate){
		// 	//10秒取一次图表信息
		// 	if(typeof(updated_chart) != "undefined") {
		// 		clearTimeout(updated_chart);
		// 	}
		// 	if(isTab){
		// 		updated_chart = window.setTimeout("getChart(1);", 1000);
		// 	}else{
		// 		updated_chart = window.setTimeout("getChart(1);", 10000);
		// 	}
		// }
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
		var issue,redAry,blueAry,rednum,bluenum,html='';
		$.each(res,function(x,item){
			issue = item.issue.toString().substr(-3) || '';
			if(!item['red'] || !item['red'].length){
				html += '<tr>';
				html += '<td>'+issue+'期</td>';
				html += '<td colspan="4">等待开奖...</td>';
				html += '</tr>';
				return;
			}
			redAry = HCCP.FUNC.filterAry(item.red).sort(function(a,b){return a>b?1:-1;});
			blueAry = HCCP.FUNC.filterAry(item.blue).sort(function(a,b){return a>b?1:-1;});
			rednum = redAry.join(' ');
			bluenum = blueAry.join(' ');
		
			html += '<tr>';
			html += '<td>'+issue+'期</td>';
			html += '<td colspan="2"><span class="award-num-sm" >'+rednum+'</span></td>';
			html += '<td class="bl-td"><span class="award-num-bl">'+ bluenum +'</span></td>';
			html += '</tr>';
		})
		table = '<table class="hc-bg table-fixed-top">';
		table += '<colgroup><col width="25%"/><col width="25%"/><col width="25%"/><col width="25%"/></colgroup>';
		table += '<tbody><tr><td>期号</td><td colspan="3">开奖号码</td></tr></tbody></table>';

		table += '<div class="wrap-common"><table class="common row1_c"><colgroup><col width="25%"/><col width="25%"/><col width="25%"/><col width="25%"/></colgroup>';
		table += '<tbody>'+html+'</tbody>';
		table += '</table></div>';
	}
	
	return table;
}
function getredballZS(data){
	var type =  HCCP.k3.type 
	var table='';
	var getFoot = function (f1,f2,f3,f4){
		var getTd = function (arr){
			var str = '',n;
			for(var i = 0; i<33; i++){
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
			html = '<tfoot class="hc-tj"><tr><td class="col_row hc-grey" colspan="33" rowspan="4">等待开奖后更新</td></tr></tfoot>';
		}
		return html;
	}
	if(data && data.omit && !$.isEmptyObject(data.omit)){
		var res = data.omit;
		var issue,omi,hz,html=lHtml='';
	
		$.each(res,function(x,item){
			issue = x.toString().substr(-3) || '';
			if(item instanceof Array && item.length == 0){
				lHtml += '<tr><td>'+issue+'期</td></tr>';
				html += '<tr><td class="col_row1" colspan="33">等待开奖...</td></tr>';
				return ;
			}
			lHtml += '<tr><td>'+issue+'期</td></tr>';

			html += '<tr>';
			for(var i = 0; i<33; i++){
				var yl = item[i] == undefined ? '--':item[i];
				var i_=""
				if(i<9){
					i_ = "0"+(i+1)
				} else{
					i_ = i+1
				}
				if(yl == 0){
					html += '<td><em class="bwkj">'+ i_ +'</em>'+ '</td>';
				}else{
					html += '<td><em class="ylkj">'+ yl +'</em>'+ '</td>';
				}
			}
			html += '</tr>';
		})

        table += '<dl class="hc-dl table-fixed-center wrap-common">';
        table += '<dt><table class="common row1_c row_bt"><tbody>'+lHtml;
        table += '</tbody><tfoot class="hc-tj"><tr><td>出现次数</td></tr><tr><td>平均遗漏</td></tr><tr><td>最大遗漏</td></tr><tr><td>最大连出</td></tr></tfoot></table></dt>';
		table += '<dd class="scroll_bar scroll_c1"><table class="hc-scroll common row_bt">';
		table += '<tbody>'+html+'</tbody>';
		table += getFoot(data.occurrenceTimes, data.avgOmit, data.maxOmit, data.maxCombo);
		table += '</table>';
		table += '</dd></dl>'
	}
	return table;
}
function getblueballZS(data){
	var type =  HCCP.k3.type 
	var table='';
	var getFoot = function (f1,f2,f3,f4){
		var getTd = function (arr){
			var str = '',n;
			for(var i = 0; i<16; i++){
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
			html = '<tfoot class="hc-tj"><tr><td class="col_row hc-grey" colspan="33" rowspan="4">等待开奖后更新</td></tr></tfoot>';
		}
		return html;
	}
	if(data && data.omit && !$.isEmptyObject(data.omit)){
		var res = data.omit;
		var issue,omi,hz,html=lHtml='';
	
		$.each(res,function(x,item){
			issue = x.toString().substr(-3) || '';
			if(item instanceof Array && item.length == 0){
				lHtml += '<tr><td>'+issue+'期</td></tr>';
				html += '<tr><td class="col_row1" colspan="33">等待开奖...</td></tr>';
				return ;
			}
			lHtml += '<tr><td>'+issue+'期</td></tr>';

			html += '<tr>';
			for(var i = 0; i<16; i++){
				var yl = item[i] == undefined ? '--':item[i];
				var i_=""
				if(i<9){
					i_ = "0"+(i+1)
				} else{
					i_ = i+1
				}
				if(yl == 0){
					html += '<td><em class="swkj swkj_">'+ i_ +'</em>'+ '</td>';
				}else{
					html += '<td><em class="ylkj">'+ yl +'</em>'+ '</td>';
				}
			}
			html += '</tr>';
		})
        
    table += '<dl class="hc-dl table-fixed-center wrap-common">';
    table += '<dt><table class="common row1_c row_bt"><tbody>'+lHtml;
    table += '</tbody><tfoot class="hc-tj"><tr><td>出现次数</td></tr><tr><td>平均遗漏</td></tr><tr><td>最大遗漏</td></tr><tr><td>最大连出</td></tr></tfoot></table></dt>';
		table += '<dd class="myCanvas scroll_bar scroll_c1">';
		table += '<div class="hc-zx canvasHz"></div>';
		table += '<table class="hc-scroll common row_bt">';
		table += '<tbody>'+html+'</tbody>';
		table += getFoot(data.occurrenceTimes, data.avgOmit, data.maxOmit, data.maxCombo);
		table += '</table>';
		table += '</dd></dl>'
	}
	return table;
}
function getLR(data){
	var type =  HCCP.k3.type 
	var table='';
	if(data && data.length){
		var res = data;
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
		if(type == 3){
			var i_ = 33 
			var ball_type = "bwkj"
		}else if(type == 4){
			var i_ = 16
			var ball_type = "swkj"
		}
		for(var i=0;i<i_;i++){
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
			html += '<td><span class="'+ball_type+'">'+num+'</span></td>';
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
        HCCP.FUNC.alert("网络	繁忙，请稍候再试");
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
	var type = HCCP.k3.type
	if(type == 1){
		var wrap_= $('.bwnum') 
		var bet = $('.red_select')
	}else if(type == 2){
		var wrap_= $('.swnum') 
		var bet = $('.blue_select')
	}
	wrap_.find('.scroll_c1').off('scroll').scroll(function(){
		var scrollLeft = this.scrollLeft;
		wrap_.find('.scroll_t1').scrollLeft(scrollLeft);
		$('.scroll_b1').scrollLeft(scrollLeft);
	})
	wrap_.find('.scroll_t1').off('scroll').scroll(function(){
		var scrollLeft = this.scrollLeft;
		wrap_.find('.scroll_c1').scrollLeft(scrollLeft);
		bet.find('.scroll_b1').scrollLeft(scrollLeft);
	})
	bet.find('.scroll_b1').off('scroll').scroll(function(){
		var scrollLeft = this.scrollLeft;
		wrap_.find('.scroll_c1').scrollLeft(scrollLeft);
		wrap_.find('.scroll_t1').scrollLeft(scrollLeft);
	})
}

//選擇红球
function selectBall() {
	$(this).toggleClass("am-lott-ball-red");
	addSelectNum()
	// calcZs();
}
function selectblueBall() {
	$(this).toggleClass("am-lott-ball-blue");
	addSelectNum()
	// calcZs();
}
function addSelectNum(){
	var playId = HCCP.k3.playId;
	HCCP.k3.betObj[playId] = new Object()

	var obj = new Object();
	var html = "";
	obj[playId] = new Object();
	obj[playId]['redball'] = new Array();
	obj[playId]['blueball'] = new Array();

	
	var selectEle = $('.red_ball.am-lott-ball-red');
	selectEle.each(function(){
		obj[playId]['redball'].push($(this).text());
	})
	obj[playId]['redball'] = obj[playId]['redball'].sort(function(a,b){return a-b})
	$.each(obj[playId]['redball'],function(x,item){
		html += " <span class='have_select_red'>" +  item + "</span>&nbsp"
	})
	var selectEle = $('.blue_ball.am-lott-ball-blue');
	selectEle.each(function(){
		obj[playId]['blueball'].push($(this).text());
	})
	obj[playId]['blueball'] = obj[playId]['blueball'].sort(function(a,b){return a-b})
	$.each(obj[playId]['blueball'],function(x,item){
		html += " <span class='have_select_blue'>" +  item + "</span>&nbsp"
	})
	HCCP.k3.betObj[playId] = null;
	HCCP.k3.betObj[playId] = obj;
		
	$(".select_numb_ dd").empty().append(html)
}
function rand1() {
	var playId = HCCP.k3.playId;
    var arr =HCCP.ssq.randOne()
    $(".am-lott-ball-red").removeClass("am-lott-ball-red");
    $(".am-lott-ball-blue").removeClass("am-lott-ball-blue");
    var a = arr[0].sort(function(a,b){return a-b})
    var b = arr[1].sort(function(a,b){return a-b})
    $.each(a, function(x, ball) {
    	ball = ball - 1
		$(".red_select table tr td").eq(ball).find("div").addClass('am-lott-ball-red')
		
	});
	 $.each(b, function(x, ball) {
	 	ball = ball - 1
		$(".blue_select table tr td").eq(ball).find("div").addClass('am-lott-ball-blue')
		
	});
    addSelectNum();
	// calcZs();

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
function setBetContent() {
	addSelectNum()
	////////////////////////////////
	var betObj = HCCP.k3.betObj,
		playId = HCCP.k3.playId;
	var obj = betObj[playId] || {};


	var newAry = new Array();
	for(var key in obj){
		var arr = new Object();
		arr.playId = key;
		
		var tmpStr1 = obj[key]['redball']
		var tmpStr2 = obj[key]['blueball']
		
		arr.redball = tmpStr1
		arr.blueball = tmpStr2
		arr.redballdan = []
		// 这些可以先不传
		// arr.isDan = 0;
		// arr.zs = 0;  //0000
		// arr.money = 0;
		newAry.push(arr);
	}


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
	return true;
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
	var redcount = $(".am-lott-ball-red").length;
	var bluecount = $(".am-lott-ball-blue").length;

	if(!redcount && !bluecount){
		rand1();	
		return;
	}
	// 有选号不满条件
	var zs  = HCCP.ssq.count(0, redcount, 0, bluecount);
	if(zs < 1){
		HCCP.FUNC.alert("请至少选择6个红球，1个蓝球");
		return;
	}
	//如果有一注了，那么就设置一下betContent，准备去投注确认页了
	if(setBetContent()){
		HCCP.dataS.local.del('basicTb');
		HCCP.FUNC.go(URL_DIGITAL_CONFIRM, true);
	}else{
		return;
	}
	
}

//显示设置
function changeSetting(){
	var type = HCCP.k3.type;
	var setIcon = $('.header-right');
	var wrap = $('.set-wrap');
	var ylEle = $('.set-yl',wrap),
		zxEle = $('.set-zx',wrap),
		tjEle = $('.set-tj',wrap);
	setIcon.show()
	if(type == 1 || type == 2){
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
	if(type == 3 || type == 4){
		setIcon.hide()
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
	var c = '#3d93ec';
	var ele = $('.swkj_');
	var tmpele = $('.bet-play-1 .chart-main .swnum')
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
function change_0(){
	$("footer .footer_right").hide()
 	$("footer .fm_p2").css({
		marginTop: '0'
	});
	$("footer .footer_message").css({
		paddingRight: '0.10rem',
		paddingTop:"0.15rem",
		textAlign:"center"
	});
	$(".table-fixed-bottom").hide()
	$(".bet-play-1").css("paddingBottom",0)
}
function change_1(){
	$("footer .footer_right").show()
	$("footer .fm_p2").css({
		marginTop: '0.11rem'
	})
 
	$("footer .footer_message").css({
		padding:" 0.06rem 0.7rem 0rem 0.1rem",
		textAlign:"left"
	});
	$(".bet-play-1").css("paddingBottom","0.80rem")
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








