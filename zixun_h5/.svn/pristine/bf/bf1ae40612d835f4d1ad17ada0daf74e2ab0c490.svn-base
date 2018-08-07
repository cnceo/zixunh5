$(document).ready(function() {
	HCCP.cc = new Object();
  HCCP.cc.LOTYID = [15];

  HCCP.cc.playIdObj = {
    0: '七星彩'
  }
  HCCP.cc.selectTips = [
    "",
    "每位至少选择1个号码"
  ];
	HCCP.cc.selectTitle = {
		0:'每位至少选择1个号码'
	}

	//初始化玩法 即带过来的数据
   _init();
	//如果是带数据进来的
	if(HCCP.cc.tuo && HCCP.cc.tuo.length) {
		setDefaultData();
	}
  //绑定点击事件
  bindEvent();
  // getServerTime();
  //获取期号
  getIssue();
  //切换显示
  changeDisplay();

  //绑定点击事件
	function bindEvent(){
		var o = 'click';
		$('header .back').on(o,goBack);
		//切换玩法
    $('[class *= "bet-play-"]').on(o,'nav>li',changeTab);
    //选号
    $("[ballval]").on(o, selectBall);
    //提交
		$(".submit").on(o,doConfirm);
		//设置
		$('.chartSetting').on(o,showSetting);
		$('.set-cancel').on(o,cancelSetting);
		$('.set-sure').on(o,sureSetting);
		$('.set-con').on(o,'li',setToggle);
		$(window).resize(CreateLine);
	}
	//函数方法
	//获取服务器时间
	function getServerTime() {
	    HCCP.cc.serverTime = HCCP.FUNC.diff_time();
	    HCCP.cc.diffServer = HCCP.cc.serverTime*1000 - new Date().getTime();
	    window.setTimeout(getServerTime, 300000);
	}
	function _init() {
		HCCP.cc.lotyId = HCCP.FUNC.getUrlParam('clickValueInt');
		if(!HCCP.cc.lotyId || HCCP.cc.LOTYID.indexOf(+HCCP.cc.lotyId) < 0){
			// HCCP.FUNC.go(URL_INDEX);
			// return;
			HCCP.cc.lotyId = 15;
		}

		//取存号
		try {
			var basic = JSON.parse(HCCP.dataS.local.get("basicTb"));
		} catch(e) {}
		if(basic && basic['lotyId'] && basic['lotyId'] == HCCP.cc.lotyId && basic['playId'] != undefined && HCCP.cc.playIdObj.hasOwnProperty(basic['playId'])){
			//判断下玩法
			HCCP.cc.playId = +basic['playId'];
			HCCP.cc.dantuo = basic['dantuo']?1:0;
			if(basic['type'] != undefined){
				HCCP.cc.type = basic['type'];
			}else {
				HCCP.cc.type = 0;
			}
			HCCP.cc.tuo = basic['tuo'] || [];
			if(HCCP.cc.tuo.length != 7){
				HCCP.cc.tuo = [];
			}
		}else{
			HCCP.cc.playId = 0;
			HCCP.cc.type = 0;
			HCCP.cc.dantuo = 0;
			HCCP.cc.tuo = [];
			HCCP.dataS.local.del("basicTb");
			HCCP.dataS.local.del("betid");
			HCCP.dataS.local.del("content");
		}
		$('body').show();

		HCCP.cc.betObj = new Object();
		HCCP.cc.data = new Object();
		HCCP.cc.cache = new Object();
		HCCP.cc.defaultSet = {
			limit:30,
			yl:0,
			zx:0,
			tj:0
		}
		setBasic();
		
		//获取之前的选号缓存
	  try {
	    var content = JSON.parse(HCCP.dataS.local.get("content"));
	  } catch(e) {}
	  if(content && content[HCCP.cc.basic.lotyId]) {
	    HCCP.cc.content = content;
	  }else{
	    HCCP.cc.content = null;
	    HCCP.dataS.local.del("content");
	  }
	  //修改选号
	  try {
	    var id = parseInt(HCCP.dataS.local.get("betid"), 10);
	    var default_betcontent = (HCCP.cc.content ? HCCP.cc.content[HCCP.cc.basic.lotyId][id] : null);
	  } catch(e) {}
	  if(default_betcontent){
	    HCCP.cc.default_betcontent = default_betcontent;
	    HCCP.cc.default_betcontent.confirm_id = id;
	  }else{
	    HCCP.cc.default_betcontent = null;
	    HCCP.dataS.local.del("betid");
	  }
	}
	//存下玩法信息
	function setBasic(){
		HCCP.cc.basic = {
			lotyId : HCCP.cc.lotyId,
			playId : HCCP.cc.playId,
			type : HCCP.cc.type,
			dantuo : HCCP.cc.dantuo,
			tuo: HCCP.cc.tuo
		}
		HCCP.dataS.local.set("basicTb", JSON.stringify(HCCP.cc.basic));
	}
	//设置带过来的数据
	function setDefaultData(){
		var arr = HCCP.cc.tuo;
		var playId = HCCP.cc.playId;

		HCCP.cc.betObj[playId] = new Object();
		HCCP.cc.betObj[playId].tuo = arr;
	}
	//得到期号
	function getIssue(){
    var issue = HCCP.trade.issue(HCCP.cc.lotyId),
        data;
    if(issue && issue.code == 200){
        data = issue.data;
    }else{
        data = false;
    }
    init_issue(data);
	}
	function init_issue(issue) {
    if(issue && issue.issue) {
    	var overdueIssue = HCCP.cc.issueS ? HCCP.cc.issueS : 0;
      HCCP.cc.fullIssue = issue.issue;
      HCCP.cc.issueS = issue.issue.toString().substr(-3);
      HCCP.cc.serverTime = issue.serverTime;
      HCCP.cc.diffServer = HCCP.cc.serverTime*1000 - new Date().getTime();
      HCCP.cc.companyEndTime = issue.companyEndTime;
      if($(".hc-qh-stop").eq(0).text().trim() == "正在获取期号中...") {
				$(".hc-qh-stop").html('距<span name="issue">' + HCCP.cc.issueS + '</span>期截止：<time class="hc-color-red" name="cdtime">-- : --</time>')
			} else {
				$("[name=issue]").text(HCCP.cc.issueS);
			}
      //计时
      $('.submit').addClass('active');
      countDown();
      //期号切换提示
	    if (overdueIssue != 0 && HCCP.cc.issueS && HCCP.cc.issueS != overdueIssue) {
	      HCCP.FUNC.alert({
	        "msg": overdueIssue + '期已截止  当前期号为' + HCCP.cc.issueS + '期'
	      });
	    } else {
	      // HCCP.modal.alert({"msg":overdueIssue+'期已截止'});
	    }
    } else {
    	$('.submit').removeClass('active');
      $(".hc-qh-stop").text("正在获取期号中...");
      //10秒取一次期号信息
      // if(typeof(updated_issue) != "undefined") {
      //     clearTimeout(updated_issue);
      // }
      // updated_issue = window.setTimeout(getIssue, 10000);
    }
	}
	//倒计时
	function countDown() {
    var lotyId = HCCP.cc.lotyId;
    var serverTime =  Math.ceil((new Date().getTime() + HCCP.cc.diffServer)/1000);
    var companyEndTime = HCCP.cc.companyEndTime;
    var diffTime =  companyEndTime - serverTime;
    var showH = Math.floor(diffTime/3600);
    var showI = Math.floor((diffTime%3600)/60);
    var showS = diffTime%60;
    showH = showH < 10 ? "0"+showH : showH;
    showI = showI < 10 ? "0"+showI : showI;
    showS = showS < 10 ? "0"+showS : showS;

    if(diffTime < 0){ //    截止了
    	$('.submit').removeClass('active');
        if(!HCCP.cc.errTimes){HCCP.cc.errTimes =1};
        var timer = 1000;
				if (HCCP.cc.errTimes++ > 3) {
					// console.log('下一期获取异常,请刷新页面重试！')
					// return;
					timer = 10000;
				}
        //重新去取期号信息
        if(typeof(everysecond) != "undefined"){
            clearTimeout(everysecond);
        }
        setTimeout(function(){
	        getIssue();
	        getChart();
        }, timer);
        // return;
    }else{
        HCCP.cc.errTimes = 1;
        showTime = showH=="00" ? showI+" : "+showS : showH+" : "+showI+" : "+showS;
        $("[name=cdtime]").text(showTime);

        if(typeof(everysecond) != "undefined"){
            clearTimeout(everysecond);
        }
        everysecond = setTimeout(countDown, 1000);
    }
	}
	//切换玩法显示
	function changeDisplay(){
		var playId = HCCP.cc.playId;
		// 目前就一个玩法 
		$('[class *= bet-play-]').hide().filter('.bet-play-'+playId).show();
		//初始下数据
		if(!(HCCP.cc.betObj[playId] instanceof Object && HCCP.cc.betObj[playId]['tuo'] instanceof Array)){
			HCCP.cc.betObj[playId] = new Object();
			HCCP.cc.betObj[playId].tuo = [[],[],[],[],[],[],[]];
			HCCP.cc.betObj[playId].zs = 0;
		}
		//修改下设置的选项
		changeSetting();
		//更新下选号区域
		upDataSelect();
		//更新图表区域
		getChart();
		calcZs();
	}
	//拉取图标数据
	function getChart(){
		var lotyId = +HCCP.cc.lotyId;
		var playId = HCCP.cc.playId;
		var type = HCCP.cc.type;
		var limit  = HCCP.cc.defaultSet.limit;
		var tpObj = {
			0:['1', '2', '3', '4', '5', '6', '7', '8']
		}
		var tp = tpObj[playId][type];

		//取遗漏
		var dataObj = HCCP.cc.data;
		var key = playId+'_'+type;

		//非强制更新数据 有缓存数据的话取缓存数据
		if(dataObj[key] && dataObj[key]['oLimit'] == limit && dataObj[key]['nextIssue'] &&  dataObj[key]['nextIssue'] == HCCP.cc.fullIssue){
			init_chart(dataObj[key]);
		}else{
			var chart = HCCP.info.chart(lotyId, playId, tp, limit),
				data;
			if(chart && chart.code == 200) {
				data = chart.data;
			} else {
				data = false;
			}
			init_chart(data);
		}
	}
	function init_chart(data){
		if(data){
			var playId = HCCP.cc.playId;
			var type = HCCP.cc.type;
			var wrap = $('.bet-play-'+playId);
			var wrapLi = $('.chart-main>li',wrap);
			var tb = wrapLi.eq(type);

			//存储下数据
			var key = playId+'_'+type;
			var limit = HCCP.cc.defaultSet.limit;
			HCCP.cc.data[key] = data;
			HCCP.cc.data[key]['oLimit'] = limit;

			//如果缓存相同 数据不重新渲染
			if(!HCCP.cc.cache[key] || HCCP.cc.cache[key] != JSON.stringify(data)){
				HCCP.cc.cache[key] = JSON.stringify(data); //cache下数据
				var table = '';
				if(playId == 0){
					if(type == 0){
						table = getKJ(data);
					}else{
						table = getZS(data);
					}
				}else{
					// 暂无其他玩法
				}
				tb.empty().append(table);
				// 划线
				if(playId == 0 && type != 0){
					CreateLine();
				}
				// 滚动到最后一行
				tb.find('.common tr:last-child')[0].scrollIntoView();	
			}
			
			//判断下是否更新开奖 定时器
			//目前不去跑定时器拉开奖信息 isUp
		} else {
			//没取到图标信息的话10秒取一次图表信息
			if(typeof(updated_chart) != "undefined") {
				clearTimeout(updated_chart);
			}
			updated_chart = window.setTimeout(getChart, 10000);
		}
	}
	//近期开奖view
	function getKJ(data){
		var table='';
		if(data && data.history && data.history.length){
			var res = data.history;
			var issue,numAry,num,html='';

			$.each(res,function(x,item){
				issue = item.issue.toString().substr(-3) || '';
				if(!item['kjhm'] || !item['kjhm'].length == 7){
					html += '<tr>';
					html += '<td>'+issue+'期</td>';
					html += '<td>等待开奖...</td>';
					html += '<td class="hc-border-left-0"></td>';
					html += '</tr>';
					return;
				}
				numAry = item.kjhm;
				num = $.map(numAry,function(a){ return '<span class="hc-margin-right">'+a+'</span>'; }).join('');
				html += '<tr>';
				html += '<td>'+issue+'期</td>';
				html += '<td class="hc-color-red">'+num+'</td>';
				html += '<td class="hc-border-left-0"></td>';
				html += '</tr>';
			})
			table = '<table class="table-fixed-top">';
			table += '<colgroup><col width="20%" /><col width="60%" /></colgroup>';
			table += '<tbody><tr><td>期号</td><td>开奖号码</td><td class="hc-border-left-0"></td></tr></tbody></table>';
			table += '<div class="wrap-common"><table class="common"><colgroup><col width="20%"/><col width="60%" /></colgroup>';
			table += '<tbody>'+html+'</tbody>';
			table += '</table></div>';
		}
		return table;
	}
	//获取每一位的遗漏
	function getZS(data){
		var type = HCCP.cc.type;
		var table='';
		var getFoot = function (f1,f2,f3,f4){
			var getTd = function (arr){
				var str = '',n;
				for(var i = 0; i<10; i++){
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
				html = '<tfoot class="hc-tj">';
				html += '<tr><td>出现次数</td><td class="col_row hc-grey" colspan="10" rowspan="4">等待开奖后更新</td></tr>';
				html += '<tr><td>平均遗漏</td></tr><tr><td>最大遗漏</td></tr><tr><td>最大连出</td></tr>';
				html += '</tfoot>';
			}
			return html;
		}
		if(data && data.omit && !$.isEmptyObject(data.omit)){
			var res = data.omit;
			var issue,html='';
			$.each(res,function(x,item){
				issue = x.toString().substr(-3) || '';
				if(item instanceof Array && item.length != 10){
					html += '<tr><td>'+issue+'期</td>';
					html += '<td colspan="10">等待开奖...</td></tr>';
					return ;
				}else{
					var _td ='';
					$.each(item,function(i,a){
						_td += (a == 0 ? '<td><span class="ballnum ballnum-c'+type+'">'+i+'</span></td>' : '<td><span class="hc-yl">'+a+'<span></td>');
					});
					html += '<tr><td>'+issue+'期</td>';
					html += _td + '</tr>';
				}
			})
			table = '<table class="table-fixed-top">';
			table += '<colgroup><col width="20%" /></colgroup>';
			table += '<tbody><tr><td></td><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td></tr></tbody></table>';
			table += '<div class="wrap-common myCanvas"><div class="canvasHz hc-zx"></div><table class="common"><colgroup><col width="20%"/></colgroup>';
			table += '<tbody>'+html+'</tbody>';
			table += getFoot(data.occurrenceTimes, data.avgOmit, data.maxOmit, data.maxCombo);
			table += '</table></div>';
		}
		return table;
	}
	function CreateLine() {
		var playId = HCCP.cc.playId;
		var type = HCCP.cc.type;
		var wrap = $('.bet-play-'+playId);
		var wrapLi = $('.chart-main>li',wrap).eq(type);
		var myCanvas = $('.myCanvas',wrapLi);
		var cav = $('.canvasHz',myCanvas);
		var ele = $('.ballnum',myCanvas);
		cav.empty();
		var type = HCCP.cc.type,
			arr = ['','#e12d3e','#f29233','#3d93ec','#8fb055','#bf6ccb','#5bae7f','#e34d9a']
		var c = arr[type] || '#e12d3e';
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
	//tab切换
	function changeTab(){
		var that = $(this),
			index = that.index();
		if(that.hasClass('active')){
			return;
		}
		HCCP.cc.type = index;
		setBasic();
		//修改下设置的选项
		changeSetting();
		//更新下选号区域
		upDataSelect();
		//更新图表显示内容
		getChart();
		//tab切换 注数不变
	}
	//更新下选号区域
	function	upDataSelect(){
		var playId = HCCP.cc.playId;
		var type = HCCP.cc.type;
		var wrap = $('.bet-play-'+playId);

		//tab切换 显示
		var tab = $('nav>li',wrap);
		var oldIndex = tab.filter('.active').index();
		tab.removeClass('active').eq(type).addClass('active');

		var viewEle,viewIndex;
		viewIndex = oldIndex < type ? +type + 2 : +type - 2;
		if(viewIndex < 0){
			viewIndex = 0;
		}else if(viewIndex > 7){
			viewIndex = 7;
		}
		viewEle = tab.eq(viewIndex);
		if(viewEle.length){
			viewEle.get(0).scrollIntoView();	
		}
		
		var wrapLi = $('.chart-main>li',wrap);
		wrapLi.hide().eq(type).show();


		//selectfoot 切换
		if(type == 0){
			$('#allFoot').hide();
			$('#jqkjFoot').show();
			wrap.removeClass('padding-foot');
			$('.table-fixed-bottom',wrap).hide();
		}else{
			$('#jqkjFoot').hide();
			$('#allFoot').show();
			wrap.addClass('padding-foot');
			$('.table-fixed-bottom',wrap).show();
		}

		//foot 更新
		var obj = HCCP.cc.betObj[playId] || {},
			arr = obj['tuo'] || [];
		if(type >= 1 && type <= 7){
			//球球
			var ballEle = $('[ballval]',wrap),
				tmp = arr[type - 1] || [];
			ballEle.removeClass('active');
			for(var i = 0,l = tmp.length; i < l; i++ ){
				ballEle.filter('[ballval="'+tmp[i]+'"]').addClass('active');
			}
			//已选内容
			changeSelectTxt()
		}
	}
	function changeSelectTxt(){
		var playId = HCCP.cc.playId,
			type = HCCP.cc.type,
			that = $('.bet-play-'+playId).find('.select-content'),
			obj = HCCP.cc.betObj[playId] || {},
			arr = obj['tuo'] || [];
			var content = (function (){
				var s = '',t = '';
				var bit = ['一位','二位','三位','四位','五位','六位','七位'];
				for(var i = 0; i < 7; i++ ){
					t = arr[i] || [];
					if(t.length){
						s += '<span class="color_'+(i+1)+'">'+bit[i]+' '+t.join(' ')+'</span>';
					}
				}
				return '<p>'+s+'</p>';
			})();
			that.html(content);
	}
	//选号
	function selectBall(){
	  var that = $(this);
	  if(that.hasClass('active')){
	    that.removeClass('active');
	  }else{
	    //胆的处理--待增加
	    that.addClass('active');
	  }
	  addSelectNum();

	  calcZs();
	}
	//添加选号内容cache
	function addSelectNum(){
	  var playId = HCCP.cc.playId,
	  	type = HCCP.cc.type,
	  	_parent = $(".bet-play-"+playId).find('.select-table'),
	  	balls = _parent.find('[ballval].active');
	  if(playId == 0){
	  	var tuo = [];
	  	balls.each(function (i,item){
	  		tuo.push($(item).attr('ballval').toString());
	  	})
	  	HCCP.cc.betObj[playId]['tuo'][type-1] = tuo.slice(0);
	  }
	  //更新下已选内容
	  changeSelectTxt();
	}
	//计算注数
	function calcZs(){
	  var playId = +HCCP.cc.playId;
	  if(!(HCCP.cc.betObj[playId] instanceof Object)){
	  	HCCP.cc.betObj[playId] = new Object();
	  	HCCP.cc.betObj[playId]['tuo'] = [];
	  }
	  var selectJson = HCCP.cc.betObj[playId];
	  var zs = 0,hasSelect = 0;
	  var hasTips = 0,showTips = 0;
	  var tempObj = new Object();
	  switch(playId){
	    case 0:
	      var arrTuo = selectJson['tuo'] || [];
	      var item,m=1,n;
	      if(arrTuo.length){
	        for(var i=0,l=arrTuo.length;i<l;i++){
	          item = FUNC.filterAry(arrTuo[i]);
	          n = item.length;
	          m *= n;
	          if(n){
	            hasSelect = 1;
	          }
	        }
	        zs = m;
	        if(zs == 0 && hasSelect == 1){
	          hasTips = 1;
	          showTips = 1;
	        }
	      }else{
	        zs = 0;
	      }
	      HCCP.cc.betObj[playId]['zs'] = zs;
	      break;
	    default:
	      break;
	  }
	  var money = zs *2;

	  var totalEle = $('.p_total');
		var titleEle = $('.selectTitle');
		$('.zs',totalEle).text(zs);
		$('.money',totalEle).text(money);
		var txt = HCCP.cc.selectTitle[playId] || '';
		if(hasSelect){
			titleEle.text('').hide();
			totalEle.show();
		}else{
			totalEle.hide();
			titleEle.html(txt).show();
		}




	  // var totalEle = $('.p_total');
	  // $('.zs',totalEle).text(zs);
	  // $('.money',totalEle).text(money);
	  // if(hasSelect){
	  //   totalEle.show();
	  // }else{
	  //   totalEle.hide();
	  // }
	  HCCP.cc.tips = {
	    hasSelect : hasSelect,
	    hasTips : hasTips,
	    showTips : showTips
	  }
	}
	//随机一注
	function rand1(){
	  var playId = HCCP.cc.playId;
	  var _parent = $(".bet-play-"+playId);
	  arr = HCCP.MATH.random(0, 9, 7);
	 	arr = $.map(arr,function(a){ return [[a]] ;});
	  if(playId == 0){
	  	HCCP.cc.betObj[playId]['tuo'] = arr;
	  }else{
	    //
	  }
	  calcZs();
	  //更新下选号区域
		upDataSelect();
	}
	function setBetContent() {
	  var betObj = HCCP.cc.betObj,
	    playId = HCCP.cc.playId;
	  var obj = betObj[playId] || {};

	  var tmp = (function(){
	      var arr = new Object();
	      arr.playId = playId;
	      arr.dan = obj['dan']||[];
	      arr.tuo = obj['tuo']||[];
	      if(0){ //胆玩法未添加
	        arr.isDan = 1;
	      }else{
	        arr.isDan = 0;
	      }
	      arr.zs = obj['zs']||0; 
	      arr.money = arr.zs * 2;  
	      return arr;
	     })();
	  var newAry = [tmp];
	  if(!HCCP.cc.content){
	    HCCP.cc.content = new Object();
	    HCCP.cc.content[HCCP.cc.lotyId] = new Array();
	  }

	  if(HCCP.cc.default_betcontent) {
	    var index = HCCP.cc.default_betcontent.confirm_id;
	    HCCP.cc.content[HCCP.cc.lotyId].splice(index,1);
	    HCCP.dataS.local.del("betid");
	  }
	  for (var i = newAry.length - 1; i >= 0; i--) {
	    HCCP.cc.content[HCCP.cc.lotyId].unshift(newAry[i])
	  }
	  HCCP.dataS.local.set("content", JSON.stringify(HCCP.cc.content));
	  return true;
	}
	//提交过去~~
	function doConfirm() {
	  if(!$(this).hasClass('active')){
	    return;
	  }
	  var tips = HCCP.cc.tips,
	    playId = HCCP.cc.playId,
	    betObj = HCCP.cc.betObj[playId] || {},
	    dantuo = betObj['dantuo'],
	    selectTips = HCCP.cc.selectTips;
	  // 无选号随机一注
	  if(!tips || !tips.hasSelect){
	    // 胆拖不随机  
	    if(dantuo){
	      HCCP.FUNC.alert(selectTips[1])
	    }else{
	      rand1();  
	    }
	    return;
	  }
	  //有选号不满条件
	  if(tips.hasTips){
	    HCCP.FUNC.alert(selectTips[tips.showTips]);
	    return;
	  }
	  //单行2万限制
	  // if($('footer .money').text()>20000){
	  //   return HCCP.FUNC.warning(selectTips[2]);
	  // }
	  //如果有一注了，那么就设置一下betContent，准备去投注确认页了
	  if(setBetContent()){
	    HCCP.FUNC.go(URL_DIGITAL_CONFIRM, true);
	  }else{
	    return;
	  } 
	}

	//显示设置
	function changeSetting(){
		var playId = HCCP.cc.playId,
			type = HCCP.cc.type;
		var wrap = $('.set-wrap');
		var ylEle = $('.set-yl',wrap),
			zxEle = $('.set-zx',wrap),
			tjEle = $('.set-tj',wrap);

		if(type == 0){
			ylEle.hide();
			zxEle.hide();
			tjEle.hide();
		}else{
			ylEle.show();
			zxEle.show();
			tjEle.show();
		}
	}
	//setting
	function showSetting(){
		var playId = HCCP.cc.playId;
		var type = HCCP.cc.type;
		var wrap = $('.set-wrap');
		var obj = HCCP.cc.defaultSet;
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
		HCCP.cc.defaultSet = {
			limit:qs,
			yl:yl,
			zx:zx,
			tj:tj
		};
		(function(){
			var betEle = $('#hc-bet-play');
			var setObj = HCCP.cc.defaultSet;
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
	function goBack() {
		HCCP.dataS.local.del('basicTb');
		self.location=document.referrer;
	}


});







