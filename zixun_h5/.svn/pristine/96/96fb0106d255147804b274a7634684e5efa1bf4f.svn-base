$(function() {
	//进入页面重置所有的值
	$("#input_password").val("");
	$("#input_password_code").val("");
	$("#input_password").val("");
	var router_url = "";
	router_url = USER.router(HCCP.FUNC.getUrlParam("router"));
	backRouter();
	//登陆和验证码登陆的tab切换
	$(".loginTab").on('click', "li", function(e) {
		console.log(e)
		console.log(e.currentTarget);
		//密码和验证码需要置空但是电话号码可以不用置空
		$("#input_password").val("");
		$("#input_password_code").val("");
		if(e.currentTarget.className == "choiced") {
			return false;
		} else {
			//重置登陆的状态
			$("#loginbtn").attr("disabled", "disabled");
			e.currentTarget.className = "choiced";
			$(this).siblings()[0].className = '';
			if(e.currentTarget.id == "phoneCode") {
				$(".codeLogin").show();
				$(".userLogin").hide();
			} else if(e.currentTarget.id == "loginRegis") {
				$(".userLogin").show();
				$(".codeLogin").hide();
			}
		}
	})
	//根据输入的情况显示登陆的按钮颜色
	var input_phone = '';
	var input_password = '';
	var input_password_code = '';
	$("#input_password").on("keyup", function(e) {
		input_phone = $("#input_phone").val();
		input_password = $("#input_password").val();
		if(input_phone && input_password) {
			$("#loginbtn").removeAttr("disabled");
		} else {
			//重置登陆的状态
			$("#loginbtn").attr("disabled", "disabled");
		}
	})
	$("#input_password_code").on("keyup", function(e) {
		input_phone = $("#input_phone").val();
		input_password_code = $("#input_password_code").val();
		if(input_phone && input_password_code) {
			$("#loginbtn").removeAttr("disabled");
		} else {
			//重置登陆的状态
			$("#loginbtn").attr("disabled", "disabled");
		}
	})
	$("#input_phone").on("keyup", function(e) {
		input_phone = $("#input_phone").val();
		input_password = $("#input_password").val();
		input_password_code = $("#input_password_code").val();
		if((input_phone && input_password) || (input_phone && input_password_code)) {
			$("#loginbtn").removeAttr("disabled");
		} else {
			//重置登陆的状态
			$("#loginbtn").attr("disabled", "disabled");
		}
	})
	//判断 返回路由
	function backRouter() {
		var router = HCCP.FUNC.getUrlParam("router") ? HCCP.FUNC.getUrlParam("router") : "default";
		var routerArray = "detail,comment,commentDetail,report";
		if(routerArray.indexOf(router) != -1) {
			router_url = HCCP.FUNC.getUrlParam("url");
			return true;
		}
		return false;
	}
	//忘记密码的跳转
	$(".forgetPass a").click(function() {
		if(backRouter()) {
			window.location.href = USER.hrefUrl.findpass + "?router=detail&url=" + encodeURIComponent(HCCP.FUNC.getUrlParam("url"));
			return;
		}
		window.location.href = USER.hrefUrl.findpass;
	})
	//立即注册的跳转
	$(".login-regist").click(function() {
		if(backRouter()) {
			window.location.href = "user_register.html?router=detail&url=" + encodeURIComponent(HCCP.FUNC.getUrlParam("url"));
			return;
		}
		window.location.href = "user_register.html";
	})
	//点击获取验证码  60秒 重新发送
	var wait = 60;
	//倒计时
	function time(o) {
		if(wait == 0) {
			o.removeAttribute("disabled");
			o.innerText = "重新发送";
			wait = 60;
			return;
		} else {
			o.setAttribute("disabled", true);
			o.innerText = "(" + wait + ")S后重发";
			wait--;
			setTimeout(function() {
					time(o)
				},
				1000)
		}
	}

	$("#code-btn").click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		var lg_num = $("#input_phone").val();
		var id = "errorinfo";
		if(USER.params.checkEmty(lg_num, "手机号", id) && USER.params.checkPhone(lg_num, id)) {
			//调获取验证码 接口
			time(this);
			$("#" + id).empty();
			var agent = navigator.appVersion;
			var res = HCCP.ajax.post("/iation/haocai/login/send?identity=" + HCQD.identity() + "&platform=" + HCQD.platform() + "&uuid=" + $.md5(agent), {
				"mobile": lg_num
			});
			console.log(JSON.stringify(res));
			if(res && res.code == 200) {
				layer.open({
					content: '验证码已发送',
					skin: 'msg',
					time: 3
				});
			} else if(res) { //发送失败				
				$("#" + id).text(res.message);
			} else {
				$("#" + id).text("网络异常,请稍后再试");
			}
		}
	})
	//登陆按钮的事件
	$("#loginbtn").click(function(e) {
		input_phone = $("#input_phone").val();
		input_password = $("#input_password").val();
		input_password_code = $("#input_password_code").val();
		var id = "errorinfo";
		var agent = navigator.appVersion;
		$("#" + id).empty();
		$("#loginbtn").css("background", "#e76666");
		if(input_password) { //登陆注册tab的登陆
			if(USER.params.checkEmty(input_phone, "手机号", id) && USER.params.checkEmty(input_password, "密码", id) && USER.params.checkPhone(input_phone, id)) {				
				var res = HCCP.ajax.post('/iation/haocai/login', {
					"mobile": input_phone,
					"password": input_password
				});				
			}
		} else if(input_password_code) { //验证码tab的登陆
			if(USER.params.checkEmty(input_phone, "手机号", id) && USER.params.checkEmty(input_password_code, "验证码", id) && USER.params.checkPhone(input_phone, id)) {
				var res = HCCP.ajax.post('/iation/haocai/smsLogin', {
					"mobile": input_phone,
					"code": input_password_code,
					"uuid": $.md5(agent)
				});
			}
		}
		//根据返回的数据进行判断
		if(res.code == 200) {
			layer.open({
				content: '登录成功',
				skin: 'msg',
				time: 2
			});
			USER.save(res.data);
			window.location.href = router_url;
		} else if(res) { //登录失败
			$("#" + id).text(res.message);
			setTimeout(function() {
				$("#loginbtn").css("background", "##FF6C00");
				$("#" + id).text("");
			}, 500)
		} else {
			$("#" + id).text("网络异常,请稍后再试");
			setTimeout(function() {
				$("#" + id).text("");
			}, 500)
		}

	})
})