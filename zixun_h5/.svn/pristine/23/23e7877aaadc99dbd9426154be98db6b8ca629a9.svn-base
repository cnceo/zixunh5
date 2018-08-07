$(document).ready(function($) {
	var articleIdCookie = HCCP.dataS.cookie.get("haocaiId");
	//console.log(articleIdCookie)
	var data = {
		skip: 10,
		scrollNum: 1,
		articleIdCookie: '',
		banner: [],
		hideTab: false,
		o_error: false,
		f_error: false,
		empty_data: false,
		loading: true,
		tip_footer: false,
		load_wrap: false,
		location_wrap: false,
		urlCloumnID: 'index',
		urlCloumnName: '头条',
		articleInfo: [],
		threeArticaltop: [],
		threeArtical: [],
		bannerArr: [],
		columnInfo: [{
				columnid: "index",
				columnname: "头条",
				tabUrl: ''
			},
			{
				columnid: 23,
				columnname: "竞足",
				tabUrl: 'jczq'
			},
			{
				columnid: 24,
				columnname: "竞篮",
				tabUrl: 'jclq'
			},
			{
				columnid: 26,
				columnname: "公众号",
				tabUrl: 'gzh'
			},
			{
				columnid: 27,
				columnname: "开奖",
				tabUrl: 'kj/?jumpType=zixun'
			},
			{
				columnid: 54,
				columnname: "胜负彩",
				tabUrl: 'sfc'
			},
			{
				columnid: 34,
				columnname: "双色球",
				tabUrl: 'ssq'
			},
			{
				columnid: 47,
				columnname: "大乐透",
				tabUrl: 'dlt'
			},
			{
				columnid: 61,
				columnname: "其它彩种",
				tabUrl: 'qtcz'
			},
			{
				columnid: 62,
				columnname: "国际彩讯",
				tabUrl: 'gjcx'
			},
			{
				columnid: "worldcup",
				columnname: "历史赛事",
				tabUrl: 'worldcup'
			},
		],
		focus_event: [],
		mustRead: [],
		mustReadLength: 0,
		topInfo: [],
		secondColumnArr: [],
		secondColumnList: [{
				name: "理财投注",
				pathName: 'lctz'
			},
			{
				name: "最新动态",
				pathName: 'zxdt'
			},
			{
				name: "中奖故事",
				pathName: 'zjgs'
			},
			{
				name: "投注技巧",
				pathName: 'tzjq'
			},
			{
				name: "热血推荐",
				pathName: 'rxtj'
			},
			{
				name: "球场内外",
				pathName: 'qcnw'
			},
			{
				name: "膜拜高手",
				pathName: 'mbgs'
			},
			{
				name: "购彩秘籍",
				pathName: 'gcmj'
			},
			{
				name: "好彩观察",
				pathName: 'hcgc'
			},
			{
				name: "第一竞彩",
				pathName: 'dyjc'
			},
			{
				name: "乐透啦",
				pathName: 'ltl'
			},
			{
				name: "我的追球",
				pathName: 'wdzq'
			},
			{
				name: "购彩推荐",
				pathName: 'gctj'
			},
			{
				name: "赛果开奖",
				pathName: 'sgkj'
			},
			{
				name: "专家杀号",
				pathName: 'zjsh'
			},
			{
				name: "走势图",
				pathName: 'zst'
			},

		], //用来实现二级栏目的文件加载路径修改
		columnidArr: ["index"],
		columnidNameArr_: ["头条"],
		columnidName_: '',
		pullDown: {}, //每个栏目是否限制了上拉加载
		isOver: {}, //是否加载完毕（在有数据的前提下）
		isAdv: {} //是否给过广告了
	}
	var all = {
		data: {
			columnid: '',
			columnidArr: ["index"],
			columnidNameArr_: ["头条"],
			columnidName_: '',
			// advArr:[],
			pullDown: {}, //每个栏目是否限制了上拉加载
			skip: {}, //保存每个栏目的最后id
			isOver: {}, //是否加载完毕（在有数据的前提下）
			isAdv: {} //是否给过广告了
		}
	}
	var zixun = new Vue({
		el: '#zixun',
		data: data,
		methods: {
			//初始化
			init: function() {
				//console.log("vue的初始化调用")
				//确定cloumnId并请求获得这个页面的数据
				this.getUrlCloumnId();
			}, //tab隐藏部分的切换显示和隐藏
			tabShowHide: function() {
				this.hideTab = !this.hideTab;
			},
			//根据不同的cloumnId获取数据的函数
			getData: function() {
				//加载中的提示
				this.loading = true;
				//获取数据
				//console.log("获取数据的函数");
				var urlname = "/iation/haocai/index";
				if(this.urlCloumnID != "index") {
					urlname = "/iation/haocai/column/list?columnid=" + this.urlCloumnID;
				}
				var result = [];
				var that = this;
				//  "//api.dev.lottery666.com"
				$.ajax({
					type: "get",
					url: REMOTE_DATA_URL + urlname,
					async: true,
					data: {
						"identity": HCQD.identity(),
						"platform": HCQD.platform()
					},
					xhrFields: {
						withCredentials: true
					},
					crossDomain: true,
					complete: function(data) {
						result = data.responseJSON;
						if(result && result.code == 200 && result.data) {
							that.articleInfo = result.data.articleInfo || [];
							that.bannerArr = result.data.bannerArr || [];

							if(result.data.mustRead) {
								for(var j = 0; j < result.data.mustRead.length; j++) {
									if(result.data.mustRead[j].title.length > 16) {
										var temp = result.data.mustRead[j].title.slice(0, 16) + '...';
										result.data.mustRead[j].title = temp;
									}
								}
							}
							that.mustRead = result.data.mustRead || [];
							if(that.mustRead.length > 0) {
								that.mustReadLength = result.data.mustRead.length * 1.8;
							}
							that.topInfo = result.data.topInfo || [];
							//进行今日必读之前的三个条目的筛选

							if(that.topInfo.length < 3) {
								//console.log("<3");
								var length = that.topInfo.length;
								var tempList = that.topInfo.slice(0, length);
								that.topInfo = [];
								that.threeArticaltop = tempList;
								//还需要添加不是置顶的文章若干
								var tempNum = 3 - length;
								that.threeArtical = that.articleInfo.slice(0, tempNum);
								that.articleInfo = that.articleInfo.slice(tempNum);

							} else {
								var tempList = that.topInfo.slice(0, 3);
								that.threeArticaltop = tempList;
								var length = that.topInfo.length;
								if(length == 3) {
									that.topInfo = [];
								} else {
									var tempList1 = that.topInfo.slice(3, length);
									that.topInfo = tempList1;
								}
							}
							//console.log(result.data.secondColumnArr);
							if(result.data.secondColumnArr) {
								for(var i = 0; i < result.data.secondColumnArr.length; i++) {

								}
							}
							that.secondColumnArr = result.data.secondColumnArr || [];

							//目前swiper的轮播图在vue中的支持需要vue_swiper暂时还是是用渲染的方式来实现
							if(that.urlCloumnID == "index" && that.bannerArr.length > 0) {
								//添加轮播图的函数
								var bannerHtml = '';
								bannerHtml = bannerHtml + '<div class="swiper-wrapper">';
								for(var i = 0; i < result.data.bannerArr.length; i++) {
									bannerHtml = bannerHtml + '<div class="swiper-slide shouye" style="background-image:url(' + result.data.bannerArr[i].banner + ')"> <a href="' + result.data.bannerArr[i].click_value_string + '"></a><span class="swiperMess">' + result.data.bannerArr[i].title + '</span></div>';
								}
								bannerHtml = bannerHtml + '</div><div class="swiper-pagination swiperRight"></div></div>'
								$("#banner").html(bannerHtml);
								var swiper = new Swiper('#banner', {
									autoplay: true,
									pagination: {
										el: '.swiper-pagination',
									},
								});
							}
							//第二个轮播图的实现 焦点赛事的轮播图
							that.focus_event = result.data.focus_event || [];
							if(that.focus_event.length > 0) {
								//表示有焦点赛事的数据才会显示焦点赛事，一般情况除了首页其他没有这种
								that.rewardFocus();
							}
							//靜態化的處理，第一次加載的時候去掉文章的數據只在滾動時更新
							var pathname = window.location.pathname;
							pathname = pathname.split("/");
							if(pathname.length > 2) {
								that.articleInfo = [];
								that.topInfo = [];
								that.threeArticaltop = [];
								that.threeArtical = [];
							}

							//去除数据加载的提示框
							that.loading = false;
						} else{
							//没有收到数据
							that.loading = false;
							that.f_error = true;
						}
					},
				});
			}, //获取url对应的columnid的函数
			getUrlCloumnId: function() {
				//console.log("获取栏目Id的函数")
				//取栏目id
				//console.log(window.location.pathname);
				var pathname = window.location.pathname;
				pathname = pathname.split("/");
				if(pathname.length > 2) {
					pathname = pathname[1];
					if(pathname == 'kj') {
						pathname = 'kj/?jumpType=zixun'
					}
					for(var i = 0; i < this.columnInfo.length; i++) {
						if(pathname == this.columnInfo[i].tabUrl) {
							this.urlCloumnID = this.columnInfo[i].columnid;
						}
					}
				} else {
					this.urlCloumnID = "index";
				}
				//console.log(this.urlCloumnID);
				//根据获得的cloumnId进行数据的请求
				//console.log(this.urlCloumnID);
				this.getData();
			}, //判断点击的文章是否被阅读过通过与本地的cookies进行对比
			inCookies: function() {
				var b = false
				if(articleIdCookie) {
					try {
						var arr = articleIdCookie.split(",");
						var index = $.inArray(id.toString(), arr);
						if(index != -1) {
							b = true
						};
						return b
					} catch(e) {
						return b
					}
				} else {
					return b
				}
			},
			scrollFn: function($event) {
				var columnid = this.urlCloumnID;
				var $dom_wrap = $("[class=id_" + columnid + "]");
				//当内容滚动到底部时加载新的内容 100当距离最底部100个像素时开始加载.
				//console.log($(window).height());//667
				//console.log($event)//
				//console.log($event.target.scrollTop); //1080
				//console.log($(".item").eq($(".item").length - 1).offset().top); //1575
				//				if($event.target.scrollTop + $(window).height() > $event.target.children[$event.target.children.length - 1].offsetTop) {
				if($(".item").eq($(".item").length - 1).offset().top < 650) {
					//给出加载中的提示
					this.loading = true;
					if(this.urlCloumnID == "index") {
						if(this.scrollNum == 9999) {
							this.scrollNum = 9999;
						} else {
							this.scrollNum++;
						}
						var URL = "/iation/haocai/load";
						URL = URL + '?page=' + this.scrollNum;
						//console.log(URL);
						var res = HCCP.ajax.get(URL);
						//根据下拉的次数决定是否更新新的数据
						//console.log(res);
						if(res.data.loading.length == 0) {
							//表示没有数据了
							this.scrollNum = 9999;
						}

					} else {
						//console.log(this.skip)
						var res = HCCP.ajax.get("/iation/haocai/column/list?take=5&type=load&skip=" + this.skip + "&columnid=" + this.urlCloumnID);
						this.skip = this.skip + 5;
					}
					if(res && res.code == 200) {
						this.tip_footer = false;
						if(res.data && res.data.loading.length > 0) {
							//console.log(res.data)
							//获得新的下拉的数据更新文章列表的长度
							for(var i = 0; i < res.data.loading.length; i++) {
								this.articleInfo.push(res.data.loading[i])
							}
							//console.log(this.articleInfo);
							this.loading = false;
						} else if(res.data && res.data.loading.length <= 0) {
							//表示已经没有新的数据了							
							this.loading = false;
							this.tip_footer = true;
						}
					} else {
						//报错就不准上拉了
						//this.pullDown[columnid] = true
						if(res && res.message) {
							HCCP.modal.alert({
								msg: res.message
							})
						} else {
							HCCP.modal.alert({
								msg: "系统繁忙，请稍后再试"
							})
						}
						return
					}

				} else {
					return
				}
			},
			rewardFocus: function() {
				var loop = '<div class="swiper-focusEvent"><div class="swiper-wrapper">';
				var data = this.focus_event || [];
				for(var i = 0; i < data.length; i++) {
					//需要根据数据的情况来确定添加的内容样式
					var tempHtml = '';
					if(data[i].status) { //表示是足球赛事方面
						tempHtml = '<div class="focusCenter  teamBall"><div class="teamMess"><div>';
						var league_name = data[i].league_name,
							match_time = data[i].match_time,
							status = data[i].status,
							temblem_one = data[i].temblem_one,
							temblem_two = data[i].temblem_two,
							tname_one = data[i].tname_one,
							tname_two = data[i].tname_two,
							tscore_one = data[i].tscore_one || 0,
							tscore_two = data[i].tscore_two || 0;
						//对时间进行处理获取 月号时分 
						var DATE = new Date(match_time * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
						Y = DATE.getFullYear() + '-';
						M = (DATE.getMonth() + 1 < 10 ? '0' + (DATE.getMonth() + 1) : DATE.getMonth() + 1) + '-';
						D = (DATE.getDate() < 10 ? '0' + DATE.getDate() : DATE.getDate()) + ' ';
						h = (DATE.getHours() < 10 ? '0' + DATE.getHours() : DATE.getHours()) + ':';
						m = DATE.getMinutes() < 10 ? '0' + DATE.getMinutes() : DATE.getMinutes();
						s = DATE.getSeconds();
						var month = M + D,
							minute = h + m;
						//比赛状态的切换
						if(status == 1) {
							status = "未开始";
						} else if(status == 3) {
							status = "已结束";
						} else if(status == 2){
							status = "进行中";
						}
						//根据开始未开始决定时间图片的展示
						//添加模板
						tempHtml = tempHtml + '<img src="' + temblem_one + '"/></div><span>';
						tempHtml = tempHtml + tname_one + '</span></div><div class="teamDetail"><div class="teamTime"><span>';
						tempHtml = tempHtml + month + '</span><span>';
						tempHtml = tempHtml + minute + '</span><span>';
						if(status == "已结束" || status == "进行中") {
							tempHtml = tempHtml + league_name + '</span></div><div class="teamResult"><span>';
							tempHtml = tempHtml + tscore_one + '</span><span>-</span><span>';
							tempHtml = tempHtml + tscore_two + '</span></div><div>';
						} else {
							tempHtml = tempHtml + league_name + '</span></div><div class="teamResult"><div class="notStart"><img src="/Static/images/v1.0/info/zixun/notStart.png"/>';
							tempHtml = tempHtml + '</div></div><div>';
						}
						tempHtml = tempHtml + status + '</div></div><div class="teamMess"><div>';
						tempHtml = tempHtml + '<img src="' + temblem_two + '"/></div><span>';
						tempHtml = tempHtml + tname_two + '</span></div></div>';
					} else { //表示是双色球或者大乐透
						tempHtml = '<div class="focusCenter"><div class="topMess"><div class="lotyName"><span>';
						var lotyName = '双色球',
							qishu = '',
							month = '',
							money = '';
						var redList = [],
							blueList = [];
						var openCode = data[i].openCode;

						if(data[i].lotyId == 11) { //表示是大乐透
							lotyName = '大乐透';
						}
						//筛分蓝红球
						var List1 = [];
						if(openCode) {
							List1 = openCode.split('|');
							var List2 = List1[0].split(',');
							var List3 = [];
							if(List1.length > 1) {
								List3 = List1[1].split(',');
							} else {
								List3 = [];
							}
						}
						redList = List2;
						blueList = List3;
						//变换期数
						qishu = "第" + data[i].issue + "期 ";
						//变换日期
						month = data[i].date + '';
						month = month.slice(4, 6) + "-" + month.slice(6, 8);
						//奖金总数 根据金额的大小进行修改
						money = data[i].prizePool;
						money = money / 100000000;
						money = Math.floor(money * 100) / 100;
						money = money + '';
						var tempClass = '';
						if(money.length <= 4) {
							tempClass = "tempClass";
						}
						//money = money.slice(0,2);
						tempHtml = tempHtml + lotyName + '</span><span>';
						tempHtml = tempHtml + qishu + '</span><span>';
						tempHtml = tempHtml + month + '</span></div><div class="lotyMoney"><div class=" ' + tempClass + '">';
						tempHtml = tempHtml + money + '</div><div><span>亿元</span><span>奖池滚存</span></div></div></div><div class="bottomBall">';
						//根据数据的情况决定篮球红球的个数和大小   	 
						for(var j = 0; j < redList.length; j++) {
							tempHtml = tempHtml + '<div class="redBall">' + redList[j] + '</div>';
						}
						for(var k = 0; k < blueList.length; k++) {
							tempHtml = tempHtml + '<div class="blueBall">' + blueList[k] + '</div>';
						}
						tempHtml = tempHtml + '  </div></div>';
					}
					loop = loop + '<div class="swiper-slide">' + tempHtml + '</div>';
				}
				loop = loop + '  </div> <div class="swiper-button-prev"></div><div class="swiper-button-next"></div> </div>';
				var focusHtml = loop;
				$("#focusEvent").html(focusHtml);
				//实现轮播图
				var mySwiper = new Swiper('.swiper-focusEvent', {
					//设置轮播的
					autoplay: false,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
				})
			},
			get_: function() {

			}, //二级栏目的跳转
			goSecondColumn: function(columnid, columnname, $event) {
				//console.log(columnname);
				//console.log(window.location.pathname);
				var pathName = window.location.pathname;
				for(var i = 0; i < this.secondColumnList.length; i++) {
					if(columnname == this.secondColumnList[i].name) {
						pathName = pathName + this.secondColumnList[i].pathName + ".html";
					}
				}
				if(this.urlCloumnID == "worldcup" && (columnname == "32强阅兵" || columnname == "完全赛程")) {
					if(columnname == "32强阅兵") {
						var goUrl = URL_ZIXUN_WorldCup + '?type=1'
					} else if(columnname == "完全赛程") {
						var goUrl = URL_ZIXUN_WorldCup + '?type=2'
					}
				} else if((this.urlCloumnID == 34 || this.urlCloumnID == 47) && columnname == "走势图") {
					if(this.urlCloumnID == 34) {
						var goUrl = pathName;
					} else if(this.urlCloumnID == 47) {
						var goUrl = pathName;
					}
				} else {
					var secondMess = JSON.stringify({
						columnid: this.urlCloumnID,
						scolumnid: columnid,
						scolumnName: columnname,
						columnName: this.urlCloumnName
					})
					localStorage.setItem("secondMess", secondMess)
					//+ "?scolumnid=" + columnid + '&columnid=' + this.urlCloumnID + '&scolumnName=' + columnname + '&columnName=' + this.urlCloumnName
					var goUrl = pathName;
				}
				HCCP.FUNC.go(goUrl);

			},
			goDetails: function(jump, title, keywords, description, id, leftFigure, event) {
				//console.log(jump + "/" + title + "/" + keywords + "/" + description + "/" + id + "/" + leftFigure);
				window.localStorage.setItem("leftFigure", leftFigure);
				//点击后标题标灰
				//console.log(event);
				$(event).addClass("c_af");
				//对阅读过的文章进行整理，记录存储已经阅读的
				if(articleIdCookie) {
					if(!this.inCookies(id)) {
						articleIdCookie = id + "," + articleIdCookie;
						HCCP.dataS.cookie.set("haocaiId", articleIdCookie, "d30", document.domain.slice(2))
					}
				} else {
					articleIdCookie = id;
					HCCP.dataS.cookie.set("haocaiId", id, "d30", document.domain.slice(2))
				}
				//进行详情的跳转
				//var _url = URL_ZIXUN_DETAIL + "?articleId=" + id + "&columnid=" + this.urlCloumnID;
				var pathName = window.location.pathname;
				if(pathName == "/") {
					pathName = '/toutiao/'
				}
				if(pathName == "/info/zixun/zixun.html") {
					pathName = '/toutiao/';
				}
				pathName = pathName.split("/")[1] + "/";
				//var _url = NEWS_DETAIL_URL + pathName + id + '.html';
				var _url = URL + pathName + id + '.html';
				HCCP.FUNC.go(_url);
			},
			start: function() {

			}, //加载失败后重新加载
			failReload: function() {
				//console.log("点击后会重新加载");
				//调用获得数据的函数重新加载
				this.loading = true;
				this.f_error = false;
				this.getData();

			},
			otherFailReload: function() {
				//console.log("111")
				$('.loading').show()
				$(".o_error").remove()
				//异步
				resetColumnid(all.data.columnid)
				if(all.data.columnid == 'index') {
					get_("/iation/haocai/index", otherStar)
				} else {
					get_("/iation/haocai/column/list?columnid=" + columnid, otherStar)
				}
			}

		},
		mounted: function() {
			var that = this;
			//等节点和数据已经渲染完的时候开始执行一些js的绑定
			this.init();
			//处理数据添加显示和标志的识别   tab切换的
			var tempArr = [];
			for(var j = 0; j < this.columnInfo.length; j++) {
				if(this.columnInfo[j].columnid == this.urlCloumnID) {
					this.urlCloumnName = this.columnInfo[j].columnname; //获取id对应的中文的值
				}
			}
			for(var i = 0; i < this.columnInfo.length; i++) {
				var temp = false;
				if(this.columnInfo[i].columnid == this.urlCloumnID) {
					temp = true;
				}
				tempArr.push({
					columnid: this.columnInfo[i].columnid,
					columnname: this.columnInfo[i].columnname,
					id: "id_" + this.columnInfo[i].columnid,
					tabUrl: this.columnInfo[i].tabUrl,
					choiced: temp,
					urlChange: URL + this.columnInfo[i].tabUrl
				})
			}
			this.columnInfo = tempArr;
			//绑定下拉跟新事件
			//content_wrap", ".content_inner", '', 2.5, function(e)
			//pullDown(moveobj, targetobj, offset, bounce, callback); 
			//console.log(window.location.pathname);
			//开奖的部分没有下拉更新的功能功能
			if(window.location.pathname != "/kj/") {
				pullDown(".content_wrap", ".content_inner", '', 2.5, function(e) {
					//console.log("下拉更新后的回调函数");
					this.back(1); //修改完可以删除这个
					that.getData();
				})
			}

			//tab切换的函数实现切换位置移动 暂时没有做vue处理
			//			$(".tab_wrap ul>li").on('click', tabClick);
			$(".am_ul>li").on('click', tabClick);
			//根据情况实现tab的居中显示
			//console.log(this.urlCloumnID);

			//底部的切换
			//跳首页 首页的触发不给反应其他地方的触发可以
			$(".go_index").on('click', function(event) {

			});
			//跳直播
			$(".go_live").on('click', function(event) {
				event.preventDefault();
				HCCP.FUNC.go(URL_ZIXUN_LIVE)
			});
			//跳我的资料页面
			$(".go_my").on('click', function(event) {
				event.preventDefault();
				HCCP.FUNC.go("../../user/user_index.html")

			});
			//跳转世界杯首页
			$(".go_world").on('click', function(event) {
				event.preventDefault();
				HCCP.FUNC.go("../../worldcup/index.html")
			});
			this.$nextTick(function() { //需要在所有的数据渲染完以后模板加载完成以后
				//tab切换后显示正常的位置
				function changeTabpositon() {
					var tab = $('.tab_wrap ul li');
					var newIndex = tab.filter('.selected').index();
					//console.log(newIndex)
					var li_length = tab.length
					var viewIndex = newIndex + 2;
					if(viewIndex > li_length - 1) {
						viewIndex = li_length - 1;
					}
					var viewEle = tab.eq(viewIndex);
					if(viewEle.length) {
						viewEle.get(0).scrollIntoView(false);
					}
				}
				changeTabpositon();
			})
			//滚动固定tab位置
			$(".content_inner").on("scroll", function() {
				if($("#banner").offset()) {
					var topPosition = $("#banner").offset().top;
					//					if(topPosition < -100) {
					//						$(".tab_wrap").css({
					//							"position": "fixed",
					//							"top": "0",
					//							"-webkit-transform": "translateZ(0)"
					//						})
					//						//还有隐藏的tab切换栏目需要处理
					//						$(".am-nav").css({
					//							"position": "fixed",
					//							"top": "0",
					//							"-webkit-transform": "translateZ(0)"
					//						})
					//
					//					} else if(topPosition > -100) {
					//						$(".tab_wrap").css({
					//							"position": "absolute",
					//							"top": "1.85rem",
					//						})
					//						$(".am-nav").css({
					//							"position": "absolute",
					//							"top": "1.85rem"
					//						})
					//					}
				}
			})

			//tab欄目靜態化的點擊跳轉 
			var pathUrl = window.location.pathname;
			//console.log(pathUrl);
			pathUrl = pathUrl.split("/");
			if(pathUrl.length > 2) {
				pathUrl = pathUrl[1];
			}
			if(pathUrl == 'kj') {
				pathUrl = 'kj/?jumpType=zixun'
			}
			var pathId = "index";
			for(var i = 0; i < this.columnInfo.length; i++) {
				if(this.columnInfo[i].tabUrl == pathUrl) {
					pathId = this.columnInfo[i].columnid;
				}
			}
			$(".ul_wrap ul li").removeClass("selected");
			for(var j = 0; j < $(".ul_wrap ul li").length; j++) {
				if($(".ul_wrap ul li")[j].attributes[0].nodeValue == pathId) {
					$(".ul_wrap ul li").eq(j).addClass("selected");
				}
				//console.log($(".ul_wrap ul li")[j].attributes[0].nodeValue)
			}
		}
	})
	
	//tab切换
	function tabClick(event) {
		//console.log(event)
		var tempName = event.target.innerText;
		var tabUrl = '';
		event.preventDefault();
		//console.log(window.location.origin);
		//被点击的的
		var columnid = "index";
		var columnidName = "头条";
		for(var i = 0; i < zixun.columnInfo.length; i++) {
			if(tempName == zixun.columnInfo[i].columnname) {
				tabUrl = zixun.columnInfo[i].tabUrl;
				columnid = zixun.columnInfo[i].columnid;
				columnidName = zixun.columnInfo[i].columnname;
			}
		}
		//		if(tabUrl == 'kj'){
		//			tabUrl = 'kj/?jumpType=zixun'
		//		}
		var TempURL = window.location.origin + "/" + tabUrl;
		//执行跳转
		window.location.href = TempURL;
		// 如果是头条则重新刷新并清空数据缓存

	}
	//以上是最新的重置函数



});