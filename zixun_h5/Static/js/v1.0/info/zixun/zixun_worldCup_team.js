$(document).ready(function($) {
	var columnid = HCCP.FUNC.getUrlParam("type")
    var scolumnid = HCCP.FUNC.getUrlParam("scolumnid")
    if(columnid){
        columnid = parseInt(columnid)
    }else{
        columnid = 1;
    }
    document.title = '世界杯-今日好彩 新媒体彩票资讯平台'
    $('.header-right').text("世界杯")
    if(columnid == 1){
    	$(".tab1").show()
    	
    }else{
    	$(".tab2").show()
    }
    $("body").on('click', '.tab1 .match_item', goDetail);
    $("body").on('click', '.adv', goAdv);
    var jumpUrl = ""

    //广告图
    if(scolumnid){
        var data = HCCP.ajax.get("/iation/haocai/advart/"+scolumnid)
        if(data.code==200){
            if($.isEmptyObject(data.data.advartInfo)){
                return
            }
            jumpUrl = data.data.advartInfo[0].click_value_string
            $(".adv_wrap").html("<div class='adv'><img width=100% src="+ data.data.advartInfo[0].advartLogo +"></div>")
        }else{
            HCCP.modal.alert({
                msg:data.message
            })
        }
    }else{
        //
    }
    //跳去详情
    function goDetail() {
        var that = $(this)
        var country_name = HCCP.FUNC.trim(that.find('.country_name').text())
        // return
        var jump = {
            url: REMOTE_DATA_URL + '/iation/articledetail/' + encodeURIComponent(country_name) +"?platform=3&iationType=haocai"
        }
        // localStorage.setItem("jumpZixunDetail", JSON.stringify(jump));
        // HCCP.FUNC.go(URL_ZIXUN_DETAIL);
        HCCP.FUNC.go(URL_ZIXUN_DETAIL+"?jump="+encodeURIComponent(jump.url));
    }
    // 广告跳首页
    function goAdv() {
        if(jumpUrl){
            HCCP.FUNC.go(jumpUrl);
        }
    }
    
});