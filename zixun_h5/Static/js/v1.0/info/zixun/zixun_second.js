//clipboard.js
! function(e) {
	if("object" == typeof exports && "undefined" != typeof module) module.exports = e();
	else if("function" == typeof define && define.amd) define([], e);
	else {
		var t;
		t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.Clipboard = e()
	}
}
(function() {
	var e, t, n;
	return function e(t, n, i) {
		function o(a, c) {
			if(!n[a]) {
				if(!t[a]) {
					var l = "function" == typeof require && require;
					if(!c && l) return l(a, !0);
					if(r) return r(a, !0);
					var s = new Error("Cannot find module '" + a + "'");
					throw s.code = "MODULE_NOT_FOUND", s
				}
				var u = n[a] = {
					exports: {}
				};
				t[a][0].call(u.exports, function(e) {
					var n = t[a][1][e];
					return o(n ? n : e)
				}, u, u.exports, e, t, n, i)
			}
			return n[a].exports
		}
		for(var r = "function" == typeof require && require, a = 0; a < i.length; a++) o(i[a]);
		return o
	}({
		1: [function(e, t, n) {
			function i(e, t) {
				for(; e && e.nodeType !== o;) {
					if(e.matches(t)) return e;
					e = e.parentNode
				}
			}
			var o = 9;
			if(Element && !Element.prototype.matches) {
				var r = Element.prototype;
				r.matches = r.matchesSelector || r.mozMatchesSelector || r.msMatchesSelector || r.oMatchesSelector || r.webkitMatchesSelector
			}
			t.exports = i
		}, {}],
		2: [function(e, t, n) {
			function i(e, t, n, i, r) {
				var a = o.apply(this, arguments);
				return e.addEventListener(n, a, r), {
					destroy: function() {
						e.removeEventListener(n, a, r)
					}
				}
			}

			function o(e, t, n, i) {
				return function(n) {
					n.delegateTarget = r(n.target, t), n.delegateTarget && i.call(e, n)
				}
			}
			var r = e("./closest");
			t.exports = i
		}, {
			"./closest": 1
		}],
		3: [function(e, t, n) {
			n.node = function(e) {
				return void 0 !== e && e instanceof HTMLElement && 1 === e.nodeType
			}, n.nodeList = function(e) {
				var t = Object.prototype.toString.call(e);
				return void 0 !== e && ("[object NodeList]" === t || "[object HTMLCollection]" === t) && "length" in e && (0 === e.length || n.node(e[0]))
			}, n.string = function(e) {
				return "string" == typeof e || e instanceof String
			}, n.fn = function(e) {
				var t = Object.prototype.toString.call(e);
				return "[object Function]" === t
			}
		}, {}],
		4: [function(e, t, n) {
			function i(e, t, n) {
				if(!e && !t && !n) throw new Error("Missing required arguments");
				if(!c.string(t)) throw new TypeError("Second argument must be a String");
				if(!c.fn(n)) throw new TypeError("Third argument must be a Function");
				if(c.node(e)) return o(e, t, n);
				if(c.nodeList(e)) return r(e, t, n);
				if(c.string(e)) return a(e, t, n);
				throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
			}

			function o(e, t, n) {
				return e.addEventListener(t, n), {
					destroy: function() {
						e.removeEventListener(t, n)
					}
				}
			}

			function r(e, t, n) {
				return Array.prototype.forEach.call(e, function(e) {
					e.addEventListener(t, n)
				}), {
					destroy: function() {
						Array.prototype.forEach.call(e, function(e) {
							e.removeEventListener(t, n)
						})
					}
				}
			}

			function a(e, t, n) {
				return l(document.body, e, t, n)
			}
			var c = e("./is"),
				l = e("delegate");
			t.exports = i
		}, {
			"./is": 3,
			delegate: 2
		}],
		5: [function(e, t, n) {
			function i(e) {
				var t;
				if("SELECT" === e.nodeName) e.focus(), t = e.value;
				else if("INPUT" === e.nodeName || "TEXTAREA" === e.nodeName) e.focus(), e.setSelectionRange(0, e.value.length), t = e.value;
				else {
					e.hasAttribute("contenteditable") && e.focus();
					var n = window.getSelection(),
						i = document.createRange();
					i.selectNodeContents(e), n.removeAllRanges(), n.addRange(i), t = n.toString()
				}
				return t
			}
			t.exports = i
		}, {}],
		6: [function(e, t, n) {
			function i() {}
			i.prototype = {
				on: function(e, t, n) {
					var i = this.e || (this.e = {});
					return(i[e] || (i[e] = [])).push({
						fn: t,
						ctx: n
					}), this
				},
				once: function(e, t, n) {
					function i() {
						o.off(e, i), t.apply(n, arguments)
					}
					var o = this;
					return i._ = t, this.on(e, i, n)
				},
				emit: function(e) {
					var t = [].slice.call(arguments, 1),
						n = ((this.e || (this.e = {}))[e] || []).slice(),
						i = 0,
						o = n.length;
					for(i; i < o; i++) n[i].fn.apply(n[i].ctx, t);
					return this
				},
				off: function(e, t) {
					var n = this.e || (this.e = {}),
						i = n[e],
						o = [];
					if(i && t)
						for(var r = 0, a = i.length; r < a; r++) i[r].fn !== t && i[r].fn._ !== t && o.push(i[r]);
					return o.length ? n[e] = o : delete n[e], this
				}
			}, t.exports = i
		}, {}],
		7: [function(t, n, i) {
			! function(o, r) {
				if("function" == typeof e && e.amd) e(["module", "select"], r);
				else if("undefined" != typeof i) r(n, t("select"));
				else {
					var a = {
						exports: {}
					};
					r(a, o.select), o.clipboardAction = a.exports
				}
			}(this, function(e, t) {
				"use strict";

				function n(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}

				function i(e, t) {
					if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
				}
				var o = n(t),
					r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
						return typeof e
					} : function(e) {
						return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
					},
					a = function() {
						function e(e, t) {
							for(var n = 0; n < t.length; n++) {
								var i = t[n];
								i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
							}
						}
						return function(t, n, i) {
							return n && e(t.prototype, n), i && e(t, i), t
						}
					}(),
					c = function() {
						function e(t) {
							i(this, e), this.resolveOptions(t), this.initSelection()
						}
						return a(e, [{
							key: "resolveOptions",
							value: function e() {
								var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
								this.action = t.action, this.emitter = t.emitter, this.target = t.target, this.text = t.text, this.trigger = t.trigger, this.selectedText = ""
							}
						}, {
							key: "initSelection",
							value: function e() {
								this.text ? this.selectFake() : this.target && this.selectTarget()
							}
						}, {
							key: "selectFake",
							value: function e() {
								var t = this,
									n = "rtl" == document.documentElement.getAttribute("dir");
								this.removeFake(), this.fakeHandlerCallback = function() {
									return t.removeFake()
								}, this.fakeHandler = document.body.addEventListener("click", this.fakeHandlerCallback) || !0, this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[n ? "right" : "left"] = "-9999px";
								var i = window.pageYOffset || document.documentElement.scrollTop;
								this.fakeElem.addEventListener("focus", window.scrollTo(0, i)), this.fakeElem.style.top = i + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, document.body.appendChild(this.fakeElem), this.selectedText = (0, o.default)(this.fakeElem), this.copyText()
							}
						}, {
							key: "removeFake",
							value: function e() {
								this.fakeHandler && (document.body.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (document.body.removeChild(this.fakeElem), this.fakeElem = null)
							}
						}, {
							key: "selectTarget",
							value: function e() {
								this.selectedText = (0, o.default)(this.target), this.copyText()
							}
						}, {
							key: "copyText",
							value: function e() {
								var t = void 0;
								try {
									t = document.execCommand(this.action)
								} catch(e) {
									t = !1
								}
								this.handleResult(t)
							}
						}, {
							key: "handleResult",
							value: function e(t) {
								this.emitter.emit(t ? "success" : "error", {
									action: this.action,
									text: this.selectedText,
									trigger: this.trigger,
									clearSelection: this.clearSelection.bind(this)
								})
							}
						}, {
							key: "clearSelection",
							value: function e() {
								this.target && this.target.blur(), window.getSelection().removeAllRanges()
							}
						}, {
							key: "destroy",
							value: function e() {
								this.removeFake()
							}
						}, {
							key: "action",
							set: function e() {
								var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "copy";
								if(this._action = t, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"')
							},
							get: function e() {
								return this._action
							}
						}, {
							key: "target",
							set: function e(t) {
								if(void 0 !== t) {
									if(!t || "object" !== ("undefined" == typeof t ? "undefined" : r(t)) || 1 !== t.nodeType) throw new Error('Invalid "target" value, use a valid Element');
									if("copy" === this.action && t.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
									if("cut" === this.action && (t.hasAttribute("readonly") || t.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
									this._target = t
								}
							},
							get: function e() {
								return this._target
							}
						}]), e
					}();
				e.exports = c
			})
		}, {
			select: 5
		}],
		8: [function(t, n, i) {
			! function(o, r) {
				if("function" == typeof e && e.amd) e(["module", "./clipboard-action", "tiny-emitter", "good-listener"], r);
				else if("undefined" != typeof i) r(n, t("./clipboard-action"), t("tiny-emitter"), t("good-listener"));
				else {
					var a = {
						exports: {}
					};
					r(a, o.clipboardAction, o.tinyEmitter, o.goodListener), o.clipboard = a.exports
				}
			}(this, function(e, t, n, i) {
				"use strict";

				function o(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}

				function r(e, t) {
					if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
				}

				function a(e, t) {
					if(!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
					return !t || "object" != typeof t && "function" != typeof t ? e : t
				}

				function c(e, t) {
					if("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
					e.prototype = Object.create(t && t.prototype, {
						constructor: {
							value: e,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
				}

				function l(e, t) {
					var n = "data-clipboard-" + e;
					if(t.hasAttribute(n)) return t.getAttribute(n)
				}
				var s = o(t),
					u = o(n),
					f = o(i),
					d = function() {
						function e(e, t) {
							for(var n = 0; n < t.length; n++) {
								var i = t[n];
								i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
							}
						}
						return function(t, n, i) {
							return n && e(t.prototype, n), i && e(t, i), t
						}
					}(),
					h = function(e) {
						function t(e, n) {
							r(this, t);
							var i = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
							return i.resolveOptions(n), i.listenClick(e), i
						}
						return c(t, e), d(t, [{
							key: "resolveOptions",
							value: function e() {
								var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
								this.action = "function" == typeof t.action ? t.action : this.defaultAction, this.target = "function" == typeof t.target ? t.target : this.defaultTarget, this.text = "function" == typeof t.text ? t.text : this.defaultText
							}
						}, {
							key: "listenClick",
							value: function e(t) {
								var n = this;
								this.listener = (0, f.default)(t, "click", function(e) {
									return n.onClick(e)
								})
							}
						}, {
							key: "onClick",
							value: function e(t) {
								var n = t.delegateTarget || t.currentTarget;
								this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new s.default({
									action: this.action(n),
									target: this.target(n),
									text: this.text(n),
									trigger: n,
									emitter: this
								})
							}
						}, {
							key: "defaultAction",
							value: function e(t) {
								return l("action", t)
							}
						}, {
							key: "defaultTarget",
							value: function e(t) {
								var n = l("target", t);
								if(n) return document.querySelector(n)
							}
						}, {
							key: "defaultText",
							value: function e(t) {
								return l("text", t)
							}
						}, {
							key: "destroy",
							value: function e() {
								this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null)
							}
						}]), t
					}(u.default);
				e.exports = h
			})
		}, {
			"./clipboard-action": 7,
			"good-listener": 4,
			"tiny-emitter": 6
		}]
	}, {}, [8])(8)
});
$(document).ready(function($) {
	var pullDown = function(moveobj, targetobj, offset, bounce, callback) {
		var offset = offset || $("#refresh").height();
		var start,
			end,
			a = bounce || 2,
			isCanDo = false, //是否移动滑块
			isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
			hasTouch = 'ontouchstart' in window && !isTouchPad;
		moveobj = $(moveobj),
			// targetobj = $("[class=id_"+targetobj+"]");
			targetobj = $(targetobj)
		/*操作方法*/
		var fn = {
			isLock: false, //是否锁定整个操作
			//移动容器
			translate: function(diff) {
				moveobj.css({
					"-webkit-transform": "translate(0," + diff + "px) translateZ(0px)",
					"transform": "translate(0," + diff + "px) translateZ(0px)"
				});
			},
			transitiontime: function() {
				moveobj.css({
					"-webkit-transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)",
					"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)",
				});
			},
			//设置效果时间
			setTranslition: function(dura) {
				moveobj.css({
					"transition-duration": dura,
					"-webkit-transition-duration": dura
				});
			},
			//返回到初始位置
			back: function(refresh) {
				if(refresh) {
					var date = new Date();
					var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
					var mint = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
					var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
					var timestr = hours + ":" + mint + ":" + s
					$(".pull_time").text(timestr);
				}
				fn.setTranslition("300ms");
				fn.translate(0);
				//标识操作完成
				fn.isLock = false;
			}
		};
		fn.transitiontime();
		fn.translate(0);
		//滑动开始
		targetobj.on("touchstart", function(e) {
			if($(this).scrollTop() <= 0 && !fn.isLock) {
				var even = e || window.event;
				//标识操作进行中
				fn.isLock = true;
				isCanDo = true;
				//保存当前鼠标Y坐标
				start = hasTouch ? even.targetTouches[0].pageY : even.pageY;
				end = start;
				//消除滑块动画时间
				fn.setTranslition("0ms");
			}
		});
		//滑动中
		targetobj.on("touchmove", function(e) {
			if($(this).scrollTop() <= 0 && isCanDo) {
				var even = e || window.event;
				//保存当前鼠标Y坐标
				end = hasTouch ? even.targetTouches[0].pageY : even.pageY;
				if(start < end) {
					even.preventDefault();
					//消除滑块动画时间
					fn.setTranslition("0ms");
					//移动滑块
					fn.translate((end - start) / a);
					if((end - start) / a >= offset) {
						$(".pull_txt").text("松开立即刷新");
					} else {
						$(".pull_txt").text("下拉即可刷新");
					}

				}

			}
		});

		//滑动结束
		targetobj.on("touchend", function(e) {
			if(isCanDo) {
				isCanDo = false;
				//判断滑动距离是否大于等于指定值
				if((end - start) / a >= offset) {
					//设置滑块回弹时间
					fn.setTranslition('300ms');
					//保留提示部分
					$(".pull_txt").text("载入中...");
					fn.translate(offset);
					var onefn = function() {
						$(this).off("transitionend webkitTransitionEnd MSTransitionEnd oTransitionEnd", onefn);
						//执行回调函数
						if(callback && typeof callback == "function") {
							callback.call(fn, e);
						} else {
							fn.back();
						}
					}
					moveobj.on("transitionend webkitTransitionEnd MSTransitionEnd oTransitionEnd", onefn);
				} else {
					//返回初始状态
					fn.back();
				}
			}
		});
	}
	var textAll = {
		first_error_data: '<div class="no_data f_error hide"><div class="no_img"></div><div class="no_tip"><p>加载失败~</p><p>请检查您当前的网络环境</p></div><div class="re_load"><span class="re_btn btn_first_error">重新加载</span></div></div>',
		other_errpr_data: '<div class="no_data o_error"><div class="no_img"></div><div class="no_tip"><p>加载失败~</p><p>请检查您当前的网络环境</p></div><div class="re_load"><span class="re_btn btn_other_error">重新加载</span></div></div>',
		empty_data: '<div class="empty_data "><div class="no_img"></div><div class="no_tip"><p>暂无数据~</p><p>请重新获取数据</p></div><div class="re_load_"><span class="re_btn btn_empty">重新加载</span></div></div>',
		isOver: '<div class="tip_footer">无更多内容</div>',
		loading: '<ul class="load_wrap"><li class="loading_info"><div class="spinner"><i class="bounce1"></i><i class="bounce2"></i><i class="bounce3"></i></div></li></ul>',
		location: '<div class="location_wrap"><div class="location_text">上次看到这里 点击刷新</div><div class="location_refresh"></div></div>'
	}
	//  var columnid = HCCP.FUNC.getUrlParam("scolumnid")
	//  var mcolumnid = HCCP.FUNC.getUrlParam("columnid")
	//  var scolumnname = HCCP.FUNC.getUrlParam("scolumnName")
	//  var columnname = HCCP.FUNC.getUrlParam("columnName")
	var columnid = "";
	var mcolumnid = "";
	var scolumnname = '';
	var columnname = '';
	var secondMess = localStorage.getItem("secondMess");
	if(secondMess) {
		secondMess = JSON.parse(secondMess);
		mcolumnid = secondMess.columnid;
		columnid = secondMess.scolumnid;
		scolumnname = secondMess.scolumnName,
			columnname = secondMess.columnName
	}
	//	if(!scolumnname) {
	//		scolumnname = '今日好彩'
	//	}
	//	if(columnname == "竞足") {
	//		document.title = '竞彩足球-今日好彩手机网'
	//	} else if(columnname == "竞篮") {
	//		document.title = '竞彩篮球-今日好彩手机网'
	//	} else {
	//		document.title = columnname + '-今日好彩手机网'
	//	}

	// $('.header-title').text(scolumnname)
	$('.header-right').text(columnname)

	var all = {
		data: {
			mcolumnid: mcolumnid,
			columnid: columnid,
			pullDown: false, //是否限制了上拉加载
			skip: 0, //保存最后id
			isOver: false, //是否加载完毕（在有数据的前提下
			gzh: ""
		}
	}
	//取出看过的文章储存的cookie id
	var articleIdCookie = HCCP.dataS.cookie.get("haocaiId");
	init()

	//启动函数
	function init() {
		//取一下栏目id
		var columnid = all.data.columnid
		//zsscode
		//var columnid = HCCP.FUNC.getUrlParam("columnid")
		//		if(columnid && columnid != "index" && columnid != "null") {
		//			all.data.mcolumnid = parseInt(columnid)
		//		} else if(columnid && columnid == "index" && columnid != "null") {
		//			all.data.mcolumnid = 'index';
		//		} else { //没有传columnid参数  判断缓存中的columnid
		//			if(sessionStorage.columnid != undefined && sessionStorage.columnid != null && sessionStorage.columnid != "") {
		//				if(sessionStorage.columnid != "index") {
		//					all.data.mcolumnid = parseInt(sessionStorage.columnid);
		//				} else {
		//					all.data.mcolumnid = sessionStorage.columnid;
		//				}
		//			} else { //缓存中没有columnid
		//				sessionStorage.columnid = "index";
		//				all.data.mcolumnid = "index";
		//			}
		//		}
		$('.wraper').append(textAll.first_error_data);
		//第一次加载失败时的情况
		$('body').on('click', '.btn_first_error', function(event) {
			$('.loading').show()
			$(".f_error").hide()
			//异步
			//resetColumnid(all.data.columnid)
			get("/iation/haocai/column/list?columnid=" + all.data.columnid + "&mcolumnid=" + all.data.mcolumnid, start)
		});
		get("/iation/haocai/column/list?columnid=" + all.data.columnid + "&mcolumnid=" + all.data.mcolumnid, start)
	}
	//首次进入回调
	function get(urlname, fn) {
		var result;
		$.ajax({
			type: "get",
			url: REMOTE_DATA_URL + urlname,
			async: true,
			data: {
				"identity": HCQD.identity(),
				"platform": HCQD.platform()
			},
			//dataType: "jsonp",
			//jsonp: "callback",
			//jsonpCallback: "success_jsonpCallback",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function(data) {
				result = data.responseJSON;
				if(result && result.code == 200 && result.data) {
					if(fn) {
						fn(result)
					}
				}  else {
					$(".f_error").show()
					return
				}
			},
		});
	}
	//点击栏目首次加载
	function get_(urlname, fn) {
		var columnid = all.data.columnid
		var result;
		$.ajax({
			type: "get",
			url: REMOTE_DATA_URL + urlname,
			async: true,
			data: {
				"identity": HCQD.identity(),
				"platform": HCQD.platform()
			},
			//dataType: "jsonp",
			//jsonp: "callback",
			//jsonpCallback: "success_jsonpCallback",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			complete: function(data) {
				result = data.responseJSON;
				if(result && result.code == 200 && result.data) {
					if(fn) {
						fn(result)
					}
				} else {
					$('.loading').hide()
					$(".content_inner").empty().append(textAll.no_data_).show()
					return
				}

			},
		});
	}
	//首次获取咨询内容
	function start(list) {
		var columnid = all.data.columnid
		var data = list.data
		var articleInfo = data.articleInfo || []
		//判断是否可以下拉
		if(!articleInfo.length) {
			all.data.pullDown = 1
		} else if(articleInfo.length < 10) {
			all.data.pullDown = 1
			all.data.isOver = 1
		}
		//如果可以下啦加一个skip
		if(articleInfo.length == 10) {
			all.data.skip = 10
		}
		//绑定事件
		getData(data, all.data.columnid)
		eve()
	}
	//****************************渲染所有列表****************
	function getData(data, columnid, flag, flag_) { //flag  是否为上啦加载 flag_ 是否为下拉刷新
		var $dom_wrap = $(".content_inner");
		var $item = $dom_wrap.find('.item');
		if(flag) {
			var articleInfo = data.loading || [];
		} else {
			var articleInfo = data.articleInfo || [];
		}
		var topInfo = data.topInfo || [];

		var html = "";
		var shtml = "";
		var thtml = ""
		//公众号栏目
		if(data.gzhData && !$.isEmptyObject(data.gzhData)) {
			var gzhData = data.gzhData
			all.data.gzh = gzhData.copy_word ? gzhData.copy_word : gzhData.column_name
		} else {
			var gzhData = {}
		}
		//轮播图
		if(data.bannerArr) {
			var bannerArr = data.bannerArr
		}
		//先看之前有没有数据的
		if(!$item.length) {
			// 没有数据时，提示用户刷新
			if(articleInfo.length == 0 && topInfo.length == 0) {
				//此时不可以上拉加载
				all.data.pullDown = 0
				$('.loading').hide()
				var isEmptyData = textAll.empty_data
			} else {
				var isEmptyData = ""
			}
		} else {
			if(articleInfo.length == 0) {
				all.data.isOver = 1
			}
		}
		thtml = getTopHtml(topInfo)
		shtml = getgzhHtml(gzhData)
		html = getCommonHtml(articleInfo)

		//是否有二级栏目和置顶
		var hasZhiding = false
		var hasSheader = false
		if($dom_wrap.find(".hasZhiding").length) {
			hasZhiding = true
		}
		if($dom_wrap.find("#sHeader").length) {
			hasSheader = true
		}
		if(flag) { //上拉加载
			$dom_wrap.append(html).show()
		} else {
			$dom_wrap.empty().append(shtml).append(thtml).append(html).append(isEmptyData).show();
			$dom_wrap.children().first().get(0).scrollIntoView(false)
		}
		$(".loading").hide()
		$('.content_inner').off("scroll").on('scroll', scroll_)
	}
	//***************************html**********************
	function getTopHtml(topInfo) {
		var html = "";
		$.each(topInfo, function(index, el) {
			if(el.identity) {
				if(el.identity == 1) {
					var info = "NEW"
					var infoC = "new"
				} else if(el.identity == 2) {
					var info = "热门"
					var infoC = "hot"
				} else if(el.identity == 3) {
					var info = "广告"
					var infoC = "adv"
				}
			} else {
				var info = ""
				var infoC = ""
			}
			var c_af = inCookies(el.articleId) ? 'c_af' : ''
			var isTop = el.istop ? "hasZhiding" : ""
			html += '<div class="item ' + c_af + ' ' + isTop + '" id="' + el.articleId + '" title="' + el.title + '" jump="' + el.detailurl + '"' + (el.keywords ? ('keywords="' + el.keywords + '"') : '') + (el.description ? ('description="' + el.description + '"') : '') + '>'
			html += '<div class="item_con clearfix">'
			html += '<div class="s_back_content" style="background:url('
			html += el.leftFigure + ')no-repeat center center;background-size:cover";>'
			html += '</div>'
			html += '<div class="item_text">'
			html += '<p class="title">'
			html += el.title
			html += '</p><p class="empty_p">'
			html += '</p><p class="wrap_tag">'
			html += '<span class="zdTag">'
			html += '置顶'
			html += '</span><span class="redTag"><span></span><span>'
			html += el.article_hits
			html += '</span></span></p></div></div></div>'
		});
		return html
	}

	function getgzhHtml(obj) {
		if($.isEmptyObject(obj)) {
			return ""
		}
		var html = '<div id="gzh" class="hc-cf">';
		html += '<div class="gzh_main">'
		html += '<div class="img_wrap" style="background-image:url(' + obj.column_logo + ')"></div>'
		html += '<div class="text_wrap">'
		html += '<p class="text_descript">' + obj.excerpt + '</p>'
		html += '<div class="text_main hc-cf">'
		html += '<p class="z_top"><span id="copy" class="part_2 copy_target">点击复制到微信搜索</span>'
		html += '<span class="part_1"><span>关注</span><span class="target">' + obj.column_name + '</span></span></p>'
		html += '<span class="part_3"><input id="inputText" type="text" value="' + obj.column_name + '" readonly/></span>'
		html += '</div>'
		html += '</div></div><div class="color_bar"></div></div>'
		return html
	}

	function getCommonHtml(articleInfo, advArr) {
		var columnid = all.data.columnid
		var html = "";
		$.each(articleInfo, function(index, el) {
			var c_af = inCookies(el.articleId) ? 'c_af' : ''
			html += '<div class="item ' + c_af + '" id="' + el.articleId + '" title="' + el.title + '" jump="' + el.detailurl + '" ' + (el.keywords ? ('keywords="' + el.keywords + '"') : '') + (el.description ? ('description="' + el.description + '"') : '') + '>'
			html += '<div class="item_con clearfix">'
			html += '<div class="s_back_content" style="background:url('
			html += el.leftFigure + ')no-repeat center center;background-size:cover";>'
			html += '</div>'
			html += '<div class="item_text">'
			html += '<p class="title">'
			html += el.title
			html += '</p><p class="empty_p">'
			html += '</p><p class="wrap_tag">'
			html += '<span class="redTag"><span></span><span>'
			html += el.article_hits
			html += '</span></span></p></div></div></div>'
		});
		return html
	}

	function getLayerHtml() {
		var html = '';
		html += '<div class="gzh_modal_defeats">'
		html += '<div class="gzh_title">请复制下方文字，去微信搜索吧！</div>'
		html += '<div class="input_wrap"><input onfocus="this.select()" class="copy_input" type="text"  value="'
		html += all.data.gzh
		html += '" /></div>'
		html += '<div class="gzh_btn_wrap"><span class="gzh_close">关闭</span></div></div>'
		return html
	}
	//****************************事件**********************
	//事件绑定汇总
	function eve() {
		//zsscode 返回事件
		$(".back").click(function() {
			//window.location.href = "zixun.html?columnid=" + all.data.mcolumnid;
			window.history.go(-1);
		})
		//点击添加添加事件
		$("body").on('click', '.item', goDetail);
		var clipboard = new Clipboard('.copy_target', {
			text: function() {
				return all.data.gzh
			}
		});
		clipboard.on('success', function(e) {
			layer.open({
				type: 0,
				content: '已复制，请到微信搜索',
				closeViaDimmer: true,
				shadeClose: true,
				time: 2,
				className: "layer_gzh",
				style: "width:2.67rem;height:0.49rem;line-height:0.49rem"
			});
		});
		clipboard.on('error', function(e) {
			layer.open({
				type: 0,
				content: getLayerHtml(),
				closeViaDimmer: true,
				shadeClose: true,
				className: "layer_gzh_defeats",
				style: "widht:auto"
			});

			$(".gzh_close").on('click', function(event) {
				event.preventDefault();
				layer.closeAll();
			});
			//复制兼容（先放着）（本身就有兼容问题）
			// var inputText = document.getElementById('inputText');
			// var currentFocus = document.activeElement;
			// inputText.focus();
			// inputText.setSelectionRange(0, inputText.value.length);
			// document.execCommand('copy', true);            

		});

		//空数据
		$('body').on('click', '.btn_empty', function(event) {
			$('.loading').show()
			$(".empty_data").remove()
			//异步
			resetAllColumnid()
			get_("/iation/haocai/column/list?columnid=" + all.data.columnid + "&mcolumnid=" + all.data.mcolumnid, otherStar)
		});
		//上拉加载事件
		$('.content_inner').on('scroll', scroll_);
		//绑定下拉刷新事件
		pullDown(".content_wrap", ".content_inner", '', 2.5, function(e) { //绑定下拉刷新事件
			//这里不用异步，会有问题改为同步
			resetAllColumnid()
			get_("/iation/haocai/column/list?columnid=" + all.data.columnid + "&mcolumnid=" + all.data.mcolumnid, otherStar)
			this.back(1)
		})
	}

	function down_pullHtml(list) {
		// 先把加载动画去掉
		$(".load_wrap").remove()
		var data = list.data;
		var articleInfo = data.loading || [];
		var columnid = all.data.columnid
		//如果请求的数据为空就不能上拉加载了
		if(!articleInfo.length) {
			all.data.pullDown = 1
		} else {
			if(articleInfo.length < 5) { //小于10条也禁止
				all.data.pullDown = 1
				//此时一定加载完毕
				all.data.isOver = 1
			} else {
				all.data.skip += 5
			}
		}
		getData(data, columnid, 1)
	}
	//上拉加载滚动事件
	function scroll_() {
		$dom_wrap = $(".content_inner")
		var columnid = all.data.columnid
		//当内容滚动到底部时加载新的内容 100当距离最底部100个像素时开始加载.
		if($(this).scrollTop() + $(window).height() - $(window).width() * 0.224 >= $(this).height() - 100) {
			if(all.data.isOver) {
				$(".content_inner").append(textAll.isOver)
				all.data.isOver = 0
			}
			if(!all.data.pullDown) {
				//加载动画
				$dom_wrap.append(textAll.loading)
				// console.log('请求了')
				//这里不用异步，会有问题改为同步
				var res = HCCP.ajax.get("/iation/haocai/column/list?take=5&type=load&skip=" + all.data.skip + "&columnid=" + all.data.columnid + "&mcolumnid=" + all.data.mcolumnid)
				if(res && res.code == 200) {
					if(res.data) {
						down_pullHtml(res)
					}
				} else {
					//报错就不准上拉了
					all.data.pullDown[columnid] = true
					if(res && res.message) {
						HCCP.modal.alert({
							msg: res.message
						})
					} else {
						HCCP.modal.alert({
							msg: "网络繁忙，请稍后再试"
						})
					}
					return
				}
			} else {
				return
			}

		}
	}
	//跳去详情
	function goDetail() {
		var that = $(this)
		var url = that.attr("jump")
		var title = that.attr("title")
		var keywords = that.attr("keywords")
		var description = that.attr("description")
		var id = that.attr("id")

		//点击后标题标灰
		that.addClass("c_af")

		var jump = {
			url: url + "?platform=3&iationType=haocai",
			title: title,
			keywords: keywords,
			description: description,
		}
		if(articleIdCookie) {
			if(!inCookies(id)) {
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
		pathName = pathName.split('.')[0];
		pathName = pathName.split('/');
		console.log(pathName)
		//		pathName = '/' + pathName[1] + '/';
		//		var _url = NEWS_DETAIL_URL + pathName + id + '.html';
		pathName = pathName[1] + '/';
		var _url = URL + pathName + id + '.html';
		HCCP.FUNC.go(_url);
		//之前的跳转	
		//		var _url = URL_ZIXUN_DETAIL + "?articleId=" + id + "&columnid=" + all.data.columnid;
		//		sessionStorage.route = "second";
		//		HCCP.FUNC.go(_url);
	}
	//其他栏目
	function otherStar(list) {
		var columnid = all.data.columnid;
		var data = list.data || {}
		var articleInfo = data.articleInfo || []
		//如果请求的数据为空就不能上拉加载了
		if(!articleInfo.length) {
			all.data.pullDown = 1
		} else {
			if(articleInfo.length < 10) { //小与10条禁止
				all.data.pullDown = 1
				//此时一定加载完毕
				all.data.isOver = 1
			} else {
				all.data.skip += 10
			}
		}
		//渲染html
		getData(data, columnid, 0, 0)
	}
	// *****************************方法*************************
	//是否被点击过
	function inCookies(id) {
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
	}
	// 重置所有栏目设置
	function resetAllColumnid() {
		all.data.pullDown = false
		all.data.skip = 0
		all.data.isOver = false
	}
	//加载loading
	function showLoading() {
		layer.open({
			type: 2,
			content: '加载中...',
			shadeClose: false
		})
	}

});