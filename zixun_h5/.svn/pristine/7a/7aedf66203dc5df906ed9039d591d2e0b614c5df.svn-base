//加底部
$('.bf-wrap').after('<div class="empty_div" style="height:0.98rem"></div>')
var tabHtml = '<div class="hc-cf zixun_footer" style="height:0.49rem;position:fixed;bottom:0;background:#fff;width:100%;text-align:center;color:#939393";>\
	<div class="go_index" style="height:100%;width:33.3%;float:left"><div class="_img" style="height:0.22rem;width:100%;margin-top:0.07rem"><img src="/Static/images/v1.0/info/zixun/index_unselect.png" alt="" /></div>\
	<div class="_text" style="font-size:0.11rem;height:0.20rem;line-height:0.18rem;width:100%">首页</div></div>\
	<div class="go_live" style="height:100%;width:33.3%;float:left">\
	<div class="_img" style="height:0.22rem;width:100%;margin-top:0.07rem"><img src="/Static/images/v1.0/info/zixun/live_selected.png" alt="" /></div>\
	<div class="_text" style="font-size:0.11rem;height:0.20rem;line-height:0.18rem;width:100%;color:#FD8237">直播</div></div>\
	<div class="go_mine _img" style="height:0.22rem;width:100%;margin-top:0.07rem"><img src="/Static/images/v1.0/info/user/user_unselect.png" alt="" /></div>\
	<div class="_text" style="font-size:0.11rem;height:0.20rem;line-height:0.18rem;width:100%;">我的</div></div>\
	'
var downloadHtml = '<div class="zixun_down back_gradient" style="'
	downloadHtml += 'text-align:center;width:100%;height:0.49rem;position:fixed;bottom:0.49rem;font-size:0'
	downloadHtml += '">'
	downloadHtml += '<div class="wrap_content hc-cf" style="display:inline-block;line-height:0.49rem">'
	downloadHtml += '<span class="down_img_wrap" style="padding-right:0.15rem;display:inline-block;height:0.49rem;float:left"><img class="down_img" style="width:0.41rem;height:0.41rem" src="/Static/images/v1.0/info/zixun/download.png"></span>'
	downloadHtml += '<span class="down_text" style="font-size:0.16rem;color:#fff;display:inline-block;height:0.49rem;float:left">注册送88元！</span>'
	downloadHtml += '</div></div>'

$("body").append(tabHtml).append(downloadHtml)

$(".refresh").css({
	bottom: '1.3rem'
});
$(".zixun_footer ._img").css({
	backgroundPosition: 'center center',
	backgroundRepeat:'no-repeat',
	backgroundSize: "contain"

});
$(".zixun_footer ._img img").css({
	width:'0.22rem',
	height:'0.22rem'
});

var c = HCCP.FUNC.getUrlParam("c") || "";
    //今日好彩合作方需求
    var arr = ["zaker"]
    //有参数时回去也要添加一个c参数
    var go_index_url = URL_ZIXUN

    if($.inArray(c,arr) > -1){
        go_index_url = go_index_url + "?c=" + c
    }

$(".zixun_footer .go_index").on('click', function(event) {
	event.preventDefault();
	/* Act on the event */
	HCCP.FUNC.go("../../")
});
$(".zixun_footer .go_mine").on('click', function(event) {
	event.preventDefault();
	/* Act on the event */
	HCCP.FUNC.go("../../user/user_index.html")
});
$(".zixun_down").on('click', function(event) {
	event.preventDefault();
	//loading带文字
	layer.open({
	   type: 2,content: '正在跳转到七分彩'
	});
	setTimeout(function(){
		/* Act on the event */
		layer.closeAll();
		HCCP.FUNC.go("https://haocai.letoula.cn/")
	},800)	
});



