var all = {
	data:{
		clickload:{//是否 第一次点击  加载过
			tab1:false,
			tab2:false,
			tab3:false,
			tab4:false
		},
		tabid:"tab1"//当前的 tab
	}
}
var cpage = 1;
var isMore = true;//射手榜分页 用的
sessionStorage.route = 0;

var dateArr1 = ['6月14日','6月15日','6月16日','6月17日','6月18日','6月19日','6月20日','6月21日','6月22日','6月23日','6月24日','6月25日','6月26日','6月27日','6月28日','6月29日'];
var dateArr2 = ['6月30日','7月1日','7月2日','7月3日','7月4日'];
var dateArr3 = ['7月6日','7月7日','7月8日'];
var dateArr4 = ['7月11日','7月12日'];
var dateArr5 = ['7月14日'];
var dateArr6 = ['7月15日'];
$(function(){
	var tabid = sessionStorage.record_tabid;
    if(IFsessionStorage(tabid)){
    	$(".za-colunm-control a").removeClass('za-active');
    	$("[tabid=" + tabid + "]").addClass('za-active');//改变文字样式								
		$(".team_wrap").hide()
        $("."+tabid).show()
        
    	if(tabid == "tab1"){
	    	queryMatchList();
	    }
	    if(tabid == "tab2"){
	    	queryJifenData();
	    }
	    if(tabid == "tab3"){
	    	cpage = 1;
			isMore = true;
			$("#shooter").html('');
	    	querySheshouData();
	    }
    }else{
    	sessionStorage.record_tabid = "tab1";
    	$(".za-colunm-control a").removeClass('za-active');
    	$("[tabid=tab1]").addClass('za-active');//改变文字样式								
		$(".team_wrap").hide()
        $(".tab1").show()
    	queryMatchList();
    }    
	//queryMatchList();
	initEvent();
})
function IFsessionStorage(o){
	if(o == undefined || o == null || o == ""){
		return false;
	}return true;
}
//function test(){
//	var res = HCCP.ajax.get("/iation/worldcup/ShooterList",{
//		"page":2,
//		"num":20
//	})
//	console.log(JSON.stringify(res));
//}	
function initEvent(){
	//栏目菜单点击事件
	$(".za-colunm-control a").click(function(){				
		$(".za-colunm-control a").removeClass('za-active');
		$(this).addClass('za-active');//改变文字样式						
		var tabid = $(this).attr("tabid")	
		$(".team_wrap").hide() 
        $("."+tabid).show()   
        all.data.tabid = tabid;
        sessionStorage.record_tabid = tabid;
        if(tabid == "tab1"){
        	if(all.data.clickload.tab1){//第一次加载过了
        		return;
        	}
        	queryMatchList();
        	all.data.clickload.tab1 = true;
        }
        if(tabid == "tab2"){
        	if(all.data.clickload.tab2){//第一次加载过了
        		return;
        	}
        	queryJifenData();
        	all.data.clickload.tab2 = true;
        }
        if(tabid == "tab3"){
        	if(all.data.clickload.tab3){//第一次加载过了
        		return;
        	}
        	querySheshouData();
        	all.data.clickload.tab3 = true;
        }
	})	
	pullDown(".content_wrap", ".content_inner", '', 2.5, function(e) { //绑定下拉刷新事件 		
	    var tabid = all.data.tabid;
	    if(tabid == "tab1"){
        	queryMatchList();
        }
	    if(tabid == "tab2"){
        	queryJifenData();
        }
        if(tabid == "tab3"){
        	cpage = 1;
			isMore = true;
			$("#shooter").html('');
        	querySheshouData();
        }
	    this.back(1);
	    return;
    })
	$(".content_inner").on('scroll', scroll_);
	$("body").on('click', '.tab4 .match_item', goDetail);//32强阅兵跳转详情
}
//跳去详情
function goDetail() {
    var that = $(this)
    var country_name = HCCP.FUNC.trim(that.find('.country_name').text())
    sessionStorage.route = 2;
    // return
    var jump = {
        url: REMOTE_DATA_URL + '/iation/articledetail/' + encodeURIComponent(country_name) +"?platform=3&iationType=haocai"
    }
    // localStorage.setItem("jumpZixunDetail", JSON.stringify(jump));
    // HCCP.FUNC.go(URL_ZIXUN_DETAIL);
    HCCP.FUNC.go(URL_ZIXUN_DETAIL+"?jump="+encodeURIComponent(jump.url));
}
//上拉滚动到底部加载滚动事件
function scroll_() {	
	var nScrollHight = 0; // 滚动距离总长(注意不是滚动条的长度)
	var nScrollTop = 0; // 滚动到的当前位置
	//document.getElementsByClassName("content-warp")[0].style.height = window.innerHeight-44 + "px";
	var nDivHight = $(".content_inner").height();	
	nScrollHight = $(this)[0].scrollHeight;
	nScrollTop = $(this)[0].scrollTop;
	if(nScrollTop + nDivHight >= nScrollHight-1){
		console.log('is botom')
		var tabid = all.data.tabid;
        if(tabid == "tab3"){
			if(isMore){
				querySheshouData();
			}       	
        }
	}			
}
//查询赛事 赛果
function queryMatchList(){	
	var res = HCCP.ajax.get("/iation/worldcup/matchList",{
		"type" : 0
	})	
	console.log(JSON.stringify(res));
	if(res && res.code == 200){
		$(".tab1").empty();
		$(".za-pull-left").text("更新于"+getUpdateDate(res.data.update));
		createMatchHtml(res.data.list);
	}else if(res){
		layer.open({content:res.message,skin:'msg',time:3})
	}
}
function createMatchHtml(obj){
	var html = "";
	html += "<div class='item_header'><div class='item_bg'></div>";
	html += "<div class='item_title'>小组赛</div></div>";                    
	var obj1 = new Array();//小组赛
	var obj2 = new Array();//1/8决赛
	var obj3 = new Array();//1/4决赛
	var obj4 = new Array();//半决赛
	var obj5 = new Array();//3/4决赛
	var obj6 = new Array();//总决赛
	for(var i = 0 ; i < obj.length;i++){
		var data = obj[i];
		if(data.match_stage == 1){
			obj1.push(data);
		}
		if(data.match_stage == 2){
			obj2.push(data);
		}
		if(data.match_stage == 3){
			obj3.push(data);
		}
		if(data.match_stage == 4){
			obj4.push(data);
		}
		if(data.match_stage == 5){
			obj5.push(data);
		}
		if(data.match_stage == 6){
			obj6.push(data);
		}
	}	
	if(obj1.length){ //小组赛      
		for(var j1 = 0 ; j1 < dateArr1.length; j1++){			
			var dateStr = dateArr1[j1];	
			html += "<div class='data_match'>";
			html += "<div class='date_title'>"+dateStr+"</div>";
			for(var k1 = 0 ;k1 < obj1.length;k1++){
				var data = obj1[k1];
				if(getDate(data.match_date) == dateStr){
					html += "<div class='item_main2'><div class='match_wrap hc-cf'><span class='group_'><span class='group'>"+data.match_group+"</span><span class='zu'>组</span></span>";
					html += "<span class='time'>"+getTime(data.match_date)+"</span>";
					html += "<span class='hostimg_wrap'><span class='hostFlag'><img src='"+data.left_national_flag+"'/></span></span>";
					html += "<span class='hostName hc-size-10'>"+data.left_country_name+"</span>";
					if(data.left_score == ""){
						html += "<span class='vs'>VS</span>";
					}else{
						html += "<span class='vs'>"+data.left_score+':'+data.right_score+"</span>";
					}					
					html += "<span class='guestName hc-size-10'>"+data.right_country_name+"</span>";
					html += "<span class='guestimg_wrap'><span class='guestFlag'><img src='"+data.right_national_flag+"' /></span></span>";
					html += "</div></div>";
				}
			}
			html += "</div>";
		}
	}
	html += "<div class='item_header item_header_'><div class='item_bg item_bg_'></div><div class='item_title'>淘汰赛</div></div>"; 
	html += "<div class='out_wrap'><p class='out_wrap_title'>1/8决赛(16强)</p>";
	if(obj2.length){//1/8决赛
		for(var j2 = 0 ; j2 < obj2.length; j2++){			
			var data = obj2[j2];
			html += "<div class='out_match'><div class='out_title'>"+getDate(data.match_date)+"</div>";
			html += "<div class='item_main3'><div class='match_wrap hc-cf'><span class='time'>"+getTime(data.match_date)+"</span>";
			html += "<span class='hostimg_wrap'><span class='hostFlag'><img src='"+data.left_national_flag+"' /></span></span>";
			html += "<span class='hostName hc-size-10'>"+data.left_country_name+"</span>";
			if(data.left_score == ""){
				html += "<span class='vs'>VS</span>";
			}else{
				html += "<span class='vs'>"+data.left_score+':'+data.right_score+"</span>";
			}
			html += "<span class='guestName hc-size-10'>"+data.right_country_name+"</span>";
			html += "<span class='guestimg_wrap'><span class='guestFlag'><img src='"+data.right_national_flag+"' /></span></span>";
			html += "</div></div></div>";
		}
	}
	html += "</div>";
	html += "<div class='out_wrap'><p class='out_wrap_title'>1/4决赛(8强)</p>";
	if(obj3.length){// 1/4决赛
		for(var j3 = 0 ; j3 < obj3.length; j3++){			
			var data = obj3[j3];
			html += "<div class='out_match'><div class='out_title'>"+getDate(data.match_date)+"</div>";
			html += "<div class='item_main3'><div class='match_wrap hc-cf'><span class='time'>"+getTime(data.match_date)+"</span>";
			html += "<span class='hostimg_wrap'><span class='hostFlag'><img src='"+data.left_national_flag+"' /></span></span>";
			html += "<span class='hostName hc-size-10'>"+data.left_country_name+"</span>";
			if(data.left_score == ""){
				html += "<span class='vs'>VS</span>";
			}else{
				html += "<span class='vs'>"+data.left_score+':'+data.right_score+"</span>";
			}
			html += "<span class='guestName hc-size-10'>"+data.right_country_name+"</span>";
			html += "<span class='guestimg_wrap'><span class='guestFlag'><img src='"+data.right_national_flag+"' /></span></span>";
			html += "</div></div></div>";
		}
	}
	html += "</div>";
	html += "<div class='out_wrap'><p class='out_wrap_title'>半决赛(4强)</p>";
	if(obj4.length){// 半决赛
		for(var j4 = 0 ; j4 < obj4.length; j4++){			
			var data = obj4[j4];
			html += "<div class='out_match'><div class='out_title'>"+getDate(data.match_date)+"</div>";
			html += "<div class='item_main3'><div class='match_wrap hc-cf'><span class='time'>"+getTime(data.match_date)+"</span>";
			html += "<span class='hostimg_wrap'><span class='hostFlag'><img src='"+data.left_national_flag+"' /></span></span>";
			html += "<span class='hostName hc-size-10'>"+data.left_country_name+"</span>";
			if(data.left_score == ""){
				html += "<span class='vs'>VS</span>";
			}else{
				html += "<span class='vs'>"+data.left_score+':'+data.right_score+"</span>";
			}
			html += "<span class='guestName hc-size-10'>"+data.right_country_name+"</span>";
			html += "<span class='guestimg_wrap'><span class='guestFlag'><img src='"+data.right_national_flag+"' /></span></span>";
			html += "</div></div></div>";
		}
	}
	html += "</div>";
	html += "<div class='out_wrap'><p class='out_wrap_title'>3/4决赛</p>";
	if(obj5.length){// 3/4决赛
		for(var j5 = 0 ; j5 < obj5.length; j5++){			
			var data = obj5[j5];
			html += "<div class='out_match'><div class='out_title'>"+getDate(data.match_date)+"</div>";
			html += "<div class='item_main3'><div class='match_wrap hc-cf'><span class='time'>"+getTime(data.match_date)+"</span>";
			html += "<span class='hostimg_wrap'><span class='hostFlag'><img src='"+data.left_national_flag+"' /></span></span>";
			html += "<span class='hostName hc-size-10'>"+data.left_country_name+"</span>";
			if(data.left_score == ""){
				html += "<span class='vs'>VS</span>";
			}else{
				html += "<span class='vs'>"+data.left_score+':'+data.right_score+"</span>";
			}
			html += "<span class='guestName hc-size-10'>"+data.right_country_name+"</span>";
			html += "<span class='guestimg_wrap'><span class='guestFlag'><img src='"+data.right_national_flag+"' /></span></span>";
			html += "</div></div></div>";
		}
	}
	html += "</div>";
	html += "<div class='out_wrap'><p class='out_wrap_title'>决赛</p>";
	if(obj6.length){// 决赛
		for(var j6 = 0 ; j6 < obj6.length; j6++){			
			var data = obj6[j6];
			html += "<div class='out_match'><div class='out_title'>"+getDate(data.match_date)+"</div>";
			html += "<div class='item_main3'><div class='match_wrap hc-cf'><span class='time'>"+getTime(data.match_date)+"</span>";
			html += "<span class='hostimg_wrap'><span class='hostFlag'><img src='"+data.left_national_flag+"' /></span></span>";
			html += "<span class='hostName hc-size-10'>"+data.left_country_name+"</span>";
			if(data.left_score == ""){
				html += "<span class='vs'>VS</span>";
			}else{
				html += "<span class='vs'>"+data.left_score+':'+data.right_score+"</span>";
			}
			html += "<span class='guestName hc-size-10'>"+data.right_country_name+"</span>";
			html += "<span class='guestimg_wrap'><span class='guestFlag'><img src='"+data.right_national_flag+"' /></span></span>";
			html += "</div></div></div>";
		}
	}
	html += "</div>";
	$(".tab1").append(html);		
}
//页面滚动
window.onload = function(){
	setTimeout(function(){		
		var timeStream = new Date().getTime();
		var datenow = getDate(timeStream);
		console.log("datenow:"+datenow)
//		datenow = "6月22日";
		if(datenow >= "6月29日"){
			$(".tab1 .out_title").each(function(){
				var dtext = $.trim(iGetInnerText($(this).text()));
				//console.log(dtext)
				if(datenow == dtext){			
					$('.content_inner').animate({
			            scrollTop: $(this).offset().top -$('.content_inner').offset().top
			        }, 500);
				}
			})
		}else{
			$(".tab1 .date_title").each(function(){
				var dtext = $.trim(iGetInnerText($(this).text()));
//				console.log(dtext)
				if(datenow == dtext){			
					$('.content_inner').animate({
			            scrollTop: $(this).offset().top -$('.content_inner').offset().top
			        }, 500);
				}
			})
		}		
	},1000)			
}
function iGetInnerText(testStr) {
    var resultStr = testStr.replace(/\ +/g, ""); //去掉空格
    resultStr = testStr.replace(/[ ]/g, "");    //去掉空格
    resultStr = testStr.replace(/[\r\n]/g, ""); //去掉回车换
    return resultStr;
}
function getDate(dateStr){//返回日期
	var date;
	if(dateStr.toString().length == 13){
		date = new Date(dateStr);
	}else{
		date = new Date(dateStr*1000);//如果date为10位不需要乘1000
	}	
    var Y = date.getFullYear() + '-';
    //var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
    var M = date.getMonth()+1+ '月';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '日';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    return M+D;
}
function getUpdateDate(dateStr){//返回更新时间
	var date = new Date(dateStr*1000);//如果date为10位不需要乘1000
    var Y = date.getFullYear() + '-';
    //var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
    var M = date.getMonth()+1+'-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())+' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes());
    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    return M+D+h+m;
}
function getTime(dateStr){//返回时间
	var date = new Date(dateStr*1000);//如果date为10位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '日';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes());
    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    return h+m;
}
//查询 积分榜
function queryJifenData(){
	var res = HCCP.ajax.get("/iation/worldcup/ScoreboardList",{
		"group":0
	})
	console.log(JSON.stringify(res));
	if(res && res.code == 200){
		$(".tab2").empty();
		$(".za-pull-left").text("更新于"+getUpdateDate(res.data.update));
		createJifenHtml(res.data.list);
	}else if(res){
		layer.open({content:res.message,skin:'msg',time:3})
	}
}
function createJifenHtml(obj){
	var html = "";
	html += "<div class='item_header' style='margin: 0;'><div class='item_bg'></div>";
	html += "<div class='item_title'>积分榜</div></div>";
	var jifenA = new Array();//A
	var jifenB = new Array();//B
	var jifenC = new Array();//C
	var jifenD = new Array();//D
	var jifenE = new Array();//E
	var jifenF = new Array();//F
	var jifenG = new Array();//G
	var jifenH = new Array();//H
	for(var i = 0 ; i < obj.length;i++){
		var data = obj[i];
		if(data.match_group == "A"){
			jifenA.push(data);
		}
		if(data.match_group == "B"){
			jifenB.push(data);
		}
		if(data.match_group == "C"){
			jifenC.push(data);
		}
		if(data.match_group == "D"){
			jifenD.push(data);
		}
		if(data.match_group == "E"){
			jifenE.push(data);
		}
		if(data.match_group == "F"){
			jifenF.push(data);
		}
		if(data.match_group == "G"){
			jifenG.push(data);
		}
		if(data.match_group == "H"){
			jifenH.push(data);
		}
	}
	html += "<div class='item_main2 hc-cf' style='padding: 0;'>";
	if(jifenA.length){
		html += "<div class='za-jifen-head'><span class='group'>A</span><span class='zu'>组</span></div>";			  				  
		html += "<div class='za-jifen-group'><div class='za-jifen-warp'>";
		html += '<table class="za-table" frame="box" border="0" cellpadding="0" cellspacing="0">';
		html += "<thead><tr><th>排名</th><th>球队</th><th>场次</th><th>胜/平/负</th><th>进/失</th><th>净胜球</th>	<th>积分</th></tr></thead>";
		html += "<tbody id='jifen_A'>";
		for(var j1=0;j1<jifenA.length;j1++){
			var data = jifenA[j1];			
			html += "<tr><td>"+parseInt(j1+1)+"</td>";
			html += "<td><img src='"+data.national_flag+"'/>"+data.country_name+"</td>";
			html += "<td>"+data.field+"</td>";
			html += "<td>"+data.win+'/'+data.flat+'/'+data.loss+"</td>";
			html += "<td>"+data.goal+'/'+data.lose+"</td>";
			html += "<td>"+data.net_victory+"</td><td>"+data.integral+"</td></tr>";                  	
		}
		html += "</tbody></table></div></div>";
	}
	if(jifenB.length){
		html += "<div class='za-jifen-head'><span class='group'>B</span><span class='zu'>组</span></div>";			  				  
		html += "<div class='za-jifen-group'><div class='za-jifen-warp'>";
		html += '<table class="za-table" frame="box" border="0" cellpadding="0" cellspacing="0">';
		html += "<thead><tr><th>排名</th><th>球队</th><th>场次</th><th>胜/平/负</th><th>进/失</th><th>净胜球</th>	<th>积分</th></tr></thead>";
		html += "<tbody id='jifen_B'>";
		for(var j2=0;j2<jifenB.length;j2++){
			var data = jifenB[j2];   										      		    
			html += "<tr><td>"+parseInt(j2+1)+"</td>";
			html += "<td><img src='"+data.national_flag+"'/>"+data.country_name+"</td>";
			html += "<td>"+data.field+"</td>";
			html += "<td>"+data.win+'/'+data.flat+'/'+data.loss+"</td>";
			html += "<td>"+data.goal+'/'+data.lose+"</td>";
			html += "<td>"+data.net_victory+"</td><td>"+data.integral+"</td></tr>";                  	
		}
		html += "</tbody></table></div></div>";
	}
	if(jifenC.length){
		html += "<div class='za-jifen-head'><span class='group'>C</span><span class='zu'>组</span></div>";			  				  
		html += "<div class='za-jifen-group'><div class='za-jifen-warp'>";
		html += '<table class="za-table" frame="box" border="0" cellpadding="0" cellspacing="0">';
		html += "<thead><tr><th>排名</th><th>球队</th><th>场次</th><th>胜/平/负</th><th>进/失</th><th>净胜球</th>	<th>积分</th></tr></thead>";
		html += "<tbody id='jifen_C'>";
		for(var j3=0;j3<jifenC.length;j3++){
			var data = jifenC[j3];   										      		    
			html += "<tr><td>"+parseInt(j3+1)+"</td>";
			html += "<td><img src='"+data.national_flag+"'/>"+data.country_name+"</td>";
			html += "<td>"+data.field+"</td>";
			html += "<td>"+data.win+'/'+data.flat+'/'+data.loss+"</td>";
			html += "<td>"+data.goal+'/'+data.lose+"</td>";
			html += "<td>"+data.net_victory+"</td><td>"+data.integral+"</td></tr>";                  	
		}
		html += "</tbody></table></div></div>";
	}
	if(jifenD.length){
		html += "<div class='za-jifen-head'><span class='group'>D</span><span class='zu'>组</span></div>";			  				  
		html += "<div class='za-jifen-group'><div class='za-jifen-warp'>";
		html += '<table class="za-table" frame="box" border="0" cellpadding="0" cellspacing="0">';
		html += "<thead><tr><th>排名</th><th>球队</th><th>场次</th><th>胜/平/负</th><th>进/失</th><th>净胜球</th>	<th>积分</th></tr></thead>";
		html += "<tbody id='jifen_D'>";
		for(var j4=0;j4<jifenD.length;j4++){
			var data = jifenD[j4];   										      		    
			html += "<tr><td>"+parseInt(j4+1)+"</td>";
			html += "<td><img src='"+data.national_flag+"'/>"+data.country_name+"</td>";
			html += "<td>"+data.field+"</td>";
			html += "<td>"+data.win+'/'+data.flat+'/'+data.loss+"</td>";
			html += "<td>"+data.goal+'/'+data.lose+"</td>";
			html += "<td>"+data.net_victory+"</td><td>"+data.integral+"</td></tr>";                  	
		}
		html += "</tbody></table></div></div>";
	}
	if(jifenE.length){
		html += "<div class='za-jifen-head'><span class='group'>E</span><span class='zu'>组</span></div>";			  				  
		html += "<div class='za-jifen-group'><div class='za-jifen-warp'>";
		html += '<table class="za-table" frame="box" border="0" cellpadding="0" cellspacing="0">';
		html += "<thead><tr><th>排名</th><th>球队</th><th>场次</th><th>胜/平/负</th><th>进/失</th><th>净胜球</th>	<th>积分</th></tr></thead>";
		html += "<tbody id='jifen_E'>";
		for(var j5=0;j5<jifenE.length;j5++){
			var data = jifenE[j5];   										      		    
			html += "<tr><td>"+parseInt(j5+1)+"</td>";
			html += "<td><img src='"+data.national_flag+"'/>"+data.country_name+"</td>";
			html += "<td>"+data.field+"</td>";
			html += "<td>"+data.win+'/'+data.flat+'/'+data.loss+"</td>";
			html += "<td>"+data.goal+'/'+data.lose+"</td>";
			html += "<td>"+data.net_victory+"</td><td>"+data.integral+"</td></tr>";                  	
		}
		html += "</tbody></table></div></div>";
	}
	if(jifenF.length){
		html += "<div class='za-jifen-head'><span class='group'>F</span><span class='zu'>组</span></div>";			  				  
		html += "<div class='za-jifen-group'><div class='za-jifen-warp'>";
		html += '<table class="za-table" frame="box" border="0" cellpadding="0" cellspacing="0">';
		html += "<thead><tr><th>排名</th><th>球队</th><th>场次</th><th>胜/平/负</th><th>进/失</th><th>净胜球</th>	<th>积分</th></tr></thead>";
		html += "<tbody id='jifen_F'>";
		for(var j6=0;j6<jifenF.length;j6++){
			var data = jifenF[j6];   										      		    
			html += "<tr><td>"+parseInt(j6+1)+"</td>";
			html += "<td><img src='"+data.national_flag+"'/>"+data.country_name+"</td>";
			html += "<td>"+data.field+"</td>";
			html += "<td>"+data.win+'/'+data.flat+'/'+data.loss+"</td>";
			html += "<td>"+data.goal+'/'+data.lose+"</td>";
			html += "<td>"+data.net_victory+"</td><td>"+data.integral+"</td></tr>";                  	
		}
		html += "</tbody></table></div></div>";
	}
	if(jifenG.length){
		html += "<div class='za-jifen-head'><span class='group'>G</span><span class='zu'>组</span></div>";			  				  
		html += "<div class='za-jifen-group'><div class='za-jifen-warp'>";
		html += '<table class="za-table" frame="box" border="0" cellpadding="0" cellspacing="0">';
		html += "<thead><tr><th>排名</th><th>球队</th><th>场次</th><th>胜/平/负</th><th>进/失</th><th>净胜球</th>	<th>积分</th></tr></thead>";
		html += "<tbody id='jifen_G'>";
		for(var j7=0;j7<jifenG.length;j7++){
			var data = jifenG[j7];   										      		    
			html += "<tr><td>"+parseInt(j7+1)+"</td>";
			html += "<td><img src='"+data.national_flag+"'/>"+data.country_name+"</td>";
			html += "<td>"+data.field+"</td>";
			html += "<td>"+data.win+'/'+data.flat+'/'+data.loss+"</td>";
			html += "<td>"+data.goal+'/'+data.lose+"</td>";
			html += "<td>"+data.net_victory+"</td><td>"+data.integral+"</td></tr>";                  	
		}
		html += "</tbody></table></div></div>";
	}
	if(jifenH.length){
		html += "<div class='za-jifen-head'><span class='group'>H</span><span class='zu'>组</span></div>";			  				  
		html += "<div class='za-jifen-group'><div class='za-jifen-warp'>";
		html += '<table class="za-table" frame="box" border="0" cellpadding="0" cellspacing="0">';
		html += "<thead><tr><th>排名</th><th>球队</th><th>场次</th><th>胜/平/负</th><th>进/失</th><th>净胜球</th>	<th>积分</th></tr></thead>";
		html += "<tbody id='jifen_H'>";
		for(var j8=0;j8<jifenH.length;j8++){
			var data = jifenH[j8];   										      		    
			html += "<tr><td>"+parseInt(j8+1)+"</td>";
			html += "<td><img src='"+data.national_flag+"'/>"+data.country_name+"</td>";
			html += "<td>"+data.field+"</td>";
			html += "<td>"+data.win+'/'+data.flat+'/'+data.loss+"</td>";
			html += "<td>"+data.goal+'/'+data.lose+"</td>";
			html += "<td>"+data.net_victory+"</td><td>"+data.integral+"</td></tr>";                  	
		}
		html += "</tbody></table></div></div>";
	}
	html += "</div>";
	$(".tab2").append(html)
}
//射手榜
function querySheshouData(){
	var res = HCCP.ajax.get("/iation/worldcup/ShooterList",{
		"page":cpage,
		"num":20
	})
	console.log(JSON.stringify(res));
	if(res && res.code == 200){
		if(res && cpage == 1 && res.data.length == 0){
			//第一次 加载 没数据
			isMore = false;
			return;
		}
		if(res && cpage > 1 && res.data.length == 0){
			//分页 无数据
			isMore = false;
			layer.open({content:'暂无更多数据',skin:'msg',time:3})
			return;
		}
		if(res && cpage > 1 && res.data.length < 20){
			//查到了 最后一页
			isMore = false;
			$(".za-pull-left").text("更新于"+getUpdateDate(res.data.update));
			createSheshouHtml(res.data.list);
			return;
		}
		$(".za-pull-left").text("更新于"+getUpdateDate(res.data.update));
		createSheshouHtml(res.data.list);
		cpage++;
	}else if(res){
		layer.open({content:res.message,skin:'msg',time:3})
	}
}
function createSheshouHtml(obj){
	var html = "";
	for(var i=0;i<obj.length;i++){
		var data = obj[i];  										      									      	    
//	    html += "<tr><td>"+parseInt(i+1)+"</td>";
	    html += "<tr><td>"+parseInt((cpage - 1)*20 + i+1)+"</td>";
	    var avatar = data.avatar == ""?USER.img.default_head_pl:data.avatar;
	    html += "<td class='mui-ellipsis'><img style='height: 0.32rem;width: 0.32rem;border-radius: 50%;margin-right: 0.03rem;' src='"+avatar+"' />"+data.user_name+"</td>";
	    html += "<td>"+data.country_name+"</td>";
	    html += "<td>"+data.goal+"</td>";
	    html += "<td>"+data.assists+"</td>";
	    html += "<td>"+data.penalty_kick+"</td></tr>";
	}
	$("#shooter").append(html)
}






