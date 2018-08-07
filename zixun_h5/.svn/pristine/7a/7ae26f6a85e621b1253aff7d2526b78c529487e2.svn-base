 var HCCP = {
 	getLotyNameById: function(lotyid) {
			var lotyname;
			lotyid = parseInt(lotyid);
			switch(lotyid) {
				// 大类
				case 1001:
					lotyname = "竞彩系列";
					break;
				case 1003:
					lotyname = "11选5系列";
					break;
				case 1005:
					lotyname = "快3系列";
					break;
				case 1:
					lotyname = "竞彩足球";
					break;
				case 2:
					lotyname = "竞彩篮球";
					break;
				case 3:
					lotyname = "北京单场";
					break;
				case 4:
					lotyname = "胜负彩";
					break;
				case 5:
					lotyname = "任选9场";
					break;
				case 6:
					lotyname = "猜冠亚军";
					break;
				case 10:
					lotyname = "双色球";
					break;
				case 11:
					lotyname = "大乐透";
					break;
				case 12:
					lotyname = "福彩3D";
					break;
				case 13:
					lotyname = "排列3";
					break;
				case 14:
					lotyname = "排列5";
					break;
				case 15:
					lotyname = "七星彩";
					break;
				case 16:
					lotyname = "七乐彩";
					break;
				case 20:
					lotyname = "新11选5";
					break;
				case 21:
					lotyname = "粤11选5";
					break;
				case 22:
					lotyname = "快乐11选5";
					break;
				case 23:
					lotyname = "鲁11选5";
					break;
				case 24:
					lotyname = "陕11选5";
					break;
				case 25:
					lotyname = "青11选5";
					break;	
				case 26:
					lotyname = "桂11选5";
					break;	
				case 27:
					lotyname = "赣11选5";
					break;	
				case 30:
					lotyname = "桂快3";
					break;
				case 31:
					lotyname = "赣快3";
					break;
				case 32:
					lotyname = "吉快3";
					break;
				case 40:
					lotyname = "赣快乐十分";
					break;
				case 41:
					lotyname = "桂快乐十分";
					break;	
				case 101:
					lotyname = "竞足单关";
					break;
				case 9999:
					lotyname = "更多彩种";
					break;
				default:
					lotyname = "彩种名加载中";
					break;
			}
			return lotyname
	},
 	trade: {
		//取彩种当前期号信息
		issue: function(lotyid) {
			lotyid = parseInt(lotyid);
			return HCCP.ajax.get('/trade/currentissue/' + lotyid);
		},
		
	},
	info: {
		//取遗漏
		omi: function(lotyid, type, limit) {
			if(type == undefined) {
				type = 1;
			}
			if(limit == undefined) {
				limit = 1;
			}
			lotyid = parseInt(lotyid);
			type = parseInt(type);
			limit = parseInt(limit);
			return HCCP.ajax.get('/info/getbetomitinfo/' + lotyid + "?type=" + type + "&limit=" + limit);
		},
		//走势信息
		trendinfo: function(lotyid,type,limit) {
			if(type == undefined) {
				type = 1;
			}
			if(limit == undefined) {
				limit = 5;
			}
			lotyid = parseInt(lotyid);
			type = parseInt(type);
			limit = parseInt(limit);
			return HCCP.ajax.get('/info/trendinfo/' + lotyid + '?limit=' + limit + '&type=' + type );
		},
		//冷热信息
		coldhotinfo: function(lotyid,type,limit) {
			if(type == undefined) {
				type = 1;
			}
			if(limit == undefined) {
				limit = 5;
			}
			lotyid = parseInt(lotyid);
			type = parseInt(type);
			limit = parseInt(limit);
			return HCCP.ajax.get('/info/coldhotinfo/' + lotyid + '?type=' + type  + '&limit=' + limit);
		},
		//取最新的开奖信息
		latelyissue: function(lotyid,num) {
			lotyid = parseInt(lotyid);
			num = num || 5;
			return HCCP.ajax.get('/info/latelyissueinfo/' + lotyid + "/" + num);
		},
		currentissue: function(lotyid) {
			lotyid = parseInt(lotyid);
			return HCCP.ajax.get('/trade/currentissue/' + lotyid);
		},
		//取最新的开奖信息
		win: function(lotyid) {
			lotyid = parseInt(lotyid);
			return HCCP.ajax.get('/info/winprizeinfo/' + lotyid + "/20");
		},
		chart: function(lotyid,playid,type,limit) {
			if(playid == undefined) {
				playid = 1;
			}
			if(type == undefined) {
				type = 1;
			}
			if(limit == undefined) {
				limit = 5;
			}
			lotyid = parseInt(lotyid);
			playid = parseInt(playid);
			type = parseInt(type);
			limit = parseInt(limit);
			return HCCP.ajax.get('/info/getchartinfo/' + lotyid + '?play_id=' + playid + '&type=' + type + '&limit=' + limit);
		},
		//取最新开奖号码
		winnum: function(lotyid) {
			lotyid = parseInt(lotyid);
			return HCCP.ajax.get('/info/getlatelywinnernum/' + lotyid);
		},
		//开奖信息
		award:function(lotyid,_date){
			var result;
			var getdata = {};
			getdata.identity = HCQD.identity();
			getdata.platform = HCQD.platform();
			$.ajax({
				type: "get",
				url:  REMOTE_DATA_URL+'/info/award/'+(lotyid ? lotyid : "")+ (_date ? "?date="+_date : "" ),
				async: false,
				data: getdata,
				//dataType: "jsonp",
				//jsonp: "callback",
				//jsonpCallback: "success_jsonpCallback",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				complete: function(data) {
					result = data.responseJSON;
				},
			});
			return result
		},
		awarddetails:function(lotyid,issue){
			return HCCP.ajax.get("/info/szcawarddetail/"+lotyid+"/"+issue);
		},
		getjcmatchinfo: function(lotyid,gameid){
			return HCCP.ajax.get("/info/getjcmatchinfo/"+lotyid+"?gameId="+gameid);
		},
		//广告信息
		advertinfo:function(lotyid){
			var adInfo = HCCP.ajax.get('/info/getadinfo/'+lotyid);
			return adInfo;
		}
	},
	live: {
		competition : function(id){
			return HCCP.ajax.get('/live/competition/'+id);
		},
		liveList : function(id,date,random){
			var result;
			var getdata = {};
			getdata.identity = HCQD.identity();
			getdata.platform = HCQD.platform();
			$.ajax({
				type: "get",
				url:  'http://api.letoula.com/live/liveList/'+id+"?date="+date+"&random="+random,
				async: false,
				data: getdata,
				//dataType: "jsonp",
				//jsonp: "callback",
				//jsonpCallback: "success_jsonpCallback",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				complete: function(data) {
					result = data.responseJSON;
				},
			});
			return result
		},
		server : function(){
			var result;
			var getdata = {};
			getdata.identity = HCQD.identity();
			getdata.platform = HCQD.platform();
			$.ajax({
				type: "get",
				url:  REMOTE_DATA_URL+'/live/server',
				async: false,
				data: getdata,
				//dataType: "jsonp",
				//jsonp: "callback",
				//jsonpCallback: "success_jsonpCallback",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				complete: function(data) {
					result = data.responseJSON;
				},
			});
			return result
		},
		getLocationGameId : function(date,lotyId){
			var result;
			var getdata = {};
			getdata.identity = HCQD.identity();
			getdata.platform = HCQD.platform();
			$.ajax({
				type: "get",
				url:  'http://api.letoula.com/live/getLocationGameId?date='+date+'&lotyId='+lotyId,
				async: false,
				data: getdata,
				//dataType: "jsonp",
				//jsonp: "callback",
				//jsonpCallback: "success_jsonpCallback",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				complete: function(data) {
					result = data.responseJSON;
				},
			});
			return result
		},
	},
	common: {
		index: function() {
			return HCCP.ajax.get('/common/index');
		},
		time: function() {
			return HCCP.ajax.get('/common/time');
		},
	},
	ajax: {
		//这里最好能改成不依赖于jquery
		_do: function(method, url, data) {
			if(method = "post") {
				var data = HCCP.ajax.post(url, data);
			} else {
				var data = HCCP.ajax.get(url);
			}
			if(data.code == undefined) {
				HCCP.FUNC.alert();
				return;
			}
		},
		_get:function(config){
			var settings = $.extend({},config||{},{
				data:{
					identity:HCQD.identity(),
					platform:HCQD.platform(),
					hctag: HCCP.dataS.cookie.get('hctag')
				},
				type:"GET",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true
			}),rs,_url=settings.url,_fn = settings.complete;

			settings.url = REMOTE_DATA_URL+_url;	
			settings.async = settings.async == undefined ? true : !!settings.async;
			settings.complete = function(data){
				rs = data.responseJSON;
				if(settings.async && _fn && typeof _fn == 'function'){
					_fn(rs);
				}
			}
			$.ajax(settings);
			if(!settings.async){
				return rs;
			}
		},
		//GET
		get: function(urlname,data) {
			var result;
			getdata = data || {};
			getdata.identity = HCQD.identity();
			getdata.platform = HCQD.platform();
			$.ajax({
				type: "get",
				url: REMOTE_DATA_URL + urlname,
				async: false,
				data: getdata,
				//dataType: "jsonp",
				//jsonp: "callback",
				//jsonpCallback: "success_jsonpCallback",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				complete: function(data) {
					result = data.responseJSON;
				},
			});
			return result;
		},
		_post:function(config){
			var settings = $.extend(true,{},config||{},{
				data:{
					identity: config.data && config.data.identity || HCQD.identity(),
					platform: config.data && config.data.platform || HCQD.platform(),
					hctag: HCCP.dataS.cookie.get('hctag')
				},
				type:"POST",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true
			}),rs,_url=settings.url,_fn = settings.complete;
			settings.url = REMOTE_DATA_URL+_url;
			settings.async = settings.async == undefined ? true : !!settings.async;
			settings.complete = function(data){
				rs = data.responseJSON;
				if(settings.async && _fn && typeof _fn == 'function'){
					_fn(rs);
				}
			}
			$.ajax(settings);
			if(!settings.async){
				return rs;
			}
		},
		//POST
		post: function(urlname, data) {
			var result = new Array();
			postdata = data || {};
			postdata.identity = HCQD.identity();
			postdata.platform = HCQD.platform();
			$.ajax({
				type: "post",
				url: REMOTE_DATA_URL + urlname,
				async: false,
				data: postdata,
				//dataType: 'jsonp',
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				complete: function(data) {
					//result = data.responseText.toString();
					//result = eval('(' + result + ')'); 
					result = data.responseJSON;
				},
			});
			return result;
		},
	},
	dataS: {
		session: {
			set: function(key, value) {
				try{
					window.sessionStorage.setItem(key, value);
				}catch(e){}
			},
			get: function(key) {
				try{
					return window.sessionStorage.getItem(key);
				}catch(e){}
			},
			del: function(key) {
				try{
					window.sessionStorage.removeItem(key);
				}catch(e){}
			},
			clean: function() {
				try{
					window.sessionStorage.clear();
				}catch(e){}
			},
		},
		local: {
			set: function(key, value) {
				try{
					window.localStorage.setItem(key, value);
				}catch(e){
					console.error('无痕模式')
				}
			},
			get: function(key) {
				try{
					return window.localStorage.getItem(key);
				}catch(e){
					console.error('无痕模式')
				}
			},
			del: function(key) {
				try{
					window.localStorage.removeItem(key);
				}catch(e){
					console.error('无痕模式')
				}
			},
			clean: function() {
				try{
					window.localStorage.clear();
				}catch(e){
					console.error('无痕模式')
				}
			},
		},
		cookie: {
			//设置cookies
			set: function (name, value, stime, cookieurl) {
	        	var strsec = exp = '';
	        	if(stime && stime.length){
	        		strsec = HCCP.dataS.cookie.getsec(stime);
	        	}
	        	if(strsec){
	        		var d = new Date();
	            	d.setTime(d.getTime() + strsec * 1 + d.getTimezoneOffset() * 60);
	            	exp = d.toGMTString();
	        	}
	            var cookieurl = cookieurl?cookieurl:'';
	            document.cookie = name + "=" + encodeURIComponent(value) + "; path=/;domain=" + cookieurl + ";expires=" + exp;
	        }, 		
			//读取cookies
			get: function (name) {
				var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
				if (arr = document.cookie.match(reg))
					return decodeURIComponent(arr[2]);
				else
					return null;
			},
			//删除cookies
			del: function (name) {
				var exp = new Date();
				exp.setTime(exp.getTime() - 1);
				var cval = HCCP.dataS.cookie.get(name);
				if (cval != null)
					HCCP.dataS.cookie.set(name, '', "s-3600");
				//document.cookie = name + "=" + cval + ";expire=" + exp.toGMTString();
			},
			//s20是代表20秒
			//h是指小时，如12小时则是：h12
			//d是天数，30天则：d30
			getsec: function (str) {
				//alert(str);
				var str1 = str.substring(1, str.length) * 1;
				var str2 = str.substring(0, 1);
				var sec = '';
				if (str2 == "s") {
					sec = str1 * 1000;
				} else if (str2 == "h") {
					sec = str1 * 60 * 60 * 1000;
				} else if (str2 == "d") {
					sec = str1 * 24 * 60 * 60 * 1000;
				}
				//sec += 8*60*60*1000;
				return sec;
			}
		}
	},
	MATH: {
		array:{
			max:function(arr){
				return Math.max.apply(Math, arr);
			},
			min:function(arr){
				return Math.min.apply(Math, arr);
			},
		},
	},
	back: {
		history: function(a){
			window.history.go(-1);
		},
	},
	Shake: {
		listen: function(options) {
			var defaults = {
				SHAKE_THRESHOLD: 3000,
				callback: null,
			}
			var last_update = 0;
			var isShake = 1;
			var x,
				y,
				z,
				last_x,
				last_y,
				last_z;
			var settings = $.extend(defaults, options || {}),
				$this;

			function deviceMotionHandler(eventData) {
				var acceleration = eventData.accelerationIncludingGravity;
				var curTime = new Date().getTime();
				if((curTime - last_update) > 100 && isShake == 1) {
					var diffTime = curTime - last_update;
					last_update = curTime;
					x = acceleration.x;
					y = acceleration.y;
					z = acceleration.z;
					var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
					if(speed > settings.SHAKE_THRESHOLD) {
						isShake = 0;
						if('vibrate' in navigator){
							navigator.vibrate(200);
						}
						settings.callback();
					}
					last_x = x;
					last_y = y;
					last_z = z;
				} else {
					if((curTime - last_update) > 500) {
						isShake = 1;
					}
					//isShake = 1;
				}
			}

			function _callback() {
				if(settings.callback && typeof settings.callback == 'function') {
					settings.callback();
				}
			}

			function _init() {
				if(window.DeviceMotionEvent) {
					window.addEventListener('devicemotion', deviceMotionHandler, false);
				}
			}
			_init();
		}
	},
	modal: {
		alert: function(options) {
			var defaults = {
				alertBtn: "确定",
				msg: "",
				title: "",
				alertCallback: null,
				end:null,
				closeViaDimmer:false,
				className:'',
				yesClose: true
			}
			var settings = $.extend(defaults, options || {});
			layer.open({
				type:0,
				title:settings.title,
				content:settings.msg,
				btn:settings.alertBtn,
				shadeClose:settings.closeViaDimmer,
				className: settings.className,
				// skin:demo-class,
				yes:function(index){
					if(settings.yesClose){
						layer.close(index)
					};
					if(settings.alertCallback && typeof settings.alertCallback == 'function') {
						settings.alertCallback();
					}
				},
				end:function(){
					if(settings.end && typeof settings.end == 'function') {
						settings.end();
					}
				},
				success:function(){
					if(settings.success && typeof settings.success == 'function') {
						settings.success(arguments[0]);
					}
				}
			});	
		},
		confirm: function(options) {
			//要判断一下，如果没modal，用原生
			var defaults = {
				cancelBtnLbl: "取消",
				confirmBtnLbl: "确认",
				msg: "",
				title: "",
				confirmCallback: null,
				cancelCallback: null,
				end:null,
				closeViaDimmer:false,
				success:null,
				className:'',
				yesClose:true
			}
			var settings = $.extend(defaults, options || {});	
			layer.open({
				type:0,
				title:settings.title,
				content:settings.msg,
				btn:[settings.confirmBtnLbl,settings.cancelBtnLbl],
				shadeClose:settings.closeViaDimmer,
				className: settings.className,
				yes:function(index){
					if(settings.yesClose){
						layer.close(index)
					};
					if(settings.confirmCallback && typeof settings.confirmCallback == 'function') {
						settings.confirmCallback(index);
					}
				},
				no:function(){
					if(settings.cancelCallback && typeof settings.cancelCallback == 'function') {
						settings.cancelCallback();
					}
				},
				end:function(){
					if(settings.end && typeof settings.end == 'function') {
						settings.end();
					}
				},
				success:function(){
					if(settings.success && typeof settings.success == 'function') {
						settings.success(arguments[0]);
					}
				},
			});
		},
		warning: function(options) {
			var defaults = {
				title: "",
				msg: "",
				closeViaDimmer: true,
				closetime: 2000
			}
			settings = $.extend(defaults, options || {})
			layer.open({
				type:0,
				title:settings.title,
				content:settings.msg,
				shadeClose:settings.closeViaDimmer,
				time:settings.closetime?settings.closetime/1000:0,
				end:function(){
					if(settings.end && typeof settings.end == 'function') {
						settings.end();
					}
				}
			});
		},
		showText:function(options){
			var defaults = {
				noTitle:false,
				title: '',
				msg: "",
				closeViaDimmer: false,
				className:'',
				success: null,
				end:null
			}
			settings = $.extend(defaults, options || {})
			if(settings.noTitle){
				settings.title = '';
			}else{
				settings.msg = '<header class="hc-head-wrap"><div class="hc-head"><div class="hc-head-left"><span class="head-icon head-icon-back layer-close"></span></div><div class="hc-head-title">' + settings.title + '</div></div></header>' + settings.msg;
				settings.title = '';
			}
			layer.open({
				type:1,
				title:settings.title,
				content:settings.msg,
				shadeClose:settings.closeViaDimmer,
				className: settings.className,
				shade: 'background-color: #f4f4f4',
				style:'width:100%;height:100%;background-color:#f4f4f4;overflow:auto;',
				success:function(res){
					$(res).find('.layer-close').click(function(){
						layer.close($(res).attr('index'));
					})
					if(settings.success && typeof settings.success == 'function') {
						settings.success(res);
					}
				},
				end:function(){
					if(settings.end && typeof settings.end == 'function') {
						settings.end();
					}
				}
			});
		}
	},
	WX:{
		config:function(){
			$.ajax({
				type: "get",
				url: "//weixin.letoula.com/getTicket.php",
				async: false,
				data: {
					"url": location.href.split('#')[0],
				},
				dataType: "jsonp",
				jsonp: "callback",
				jsonpCallback: "success_jsonpCallback",
				//xhrFields: {
				//	withCredentials: true
				//},
				//crossDomain: true,
				complete: function(data) {
					var wxdata = data.responseJSON.data;
					//alert(JSON.stringify(wxdata));
					wx.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: 'wx0ecdc401e6029edc', // 必填，公众号的唯一标识
						timestamp: wxdata.timestamp, // 必填，生成签名的时间戳
						nonceStr: wxdata.noncestr, // 必填，生成签名的随机串
						signature: wxdata.signature, // 必填，签名，见附录1
						jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"]
					});
				},
			});
		},
	},
	FUNC: {
		filterAry: function(ary){
			var arr = $.isArray(ary) ? ary.slice(0) : [];
		    var temp = [];
		    for (var i in arr) {
		      if (arr[i] !== "" && arr[i] !== undefined) {
		        temp.push(arr[i])
		      }
		    }
		    return temp;
		},
		browser: function() {
			//versions: function() {
			var u = navigator.userAgent,
				app = navigator.appVersion;
			return {
				trident: u.indexOf('Trident') > -1, //IE内核
				presto: u.indexOf('Presto') > -1, //opera内核 
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核 
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核 
				mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端 
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
				android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端 
				iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器 
				iPad: u.indexOf('iPad') > -1, //是否iPad 
				webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部 
				weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增） 
				qq: u.match(/\sQQ/i) == " qq" //是否QQ 
			};
			//}(),
			//language: (navigator.browserLanguage || navigator.language).toLowerCase()
		},
		download:function(){
			HCCP.FUNC.go("//a.app.qq.com/o/simple.jsp?pkgname=com.houcai.letoula&ckey=CK1351789483433");
     		return;
			// var browser = HCCP.FUNC.browser();
			// if(!browser.iPhone) {
			// 		HCCP.FUNC.go(URL_DOWNLOAD_APK);
			// }else{
			// 	if(browser.webApp || browser.weixin || browser.qq) {
			// 		HCCP.FUNC.go(URL_DOWNLOAD);
			// 	}else{
			// 		HCCP.FUNC.go(URL_DOWNLOAD_IOS);
			// 	}
			// }
		},
		warning: function(msg) {
			if(typeof msg == "object"){
				HCCP.modal.warning(msg);
			}else{
				HCCP.modal.warning({
					"msg": msg
				});				
			}
			return;
		},
		alert: function(msg) {
			if(typeof msg == "object"){
				HCCP.modal.alert(msg);
			}else{
				HCCP.modal.alert({
					"msg": msg
				});				
			}
			return;
		},
		confirm: function(msg) {
			if(typeof msg == "object"){
				HCCP.modal.confirm(msg);
			}else{
				HCCP.modal.confirm({
					"msg": msg
				});				
			}
			return;
		},
		addUrlPara: function(url, para) {
			var e = (url + "").split("#"),
				t = e[0].indexOf("?") + 1 ? "&" : "?";
			return e[0] + t + para + (e.length > 1 ? "#" + e[1] : "")
		},
		getUrlParam: function(name,url){
	        var u = (typeof url == 'string')?url:window.location.search;
	        u = u.indexOf("?")>-1?u.substr(u.indexOf("?")+1):u;
	        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	        var r = u.match(reg);
	        if (r!=null) return decodeURIComponent(r[2]); return null;
	    },
		go: function(url,noclean) {
			//你都要走了，session数据就清了吧
			// if(noclean==undefined || noclean==false){
			// 	HCCP.dataS.session.clean();
			// }
			// url = HCCP.FUNC.addUrlPara(url,'')
			window.location.href = url;
			return;
		},
		/**
		 * @abstract 当前时间格式化
		 * @param {Object} num 取几位，年1位，年月2位....年月日时分秒6位
		 * @param {Object} f1 年月日的分隔符号
		 * @param {Object} f2 时分秒的分隔符号
		 * @param {Object} f3 年与时的分隔
		 */
		date: function(str) {
			var myDate = new Date();
			var myArray = Array();
			var tmp = myDate.getFullYear();
			tmp = tmp.toString();
			myArray["Y"] = tmp;
			myArray["y"] = tmp.substr(2, 2);
			myArray["m"] = myDate.getMonth() + 1;
			myArray["d"] = myDate.getDate();
			myArray["H"] = myDate.getHours();
			myArray["i"] = myDate.getMinutes();
			myArray["s"] = myDate.getSeconds();
			for(i in myArray) {
				if(myArray[i] < 10) {
					myArray[i] = "0" + myArray[i];
				}
			}
			str.split();
			var rs = '';
			for(i in str) {
				if(myArray[str[i]] == undefined) {
					rs += str[i];
				} else {1
					rs += myArray[str[i]];
				}
			}
			return rs;
		},
		week: function(datestr) {
			var wk = ["日", "一", "二", "三", "四", "五", "六"];
			if(datestr == undefined) {
				var dateObj = new Date();
			} else {
				var formatTime = datestr.substr(0, 4) + "/" + datestr.substr(4, 2) + "/" + datestr.substr(6, 2);
				var dateObj = new Date((new Date(formatTime)).getTime());
			}
			return wk[dateObj.getDay()];
		},
		from_unixtime: function(Hunixtime, type) {

			var unixtime = parseInt(Hunixtime) * 1000;
			var DataObj = new Date(unixtime);
			var dateY = DataObj.getFullYear();
			var dateM = DataObj.getMonth() + 1;
			var dateD = DataObj.getDate();
			var dateH = DataObj.getHours();
			var dateI = DataObj.getMinutes();
			var dateS = DataObj.getSeconds();
			dateM = dateM < 10 ? '0' + dateM : dateM;
			dateD = dateD < 10 ? '0' + dateD : dateD;
			dateH = dateH < 10 ? '0' + dateH : dateH;
			dateI = dateI < 10 ? '0' + dateI : dateI;
			dateS = dateS < 10 ? '0' + dateS : dateS;
			dateH = dateH == 24? '00' : dateH;
			if(type == "standard") {
				return dateY + "-" + dateM + "-" + dateD + " " + dateH + ":" + dateI + ":" + dateS;
			}
			return dateY + dateM + dateD + dateH + dateI + dateS;
		},
		diff_time: function(diff) {
			var serverTime = HCCP.common.time();
			var localTime = new Date();
			if(!serverTime || serverTime.code == undefined || serverTime.code != 200) {
				serverTime = Math.floor(localTime.getTime()/1000);
			} else {
				var unixtime = parseInt(serverTime.data.serverTime) * 1000;
				serverTime = serverTime.data.serverTime;
			}
			var diffTime = unixtime - localTime.getTime();
			if(diff == undefined) {
				return serverTime;
			}
			return diffTime;
		},
		trim:function(str){
			return str.replace(/(^\s*)|(\s*$)/g, '');
		},
		number_format: function(num) {
		    var new_num = parseFloat(num);
		    if(isNaN(new_num)) return num 
		    else return (new_num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
		},
	},
}
!function (){
	window.addEventListener('load', function() {
		try{
			FastClick.attach(document.body);
		}catch(e){}	  
	}, false);
}();

/******键盘*********/
$.fn.numKeyBoard = function(config) {
  if (!config) {
    config = {};
  }
  var target = $(this),
    targetTxt = target.text() || '',
    configAll = $.extend({
      keyBoardId: 'mult_keyboard',
      fastKey: '.fast_key',
      minVal: 1,
      maxVal: 500000,
      after: '',
      defVal: targetTxt.replace(/[^\d]/g, ''),
      quickHtml: '',
      destroy: false,
      callBack: function() {},
      active: false,
      activeCallback: function() {}
    }, config);
  var _keyBoard = $("#" + configAll.keyBoardId);
  if (_keyBoard.length) {

    _keyBoard.find('.sure').trigger('click', 'close');
  }
  configAll.selectValue = function() {
    configAll.defVal = target.text();
    target.html('<em class="inner_val">' + configAll.defVal + '</em>');
  };
  if (configAll.destroy) {
    configAll.selectValue();
    target.addClass('blink');
  } else if (configAll.active) {
    configAll.selectValue();
    target.addClass('blink');
    if (typeof configAll.activeCallback == 'function') {
      configAll.activeCallback();
    }
  } else {
    target.off("click", configAll.selectValue).on("click", configAll.selectValue);
  }
  configAll.clickInit = function() {
    var keyBoard = $('#' + configAll.keyBoardId),
      fastKey = $(configAll.fastKey, keyBoard),
      ctrlKey = $('.ctrl_key', keyBoard);
    var showKey = $('.showSelectInput', keyBoard);
    ctrlKey.click(function(event, type) {
      fastKey.removeClass('active');
      var data = $(this).attr('value'),
        oldVal = target.text().replace(/[^\d]/g, ''),
        newVal = '&nbsp;';
      if (data == 'sure') {
        if (Number(oldVal) <= configAll.minVal) {
          target.text(configAll.minVal);
          showKey.text(configAll.minVal);
          oldVal = configAll.minVal;
          configAll.defVal = configAll.minVal;
        } else {
          target.text(configAll.defVal);
          showKey.text(configAll.defVal);
        }
        if (configAll.destroy) {
          target.removeClass('blink');
          keyBoard.remove();
        } else if (configAll.active) {
          target.removeClass('blink');
          keyBoard.remove();
        } else {
          keyBoard.hide();
        }
        configAll.callBack.call(this, +oldVal, 'Y', target, type);
      } else if (data == 'del') {
        if (!$('.inner_val', target).length) {
          var len = oldVal.length;
          newVal = oldVal.substr(0, len - 1);
          if (!newVal) {
            newVal = '&nbsp;';
          }
        } else {
          newVal = '&nbsp;';
        }

        target.html(newVal);
        showKey.html(newVal);
        configAll.defVal = newVal;
        configAll.callBack.call(this, +newVal, 'N', target);
      } else {
        if ($('.inner_val', target).length) {
          newVal = Number(data);
        } else {
          newVal = Number(oldVal + data);
        }
        // if (newVal * 1 < configAll.minVal) {
        //   newVal = configAll.minVal;
        // }
        if (newVal > configAll.maxVal) {
          newVal = configAll.maxVal;
        }
        target.html(newVal);
        showKey.html(newVal);
        configAll.defVal = newVal;
        configAll.callBack.call(this, +newVal, 'N', target);
      }
      return false;
    });
    fastKey.click(function() {
      $(this).addClass('active').siblings().removeClass('active');
      var data = $(this).attr('value'),
        oldVal = target.text().replace(/[^\d]/g, ''),
        newVal = Number(data);
      target.html(newVal);
      showKey.html(newVal);
      configAll.defVal = newVal;
      configAll.callBack.call(this, +newVal, 'N', target);
      return false;
    });
    if (configAll.destroy) {
      keyBoard.find('table').click(function() {
        return false;
      })
      keyBoard.click(function() {
        $('.sure', keyBoard).click();
      })
    }
  };

  configAll.getKeyBoardHtml = function() {
    var tbody = '<tbody><tr><td class="ctrl_key" value="1">1</td><td class="ctrl_key" value="2">2</td><td class="ctrl_key" value="3">3</td></tr><tr><td class="ctrl_key" value="4">4</td><td class="ctrl_key" value="5">5</td><td class="ctrl_key" value="6">6</td></tr><tr><td class="ctrl_key" value="7">7</td><td class="ctrl_key" value="8">8</td><td class="ctrl_key" value="9">9</td></tr><tr><td class="ctrl_key sure" value="sure">确定</td><td class="ctrl_key" value="0">0</td><td class="ctrl_key del" value="del">删除</td></tr></tbody>';
    if (configAll.destroy) {
      var _input = '<tbody><tr id="showSelectInput"><td colspan="3"><span class="showSelectInput blink"><em class="inner_val">' + configAll.defVal + '</em></span></td></tr></tbody>';
      var html = '<div id="' + configAll.keyBoardId + '" class="keyboard_wrap" style="background-color:rgba(0,0,0,0.8)"><table class="keyboard">' + _input + configAll.quickHtml + tbody + '</table></div>';
    } else if (configAll.active) {
      var html = '<table id="' + configAll.keyBoardId + '" class="keyboard">' + configAll.quickHtml + tbody + '</table>';
    } else {
      var html = '<table id="' + configAll.keyBoardId + '" class="keyboard hide">' + configAll.quickHtml + tbody + '</table>';
    }
    $(configAll.after).append(html);
    configAll.clickInit();
  };
  configAll.getKeyBoardHtml();
  return target;
};









