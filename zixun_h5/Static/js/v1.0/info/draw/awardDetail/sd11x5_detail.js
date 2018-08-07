$(document).ready(function() {
	var x11x5_issue = window.location.search;
	x11x5_issue = x11x5_issue.substr(1);
	var data = HCCP.info.awarddetails(23,x11x5_issue);
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
    $("footer button").on('click', function(){ HCCP.FUNC.go(URL_TRADE_SD11x5); });
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
		item.bonus = item.bonus < 0?'--':HCCP.FUNC.number_format(item.bonus);
		tHtml += "<tr><td>"+item.levelName+"</td><td class='bonus'>"+item.bonus+"</td></tr>";
	});
	$(".x11x5_detail_content table").append(tHtml);
}
