$(document).ready(function() {
	HCCP.x5 = new Object();
	HCCP.x5.playIdObj = {
		1: "前一",
		2: "任选二",
		3: "任选三",
		4: "任选四",
		5: "任选五",
		6: "任选六",
		7: "任选七",
		8: "任选八",
		9: "前二组选",
		10: "前三组选",
		11: "前二直选",
		12: "前三直选",
		13: '乐选三',
		14: '乐选四',
		15: "乐选五",
		16: "乐选二"
	};
	HCCP.x5.selectTips = [
		"",
		"",
		"请至少选择2个号码",
		"请至少选择3个号码",
		"请至少选择4个号码",
		"请至少选择5个号码",
		"请至少选择6个号码",
		"请至少选择7个号码",
		"请至少选择8个号码",
		"请至少选择2个号码",
		"请至少选择3个号码",
		"每位至少选择1个不同号码",
		"每位至少选择1个不同号码",
	];
	HCCP.x5.prizeMoney = {
		1: '13',
		2: '6',
		3: '19',
		4: '78',
		5: '540',
		6: '90',
		7: '26',
		8: '9',
		9: '65',
		10: '195',
		11: '130',
		12: '1170',
		13: '19-1384',
		14: '19-154',
		15: '90-1080',
		16: "6-201"
	};
	HCCP.x5.betObj = new Object();
	HCCP.x5.data = new Object();
	HCCP.x5.catch = new Object();
	HCCP.x5.defaultSet = {
		limit: 30,
		yl: 0,
		zx: 0,
		tj: 0
	}
	HCCP.x5.defaultSort = {
		'1': {
			active: 4,
			direction: 0
		},
		'2': {
			active: 4,
			direction: 0
		},
		'3': {
			active: 4,
			direction: 0
		},
		'4': {
			active: 4,
			direction: 0
		},
		'5': {
			active: 4,
			direction: 0
		},
		'6': {
			active: 4,
			direction: 0
		},
		'7': {
			active: 4,
			direction: 0
		},
		'8': {
			active: 4,
			direction: 0
		},
		'9': {
			active: 4,
			direction: 0
		},
		'10': {
			active: 4,
			direction: 0
		},
		"14": {
			active: 4,
			direction: 0
		},
		"15": {
			active: 4,
			direction: 0
		}
	}

	_init();
	//如果是带数据进来的
	if (HCCP.x5.tuo && HCCP.x5.tuo.length) {
		setDefaultData();
	}
	//绑定点击事件
	bindEvent();
	//执行期号
	getInitData();


function _init() {
	var basic, basicTb;
	// 校验basic
	try{
		basic = JSON.parse(HCCP.dataS.local.get("basic"));
		basic.lotyid = [20, 21, 22, 23, 24, 25, 26, 27].indexOf(+basic.lotyid) > -1 ? +basic.lotyid : 20;
		basic.playid = basic.playid >= 1 && basic.playid <= 16 ? +basic.playid : 5;
		basic.dantuo = basic.dantuo == 1 ? 1 : 0;
	}catch(e){
		basic = {
			lotyid: 20,
			playid: 5,
			dantuo: 0
		}
	}
	// 校验basicTb
	try{
		basicTb = JSON.parse(HCCP.dataS.local.get("basicTb"));
	}catch(e){}
	// 如果两个彩种不对应
	if(basicTb && basic.lotyid == basicTb.lotyId && basic.playid == basicTb.playId && basic.dantuo == basicTb.dantuo){
		basicTb.lotyId = basic.lotyid;
		basicTb.playId = basic.playid;
		basicTb.dantuo = basic.dantuo;
		basicTb.type = basicTb.type >= 0 ? basicTb.type : 0;
		basicTb.tuo = basicTb.tuo || '';
		basicTb.dan = basicTb.dan || '';
	}else{
		basicTb = {
			lotyId: basic.lotyid,
			playId: basic.playid,
			dantuo: basic.dantuo,
			type: 0,
			tuo: '',
			dan: ''
		}
	}
	HCCP.x5.lotyId = basicTb.lotyId;
	HCCP.x5.playId = basicTb.playId;
	HCCP.x5.dantuo = basicTb.dantuo;
	HCCP.x5.type = basicTb.type;
	HCCP.x5.tuo = basicTb.tuo;
	HCCP.x5.dan = basicTb.dan;
	// 重新覆盖设置合理数据
	// HCCP.dataS.local.set("basicTb", JSON.stringify(basicTb));
	setBasic()


	// 显示乐选投注
 	var happyLoty = [20, 21, 23, 24, 25, 26, 27];
 	if(happyLoty.indexOf(HCCP.x5.lotyId) > -1){
 		// 以下彩种无乐选二
 		if([20, 23, 26].indexOf(HCCP.x5.lotyId) > -1){
 			$("[data-pid=16]").parent("li").remove();
 		}
 		$('.happyselect,.am-nav-happySelect').show();
 	}else{
 		$('.happyselect,.am-nav-happySelect').remove();
 	}



	//  type==0近期开奖&&前二直选11、前三直选12、乐选二16、乐选三13    无选号--确定按钮
	if(HCCP.x5.dantuo == 1 || (HCCP.x5.type == 0 && [11, 12, 13, 16].indexOf(+HCCP.x5.playId) > -1)){
		$('#allFoot').hide();  // 确定隐藏
		$('#jqkjFoot').show(); // 显示期号倒计时
	} else {
		$('#allFoot').show();
		$('#jqkjFoot').hide();
	}
	// 修改奖金
	$('.award-money').text(HCCP.x5.prizeMoney[HCCP.x5.playId])

	// 默认选号数据 及 投注数据
 	try{
 		var default_betcontent = JSON.parse(HCCP.dataS.local.get("default_betcontent"));
 		// 如果有当前彩种的信息 那么就存下
 		if(default_betcontent[HCCP.x5.lotyId] && default_betcontent[HCCP.x5.lotyId].playid == HCCP.x5.playId){
 			HCCP.x5.default_betcontent = default_betcontent[HCCP.x5.lotyId]
 		}else{
 			HCCP.x5.default_betcontent = null;
 			HCCP.dataS.local.del("default_betcontent");
 		}
 	}catch(e){
 		HCCP.x5.default_betcontent = null;
 		HCCP.dataS.local.del("default_betcontent");
 	}
 	try{
 		var confirm_betcontent = JSON.parse(HCCP.dataS.local.get("confirm_betcontent"));
 		// 如果有当前彩种的信息 那么就存下
 		if({}.toString.call(confirm_betcontent[HCCP.x5.lotyId]) === '[object Array]'){
 			HCCP.x5.confirm_betcontent = confirm_betcontent[HCCP.x5.lotyId]
 		}else{
 			HCCP.x5.confirm_betcontent = null;
 			HCCP.dataS.local.del("confirm_betcontent");
 		}
 	}catch(e){
 		HCCP.x5.confirm_betcontent = null;
 		HCCP.dataS.local.del("confirm_betcontent");
 	}

	$('body').show();
}
//绑定点击事件
function bindEvent() {
	var o = 'click';
	$(".header-left .back").on(o, goBack);
	//切换玩法
	$(".header-title").on(o, ".header-drop", showPlay);
	$(".hc-nav").on(o, "[data-pid]", selectPlay);
	$('[class *= "bet-play-"]').on(o, 'nav>li', changeTab);
	//    //排序
	$('#hc-bet-play').on(o, '[data-sort]', tableSort);
	//    //选号
	//    
	$('.hc-scroll li').on('click', selectBall)
		// $(".chart-main").on('click','.hc-scroll>li', selectBall);
		//    //提交
	$(".submit").on(o, doConfirm);
	// //设置
	$('.chartSetting').on(o, showSetting);
	$('.set-cancel').on(o, cancelSetting);
	$('.set-sure').on(o, sureSetting);
	$('.set-con').on(o, 'li', setToggle);
	// $(window).resize(CreateLine);
}
//带数据进来
function setDefaultData() {
	var arr = HCCP.x5.tuo;
	var array = arr.trim().split('|');
	var playId = HCCP.x5.playId;
	if (playId == 13) {
		playId = 12;
	} else if (playId == 14) {
		playId = 4;
	} else if (playId == 15) {
		playId = 5;
	} else if (playId == 16) {
		playId = 11;
	}
	var array1 = array[0].trim().split(' ');
	if (playId == 11) {
		var array2 = array[1].trim().split(' ');
	}
	if (playId == 12) {
		var array2 = array[1].trim().split(' ');
		var array3 = array[2].trim().split(' ');
	}
	if (playId == 11 || playId == 12) {
		if (playId == 11) {
			var _parent1 = $('.bet-play-11 .chart-main li:nth-child(2)');
			var _parent2 = $('.bet-play-11 .chart-main li:nth-child(3)');
			for (var i = 0; i <= array1.length - 1; i++) {
				$('[x5val1="' + array1[i] + '"]', _parent1).addClass('active');
			}
			for (var i = 0; i <= array2.length - 1; i++) {
				$('[x5val1="' + array2[i] + '"]', _parent2).addClass('active');
			}
		} else if (playId == 12) {
			var _parent1 = $('.bet-play-12 .chart-main li:nth-child(2)');
			var _parent2 = $('.bet-play-12 .chart-main li:nth-child(3)');
			var _parent3 = $('.bet-play-12 .chart-main li:nth-child(4)');
			for (var i = 0; i <= array1.length - 1; i++) {
				$('[x5val1="' + array1[i] + '"]', _parent1).addClass('active');
			}
			for (var i = 0; i <= array2.length - 1; i++) {
				$('[x5val1="' + array2[i] + '"]', _parent2).addClass('active');
			}
			for (var i = 0; i <= array3.length - 1; i++) {
				$('[x5val1="' + array3[i] + '"]', _parent3).addClass('active');
			}
		}
	} else if (playId == 1) {
		var _parent1 = $('.bet-play-1');
		for (var i = 0; i <= array1.length - 1; i++) {
			$('[x5val1="' + array1[i] + '"]', _parent1).addClass('active');
		}
	} else {
		var _parent = $('.bet-play-' + playId);
		for (var i = 0, len = array1.length; i < len; i++) {
			$('[x5val1="' + array1[i] + '"]', _parent).addClass('active');
		}
	}
	addSelectNum()
	calcZs()
}

//显示设置
function changeSetting() {
	var playId = HCCP.x5.playId,
		type = HCCP.x5.type;
	if (playId == 13) {
		playId = 12;
	} else if (playId == 14) {
		playId = 4;
	} else if (playId == 15) {
		playId = 5;
	} else if (playId == 16) {
		playId = 11;
	}
	var setIcon = $('.header-right');
	var wrap = $('.set-wrap');
	var ylEle = $('.set-yl', wrap),
		zxEle = $('.set-zx', wrap),
		tjEle = $('.set-tj', wrap);
	if (playId >= 1 && playId <= 10 && type == 2) {
		setIcon.hide();
	} else {
		setIcon.show();
	}
	if (playId == 1) {
		if (type == 1) {
			zxEle.show();
		} else {
			zxEle.hide();
		}
	} else if (playId == 11) {
		if (type == 1 || type == 2) {
			zxEle.show();
		} else {
			zxEle.hide();
		}
	} else if (playId == 12) {
		if (type == 1 || type == 2 || type == 3) {
			zxEle.show();
		} else {
			zxEle.hide();
		}
	} else {
		zxEle.hide();
	}
	if (type == 0) {
		ylEle.hide();
		tjEle.hide();
	} else {
		ylEle.show();
		tjEle.show();
	}
}
//setting
function showSetting() {
	var playId = HCCP.x5.playId;
	var type = HCCP.x5.type;
	var wrap = $('.set-wrap');
	var obj = HCCP.x5.defaultSet;
	var qs = obj['limit'] ? obj['limit'] : 30;
	var yl = obj['yl'] == 1 ? 1 : 0;
	var zx = obj['zx'] == 1 ? 1 : 0;
	var tj = obj['tj'] == 1 ? 1 : 0;
	var qsEle = $('.set-qs', wrap),
		ylEle = $('.set-yl', wrap),
		zxEle = $('.set-zx', wrap),
		tjEle = $('.set-tj', wrap);
	qsEle.find('li').filter('[data-numissue=' + qs + ']').addClass('active').siblings().removeClass('active');
	ylEle.find('li').eq(yl).addClass('active').siblings().removeClass('active');
	zxEle.find('li').eq(zx).addClass('active').siblings().removeClass('active');
	tjEle.find('li').eq(tj).addClass('active').siblings().removeClass('active');
	wrap.show();
}

function cancelSetting() {
	var wrap = $('.set-wrap');
	wrap.hide();
	$('.active', wrap).removeClass('active');
}

function sureSetting() {
	var wrap = $('.set-wrap');
	var qs = $('.set-qs li.active', wrap).attr('data-numissue') || 30;
	var yl = $('.set-yl li.active', wrap).index() == 1 ? 1 : 0;
	var zx = $('.set-zx li.active', wrap).index() == 1 ? 1 : 0;
	var tj = $('.set-tj li.active', wrap).index() == 1 ? 1 : 0;
	HCCP.x5.defaultSet = {
		limit: qs,
		yl: yl,
		zx: zx,
		tj: tj
	};
	(function() {
		var betEle = $('#hc-bet-play');
		var setObj = HCCP.x5.defaultSet;
		var qs = setObj.limit,
			yl = setObj.yl,
			zx = setObj.zx,
			tj = setObj.tj;

		if (yl == 0) {
			betEle.attr('data-yl', '0');
		} else {
			betEle.attr('data-yl', '1');
		}

		if (zx == 0) {
			betEle.attr('data-zx', '0');
		} else {
			betEle.attr('data-zx', '1');
		}

		if (tj == 0) {
			betEle.attr('data-tj', '0');
		} else {
			betEle.attr('data-tj', '1');
		}
	})();
	getChart()
	cancelSetting();
}

function setToggle() {
	var that = $(this);
	that.addClass('active').siblings().removeClass('active');
}

function changeTab() {
	var that = $(this),
		index = that.index();
	if (that.hasClass('active')) {
		return;
	}
	HCCP.x5.type = index;
	try {
		var basicTb = JSON.parse(HCCP.dataS.local.get("basicTb"));
	} catch (e) {}
	var playId = +basicTb['playId'];
	var lotyid = +basicTb['lotyId']
	if (playId == 13) {
		playId = 12;
	} else if (playId == 14) {
		playId = 4;
	} else if (playId == 15) {
		playId = 5;
	} else if (playId == 16) {
		playId = 11;
	}

	//  type==0近期开奖&&前二直选11、前三直选12、乐选二16、乐选三13    无选号--确定按钮
	if(HCCP.x5.dantuo == 1 || (HCCP.x5.type == 0 && [11, 12, 13, 16].indexOf(+HCCP.x5.playId) >= 0)){
		$('#allFoot').hide();  // 确定隐藏
		$('#jqkjFoot').show(); // 显示期号倒计时
		$('.wrap-common').addClass('padd-bottom')
		$('.bet-play-' + playId).toggleClass('is-dantuo', 1 == HCCP.x5.dantuo)
	} else {
		$('#allFoot').show();
		$('#jqkjFoot').hide();
		$('.wrap-common').removeClass('padd-bottom')
	}


	// setBasic();
	getChart(null, 1);
	changeSetting();
}

function setBasic() {
	HCCP.x5.basic = {
		lotyId: HCCP.x5.lotyId,
		playId: HCCP.x5.playId,
		type: HCCP.x5.type,
		dantuo: HCCP.x5.dantuo,
		tuo: HCCP.x5.tuo,
		dan: HCCP.x5.dan
	}
	HCCP.dataS.local.set("basicTb", JSON.stringify(HCCP.x5.basic));
}
//购买
function selectBall() {
	var that = $(this);
	var val = that.attr("x5val");
	if (that.hasClass('active')) {
		that.removeClass('active');
		//删除数据
	} else {
		that.parents('.chart-main').find('[x5val="' + val + '"]').removeClass('active');
		that.addClass('active')
	}
	addSelectNum();
	calcZs();
}
//提交过去
function doConfirm() {
	var tips = HCCP.x5.tips,
		playId = HCCP.x5.playId,
		selectTips = HCCP.x5.selectTips;
	if ($(this).hasClass('btn-wrap')) {
		return;
	}
	// 无选号随机一注
	if (!tips || !tips.hasSelect) {
		// 胆拖不随机	
		rand1();
		return;
	}
	//有选号不满条件
	if (tips.hasTips) {
		HCCP.FUNC.alert(selectTips[tips.showTips]);
		return;
	}
	//如果有一注了，那么就设置一下betContent，准备去投注确认页了
	var thisSelectData = getSelectData();
	var limit = limitNum(thisSelectData, HCCP.x5.limitObj);
	if (!$.isEmptyObject(limit)) {
		var limitObj = HCCP.x5.limitObj ? HCCP.x5.limitObj : {};
		for (var key in limitObj) {
			var playAry = limitObj[HCCP.x5.playId] || [];
			var _html = "";
			if (HCCP.x5.playId == 12 || HCCP.x5.playId == 11) {
				for (var i = 0; i <= playAry.length - 1; i++) {
					_html += "【" + HCCP.getPlayName(HCCP.x5.lotyId, HCCP.x5.playId) + "】&nbsp;" + playAry[i].replace(/_/g, " | ") + "&nbsp;&nbsp;组合<br/>"
				}
			} else {
				for (var i = 0; i <= playAry.length - 1; i++) {
					_html += "【" + HCCP.getPlayName(HCCP.x5.lotyId, HCCP.x5.playId) + "】&nbsp;" + playAry[i].replace(/_/g, " ") + "&nbsp;&nbsp;组合<br/>"
				}
			}

			var limitNumStr = playAry.join('&nbsp;&nbsp;&nbsp;&nbsp;');
			limitNumStr = limitNumStr.replace(/_/g, " ");
			HCCP.modal.alert({
				title: '官方限号',
				msg: '以下玩法及投注号码暂不接受投注<br/>' + _html,
				alertBtn: '返回修改'
			})
			break;
		}
		return false;
	}

	var max = getMaxBonus(thisSelectData[0]);
	if ($('.p_total .money').text() > max) {
		HCCP.modal.confirm({
			'msg': '您当前的投注金额大于理论最高奖金，会造成方案亏损，您确认要继续投注吗？',
			confirmCallback: function() {
				setBetContent(thisSelectData);
				HCCP.dataS.local.del('basicTb');
				HCCP.FUNC.go(URL_KUAIPING_CONFIRM, true);
			}
		})
	} else {
		setBetContent(thisSelectData);
		HCCP.dataS.local.del('basicTb');
		HCCP.FUNC.go(URL_KUAIPING_CONFIRM, true);
	}
}

function limitNum(item, obj) {
	var resultNum = [];
	var limitObj = obj ? obj : {};
	var arr = item instanceof Object ? [item] : (item instanceof Array ? item : []);
	if (arr && arr.length) {
		//对限号数据做处理
		for (var key in limitObj) {
			if (key >= 1 && key <= 10) {
				limitObj[key] = $.map(limitObj[key], function(a) {
					return a.split(',').sort(function(a, b) {
						return a > b ? 1 : -1
					}).join('_')
				});
			} else if (key == 11 || key == 12) {
				limitObj[key] = $.map(limitObj[key], function(a) {
					return a.split('|').join('_')
				});
			}
		}
		//对单行数据做拆分
		var o = {};
		$.each(arr, function(x, y) {
			pid = +y[0].playid || +y[0].playId;
			switch (pid) {
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
				case 9:
				case 10:
					var n = pid <= 8 ? pid : (pid == 9 ? 2 : 3);
					o[pid] = (function(a) {
						var dan = a.dan;
						dan = dan == undefined ? [] : dan.split(' ');
						var tuo = a.tuo;
						tuo = tuo == undefined ? [] : tuo.split(' ');
						var r = FUNC.getCombin(tuo, n - dan.length);
						if (dan.length) return $.map(r, function(b) {
							return [dan.concat(b)]
						});
						else return r;
					})(y[0]);
					o[pid] = $.map(o[pid], function(a) {
						return a.sort(function(a, b) {
							return a > b ? 1 : -1
						}).join('_');
					})
					break;
				case 11:
				case 12:
					var n = pid == 11 ? 2 : 3;
					o[pid] = (function(a) {
						var tuo = a.tuo;
						tuo = tuo == undefined ? [] : tuo.split('|');
						tuo = $.map(tuo, function(b) {
							return b == undefined ? [
								[]
							] : [b.trim().split(' ')]
						});
						var r = [];
						for (var i = 0, l = tuo[0].length; i < l; i++) {
							var w = tuo[0][i];
							for (var j = 0, le = tuo[1].length; j < le; j++) {
								var q = tuo[1][j];
								if (n == 2) {
									r.push(w.concat('_', q));
									continue;
								}
								for (var k = 0, len = tuo[2].length; k < len; k++) {
									var b = tuo[2][k];
									r.push(w.concat('_', q, '_', b));
								}
							}
						}
						return r;
					})(y[0]);
					break;
				default:
					break;

			};
		});
		//检测是否存在限号 有限号的话 限号号码加入resultNum
		for (var k in o) {
			var lim = limitObj[k] == undefined ? [] : limitObj[k];
			$.each(o[k], function(x, y) {
				if (lim.indexOf(y) != -1) {
					resultNum = resultNum.concat(y.split('_'));
				}
			})
		}
	}
	return resultNum;
}

function getMaxBonus(item) {
	var max = 0;
	var oneCounts = {
		'1': {
			'count': 1,
			'bonus': [13]
		},
		'2': {
			'count': 2,
			'bonus': [6]
		},
		'3': {
			'count': 3,
			'bonus': [19]
		},
		'4': {
			'count': 4,
			'bonus': [78]
		},
		'5': {
			'count': 5,
			'bonus': [540]
		},
		'6': {
			'count': 6,
			'bonus': [90]
		},
		'7': {
			'count': 7,
			'bonus': [26]
		},
		'8': {
			'count': 8,
			'bonus': [9]
		},
		'9': {
			'count': 2,
			'bonus': [65]
		},
		'10': {
			'count': 3,
			'bonus': [195]
		},
		'11': {
			'count': 2,
			'bonus': [130]
		},
		'12': {
			'count': 3,
			'bonus': [1170]
		},
		'13': {
			'count': 3,
			'bonus': [1384, 214, 19]
		},
		'14': {
			'count': 4,
			'bonus': [154, 19]
		},
		'15': {
			'count': 5,
			'bonus': [1080, 90]
		},
		"16": {
			'count': 2,
			'bonus': [201, 71, 6]
		}
	}
	var playId = item.playId || item.playid;
	var dantuo = item.dan ? 1 : 0;
	var danStr = item.dan || '';
	var tuoStr = item.tuo || '';
	var dan = dantuo ? danStr.split(' ') : [];
	var tuo = tuoStr.indexOf('|') > -1 ? tuoStr.split(' | ') : tuoStr.split(' ');
	var danLen = dan.length;
	var tuoLen = tuo.length;
	var totalLen = danLen + tuoLen;
	var oneCount = oneCounts[playId] || {};
	var count = oneCount.count || 0;
	var bonus = oneCount.bonus || [];
	var zs = 0;
	// var bonusLen = bonus.length;
	if (playId == 1) {
		max = tuoLen ? 1 * bonus[0] : 0;
	} else if (playId >= 2 && playId <= 8) {
		var max_active = Math.min(totalLen, 5);
		if (playId > 5) {
			if (totalLen - count >= 0) {
				if (danLen >= 5) {
					max = FUNC.zh(totalLen - danLen, count - danLen) * bonus[0];
				} else {
					max = FUNC.zh(totalLen - 5, count - 5) * bonus[0];
				}
			} else {
				max = 0;
			}
		} else {
			if (totalLen - count >= 0) {
				max = FUNC.zh(max_active - danLen, count - danLen) * bonus[0];
			} else {
				max = 0;
			}
		}
	} else if (playId == 9 || playId == 10) {
		max = totalLen >= count ? 1 * bonus[0] : 0;
	} else if (playId == 11 || playId == 12) {
		if (tuoLen == count) {
			totalLen = 0;
			zs = 1;
			tuo.map(function(y) {
				var len = y ? y.split(' ').length : 0;
				zs *= len;
				totalLen += len;
			});
			if (zs) {
				max = 1 * bonus[0];
			} else {
				max = 0;
			}
		} else {
			max = 0;
		}
	} else if (playId == 13) {
		if (tuoLen == count) {
			totalLen = 0;
			zs = 1;
			tuo.map(function(y) {
				var len = y ? y.split(' ').length : 0;
				zs *= len;
				totalLen += len;
			});
			if (zs) {
				max = 1 * bonus[0] + 1 * bonus[1] + (totalLen == 3 ? 1 * bonus[2] : (totalLen == 4 ? 2 * bonus[2] : 4 * bonus[2]));
			} else {
				max = 0;
			}
		} else {
			max = 0;
		}
	} else if (playId == 14 || playId == 15) {
		var max_active = Math.min(tuoLen, 5);
		if (tuoLen >= count) {
			max = FUNC.zh(max_active, count) * bonus[0] + (FUNC.zh(max_active, count) + FUNC.zh(max_active, count - 1) * (tuoLen > max_active ? tuoLen - max_active : 1)) * bonus[1];
		} else {
			max = 0;
		}
	} else if (playId == 16) {
		if (tuoLen == count) {
			totalLen = 0;
			zs = 1;
			tuo.map(function(y) {
				var len = y ? y.split(' ').length : 0;
				zs *= len;
				totalLen += len;
			});
			if (zs) {
				max = 1 * bonus[0] + 1 * bonus[1] + (totalLen == 2 ? 1 * bonus[2] : (totalLen == 3 ? 2 * bonus[2] : 3 * bonus[2]));
			} else {
				max = 0;
			}
		} else {
			max = 0;
		}
	}
	return max;
}

function getSelectData() {
	var betObj = HCCP.x5.betObj,
		playid = HCCP.x5.playId;
	var obj = betObj[playid] || {};
	var newAry = new Array();
	// dan  tuo zs money
	for (var key in obj) {
		var arr = new Object();
		arr.playid = key;
		if (arr.playid == 11 || arr.playid == 12 || arr.playid == 13 || arr.playid == 16) {
			if (arr.playid == 11 || arr.playid == 16) {
				var tuo = obj[key]['tuo'][0].join(' ') + " | " + obj[key]['tuo'][1].join(' ') || '';
			} else {
				var tuo = obj[key]['tuo'][0].join(' ') + " | " + obj[key]['tuo'][1].join(' ') + " | " + obj[key]['tuo'][2].join(' ') || '';
			}
		} else {
			var tuo = obj[key]['tuo'] ? obj[key]['tuo'].join(' ') : '';
		}
		arr.tuo = tuo;
		arr.isDan = 0;
		arr.zs = obj[key]['zs'] ? obj[key]['zs'] : 0;
		arr.money = obj[key]['money'] ? obj[key]['money'] : 0;
		newAry.push(arr);
	}
	return newAry;
}

function setBetContent(newAry) {
	var confirm_betcontent = HCCP.x5.confirm_betcontent || [];
	// 如果有默认数据那么就替换	
	if(HCCP.x5.default_betcontent && confirm_betcontent[HCCP.x5.default_betcontent.confirm_id]){
		confirm_betcontent[HCCP.x5.default_betcontent.confirm_id] = newAry[0];
	}else{
		confirm_betcontent.push(newAry[0]);
	}
	HCCP.dataS.local.del("default_betcontent");
	var cbet = {};
	cbet[HCCP.x5.lotyId] = confirm_betcontent;
	HCCP.dataS.local.set("confirm_betcontent", JSON.stringify(cbet));
}
//随机一注
function rand1() {
	var playId = HCCP.x5.playId;
	var playidAre
	if (playId == 13) {
		playidAre = 12
	} else if (playId == 14) {
		playidAre = 4
	} else if (playId == 15) {
		playidAre = 5
	} else if (playId == 16) {
		playidAre = 11
	} else {
		playidAre = playId
	}
	var _parent = $(".bet-play-" + playidAre);
	if ((playId >= 2 && playId <= 8) || playId == 1 || playId == 14 || playId == 15) {
		var num
		if (playId == 14) {
			num = 4
		} else if (playId == 15) {
			num = 5
		} else {
			num = playId
		}
		var arr = HCCP.MATH.random(1, 11, num)
		for (var i = 0; i <= arr.length - 1; i++) {
			$('[x5val]', _parent).filter('[x5val="' + arr[i] + '"]').addClass('active');
		}
	} else if (playId == 9) {
		var arr = HCCP.MATH.random(1, 11, 2)
		for (var i = 0; i <= arr.length - 1; i++) {
			$('[x5val]', _parent).filter('[x5val="' + arr[i] + '"]').addClass('active');
		}
	} else if (playId == 10) {
		var arr = HCCP.MATH.random(1, 11, 3)
		for (var i = 0; i <= arr.length - 1; i++) {
			$('[x5val]', _parent).filter('[x5val="' + arr[i] + '"]').addClass('active');
		}
	} else if (playId == 11 || playId == 16) {
		var arr = HCCP.MATH.random(1, 11, 2)
		$('.bet-play-11 .chart-main li:nth-child(2) .hc-scroll li').filter('[x5val="' + arr[0] + '"]').addClass('active')
		$('.bet-play-11 .chart-main li:nth-child(3) .hc-scroll li').filter('[x5val="' + arr[1] + '"]').addClass('active')
	} else if (playId == 12 || playId == 13) {
		var arr = HCCP.MATH.random(1, 11, 3)
		$('.bet-play-12 .chart-main li:nth-child(2) .hc-scroll li').filter('[x5val="' + arr[0] + '"]').addClass('active')
		$('.bet-play-12 .chart-main li:nth-child(3) .hc-scroll li').filter('[x5val="' + arr[1] + '"]').addClass('active')
		$('.bet-play-12 .chart-main li:nth-child(4) .hc-scroll li').filter('[x5val="' + arr[2] + '"]').addClass('active')
	}
	addSelectNum();
	calcZs();
}

function addSelectNum() {
	var playId = HCCP.x5.playId;
	var playidAre;
	if (playId == 13) {
		playidAre = 12
	} else if (playId == 14) {
		playidAre = 4
	} else if (playId == 15) {
		playidAre = 5
	} else if (playId == 16) {
		playidAre = 11
	} else {
		playidAre = playId;
	}
	var _parent = $(".bet-play-" + playidAre);
	var obj = new Object();
	obj[playId] = new Object();
	obj[playId]['tuo'] = new Array();
	if (playId == 11 || playId == 12 || playId == 13 || playId == 16) {
		var tuo1 = [];
		var tuo2 = [];
		var tuo3 = [];
		if (playId == 11 || playId == 16) {
			$(".bet-play-11 .chart-main li:nth-child(2) .hc-scroll li.active").each(function() {
				tuo1.push($(this).text())
			})
			$(".bet-play-11 .chart-main li:nth-child(3) .hc-scroll li.active").each(function() {
				tuo2.push($(this).text())
			})
			obj[playId]['tuo'] = [tuo1, tuo2]
		}
		if (playId == 12 || playId == 13) {
			$(".bet-play-12 .chart-main li:nth-child(2) .hc-scroll li.active").each(function() {
				tuo1.push($(this).text())
			})
			$(".bet-play-12 .chart-main li:nth-child(3) .hc-scroll li.active").each(function() {
				tuo2.push($(this).text())
			})
			$(".bet-play-12 .chart-main li:nth-child(4) .hc-scroll li.active").each(function() {
				tuo3.push($(this).text())
			})
			obj[playId]['tuo'] = [tuo1, tuo2, tuo3]
		}
	} else {
		var selectEle = _parent.find('[x5val].active');
		selectEle.each(function() {
			obj[playId]['tuo'].push($(this).text());
		})
	}
	obj[playId]['zs'] = '';
	var arrTuo = obj[playId]['tuo'];
	if (playId == 1) {
		obj[playId]['zs'] = arrTuo.length;
	} else if (playId == 2 || playId == 9) {
		obj[playId]['zs'] = FUNC.zh(arrTuo.length, 2);
	} else if (playId == 3 || playId == 10) {
		obj[playId]['zs'] = FUNC.zh(arrTuo.length, 3);
	} else if (playId == 4) {
		obj[playId]['zs'] = FUNC.zh(arrTuo.length, 4);
	} else if (playId == 5) {
		obj[playId]['zs'] = FUNC.zh(arrTuo.length, 5);
	} else if (playId == 6) {
		obj[playId]['zs'] = FUNC.zh(arrTuo.length, 6);
	} else if (playId == 7) {
		obj[playId]['zs'] = FUNC.zh(arrTuo.length, 7);
	} else if (playId == 8) {
		obj[playId]['zs'] = FUNC.zh(arrTuo.length, 8);
	} else if (playId == 11 || playId == 16) {
		var activeArr1 = new Array(),
			activeArr2 = new Array(),
			activeArr3 = new Array();
		$(".bet-play-11 .chart-main li:nth-child(2) .hc-scroll li.active").each(function() {
			activeArr1.push($(this).text())
		});
		$(".bet-play-11 .chart-main li:nth-child(3) .hc-scroll li.active").each(function() {
			activeArr2.push($(this).text())
		});
		if (activeArr1.length > 0 && activeArr2.length > 0) {
			obj[playId]['zs'] = (activeArr1.length) * (activeArr2.length)
		} else if (activeArr1.length == 0 && activeArr2.length == 0) {
			obj[playId]['zs'] = 0
		}
		if (playId == 11) {
			if (activeArr1.length > 0 && activeArr2.length > 0) {
				obj[playId]['zs'] = (activeArr1.length) * (activeArr2.length)
			} else {
				obj[playId]['zs'] = 0
			}
		}
		if (playId == 16) {
			if (activeArr1.length > 0 && activeArr2.length > 0) {
				obj[playId]['zs'] = (activeArr1.length) * (activeArr2.length) * 3
			} else {
				obj[playId]['zs'] = 0
			}
		}
	} else if (playId == 12 || playId == 13) {
		var activeArr1 = new Array(),
			activeArr2 = new Array(),
			activeArr3 = new Array();
		$(".bet-play-12 .chart-main li:nth-child(2) .hc-scroll li.active").each(function() {
			activeArr1.push($(this).text())
		});
		$(".bet-play-12 .chart-main li:nth-child(3) .hc-scroll li.active").each(function() {
			activeArr2.push($(this).text())
		});
		$(".bet-play-12 .chart-main li:nth-child(4) .hc-scroll li.active").each(function() {
			activeArr3.push($(this).text())
		});
		if (activeArr1.length > 0 && activeArr2.length > 0 && activeArr3.length > 0) {
			obj[playId]['zs'] = (activeArr1.length) * (activeArr2.length) * (activeArr3.length)
		} else {
			obj[playId]['zs'] = 0
		}
		if (playId == 12) {
			if (activeArr1.length > 0 && activeArr2.length > 0 && activeArr3.length > 0) {
				obj[playId]['zs'] = (activeArr1.length) * (activeArr2.length) * (activeArr3.length)
			} else {
				obj[playId]['zs'] = 0
			}
		}
		if (playId == 13) {
			if (activeArr1.length > 0 && activeArr2.length > 0 && activeArr3.length > 0) {
				obj[playId]['zs'] = (activeArr1.length) * (activeArr2.length) * (activeArr3.length) * 3
			} else {
				obj[playId]['zs'] = 0
			}
		}
	} else if (playId == 14) {
		obj[playId]['zs'] = 5 * FUNC.zh(arrTuo.length, 4);
	} else if (playId == 15) {
		obj[playId]['zs'] = FUNC.zh(arrTuo.length, 5) * 7
	}
	obj[playId]['money'] = obj[playId]['zs'] * 2;
	HCCP.x5.betObj[playId] = null;
	HCCP.x5.betObj[playId] = obj;
}

function calcZs() {
	var playId = +HCCP.x5.playId;
	var selectJson = HCCP.x5.betObj[playId] || {};
	var zs = 0,
		hasSelect = 0;
	var hasTips = 0,
		showTips = 0;
	var obj = selectJson[playId] ? selectJson[playId] : {};
	var arrTuo = FUNC.filterAry(obj['tuo']);
	if (playId == 1) {
		zs = arrTuo.length;
	} else if (playId == 2 || playId == 9) {
		zs = FUNC.zh(arrTuo.length, 2);
	} else if (playId == 3 || playId == 10) {
		zs = FUNC.zh(arrTuo.length, 3);
	} else if (playId == 4) {
		zs = FUNC.zh(arrTuo.length, 4);
	} else if (playId == 5) {
		zs = FUNC.zh(arrTuo.length, 5);
	} else if (playId == 6) {
		zs = FUNC.zh(arrTuo.length, 6);
	} else if (playId == 7) {
		zs = FUNC.zh(arrTuo.length, 7);
	} else if (playId == 8) {
		zs = FUNC.zh(arrTuo.length, 8);
	} else if (playId == 11 || playId == 16) {
		var activeArr1 = new Array(),
			activeArr2 = new Array(),
			activeArr3 = new Array();
		$(".bet-play-11 .chart-main li:nth-child(2) .hc-scroll li.active").each(function() {
			activeArr1.push($(this).text())
		});
		$(".bet-play-11 .chart-main li:nth-child(3) .hc-scroll li.active").each(function() {
			activeArr2.push($(this).text())
		});
		if (playId == 11) {
			if (activeArr1.length > 0 && activeArr2.length > 0) {
				zs = (activeArr1.length) * (activeArr2.length)
			} else {
				zs = 0
			}
		}
		if (playId == 16) {
			if (activeArr1.length > 0 && activeArr2.length > 0) {
				zs = (activeArr1.length) * (activeArr2.length) * 3
			} else {
				zs = 0
			}
		}
	} else if (playId == 12 || playId == 13) {
		var activeArr1 = new Array(),
			activeArr2 = new Array(),
			activeArr3 = new Array();
		$(".bet-play-12 .chart-main li:nth-child(2) .hc-scroll li.active").each(function() {
			activeArr1.push($(this).text())
		});
		$(".bet-play-12 .chart-main li:nth-child(3) .hc-scroll li.active").each(function() {
			activeArr2.push($(this).text())
		});
		$(".bet-play-12 .chart-main li:nth-child(4) .hc-scroll li.active").each(function() {
			activeArr3.push($(this).text())
		});
		if (playId == 12) {
			if (activeArr1.length > 0 && activeArr2.length > 0 && activeArr3.length > 0) {
				zs = (activeArr1.length) * (activeArr2.length) * (activeArr3.length)
			} else {
				zs = 0
			}
		}
		if (playId == 13) {
			if (activeArr1.length > 0 && activeArr2.length > 0 && activeArr3.length > 0) {
				zs = (activeArr1.length) * (activeArr2.length) * (activeArr3.length) * 3
			} else {
				zs = 0
			}
		}
	} else if (playId == 14) {
		zs = 5 * FUNC.zh(arrTuo.length, 4);
	} else if (playId == 15) {
		zs = FUNC.zh(arrTuo.length, 5) * 7
	}
	var Ifshow;
	if ((playId <= 10 && playId >= 1) || playId == 14 || playId == 15) {
		Ifshow = arrTuo.length
	} else if (playId == 11 || playId == 16) {
		if (arrTuo[0].length == 0 && arrTuo[1].length == 0) {
			Ifshow = 0
		} else {
			Ifshow = 1
		}
	} else if (playId == 12 || playId == 13) {
		if (arrTuo[0].length == 0 && arrTuo[1].length == 0 && arrTuo[2].length == 0) {
			Ifshow = 0
		} else {
			Ifshow = 1
		}
	}
	//提示
	if (Ifshow) {
		hasSelect = 1;
		if (playId == 2 && arrTuo.length < 2) {
			hasTips = 1;
			showTips = 2;
		} else if (playId == 3 && arrTuo.length < 3) {
			hasTips = 1;
			showTips = 3;
		} else if (playId == 4 && arrTuo.length < 4) {
			hasTips = 1;
			showTips = 4;
		} else if (playId == 5 && arrTuo.length < 5) {
			hasTips = 1;
			showTips = 5;
		} else if (playId == 6 && arrTuo.length < 6) {
			hasTips = 1;
			showTips = 6;
		} else if (playId == 7 && arrTuo.length < 7) {
			hasTips = 1;
			showTips = 7;
		} else if (playId == 8 && arrTuo.length < 8) {
			hasTips = 1;
			showTips = 8;
		} else if (playId == 9 && arrTuo.length < 2) {
			hasTips = 1;
			showTips = 9;
		} else if (playId == 10 && arrTuo.length < 3) {
			hasTips = 1;
			showTips = 10;
		} else if (playId == 11 || playId == 16) {
			if (arrTuo[0].length == 0 && arrTuo[1].length == 0) {} else if (arrTuo[0].length == 0 && arrTuo[1].length != 0) {
				hasTips = 1;
				showTips = 11;
			} else if (arrTuo[0].length != 0 && arrTuo[1].length == 0) {
				hasTips = 1;
				showTips = 11;
			} else {}
		} else if ((playId == 12 || playId == 13) && (arrTuo[0].length == 0 || arrTuo[1].length == 0 || arrTuo[2].length == 0)) {
			if (arrTuo[0].length == 0 && arrTuo[1].length == 0 && arrTuo[2].length == 0) {} else if (arrTuo[0].length >= 1 && arrTuo[1].length >= 1 && arrTuo[2].length >= 1) {} else {
				hasTips = 1;
				showTips = 12;
			}
		} else if (playId == 14 && arrTuo.length < 4) {
			hasTips = 1;
			showTips = 4;
		} else if (playId == 15 && arrTuo.length < 5) {
			hasTips = 1;
			showTips = 5;
		}
	}
	var tmp = {
		playId: playId,
		tuo: arrTuo,
		zs: zs
	}
	var money = zs * 2;
	var totalEle = $('.p_total');
	$('.zs', totalEle).text(zs);
	$('.money', totalEle).text(money);
	if (hasSelect) {
		totalEle.show();
	} else {
		totalEle.hide();
	}
	HCCP.x5.tips = {
		hasSelect: hasSelect,
		hasTips: hasTips,
		showTips: showTips
	}
}
//设置玩法
function selectPlay() {
	var that = $(this);
	if (that.hasClass('active')) {
		$(".hc-nav").hide();
		return;
	}
	$('.p_total').hide();
	$('.p_total em').text(0)
	$('.hc-scroll li.active').removeClass('active')
	HCCP.x5.tips = {
		hasSelect: 0,
		hasTips: 0,
		showTips: 0
	}

	HCCP.x5.playId = $(this).data('pid');
 	HCCP.x5.dantuo = $(this).parents('ul').hasClass("am-nav-dan") ? 1 : 0;
 	HCCP.x5.type = 0;
 	HCCP.x5.dan = '';
 	HCCP.x5.tuo = '';

	$('.award-money').text(HCCP.x5.prizeMoney[HCCP.x5.playId])
	$(".hc-nav").hide();

	setBasic();
	changeDisplay();
}
// 得到当前期号
function getInitData() {
	//取当前期号数据
	var issue = HCCP.trade.issue(HCCP.x5.lotyId);
	if (issue && issue.code == 200 && issue.data) {
		init_issue(issue.data);
		//加奖and新增
 		addprize(issue.data.playIdentity)
	} else if (issue && issue.code != 200) {
		HCCP.FUNC.alert(issue.message);
		return false;
	} else {
		HCCP.FUNC.alert("网络繁忙，请稍候再试");
		return false;
	}
	changeDisplay();
}
// 加奖 and 新增
function addprize(data) {
 	if (data && !$.isEmptyObject(data)) {
 		$.each(data, function(key, val) {
 			$('[playname="' + key + '"]').parent().addClass('addsign' + val)
 		})
 	}
}
//得到期号
function getIssue() {
	var issue = HCCP.trade.issue(HCCP.x5.lotyId),
		data;
	if (issue && issue.code == 200) {
		data = issue.data;
	} else {
		data = false;
	}
	init_issue(data);
}

function init_issue(issue) {
	// 距<hc name="issue"></hc>期截止 : <time class="hc-color-x5yellow" name="cdtime">-- : --</time>
	if (issue && issue.issue) {
		HCCP.x5.fullIssue = issue.issue;
		HCCP.x5.limitObj = issue.limit || {};
		HCCP.x5.issueS = issue.issue.toString().substr(-2);
		HCCP.x5.serverTime = issue.serverTime;
		HCCP.x5.diffServer = HCCP.x5.serverTime * 1000 - new Date().getTime();
		HCCP.x5.companyEndTime = issue.companyEndTime;
		if ($(".hc-x5-stop").text().trim() == "正在获取期号中...") {
			$(".hc-x5-stop").html('距<span name="issue">' + HCCP.x5.issueS + '</span>期截止：<time class="hc-color-x5yellow" name="cdtime">-- : --</time>')
				// $('.submit').addClass('btn-wrap');
		} else {
			$("[name=issue]").text(HCCP.x5.issueS);
		}
		//计时

		countDown();
	} else {


		$(".hc-x5-stop").text("正在获取期号中...");
		//10秒取一次期号信息
		if (typeof(updated_issue) != "undefined") {
			clearTimeout(updated_issue);
		}
		updated_issue = window.setTimeout(getIssue, 10000);
	}
}
//倒计时
function countDown() {
	var lotyId = HCCP.x5.lotyId;
	var serverTime = Math.ceil((new Date().getTime() + HCCP.x5.diffServer) / 1000);
	var companyEndTime = HCCP.x5.companyEndTime;
	var diffTime = companyEndTime - serverTime;
	var showH = Math.floor(diffTime / 3600);
	var showI = Math.floor((diffTime % 3600) / 60);
	var showS = diffTime % 60;
	showH = showH < 10 ? "0" + showH : showH;
	showI = showI < 10 ? "0" + showI : showI;
	showS = showS < 10 ? "0" + showS : showS;
	if (diffTime < 0) { //    截止了
		if (!HCCP.x5.errTimes) {
			HCCP.x5.errTimes = 1
		};
		HCCP.x5.errTimes++;
		if (HCCP.x5.errTimes > 3) {
			console.log('下一期获取异常,请刷新页面重试！')
			return;
		}
		$('.submit').addClass('btn-wrap');
		//重新去取期号信息
		if (typeof(everysecond) != "undefined") {
			clearTimeout(everysecond);
		}
		setTimeout(function() {
			HCCP.x5.overdueIssue = HCCP.x5.fullIssue.toString().substr(-2);
			getIssue();
			getChart();
			HCCP.x5.nowIssue = HCCP.x5.fullIssue.toString().substr(-2);
			if (HCCP.x5.nowIssue && HCCP.x5.nowIssue != HCCP.x5.overdueIssue) {
				HCCP.FUNC.alert(HCCP.x5.overdueIssue + '期已截止,当前期号为' + HCCP.x5.nowIssue + '期');
			} else {}
		}, 1000);
		// return;
	} else {
		HCCP.x5.errTimes = 1;
		$('.submit').removeClass('btn-wrap');
		showTime = showH == "00" ? showI + ":" + showS : showH + ":" + showI + ":" + showS;
		$("[name=cdtime]").text(showTime);

		if (typeof(everysecond) != "undefined") {
			clearTimeout(everysecond);
		}
		everysecond = setTimeout(countDown, 1000);
	}
}

function changeDisplay() {

	//  type==0近期开奖&&前二直选11、前三直选12、乐选二16、乐选三13    无选号--确定按钮
	if(HCCP.x5.dantuo == 1 || (HCCP.x5.type == 0 && [11, 12, 13, 16].indexOf(+HCCP.x5.playId) >= 0)){
		$('#allFoot').hide();  // 确定隐藏
		$('#jqkjFoot').show(); // 显示期号倒计时
	} else {
		$('#allFoot').show();
		$('#jqkjFoot').hide();
	}

	// 切换玩法名
	var playname = HCCP.getPlayName(HCCP.x5.lotyId, HCCP.x5.playId);
 	if (HCCP.x5.dantuo == 1) {
 		playname = playname + "胆拖";
 	}
	$('.header-drop').text(playname);
	
	// 切换玩法选中状态
	$('[data-pid]').removeClass('active').filter(function(index){
		return $(this).data('pid') == HCCP.x5.playId && $(this).parents('ul.am-nav-dan').length == HCCP.x5.dantuo
	}).addClass('active');


	// 显示玩法
	var playidBet = 0;
	if (HCCP.x5.playId == 13) { //乐选三|前三直选 相同
		playidBet = 12
	} else if (HCCP.x5.playId == 14) { //乐选四|任选四 相同
		playidBet = 4
	} else if (HCCP.x5.playId == 15) { //乐选五|任选五 相同
		playidBet = 5
	} else if (HCCP.x5.playId == 16) { //乐选二|前二直选 相同
		playidBet = 11
	} else {
		playidBet = HCCP.x5.playId
	}
	$('[class *= bet-play-]').hide().filter('.bet-play-' + playidBet).toggleClass('is-dantuo', 1 == HCCP.x5.dantuo).show();
	//判断type 显示对应图表
	getChart(null, 1);
	// addSelectNum();
	// calcZs();
	changeSetting();
}

function getChart(flag, isTab, sort) {
	var lotyId = +HCCP.x5.lotyId;
	var playId = HCCP.x5.playId;
	var type = HCCP.x5.type;
	var tpObj = {
		1: ['1', '6', '3'],
		2: ['1', '2', '3'],
		3: ['1', '2', '3'],
		4: ['1', '2', '3'],
		5: ['1', '2', '3'],
		6: ['1', '2', '3'],
		7: ['1', '2', '3'],
		8: ['1', '2', '3'],
		9: ['1', '4', '3'],
		10: ['1', '5', '3'],
		11: ['1', '6', '7'],
		12: ['1', '6', '7', '8'],
		13: ['1', '6', '7', '8'],
		14: ['1', '2', '3'],
		15: ['1', '2', '3'],
		16: ['1', '6', '7']
	}
	if (playId == 13) {
		playId = 12;
	} else if (playId == 14) {
		playId = 4;
	} else if (playId == 15) {
		playId = 5;
	} else if (playId == 16) {
		playId = 11;
	}
	if (playId == 11 || playId == 12) {
		var limit = HCCP.x5.defaultSet.limit;
	} else {
		var limit = type == 2 ? 100 : HCCP.x5.defaultSet.limit;
	}
	var tp = tpObj[playId][type];
	//tab切换
	var wrap = $('.bet-play-' + playId);
	var tab = $('nav>li', wrap);
	tab.removeClass('active').eq(type).addClass('active');
	var wrapLi = $('.chart-main>li', wrap);
	var tb = wrapLi.eq(type);
	wrapLi.hide();
	tb.show();
	//取遗漏
	var dataObj = HCCP.x5.data;
	if (playId <= 10 && playId >= 1) {
		if (type == 2) {
			var key = playId + '_' + type;
		} else {
			var key = tp;
		}
	} else if (playId == 11 || playId == 12 || playId == 13 || playId == 16) {
		var key = tp;
	}

	if (!flag && dataObj[key] && dataObj[key]['oLimit'] == limit && dataObj[key]['nextIssue'] && dataObj[key]['nextIssue'] == HCCP.x5.fullIssue) {
		init_chart(dataObj[key], key, 0, isTab, sort);
	} else {
		var chart = HCCP.info.chart(lotyId, playId, tp, limit),
			data;
		if (chart && chart.code == 200) {
			data = chart.data;
		} else {
			data = false;
		}
		init_chart(data, key, 1, 0, sort);
	}
}

function init_chart(data, key, flag, isTab, sort) { //数据  缓存key 是否直接更新数据   是否tab切换（1s拉取数据）
	if (data) {
		var playId = HCCP.x5.playId;
		var playidAre;
		if (playId == 13) {
			playidAre = 12;
		} else if (playId == 14) {
			playidAre = 4;
		} else if (playId == 15) {
			playidAre = 5;
		} else if (playId == 16) {
			playidAre = 11;
		} else {
			playidAre = playId;
		}
		var type = HCCP.x5.type;
		var wrap = $('.bet-play-' + playidAre);
		var wrapLi = $('.chart-main>li', wrap);
		var tb = wrapLi.eq(type);
		if (flag) {
			if (playId == 11 || playId == 12 || playId == 13 || playId == 16) {
				var limit = HCCP.x5.defaultSet.limit;
			} else {
				var limit = type == 2 ? 100 : HCCP.x5.defaultSet.limit;
			}

			HCCP.x5.data[key] = data;
			HCCP.x5.data[key]['oLimit'] = limit;
		}
		if (sort || !HCCP.x5.catch[playId + '_' + type] || HCCP.x5.catch[playId + '_' + type] != JSON.stringify(data)) {
			HCCP.x5.catch[playId + '_' + type] = JSON.stringify(data);
			var table = '';
			if (playId == 1) {
				if (type == 0) {
					table = getKJ(data);
				} else if (type == 1) {
					table = getZYZS(data);
				} else if (type == 2) {
					table = getLR(data);
				}
			} else if (playId == 4 || playId == 5 || playId == 2 || playId == 3 || playId == 6 || playId == 7 || playId == 8 || playId == 9 || playId == 10 || playId == 14 || playId == 15) {
				if (type == 0) {
					table = getKJ(data);
				} else if (type == 1) {
					table = getRXZS(data);
				} else if (type == 2) {
					table = getLR(data);
				}
			} else if (playId == 11 || playId == 16) {
				if (type == 0) {
					table = getKJ(data);
				} else if (type == 1) {
					table = getZEZS(data)
				} else if (type == 2) {
					table = getZEZS(data)
				}
			} else if (playId == 12 || playId == 13) {
				if (type == 0) {
					table = getKJ(data);
				} else if (type == 1) {
					table = getZEZS(data)
				} else if (type == 2) {
					table = getZEZS(data)
				} else if (type == 3) {
					table = getZEZS(data)
				}
			}
			if (playId == 11 || playId == 12 || playId == 13 || playId == 16) {
				tb.children("table").remove();
				tb.children('div').remove();
				tb.prepend(table);
			} else {
				tb.empty().append(table);
			}
			if (playId == 1 && type == 1) {
				CreateLine('.bet-play-1 li:nth-child(2)', '#canvasHz1', '#ed4f5e', "red-ball")
			} else if (playId == 11 || playId == 16) {
				if (type == 1) {
					CreateLine('.bet-play-11 li:nth-child(2)', '#canvasHz11', '#ed4f5e', "red-ball")
				} else if (type == 2) {
					CreateLine('.bet-play-11 li:nth-child(3)', '#canvasHz112', '#f29233', "yellow-ball")
				}
			} else if (playId == 12 || playId == 13) {
				if (type == 1) {
					CreateLine('.bet-play-12 li:nth-child(2)', '#canvasHz12', '#ed4f5e', "red-ball")
				} else if (type == 2) {
					CreateLine('.bet-play-12 li:nth-child(3)', '#canvasHz122', '#f29233', "yellow-ball")
				} else if (type == 3) {
					CreateLine('.bet-play-12 li:nth-child(4)', '#canvasHz123', '#3d93ec', "blue-ball")
				}
			}
			if ((playId <= 10 && playId >= 1) || playId == 14 || playId == 15) {
				if (type != 2) {
					tb.find('.common tr:last-child')[0].scrollIntoView();
				}
			} else {
				tb.find('.common tr:last-child')[0].scrollIntoView();
			}
		}
		//判断下是否更新开奖 定时器
		var isUpdate = 0;
		if (key == 1) {
			var dt = HCCP.x5.data[key]['history'];
			var last = dt[dt.length - 1] || {};
			if (!last['kjhm'] || !last['kjhm'].length) {
				isUpdate = 1;
			}
		} else if (key == '1_2' || key == '2_2' || key == '3_2' || key == '4_2' || key == '5_2' || key == '6_2' || key == '7_2' || key == '8_2' || key == '9_2' || key == '10_2' || key == '14_2' || key == '15_2') {
			var dt = HCCP.x5.data[key]['coldHot'] || [];
			var last = dt[0];
			if (!last || last['currentOmit'] == -1) {
				isUpdate = 1;
			}
		} else {
			var dt = HCCP.x5.data[key]['omit'];
			var last = [];
			for (var j in dt) {
				last.push(j);
			}
			last.sort(function(a, b) {
				return a < b ? 1 : -1;
			});
			if (!last[0] || dt[last[0]] instanceof Array) {
				isUpdate = 1;
			}
		}
		if (isUpdate) {
			//10秒取一次图表信息
			if (typeof(updated_chart) != "undefined") {
				clearTimeout(updated_chart);
			}
			if (isTab) {
				updated_chart = window.setTimeout(getChart.bind(this,1), 1000);
			} else {
				updated_chart = window.setTimeout(getChart.bind(this,1), 10000);
			}
		}
	} else {
		//10秒取一次图表信息
		if (typeof(updated_chart) != "undefined") {
			clearTimeout(updated_chart);
		}
		updated_chart = window.setTimeout(getChart, 10000);
	}
}
//*******************任选and组选
//开奖号码图
function getKJ(data) {
	var playId = HCCP.x5.playId;
	if (playId == 13) {
		playId = 12;
	} else if (playId == 14) {
		playId = 4;
	} else if (playId == 15) {
		playId = 5;
	} else if (playId == 16) {
		playId = 11;
	}
	var table = '';
	if (data && data.history && data.history.length) {
		var res = data.history;
		var issue, numAry, num, hz, dx, ds, html = '';
		$.each(res, function(x, item) {
			issue = item.issue.toString().substr(-2) || '';
			if (!item['kjhm'] || !item['kjhm'].length) {
				html += '<tr>';
				html += '<td>' + issue + '期</td>';
				html += '<td colspan="4" class="wait-award">等待开奖...</td>';
				html += '</tr>';
				return;
			}
			// numAry = FUNC.filterAry(item.kjhm).sort(function(a,b){return a>b?1:-1;});
			numAry = item.kjhm;
			num = numAry.join(' ');
			dxB = item.sizeRatio
			joB = item.parityRatio

			html += '<tr>';
			html += '<td>' + issue + '期</td>';
			html += '<td><span class="award-num-sm">' + num + '</span></td>';
			html += '<td class="big-small">' + dxB + '</td>';
			html += '<td class="odd-even">' + joB + '</td>';
			html += '</tr>';
		})
		table = '<table class="hc-bg table-fixed-top">';
		table += '<colgroup><col width="15%" /><col width="45%"/><col width="30%"/><col width="30%"/></colgroup>';
		table += '<tbody><tr><td>期号</td><td>开奖号码</td><td>大小比</td><td>奇偶比</td></tr></tbody></table>';
		if (playId == 11 || playId == 12) {
			table += '<div class="wrap-common padd-bottom"><table class="common row1_c"><colgroup><col width="15%"/><col width="45%"/><col width="30%"/><col width="30%"/></colgroup>';
		} else {
			table += '<div class="wrap-common"><table class="common row1_c"><colgroup><col width="15%"/><col width="45%"/><col width="30%"/><col width="30%"/></colgroup>';
		}

		table += '<tbody>' + html + '</tbody>';
		table += '</table></div>';

	}
	return table;
}
// 任选详细走势图
function getRXZS(data) {
	var table = '';
	if (data && data.omit && !$.isEmptyObject(data.omit)) {
		var res = data.omit;
		var issue, omi, hz, html = lHtml = '';
		$.each(res, function(x, item) {
			issue = x.toString().substr(-2) || '';
			if (item instanceof Array && item.length == 0) {
				html += '<tr><td>' + issue + '期</td>';
				html += '<td class="col_row1" colspan="11">等待开奖...</td></tr>';
				return;
			}
			html += '<tr><td>' + issue + '期</td>';
			if (item instanceof Array && item.length > 0) {
				for (var i = 0; i <= item.length - 1; i++) {
					if (item[i] == 0) {
						if (i >= 9) {
							html += '<td><span class="red-ball"><label>' + (i + 1) + '</label></span></td>'
						} else {
							html += '<td><span class="red-ball"><label>' + 0 + (i + 1) + '</label></span></td>'
						}

					} else {
						html += '<td><label class="hc-yl">' + item[i] + '</label></td>'
					}
				}
			} else {
				html += '<td>' + 等待开奖 + '</td>'
			}
			html += '</tr>';
		})
		table = '<table class="hc-bg table-fixed-top">';
		table += '<colgroup><col width="12%" /><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/></colgroup>';
		table += '<tbody><tr><td></td><td>01</td><td>02</td><td>03</td><td>04</td><td>05</td><td>06</td><td>07</td><td>08</td><td>09</td><td>10</td><td>11</td></tr></tbody></table>';
		table += '<div class="wrap-common"><table class="common row1_c"><colgroup><col width="12%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/></colgroup>';
		table += '<tbody>' + html + '</tbody>';
		table += getFoot(data.occurrenceTimes, data.avgOmit, data.maxOmit, data.maxCombo);
		table += '</table></div>';
	}
	return table;
}
//冷热图
function getLR(data) {
	var table = '';
	if (data && data.coldHot && data.coldHot.length) {
		var res = data.coldHot;
		var item, num, t_3, t_5, t_10, t_yl, html = '';
		var sortObj = HCCP.x5.defaultSort[HCCP.x5.playId] || {};
		var activeIndex = (sortObj['active'] <= 4 && sortObj['active'] >= 0) ? sortObj['active'] : 0;
		var direction = sortObj['direction'] == 1 ? 1 : 0;
		var keyArr = ['number', 'coldHot30', 'coldHot50', 'coldHot100', 'currentOmit'];
		var titleArr = ['号码', '近30期', '近50期', '近100期', '遗漏'];
		var key = keyArr[activeIndex];
		HCCP.x5.currentOmit = res[0].currentOmit;
		var index = HCCP.x5.index ? HCCP.x5.index : 6;
		// console.log(res[0].currentOmit == -1)
		if (res[0].currentOmit == -1 && index == 5) {
			tmp = res;
		} else if (index == 6 && res[0].currentOmit != -1) {
			var tmp = res.slice(0).sort(function(a, b) {
				if (direction) {
					return a[key] > b[key] ? 1 : -1;
				} else {
					return a[key] < b[key] ? 1 : -1;
				}
			})
		} else if (index == 6 && res[0].currentOmit == -1) {
			tmp = res;
		} else {
			var tmp = res.slice(0).sort(function(a, b) {
				if (direction) {
					return a[key] > b[key] ? 1 : -1;
				} else {
					return a[key] < b[key] ? 1 : -1;
				}
			})
		}
		var arr1 = [],
			arr2 = [],
			arr3 = [],
			arr4 = [],
			arr5 = [];
		$.each(tmp, function(x, y) {
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
		var c1 = c2 = c3 = c4 = c5 = '';
		for (var i = 0; i < 11; i++) {
			c1 = c2 = c3 = c4 = c5 = '';
			item = (tmp[i] instanceof Object) ? tmp[i] : {};
			num = item.number == undefined ? '--' : item.number;
			t_3 = item.coldHot30 == undefined ? '--' : item.coldHot30;
			t_5 = item.coldHot50 == undefined ? '--' : item.coldHot50;
			t_10 = item.coldHot100 == undefined ? '--' : item.coldHot100;
			t_yl = (item.currentOmit == undefined || item.currentOmit == -1) ? '--' : item.currentOmit;
			if (t_3 == arrM2) {
				c2 = 'hc-color-k3yellow';
			}
			if (t_5 == arrM3) {
				c3 = 'hc-color-k3yellow';
			}
			if (t_10 == arrM4) {
				c4 = 'hc-color-k3yellow';
			}
			if (t_yl == arrM5) {
				c5 = 'hc-color-k3yellow';
			}
			html += '<tr>';
			html += '<td><span class="red-ball">' + num + '</span></td>';
			html += '<td><span class="' + c2 + '">' + t_3 + '</span></td>';
			html += '<td><span class="' + c3 + '">' + t_5 + '</span></td>';
			html += '<td><span class="' + c4 + '">' + t_10 + '</span></td>';
			html += '<td><span class="' + c5 + '">' + t_yl + '</span></td>';
			html += '</tr>';
		}
		table = '<table class="hc-bg table-fixed-top">';
		table += '<colgroup><col width="20%" /><col width="20%"/><col width="20%" /><col width="20%"/></colgroup>';
		table += '<tbody><tr>';
		var _a, _b;
		for (var j = 0; j < 5; j++) {
			if (j == activeIndex) {
				_a = 'active';
				_b = direction;
			} else {
				_a = '';
				_b = '0';
			}
			table += '<td data-sort="' + _b + '" class="' + _a + '"><span>' + titleArr[j] + '</span></td>';
		}
		table += '</tr></tbody></table>';
		table += '<div class="wrap-common"><table class="common nolastBg"><col width="20%" /><col width="20%"/><col width="20%" /><col width="20%"/></colgroup>';
		table += '<tbody>' + html + '</tbody>';
		table += '</table></div>';
	}
	return table;
}
//直选
function getZYZS(data) {
	var playId = HCCP.x5.playId;
	if (playId == 13) {
		playId = 12
	} else if (playId == 16) {
		playId = 11
	}
	var type = HCCP.x5.type;
	var table = '';
	if (data && data.omit && !$.isEmptyObject(data.omit)) {
		var res = data.omit;
		var issue, omi, hz, html = lHtml = '';
		$.each(res, function(x, item) {
			issue = x.toString().substr(-2) || '';
			if (item instanceof Array && item.length == 0) {
				html += '<tr><td>' + issue + '期</td>';
				html += '<td class="col_row1" colspan="11">等待开奖...</td></tr>';
				return;
			}
			html += '<tr><td>' + issue + '期</td>';
			if (item instanceof Array && item.length > 0) {
				for (var i = 0; i <= item.length - 1; i++) {
					if (item[i] == 0) {
						if (i >= 9) {
							html += '<td><span class="red-ball"><label>' + (i + 1) + '</label></span></td>'
						} else {
							html += '<td><span class="red-ball"><label>' + 0 + (i + 1) + '</label></span></td>'
						}
					} else {
						html += '<td><label class="hc-yl">' + item[i] + '</label></td>'
					}
				}
			} else {
				html += '<td>' + 等待开奖 + '</td>'
			}
			html += '</tr>';
		})
		table = '<table class="hc-bg table-fixed-top">';
		table += '<colgroup><col width="12%" /><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/></colgroup>';
		table += '<tbody><tr><td></td><td>01</td><td>02</td><td>03</td><td>04</td><td>05</td><td>06</td><td>07</td><td>08</td><td>09</td><td>10</td><td>11</td></tr></tbody></table>';
		table += '<div class="wrap-common"><table class="common row1_c"><colgroup><col width="12%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/></colgroup>';
		table += '<tbody>' + html + '</tbody>';
		table += getFoot(data.occurrenceTimes, data.avgOmit, data.maxOmit, data.maxCombo);
		table += '</table>';
		if (playId == 1) {
			table += '<div id="canvasHz1" class="hc-zx"></div></div>'
		} else if (playId == 11) {
			if (type == 1) {
				table += '<div id="canvasHz11" class="hc-zx"></div></div>'
			} else {
				table += '<div id="canvasHz112" class="hc-zx"></div></div>'
			}
		} else if (playId == 12) {
			if (type == 1) {
				table += '<div id="canvasHz12" class="hc-zx"></div></div>'
			} else if (type == 2) {
				table += '<div id="canvasHz122" class="hc-zx"></div></div>'
			} else if (type == 3) {
				table += '<div id="canvasHz123" class="hc-zx"></div></div>'
			}
		}
		if (playId == 11 || playId == 12) {
			table += '<tfoot><foot class="table-fixed-bottom"><dl class="hc-dl hc-cf select_numb"><dt>选号</dt><dd class="scroll_b1 scroll_bar"><ul class="hc-scroll">';
			table += '<li x5val="1">01</li><li x5val="2">02</li><li x5val="3">03</li><li x5val="4">04</li><li x5val="5">05</li><li x5val="6">06</li><li x5val="7">07</li><li x5val="8">08</li><li x5val="9">09</li><li x5val="10">10</li><li x5val="11">11</li>';
			table += '</ul></dd></dl></foot></tfoot>'
		}


	}
	return table;
}

function getZEZS(data) {
	var playId = HCCP.x5.playId;
	var type = HCCP.x5.type;
	var table = '';
	if (data && data.omit && !$.isEmptyObject(data.omit)) {
		var res = data.omit;
		var issue, omi, hz, html = lHtml = '';
		$.each(res, function(x, item) {
			issue = x.toString().substr(-2) || '';
			if (item instanceof Array && item.length == 0) {
				html += '<tr><td>' + issue + '期</td>';
				html += '<td class="col_row1" colspan="11">等待开奖...</td></tr>';
				return;
			}
			html += '<tr><td>' + issue + '期</td>';
			if (item instanceof Array && item.length > 0) {
				var className = ''
				if (playId == 11) {
					if (type == 1) {
						className = "red-ball"
					} else if (type == 2) {
						className = "yellow-ball"
					}
				} else {
					if (type == 1) {
						className = "red-ball"
					} else if (type == 2) {
						className = "yellow-ball"
					} else if (type == 3) {
						className = "blue-ball"
					}
				}
				for (var i = 0; i <= item.length - 1; i++) {
					if (item[i] == 0) {
						if (i >= 9) {
							html += '<td><span  class=' + className + '><label>' + (i + 1) + '</label></span></td>'
						} else {
							html += '<td><span class=' + className + '><label>' + 0 + (i + 1) + '</label></span></td>'
						}

					} else {
						html += '<td><label class="hc-yl">' + item[i] + '</label></td>'
					}
				}
			} else {
				html += '<td>' + 等待开奖 + '</td>'
			}
			html += '</tr>';
		})
		table = '<table class="hc-bg table-fixed-top">';
		table += '<colgroup><col width="12%" /><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/></colgroup>';
		table += '<tbody><tr><td></td><td>01</td><td>02</td><td>03</td><td>04</td><td>05</td><td>06</td><td>07</td><td>08</td><td>09</td><td>10</td><td>11</td></tr></tbody></table>';
		table += '<div class="wrap-common"><table class="common row1_c"><colgroup><col width="12%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/><col width="8%"/></colgroup>';
		table += '<tbody>' + html + '</tbody>';
		table += getFoot(data.occurrenceTimes, data.avgOmit, data.maxOmit, data.maxCombo);
		table += '</table>';
		if (playId == 1) {
			table += '<div id="canvasHz1" class="hc-zx"></div></div>'
		} else if (playId == 11 || playId == 16) {
			if (type == 1) {
				table += '<div id="canvasHz11" class="hc-zx"></div></div>'
			} else {
				table += '<div id="canvasHz112" class="hc-zx"></div></div>'
			}
		} else if (playId == 12 || playId == 13) {
			if (type == 1) {
				table += '<div id="canvasHz12" class="hc-zx"></div></div>'
			} else if (type == 2) {
				table += '<div id="canvasHz122" class="hc-zx"></div></div>'
			} else if (type == 3) {
				table += '<div id="canvasHz123" class="hc-zx"></div></div>'
			}
		}
	}
	return table;
}
//footer表格footer
function getFoot(f1, f2, f3, f4) {
	var getTd = function(arr) {
		var str = '',
			n;
		for (var i = 0; i < 11; i++) {
			n = arr[i] == undefined ? '' : arr[i];
			str += '<td>' + n + '</td>';
		}
		return str;
	}
	var html = '';
	if (f1 && f2 && f3 && f4 && f1.length && f2.length && f3.length && f4.length) {
		html = '<tfoot class="hc-tj"><tr class="text-purple"><td class="fontSize">出现<br />次数</td>' + getTd(f1);
		html += '</tr><tr class="text-green"><td class="fontSize">平均<br />遗漏</td>' + getTd(f2);
		html += '</tr><tr class="text-red"><td class="fontSize">最大<br />遗漏</td>' + getTd(f3);
		html += '</tr><tr class="text-blue"><td class="fontSize">最大<br />连出</td>' + getTd(f4);
		html += '</tr></tfoot>';
	} else {
		html = '<tfoot class="hc-tj text-purple"><tr><td class="fontSize">出现<br />次数</td><td class="hc-grey" colspan="11" rowspan="4">等待开奖后更新</td></tr>';
		html += '<tr class="text-green"><td class="fontSize ">平均<br />遗漏</td></tr>';
		html += '<tr class="text-red"><td class="fontSize">最大<br />遗漏</td></tr>';
		html += '<tr class="text-blue"><td class="fontSize">最大<br />连出</td></tr></tfoot>';
	}
	return html;
}
//返回
function goBack() {
	HCCP.dataS.local.del("basicTb");
	var lotyId = 20;
	try {
		lotyId = JSON.parse(HCCP.dataS.local.get("basic")).lotyid;
	} catch (e) {
		lotyId = 20;
	}
	window.location.href = '../../../trade/kuaiping/11x5.html?' + lotyId
}
//显示下拉玩法
function showPlay() {
	$(".hc-nav").toggle();
	$(".hc-nav").on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function() {});
}

function tableSort() {
	var that = $(this),
		index = that.index(),
		direction = that.attr('data-sort');
	HCCP.x5.index = index + 1;
	if (that.hasClass('active')) {
		direction = direction == 1 ? 0 : 1;
	}
	HCCP.x5.defaultSort[HCCP.x5.playId].active = index;
	HCCP.x5.defaultSort[HCCP.x5.playId].direction = direction;
	getChart(0, 0, 1);
}
//canvas划线
function CreateLine(element, div, color, ele) {
	var cav = $(div);
	var ele = $(element + ' span' + "." + ele);
	cav.empty();
	var c = color;
	for (var j = ele.length - 1; j > 0; j--) {
		var tid = ele.eq(j);
		var fid = ele.eq(j - 1);

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
		cvs.width = Math.abs(f_left - t_left) < f_width ? f_width : Math.abs(f_left - t_left);
		cvs.height = Math.abs(f_top - t_top);
		cvs.style.top = cvs_top + parseInt(f_height / 2) + "px";
		cvs.style.left = cvs_left + parseInt(f_width / 2) + "px";
		cvs.style.position = "absolute";
		var cxt = cvs.getContext("2d");
		cxt.save();
		cxt.translate(0.5, 0.5);
		cxt.lineWidth = 1;
		cxt.strokeStyle = c;
		cxt.beginPath();
		cxt.moveTo((f_left - cvs_left), (f_top - cvs_top));
		cxt.lineTo((t_left - cvs_left), (t_top - cvs_top));
		cxt.closePath();
		cxt.stroke();
		cxt.restore();
		cav.append(cvs);
	}
}


});