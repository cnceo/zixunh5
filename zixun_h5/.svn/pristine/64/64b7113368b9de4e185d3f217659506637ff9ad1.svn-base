var router_url = USER.hrefUrl.index;
$(function(){
	initEvent();
	backRouter();
})
//判断 返回路由
function backRouter(){
	var router = HCCP.FUNC.getUrlParam("router")?HCCP.FUNC.getUrlParam("router"):"default";
	var routerArray = "detail,comment,commentDetail,report";
	if(routerArray.indexOf(router) != -1){
		router_url = HCCP.FUNC.getUrlParam("url");
		return true;
	}return false;
}

function initEvent(){
	//点击获取验证码
	$("#code-btn").click(function(e){
		e.preventDefault();
		e.stopPropagation();
		var lg_num = $("#input_phone").val();
		var id = "errorinfo";
		if(USER.params.checkEmty(lg_num,"手机号",id) && USER.params.checkPhone(lg_num,id)){
			//调获取验证码 接口
			time(this);
			$("#"+id).empty();
			var agent = navigator.appVersion;
			var res = HCCP.ajax.post("/iation/haocai/login/send?identity="+HCQD.identity()+"&platform="+HCQD.platform()+"&uuid="+$.md5(agent),{
				"mobile":lg_num
			});
			console.log(JSON.stringify(res));
			if(res && res.code == 200){
				layer.open({ content: '验证码已发送',skin: 'msg',time: 3});		
			}else if(res){//发送失败				
				$("#"+id).text(res.message);
			}else{
				$("#"+id).text("网络异常,请稍后再试");
			}
		}
	})
	
	$("#loginbtn").click(function(){
		var input_phone = $("#input_phone").val();
		var input_password = $("#input_password").val();
		var id = "errorinfo";
		var agent = navigator.appVersion;
		if(USER.params.checkEmty(input_phone,"手机号",id) && USER.params.checkEmty(input_password,"验证码",id) && USER.params.checkPhone(input_phone,id)){
			$("#"+id).empty();
			$("#loginbtn").css("background","#e76666");			
			var res = HCCP.ajax.post('/iation/haocai/smsLogin',{"mobile":input_phone,"code":input_password,"uuid":$.md5(agent)});
			if(res.code == 200){
				layer.open({ content: '登录成功',skin: 'msg',time: 2});
				USER.save(res.data);
				window.location.href = router_url;
			}else if(res){//登录失败
				$("#"+id).text(res.message);
				setTimeout(function(){
					$("#loginbtn").css("background","#FD8237 ");
				},500) 
			}else{
				$("#"+id).text("网络异常,请稍后再试");
			}
		}
	})
	$("#loginbtn").on("touchstart",function(){
		$(this).css("background","#e76666");
	})
	$("#loginbtn").on("touchend",function(){
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





