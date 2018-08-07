$(document).ready(function() {
	var gxklsf_issue = HCCP.FUNC.getUrlParam('is') ;
	var lotyId = HCCP.FUNC.getUrlParam('lotyId') || 41;
	$("title").html(HCCP.getLotyNameById(lotyId)+"开奖详情")
    $('.header-title').html(HCCP.getLotyNameById(lotyId)+"开奖详情");
    $('.btn_red').html(HCCP.getLotyNameById(lotyId)+'投注');

	var data = HCCP.info.awarddetails(lotyId,gxklsf_issue);
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
    $("footer button").on('click', function(){ HCCP.FUNC.go(URL_TRADE_KLSF+'?'+lotyId); });
});
function init_data(data){
	var reg = new RegExp(",","g");
	var gxklsfdate = HCCP.FUNC.from_unixtime(data.openTime,'standard'); //时间
	var tmp = data.openCode.replace("\|","<\/span><span>");
	var dy = gxklsfdate.substr(5,2)+"-"+gxklsfdate.substr(8,2);
	var tm = gxklsfdate.substr(11,2)+":"+gxklsfdate.substr(14,2);
	gxklsfdate = dy+" "+tm;
	$("hc[name=issue]").text(data.issue);
	$("hc[name=gxklsfdata]").text(gxklsfdate);
	$(".gxklsf_item").html("<span>"+tmp.replace(reg,"</span><span>")+"</span>");
	var tHtml = '';
	$.each(data.levels, function(x,item) {
		var bonusStr = item.bonus ? item.bonus.split('-').map(function(y){return y< 0?'--':HCCP.FUNC.number_format(y)}).join(' - ') : '--';
		tHtml += "<tr><td>"+item.levelName+"</td><td class='bonus'>"+bonusStr+"</td></tr>";
	});
	$(".gxklsf_detail_content table").append(tHtml);
}
