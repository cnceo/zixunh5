function pullDown(moveobj, targetobj, offset, bounce, callback) {
	//console.log("下拉更新的插件")
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