$(function() {
	initEvent();
	//根据输入的情况显示登陆的按钮颜色
	var input_phone = '';
	var input_password = '';
	var input_invalid = '';
	$("#input_password").on("keyup", function(e) {
		input_phone = $("#input_phone").val();
		input_password = $("#input_password").val();
		input_invalid = $("#input_invalid").val();
		if(input_phone && input_password && input_invalid) {
			$("#regBtn").removeAttr("disabled");
		} else {
			//重置登陆的状态
			$("#regBtn").attr("disabled", "disabled");
		}
	})
	$("#input_invalid").on("keyup", function(e) {
		input_phone = $("#input_phone").val();
		input_password = $("#input_password").val();
		input_invalid = $("#input_invalid").val();
		if(input_phone && input_password && input_invalid) {
			$("#regBtn").removeAttr("disabled");
		} else {
			//重置登陆的状态
			$("#regBtn").attr("disabled", "disabled");
		}
	})
	$("#input_phone").on("keyup", function(e) {
		input_phone = $("#input_phone").val();
		input_password = $("#input_password").val();
		input_invalid = $("#input_invalid").val();
		if(input_phone && input_password && input_invalid) {
			$("#regBtn").removeAttr("disabled");
		} else {
			//重置登陆的状态
			$("#regBtn").attr("disabled", "disabled");
		}	
	})
	
	
	
})

function initEvent() {
	//点击 获取验证码按钮
	$("#invalid-btn").click(function(){
		var phone = $("#input_phone").val();
		if(USER.params.checkEmty(phone,"手机号","errorinfo") && USER.params.checkPhone(phone,"errorinfo")){
			time(this);
			var agent = navigator.appVersion;
			var res = HCCP.ajax.post("/iation/haocai/register/send?identity="+HCQD.identity()+"&platform="+HCQD.platform()+"&uuid="+$.md5(agent),{
				"mobile":phone
			});
			console.log(JSON.stringify(res));
			if(res && res.code == 200){
				layer.open({ content: '验证码已发送',skin: 'msg',time: 3});
			}else if(res){//发送失败
				$("#errorinfo").text(res.message);
			}else{
				$("#errorinfo").text("网络异常,请稍后再试");
			}
		}
		return;
	})
	//注册按钮
	$("#regBtn").click(function(){
		var input_phone = $("#input_phone").val();
		var input_password = $("#input_password").val();
		var code = $("#input_invalid").val();
		if(USER.params.checkEmty(input_phone,"手机号","errorinfo") && USER.params.checkEmty(code,"验证码","errorinfo") && USER.params.checkEmty(input_password,"密码","errorinfo") && USER.params.checkPhone(input_phone,"errorinfo")){			
			$("#errorinfo").empty();
			$("#regBtn").css("background","#e76666");
			var res = HCCP.ajax.post(
				'/iation/haocai/register',
				{
					"mobile":input_phone,
					"code":code,					
					"password":input_password,
					"password_confirmation":input_password
				});
			console.log(JSON.stringify(res));
			if(res.code == 200){
				layer.open({ content: '注册成功',skin: 'msg',time: 2});
				USER.save(res.data);
				if(HCCP.FUNC.getUrlParam("router") == "detail"){//资讯详情页的 路由 url					
					//增加 闯关 分享 复活
					if(HCCP.FUNC.getUrlParam("type") == "fuhuo"){
						window.location.href = USER.hrefUrl.baseinfo + "?router=detail&url="+encodeURIComponent(HCCP.FUNC.getUrlParam("url"))+"&type=fuhuo&uid="+HCCP.FUNC.getUrlParam("uid");
					}else{
						window.location.href = USER.hrefUrl.baseinfo + "?router=detail&url="+encodeURIComponent(HCCP.FUNC.getUrlParam("url"));
					}					
					return;
				}
				window.location.href = USER.hrefUrl.baseinfo;
			}else{//注册失败
				$("#errorinfo").text(res.message);
				setTimeout(function(){
					$("#regBtn").css("background","#FD8237 ");
				},500)
			}
		}
	})
	$("#regBtn").on("touchstart",function(){
		$(this).css("background","#e76666");
	})
	$("#regBtn").on("touchend",function(){
		$(this).css("background","#FD8237 ");
	})
}
//60秒 重新发送
var wait = 60;
//倒计时
function time(o) {
	if(wait == 0) {
		o.removeAttribute("disabled");
		o.innerText = "重新发送";
		wait = 60;return;
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