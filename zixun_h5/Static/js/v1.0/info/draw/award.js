
$(document).ready(function() {
	//判断是否为uc，加上返回按钮，否则默认没有返回按钮
	var hctag = HCCP.dataS.cookie.get('hctag')
	// 取一下本地时间
	var timeobj = new Date()
	var hours = timeobj.getHours()
	var min = timeobj.getMinutes()
	//取一下是否停售(总开关)
	var data = HCCP.ajax.get("/info/h5checkstop",{hctag:hctag})
	if(data && data.code == 200 && data.data){
		if(data.data.isStop != 1){//没有关闭，继续正常的走
			common()
		}else{}//关闭了不管它
	}else{
		common()
	}
	// 如果是ucnav的增加一个下载条
	if (hctag === 'ucnav') {
		var $down = $('<div class="download-wrap"><div class="download max-width"><img src="/Static/images/v1.0/common/uc_down.png" alt="" /></div></div>');
		$('.kj_content').prepend($down);
		$down.find('.download').click(function(){
			var url = '';
			if (HCCP.FUNC.browser().ios) {
				// ios 乐透啦主包
				url = 'itms-apps://itunes.apple.com/cn/app/le-tou-la-cai-piao-tou-zhu/id1121640242?mt=8';
			} else {
				// 安卓应用宝
				url = 'http://imtt.dd.qq.com/16891/1815990A18630898B655F7ADF3204022.apk?fsname=com.houcai.letoula_5.9.0_590.apk&csr=1bbd';
			}
			window.location.href = url;
		});
	}

	function common(){
		if(hctag != "ucnav"){
			$(".header-left").show()
		}else{//是uc的话看时间开放投注按钮. 18点30-早上8点30
			if(hours <= 8 || hours >= 18){
				if(hours == 8 ){
					if(min<=30){
						$(".header-left").show()
					}
				}else if(hours == 18){
					if(min>=30){
						$(".header-left").show()
					}
				}else{
					$(".header-left").show()
				}
			}
		}
	}
	
	//取一下跳转参数 jumpType = zixun 从新资讯页面跳过来
	jumpType = HCCP.FUNC.getUrlParam("jumpType") || ""
	var data = HCCP.info.award();
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
	var arr=[];
	$.each(data.data, function (x,y) {
		arr.push(y.lotyId)
	});
	if(arr.indexOf(1)==-1){$('.kj_jczq').hide();}
	if(arr.indexOf(2)==-1){$('.kj_jclq').hide();}
	if(arr.indexOf(3)==-1){$('.kj_zqdc').hide();}
	if(arr.indexOf(4)==-1){$('.kj_sfc').hide();}
	if(arr.indexOf(10)==-1){$('.kj_ssq').hide();}
	if(arr.indexOf(11)==-1){$('.kj_dlt').hide();}
	if(arr.indexOf(12)==-1){$('.kj_fc3d').hide();}
	if(arr.indexOf(13)==-1){$('.kj_pl5').hide();}
	if(arr.indexOf(15)==-1){$('.kj_qxc').hide();}
	if(arr.indexOf(16)==-1){$('.kj_qlc').hide();}
	if(arr.indexOf(20)==-1){$('.kj_xj11x5').hide();}
	if(arr.indexOf(21)==-1){$('.kj_gd11x5').hide();}
	if(arr.indexOf(23)==-1){$('.kj_sd11x5').hide();}
	if(arr.indexOf(24)==-1){$('.kj_sx11x5').hide();}
	if(arr.indexOf(25)==-1){$('.kj_qh11x5').hide();}
	if(arr.indexOf(26)==-1){$('.kj_gx11x5').hide();}
	if(arr.indexOf(27)==-1){$('.kj_jx11x5').hide();}
	if(arr.indexOf(30)==-1){$('.kj_gxk3').hide();}
	if(arr.indexOf(31)==-1){$('.kj_jxk3').hide();}
	if(arr.indexOf(32)==-1){$('.kj_jlk3').hide();}
	if(arr.indexOf(41)==-1){$('.kj_gxklsf').hide();}
	init_data(data.data);
	//点击进入下一页
	$(".kj_jczq").on('click', toJczqUrl);
	$(".kj_jclq").on('click', toJclqUrl);
	$(".kj_ssq").on('click', toSsqUrl);
	$(".kj_dlt").on('click', toDltUrl);
	$(".kj_zqdc").on('click', toZqdcUrl);
	$(".kj_sfc").on('click', toSfcUrl);
	$('.kj_xj11x5').on('click',toX11x5);
	$('.kj_gd11x5').on('click',toY11x5);
	$('.kj_fc3d').on('click',toFc3D);
	$('.kj_pl3').on('click',toPl3);
	$('.kj_pl5').on('click',toPl5);
	$('.kj_qlc').on('click',toQlc);
	$('.kj_qxc').on('click',toQxc);
	$('.kj_sd11x5').on('click',toSd11x5);
	$('.kj_sx11x5').on('click',toSX11x5);
	$('.kj_qh11x5').on('click',toQH11x5);
	$('.kj_gx11x5').on('click',toGX11x5);
	$('.kj_jx11x5').on('click',toJX11x5);
	$('.kj_gxk3').on('click',toGXK3);
	$('.kj_jxk3').on('click',toJXK3);
	$('.kj_jlk3').on('click',toJLK3);
	$('.kj_gxklsf').on('click',toGXKLSF);
});
//初始化数据
function init_data(data) {
	$.each(data, function(x, item) {
		switch (item.lotyId) {
			case 1:   //竟足
				item.gameId = item.gameId.toString();
				$("hc[name=jczq_host]").text(item.host);
				$("hc[name=jczq_guest]").text(item.guest);
				//$("hc[name=jczq_rq]").text(item.rq);
				$("hc[name=jczq_bf]").text(item.hostScore + ":" + item.guestScore);
				$("hc[name=jczq_date]").text(item.gameId.substr(4, 2) + "-" + item.gameId.substr(6, 2));
				$("hc[name=jczq_week]").text(getCcBygameid(item.gameId).substr(0, 2));
				break;
			case 2:  //竟蓝
				item.gameId = item.gameId.toString();
				$("hc[name=jclq_host]").text(item.guest);
				$("hc[name=jclq_guest]").text(item.host);
				$("hc[name=jclq_rq]").text(item.rq);
				$("hc[name=jclq_bf]").text(item.guestScore + ":" + item.hostScore);
				$("hc[name=jclq_date]").text(item.gameId.substr(4, 2) + "-" + item.gameId.substr(6, 2));
				$("hc[name=jclq_week]").text(getCcBygameid(item.gameId).substr(0, 2));
				break;
			case 10: //双色球
				item.date = item.date.toString();
				var number_arr = item.openCode.split("\|");
				var blueball = number_arr[1];
				var red_arr = number_arr[0].split(",");
				var ball_num = 0;
				$.each(red_arr, function(balli, redball) {
					ball_num = balli + 1;
					$(".ssq_item span:nth-child(" + ball_num + ")").text(redball);
				});
				$(".ssq_item span:last-child").text(blueball);
				$("hc[name=ssq_qihao]").text(item.issue);
				$("hc[name=ssq_date]").text(item.date.substr(4,2)+"-"+item.date.substr(6,2));
				$("hc[name=ssq_week]").text(getWeekByDate(item.date));
				break;
			case 11:  //大乐透
				// item.openCode="01,04,08,09,14,15|13,14"
				item.date = item.date.toString();
				var number_arr = item.openCode.split("\|");
				var blueball_arr = number_arr[1].split(",");
				var red_arr = number_arr[0].split(",");
				var ball_num = 0;
				$.each(red_arr, function(balli, redball) {
					ball_num = balli + 1;
					$(".dlt_item span:nth-child(" + ball_num + ")").text(redball);
				});
				//alert(blueball_arr);
				$.each(blueball_arr, function(balli, blueball) {
					var x = balli + 1 + ball_num;
					$(".dlt_item span:nth-child(" + x + ")").text(blueball);
				});
				
				$("hc[name=dlt_qihao]").text(item.issue);
				$("hc[name=dlt_date]").text(item.date.substr(4,2)+"-"+item.date.substr(6,2));
				$("hc[name=dlt_week]").text(getWeekByDate(item.date));
				break;
			case 3:   //北京单场 
				item.gameId = item.gameId.toString();
				$("hc[name=zqdc_host]").text(item.host);
				$("hc[name=zqdc_guest]").text(item.guest);
				$("hc[name=zqdc_bf]").text(item.hostScore + ":" + item.guestScore);
				$("hc[name=zqdc_date]").text(item.gameId.substr(4, 2) + "-" + item.gameId.substr(6, 2));
				$("hc[name=zqdc_week]").text(getCcBygameid(item.gameId).substr(0, 2));
				break;	
			case 4:  //胜负彩
				item.date = item.date.toString();
				var number_arr = item.openCode.split(",");
				var ball_num = 0;
				$.each(number_arr, function(balli, redball) {
					ball_num = balli + 1;
					$(".sfc_item span:nth-child(" + ball_num + ")").text(redball);
				});
				$.each(blueball_arr, function(balli, blueball) {
					var x = balli + 1 + ball_num;
					$(".sfc_item span:nth-child(" + x + ")").text(blueball);
				});				
				$("hc[name=sfc_qihao]").text(item.issue);
				$("hc[name=sfc_date]").text(item.date.substr(4,2)+"-"+item.date.substr(6,2));
				$("hc[name=sfc_week]").text(getWeekByDate(item.date));
				break;
			case 12:  //福彩3D
				//alert(JSON.stringify(item));
				item.date = item.date.toString();
				var number_arr = item.openCode.split(",");
				var rg = new RegExp(",", "g");
				var trycode = item.tryCode.replace(rg," ");
				$.each(number_arr, function(i, ball) {
					var x = i + 1;
					$(".fc3d_item span:nth-child(" + x + ")").text(ball);
				});
				$("hc[name=fc3d_qihao]").text(item.issue);
				$("hc[name=fc3d_date]").text(item.date.substr(4,2)+"-"+item.date.substr(6,2));
				$("hc[name=fc3d_sjh]").text(trycode);
				break;
			case 13:  //排列3
				//alert(JSON.stringify(item));
				item.date = item.date.toString();
				var number_arr = item.openCode.split(",");
				var rg = new RegExp(",", "g");
				$.each(number_arr, function(i, ball) {
					var x = i + 1;
					$(".pl3_item span:nth-child(" + x + ")").text(ball);
				});
				$("hc[name=pl3_qihao]").text(item.issue);
				$("hc[name=pl3_date]").text(item.date.substr(4,2)+"-"+item.date.substr(6,2));
				break;
			case 14:  //排列5
				//alert(JSON.stringify(item));
				item.date = item.date.toString();
				var number_arr = item.openCode.split(",");
				var rg = new RegExp(",", "g");
				$.each(number_arr, function(i, ball) {
					var x = i + 1;
					$(".pl5_item span:nth-child(" + x + ")").text(ball);
				});
				$("hc[name=pl5_qihao]").text(item.issue);
				$("hc[name=pl5_date]").text(item.date.substr(4,2)+"-"+item.date.substr(6,2));
				break;
			case 15: //七星彩
				item.date = item.date.toString();
				var number_arr = item.openCode.split("\|");
				var blueball = number_arr[1];
				var red_arr = number_arr[0].split(",");
				var ball_num = 0;
				$.each(red_arr, function(balli, redball) {
					ball_num = balli + 1;
					$(".qxc_item span:nth-child(" + ball_num + ")").text(redball);
				});
				$("hc[name=qxc_qihao]").text(item.issue);
				$("hc[name=qxc_date]").text(item.date.substr(4,2)+"-"+item.date.substr(6,2));
				$("hc[name=qxc_week]").text(getWeekByDate(item.date));
				break;
			case 16: //七乐彩
				item.date = item.date.toString();
				var number_arr = item.openCode.split("\|");
				var blueball = number_arr[1];
				var red_arr = number_arr[0].split(",");
				var ball_num = 0;
				$.each(red_arr, function(balli, redball) {
					ball_num = balli + 1;
					$(".qlc_item span:nth-child(" + ball_num + ")").text(redball);
				});
				$(".qlc_item span:last-child").text(blueball);
				$("hc[name=qlc_qihao]").text(item.issue);
				$("hc[name=qlc_date]").text(item.date.substr(4,2)+"-"+item.date.substr(6,2));
				$("hc[name=qlc_week]").text(getWeekByDate(item.date));
				break;	
			case 20:  //新11选5
				item.date = item.date.toString();
				var number_arr = item.openCode.split(",");
				$.each(number_arr, function(i, ball) {
					var x = i + 1;
					$(".xj11x5_item span:nth-child(" + x + ")").text(ball);
				});
				$("hc[name=xj11x5_qihao]").text(item.issue);
				$("hc[name=xj11x5_date]").text(item.date.substr(4,2)+"-"+item.date.substr(6,2)+" "+item.date.substr(8,2)+":"+item.date.substr(10,2));
				break;
			case 21:  //粤11选5
				item.date = item.date.toString();
				var number_arr = item.openCode.split(",");
				$.each(number_arr, function(i, ball) {
					var x = i + 1;
					$(".gd11x5_item span:nth-child(" + x + ")").text(ball);
				});

				$("hc[name=gd11x5_qihao]").text(item.issue);

				$("hc[name=gd11x5_date]").text(item.date.substr(4,2)+"-"+item.date.substr(6,2)+" "+item.date.substr(8,2)+":"+item.date.substr(10,2));
				break;
			case 22:  //鲁11选5
				item.date = item.date.toString();
				var number_arr = item.openCode.split(",");
				$.each(number_arr, function(i, ball) {
					var x = i + 1;
					$(".yn11x5_item span:nth-child(" + x + ")").text(ball);
				});
				$("hc[name=yn11x5_qihao]").text(item.issue);
				$("hc[name=yn11x5_date]").text(item.date.substr(4,2)+"-"+item.date.substr(6,2)+" "+item.date.substr(8,2)+":"+item.date.substr(10,2));
				break;
			case 23:  
				item.date = item.date.toString();
				var number_arr = item.openCode.split(",");
				$.each(number_arr, function(i, ball) {
					var x = i + 1;
					$(".sd11x5_item span:nth-child(" + x + ")").text(ball);
				});
				$("hc[name=sd11x5_qihao]").text(item.issue);
				$("hc[name=sd11x5_date]").text(item.date.substr(4,2)+"-"+item.date.substr(6,2)+" "+item.date.substr(8,2)+":"+item.date.substr(10,2));
				break;
			case 24:
				item.date = item.date.toString();
				var number_arr = item.openCode.split(",");
				$.each(number_arr, function(i, ball) {
					var x = i + 1;
					$(".sx11x5_item span:nth-child(" + x + ")").text(ball);
				});
				$("hc[name=sx11x5_qihao]").text(item.issue.toString().substr());
				$("hc[name=sx11x5_date]").text(item.date.substr(4,2)+"-"+item.date.substr(6,2)+" "+item.date.substr(8,2)+":"+item.date.substr(10,2));
				break;
			case 25:
				item.date = item.date.toString();
				var number_arr = item.openCode.split(",");
				$.each(number_arr, function(i, ball) {
					var x = i + 1;
					$(".qh11x5_item span:nth-child(" + x + ")").text(ball);
				});
				$("hc[name=qh11x5_qihao]").text(item.issue.toString().substr());
				$("hc[name=qh11x5_date]").text(item.date.substr(4,2)+"-"+item.date.substr(6,2)+" "+item.date.substr(8,2)+":"+item.date.substr(10,2));
				break;
			case 26:
				item.date = item.date.toString();
				var number_arr = item.openCode.split(",");
				$.each(number_arr, function(i, ball) {
					var x = i + 1;
					$(".gx11x5_item span:nth-child(" + x + ")").text(ball);
				});
				$("hc[name=gx11x5_qihao]").text(item.issue.toString().substr());
				$("hc[name=gx11x5_date]").text(item.date.substr(4,2)+"-"+item.date.substr(6,2)+" "+item.date.substr(8,2)+":"+item.date.substr(10,2));
				break;
			case 27:
				item.date = item.date.toString();
				var number_arr = item.openCode.split(",");
				$.each(number_arr, function(i, ball) {
					var x = i + 1;
					$(".jx11x5_item span:nth-child(" + x + ")").text(ball);
				});
				$("hc[name=jx11x5_qihao]").text(item.issue.toString().substr());
				$("hc[name=jx11x5_date]").text(item.date.substr(4,2)+"-"+item.date.substr(6,2)+" "+item.date.substr(8,2)+":"+item.date.substr(10,2));
				break;
			case 30:  //桂快3
				item.date = item.date.toString();
				var number_arr = item.openCode.split(",");
				var hezhi=+number_arr[0]+(+number_arr[1])+(+number_arr[2])
				$.each(number_arr, function(i, ball) {
					var x = i + 1;
					$(".gxk3_item span:nth-child(" + x + ")").addClass('awardnum-'+ball);
				});
				$("hc[name=gxk3_qihao]").text(item.issue);
				$("hc[name=gxk3_date]").text(item.date.substr(4,2)+"-"+item.date.substr(6,2)+" "+item.date.substr(8,2)+":"+item.date.substr(10,2));
				$("hc[name=gxk3_sjh]").text(hezhi);
				break;
			case 31:  //赣快3
				item.date = item.date.toString();
				var number_arr = item.openCode.split(",");
				var hezhi=+number_arr[0]+(+number_arr[1])+(+number_arr[2])
				$.each(number_arr, function(i, ball) {
					var x = i + 1;
					$(".jxk3_item span:nth-child(" + x + ")").addClass('awardnum-'+ball);
				});
				$("hc[name=jxk3_qihao]").text(item.issue);
				$("hc[name=jxk3_date]").text(item.date.substr(4,2)+"-"+item.date.substr(6,2)+" "+item.date.substr(8,2)+":"+item.date.substr(10,2));
				$("hc[name=jxk3_sjh]").text(hezhi);
				break;
			case 32:  //吉快3
				item.date = item.date.toString();
				var number_arr = item.openCode.split(",");
				var hezhi=+number_arr[0]+(+number_arr[1])+(+number_arr[2])
				$.each(number_arr, function(i, ball) {
					var x = i + 1;
					$(".jlk3_item span:nth-child(" + x + ")").addClass('awardnum-'+ball);
				});
				$("hc[name=jlk3_qihao]").text(item.issue);
				$("hc[name=jlk3_date]").text(item.date.substr(4,2)+"-"+item.date.substr(6,2)+" "+item.date.substr(8,2)+":"+item.date.substr(10,2));
				$("hc[name=jlk3_sjh]").text(hezhi);
				break;	
			case 41:  //广西快乐10分
				item.date = item.date.toString();
				var number_arr = item.openCode.split(",");
				$.each(number_arr, function(i, ball) {
					var x = i + 1;
					$(".gxklsf_item span:nth-child(" + x + ")").text(ball);
				});

				$("hc[name=gxklsf_qihao]").text(item.issue);

				$("hc[name=gxklsf_date]").text(item.date.substr(4,2)+"-"+item.date.substr(6,2)+" "+item.date.substr(8,2)+":"+item.date.substr(10,2));
				break;
			//其它彩种，后续添加
			default:
				break;
		}
	});
}
//

function toJczqUrl(){
	if(jumpType == 'zixun'){
		window.parent.HCCP.FUNC.go(URL_INFO_KAIJIANG_JCZQ_LIST+'?jumpType=zixun')
	}else{
		HCCP.FUNC.go(URL_INFO_KAIJIANG_JCZQ_LIST)
	}
}
function toJclqUrl(){
	if(jumpType == 'zixun'){
		window.parent.HCCP.FUNC.go(URL_INFO_KAIJIANG_JCLQ_LIST+'?jumpType=zixun')
	}else{
	HCCP.FUNC.go(URL_INFO_KAIJIANG_JCLQ_LIST)
}
}
function toSsqUrl(){
	if(jumpType == 'zixun'){
		window.parent.HCCP.FUNC.go(URL_INFO_KAIJIANG_SSQ_LIST+'?jumpType=zixun')
	}else{
	HCCP.FUNC.go(URL_INFO_KAIJIANG_SSQ_LIST)}
}
function toDltUrl(){
	if(jumpType == 'zixun'){
		window.parent.HCCP.FUNC.go(URL_INFO_KAIJIANG_DLT_LIST+'?jumpType=zixun')
	}else{
	HCCP.FUNC.go(URL_INFO_KAIJIANG_DLT_LIST)}
}
function toZqdcUrl(){
	if(jumpType == 'zixun'){
		window.parent.HCCP.FUNC.go(URL_INFO_KAIJIANG_ZQDC_LIST+'?jumpType=zixun')
	}else{
	HCCP.FUNC.go(URL_INFO_KAIJIANG_ZQDC_LIST)}
}
function toSfcUrl(){
	if(jumpType == 'zixun'){
		window.parent.HCCP.FUNC.go(URL_INFO_KAIJIANG_SFC_LIST+'?jumpType=zixun')
	}else{
	HCCP.FUNC.go(URL_INFO_KAIJIANG_SFC_LIST)}
}
function toX11x5(){
	if(jumpType == 'zixun'){
		window.parent.HCCP.FUNC.go(URL_INFO_KAIJIANG_X11x5_LIST+"?lotyId=20&jumpType=zixun")
	}else{
	HCCP.FUNC.go(URL_INFO_KAIJIANG_X11x5_LIST+"?lotyId=20")}
}
function toY11x5(){
	if(jumpType == 'zixun'){
		window.parent.HCCP.FUNC.go(URL_INFO_KAIJIANG_X11x5_LIST+"?lotyId=21&jumpType=zixun")
	}else{
	HCCP.FUNC.go(URL_INFO_KAIJIANG_X11x5_LIST+"?lotyId=21")}
}
function toFc3D(){
	if(jumpType == 'zixun'){
		window.parent.HCCP.FUNC.go(URL_INFO_KAIJIANG_FC3D_LIST+'?jumpType=zixun')
	}else{
	HCCP.FUNC.go(URL_INFO_KAIJIANG_FC3D_LIST)}
}
function toPl3(){
	if(jumpType == 'zixun'){
		window.parent.HCCP.FUNC.go(URL_INFO_KAIJIANG_PL3_LIST+'?jumpType=zixun')
	}else{
	HCCP.FUNC.go(URL_INFO_KAIJIANG_PL3_LIST)}
}
function toPl5(){
	if(jumpType == 'zixun'){
		window.parent.HCCP.FUNC.go(URL_INFO_KAIJIANG_PL5_LIST+'?jumpType=zixun')
	}else{
	HCCP.FUNC.go(URL_INFO_KAIJIANG_PL5_LIST)}
}
function toQlc(){
	if(jumpType == 'zixun'){
		window.parent.HCCP.FUNC.go(URL_INFO_KAIJIANG_QLC_LIST+'?jumpType=zixun')
	}else{
	HCCP.FUNC.go(URL_INFO_KAIJIANG_QLC_LIST)}
}
function toQxc(){
	if(jumpType == 'zixun'){
		window.parent.HCCP.FUNC.go(URL_INFO_KAIJIANG_QXC_LIST+'?jumpType=zixun')
	}else{
	HCCP.FUNC.go(URL_INFO_KAIJIANG_QXC_LIST)}
}
function toSd11x5(){
	if(jumpType == 'zixun'){
		window.parent.HCCP.FUNC.go(URL_INFO_KAIJIANG_X11x5_LIST+"?lotyId=23&jumpType=zixun")
	}else{
	HCCP.FUNC.go(URL_INFO_KAIJIANG_X11x5_LIST+"?lotyId=23")}
}
function toSX11x5(){
	if(jumpType == 'zixun'){
		window.parent.HCCP.FUNC.go(URL_INFO_KAIJIANG_X11x5_LIST+"?lotyId=24&jumpType=zixun")
	}else{
	HCCP.FUNC.go(URL_INFO_KAIJIANG_X11x5_LIST+"?lotyId=24")}
}
function toQH11x5(){
	if(jumpType == 'zixun'){
		window.parent.HCCP.FUNC.go(URL_INFO_KAIJIANG_X11x5_LIST+"?lotyId=25&jumpType=zixun")
	}else{
	HCCP.FUNC.go(URL_INFO_KAIJIANG_X11x5_LIST+"?lotyId=25")}
}
function toGX11x5(){
	if(jumpType == 'zixun'){
		window.parent.HCCP.FUNC.go(URL_INFO_KAIJIANG_X11x5_LIST+"?lotyId=26&jumpType=zixun")
	}else{
	HCCP.FUNC.go(URL_INFO_KAIJIANG_X11x5_LIST+"?lotyId=26")}
}
function toJX11x5(){
	if(jumpType == 'zixun'){
		window.parent.HCCP.FUNC.go(URL_INFO_KAIJIANG_X11x5_LIST+"?lotyId=27&jumpType=zixun")
	}else{
	HCCP.FUNC.go(URL_INFO_KAIJIANG_X11x5_LIST+"?lotyId=27")}
}
function toGXK3(){
	if(jumpType == 'zixun'){
		window.parent.HCCP.FUNC.go(URL_INFO_KAIJIANG_GXK3_LIST+"?lotyId=30&jumpType=zixun")
	}else{
	HCCP.FUNC.go(URL_INFO_KAIJIANG_GXK3_LIST+"?lotyId=30")}
}
function toJXK3(){
	if(jumpType == 'zixun'){
		window.parent.HCCP.FUNC.go(URL_INFO_KAIJIANG_GXK3_LIST+"?lotyId=31&jumpType=zixun")
	}else{
	HCCP.FUNC.go(URL_INFO_KAIJIANG_GXK3_LIST+"?lotyId=31")}
}
function toJLK3(){
	if(jumpType == 'zixun'){
		window.parent.HCCP.FUNC.go(URL_INFO_KAIJIANG_GXK3_LIST+"?lotyId=32&jumpType=zixun")
	}else{
	HCCP.FUNC.go(URL_INFO_KAIJIANG_GXK3_LIST+"?lotyId=32")}
}
function toGXKLSF(){if(jumpType == 'zixun'){
		window.parent.HCCP.FUNC.go(URL_INFO_KAIJIANG_GXKLSF_LIST+"?lotyId=41&jumpType=zixun")
	}else{
	HCCP.FUNC.go(URL_INFO_KAIJIANG_GXKLSF_LIST+"?lotyId=41")}
}
function getCcBygameid(gameId) {
	gameId = gameId.toString();
	var dayNames = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
	var gameIdTime = gameId.substr(0, 4) + "/" + gameId.substr(4, 2) + "/" + gameId.substr(6, 2);
	var gameCC = gameId.substr(8);
	var gameCCDate = new Date((new Date(gameIdTime)).getTime());
	return dayNames[gameCCDate.getDay()] + gameCC;
}
//日期，取星期,dateStr是不需要间隔符的
function getWeekByDate(dateStr, type) {
	var dayNames = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
	var dayNamesW = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
	var formatTime = dateStr.substr(0, 4) + "/" + dateStr.substr(4, 2) + "/" + dateStr.substr(6, 2);
	var theCCDate = new Date((new Date(formatTime)).getTime());
	if (type == "xq") {
		return dayNamesW[theCCDate.getDay()];
	}
	return dayNames[theCCDate.getDay()];
}
