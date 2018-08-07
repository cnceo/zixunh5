$(function(){

    // debug 用于调试websocket
    var debug = window.location.search=="?debug=1"?1:0;

    //mobile debug
    var m_debug = window.location.search=="?m_debug=1"?1:0;

    //平台判断
    var getUrlParam = function(name,url){
        var u = (typeof url == 'string')?url:window.location.search;
        u = u.indexOf("?")>-1?u.substr(u.indexOf("?")+1):u;
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = u.match(reg);
        if (r!=null) return decodeURIComponent(r[2]); return null;
    };

    var object = {
        //五大联赛
        fiveLeague:["英超","西甲","意甲","德甲","法甲"],
        //存储本地时间，在在浏览器未激活状态时与本地时间判定相差30'内直接开启websocket,30'后直接强刷页面
        localTime:0,
        //存储websocket重复请求的数据判定,t为间隔时间
        t:0,
        //刷新时页面的定位
        refreshLocation : -1,
        //防重判定
        canClick:{
            left : 1,   //上一期
            mid : 1,    //期号选择
            right : 1   //下一期
        },

        //默认彩种id
        lotyId:1,

        //请求的接口数据
        data:{},

    };
    var ajax = {
        getdate : function(lotyId,callBack){

            var random = Math.random();
            // var lotyId = obj.lotyId;
            var date   = 0;

            //切换彩种或者第一次进来时请求时传的date为0，会有competion的存在，否则则没有  
            if(object.data.competition){
                date = object.data.competition.activeTimeOrIssue
            }

            HCCP.ajax._get({
                url:'/live/getLiveList?lotyId='+lotyId+'&date='+date+"&random="+random,
                async:true,
                complete:function(res){
                    if(res&&res.code==200){
                        $(".refresh").show();

                        //储存lotyId
                        object.lotyId = lotyId;

                        if(res.data.competition){
                            $.extend(true,object.data,res.data);
                        }else{
                            object.data.list=res.data.list
                            object.data.locationGameId=res.data.locationGameId
                        }
                        if(callBack && typeof(callBack)=="function"){
                            callBack();
                        }
                    }else{
                        $(".bf-wrap ul").html(jsbf.HTML.loaderror());
                        $(".refresh").hide();
                        $(".bf-wrap").on("click",".looerrorBtn",function(){
                            window.location.reload();
                        })
                        HCCP.modal.warning({
                            msg:"网络异常"
                        })
                    }
                    $(".Omask").remove();
                }
            })
        }
    };
    

    (function($, window, document, undefined) {
        var $window = $(window);

        $.fn.lazyload = function(options) {
            var elements = this;
            var $container;
            var settings = {
                threshold       : 0,
                failure_limit   : 0,
                event           : "scroll",
                effect          : "show",
                container       : window,
                data_attribute  : "original",
                skip_invisible  : true,
                appear          : null,
                load            : null,
                placeholder     : null
            };

            function update() {
                var counter = 0;

                elements.each(function() {
                    var $this = $(this);
                    if (settings.skip_invisible && !$this.is(":visible")) {
                        return;
                    }
                    if ($.abovethetop(this, settings) ||
                        $.leftofbegin(this, settings)) {
                    } else if (!$.belowthefold(this, settings) &&
                        !$.rightoffold(this, settings)) {
                            $this.trigger("appear");
                            counter = 0;
                    } else {
                        if (++counter > settings.failure_limit) {
                            return false;
                        }
                    }
                });

            }

            if(options) {
                if (undefined !== options.failurelimit) {
                    options.failure_limit = options.failurelimit;
                    delete options.failurelimit;
                }
                if (undefined !== options.effectspeed) {
                    options.effect_speed = options.effectspeed;
                    delete options.effectspeed;
                }

                $.extend(settings, options);
            }

            $container = (settings.container === undefined ||
                          settings.container === window) ? $window : $(settings.container);

            if (0 === settings.event.indexOf("scroll")) {
                $container.bind(settings.event, function() {
                    return update();
                });
            }

            this.each(function() {
                var self = this;
                var $self = $(self);

                self.loaded = false;

                if ($self.attr("src") === undefined || $self.attr("src") === false) {
                    if ($self.is("img")) {
                        $self.attr("src", settings.placeholder);
                    }
                }else{
                    return
                }

                $self.one("appear", function() {
                    if (!this.loaded) {
                        if (settings.appear) {
                            var elements_left = elements.length;
                            settings.appear.call(self, elements_left, settings);
                        }
                        $("<img />")
                            .bind("load", function() {

                                var original = $self.attr("data-" + settings.data_attribute);
                                $self.hide();
                                if ($self.is("img")) {
                                    $self.attr("src", original);
                                } else {
                                    $self.css("background-image", "url('" + original + "')");
                                };
                                $self[settings.effect](settings.effect_speed);

                                // var time = settings.info.config.time;
                                // var key = $self.parents("li").data("key");
                                // if($self.parent().hasClass("team-l")){
                                //     settings.info.liveList.list[time][key].hostLogoLoad = original
                                // }else{
                                //     settings.info.liveList.list[time][key].guestLogoLoad = original
                                // };
                                self.loaded = true;

                                var temp = $.grep(elements, function(element) {
                                    return !element.loaded;
                                });
                                elements = $(temp);

                                if (settings.load) {
                                    var elements_left = elements.length;
                                    settings.load.call(self, elements_left, settings);
                                }
                            })
                            .attr("src", $self.attr("data-" + settings.data_attribute))
                            .bind("error",function(){
                                if ($self.is("img")) {
                                    $self.attr("src", settings.placeholder);
                                } else {
                                    $self.css("background-image", "url('" + settings.placeholder + "')");
                                };
                            })
                    }
                });

                if (0 !== settings.event.indexOf("scroll")) {
                    $self.bind(settings.event, function() {
                        if (!self.loaded) {
                            $self.trigger("appear");
                        }
                    });
                }
            });

            $window.bind("resize", function() {
                update();
            });

            if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
                $window.bind("pageshow", function(event) {
                    if (event.originalEvent && event.originalEvent.persisted) {
                        elements.each(function() {
                            $(this).trigger("appear");
                        });
                    }
                });
            }

            /* Force initial check if images should appear. */
            $(document).ready(function() {
                update();
            });

            return this;
        };

        $.belowthefold = function(element, settings) {
            var fold;

            if (settings.container === undefined || settings.container === window) {
                fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
            } else {
                fold = $(settings.container).offset().top + $(settings.container).height();
            }

            return fold <= $(element).offset().top - settings.threshold;
        };

        $.rightoffold = function(element, settings) {
            var fold;

            if (settings.container === undefined || settings.container === window) {
                fold = $window.width() + $window.scrollLeft();
            } else {
                fold = $(settings.container).offset().left + $(settings.container).width();
            }

            return fold <= $(element).offset().left - settings.threshold;
        };

        $.abovethetop = function(element, settings) {
            var fold;

            if (settings.container === undefined || settings.container === window) {
                fold = $window.scrollTop();
            } else {
                fold = $(settings.container).offset().top;
            }

            return fold >= $(element).offset().top + settings.threshold  + $(element).height();
        };

        $.leftofbegin = function(element, settings) {
            var fold;

            if (settings.container === undefined || settings.container === window) {
                fold = $window.scrollLeft();
            } else {
                fold = $(settings.container).offset().left;
            }

            return fold >= $(element).offset().left + settings.threshold + $(element).width();
        };

        $.inviewport = function(element, settings) {
             return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                    !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
         };

        $.extend($.expr[":"], {
            "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
            "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
            "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
            "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
            "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
            "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
            "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
            "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
        });

    })(jQuery, window, document);

	//新建自定义插件 公用方法
	$.fn.extend({
        //切换状态
		toggleActive:function(){
			return this.addClass("active").siblings().removeClass("active");
		},
        
	})
    var jumpURL = {
        FUNC : {
            getUrlParam: function(name,url){
                var u = (typeof url == 'string')?url:window.location.search;
                u = u.indexOf("?")>-1?u.substr(u.indexOf("?")+1):u;
                var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                var r = u.match(reg);
                if (r!=null) return decodeURIComponent(r[2]); return null;
            },
            getTradeUrlById: function(lotyid){
                var _url = URL_INDEX;
                var id = parseInt(lotyid);
                switch(id){
                    case 1:
                        _url = URL_TRADE_JCZQ;
                        break;
                    case 2:
                        _url = URL_TRADE_JCLQ;
                        break;
                    case 3:
                        _url = URL_TRADE_ZQDC;
                        break;
                    case 20:
                        _url = URL_TRADE_11x5 + "?20";
                        break;
                    case 21:
                        _url = URL_TRADE_11x5 + "?21";
                        break;
                    case 23:
                        _url = URL_TRADE_11x5 + "?23";
                        break;
                    case 24:
                        _url = URL_TRADE_11x5 + "?24";
                        break;   
                    case 10:
                        _url = URL_TRADE_SSQ;
                        break;
                    case 11:
                        _url = URL_TRADE_DLT;
                        break;
                    case 12:
                        _url = URL_TRADE_FC3D;
                        break;
                    default:
                        break;
                }
                return _url;
            },
            getProjectUrl: function(lotyid,projectid){
                var _url = URL_USER_BETLIST;
                var id = parseInt(lotyid);
                switch (+lotyid){
                    case 1:
                        _url = URL_TRADE_PROJECT_JCZQ+"?"+projectid;
                        break;
                    case 2:
                        _url = URL_TRADE_PROJECT_JCLQ+"?"+projectid;
                        break;
                    case 3:
                        _url = URL_TRADE_PROJECT_ZQDC+"?"+projectid;
                        break;
                    case 10:
                    case 11:
                        _url = URL_SSQ_PROJECT+"?"+lotyid+"&"+projectid;
                        break;
                    case 12:
                        _url = URL_FC3D_PROJECT+"?"+lotyid+"&"+projectid;
                        break;    
                    case 20:
                    case 21:
                    case 23:
                        _url = URL_11X5_PROJECT+"?"+lotyid+"&"+projectid;
                        break;
                    default:
                        break;
                }
                return _url;
            },
            getProtocolAddr: function(identity){
                var protocolAddr;
                switch(identity) {
                    case "com.houcai.letoula":
                        protocolAddr = "houcailetoula";
                        break;
                    case "com.houcai.monkey":
                        protocolAddr = "houcailetouladev";
                        break;
                    case "com.houcai.letoulacaipiao":
                        protocolAddr = "houcailetoulacaipiao";
                        break;
                    case "com.houcai.lottery":
                        protocolAddr = "houcailetoulalottery";
                        break;
                    case "com.houcai.letoulamaincaipiao":
                        protocolAddr = "houcailetoulamaincaipiao";
                        break;    
                    case "com.houcai.lotteryssq":
                        protocolAddr = "houcailotteryssq";
                        break;
                    case "com.houcai.lotteryfc3d":
                        protocolAddr = "houcailotteryfc3d";
                        break;
                    case "com.houcai.lotteryssc":
                        protocolAddr = "houcailotteryssc";
                        break;
                    default:
                        var reg = /^com\.(houcai)\.(qimeng[1-9])([0-9]{0,2})$/;
                        var reg1 = /^com\.(houcai)\.(lottery[1-9])([0-9]{0,2})$/;
                        if(reg.test(identity)){
                            protocolAddr = identity.replace(reg,function($1,$2,$3,$4){
                                return $2+'letoula'+$3+$4;
                            })
                        }else if(reg1.test(identity)){
                            protocolAddr = identity.replace(reg1,function($1,$2,$3,$4){
                                return $2+$3+$4;
                            })
                        }else{
                            protocolAddr = "houcailetoulacaipiao";
                        }
                        break;
                }
                return  protocolAddr;     
            },
            getParamStr: function (param, key, encode) {
                if(param==null) return '';
                    var paramStr = '';
                    var t = typeof (param);
                if (t == 'string' || t == 'number' || t == 'boolean') {
                    paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
                } else {
                    for (var i in param) {
                        var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                        paramStr += urlEncode(param[i], k, encode);
                    }
                }
                return paramStr;
            }
        },
        getH5Url: function(url){
            var clickType = +jumpURL.FUNC.getUrlParam("clickType",url);
            var _url = URL_INDEX;
            switch (clickType){
                case 1:          //彩种购买页面
                case 13:
                    _url = jumpURL.FUNC.getTradeUrlById(jumpURL.FUNC.getUrlParam("clickValueInt",url));
                    break;
                case 2:          //充值页面
                    _url = URL_USER_RECHARGE;
                    break;
                case 3:          //购买红包页面
                    _url = URL_USER_BUYREDPACKET+'?'+url;
                    break;
                case 4:          //跳转方案详情页
                    var str = jumpURL.FUNC.getUrlParam("clickValueStr",url),
                        l_id = str.split("|")[0] || '',
                        p_id = str.split("|")[1] || '';
                    _url = jumpURL.FUNC.getProjectUrl(l_id,p_id);
                    break;
                case 5:          //我的帐号页
                    _url = URL_USER_INDEX;
                    break;
                case 6:          //中奖方案列表
                    _url = URL_USER_BETLIST + "?type=3";
                    break;
                case 7:          //开奖列表
                    _url = URL_INFO_KAIJIANG;             /**彩种对应待添加**/
                    break;
                case 8:          //开奖号码详情 
                    _url = URL_INFO_KAIJIANG;             /**暂时跳开奖公告**/ 
                    break;
                case 9:          // H5页面
                    _url = URL_INDEX;
                    break;
                case 10:          //公告列表             /**待-暂跳首页**/
                case 11: 
                case 12:        
                    _url = URL_INDEX;
                    break;
                case 14:          //跳转注册页面
                    _url = URL_USER_REGISTER;
                    break;
                case 15:          //跳登录页面
                    _url = URL_USER_LOGIN;
                    break;
                default :        //首页     
                    break;
            }
            return _url;
        },
        getIosUrl:function(search){
            var e = (search + "").split("#");
            var arr = e[0].split("&");
            for(var i in arr){
                var l = arr[i].split("=")[0],
                    r = encodeURIComponent(arr[i].split("=")[1]);
                arr[i] = l+"="+r;
            }
            arr = arr.join("&");
            search = arr + (e.length > 1 ? "#" + e[1] : "");
            var schemes = jumpURL.FUNC.getProtocolAddr(jumpURL.FUNC.getUrlParam('identity'));
            url = schemes + "://" + "gotoView?" + search;
            url += "&app_key=" + $.md5(url + "9856f60bdd826d72395519898375974c");
            return url;
        },
        getAndroidUrl: function(search){
            var schemes = 'houcailetoula';
            url = schemes + "://" + "gotoView?" + search;
            url += "&app_key=" + $.md5(url + "9856f60bdd826d72395519898375974c");
            return url;
        },
        go: function(param,platform){
            if(typeof param == 'object'){
                var search = jumpURL.FUNC.getParamStr(param);
            }else{
                var search = param;
                search = search.indexOf("?")>-1?search.substr(search.indexOf("?")+1):search;
            }
            var plat = parseInt(platform,10);
            if(isNaN(plat) || !plat){
                plat = jumpURL.FUNC.getUrlParam("platform");
            }
            if(plat == 1){
                window.location.href = jumpURL.getIosUrl(search);
            }else if(plat ==2){
                window.location.href = jumpURL.getAndroidUrl(search);
            } else{
                HCCP.FUNC.go(jumpURL.getH5Url(search))
            }
        }
    }
   

    //main 主函数
    var jsbf = {
        HTML : {
            ad : function(cla,img){
                var html = '<img class="'+cla+'" src="'+img+'" width="100%">';
                return html
            },
            issue : function(arr){
                var html = '<ul class="hc-cf">';
                $.each(arr,function(key,val){
                    var time = parseInt($(".time").data("time"))
                    html += '<li class="'+(val.time==time ? "active" : "")+'" data-attribution="'+val.attribution+'" data-time="'+val.time+'"><span>'+val.attribution+'</span></li>';
                });
                html += '</ul>';
                return html
            },
            loading : function(){
                var html  = '<div class="loading"><div></div><span>数据加载中...</span></div>';
                return html
            },
            Omask : function(){
                var html = '<div class="Omask"></div>';
                return html
            },
            loaderror : function(){
                var html  = '<div class="loaderror"><div></div><span class="sp1">加载失败~</span>';
                    html += '<span class="sp2">请检查您当前的网络环境</span><button class="looerrorBtn">重新加载</button></div>';
                    return html
            },
            no_detail : function(){
                var html  = '<div class="no_detail"><div></div><span>哎呀~暂无赛事信息</span></div>';
                return html
            },
            filter : function(obj){
                var html  = '<div class="popup"><div class="f_header"><div><span>赛事筛选</span></div></div><div class="f_content">';

                    if(object.lotyId == 1){
                        html +='<div>';
                    }else{
                        html +='<div style="padding-bottom:0.2rem">'
                    }

                    if(object.lotyId != 2){
                        html += '<div class="fast_filter iszq">';
                    }else{
                        html += '<div class="fast_filter">';
                    }
                    
                    html += '<span class="all" value="all">全选</span><span class="revert" value="revert">反选</span>';

                    if(object.lotyId != 2){
                        html += '<span class="fiveLeague" value="fiveLeague">仅五大联赛</span>';
                    }

                    html += '</div><div class="name_filter">';

                    $.each(obj.match_arr,function(key,val){
                        html += '<span data-active="1" data-hotcount="'+val.hotCount+'" data-count="'+val.count+'" data-match="'+val.match+'" class="active">'+val.match+'</span>';
                    });

                    html += '</div><div class="else_filter">';

                    if(object.lotyId==1){
                        html += '<p><span class="hot" data-hotAct="0">仅显示热门比赛</span></p>';       
                    }

                    html += '<p class="total">共<em data-allCount="'+obj.allCount+'" id="filterResultLen">'+obj.allCount+'</em>场比赛</p>';
                    html += '</div></div></div>';
                    html += '<div class="f_footer"><ul><li><button class="f_reset hc-inline-block">取消</button></li><li><button class="f_submit hc-inline-block">确认</button></li></ul></div></div>';
                    
                    return html;
            },
            liveList : function(obj){ 
                var that = this;

                //胜负彩不显示头部
                var html  = obj.lotyId == 4 ? '' : '<div class="data-head"><span class="data-head-match_time">'+obj.match_time+'</span> <span class="data-head-week">'+obj.week+'</span> <span class="data-head-account">'+obj.account+'</span>场比赛</div>';
                
                $.each(obj.arr,function(key,val){
                    val.key = key;
                    html += '<li data-key="'+key+'" data-guest_sort="'+val.guestSort.substring(0,4)+'" data-host_sort="'+val.hostSort.substring(0,4)+'" ' + (val.tiyufengUrl ? "data-tiyufeng_url="+val.tiyufengUrl : "") +' data-game_id="'+val.gameId+'" '+"data-hot="+val.hot +'  data-match="'+val.matchName+'" class="'+(val.tiyufengUrl?"arrow_r":"")+'">';

                    if(obj.lotyId == 4){
                        html += '<div class="bf-tit hc-cf"><span class="bf-state">'+ jsbf.func.toDate(val.matchTime*1000) +'&nbsp;&nbsp;&nbsp;'+val.matchName+' '+(val.status==1?"":val.matchTimeHourAndMin)+'</span></div>';
                    }else{
                        html += '<div class="bf-tit hc-cf"><span class="bf-state">'+val.week+(val.changci<100?"0"+(val.changci<10?"0"+val.changci:val.changci):val.changci )+' '+val.matchName+' '+(val.status==1?"":val.matchTimeHourAndMin)+'</span></div>';
                    }
                    
                    html += '<div class="bf-team hc-cf"><span class="team-l">';
                    html += '<img class="logo" data-original="'+val.hostLogo+'" width="100%">';
                    html += '<em>'+val.hostSort.substring(0,4)+'</em></span>';
                    switch(+obj.lotyId){
                        case 1:
                        case 3:
                        case 4:
                        default:
                        html += that.zqWebScoket(val);
                        break;
                        case 2:
                        html += that.lqWebScoket(val);
                        break;
                    }
                    
                    html += '</span><span class="team-r">';
                    html += '<img class="logo" data-original="'+val.guestLogo+'" width="100%">';
                    
                    html += '<em>'+val.guestSort.substring(0,4)+'</em></span></div></li>';
                })

                //判断是否为空
                if(obj.account == 0){
                    html = that.no_detail();    
                }
                return html
            },
            zqWebScoket : function(val){
                var html = "";
                if(val.status==0){
                    clearTimeout(jsbf.func["conTime"+val.gameId]);
                    html += '<span class="team-site site1"><em class="hc-size-11 hc-color-ac">'+val.statusName+'</em>';
                    html += '<em class="hc-size-18 hc-weight-bold hc-color-ac">--:--</em>';
                }
                if(val.status==1){
                    clearTimeout(jsbf.func["conTime"+val.gameId]);
                    html += '<span class="team-site site2"><em class="hc-size-11 hc-color-ac">'+val.statusName+'</em>';
                }
                if(val.status==2){
                    clearTimeout(jsbf.func["conTime"+val.gameId]);

                    //服务器时间与本地时间的时间差，如果有时间差则不传
                    if(!val.timeDifference){
                        val.timeDifference = jsbf.func.timeDifference(val.serverTime);
                    }
                    
                    var status_show = jsbf.func.occurrence(val);

                    html += '<span class="team-site site1 time'+val.gameId+'"><em class="hc-size-11 hc-color-red">'+status_show+'</em>';
                    html += '<em class="hc-size-18 hc-weight-bold hc-color-red">'+val.score+'</em>';
                    html += '<em class="'+ (val.halfBf&&val.ninetyClockBf&&(val.js2Bf||val.js1Bf)&&val.dqBf ? "hc-size-8" : "hc-size-11")+' hc-color-ac">';
                    html += val.halfBf ? " 半场"+val.halfBf : "";
                    html += val.ninetyClockBf ? " 90'内"+val.ninetyClockBf : "";
                    html += val.js2Bf ? (" 加时"+val.js2Bf) : (val.js1Bf ? (" 加时"+val.js1Bf) : "");
                    html += val.dqBf ? " 点球"+val.dqBf : "";
                    html += "</em>";
                    (function conTime(){
                        jsbf.func["conTime"+val.gameId] = setTimeout(function(){
                            if(debug) console.log(val);
                            var new_status_show = jsbf.func.occurrence(val);
                            var $this = $(".time"+val.gameId).children("em").eq(0);
                            $this.text(new_status_show);
                            conTime();
                            if(debug) console.log(new_status_show)
                        },1000)
                    })()
                }
                if(val.status==3){
                    clearTimeout(jsbf.func["conTime"+val.gameId]);
                    html += '<span class="team-site site1"><em class="hc-size-11 hc-color-ac">完场</em>';
                    html += '<em class="hc-size-21 hc-weight-bold hc-color-38">'+val.score+'</em>';
                    html += '<em class="'+ (val.halfBf&&val.ninetyClockBf&&(val.js2Bf||val.js1Bf)&&val.dqBf ? "hc-size-8" : "hc-size-11")+' hc-color-ac">';
                    html += val.halfBf ? " 半场"+val.halfBf : "";
                    html += val.ninetyClockBf ? " 90'内"+val.ninetyClockBf : "";
                    html += val.js2Bf ? (" 加时"+val.js2Bf) : (val.js1Bf ? (" 加时"+val.js1Bf) : "");
                    html += val.dqBf ? " 点球"+val.dqBf : "";
                    html += "</em>";
                }
                return html
            },
            lqWebScoket : function(val){
                var html = "";
                if(val.status==0){
                    html += '<span class="team-site site1"><em class="hc-size-11 hc-color-ac">'+val.statusName+'</em>';
                    html += '<em class="hc-size-18 hc-weight-bold hc-color-ac">--:--</em>';
                }
                if(val.status==1){
                    html += '<span class="team-site site2"><em class="hc-size-11 hc-color-ac">'+val.statusName+'</em>';
                }
                if(val.status==2){
                    var status_show = jsbf.func.quarter(val);

                    html += '<span class="team-site site1 time'+val.gameId+'"><em class="hc-size-11 hc-color-red">'+status_show+'</em>';
                    html += '<em class="hc-size-18 hc-weight-bold hc-color-red">'+val.score+'</em>';

                }
                if(val.status==3){
                    html += '<span class="team-site site1"><em class="hc-size-11 hc-color-ac">完场</em>';
                    html += '<em class="hc-size-21 hc-weight-bold hc-color-38">'+val.score+'</em>';
                    html += '<em class="hc-size-11 hc-color-ac">';
                    html += val.totalScore ? " 总分"+val.totalScore : "";
                    html += val.scoreGap ? " 分差"+val.scoreGap : "";
                    html += "</em>"

                }
                return html
            }
        },
        func : {
            time : function(time){
                var n = time/60;
                return parseInt(Math.floor(n));
            },
            timeDifference : function(serverTime){
                var date = new Date();
                var now_time = Math.floor(date.getTime()/1000);
                var timeDifference = now_time-serverTime;        //服务器时间与本地时间的时间差
                return timeDifference
            },
            occurrence : function(val){
                var occurrence = 0;//比赛进行时间
                var status_show = '';//状态

                var data = new Date();
                var now_time = Math.floor(data.getTime()/1000)-val.timeDifference;
                if(debug) console.log(now_time +","+val.timeDifference);
                if(val.secondStart){
                    occurrence = now_time - val.secondStart + 45*60 ;
                    if(val.suspendeTime){
                        occurrence = occurrence-val.suspendeTime
                    };

                    occurrence = occurrence<0 ? 45 : occurrence;
                    
                    var m = this.time(occurrence);
                    status_show = (m>90?"90+":m)+"'";

                    //如果有传90分内比分则直接显示90+
                    if(val.ninetyClockBf){
                        status_show = "90+";
                    }

                }else if(val.isZc){
                    status_show = "中场休息";
                }else{
                    occurrence = now_time - val.firstStart;
                    if(val.suspendeTime){
                        occurrence = occurrence-val.suspendeTime;
                    }

                    occurrence = occurrence<0 ? 0 : occurrence

                    var m = this.time(occurrence);
                    status_show = (m>45?"45+":m)+"'";
                }
                if(val.isZd){
                    status_show = "比赛中断"
                }
                return status_show
            },
            quarter : function(val){
                var x = "",s = "";
                switch(+val.matchStage){
                    case 1:
                    x = "第1节";
                    break;
                    case 2:
                    x = "第2节";
                    break;
                    case 3:
                    x = "第3节";
                    break;
                    case 4:
                    x = "第4节";
                    break;
                    case 10:
                    x = "比赛中断";
                    return x;
                    break;
                    case 11:
                    x = "加时"
                    break;
                    default:
                    x = ""
                    break;
                }
                switch(+val.matchStageStatus){
                    case 1:
                    s = "休息";
                    break;
                    case 0:
                    s = " " + (val.gameTime ? (val.gameTime<10 ? "0"+val.gameTime : val.gameTime)+"'" : "");
                    break;
                    default:
                    s = "";
                    break;
                }
                return x+s;
            },
            toDate : function(date){
                var _date = new Date(date);
                var y = _date.getFullYear(),
                    m = _date.getMonth()+1,
                    d = _date.getDate();

                    y = y<10 ? "0" + y : y;
                    m = m<10 ? "0" + m : m;
                    d = d<10 ? "0" + d : d;
                return m+"-"+d
            },
            //滚动监听定位期号选择
            // scrollFixed : function(){
            //     console.log($(this).scrollTop())
            //     if(object.data.competition.advertising.img){
            //         $(".issue-box").css({
            //             "position":"static"
            //         })
            //     }
                
            // }
        },
    	main:{
    		websocket : function(){

    			//websocket 请求
				var webSocket = new WebSocket(HCCP.live.server().outer);  
			    webSocket.onerror = function(data) { 
                    //
                    if(debug) console.log(data);
			    };  
			    //与WebSocket建立连接  
			    webSocket.onopen = function(data) {  
                    if(debug) console.log(data);
                    if(m_debug) alert("webSocke_open");    

                    //连接成功后重置服务关闭后的迭代时间         
                    object.t = 0;

                    (function a(){
                        clearTimeout(jsbf.func.a)
                        webSocket.send("hello,world");
                        jsbf.func.a = setTimeout(a,30 * 1000);
                    })()
			    };  
                //与WebSocket断开连接
                webSocket.onclose = function(data){
                    if(m_debug) alert(JSON.stringify(data));
                    var localTime = new Date().getTime();
                    if((object.localTime + 1800 * 1000) < localTime){
                        window.location.reload();
                    }else{                     
                        setTimeout(function(){
                            jsbf.main.websocket();
                        },object.t*1000);
                        object.t+=2;
                    }
                }  
			    //处理服务器返回的信息  
			    webSocket.onmessage = function(data) { 
                    var data = data.data;
                    if(data=="hello,world"){
                        //
                    }else{
                        
                        data = JSON.parse(data);
                        if(debug) console.log(data);
                        if(m_debug) alert("webSocket_res"+ (typeof(data)=="number" ? "fd:"+data : ""));

                        var val = data;
                        if(typeof(data)=="number"){
                            return
                        };

                        //异常处理:未取出gameId，彩种id，状态
                        if(!val.gameId || !val.lotyId){
                            return
                        };

                        var _data = object.data;

                        //异常处理:未取出当天数据

                        var list = _data.list.list;

                        var that = $("[data-game_id="+val.gameId+"]");

                        // 改接口
                        var key;
                        $.each(list,function(item,content){
                            if(content.gameId == val.gameId){
                                key = item;
                            }
                        });

                        //异常处理：未取出值
                        if(!list[key]){
                            return
                        };
                        $.extend(true,list[key],val);
                        if(val.lotyId != 2){
                            var html = jsbf.HTML.zqWebScoket(list[key]);
                        }else{
                            var html = jsbf.HTML.lqWebScoket(list[key]);
                        };
                        
                        that.find(".team-site").remove();
                        that.find(".team-l").after(html);
                    }
			    };
    		},
            execute : function(info,isRefresh){
                var lotyId = object.lotyId,cpt = info.competition,race = info.race,ll = info.list.list,lg = info.locationGameId;
                var HTML = jsbf.HTML;
                $(".time").data("time",cpt.activeTimeOrIssue);
                // $(".time").data("attribution",cpt.activeAttribution);
                $(".time").html("<span>"+cpt.activeAttribution+"</span>");
                
                var week,n=0;
                $.each(ll,function(key,val){
                    week = val.week;
                    n++;
                });

                var m = {
                    arr : ll,
                    match_time : cpt.activeAttribution,
                    week : week,
                    account : n,
                    lotyId : lotyId
                };

                var listHTML = HTML.liveList(m);
                $(".bf-wrap ul").html(listHTML);

                //充满全屏以上则显示看光
                if($(document).height()>$(window).height()){
                    $(".bf-wrap ul").append("<end class='end'>好坏哟~伦家都被你看光啦</end>")
                };

                // 自动定位比赛进行中或者未开赛,全完场则定位到底部
                //取不出来数据对整体渲染没影响
                if(object.refreshLocation == -1){
                    try {
                        if(lg){
                            var $locationGameId = $("[data-game_id="+lg+"]");
                            var off_t = $locationGameId.offset().top;
                            var plat = getUrlParam("platform");

                            var top_height = 0;

                            var href = window.location.href;
                            //扎克合作商定位问题
                            if(href.indexOf("zaker") != -1){
                                top_height = $(".m_header-wrap").height() + $(".issue-wrap").height();
                            }else{
                                top_height = ((plat!=1&&plat!=2) ? $(".hc-head-wrap").height() : $(".m_header-wrap").height()) + $(".issue-wrap").height();
                            }

                            

                            $(document).scrollTop(off_t-top_height)
                        }else{
                            $(document).scrollTop(0)
                        }
                    } catch(e) {
                        $(document).scrollTop(0)
                    }
                }else{
                    $(document).scrollTop(object.refreshLocation);
                    object.refreshLocation = -1;
                };
                
                var img = "//static.letoula.com/images/v1.0/live/football.png";
                if(lotyId!=2){
                    img = "//static.letoula.com/images/v1.0/live/football.png"
                }else{
                    img = "//static.letoula.com/images/v1.0/live/backetball.png"
                }
                //图片懒加载
                $("img.logo").lazyload({
                    effect: "fadeIn",
                    placeholder : img
                });

                //issue时间选择遍历
                var boxHTML = HTML.issue(cpt.list);
                $(".box_d").html(boxHTML);

                var time = parseInt($(".time").data("time"));

                //储存筛选所需要的总共场次与各赛事、热门的场次
                var $bfWrapList = $(".bf-wrap").find("li");
                var list_obj = new Array();
                $.each(race,function(key,val){
                    var n = 0,h = 0;
                    var match = "";
                    $bfWrapList.each(function(){
                        var d_match = $(this).data("match");
                        var hot = $(this).data("hot");
                        if(d_match==val){
                            n++;
                            if(parseInt(hot)){h++}
                            match = d_match
                        }
                    })
                    list_obj.push({
                        match:match,
                        count:n,
                        hotCount:h
                    });

                });
                //筛选
                var filter = {
                    lotyId : lotyId,
                    match_arr : list_obj,
                    allCount : m.account
                };
                var filterHTML = HTML.filter(filter);
                $("#filter_popup").html(filterHTML);

                //修改最大高度
                var maxH = $(window).height()-234;
                var ele = $("#filter_popup .name_filter");
                if(maxH<0){
                    ele.css("maxHeight","0px");
                }else{
                    ele.css("maxHeight",maxH+"px");
                };
            },
    	},
    	bind : function(){
            var self = this;
            var main = self.main;
            var HTML = self.HTML;
            var func = self.func;

            var o = "click";

            object.localTime = new Date().getTime();

            //加载并初始化数据
            var rendering = function(lotyId){
                //防重
                $("body").append(HTML.Omask());
                object.canClick = {left:0,mid:0,right:0};
                $(".next").addClass("hc-color-ac");
                $(".last").addClass("hc-color-ac");

                //显示加载loading条
                var loading = HTML.loading();
                $(".bf-wrap ul").html(loading);

                //取出数据 并调用回调函数
                ajax.getdate(lotyId,function(){

                    var _data = object.data; 
                    var cpt_list = _data.competition.list;
                    var activeTimeOrIssue = _data.competition.activeTimeOrIssue;

                    $.each(cpt_list,function(key,val){
                        //取出当天时间的key值
                        if(activeTimeOrIssue==val.time){
                            //下一期有数据 去掉不可点击和变灰
                            if(cpt_list[key-1]){
                                object.canClick.right = 1;
                                $(".next").removeClass("hc-color-ac");
                            }
                            //上一期有数据 去掉不可点击和变灰
                            if(cpt_list[key+1]){
                                object.canClick.left = 1
                                $(".last").removeClass("hc-color-ac");
                            }

                            //储存attribution
                            _data.competition.activeAttribution = val.attribution
                        }
                    });
                    object.canClick.mid = 1;

                    //筛选中添加数据
                    var arr = new Array();
                    $.each(_data.list.list,function(key,item){
                        if($.inArray(item.matchName,arr)<0){
                            arr.push(item.matchName);
                        }
                    })
                    _data.race = arr;

                    //广告
                    var adver = _data.competition.advertising.img;
                    if(adver){
                        $(".ad").html("<img src="+adver+">");
                    }

                    //渲染遍历DOM
                    main.execute(_data);
                }); 
            }

            //back 
            $(".head-icon-back").on(o,function(){
                HCCP.back.infofirst()
            });


            /*

                初始化
                取出url #号后面的值，如果不是1、3、4之中的，就默认为1
    
            */
            object.lotyId = +window.location.hash.replace("#","");
            if($.inArray(object.lotyId,[1,3,4]) === -1){
                object.lotyId = 1;
            };

            var plat = getUrlParam("platform");
            if(plat!=1&&plat!=2){
                $(".hc-head-wrap").show();
                $(".issue-box").addClass("fixed");

                var that = $(".hc-nav").find("a[data-lotyid="+object.lotyId+"]");
                that.addClass('hc-btn-nav-selected').parent().siblings().find(".hc-btn-nav-selected").removeClass('hc-btn-nav-selected');

                $(".header-drop").text(that.data("name"));
            }else{
                $(".m_header-wrap").show();
                $(".issue-box").addClass("m_fixed");

                var that = $(".m_lotylist").find("a[data-lotyid="+object.lotyId+"]");
                $(".m_lotylist a").removeClass("hc-active");
                that.addClass("hc-active");

                $(".header-drop").text(that.data("name"));
            };

            rendering(object.lotyId);
            
            //tab
            $(".hc-head-title").on(o,".header-drop",function(){
                $(".box_d").addClass("hide");
                $(".hc-nav").toggle();
            });

            //滚动监听期号选择定位
            // $(window).on("touchstart touchmove scroll",func.scrollFixed);

            //切换彩种 H5
            $(".hc-nav").on(o,"a.hc-btn",function(){
                $("body").append(HTML.Omask());
                $(".time").children("span").text("加载中");

                $(this).addClass('hc-btn-nav-selected').parent().siblings().find(".hc-btn-nav-selected").removeClass('hc-btn-nav-selected');
                $(this).parents(".hc-nav").hide();
                var lotyId = $(this).data("lotyid"),
                    name = $(this).data("name");
                $(".header-drop").text(name);

                object.lotyId = lotyId;

                object.data = {};//切换彩种清空data
                rendering(lotyId);
            })

            //切换彩种 iphone
            $(".m_lotylist").on(o,"a",function(){
                $("body").append(HTML.Omask());
                $(".box_d").addClass("hide");
                $(".time").children("span").text("加载中");

                $(".m_lotylist a").removeClass("hc-active");
                $(this).addClass("hc-active");
                var lotyId = $(this).data("lotyid"),
                    name = $(this).data("name");

                object.lotyId = lotyId;
                object.data = {};//切换彩种清空data
                rendering(lotyId);
            })

    		//filter
    		$(".hc-head-right , .m_filter").on(o,function(){
                $(".box_d").addClass("hide");
                $(".hc-nav").hide();
    			$("#filter_popup").removeClass("hide");
    		});

            //筛选显示当前赛事比赛数
            var f = function(){
                var allCount = 0;
                $("#filter_popup").find(".name_filter span").each(function(){
                    if($(this).hasClass("active")){
                        if($(".hot").hasClass("active")){
                            var count = parseInt($(this).data("hotcount"));
                        }else{
                            var count = parseInt($(this).data("count"));
                        }
                        allCount += count
                    }
                })
                $("#filterResultLen").text(allCount)
            };

            //取消
    		$("#filter_popup").on(o,".f_reset",function(){
                $("#filter_popup").find(".name_filter span").each(function(){
                    if(parseInt($(this).data("active"))){
                        $(this).addClass("active");
                    }else{
                        $(this).removeClass("active")
                    }
                })
                if(parseInt($(".hot").data("hotact"))){
                    $(".hot").addClass("active");
                }else{
                    $(".hot").removeClass("active");
                }
                var allCount = $("#filterResultLen").data("allcount");
                $("#filterResultLen").text(allCount);

                $("#filter_popup").addClass("hide");
    		});
            //筛选点击确认
            $("#filter_popup").on(o,".f_submit",function(){
                $(".box_d").addClass("hide");
                var allCount = parseInt($("#filterResultLen").text());
                $("#filter_popup").addClass("hide");
                
                var match = new Array();
                $("#filter_popup").find(".name_filter span").each(function(){
                    if(allCount==0){
                        if(parseInt($(this).data("active"))){
                            $(this).addClass("active");
                        }else{
                            $(this).removeClass("active")
                        }
                    }else{
                        if($(this).hasClass("active")){
                            $(this).data("active",1)
                            match.push($(this).data("match"))
                        }else{
                            $(this).data("active",0)
                        }
                    }
                })  
                if(allCount==0){
                    allCount = $("#filterResultLen").data("allcount");
                    $("#filterResultLen").text(allCount);
                    $("#filter_popup").addClass("hide");
                    if(parseInt($(".hot").data("hotact"))){
                        $(".hot").addClass("active");
                    }else{
                        $(".hot").removeClass("active");
                    }
                    return
                }

                if($(".hot").hasClass("active")){
                    $(".hot").data("hotact",1);
                }else{
                    $(".hot").data("hotact",0);
                }

                $(".bf-wrap li[data-match]").hide();

                $.each(match,function(key,val){
                    var that  = $(".bf-wrap li[data-match='"+val+"']");
                    if($(".hot").hasClass("active")){
                        that.each(function(){
                            if($(this).data("hot")>0){$(this).show();}
                        })  
                    }else{
                        that.show();
                    }
                });

                $("#filterResultLen").data("allcount",allCount);
                $("#filterResultLen").text(allCount);
                $(".data-head-account").text(allCount);

                var img = "//static.letoula.com/images/v1.0/live/football.png";
                if(object.lotyId != 2){
                    img = "//static.letoula.com/images/v1.0/live/football.png"
                }else{
                    img = "//static.letoula.com/images/v1.0/live/backetball.png"
                }
                //图片懒加载
                $("img.logo").lazyload({
                    effect: "fadeIn",
                    placeholder : img
                }); 
                
                $(".end").remove();
                if($(document).height()>$(window).height()){
                    $(".bf-wrap ul").append("<end class='end'>好坏哟~伦家都被你看光啦</end>")
                }

                $(document).scrollTop(0);
            })

            $("#filter_popup").on(o,".name_filter span",function(){
                $(this).toggleClass("active");
                f()
            });

            //全选
            $("#filter_popup").on(o,".all",function(){
                $(".name_filter span").addClass("active");
                f()
            });

            //反选
            $("#filter_popup").on(o,".revert",function(){
                $(".name_filter span").toggleClass("active");
                f()
            });

            //五大联赛
            $("#filter_popup").on(o,".fiveLeague",function(){
                var fiveLeague = object.fiveLeague;
                $(".name_filter span").removeClass("active");
                $.each(fiveLeague,function(key,val){
                    $(".name_filter span[data-match="+val+"]").addClass("active")
                })
                f()
            });

            //热门比赛
            $("#filter_popup").on(o,".hot",function(){
                $(this).toggleClass("active");
                f()
            });

            //下一期
            $(".next").on(o,function(){
                if(!object.canClick.right){return}

                var _data = object.data;

                var list = _data.competition.list;
                var time = _data.competition.activeTimeOrIssue;
                var n = 0,a = 0;
                $.each(list,function(key,val){
                    if(val.time==time){
                        a = n
                    }
                    n++
                });
                if(!list[a-1]){return}
                var new_time = list[a-1].time

                $(".box_d [data-time="+time+"]").toggleActive();

                _data.competition.activeTimeOrIssue = new_time;
                $(".box_d").addClass("hide");

                rendering(object.lotyId)
            });

            //上一期
            $(".last").on(o,function(){
                if(!object.canClick.left){return}

                var _data = object.data;

                var list = _data.competition.list;
                var time = _data.competition.activeTimeOrIssue;
                var n = 0,a = 0;
                $.each(list,function(key,val){
                    if(val.time==time){
                        a = n;
                    }
                    n++
                });
                if(!list[a+1]){return}
                var new_time = list[a+1].time

                $(".box_d [data-time="+time+"]").toggleActive();

                _data.competition.activeTimeOrIssue = new_time
                $(".box_d").addClass("hide");

                rendering(object.lotyId) 
            });

            //issue选择
            $(".box_d").on(o,"li",function(){
                if(!object.canClick.mid){return}

                var _data = object.data;

                $(this).toggleActive();

                time = $(this).data("time")
                _data.competition.activeTimeOrIssue = time
                $(".box_d").addClass("hide");

                var filterHTML = "";
                rendering(object.lotyId)
            });

    		//issue
    		//show&hide
    		$(".time").on(o,function(){
    			$(".box_d").toggleClass("hide");
    		});

    		

            //增加体育疯跳转事件
            $(".bf-wrap").on(o,"li",function(){
                var that = $(this);
                var tiyufeng_url = that.data("tiyufeng_url"),
                    game_id = that.data("game_id"),
                    host_sort = that.data("host_sort"),
                    guest_sort = that.data("guest_sort");
                if(!tiyufeng_url){return}
                if(plat==1||plat==2){
                    tiyufeng_url = encodeURIComponent(tiyufeng_url)
                    jumpURL.go("clickType=9&clickValueStr="+tiyufeng_url)
                }else{
                    var jumpAnalyse = {
                        host:host_sort,
                        guest:guest_sort,
                        url:tiyufeng_url
                    }
                    localStorage.setItem("jumpAnalyse", JSON.stringify(jumpAnalyse));
                    HCCP.FUNC.go(URL_TRADE_ANALY);
                }
            });


    		//refresh
            var num = 0;
            var c_n = 0;
            var num2= 0;
            var b_n = 0;
            var b = 0 ;
            var c = 0;
    		$(".refresh").on(o,function(){
                $(".box_d").addClass("hide");

                c_n++;
                b_n++;
                if(b){
                    HCCP.modal.warning({msg:"亲~您刷新的次数过高，请30秒后再重新刷新"})
                    return
                }else{
                    c=0;
                    clearTimeout(jsbf.func.t2)
                }
                (function t(){
                    clearTimeout(jsbf.func.t)
                    num++;
                    num2++;
                    if(num>5){
                        num=0;
                        c_n=0;
                    }
                    jsbf.func.t = setTimeout(t,1000);
                })()
                if(c_n>=3){
                    HCCP.modal.warning({msg:"亲~您刷新的次数过于频繁，先休息一下吧~"})
                    return
                }
                if(num2%20==0&&b_n>=10){
                    b = 1;
                    (function t2(){
                        clearTimeout(jsbf.func.t2)
                        c++;
                        if(c>=30){
                            b=0;
                            c=0;
                            b_n=0;
                        }
                        jsbf.func.t2 = setTimeout(t2,1000);
                    })()
                    return
                };

                object.refreshLocation = $(window).scrollTop();
                //筛选信息储存
                // var arr = [];
                // $(".name_filter").children().each(function(){
                //     arr.push($(this).data("active"));
                // });

                rendering(object.lotyId);

                // $.each(arr,function(k,v){
                //     if(!v){
                //         $(".name_filter").children().eq(k).removeClass("active");
                //     }
                // })
                // $(".f_submit").click();
    		})

            //websocket
            main.websocket();
    	}
    }

    jsbf.bind();
})
