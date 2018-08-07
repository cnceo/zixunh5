$(document).ready(function() {
	//彩种名统一走
	$("title").html("开奖信息-"+HCCP.getLotyNameById(4)+"/"+HCCP.getLotyNameById(5))
    $('.header-title').html(HCCP.getLotyNameById(4)+"/"+HCCP.getLotyNameById(5));
    $('.btn_red').eq(0).html(HCCP.getLotyNameById(4)+'投注');
    $('.btn_red').eq(1).html(HCCP.getLotyNameById(5)+'投注');
    $('.sfc_xl span').eq(0).html(HCCP.getLotyNameById(4)+"销量(元)")
    $('.sfc_gc span').eq(0).html(HCCP.getLotyNameById(5)+"销量(元)")
    $('.sfc_detail_content td').eq(0).html(HCCP.getLotyNameById(4))
    $('.sfc_detail_content2 td').eq(0).html(HCCP.getLotyNameById(5))

    
	var sfc_issue = window.location.search;
	sfc_issue = sfc_issue.substr(1);
	// var data = HCCP.info.awarddetails(4,sfc_issue);
	var data=HCCP.ajax.get("/info/zucaiawarddetail/"+4+"/"+sfc_issue);
	if (data == undefined) {
		//alert("No Data");
		return;
	}
	var statusCode = data.code;
	if (statusCode != 200) {
		// HCCP.FUNC.alert(data.message);
		$('.wraper').remove()
		$('footer')	.remove()
		var html='';
		html += "<div class='sfc_load_wrap'><div class='sfc_load'><img id='sfc_img_pic' style='width:100%;height:auto' src='//static.letoula.com//images/v1.0/info/award/LoadErrorGray.png' /></div>";
		html +="<div class='sfc_text'>加载失败~</div><div class='sfc_text sfc_text2'>请您检查当前的网络环境</div><div class='sfc_again_load'>重新加载</div></div>"
		$('#sfc_detail').append(html)
		$('.sfc_again_load').on('click',function(){
			location.reload() 
		})
		return;
	}
	//
	init_data(data.data);
	//
	$("footer button").eq(0).on('click', function(){ HCCP.FUNC.go(URL_TRADE_SFC); });
	$("footer button").eq(1).on('click', function(){ HCCP.FUNC.go(URL_TRADE_RX9); });
});

function init_data(data){
	
	var reg = new RegExp(",","g");
	var sfcdate = HCCP.FUNC.from_unixtime(data.openTime,'standard');
	var tmp = data.openCode.replace("\|","<\/span><span>");
	var dy = sfcdate.substr(5,2)+"-"+sfcdate.substr(8,2);
	var tm = sfcdate.substr(11,2)+":"+sfcdate.substr(14,2);
	sfcdate = dy+" "+tm+"（"+getWeekByDate(sfcdate.substr(0,10))+"）";
	// console.log(data)
	$("hc[name=issue]").text(data.issue);
	$("hc[name=sfcdate]").text(sfcdate);
	$(".sfc_item").html("<span>"+tmp.replace(reg,"</span><span>")+"</span>");
	$("hc[name=sales]").text(data.sales <= 0?'--':HCCP.FUNC.number_format(data.sales));
	$("hc[name=sales_r9]").text(data.sales_r9 <= 0 ?'--':HCCP.FUNC.number_format(data.sales_r9));
	var tHtml = '',tHtml2 = '',tHtml3='';
	$.each(data.levels, function(x,item) {
		item.awardNum = item.awardNum < 0?'--':item.awardNum;
		item.bonus = item.bonus < 0?'--':HCCP.FUNC.number_format(item.bonus);
		if(x==2){
			tHtml2 += "<tr><td>"+item.levelName+"</td><td>"+item.awardNum+"</td><td class='bonus'>"+item.bonus+"</td></tr>";
		}else{
			tHtml += "<tr><td>"+item.levelName+"</td><td>"+item.awardNum+"</td><td class='bonus'>"+item.bonus+"</td></tr>";
		}
	});
	$(".sfc_detail_content table tbody").append(tHtml);
	$(".sfc_detail_content2 table tbody").append(tHtml2);
	$.each(data.match, function(x,item) {
			if(item.result==''){
				item.result='*'
			}
			item.hostScore = item.hostScore == -1?'-':item.hostScore;
			item.guestScore = item.guestScore == -1?'-':item.guestScore;
			tHtml3 += "<tr><td>"+item.changci+"</td><td>"+item.host+"&nbsp;"+item.hostScore+":"+item.guestScore+"&nbsp;"+item.guest+"</td><td class='bonus'>"+item.result+"</td></tr>";	
	});
	$(".sfc_detail_content3 table tbody").append(tHtml3);
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
