$(document).ready(function() {
	var qlc_issue = window.location.search;
	qlc_issue = qlc_issue.substr(1);
	var data = HCCP.info.awarddetails(15,qlc_issue);
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
	$("footer button").on('click', function(){ HCCP.FUNC.go(URL_TRADE_QXC); });
});

function init_data(data){
	var reg = new RegExp(",","g");
	var qlcdate = HCCP.FUNC.from_unixtime(data.openTime,'standard');
	var tmp = data.openCode.replace("\|","<\/span><span>");
	var dy = qlcdate.substr(5,2)+"-"+qlcdate.substr(8,2);
	var tm = qlcdate.substr(11,2)+":"+qlcdate.substr(14,2);
	qlcdate = dy+" "+tm+"（"+getWeekByDate(qlcdate.substr(0,10))+"）";
	$("hc[name=issue]").text(data.issue);
	$("hc[name=qlcdate]").text(qlcdate);
	$(".qlc_item").html("<span>"+tmp.replace(reg,"</span><span>")+"</span>");
	$("hc[name=sales]").text(data.sales <= 0?'--':HCCP.FUNC.number_format(data.sales));
	$("hc[name=prizePool]").text(data.sales < 0?'--':HCCP.FUNC.number_format(data.prizePool));
	var tHtml = '';
	$.each(data.levels, function(x,item) {
		item.awardNum = item.awardNum < 0?'--':item.awardNum;
		item.bonus = item.bonus < 0?'--':HCCP.FUNC.number_format(item.bonus);
		tHtml += "<tr><td>"+item.levelName+"</td><td>"+item.awardNum+"</td><td class='bonus'>"+item.bonus+"</td></tr>";
	});
	$(".qlc_detail_content table").append(tHtml);
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