var success_html = "<img style='height:45px;width:45px;margin-bottom:15px;' src='/Static/images/v1.0/worldcup/cg_icons.png'/></br>";
var all = {
	data : {
		jc_select : null,//竞猜选择  1胜，2平，3负
		ifSaveJc : true,//是否可以提交  竞猜
		hj_id : "",//获奖id	
		hasCode:false,//验证码是否已经发送过
	}
}


$(function(){
	initJCidSession();//初始化 缓存
	initEvent();
	queryGuesseNew();
	//判断 是否 闯关成功
	IfguessSuccess();
//	layer.open({content: '马上登录，开启闯关',btn: '去登录',
//	    yes:function(index){
//	    	alert('yes')
//	    }
//	});
	
	//提示
//  layer.open({
//	    content: 'hello layer'
//	    ,skin: 'msg'
//	    ,time: 2 //2秒后自动关闭
//	});

	//layer.open({content: '请先选择赛果'});
	
//	layer.open({content: success_html+'竞猜成功',skin: 'demo-css',time:3});
})
function initJCidSession(){
	var idArr = localStorage.jcIdList;//记录  竞猜id
	if(idArr){
		return;
	}else{
		localStorage.jcIdList = "";
	}
}
//判断缓存中是否有了 该竞猜id
function ifHaveId(_id){
	var arr = localStorage.jcIdList.split(",");
    var index = $.inArray(_id.toString(),arr);
    if(index!=-1){
    	return true;
    }else{   	
    	localStorage.jcIdList = _id + "," + localStorage.jcIdList;
    	return false;
    }
}

function initEvent(){
	//点击隐藏遮盖层
	$(".za-promet").on("click", function(ev) {
	    var h = $(ev.target);		    
	    if (h.closest(".za-rule-bg").length == 0) {
	        $("#p_rule").fadeOut(300);
	    }
	    if (h.closest(".za-jcrecord-bg").length == 0) {
	        $("#p_jingcai").fadeOut(300);
	    }
	    if (h.closest(".za-huojiang-bg").length == 0) {
	        $("#p_huojiang").fadeOut(300);
	    }
	    if(h.closest(".za-duijiang-bg").length == 0) {
	        $("#p_duijiang").fadeOut(300);
	    }
	    if(h.closest(".za-fuhuo-bg").length == 0) {
	        $("#p_fuhuo").fadeOut(300);
	    }
	    if(h.closest(".success").length == 0) {
	        $("#p_success").fadeOut(300);
	    }
	    if(h.closest(".fail").length == 0) {
	        $("#p_fail").fadeOut(300);
	    }
	    if(h.closest(".cg_fhs").length == 0) {
	        $("#p_fhs").fadeOut(300);
	    }
	    if(h.closest(".cg_cgs").length == 0) {
	        $("#p_cgs").fadeOut(300);
	    }	
	    if(h.closest(".cg_cgf").length == 0) {
	        $("#p_cgf").fadeOut(300);
	    }
	});
	//点击打叉 按钮 透明的 div
	$(".za-close-span").click(function(e){
		$(".za-promet").fadeOut(300);
	})
	$(".za-promet").on("click",'.za-close-span', function(ev) {
		$(".za-promet").fadeOut(300);
	})
	//底部 a标签 “活动规则”
	$("#rule_btn").click(function(){
		$("#p_rule").fadeIn(500)
	})
	//底部 a标签 “竞猜记录”
	$("#jc_btn").click(function(){
		$("#p_jingcai").fadeIn(200)
		setTimeout(function(){
			queryGuesseRecord();
		},200)
	})
	//底部 a标签 “获奖查询”
	$("#hj_btn").click(function(e){
		console.log(e)
		$("#p_huojiang").fadeIn(200)
		setTimeout(function(){
			queryHuoJiang();
		},200)
	})
	//胜平负选择 切换
	$(".za-jc-botton").click(function(){
		$(".za-jc-botton").each(function(){
			$(this).removeClass('green');
			var index = $(this).index();//1胜，2平，3负
			switch (index){
				case 0:
					all.data.jc_select = 1;
					break;
				case 1:
					all.data.jc_select = 2;
					break;
				case 2:
					all.data.jc_select = 3;
					break;
				default:
					all.data.jc_select = 1;
					break;
			}
		})
		$(this).addClass('green');
	})
	//点击 提交竞猜
	$("#g_jcBtn").click(function(){
		if(!USER.ifLogin()){//未登录
//			layer.open({content: '马上登录，开启闯关',btn: '去登录',
//			    yes:function(index){
//			    	layer.closeAll();
//			    	window.location.href = "../user/user_login.html?router=report"+"&url="+encodeURIComponent(window.location.href);
//			    }
//		    });
			//打开登录框
			$("#p_login").fadeIn(200);
		    return;
		}	
		if(!all.data.ifSaveJc){
			return;
		}		
		var gid = $("#g_jcBtn").attr("gid");
		if(!gid){
			layer.open({content:"暂无竞猜，敬请期待",skin: 'msg',time: 2});
			return;
		}
		if(!all.data.jc_select){
			layer.open({content: '请先选择赛果'});
			return;
		}
		var res = HCCP.ajax.post("/iation/worldcup/GuessePost",{
        	"guesse_id":gid,
        	"match_result":all.data.jc_select
        });
	    console.log(JSON.stringify(res))
	    if(res && res.code == 401){
			//跳转登录
			window.location.href = "../user/user_login.html?router=report"+"&url="+encodeURIComponent(window.location.href);
		}else if(res && res.code == 200){
			layer.open({content: success_html+'竞猜成功',skin: 'demo-css',time:2});
			all.data.ifSaveJc = false;
			$("#g_jcBtn").attr("class","jingcaied");
			$("#g_jcBtn").text("已竞猜");
		}else if(res){
			layer.open({content:res.message,skin: 'msg',time: 2});
		}			
	})
	//复活规则的点击确定
	$("#c_queren").click(function(e){
		e.preventDefault();
		e.stopPropagation();
		//获取当前时间戳  
    	var now = Date.parse(new Date());
		window.location.href = "cg_share.html?user=own&uid="+localStorage.uid+"&nowtime="+now+"&uname="+localStorage.username+"&imgUrl="+localStorage.imgUrl;
	})
	//实时监听input框 值得变化
	$("#input_phone").bind("input porpertychange",function(){
		if($("#input_phone").val().length == 11){
			$("#submit-btn").attr("disabled",false);
			$("#submit-btn").css("background","#a722de");
		}else{
			$("#submit-btn").attr("disabled",true);
			$("#submit-btn").css("background","#d5d4d4");
		}
	})
	//点击 继续竞猜
	$("#c_jcbtn").click(function(e){
		e.preventDefault();
		e.stopPropagation();
		$("#p_fhs").fadeOut(300);
	})
	//兑奖提交按钮
	$("#submit-btn").click(function(e){
		e.preventDefault();
		e.stopPropagation();
		//获取 手机号 等信息
		var cname = $("#input_name").val();
		var cphone = $("#input_phone").val();		
		if(!USER.params.checkEmty(cname,'昵称') || !USER.params.checkEmty(cphone,'手机号')){
			return;
		}		
		var res = HCCP.ajax.post("/iation/worldcup/Guesseuserpost",{
        	"id":all.data.hj_id,
        	"lettory_name":cname,
        	"lettory_phone":cphone
        });
	    console.log(JSON.stringify(res))
	    if(res && res.code == 401){
			//跳转登录
			window.location.href = "../user/user_login.html?router=report"+"&url="+encodeURIComponent(window.location.href);
		}else if(res && res.code == 200){
			layer.open({content: success_html+'兑换成功',skin: 'demo-css',time:2});
			$("#p_duijiang").fadeOut(200);
		}else if(res){
			layer.open({content:res.message,skin: 'msg',time: 2});
		}
	})
	//点击立即兑奖
	$("#c_djbtn").click(function(e){
		e.preventDefault();
		e.stopPropagation();
		$("#p_cgs").fadeOut(100);
		$("#p_duijiang").fadeIn(300);
	})
	//点击继续闯关
	$("#c_jxcg").click(function(){
		$("#p_cgf").fadeOut(100);
	})
	//竞猜失败点击分享复活
	$("#c_share").click(function(e){
		e.preventDefault();
		e.stopPropagation();
		//获取当前时间戳  
    	var now = Date.parse(new Date());
		window.location.href = "cg_share.html?user=own&uid="+localStorage.uid+"&nowtime="+now+"&uname="+localStorage.username+"&imgUrl="+localStorage.imgUrl;
	})
	//马上登录中的  关闭按钮
	$(".za-login-close").click(function(e){
		e.preventDefault();
		e.stopPropagation();
		all.data.hasCode = false;
		$("#code-btn").text("获取验证码");
		$("#code-btn").css("color","#fe9536");
		$("#p_login").fadeOut(200);
	})
	//点击获取验证码
	$("#code-btn").click(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(all.data.hasCode){
			return;
		}
		var lg_num = $("#lg_num").val();
		if(USER.params.checkEmty(lg_num,"手机号") && USER.params.checkPhone(lg_num)){
			//调获取验证码 接口
			time(this);
			var agent = navigator.appVersion;
			var res = HCCP.ajax.post("/iation/haocai/login/send?identity="+HCQD.identity()+"&platform="+HCQD.platform()+"&uuid="+$.md5(agent),{
				"mobile":lg_num
			});
			console.log(JSON.stringify(res));
			if(res && res.code == 200){
				layer.open({ content: '验证码已发送',skin: 'msg',time: 3});
				all.data.hasCode = true;
				$("#code-btn").text("已发送");
				$("#code-btn").css("color","#999");				
			}else if(res){//发送失败
				layer.open({ content: res.message,skin: 'msg',time: 3});
			}else{
				layer.open({ content: "网络异常,请稍后再试",skin: 'msg',time: 3});
			}
		}
	})
	
	//点击登录
	$("#login-btn").click(function(e){
		e.preventDefault();
		e.stopPropagation();
		var lg_num = $("#lg_num").val();
		var lg_code = $("#lg_code").val();
		var agent = navigator.appVersion;
		if(USER.params.checkEmty(lg_num,"手机号") && USER.params.checkEmty(lg_code,"验证码")){
			//调登录 接口
			var res = HCCP.ajax.post('/iation/haocai/smsLogin',{"mobile":lg_num,"code":lg_code,"uuid":$.md5(agent)});
			if(res.code == 200){
				layer.open({ content: '登录成功',skin: 'msg',time: 3});
				USER.save(res.data);
				wait = 0;
				$("#p_login").fadeOut(200);
			}else if(res){//登录失败
				layer.open({ content: res.message,skin: 'msg',time: 3});
			}else{
				layer.open({ content: "网络异常，请稍后重试",skin: 'msg',time: 3});
			}
		}
	})
}
//60秒 重新发送
var wait = 60;
//倒计时
function time(o) {
	if(wait == 0) {		
		o.style.color = "#fe9536";
		o.innerText = "重新发送";
		all.data.hasCode = false;
		wait = 60;return;
	} else {
		o.style.color = "#999";
		o.innerText = wait + "S后重发";
		all.data.hasCode = true;
		wait--;
		setTimeout(function() {
				time(o)
			},
			1000)
	}
}
//-------判断用户是否 闯关成功----
function IfguessSuccess(){
	var res = HCCP.ajax.post("/iation/worldcup/isWin",{
		"user_id":localStorage.uid
	})
	console.log(JSON.stringify(res))
	if(res && res.code == 200){
		if(res.data.status == 4){//闯关成功
			if(!ifHaveId(res.data.id)){
				$("#p_cgs").fadeIn(200);
				$("#code-span").text(data.cashing_code);
				$("#djcode").val(data.cashing_code);
			}
			all.data.hj_id = res.data.id
		}else if(res.data.status == 3){//闯关失败
			if(!ifHaveId(res.data.id)){
				$("#p_cgf").fadeIn(200);
			}
			all.data.hj_id = res.data.id
		}				
	}
}
//--------------查询竞猜赛程--------------
function queryGuesseNew(){
	var res = HCCP.ajax.get("/iation/worldcup/GuesseNew");
	console.log(JSON.stringify(res))
	if(res && res.code == 200){		
		createGuesseHtml(res.data);	
	}else if(res){
		layer.open({content:res.message,skin: 'msg',time: 2});
	}
}
function createGuesseHtml(data){
	if(!data){
		all.data.ifSaveJc = false;
		$("#g_jcBtn").attr("class","jingcaied");
		$("#g_jcBtn").html("<marquee direction=left  width=95% scrollamount=5>活动正在筹备中，敬请期待！</marquee>");
		return;
	}	
	if(data.is_over == 1){//活动已截止
		all.data.ifSaveJc = false;
		$("#g_jcBtn").attr("class","jingcaied");
		$("#g_jcBtn").html("<marquee direction=left  width=95% scrollamount=5>本场竞猜已结束，敬请期待下一场竞猜</marquee>");
	}else{
		if(data.have_guesse == 1){//已经竞猜
			all.data.ifSaveJc = false;
			$("#g_jcBtn").attr("class","jingcaied");
			$("#g_jcBtn").text("已竞猜");			
//			user_guesse 比赛结果：0未开始；1球队1赢，2打平；3球队1输；-1无效结果
			var user_guesse = 0;
			switch (data.user_guesse){
				case 1:
					user_guesse = 0;
					break;
				case 2:
					user_guesse = 1;
					break;
				case 3:
					user_guesse = 2;
					break;
				default:
					break;
			}
			$(".za-jc-botton").each(function(){
				$(this).removeClass('green');
			});
			$(".za-jc-botton").eq(user_guesse).addClass('green');			
			//判断 该竞猜 当前用户 是否 竞猜 成功
			switch (data.have_result){
				case 0://未开始 或者 没有竞猜结果		
					break;
				case 1://猜对  展示一次 猜对弹框
					if(!ifHaveId(data.id)){
						$("#p_success").fadeIn(200);
					}					
					break;
				case 2://猜错  展示一次 猜错弹框
					if(!ifHaveId(data.id)){
						$("#p_fail").fadeIn(200);
					}					
					//判断  是否 复活成功 
					var res_fh = HCCP.ajax.post("/iation/worldcup/isReset",{
						"user_id":localStorage.uid
					});
					if(res_fh.code == 200){
						if(!ifHaveId("za2216654")){
							$("#p_fhs").fadeIn(200);
						}
					}
					break;
				default:
					break;
			}
		}			
	}
	$("#g_time").text(parseDate(data.activity_date)+" "+data.match_week);
	$(".c_left img").attr("src",data.left_national_flag);
	$(".c_left p").text(data.left_country_name);
	$(".c_right img").attr("src",data.right_national_flag);
	$(".c_right p").text(data.right_country_name);
	$("#g_mtype").text(data.match_type);
	if(data.type == 1){
		$("#g_mtype").append("("+data.give_num+")");
	}
	$("#g_jcBtn").attr("gid",data.id);
}
function parseDate(dateStr){
	var date = new Date(dateStr*1000);//如果date为10位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes());
    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    return M+D+h+m;
}
//-------------查询竞猜记录-----------------
function queryGuesseRecord(){
	var res = HCCP.ajax.get("/iation/worldcup/GuesseRecord");
	console.log(JSON.stringify(res))
	if(res && res.code == 401){
		//跳转登录
		//window.location.href = "../user/user_login.html?router=report"+"&url="+encodeURIComponent(window.location.href);
		$(".za-promet").hide();
		$("#p_login").fadeIn(200);
	}else if(res && res.code == 200){
		createJCJLHtml(res.data);
	}else if(res){
		layer.open({content:res.message,skin: 'msg',time: 2});
	}
}
function createJCJLHtml(obj){
	var html = "<span class='za-close-span'></span>";
	if(obj.length == 0){//无记录
		html += "<div class='za-no-record'><img src='/Static/images/v1.0/worldcup/cg_norecord.png' />";
		html += "<p>暂无记录</p></div>";
		$(".za-jcrecord-bg").html('').append(html);
		return;
	}
	html += "<div class='za-flex-box'><div class='jc-item'>球队</div><div class='jc-item'>赛果</div><div class='jc-item'>竞猜</div></div>";
	html += "<div class='za-jcrecord-content'>";
	for(var i=0;i<obj.length;i++){
		var data = obj[i];
		html += "<div class='za-jcrecord-list'>";
//		html += "<p><img src='"+data.left_national_flag+"'></p>< p>"+data.left_country_name+"</p>";
		html += "<p>"+data.left_country_name+"</p>";
		html += "<p>VS</p>";
		html += "<p>"+data.right_country_name+"</p>";
		html += "<p>"+data.result+"</p>";
		if(data.status == 1 && data.user_result == "猜错" && data.reset == 0){
			html += '<p>'+data.user_guesse+'<span class="jc-fuhuo-span" onclick=\"goFuhuo($(event)[0]);return false;\">复活</span></p>';
		}else if(data.status == 1 && data.user_result == "猜错" && data.reset == 1){
			html += '<p>'+data.user_guesse+'<span class="jc-fuhuo-span">已复活</span></p>';
		}else if(data.user_result == '猜中'){
			html += "<p style='color:#a722de;'>"+data.user_guesse+"</p>";
		}else{
			html += "<p>"+data.user_guesse+"</p>";
		}
		html += "</div>";		
	}
	html += "</div>";
	$(".za-jcrecord-bg").html('').append(html);
}
function goFuhuo(e){//点击复活
	//e.preventDefault();
//	e.stopPropagation();	
	e = e || window.event;
    if (e.stopPropagation) {       
        e.stopPropagation(); 
    }else{            
        e.cancelBubble = true; 
    }
	$("#p_fuhuo").css("z-index","99")
	$("#p_fuhuo").fadeIn(300);
	$("#p_jingcai").hide();
}
//-------------------获奖查询-----------
function queryHuoJiang(){
	var res = HCCP.ajax.get("/iation/worldcup/GuesseWinuser");
	console.log(JSON.stringify(res))
	if(res && res.code == 401){
		//跳转登录
//		window.location.href = "../user/user_login.html?router=report"+"&url="+encodeURIComponent(window.location.href);
		$(".za-promet").hide();
		$("#p_login").fadeIn(200);
	}else if(res && res.code == 200){
		createHJHtml(res.data);
	}else if(res){
		layer.open({content:res.message,skin: 'msg',time: 2});
	}
}
function createHJHtml(obj){
	var html = "<span class='za-close-span'></span>";
	if(obj.length == 0){//无记录
		html += "<div class='za-no-jiang'><img src='/Static/images/v1.0/worldcup/cg_nojiang.png' />";
		html += "<p>暂无获奖</p></div>";
		$(".za-huojiang-bg").html('').append(html);
		return;
	}
	html += "<div class='za-flex-box'><div class='hj-item'>奖品</div><div class='hj-item'>状态</div></div>";
	html += "<div class='za-jcrecord-content'>";
	for(var i=0;i<obj.length;i++){
		var data = obj[i];
		html += "<div class='za-hjrecord-list'><p>200元现金</p>";
		if(data.is_deal == 1){
			html += "<p>已派奖</p>";
		}else{
			html += "<p><span class='hj-duijiang' onclick=\"goDuijiang($(event)[0],'"+data.id+"','"+data.cashing_code+"');return false;\">兑奖</span></p>";
		}
		html += "</div>";			
	}
	html += "</div>";
	$(".za-huojiang-bg").html('').append(html);
}
function goDuijiang(e,_id,code){//点击兑奖
	console.log(e)
	e = e || window.event;
    if (e.stopPropagation) {       
        e.stopPropagation(); 
    }else{            
        e.cancelBubble = true; 
    } 
	$("#p_huojiang").hide()
	$("#p_duijiang").fadeIn(300);
	all.data.hj_id = _id;
	$("#code-span").text(code);
	$("#djcode").val(code);
}

				
					
					
								
				
					
					
					
				
									
					
						
						
						
						
						
						
												
					
												
				


