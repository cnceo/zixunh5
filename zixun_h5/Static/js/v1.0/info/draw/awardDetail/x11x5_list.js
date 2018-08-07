/**
 * Created by YBOSS on 2016/12/5.
 */
//取一下跳转参数 jumpType = 1 从新资讯页面跳过来
jumpType = HCCP.FUNC.getUrlParam("jumpType") || ""
var flag=false;
$(document).ready(function() {
    var lotyId = HCCP.FUNC.getUrlParam('lotyId') || 20;
    if(lotyId == 20){
        $('.header-title').html("新11选5");
        $('.btn_red').html('新11选5投注');
    }else if(lotyId == 21){
        $('.header-title').html("粤11选5");
        $('.btn_red').html('粤11选5投注');
    }else if(lotyId == 23){
        $('.header-title').html("鲁11选5");
        $('.btn_red').html('鲁11选5投注');
    }else if(lotyId == 24){
        $('.header-title').html("陕西11选5");
        $('.btn_red').html('陕西11选5投注');
    }else if(lotyId == 25){
        $('.header-title').html("青11选5");
        $('.btn_red').html('青11选5投注');
    }else if(lotyId == 26){
        $('.header-title').html("桂11选5");
        $('.btn_red').html('桂11选5投注');
    }else if(lotyId == 27){
        $('.header-title').html("赣11选5");
        $('.btn_red').html('赣11选5投注');
    }
    var data = HCCP.info.award(lotyId+"?issue=0&limit=20");
    if(data.data.length<20){
        flag=true;
    }
    if (data == undefined) {
        //alert("No Data");
        return;
    }
    var statusCode = data.code;
    if (statusCode != 200) {
        HCCP.FUNC.alert(data.message);
        return;
    }
    //
    init_data(data.data);
    down_pull(lotyId);
    //滚动监控
    bindReachBottom();
    //增加搜索功能
    $(".search-issue").on('click',function(){
        $('#keyboard').show();
        $(".qr_mask").show();
        $(".search-issue").text('');
        $('.issue-search-close').addClass('bg-change');
        $(".search-issue").addClass('add-search-logo');
    });
    $('.kj_issue_search').on('click','.bg-change',function(){
        $('.issue-search-close').removeClass('bg-change');
        $(".search-issue").removeClass('add-search-logo').text('搜索开奖期号，例：180122003');
        $('#keyboard').hide();
        $(".qr_mask").hide();
        if($(this).hasClass('haschecked')){
            location.reload();
        }else{
            $(this).removeClass('haschecked')
        }
    })
    //调起键盘
    $(".search-issue").numKeyBoard({
        after: 'body',
        'minVal':'',
        'maxVal': maxVal,
        keyBoardId:'keyboard',
        callBack: function(num, flag) {
            if (flag == 'N') {
            }
            if(flag == 'Y'){
                $('.qr_mask').hide();
                Gogetissue();
            }
        }
    })
    // 点击遮罩层
    $(".qr_mask").on("click",function(){
        if($(".search-issue").text()){
            $('.qr_mask').hide();
            $('#keyboard').find('.sure').click();
        }else{
            if($('.issue-search-close').hasClass('haschecked')){
                Gogetissue();
            }else{
                $('#keyboard').find('.sure').click();
            }
            $(".search-issue").removeClass('add-search-logo').text('搜索开奖期号，例：180122003');
            $('#keyboard').hide();
            $(".qr_mask").hide();
        }
    });
    //
    var URL_TRADE;
    switch(lotyId){
        case '26':
            URL_TRADE = URL_TRADE_GX11x5;
            break;
        case '25':
            URL_TRADE = URL_TRADE_QH11x5;
            break;
        case '24':
            URL_TRADE = URL_TRADE_SX11x5
            break;
        case '23':
            URL_TRADE = URL_TRADE_SD11x5
            break;   
        case '21':
            URL_TRADE = URL_TRADE_Y11x5
            break; 
        case '20':
            URL_TRADE = URL_TRADE_X11x5
            break;
        case '27':
            URL_TRADE = URL_TRADE_JX11x5
            break;
        default:
            break;        
    }
    $("body").on('click',".x11x5_items ul li", function(){ 
        if(jumpType == "zixun"){
            HCCP.FUNC.go(URL_INFO_KAIJIANG_X11x5_DETAIL+"?projectId="+$(this).attr("id")+"&lotyId="+lotyId+"&jumpType=zixun")
        }else{
           HCCP.FUNC.go(URL_INFO_KAIJIANG_X11x5_DETAIL+"?projectId="+$(this).attr("id")+"&lotyId="+lotyId)
        }
    });
    $("footer button").on('click', function(){ HCCP.FUNC.go(URL_TRADE); });
    var issue,maxVal;
    function init_data(data){
        var tHtml = "";
        var tmp ;
        var reg = new RegExp(",","g");
        var sd11x5date;
        $.each(data, function(x,item) {
            if(x == 0){ //获取期号查询最大值
                maxVal = item.issue;
            }
            issue=item.issue;
            sd11x5date = item.date;
            sd11x5date = sd11x5date.substr(4,2)+"-"+sd11x5date.substr(6,2)+ " " +sd11x5date.substr(8,2)+':'+sd11x5date.substr(10,2)
            tHtml = "";
            tHtml += "<li";
            if(x==0){
                tHtml += ' class="latest"'
            }
            tHtml += " id='"+item.issue+"'>";
            if(x==0){
                tHtml += "<div class='arrow_r'></div>"
            }
            tHtml += "<p><span class='issue'>第"+item.issue+"期</span><span class='date'>"+sd11x5date+"</span>";
            if(x==0){
                tHtml += "<span class='latest_sign'>最新</span>";
            }
            tHtml += "</p>";
            tmp = item.openCode.replace("\|","<\/span><span>");
            //
            tHtml += "<div class='x11x5_item'><span>"+tmp.replace(reg,"</span><span>")+"</span></div>";
            $(".x11x5_items ul").append(tHtml);
        });
    }
    function init_data2(data){
        var tHtml = "";
        var tmp ;
        var reg = new RegExp(",","g");
        var sd11x5date;
        $.each(data, function(x,item) {
            issue=item.issue;
            sd11x5date = item.date;
            sd11x5date = sd11x5date.substr(4,2)+"-"+sd11x5date.substr(6,2)+ " " +sd11x5date.substr(8,2)+':'+sd11x5date.substr(10,2)
            tHtml = "";
            tHtml += "<li";
            if(x==0){
                tHtml += ''
            }
            tHtml += " id='"+item.issue+"'>";
            if(x==0){
                tHtml += "<div></div>"
            }
            tHtml += "<p><span class='issue'>第"+item.issue+"期</span><span class='date'>"+sd11x5date+"</span>";
            tHtml += "</p>";
            tmp = item.openCode.replace("\|","<\/span><span>");
            //
            tHtml += "<div class='x11x5_item'><span>"+tmp.replace(reg,"</span><span>")+"</span></div>";
            $(".x11x5_items ul").append(tHtml);
        });
    }
    function showOver() {
        var h = '<div class="hc-upload-text hc-text-center hc-padding">好坏呦～伦家都被你看光啦</div>';
        $('.x11x5_items').append(h);
    }
    //下拉加载新数据
    function down_pull(lotyId){
        $('.wraper .x11x5_items').scroll( function(event){
            //当内容滚动到底部时加载新的内容 100当距离最底部100个像素时开始加载.
            if(!flag){
                if ($(this).scrollTop() + $('.wraper .x11x5_items').height() + 10 >= $('.wraper .x11x5_items ul').height() && $(this).scrollTop() > 10) {
                    var data = HCCP.info.award(lotyId+"?issue="+issue+"&limit=20");
                    if(data.data.length<20){
                        init_data2(data.data);
                        showOver();
                        flag=true;
                    }else {
                        init_data2(data.data);
                    }

                }
            }
        })
    }
    //搜索期号
    function Gogetissue(){
        var lotyId = HCCP.FUNC.getUrlParam('lotyId');
        if($(".search-issue").text().length == 8){
            var checkIssue = $(".search-issue").text().trim();
            var data = HCCP.info.award(lotyId+"?issue="+(+checkIssue+1)+"&limit=1&checkIssue=1");
            if(data.code == 200){
                $(".x11x5_items ul").html('');
                init_data2(data.data);
                $('.issue-search-close').addClass('haschecked');
                $(".x11x5_items ul li").on('click', function(){ HCCP.FUNC.go(URL_INFO_KAIJIANG_X11x5_DETAIL+"?"+$(this).attr("id"));})
            }else{
                if(data.message){
                    HCCP.modal.alert({msg:data.message})
                }else{
                    HCCP.modal.alert({msg:'系统繁忙'})
                }
            }
        }else{
            $(".search-issue").removeClass('add-search-logo').text('搜索开奖期号，例：180122003');
             $('.issue-search-close').removeClass('bg-change');
            HCCP.modal.alert({
                msg:'请输入正确的格式',
                alertCallback:resetload
            });
        }
    }
     //监听滚动事件
    function bindReachBottom() {
        var head = $('.kj_issue_search'),
            height = head.height();
            $('.x11x5_items').on('scroll', function() {
                var top = $(this).scrollTop();
                opacity = top / height < 1 ? (1-top / height) : 0;
                if(opacity <= 0.1){
                    head.hide()
                }else{
                    head.show()
                }
                head.css('opacity', opacity);
            })
    }
    function resetload(){
        if($('.issue-search-close').hasClass('haschecked')){
            location.reload();
        }else{
        }
    }
});