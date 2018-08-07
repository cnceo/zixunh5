/**
 * Created by YBOSS on 2016/12/5.
 */
$(document).ready(function() {
    var data = HCCP.info.award("21?issue=0&limit=20");
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
    down_pull();
    //
    $(".x11x5_items ul li").on('click', function(){
        HCCP.FUNC.go(URL_INFO_KAIJIANG_Y11x5_DETAIL+"?"+$(this).attr("id"));
    });
    $("footer button").on('click', function(){ HCCP.FUNC.go(URL_TRADE_Y11x5); });
});
var issue;
function init_data(data){
    var tHtml = "";
    var tmp ;
    var reg = new RegExp(",","g");
    var x11x5date;
    $.each(data, function(x,item) {
        issue=item.issue;
        x11x5date = item.date;
        x11x5date = x11x5date.substr(4,2)+"-"+x11x5date.substr(6,2)+ " " +x11x5date.substr(8,2)+':'+x11x5date.substr(10,2)
        tHtml = "";
        tHtml += "<li";
        if(x==0){
            tHtml += ' class="latest"'
        }
        tHtml += " id='"+item.issue+"'>";
        if(x==0){
            tHtml += "<div class='arrow_r'></div>"
        }
        tHtml += "<p><span class='issue'>第"+item.issue+"期</span><span class='date'>"+x11x5date+"</span>";
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
    var x11x5date;
    $.each(data, function(x,item) {
        issue=item.issue;
        x11x5date = item.date;
        x11x5date = x11x5date.substr(4,2)+"-"+x11x5date.substr(6,2)+ " " +x11x5date.substr(8,2)+':'+x11x5date.substr(10,2)
        tHtml = "";
        tHtml += "<li";
        tHtml += " id='"+item.issue+"'>";
        tHtml += "<p><span class='issue'>第"+item.issue+"期</span><span class='date'>"+x11x5date+"</span>";
        tHtml += "</p>";
        tmp = item.openCode.replace("\|","<\/span><span>");
        //
        tHtml += "<div class='x11x5_item'><span>"+tmp.replace(reg,"</span><span>")+"</span></div>";
        $(".x11x5_items ul").append(tHtml);
    });
}
//下拉加载新数据
function down_pull(){
    var flag=false;
    $('.wraper .x11x5_items').scroll( function(event){
        //当内容滚动到底部时加载新的内容 100当距离最底部100个像素时开始加载.
        if(!flag){
            if ($(this).scrollTop() + $('.wraper .x11x5_items').height() + 10 >= $('.wraper .x11x5_items ul').height() && $(this).scrollTop() > 10) {
                var data = HCCP.info.award("21?issue="+issue+"&limit=20");
                if(data.data.length<20){
                    init_data2(data.data);
                    flag=true;
                }else {
                    init_data2(data.data);
                }
                 $(".x11x5_items ul li").on('click', function(){HCCP.FUNC.go(URL_INFO_KAIJIANG_Y11x5_DETAIL+"?"+$(this).attr("id"))});
            }
        }
    })
}