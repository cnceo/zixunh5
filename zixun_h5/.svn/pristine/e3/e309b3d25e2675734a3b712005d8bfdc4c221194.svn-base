$(function(){
	$("#nickname").val("好彩"+USER.params.getRandomNum(100000,9999999))
	$("#uid").val(localStorage.getItem("uid"))
	initEvent();
})
function initEvent(){
	$("#avatar").change(function(){
		var formData = new FormData( );
		var fileobj = $("#uploadForm")[0][0].files[0];
		var filename = fileobj.name;
		var filesize = fileobj.size / (1024*1024);
		var filetype = filename.split('.')[1];
		if(filetype != "jpg" && filetype != "jpeg" && filetype != "png" && filetype != "gif"){
			layer.open({ content: '文件格式不对，请选择图片上传',skin: 'msg',time: 3});return;
		}
		if(filesize > 2){
			layer.open({ content: '请选择小于2M的图片上传',skin: 'msg',time: 3});return;
		}		
		formData.append("avatar" , fileobj);
		$.ajax({
	          url:REMOTE_DATA_URL+"/iation/haocai/uploadAvatar",
	          type:"POST",
	          data:formData,
	          xhrFields: {
				withCredentials: true
			  },
			  crossDomain: true,
	          async:false,
	          cache:false,
	          contentType:false,
	          processData:false,
	          success:function(returndata){
	            console.log(JSON.stringify(returndata));
	            //上传成功后要 重新设置 localstorage 
	            localStorage.setItem("userImgUrl",returndata.data.path)
	            $("#userheadimg").attr("src",localStorage.getItem("userImgUrl"))
	            layer.open({ content: '头像上传成功',skin: 'msg',time: 2});
	          },
	          error:function(returndata){
	            console.log(JSON.stringify(returndata));
	            layer.open({ content: res.message,skin: 'msg',time: 3});
	          }
	    });
	})
	
	$("#finishbtn").click(function(){		
	    var res = HCCP.ajax.post(
				'/iation/haocai/resetPersonal',
			{
				"uid":localStorage.getItem("uid"),
				"nickname":$("#nickname").val(),					
				"avatar":localStorage.getItem("userImgUrl")
			});
		console.log(JSON.stringify(res));
		if(res && res.code == 200){
			layer.open({ content: '设置成功',skin: 'msg',time: 3});
			// 然后跳转 index 页面			
			if(HCCP.FUNC.getUrlParam("router") == "detail"){//资讯详情页的 路由 url
				//增加闯关分享 复活
				if(HCCP.FUNC.getUrlParam("type") == "fuhuo"){
					var res_f = HCCP.ajax.post("/iation/worldcup/GuesseReset",{
						"user_id":HCCP.FUNC.getUrlParam("uid")
					})
					window.location.href = HCCP.FUNC.getUrlParam("url");
					return;
				}else{
					window.location.href = HCCP.FUNC.getUrlParam("url");
					return;
				}								
			}
			window.location.href = USER.hrefUrl.index;
		}else if(res){//
			$("#errorinfo").text(res.message);			
		}else{
			$("#errorinfo").text("网络异常，请稍后重试");
		}
	})
	$("#finishbtn").on("touchstart",function(){
		$(this).css("background","#e76666");
	})
	$("#finishbtn").on("touchend",function(){
		$(this).css("background","#FD8237 ");
	})
	$("#skipbtn").click(function(){
		window.location.href = USER.hrefUrl.index;
	})
}













