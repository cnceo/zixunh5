$(document).ready(function() {
	var lotyId = HCCP.FUNC.getUrlParam('lotyId');
	var x11x5_issue = HCCP.FUNC.getUrlParam('projectId');
	if(lotyId == 20){
        $('.header-title').html("新11选5开奖详情");
        $('.btn_red').html('新11选5投注');
    }else if(lotyId == 21){
        $('.header-title').html("粤11选5开奖详情");
        $('.btn_red').html('粤11选5投注');
    }else if(lotyId == 23){
        $('.header-title').html("鲁11选5开奖详情");
        $('.btn_red').html('鲁11选5投注');
    }else if(lotyId == 24){
        $('.header-title').html("陕西11选5开奖详情");
        $('.btn_red').html('陕西11选5投注');
    }else if(lotyId == 25){
        $('.header-title').html("青11选5开奖详情");
        $('.btn_red').html('青11选5投注');
    }else if(lotyId == 26){
        $('.header-title').html("桂11选5开奖详情");
        $('.btn_red').html('桂11选5投注');
    }else if(lotyId == 27){
        $('.header-title').html("赣11选5");
        $('.btn_red').html('赣11选5投注');
    }
    var data = HCCP.info.awarddetails(lotyId,x11x5_issue);
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
	//
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
	$("footer button").on('click', function(){ HCCP.FUNC.go(URL_TRADE); });
});
function init_data(data){
	var reg = new RegExp(",","g");
	var x11x5date = HCCP.FUNC.from_unixtime(data.openTime,'standard'); //时间
	var tmp = data.openCode.replace("\|","<\/span><span>");
	var dy = x11x5date.substr(5,2)+"-"+x11x5date.substr(8,2);
	var tm = x11x5date.substr(11,2)+":"+x11x5date.substr(14,2);
	x11x5date = dy+" "+tm;
	$("hc[name=issue]").text(data.issue);
	$("hc[name=x11x5data]").text(x11x5date);
	$(".x11x5_item").html("<span>"+tmp.replace(reg,"</span><span>")+"</span>");
	var tHtml = '';
	$.each(data.levels, function(x,item) {
        if(x == 12 || x ==  13 || x == 14 || x == 15){
            var itembonus = item.bonus;
            itembonus = itembonus.split('-');
            var itembonus1 = HCCP.FUNC.number_format(itembonus[0]);
            var itembonus2 = HCCP.FUNC.number_format(itembonus[1]);
            itembonus = itembonus1 +"-"+itembonus2;
        }else{
            var itembonus = HCCP.FUNC.number_format(item.bonus);
        }
		tHtml += "<tr><td>"+item.levelName+"</td><td class='bonus'>"+itembonus+"</td></tr>";
	});
	$(".x11x5_detail_content table").append(tHtml);
}
