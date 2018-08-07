$(document).ready(function() {
	var lotyId = HCCP.FUNC.getUrlParam('lotyId');
	var k3_issue = HCCP.FUNC.getUrlParam('projectId');
	var data = HCCP.info.awarddetails(lotyId,k3_issue);
	if(lotyId == 30){
        $('.header-title').text("桂快3开奖详情");
        $('.btn_red').text('桂快3投注');
    }else if(lotyId == 31){
        $('.header-title').text("赣快3开奖详情");
        $('.btn_red').text('赣快3投注');
    }else if(lotyId == 32){
        $('.header-title').text("吉快3开奖详情");
        $('.btn_red').text('吉快3投注');
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
	//
	$("footer button").on('click', function(){ HCCP.FUNC.go(URL_TRADE_K3+"?clickValueInt="+lotyId)});
});

function init_data(data){
	var reg = new RegExp(",","g");
	var k3_issue = HCCP.FUNC.from_unixtime(data.openTime,'standard');
	var dy = k3_issue.substr(5,2)+"-"+k3_issue.substr(8,2);
	var tm = k3_issue.substr(11,2)+":"+k3_issue.substr(14,2);
	k3_issue = dy+" "+tm;
	$("hc[name=issue]").text(data.issue);
	$("hc[name=fc3Ddate]").text(k3_issue);
    var number_arr = data.openCode.split(",");//['1','2','3']
    var hezhi=+number_arr[0]+(+number_arr[1])+(+number_arr[2])
    var xHtml='<div class="clearfix">'
    $.each(number_arr, function(i, ball) {
        xHtml += "<span class=awardnum-"+ball+"></span>";
    });
   xHtml +="</div><span class='fc3D_hao'>和值 : <span>"+hezhi+"</span>"+"</span>"
	$(".fc3D_item").html(xHtml);
	var tHtml = '';
	$.each(data.levels, function(x,item) {
		//配合加奖奖金处理
		if(x == 0){
            var bonusStr = item.bonus;
            bonusStr = bonusStr.split('-');
            var itembonus1 = HCCP.FUNC.number_format(bonusStr[0]);
            var itembonus2 = HCCP.FUNC.number_format(bonusStr[1]);
            bonusStr = itembonus1 +"-"+itembonus2;
        }else{
            var bonusStr = HCCP.FUNC.number_format(item.bonus);
        }
		// var bonusStr = item.bonus ? item.bonus.split('-').map(function(y){return y< 0?'--':HCCP.FUNC.number_format(y)}).join(' - ') : '--';
		tHtml += "<tr><td>"+item.levelName+"</td><td class='bonus'>"+bonusStr+"</td></tr>";
	});
	$(".fc3D_detail_content table").append(tHtml);
}
//日期，取星期,dateStr是不需要间隔符的
function getWeekByDate(dateStr, type) {
	var dayNames = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
	var dayNamesW = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
	//var formatTime = dateStr.substr(0, 4) + "/" + dateStr.substr(4, 2) + "/" + dateStr.substr(6, 2);
	var formatTime=dateStr.replace(/-/g, "/");
	var theCCDate = new Date((new Date(formatTime)).getTime());
	if (type == "xq") {
		return dayNamesW[theCCDate.getDay()];
	}
	return dayNames[theCCDate.getDay()];
}