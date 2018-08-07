//取一下跳转参数 jumpType = zixun 从新资讯页面跳过来
var jumpType = HCCP.FUNC.getUrlParam("jumpType") || "";
var downloadHtml = '<div class="zixun_down" style="'
	downloadHtml += 'text-align:center;background-color:#FD8237 ;width:100%;height:0.49rem;position:fixed;bottom:0;font-size:0'
	downloadHtml += '">'
	downloadHtml += '<div class="wrap_content hc-cf" style="display:inline-block;line-height:0.49rem">'
	downloadHtml += '<span class="down_img_wrap" style="padding-right:0.15rem;display:inline-block;height:0.49rem;float:left"><img class="down_img" style="width:0.41rem;height:0.41rem" src="/Static/images/v1.0/info/zixun/download.png"></span>'
	downloadHtml += '<span class="down_text" style="font-size:0.16rem;color:#fff;display:inline-block;height:0.49rem;float:left">注册送88元！</span>'
	downloadHtml += '</div></div>'
if(jumpType == 'zixun'){//如果是从新资讯页面跳过来，去头，换一下彩种顺序
	$("footer").remove()
	$(".wraper").css({
		paddingBottom: '0',
	});
	$("body").append(downloadHtml)
	$(".zixun_down").on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		HCCP.FUNC.go(URL_LETOULA)
	});
}


