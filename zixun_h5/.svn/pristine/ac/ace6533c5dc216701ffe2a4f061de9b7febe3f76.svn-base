$(document).ready(function() {
    var hctag = HCCP.dataS.cookie.get('hctag') || ''
    //取一下跳转参数 jumpType = zixun 从新资讯页面跳过来
    var jumpType = HCCP.FUNC.getUrlParam("jumpType") || "";
    // 取一下本地时间
    var timeobj = new Date()
    var hours = timeobj.getHours()
    var min = timeobj.getMinutes()

    function showBtn() {
        $(".no_padding_wraper").removeClass('no_padding_wraper')
        $("footer").show()
    }
    //正常判断
    function common() {
        // 判断一下uc
        if (hctag != 'ucnav') {
            //如果是从新资讯页面跳过来,加下载条
            if (jumpType == 'zixun') {
                var downloadHtml = '<div class="zixun_down" style="'
                downloadHtml += 'text-align:center;background-color:#FD8237 ;width:100%;height:0.49rem;position:fixed;bottom:0;font-size:0'
                downloadHtml += '">'
                downloadHtml += '<div class="wrap_content hc-cf" style="display:inline-block;line-height:0.49rem">'
                downloadHtml += '<span class="down_img_wrap" style="padding-right:0.15rem;display:inline-block;height:0.49rem;float:left"><img class="down_img" style="width:0.41rem;height:0.41rem" src="/Static/images/v1.0/info/zixun/download.png"></span>'
                downloadHtml += '<span class="down_text" style="font-size:0.16rem;color:#fff;display:inline-block;height:0.49rem;float:left">注册送88元！</span>'
                downloadHtml += '</div></div>'
                $("footer").remove()
                $(".wraper").css({
                    paddingBottom: '0.49rem',
                });

                $("body").append(downloadHtml)
                $(".zixun_down").on('click', function(event) {
                    event.preventDefault();
                    /* Act on the event */
                    HCCP.FUNC.go(URL_LETOULA)
                });
            } else {
                showBtn()
            }
        } else { //是uc的话看时间开放投注按钮. 18点30-早上8点30
            if (hours <= 8 || hours >= 18) {
                if (hours == 8) {
                    if (min <= 30) {
                        showBtn()
                    }
                } else if (hours == 18) {
                    if (min >= 30) {
                        showBtn()
                    }
                } else {
                    showBtn()
                }
            }
        }
    }
    //取一下是否停售(总开关)
    var data = HCCP.ajax.get("/info/h5checkstop", { hctag: hctag })
    if (data && data.code == 200 && data.data) {
        if (data.data.isStop != 1) { //没有关闭，继续正常的走
            common()
        } else {} //关闭了不管它
    } else {
        common()
    }
    //今日好彩给头部变个色
    if (jumpType == 'zixun') {
        $(".hc-h5-wrap header").css({
            'backgroundColor': '#FD8237 ',
        });
    }

})