/**
 * Created by YBOSS on 2016/12/5.
 */
//取一下跳转参数 jumpType = 1 从新资讯页面跳过来
var jumpType = HCCP.FUNC.getUrlParam("jumpType") || ""
$(document).ready(function() {
    var lotyId = HCCP.FUNC.getUrlParam('lotyId');
    if(lotyId == 30){
        $('.header-title').text("桂快3");
        $('.btn_red').text('桂快3投注');
    }else if(lotyId == 31){
        $('.header-title').text("赣快3");
        $('.btn_red').text('赣快3投注');
    }else if(lotyId == 32){
        $('.header-title').text("吉快3");
        $('.btn_red').text('吉快3投注');
    }
    var data = HCCP.info.award(lotyId+"?issue=0&limit=20");
    if (data == undefined) {
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
    
    $("body").on('click',".fc3D_items ul li", function(){ 
        if(jumpType == "zixun"){
            HCCP.FUNC.go(URL_INFO_KAIJIANG_GXK3_DETAIL+"?projectId="+$(this).attr("id")+"&lotyId="+lotyId+'&jumpType=zixun');
        }else{
            HCCP.FUNC.go(URL_INFO_KAIJIANG_GXK3_DETAIL+"?projectId="+$(this).attr("id")+"&lotyId="+lotyId);
        }
        
    });
    $("footer button").on('click', function(){ 
        HCCP.FUNC.go(URL_TRADE_K3+"?clickValueInt=" +lotyId, true) 
    });
    var maxVal;
    function init_data(data){
        var tce;
        var tHtml = "";
        var tmp;
        var reg = new RegExp(",","g");
        var fc3ddate;
        $.each(data, function(x,item) {
            if(x == 0){ //获取期号查询最大值
                maxVal = item.issue;
            }
            issue=item.issue;
            fc3ddate = item.date;
            fc3ddate = fc3ddate.substr(4,2)+"-"+fc3ddate.substr(6,2)+ " " +fc3ddate.substr(8,2)+":"+fc3ddate.substr(10,2);
            tHtml = "";
            tHtml += "<li";
            if(x==0){
                tHtml += ' class="latest"'
            }
            tHtml += " id='"+item.issue+"'>";
            if(x==0){
                tHtml += "<div class='arrow_r'></div>"
            }
            tHtml += "<p><span class='issue'>第"+item.issue+"期</span><span class='date'>"+fc3ddate+"</span>";
            if(x==0){
                tHtml += "<span class='latest_sign'>最新</span>";
            }
            tHtml += "</p>";
            var number_arr = item.openCode.split(",");//['1','2','3']
            var hezhi=+number_arr[0]+(+number_arr[1])+(+number_arr[2]);
            if(x == 0){
                tHtml +="<div class='fc3D_item clearfix'><div>"
                $.each(number_arr, function(i, ball) {
                    tHtml += "<span class=awardnum-"+ball+"></span>";
                });
                tHtml +="</div><span class='fc3D_hao'>和值 : <span>"+hezhi+"</span>"+"</span></div>"
            }else{
                tHtml +="<div class='fc3D_item clearfix'>"
                $.each(number_arr, function(i, ball) {
                    tHtml += "<span>"+ball+"</span>";
                });
                tHtml +="<span class='fc3D_hao'>和值 : <span>"+hezhi+"</span>"+"</span></div>"
            }
            
             
            $(".fc3D_items ul").append(tHtml);
        });
    }
    function init_data2(data){
        var tce;
        var tHtml = "";
        var tmp;
        var reg = new RegExp(",","g");
        var fc3ddate;
        $.each(data, function(x,item) {
            issue=item.issue;
            fc3ddate = item.date;
            fc3ddate = fc3ddate.substr(4,2)+"-"+fc3ddate.substr(6,2)+ " " +fc3ddate.substr(8,2)+":"+fc3ddate.substr(10,2);
            tHtml = "";
            tHtml += "<li";
            tHtml += " id='"+item.issue+"'>";
            tHtml += "<p><span class='issue'>第"+item.issue+"期</span><span class='date'>"+fc3ddate+"</span>";
            tHtml += "</p>";
            var number_arr = item.openCode.split(",");//['1','2','3']
            var hezhi=+number_arr[0]+(+number_arr[1])+(+number_arr[2])
            tHtml +="<div class='fc3D_item'>"
            $.each(number_arr, function(i, ball) {
                tHtml += "<span>"+ball+"</span>";
            });
             tHtml +="<span class='fc3D_hao'>和值 : <span>"+hezhi+"</span>"+"</span></div>"
            $(".fc3D_items ul").append(tHtml);
        });
    }
    function showOver() {
        var h = '<div class="hc-upload-text hc-text-center hc-padding">好坏呦～伦家都被你看光啦</div>';
        $('.gxk3_list').append(h);
    }
    //下拉加载新数据
    function down_pull(lotyId){
        var flag=false;
        $('.wraper .fc3D_items').scroll( function(event){
            //当内容滚动到底部时加载新的内容 100当距离最底部100个像素时开始加载.
            if(!flag){
                if ($(this).scrollTop() + $('.wraper .fc3D_items').height() + 10 >= $('.wraper .fc3D_items ul').height() && $(this).scrollTop() > 10) {
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
        if($(".search-issue").text().length == 9){
            var checkIssue = $(".search-issue").text().trim();
            var data = HCCP.info.award(lotyId+"?issue="+(+checkIssue+1)+"&limit=1&checkIssue=1");
            if(data.code == 200){
                $(".fc3D_items ul").html('');
                init_data2(data.data);
                $('.issue-search-close').addClass('haschecked');
                $(".fc3D_items ul li").on('click', function(){ HCCP.FUNC.go(URL_INFO_KAIJIANG_GXK3_DETAIL+"?"+$(this).attr("id"));})
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
            $('.fc3D_items').on('scroll', function() {
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
