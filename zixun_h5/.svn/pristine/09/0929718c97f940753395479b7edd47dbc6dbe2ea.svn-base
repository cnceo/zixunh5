$(document).ready(function() {
	var HC = (function(){
		var LOTYID = [41];
		var CONFIG = {
			'41':{
				'maxIssue':50,
				'playAry':{
					'tuo': [1, 2, 3, 4, 5, 6, 7, 8, 9],
					'dan': [3, 4, 5, 6, 7, 8, 9]
				},
				'subNavListStr':['近期开奖', '走势', '冷热'],
				'subNavList':{
					'1': ['0', '1', '2'],
					'2': ['0', '1', '2'],
					'3': ['0', '1', '2'],
					'4': ['0', '1', '2'],
					'5': ['0', '1', '2'],
					'6': ['0', '1', '2'],
					'7': ['0', '1', '2'],
					'8': ['0', '1', '2'],
					'9': ['0', '1', '2']
				},
				'chartSet':{
					'1':{
						'play_id': '1',
						'type': ['1','2','3'] // 1开奖 2走势 3冷热 10后一走势
					},
					'2':{
						'play_id': '2',
						'type': ['1','2','3']
					},
					'3':{
						'play_id': '3',
						'type': ['1','2','3']
					},
					'4':{
						'play_id': '4',
						'type': ['1','2','3']
					},
					'5':{
						'play_id': '5',
						'type': ['1','2','3']
					},
					'6':{
						'play_id': '6',
						'type': ['1','2','3']
					},
					'7':{
						'play_id': '7',
						'type': ['1','2','3']
					},
					'8':{
						'play_id': '8',
						'type': ['1','2','3']
					},
					'9':{
						'play_id': '9',
						'type': ['1','2','3']
					}				
				},
				'allCode': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20','21'],
				'oneCounts':{
					'1':1,
					'2':1,
					'3':2,
					'4':3,
					'5':4,
					'6':5,
					'7':3,
					'8':4,
					'9':5
				},
				'oneBonus':{
					'1':[20],
					'2':[4],
					'3':[20],
					'4':[120],
					'5':[1120],
					'6':[20000],
					'7':[50, 5],
					'8':[500, 5, 2],
					'9':[5000, 100, 5]
				},
				'defaultSet':{
					'limit': 30,
					'yl': 1,
					'zx': 1,
					'tj': 1
				},
				'playTips':{
					'1': ['请至少选择1个号码，单注奖金<span class="hc-color-red">20</span>元'],
					'2': ['请至少选择1个号码，单注奖金<span class="hc-color-red">4</span>元'],
					'3': [
                        '请至少选择2个号码，单注奖金<span class="hc-color-red">20</span>元'
                        ],
					'4': [
                        '请至少选择3个号码，单注奖金<span class="hc-color-red">120</span>元'
                        ],
					'5': [
                        '请至少选择4个号码，单注奖金<span class="hc-color-red">1120</span>元'
                        ],
					'6': [
                        '请至少选择5个号码，单注奖金<span class="hc-color-red">20000</span>元'
                        ],
					'7': [
                        '请至少选择3个号码，单注奖金<span class="hc-color-red">5-50</span>元'
                        ],
					'8': [
                        '请至少选择4个号码，单注奖金<span class="hc-color-red">2-500</span>元'
                        ],
					'9': [
                        '请至少选择5个号码，单注奖金<span class="hc-color-red">5-5000</span>元'
                        ]
				},
			}
		};
		// 获取彩种
		var lotyId = HCCP.FUNC.getUrlParam('clickValueInt');
		if (!lotyId || LOTYID.indexOf(+lotyId) < 0) {
			lotyId = LOTYID[0];
		} else {}
		var PLAY_LIST_TUO = CONFIG[lotyId].playAry.tuo || [];
		try {
			var basic = JSON.parse(HCCP.dataS.local.get("basicTb"));
		} catch(e) {}
		// 默认玩法
		var basicTb = {
			'lotyId': lotyId,
			'playId':6,
			'dantuo':0,
			'type':0,
			'dan':[],
			'tuo':[]
		}
		if (basic && basic['lotyId'] == lotyId && FUNC.contain(PLAY_LIST_TUO, basic.playId)) {
			// 图表没有胆玩法
			basicTb.playId = basic['playId'];
			if(basic['type'] != undefined && basic['type'] >= 0){
				basicTb.type = basic['type'];
			}else{
				// console.log('type获取异常')
			}
			basicTb.tuo = basic['tuo'] instanceof Array ? basic['tuo'].slice(0) : [];
		} else {
			try {
				HCCP.dataS.local.del("basicTb");
				HCCP.dataS.local.del("default_betcontent");
				HCCP.dataS.local.del("confirm_betcontent");
			} catch (e) {}
		}
	
		try {
			var content = JSON.parse(HCCP.dataS.local.get("confirm_betcontent"));
		} catch(e) { }
		if(!content || !content[lotyId] || !(content[lotyId] instanceof Array)) {
			content = null;
			try {
				HCCP.dataS.local.del("confirm_betcontent");
			} catch (e) {}
		} else {}
		try {
			var defaultContent = JSON.parse(HCCP.dataS.local.get("default_betcontent"))[lotyId];
		} catch(e) { }
		if (!defaultContent ||  !(defaultContent instanceof Object)) {
			defaultContent = null;
			try {
				HCCP.dataS.local.del("default_betcontent");
			} catch (e) {}
		} else {}

		$('body').show();
		return function(){
			this.lotyId = basicTb.lotyId; // 当前彩种Id
			this.playId = basicTb.playId; // 当前玩法Id
			this.dantuo = basicTb.dantuo; // 当前玩法是否胆拖 1/0
			this.type = basicTb.type; // 当前图表Tab Index
			this.types = new Object(); // 记录对应玩法的tab 索引
			this.types[basicTb.playId] = basicTb.type;
			this.basicTb = $.extend({},basicTb || {});
			this.content = content ? $.extend({}, content) : content; // 默认数据
			this.defaultContent = defaultContent ? $.extend({}, defaultContent) : defaultContent; // 默认修改数据
			this.playListDan = []; // 胆玩法数组
			this.playListTuo = PLAY_LIST_TUO.slice(0); // 拖玩法数组
			this.playTips = $.extend({}, CONFIG[lotyId].playTips || {}); // 对应玩法提示
			this.subNavListStr = CONFIG[lotyId].subNavListStr.slice(0); // tab卡数组
			this.subNavList = $.extend({}, CONFIG[lotyId].subNavList || {}); // 玩法对应的tab
			this.chartSet = $.extend({}, CONFIG[lotyId].chartSet || {}); // 图表请求的参数
			this.defaultSet = $.extend({}, CONFIG[lotyId].defaultSet || {}); // 图表设置参数存储
			this.defaultSort = new Object(); // 记录冷热排序
			this.allCode = CONFIG[lotyId].allCode.slice(0); // 所有的选号
			this.cache = new Object(); // 缓存图表数据
			this.ajaxTime = new Object(); // 接口请求时间戳记录
			this.betObj = new Object(); // 投注内容
			this.oneCounts = CONFIG[lotyId].oneCounts; // 玩法对应的选号
			this.oneBonus = CONFIG[lotyId].oneBonus; // 玩法对应的奖金
			this.maxIssue = CONFIG[lotyId].maxIssue; // 一天所开的期数

			this._init = function(){
				var self = this;
				self.oneBindEvent().setBasic().setHeader().oneSetNav().getIssue().creatChartArea().changeSetting().oneSetDefaults().addSelectNum().changeFoot();
			}
			this.oneBindEvent = function(){
				var self = this;
				var o = 'click';
				//goback
				$('.head-icon-back').on(o,function(){ self.goBack.call(self)});
				// 玩法切换
				$('.hc-head-drop').on(o, function() {
					$nav = $('.hc-nav-mask').toggle();
				})
				$('#hc-nav').on(o, '.hc-nav-mask', function() {
					$('.hc-nav-mask').hide();
				}).on(o, '.hc-nav', function(e) {
					return false;
				}).on(o, '[data-pid]', function() {
					self.changePlay.call(self,this).changeSetting();
					return false;
				});
				$('#hc-chart').on(o, 'nav>li', function(){
					self.changePlayChart.call(self,this).changeSetting().scrollReset();
				}).on(o, '[data-sort]', function(){
					self.tableSort.call(self,this);
				});

				$('#hc-chart').on(o, '[ballval]', function(){
					self.selectBall.call(self,this).addSelectNum().changeFoot();
				})
				// 设置
				$('.head-icon-setting').on(o, function(){
					self.showSetting();
				})
				//提交
				$("[name=submit]").on(o,function(){
					self.doConfirm.call(self,this); 
				});

				return this;
			}
			//滚动绑定
			this.scrollEvent = function(){
				$('.hc-scroll-x').scrollLeft(0).off('scroll').scroll(function(){
					var that = $(this);
					var $parent = that.parents('.hc-chart-area');
					if(self.scrollTimer){
						clearTimeout(self.scrollTimer)
					}
					self.scrollTimer = setTimeout(function(){
						var $scrolls = $parent.find('.hc-scroll-x').not(that[0]).scrollLeft(that[0].scrollLeft);
					},100)
				});
			}
			// 当前玩法滚动到默认位置
			this.scrollReset = function(){
				var self = this;
				var lotyId = self.lotyId;
				var playId = self.playId;
				var dantuo = self.dantuo;
				var type = self.type;
				try{
					if(type == 1){
						var $area = $('.chart-area-'+playId+'-'+dantuo);
						var that = $area.find('.hc-select-ball .hc-scroll-x');
						$area.find('.hc-scroll-x').scrollLeft(that[0].scrollLeft);	
					}else{

					}
				}catch(e){

				}
				return this;
			}
			// 返回
			this.goBack = function(){
				HCCP.dataS.local.del('basicTb');
				self.location=document.referrer;
			}
			// 切换玩法
			this.changePlay = function(target){
				var self = this;
				var that = $(target),
					pid = that.data('pid'),
					dan = that.data('dan');
				dan = dan == 1 ? 1 : 0;
				if (!that.hasClass('active')) {
					var $nav = $('.hc-nav-mask');
					// 切换导航状态
					$nav.find('a[data-pid].active').removeClass('active');
					that.addClass('active');
					$nav.hide();

					self.playId = pid;
					self.dantuo = dan;
					self.types[pid] = self.types[pid] || 0;
					self.type = self.types[pid];
					self.setBasic().setHeader().creatChartArea().changeFoot();
				}else{
					$('.hc-nav-mask').hide();
				}
				return this;
			}
			// 切换图表类型
			this.changePlayChart = function(target){
				var self = this;
				var that = $(target);
				if(that.hasClass('active')){
					// console.log('重复点击当前玩法图');
				}else{
					var type = that.index();
					var lotyId = self.lotyId;
					var playId = self.playId;
					var dantuo = self.dantuo;
					self.type = type;
					self.types[playId] = type;
					self.setBasic().changeTab().creatChart(lotyId, playId, dantuo, type);
				}
				return this;
			}
			// 确认投注
			this.doConfirm = function(target){
				var self = this;
				var that = $(target);
				var lotyId = self.lotyId;
				var playId = self.playId;
				var dantuo = self.dantuo;
				if(that.hasClass('disabled')){
					if(that.text() === '停售'){
                        HCCP.modal.warning({'msg':'彩种暂停销售'});
						// console.log('彩种暂停销售');
					}else{
                        HCCP.modal.warning({'msg':'期号获取中'})
						// console.log('期号获取中');
					}
				}else{
					self.getTips();
					var tips = self.selectTips || {};
					if(tips.randOne){
						self.randOne().addSelectNum().changeFoot();
					}else if(tips.showTips){
						HCCP.modal.warning({'msg': tips.showTips});
					}else{
						if(tips.zhushu < 1){
							// console.log('注数异常:'+tips.zhushu);
						}else{
							// 判断限号
							var item = self.betObj[playId+'_'+dantuo] ? self.betObj[playId+'_'+dantuo] : {};
							var limit = self.issueData && self.issueData.limit ? self.issueData.limit : {};	
							var limitCode = self.checkLimitNum(item,limit) || [];
							if(limitCode.length){
								HCCP.modal.alert({
									title:'官方限号',
									msg:'以下组合玩法及投注号码暂不接受投注<br/>【'+ self.getPlayName(lotyId, playId) + '】&nbsp;'+ limitCode.map(function(y){ return y.replace(/,/g,' ');}).join(',') + '组合',
									alertBtn:'返回修改'
								});
							}else{
								// 存下数据 去确认投注页
								var bonus = self.getBonus([item],lotyId, self.oneCounts, self.oneBonus);
								if(item.zs *2 > bonus[1]){
									HCCP.modal.confirm({
										'msg':'您当前的投注金额大于理论最高奖金，会造成方案亏损，您确认要继续投注吗？',
										confirmCallback:function(){
											self.setBetContent().goConfirm();
										}
									})
								}else{
									self.setBetContent().goConfirm();
								}
							}
						}
					}
				}	
				return this;
			}
			/**
			 * [getBonus 计算最大最小奖金，无法计算含有排列玩法的混合投注]
			 * @param  {[type]} data      [description]
			 * @param  {[type]} lotyId    [description]
			 * @param  {[type]} oneCounts [description]
			 * @param  {[type]} oneBonus  [description]
			 * @return {[type]}           [返回【max,min】]
			 */
			this.getBonus = function(data, lotyId, oneCounts, oneBonus){
				var self = this;
				if(!(data instanceof Array) || !data.length){
					return [0,0];
				}
				var min = 0, max = 0;
				if(lotyId == 41){
					// 玩法一的处理
					if(data[0].playId == 1){
						var hyt = {},bonus = [];
						$.each(data,function(x,y){
							var tuo = y.tuo || [];
							tuo.map(function(y){
								if(hyt[y]){
									hyt[y] += 1;
								}else{
									hyt[y] = 1;
								}
							})
						})
						for(var code in hyt){
							bonus.push(hyt[code]);
						}
						if(bonus.length){
							max = FUNC.Math.max(bonus) * self.oneBonus[1][0];
							min = FUNC.Math.min(bonus) * self.oneBonus[1][0];
						}else{
							max = 0;
							min = 0;
						}
						return [min, max];
					}

					var allCode = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20','21'];
					var openCodeLen = 5;
					var allOpenCode = FUNC.getCombin(allCode,openCodeLen);	
					for (var i = 0; i < allOpenCode.length; i++) {
						var openCode = allOpenCode[i];
						var total = 0;
						$.each(data,function(i,item){
							var playId = item.playId;
							var dantuo = item.dantuo;
							var dan = item.dan;
							var tuo = item.tuo;
							var count = oneCounts[playId];
							var bonus = oneBonus[playId];
							var bonusLen = bonus.length;
							var money = 0;
							var intersect = [], intersectLen = intersect.length;

							if(!dantuo || (dantuo && count>dan.length && dan.length > 0 && FUNC.intersect(openCode, dan).length == dan.length)){
								var danLen = dan.length;
								if(!dantuo){
									danLen = 0;
									dan = [];
								}else{}

								// 计算
								intersect = FUNC.intersect(openCode, tuo);
								intersectLen = intersect.length;
								for (var i = 0; i < bonusLen; i++) {
									if(intersectLen >= count-danLen-i && count-danLen-i > 0){
                                        if(i == 0){
                                            money += FUNC.zh(intersectLen, count-danLen-i) * bonus[i];
                                        }else{
                                            if(tuo.length-intersectLen >= i){
                                                money += FUNC.zh(intersectLen, count-danLen-i) * FUNC.zh(tuo.length-intersectLen, i) * bonus[i];
                                            }else{
                                                money += 0;
                                            }
                                        }
                                    }else {
                                        money += 0;
                                    }
								}
							}else{
								money += 0;
							}
							total += money;
						});
						if(total > 0){
							if(min <= 0 || min > total){
								min = total; 
							}
							if(max <= 0 || max < total){
								max = total;
							}	
						}
					}
				}else{
					// console.log('其他玩法算最大最小奖金待添加')
				}

				return [min, max];
			}
			this.goConfirm = function(){
				HCCP.dataS.local.del('basicTb');
				HCCP.FUNC.go(URL_KLSF_CONFIRM);
			}
			/**
             * [getTips 检测当前选号是否满足购买要求，返回对应信息]
             * @return {[type]} [{
             *                      randOne,  //1随机一注 0无
             *                      showTips, //提示语,没有是为空
             *                      zhushu    //当前选号注数   
             *                  }]
             */
			this.getTips = function(){
				var self = this;
				var lotyId = self.lotyId;
				var playId = self.playId;
				var dantuo = self.dantuo;
				var key = playId + '_' + dantuo;
				var betObj = $.extend({},self.betObj[key]||{});
				var dan = betObj.dan || [];
				var danLen = dan.length;
				var tuo = betObj.tuo || [];
				var tuoLen = tuo.length;
				var totalLen = danLen + tuoLen;
				var oneCounts = self.oneCounts[playId];
				var randOne = 0, showTips = null, zhushu = betObj.zs;
				if(dantuo){
					if(danLen < 1){
						showTips = '请至少选择1个胆码';
					}else if(tuoLen < 2){
						showTips = '请至少选择2个拖码';
					}else if(totalLen <= oneCounts){
						showTips = '请至少选择'+(oneCounts+1)+'个号码(胆码+拖码)';
					}else{
						// 满足多注
						if(betObj.zs < 2){
							// console.log('数据注数错误 || 号码错误');
						}else{}
					}
				}else{
					if(!!totalLen){
						if(totalLen < oneCounts){
							showTips = '请至少选择'+oneCounts+'个号码';
						}else{
							// 满足一注
							if(betObj.zs < 1){
								// console.log('数据注数错误 || 号码错误');
							}else{}
						}
					}else{
						randOne = 1;
					}
				}

				self.selectTips = null;
				self.selectTips = {
					'randOne': randOne,
					'showTips': showTips,
					'zhushu': zhushu
				}
				return this;
			}
			// 随机一注
			this.randOne = function(lotyId, playId, dantuo){
				var self = this;
				lotyId = lotyId || self.lotyId;
				playId = playId || self.playId;
				dantuo = dantuo || self.dantuo;
				var oneCounts = self.oneCounts[playId];
				var quickSelectAll = (oneCounts >= 1 && oneCounts <= 21) ? HCCP.MATH.random(1, 21, oneCounts).map(function(y){return FUNC.formatNumber(y);}) : [];
				var data = {
					'lotyId':lotyId,
					'playId':playId,
					'dantuo':dantuo,
					'dan':[],
					'tuo': quickSelectAll.slice(0)
				}
				self.addSelectBall(data);
				return this;
			}
			/**
             * [checkLimitNum 检测限号 返回限号组合数组]
             * @param  {[Object]} item     [单个玩法投注内容]
             * @param  {[Object]} limitObj [所有玩法的限号]
             * @return {[array]}           [投注内容的限号数组]
             */
			this.checkLimitNum = function(item, limitObj){
				var limitCode = [];
				var lotyId = item.lotyId;
				var playId = item.playId;
				var dantuo = item.dantuo;
				var limit = limitObj && limitObj[playId] instanceof Array  ? limitObj[playId].slice(0) : [];
				if(!limit.length || lotyId == undefined || playId == undefined || dantuo == undefined){
					return limitCode;
				}else{
					var dan = item.dan || [];
					var tuo = item.tuo || [];
					var danLen = dan.length;
					var tuoLen = dan.length;
					var totalArr = dantuo ? dan.concat(tuo) : [].concat(tuo);
					var totalLen = danLen + tuoLen;
					var oneLimitCode,code,limitFlag;
					if(limit && limit.length){
						for (var i = 0; i < limit.length; i++) {
							oneLimitCode = limit[i] ? limit[i].split(',') : [];
							limitFlag = true;
							if(dantuo && (FUNC.intersect(oneLimitCode,dan).length != danLen)){
								limitFlag = false;
							}else{
								for (var j = 0; j < oneLimitCode.length; j++) {
									code = oneLimitCode[j];
									if(!FUNC.contain(totalArr,code)){
										limitFlag = false;
										break;
									}
								}	
							}
							if(limitFlag){
								limitCode.push(limit[i]);
							}else{}
						}
					}else{
						// 没有限号
					}
					return limitCode;
				}
			}
			// 存储选择的号码
			this.setBetContent = function(){
				var self = this;
				var lotyId = self.lotyId;
				var playId = self.playId;
				var dantuo = self.dantuo;
				var data = self.betObj[playId+'_'+dantuo];
				if(!self.content){
					self.content = new Object();
					self.content[lotyId] = new Array();
				}

				if(self.defaultContent) {
					var index = self.defaultContent.confirm_id;
					if(self.content[lotyId].length > index){
						self.content[lotyId].splice(index,1);
					}
					HCCP.dataS.local.del("confirm_betcontent");
				}
				self.content[lotyId].unshift(data);

				HCCP.dataS.local.set("confirm_betcontent", JSON.stringify(self.content));
				return this;
			}
			this.setBasic = function(basic) {
				if (!(basic instanceof Object)) {
					basic = {
						"lotyId": this.lotyId,
						"playId": this.playId,
						"dantuo": this.dantuo,
						"type": this.type,
						"dan":this.basicTb.dan || [],
						"tuo":this.basicTb.tuo || []
					}
				}else{
					// 直接存
				}
				try {
					HCCP.dataS.local.set("basicTb", JSON.stringify(basic));
				} catch (e) {}
				return this;
			}
			// 设置按钮的显示、隐藏（冷热）
			this.changeSetting = function(){
				var self = this;
				var lotyId = self.lotyId;
				var playId = self.playId;
				var type = self.type;
				if(type == 2){
					$('.head-icon-setting').hide();
				}else{
					$('.head-icon-setting').show();
				}
				return this;
			}
			// 设置title玩法显示
			this.setHeader = function(lotyId, playId) {
				lotyId = lotyId == undefined ? this.lotyId : lotyId;
				playId = playId == undefined ? this.playId : playId;
				var lotyName = this.getLotyName(lotyId);
				var playName = this.getPlayName(lotyId, playId);
				var $title = $('.hc-head-drop');
				$title.text(playName);
				// 设置下底部的中奖奖金提示
				var bonusArr = ['--','20','4','20','120','1120','20000','5-50','2-500','5-5000'];
				// var $bonus = $('[name=bonus]');
				var bonus = bonusArr[playId] || '--';
				// $bonus.text(bonus);

				var tips = this.playTips[playId] || '';
				$('.hc-total-inner').find('[name=bonus]').text(bonus).end().hide().next().html(tips).show();
				return this;
			}
			/**
			 * [oneSetNav description] 设置导航玩法激活状态
			 * @param {[type]} lotyId      [当前彩种id]
			 * @param {[type]} playId      [当前玩法id]
			 * @param {[type]} dantuo      [当前是否胆投注1/0]
			 * @param {[type]} playListTuo [支持的普通玩法playid数组]
			 * @param {[type]} playListDan [支持的胆拖玩法playid数组]
			 */
			this.oneSetNav = function(lotyId, playId, dantuo, playListTuo, playListDan) {
				var self = this;
				lotyId = lotyId == undefined ? this.lotyId : lotyId;
				playId = playId == undefined ? this.playId : playId;
				dantuo = dantuo == undefined ? this.dantuo : dantuo;
				playListTuo = playListTuo || this.playListTuo;
				playListDan = playListDan || this.playListDan;
				var navListHtml = (function() {
					var tuoText = playListTuo.map(function(y) {
						return '<li class="hc-margin-vertical-xs hc-padding-left-lsm">' +
							'<a data-pid="' + y + '" data-dan="0" class="hc-nav-btn hc-block hc-radius-sm ' + (y == playId && !dantuo ? 'active' : '') + '">' +
							self.getPlayName(lotyId, y) +
							'</a>' + '<span class="hc-nav-tips" data-key="'+y+'_0'+'"></span></li>';
					}).join('');
					var danText = playListDan.map(function(y) {
						return '<li class="hc-margin-vertical-xs hc-padding-left-lsm">' +
							'<a data-pid="' + y + '" data-dan="1" class="hc-nav-btn hc-block hc-radius-sm ' + (y == playId && dantuo ? 'active' : '') + '">' +
							self.getPlayName(lotyId, y) +
							'</a>' + '<span class="hc-nav-tips" data-key="'+y+'_0'+'"></span></li>';
					}).join('');
					return (playListTuo.length ?
						('<div class="hc-hr"><span class="hc-line"></span><span class="hc-text-center hc-block">普通投注</span></div><ul class="hc-avg-3 hc-padding-bottom-xs hc-padding-right-lsm">' +
							tuoText + '</ul>') : '') + (playListDan.length ?
						('<div class="hc-hr"><span class="hc-line"></span><span class="hc-text-center hc-block">胆拖投注</span></div><ul class="hc-avg-3 hc-padding-bottom-xs hc-padding-right-lsm">' +
							danText + '</ul>') : '');
				})();
				if (navListHtml) {
					navListHtml = '<div class="hc-nav-mask"><div class="hc-g hc-nav hc-animation-slide-top hc-bg-ff hc-padding-vertical-sm">' + navListHtml + '</div><div>';
					var $nav = $('#hc-nav').empty().append(navListHtml);
				}
				return this;
			}
			/**
             * [setNavTips 设置玩法的嘉奖、最新状态]
             * @param {[type]} data [description]
             */
            this.setNavTips = function(data){
                var self = this;
                var playIdentity = data.playIdentity || [];
                var pidAry = ['','1','2','3','4','5','6','7','8','9','3','4','5','6','7','8','9'];
                if(!$.isEmptyObject(playIdentity)){
                    var $navLi = $('#hc-nav').find('span[data-key]');
                    for(var k in playIdentity){
                        var tag = playIdentity[k];
                        var pid = pidAry[k] || '';
                        var dantuo = k >= 10 ? 1 : 0;
                        if(pid){
                            $navLi.filter('[data-key='+pid+'_'+dantuo+']').addClass('hc-nav-tips-'+tag);
                        }
                    }
                }else{
                    // console.log('数据为空不处理');
                }
                delete this.setNavTips;
                return this;
            }
            /**
             * [showSetting 显示设置modal]
             * @param  {[type]} lotyId [description]
             * @param  {[type]} playId [description]
             * @param  {[type]} dantuo [description]
             * @param  {[type]} type   [description]
             * @return {[type]}        [description]
             */
			this.showSetting = function(lotyId, playId, dantuo, type){
				var self = this;
				lotyId = lotyId == undefined ? this.lotyId : lotyId;
				playId = playId == undefined ? this.playId : playId;
				dantuo = dantuo == undefined ? this.dantuo : dantuo;
				type = type == undefined ? this.type : type;

				var showYl = type == 1 ? 1 : 0;
				var showZx = type == 1 && playId == 1 ? 1 : 0;
				var showTj = type == 1 ? 1 : 0;
				var limit = self.defaultSet.limit || 30;
				var yl = self.defaultSet.yl ? 1 : 0;
				var zx = self.defaultSet.zx ? 1 : 0;
				var tj = self.defaultSet.tj ? 1 : 0;
				var setStr = '';
				if(type != 2){
					setStr = (function(){
						var h = '';
						h += '<div id="hc-chart-set" class="set-wrap">';
				        h +=    '<div>';
				        h +=         '<div class="set-con hc-padding-sm">';
				        h +=             '<div class="clearfix set-title">';
				        h +=                 '<span><label></label></span>';
				        h +=                 '<span>走势图设置</span>';
				        h +=                 '<span><label></label></span>';
				        h +=             '</div>';
				        h +=             '<ul class="clearfix set-qs hc-margin-top-sm">';
				        h +=                 '<li data-numissue="30" class="'+(limit == 30 ? 'active' : '')+'">近30期</li>';
				        h +=                 '<li data-numissue="50" class="'+(limit == 50 ? 'active' : '')+'">近50期</li>';
				        h +=                 '<li data-numissue="100" class="'+(limit == 100 ? 'active' : '')+'">近100期</li>';
				        h +=             '</ul>';
				        h +=             '<div class="clearfix set-display hc-margin-top-sm hc-padding-horizontal-lg">';
				        h +=                 '<ul class="hc-avg-2 set-yl" '+(showYl ? '': 'style="display:none"')+'>';
				        h +=                     '<li class="'+(yl ? 'active' : '')+'">显示遗漏</li>';
				        h +=                     '<li class="'+(yl ? '' : 'active')+'">隐藏遗漏</li>';
				        h +=                 '</ul>';
				        h +=                 '<ul class="hc-avg-2 set-zx" '+(showZx ? '': 'style="display:none"')+'>';
				        h +=                     '<li class="'+(zx ? 'active' : '')+'">显示折线</li>';
				        h +=                     '<li class="'+(zx ? '' : 'active')+'">隐藏折线</li>';
				        h +=                 '</ul>';
				        h +=                 '<ul class="hc-avg-2 set-tj" '+(showTj ? '': 'style="display:none"')+'>';
				        h +=                     '<li class="'+(tj ? 'active' : '')+'">显示统计</li>';
				        h +=                     '<li class="'+(tj ? '' : 'active')+'">隐藏统计</li>';
				        h +=                 '</ul>';
				        h +=             '</div>';
				        h +=             '<div class="clearfix hc-margin-top-lg">';
				        h +=                 '<span class="set-btn set-cancel">取消</span>';
				        h +=                 '<span class="set-btn set-sure">确认</span>';
				        h +=             '</div>';
				        h +=         '</div>';
				        h +=     '</div>';
				        h += '</div>';
				        return h;
					})();
				}else{
					setStr = '';
				}
				if(setStr){
					var $set = $(setStr);
					$('body').append($set);
					$set.off('click').on('click','[data-numissue],.set-display li',function(){
						var that = $(this);
						that.addClass('active').siblings().removeClass('active');
					}).on('click','.set-cancel',function(){
						$set.off('click').remove();
					}).on('click','.set-sure',function(){
						var o = {
							'limit': $('.set-qs li.active',$set).attr('data-numissue') || 30,
							'yl': ($('.set-yl li.active',$set).index() == 0 ? 1 : 0),
							'zx': ($('.set-zx li.active',$set).index() == 0 ? 1 : 0),
							'tj': ($('.set-tj li.active',$set).index() == 0 ? 1 : 0)
						}
						
						if(JSON.stringify(o) != JSON.stringify(self.defaultSet)){
							var oldSet = $.extend({},self.defaultSet || {});
							self.defaultSet = $.extend({},o || {});

							var $chart = $('#hc-chart');
							if(o.yl != oldSet.yl){
								if(o.yl){
									$chart.find('.hc-yl').show();
								}else{
									$chart.find('.hc-yl').hide();
								}
							}
							if(o.zx != oldSet.zx){
								if(o.zx){
									$chart.find('.hc-canvas').show();
								}else{
									$chart.find('.hc-canvas').hide();
								}
							}
							if(o.tj != oldSet.tj){
								if(o.tj){
									$chart.find('.hc-tj').show();
								}else{
									$chart.find('.hc-tj').hide();
								}
							}
							if(o.limit != oldSet.limit){
								self.creatChart(lotyId, playId, dantuo, type);
							}
						}
						$set.off('click').remove();
					});
				}
				return this;
			}
			// 更新服务器时间差
			this.getServerTime = function (serverTime) {
				var self = this;
				serverTime = serverTime || HCCP.FUNC.diff_time();
				self.diffServer = serverTime*1000 - new Date().getTime();
				// 暂定个6分钟跟新下服务器时间
				if(self.getServerTimeTimer){
					clearTimeout(self.getServerTimeTimer);
				}
				self.getServerTimeTimer = setTimeout(function(){self.getServerTime()}, 300000);
				return this;
			}
			// 获取当前期
			this.getIssue = function(lotyId, playId, dantuo){
				var self = this;
				lotyId = lotyId == undefined ? this.lotyId : lotyId;
				playId = playId == undefined ? this.playId : playId;
				dantuo = dantuo == undefined ? this.dantuo : dantuo;
				if (!self.getIssueFlag) {
					self.issueData = null;
					HCCP.ajax._get({
						'url': '/trade/currentissue/' + lotyId,
						'complete': callBack
					})
					self.getIssueFlag = true;
				} else {}
				function callBack(res){
					self.getIssueFlag = false;
					if (res && res.code == 200 && res.data) {
						self.issueData = $.extend({},res.data || {});
						self.getServerTime(res.data.serverTime);
						self.issue = res.data.issue;
						self.setIssue(res.data);
						if(self.setNavTips){
							self.setNavTips(res.data);
						}
					} else {
						self.issue = null;
						// console.log('当前期获取异常，3S后重新拉取');
						if (self.getIssueTimer) {
							clearTimeout(self.getIssueTimer);
						}
						self.getIssueTimer = setTimeout(function() {
							self.getIssue.call(self);
						}, 3000)
					}
					self.setBtn();
				}
				return this;
			}
			// 设置当前期
			this.setIssue = function(data){
				var self = this;
				var $issue = $('[name=issue]');
				var $time = $('[name=cdtime]');
				var subIssue = data.issue.toString().substr(-2);
				$issue.text('距'+subIssue+'期截止：');
				$time.text('');
				// 倒计时
				self.countDown(data, update, handle);
				function update(showTime){
                    // 未截止
                    self.errTimes = 1;
                    // 更新时间
                    if($issue.text() != '距'+subIssue+'期截止：'){
                        $issue.text('距'+subIssue+'期截止：');
                    }
                    $time.text(showTime);
                }
                function handle(){
                   // 截止了更新信息
                    self.issue = null;
                    self.setBtn();
                    $issue.text('期号获取中...');
					$time.text('');
                   
                    // 防止期号异常造成死循环
                    if(!self.errTimes){ self.errTimes = 1};
                    if(self.errTimes == 1){
                        var oldIssue = subIssue;
                        var nowIssue = +oldIssue + 1;
                        nowIssue = nowIssue > self.maxIssue ? '01' : FUNC.formatNumber(nowIssue);
                        HCCP.modal.alert({'msg':oldIssue+'期已截止<br>当前期号为'+nowIssue+'期'});  
                    }
                    if(self.errTimes > 5){
                        // console.log('下一期获取异常,请刷新页面重试！');
                        return false;
                    }else{
                        setTimeout(function(){
                            self.getIssue().creatChart(); // 这里异步要处理期号回掉后拿图表
                        },1000)
                    }
                    self.errTimes++; 
                }
				return this;
			}
			this.countDown = function(data, update, handle){
				var self = this;
				var serverTime = Math.ceil((new Date().getTime() + (self.diffServer || 0))/1000);
				var companyEndTime = data.companyEndTime;
				var diffTime =  companyEndTime - serverTime;
				var showH = FUNC.formatNumber(Math.floor(diffTime/3600));
				var showI = FUNC.formatNumber(Math.floor((diffTime%3600)/60));
				var showS = FUNC.formatNumber(diffTime%60);
				if(diffTime < 0){
					handle.call(self);
				}else{
					// 未截止
					var showTime = showH === '00' ? (showI+' : '+showS) : (showH+' : '+showI+' : '+showS);
					update.call(self,showTime);
					// 更新时间
					if(self.countDownTimer){
						clearTimeout(self.countDownTimer);
					}
					self.countDownTimer = setTimeout(function(){
						self.countDown(data, update, handle);
					}, 1000);
				}
				return this;
			}
			// 修改投注按钮
			this.setBtn = function(){
				var self = this;
				var stop = self.issueData ? (self.issueData.stop == 1 ? 1 : 0) : 0;
				var $btn = $('[name=submit]');
				var txt = '确定';
				if(stop){
					$btn.text('停售').addClass('disabled');
				}else if(!self.issue){
					if($btn.text() != txt){
						$btn.text(txt);
					}else{}
					$btn.addClass('disabled');
				}else{
					if($btn.text() != txt){
						$btn.text(txt)
					}else{}
					$btn.removeClass('disabled');
				}
				$btn.show();
				return this;
			}
			// 选号操作
			this.selectBall = function(target){
				var self = this;
				var that = $(target);
				var val = that.attr('ballval');
				var dantuo = self.dantuo;
				var lotyId = self.lotyId;
				var playId = self.playId;
				var $area = $('.chart-area-'+playId+'-'+dantuo);
				if(that.hasClass('active')){
					that.removeClass('active');
				}else{
					if(dantuo){
						// console.log('图表没有胆拖')
					}else{
						that.addClass('active');
					}
				}

				return this;
			}
			// 添加选号
			this.addSelectNum = function(){
				var self = this;
				var lotyId = self.lotyId;
				var playId = self.playId;
				var dantuo = self.dantuo;
				var $area = $('.chart-area-'+playId+'-'+dantuo);
				var key = playId + '_' + dantuo;
				var o = new Object();
				o.lotyId = lotyId;
				o.playId = playId;
				o.dantuo = dantuo;
				o.isDan = dantuo;
				if(dantuo){
					// console.log('图表没有胆拖');
					o.dan = [];
					o.tuo = [];
				}else{
					o.dan = [];
					o.tuo = [].slice.call($area.find('.hc-select-ball [ballval].active').map(function(){return $(this).attr('ballval')}));
				}
				// 计算下注数
				var oneCounts = self.oneCounts[playId];
				var danLen = o.dan.length;
				var tuoLen = o.tuo.length;
				var totalLen = danLen + tuoLen;
				if(dantuo){
					if(danLen < 1 || oneCounts-danLen < 1 || tuoLen < oneCounts-danLen ){
						o.zs = 0;
					}else{
						o.zs = FUNC.zh(tuoLen,oneCounts-danLen);
					}
				}else{
					o.zs = tuoLen < oneCounts ? 0 : FUNC.zh(tuoLen,oneCounts);
				}

				o.hasSelect = !!(danLen + tuoLen);
				self.betObj[key] = null;
				self.betObj[key] = $.extend({},o || {});
				o = null;
				return this;
			}
			/**
			 * [addSelectBall 批量操作选号]
			 * @param {[object]} datas [{选号数据}]
			 */
			this.addSelectBall = function(datas){
				var self = this;
				if(datas && datas instanceof Object){
					var data = $.extend({},datas || {});
					var dantuo = data.dantuo;
					var lotyId = data.lotyId;
					var playId = data.playId;
					var dan = data.dan || [];
					var tuo = data.tuo || [];
					var $area = $('.chart-area-'+playId+'-'+dantuo);
					if(dantuo){
						// console.log('这里木有胆玩法')
					}else{
						var $balls = $area.find('.hc-select-ball').find('[ballval]');
						$balls.each(function(){
							if(tuo.indexOf($(this).attr('ballval')) > -1){
								$(this).addClass('active');
							}else{
								$(this).removeClass('active');
							}
						});
					}
				}else{
					// console.log('数据错误')
				}
				return this;
			}
			// 设置投注区传入的默认选号数据
			this.oneSetDefaults = function(){
				var self = this;
				var basicTb = self.basicTb;
				if(basicTb){
					self.addSelectBall(basicTb);
				}
				return this;
			}
			// 切换注数金额 奖金提示
			this.changeFoot = function(lotyId, playId, dantuo, type) {
				var self = this;
				lotyId = lotyId == undefined ? this.lotyId : lotyId;
				playId = playId == undefined ? this.playId : playId;
				dantuo = dantuo == undefined ? this.dantuo : dantuo;
				type = type == undefined ? this.type : type;

				var key = playId + '_' + dantuo;
				var betObj = $.extend({},self.betObj[key]||{});
				var hasSelect = betObj.hasSelect;
				var zhushu = isNaN(parseInt(betObj.zs,10)) ? 0 : parseInt(betObj.zs,10);
				var money = zhushu * 2;
				$('[name=zs]').text(zhushu);
				$('[name=money]').text(money);
				if(hasSelect){
					$('.hc-total-inner').show().next().hide();
				}else{
					$('.hc-total-inner').hide().next().show();
				}

				return this;
			}
			// 图表类型切换
			this.changeTab = function(lotyId, playId, dantuo, type){
				var self = this;
				lotyId = lotyId == undefined ? this.lotyId : lotyId;
				playId = playId == undefined ? this.playId : playId;
				dantuo = dantuo == undefined ? this.dantuo : dantuo;
				type = type == undefined ? this.type : type;
				var $betArea = $('#hc-chart .chart-area-' + playId + '-' + dantuo);

				var $tabLi = $betArea.find('nav > li').eq(type);
				var $chartLi = $betArea.find('.chart-main > li').eq(type);
				$tabLi.addClass('active').siblings('li').removeClass('active');
				$chartLi.show().siblings('li').hide();
				return this;
			}
			/**
			 * [creatBetArea description] 创建投注区域
			 * @param  {[type]} lotyId [description]
			 * @param  {[type]} playId [description]
			 * @param  {[type]} dantuo [description]
			 * @return {[type]}        [description]
			 */
			this.creatChartArea = function(lotyId, playId, dantuo, type){
				var self = this;
				lotyId = lotyId == undefined ? this.lotyId : lotyId;
				playId = playId == undefined ? this.playId : playId;
				dantuo = dantuo == undefined ? this.dantuo : dantuo;
				type = type == undefined ? this.type : type;
				var $betContent = $('#hc-chart');
				var $betArea = $betContent.find('.chart-area-' + playId + '-' + dantuo);
				// 如果此玩法区域不存在 那么就创建
				if (!$betArea.length) {
					var areaHtml = (function(){
						var ballArr = self.allCode;
						var navList = self.subNavList[playId];
						var navLen = navList.length;
						if(navLen <= type || navLen < 0){
							// console.log('type异常,tab卡数据异常');
							return '';
						}else{
							var h = '<div class="hc-chart-area hc-flex-column-re chart-area-'+playId+'-'+dantuo+'">'
							h += '<nav class="hc-avg-'+navLen+'">';
							h += navList.map(function(y,i){return '<li class="'+(i == type ? 'active' : '')+'">'+(self.subNavListStr[y] || '')+'</li>'}).join('');
							h += '</nav>';
							h += '<ul class="chart-main hc-flex-1-re">';
							h += navList.map(function(y,i){ return '<li class="hc-ag '+(i == type ? '' : 'hide')+'"><div class="hc-padding-top-lg">数据加载中...</div></li>'}).join('');
							h += '</ul>';
							h += '<div class="hc-select-ball"><div class="hc-flexbox">';
							h += '<div class="hc-scroll-left"><table><tbody><tr><td>选号</td></tr></tbody></table></div>';
							h += '<div class="hc-flex hc-scroll-x hc-scroll-right"><table><tbody><tr>';
							h += ballArr.map(function(y){ return '<td><span class="hc-ball-sm" ballval="'+y+'">'+y+'</span></td>';}).join('');
							h += '</tr></tbody></table></div>';
							h += '</div></div>';
							return h;	
						}
					})();
					$betArea = $(areaHtml);
					$betContent.append($betArea);
					// console.log('创建当前玩法图表外围完成')
				}else{}
				$betArea.show().siblings('.hc-chart-area').hide();
				// self.creatChart(lotyId,playId,dantuo,type);
				self.changeTab().creatChart(lotyId,playId,dantuo,type);
				return this;
			}
			// 添加对应玩法图表
			this.creatChart = function(lotyId, playId, dantuo, type){
				var self = this;
				lotyId = lotyId == undefined ? this.lotyId : lotyId;
				playId = playId == undefined ? this.playId : playId;
				dantuo = dantuo == undefined ? this.dantuo : dantuo;
				type = type == undefined ? this.type : type;
				var $betArea = $('#hc-chart .chart-area-' + playId + '-' + dantuo);
				if($betArea.length){
					var tabLiLen = $betArea.find('nav > li').eq(type).length;
					var chartLiLen = $betArea.find('.chart-main > li').eq(type).length;
					if(tabLiLen && chartLiLen){
						var o = self.getChartType(lotyId, playId, dantuo, type, self.chartSet);					
						if(o.play_id && o.type){
							// 这里 判断下是否需要重新去取数据
							var limit = self.defaultSet.limit || 30;
							limit = o.type == 3 ? 100 : limit;  // 冷热特殊化100
							var key = o.play_id + '_' + o.type + '_' + limit;
							var data = self.cache[key] || null;
							// 获取图表信息接口
							self.getData = function (lotyId, playId, dantuo, type, play_id, play_type, limit){
								self.ajaxTime[key] = new Date().getTime();
								HCCP.ajax._get({
									'url': '/info/getchartinfo/'+lotyId+'?play_id='+play_id+'&type='+play_type + '&limit=' + limit,
									'complete': function(res){
										if(res && res.code == 200){
											// 存下获取的信息 重复利用
											res.data.limit = limit;
											self.cache[key] = $.extend({},res.data);

											insertChart(res.data, lotyId, playId, dantuo, type, play_id, play_type, limit);
										}else{
											if(self.getDataTimer){
												clearTimeout(self.getDataTimer);
											}
											self.getDataTimer = setTimeout(function(){
												self.getData(lotyId, playId, dantuo, type, play_id, play_type, limit);
											},10000)
										}
									}
								})	
							}
							function insertChart(data, lotyId, playId, dantuo, type, play_id, play_type, limit){
								var $betArea = $('#hc-chart .chart-area-' + playId + '-' + dantuo);
								var $chartLi = $betArea.find('.chart-main > li').eq(type);
								// 这里判断是否与旧数据一致，一致的话不重新渲染
								var domKey = lotyId+'_'+playId+'_'+type+'_'+limit;
								var oldData = self.cache[domKey] || {};
								if(JSON.stringify(oldData) == JSON.stringify(data) && $chartLi.find('[data-limit]').data('limit') == limit){
									// 数据一样不操作 并且上次limit跟此次不一
									// console.log('数据一样不操作')
								}else{
									// 存下数据重新渲染
									self.cache[domKey] = $.extend({},data);
									// 不一致重新渲染
									var h = '';
									if(play_type === '1'){
										h = self.getJQKJ(data, lotyId, playId, dantuo, type);
									}else if(play_type === '2'){
										h = self.getZS(data, lotyId, playId, dantuo, type);
									}else if(play_type === '3'){
										h = self.getLR(data, lotyId, playId, dantuo, type);
									}else{
										// console.log('暂无此类型图表');
									}	
									if(h){
										$chartLi.html(h);
										try{
											if(playId == 1 && play_type == 2){
												self.createLine(lotyId, playId, dantuo, type);
											}else{
												// 不用创建表格
											}
										}catch(e){}
										try{
											if(play_type != 3){
												$chartLi.find('[data-nextissue]')[0].scrollIntoView();
											}
										}catch(e){}
										if(play_type == 2){
											self.scrollEvent();
										}
									}else{
										// console.log('...没内容...');
									}	
								}
								try{
									// 期号不是最新期 或者最新期未开奖 定时去拉当前数据
									(function(data){
										var fn = function(){
											if(self.getDataTimer){
												clearTimeout(self.getDataTimer);
											}
											self.getDataTimer = setTimeout(function(){
												self.getData(lotyId, playId, dantuo, type, play_id, play_type, limit);
											},10000)
										}
										if(self.lotyId == lotyId && self.playId == playId && self.type == type){
											if(self.issue && data.nextIssue < self.issue){
												fn();
											}else{	
												if(play_type == 1){ //开奖
													if(data.history[data.history.length-1].kjhm.length < 1){
														fn();
													}
												}else if(play_type == 2){ // 走势
													if(!data.avgOmit.length || !data.maxCombo.length || !data.maxOmit.length || !data.occurrenceTimes.length ||  data.omit[data.nextIssue-1].length < 1){
														fn();
													}
												}else if(play_type == 3){ //冷热
													if(!data.coldHot[0].currentOmit && data.coldHot[0].currentOmit != 0){
														fn();
													}
												}else{
													// console.log('没有其他图表了')
												}
											}
										}else{
											// console.log('切换了tab  以前的没必要在抓取了');
										}
									})(data);
								}catch(e){}
							}
							if(self.issue && data && data.nextIssue >= self.issue && data.limit == limit){
								// 取缓存数据
								insertChart(data, lotyId, playId, dantuo, type, o.play_id, o.type, limit);
							}else{
								var oldTime = self.ajaxTime[key];
								var absTime = Math.abs(oldTime-new Date().getTime());
								// 同一参数接口1秒内不重复触发
								if(oldTime && absTime < 1000){
									// console.log('同一接口1秒内触发多次');
								}else if(!self.issue && data && data.limit == limit && absTime < 8000){ // 没有issue的情况下 存在当前接口数据那么请求间隔限制在8秒内；
									insertChart(data, lotyId, playId, dantuo, type, o.play_id, o.type, limit);
								}else{
									self.getData(lotyId, playId, dantuo, type, o.play_id, o.type, limit);
								}
							}
						}else{
							// console.log('暂无此类型图表');
						}
					}else{
						// console.log('当前玩法选项卡创建异常');
					}
				}else{
					self.creatChartArea();
				}
				return this;
			}
			// 获取玩法对应图标请求参数
			this.getChartType = function(lotyId, playId, dantuo, type, chartSet){
				var self = this;
				lotyId = lotyId == undefined ? this.lotyId : lotyId;
				playId = playId == undefined ? this.playId : playId;
				dantuo = dantuo == undefined ? this.dantuo : dantuo;
				chartSet = chartSet || this.chartSet;
				var o = new Object();
				try{
					o.play_id = chartSet[playId].play_id || '';
					o.type = chartSet[playId].type[type] || '';
				}catch(e){
					o.play_id = '';
					o.type = '';
				}
				return o;
			}
			this.getJQKJ = function (res, lotyId, playId, dantuo, type){
				var self = this;
				lotyId = lotyId == undefined ? this.lotyId : lotyId;
				playId = playId == undefined ? this.playId : playId;
				dantuo = dantuo == undefined ? this.dantuo : dantuo;
				type = type == undefined ? this.type : type;
				data = res.history || [];
				var nextIssue = res.nextIssue;
				var o = {
					'41':['','1','1','1','1','1','1','1','1','1']
				}
				var typeAry = o[lotyId] || [];
				var chartType = typeAry[playId] || '';
				var h = '';
				if(chartType === '1'){
					h = (function(data){
						var sunList = ['开奖号码','大小比','奇偶比']
						var subStr = sunList.map(function(y){return '<td>'+y+'</td>';}).join('');
						var lTb = '', rTb = '';
						var len = data.length;
						$.each(data,function(i,item){
                    		var issue = item.issue || '',
                    		shortIssue = issue.toString().substr(-2),
                    		kjhm = item.kjhm || [],
                    		sizeRatio = item.sizeRatio || '-:-',
                    		parityRatio = item.parityRatio || '-:-';

                    		lTb += '<tr><td>'+shortIssue+'期</td></tr>';
                    		rTb += '<tr '+(len-1 == i ? 'data-nextissue=' + nextIssue + ' data-limit='+res.limit : '')+'>';
                    		if(kjhm.length){
	                    		rTb += '<td class="'+(playId == 1 ? 'hc-hyt' : '')+'">'+kjhm.map(function(y){ return '<span class="hc-color-red-normal hc-margin-horizontal-xs">'+y+'</span>' }).join('') +'</td>';
	                    		rTb += '<td>'+sizeRatio+'</td><td>'+parityRatio+'</td>';	
                    		}else{
                    			rTb += '<td colspan="3">等待开奖...</td>';
                    		}
                    		rTb += '</tr>';
                    	});
						var h = '';
						h += '<div class="hc-flex-column">';
						h += 	'<div class="sub-nav">';
                        h += 		'<div class="hc-flexbox">';
                        h += 			'<div class="hc-scroll-left">';
                        h += 				'<table><tbody><tr><td>期号</td></tr></tbody></table>';
                        h += 			'</div>';
                        h +=			'<div class="hc-scroll-right">';
                        h += 				'<table>';
                        h += 					'<colgroup><col width="45%"></colgroup>';
                        h += 					'<tbody>';
                        h += 						'<tr>'+subStr+'</tr>';
                        h += 					'</tbody>';                             
                        h += 				'</table>';
                        h += 			'</div>';
                        h += 		'</div>';
                        h += 	'</div>';
                        h +=	'<div class="sub-content hc-flex-1 hc-scroll-y">';
                    	h += 		'<div class="hc-flexbox">';
                    	h +=			'<div class="hc-scroll-left">';
                    	h +=				'<table class="table-striped">';
                    	h +=					'<tbody>' + lTb + '</tbooy>';
                    	h += 				'</table>';
                    	h +=			'</div>';
                    	h +=			'<div class="hc-scroll-right">';
                    	h +=				'<table class="table-striped">';
                    	h +=					'<colgroup><col width="45%"></colgroup>';
                    	h +=					'<tbody>' + rTb + '</tbooy>';
                    	h +=				'</table>';
                    	h +=			'</div>';
                    	h +=		'</div>';
                        h += 	'</div>';
						h += '</div>';
						return h;
					})(data);
				}else{
					h = '';
				}
				return h;
			}
			this.getZS = function (res, lotyId, playId, dantuo, type){
				var self = this;
				lotyId = lotyId == undefined ? this.lotyId : lotyId;
				playId = playId == undefined ? this.playId : playId;
				dantuo = dantuo == undefined ? this.dantuo : dantuo;
				type = type == undefined ? this.type : type;
				data = res || {};
				var nextIssue = res.nextIssue;
				var o = {
					'41':['','1','1','1','1','1','1','1','1','1']
				}
				var typeAry = o[lotyId] || [];
				var chartType = typeAry[playId] || '';
				// 初始数据
				var yl = self.defaultSet.yl ? 1 : 0;
				var zx = self.defaultSet.zx ? 1 : 0;
				var tj = self.defaultSet.tj ? 1 : 0;

				var h = '';
				if(chartType === '1'){
					h = (function(data){
						var allCode = self.allCode.slice(0)
						var subStr = allCode.map(function(y){return '<td>'+y+'</td>';}).join('');
						var lTb = '', rTb = '', lTf = '', rTf = '';
						var avgOmit =  data.avgOmit || [];
						var maxCombo = data.maxCombo || [];
						var maxOmit = data.maxOmit || [];
						var occurrenceTimes = data.occurrenceTimes || [];
						var omit = data.omit || {};
						var len = FUNC.getJsonLen(omit);
						var i = 0;
						$.each(omit,function(is,item){
                    		var issue = is,
                    		shortIssue = issue.toString().substr(-2),
                    		omi = item || [];

                    		lTb += '<tr><td>'+shortIssue+'期</td></tr>';

                    		rTb += '<tr '+(len-1 == i ? 'data-nextissue=' + nextIssue + ' data-limit='+res.limit : '')+'>';
                    		if(omi.length){
	                    		rTb += allCode.map(function(y,i){
	                    			return omi[i] == undefined ? ('<td><span class="hc-yl '+(yl?'':'hide')+'">-</span></td>') : (omi[i] == '0' ? ('<td><span class="hc-ball-sm active '+(playId == 1 ? 'ballnum' : '')+' relative">'+y+'</span></td>') : ('<td><span class="hc-yl '+(yl?'':'hide')+'">'+omi[i]+'</span></td>')) ;
	                    		}).join('');	
                    		}else{
                    			rTb += '<td colspan="'+allCode.length+'">等待开奖...</td>';
                    		}
                    		rTb += '</tr>';
                    		i++;
                    	});
                    	var tfList = ['出现</br>次数', '平均</br>遗漏', '最大</br>遗漏', '最大</br>连出'];
                    	lTf = tfList.map(function(y){return '<tr><td>'+y+'</td></tr>';}).join('');
						if(avgOmit.length && maxCombo.length && maxOmit.length && occurrenceTimes.length){
							var occurrenceTimesStr = allCode.map(function(y,i){
	                    			return occurrenceTimes[i] == undefined ? '<td>-</td>' : '<td>'+occurrenceTimes[i]+'</td>';
	                    		}).join('');
							var avgOmitStr = allCode.map(function(y,i){
	                    			return avgOmit[i] == undefined ? '<td>-</td>' : '<td>'+avgOmit[i]+'</td>';
	                    		}).join('');
							var maxOmitStr = allCode.map(function(y,i){
	                    			return maxOmit[i] == undefined ? '<td>-</td>' : '<td>'+maxOmit[i]+'</td>';
	                    		}).join('');
							var maxComboStr = allCode.map(function(y,i){
	                    			return maxCombo[i] == undefined ? '<td>-</td>' : '<td>'+maxCombo[i]+'</td>';
	                    		}).join('');
							rTf = '<tr>' + occurrenceTimesStr + '</tr><tr>' + avgOmitStr + '</tr><tr>' + maxOmitStr + '</tr><tr>' + maxComboStr + '</tr>';
						}else{
							rTf = '<tr><td class="hc-wait-total" colspan="'+allCode.length+'" rowspan="'+tfList.length+'"><span class="hc-color-7f">等待开奖后更新</span></td></tr>';
						}
						var h = '';
						h += '<div class="hc-flex-column">';
						h += 	'<div class="sub-nav">';
                        h += 		'<div class="hc-flexbox">';
                        h += 			'<div class="hc-scroll-left">';
                        h += 				'<table><tbody><tr><td></td></tr></tbody></table>';
                        h += 			'</div>';
                        h +=			'<div class="hc-scroll-right hc-scroll-x">';
                        h += 				'<table>';
                        h += 					'<tbody>';
                        h += 						'<tr>'+subStr+'</tr>';
                        h += 					'</tbody>';                             
                        h += 				'</table>';
                        h += 			'</div>';
                        h += 		'</div>';
                        h += 	'</div>';
                        h +=	'<div class="sub-content hc-flex-1 hc-scroll-y">';
                    	h += 		'<div class="hc-flexbox">';
                    	h +=			'<div class="hc-scroll-left">';
                    	h +=				'<table class="table-striped">';
                    	h +=					'<tbody>' + lTb + '</tbooy>';
                    	h +=					'<tfoot class="hc-tj '+(tj?'':'hide')+'">' + lTf + '</tfoot>';
                    	h += 				'</table>';
                    	h +=			'</div>';
                    	h +=			'<div class="hc-scroll-right hc-scroll-x relative"><div class="hc-canvas '+(zx?'':'hide')+'"></div>';
                    	h +=				'<table class="table-striped">';
                    	h +=					'<tbody>' + rTb + '</tbooy>';
                    	h +=					'<tfoot class="hc-tj '+(tj?'':'hide')+'">' + rTf + '</tfoot>';
                    	h +=				'</table>';
                    	h +=			'</div>';
                    	h +=		'</div>';
                        h += 	'</div>';
						h += '</div>';
						return h;
					})(data);
				}else{
					h = '';
				}
				return h;
			}
			this.getLR = function (res, lotyId, playId, dantuo, type){
				var self = this;
				lotyId = lotyId == undefined ? this.lotyId : lotyId;
				playId = playId == undefined ? this.playId : playId;
				dantuo = dantuo == undefined ? this.dantuo : dantuo;
				type = type == undefined ? this.type : type;
				data = res.coldHot || [];
				var defaultSort = self.defaultSort || {};
				var nextIssue = res.nextIssue;
				var o = {
					'41':['','1','1','1','1','1','1','1','1','1']
				}
				var typeAry = o[lotyId] || [];
				var chartType = typeAry[playId] || '';
				var h = '';
				if(chartType === '1'){
					h = (function(data){
						var subList = ['号码','近30期','近50期','近100期','遗漏'];
						var keyArr = ['number','coldHot30','coldHot50','coldHot100','currentOmit'];
						var sortObj = defaultSort[playId] || {};
						var activeIndex = (sortObj['active'] != undefined && sortObj['active'] < subList.length && sortObj['active'] >= 0) ? sortObj['active'] : subList.length-1;
						var direction = sortObj['direction'] == 1 ? 1 : 0;
						var activeKey = keyArr[activeIndex];
						var sortData = data.slice(0).sort(function(a,b){
							if(direction){
								return a[activeKey]>b[activeKey]?1:-1;	
							}else{
								return a[activeKey]<b[activeKey]?1:-1;	
							}
						});
						var subStr = subList.map(function(y,i){
							return '<td data-sort="'+(activeIndex == i ? direction : '0')+'" class="'+(activeIndex == i ? 'active': '')+'"><span>'+y+'</span></td>';
						}).join('');
						var maxNum = new Object();
						$.map(data,function(item){
							for (var i = 0; i < keyArr.length; i++) {
								var key = keyArr[i];
								if(maxNum[key] == undefined || maxNum[key] < item[key]){
									maxNum[key] = item[key];
								}else{

								}
							}
						});
						var rTb = '';
						var len = sortData.length;
						$.each(sortData,function(i,item){
                    		rTb += '<tr '+(len-1 == i ? 'data-nextissue=' + nextIssue + ' data-limit='+res.limit : '')+'>';
                    		rTb += keyArr.map(function(key){
                    			if(key === 'number'){
                    				return '<td><span class="hc-ball-sm active">'+FUNC.formatNumber(item[key])+'</span></td>';
                    			}else{
                    				return '<td><span class="'+(item[key] === maxNum[key] ? 'hc-color-red-normal' : '')+'">'+(item[key] == undefined || item[key] < 0 ? '--' : item[key])+'</span></td>';
                    			}
                    		}).join('');
                    		rTb += '</tr>';
                    	});
						var h = '';
						h += '<div class="hc-flex-column">';
						h += 	'<div class="sub-nav">';
                		h +=		'<table>';
                		h +=			'<tbody>';
                		h +=				'<tr>'+subStr+'</tr>';
                		h +=			'</tbody>';                             
                		h +=		'</table>';
                        h += 	'</div>';
                        h +=	'<div class="sub-content hc-flex-1 hc-scroll-y">';
            			h +=		'<table class="table-striped no-last-bg">';
            			h +=			'<tbody>' + rTb + '</tbooy>';
            			h +=		'</table>';
                        h += 	'</div>';
						h += '</div>';
						return h;
					})(data);
				}else{
					h = '';
				}
				return h;
			}
			// 画线
			this.createLine = function(lotyId, playId, dantuo, type) {
				var self = this;
				lotyId = lotyId == undefined ? this.lotyId : lotyId;
				playId = playId == undefined ? this.playId : playId;
				dantuo = dantuo == undefined ? this.dantuo : dantuo;
				type = type == undefined ? this.type : type;
				var $betArea = $('#hc-chart .chart-area-' + playId + '-' + dantuo);
				var $chartLi = $betArea.find('.chart-main > li').eq(type);

				var cav = $chartLi.find('.hc-canvas');
				var ele = $chartLi.find('.ballnum');
				cav.empty();
				var c = '#e12d3e';
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
			    return this;
			}
			// 冷热排序
			this.tableSort = function(target){
				var self = this;
				var lotyId = self.lotyId;
				var playId = self.playId;
				var dantuo = self.dantuo;
				var type = self.type;
				var that = $(target);
				var index = that.index();
				var direction = that.data('sort');
				if(that.hasClass('active')){
					direction = direction == 1 ? 0 : 1;
				}
				self.defaultSort[playId] = new Object();
				self.defaultSort[playId].active = index;
				self.defaultSort[playId].direction = direction;

				var limit = 100;
				var domKey = lotyId+'_'+playId+'_'+type+'_'+limit;
				var oldData = self.cache[domKey] || {};
				var h = self.getLR(oldData, lotyId, playId, dantuo, type);
				if(h){
					var $betArea = $('#hc-chart .chart-area-' + playId + '-' + dantuo);
					var $chartLi = $betArea.find('.chart-main > li').eq(type);
					$chartLi.html(h);
				}else{
					// console.log('拿不到数据，不排了');
				}

				return this;
			}
			// 获取彩种名
			this.getLotyName = function(lotyId) {
				return HCCP.getLotyNameById(lotyId);
			}
			// 获取玩法名
			this.getPlayName = function(lotyId, playId) {
				return HCCP.getPlayName(lotyId, playId);
			}

		}
	})();

	new HC()._init();
});