var userPhone = "";
$(function() {
	getUserInfo();
	initEvent();
})
function initEvent() {
	//注册按钮
	$("#finisBtn").click(function(){		
		//重置登陆的状态
		$("#finisBtn").attr("disabled", "disabled");
		var input_newpass_again = $("#input_newpass_again").val();
		var input_oldpass = $("#input_oldpass").val();
		var input_newpass = $("#input_newpass").val();
		if(input_newpass_again != input_newpass){
			$("#errorinfo").text("两次密码输入必须一致！");
			$("#finisBtn").removeAttr("disabled");
		}else{
			if(USER.params.checkEmty(input_oldpass,"旧密码","errorinfo") 
			&& USER.params.checkEmty(input_newpass,"新密码","errorinfo")			
			){
			$("#errorinfo").empty();
			$("#finisBtn").css("background","#e76666");
			var res = HCCP.ajax.post(
				'/iation/haocai/modifypsw',
				{
					//"mobile":userPhone,
					"password":input_oldpass,					
					"new_password":input_newpass,
					"new_password_confirmation":input_newpass
				});
			console.log(JSON.stringify(res));
			if(res.code == 200){
				layer.open({ content: '修改成功',skin: 'msg',time: 2});
				window.location.href = USER.hrefUrl.setting + "?router=changepass";
				$("#finisBtn").removeAttr("disabled");
			}else{//修改失败
				$("#errorinfo").text(res.message);
				$("#finisBtn").removeAttr("disabled");
			}
		}
		}
	})
	$("#finisBtn").on("touchstart",function(){
		$(this).css("background","#e76666");
	})
	$("#finisBtn").on("touchend",function(){
		$(this).css("background","#FD8237 ");
	})
	
}

//获取用户信息
function getUserInfo(){
	var res = HCCP.ajax.get('/iation/haocai/userInfo');
	if(res && res.code == 200){
		//填充界面 
		userPhone = res.data.mobile;return;
	}else if(res && res.code == 401){
		//登录已经失效  跳转登录界面
		window.location.href = USER.hrefUrl.login + "?router=changepass";
	}
}