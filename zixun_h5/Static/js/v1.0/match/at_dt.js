
var q_index = 0;//表示第几题 开始
var isSuccess = false;//答题是否成功
var has_dt = false;//是否答题过  答过就不能再点击了。
var pageTimer = {} ; //定义计算器全局变量

var swiper = new Swiper('.swiper-container', {
});
$(function(){
	initEvent();
	if(localStorage.at_phone && localStorage.at_phone != "" && localStorage.at_phone.length == 11){//有手机号存在
		layer.open({content: "您已获奖，请返回首页领取奖励",btn: '我知道了',
		yes : function(){
			layer.closeAll();			
			window.history.back();			
		}
		});
		return;
	}	
	if(localStorage.at_isSuccess && localStorage.at_isSuccess == 'false'){//答题到一半 或者 答题错误时  防止刷新界面 无限玩
		$('#p-lose').fadeIn(300);
		return;
	}
	layer.open({type: 2,content: '加载中'});	
	setTimeout(function(){layer.closeAll();},1000)
	getQuestion();
	
})

function initEvent(){
	//挑战失败的关闭
	$('#c-lose').click(function(){
		$('#p-lose').hide()
	})
	//点击复活按钮
	$('#btn-fh').click(function(){
		localStorage.at_isSuccess = 'true';//使 可以重新开始游戏
		$('#p-lose').fadeOut(300);
		window.location.replace("../info/zixun/zixun.html");
	})
	//点击抽奖的关闭
	$('#c-cj').click(function(){
		$('#p-cj').hide()
	})
	//点击抽奖按钮转动
	var has_cj = false;
	$('.cj-c').click(function(){
		if(has_cj){
			return;
		}
		has_cj = true;
		$('.cj-c').addClass('animation')
		setTimeout(function(){
			$('#p-cj').hide()
			$('#p-ss').fadeIn(300)
		},3500)			
	})
	$('#c-ss').click(function(){
		$('#p-ss').fadeOut(200)
	})	
	//点击领取
	$('#btn-lq').click(function(){
		$('#p-ss').fadeOut(200)
		$('#p-lj').fadeIn(200)
	})
	$('#c-lj').click(function(){
		$('#p-lj').fadeOut(200)
	})
	
	//输入手机号点击领取
	$('#btn-lj').click(function(){
		var phonenum = $('.lj-input').val();
		if(phonenum == "" || phonenum == null){
			//提示
		  layer.open({content: '手机号不能为空',skin: 'msg',time: 2});
		  return;
		}
		if(!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(phonenum))){
			layer.open({content: '手机号格式不对',skin: 'msg',time: 2});
		  return;
		}
		var res = HCCP.ajax.post("/iation/league/question/receive",{
			mobile : parseInt(phonenum)
		})
		console.log(JSON.stringify(res))
		if(res && res.code == 200){//领取成功
			$('#dj-code').text(res.data.code);
			$('#wechatid').val(res.data.code);
			localStorage.at_phone = res.data.mobile;
			$('#p-lj').fadeOut(200)
			$('#p-hb').fadeIn(300)
			clipboardEve();
		}else if(res){
			layer.open({content: res.message,btn: '我知道了'});
		}else{
			layer.open({content: '网络出错，请稍后再试',btn: '我知道了'});
		}		
	})
	$('#c-hb').click(function(){
		$('#p-hb').fadeOut(300)
	})	
}
//获取题目
function getQuestion(){
	var res = HCCP.ajax.get("/iation/league/question/question");
	if(res && res.code == 200){//请求成功		
		createHtml(res.data);
//		$('#cdown').show()
//		readyDt();
		pageTimer['timer0'] = setInterval(countDown10,1000)
	}else if(res){//请求不到数据		
		layer.open({content: res.message,btn: '我知道了'});
	}else{		
		layer.open({content: '网络出错，请稍后再试',btn: '我知道了'});
	}	
}
function createHtml(obj){
	var html = ""; 
    for (el in obj) {
    	var data = obj[el];
    	html += "<div class='swiper-slide'><center>";
    	html += "<div class='title-warp'><div class='count'>10</div>";
    	if(data.question.replace(/[^\x00-\xff]/g, 'xx').length < 52){ //小于52字节  		  
    		  html += "<p class='question'>"+data.question+"</p>";
    	}else{
    		  html += "<p class='question' style='font-size:14px'>"+data.question+"</p>";
    	}
    	html += "<div class='za-row'><span>"+(parseInt(el)+1)+"</span>/<span>5</span></div></div>";
    	html += "<div class='select-warp'>";
    	for(i in data.data){
    		var o = data.data[i];
    		html += "<div asw='"+o.isanswer+"' class='select-i'>"+o.answer+"</div>"; 
    		if(o.isanswer == '1'){
    			console.log('正确答案：'+o.answer)
    		}
    	}
    	html += "</div>";
    	html += "</center></div>";    	    	
    }
    $('#sw-question').html(html);
    swiper.update();
    $('.select-warp .select-i').on('click',selectClick);
}
//开启准备答题倒计时
function readyDt(){
	var arr = ['GO!','准备'];
	var len = arr.length-1;
	var countDowngo = function(){
		$('#cdown h1').text(arr[len])
	}
	var timer1 = setInterval(function(){
		if(len >= 0){
			countDowngo();
			len--;
		}else{
			clearInterval(timer1);
			$('#cdown').fadeOut(500)
			pageTimer['timer0'] = setInterval(countDown10,1000)
		}
	},1000)
}
//正在进行答题时的10秒倒计时
var len = 9;
function countDown10(){	
	if(has_dt){clearAllTimer();return;}
	if(len >= 0){
		$('.count').eq(q_index).text(len)
		len--;
	}else if(len == -1){
		len--;
		$('#p-lose').fadeIn(300)
		isSuccess = false;//答题是否成功
		has_dt = true;
		clearAllTimer();
		localStorage.at_isSuccess = 'false';
	}else{
		return;
	}
}
function clearAllTimer(){
	//全部清除方法
	for(var each in pageTimer){
	    clearInterval(pageTimer[each]);
	}
}
//选项点击事件
function selectClick(){
	if(has_dt && !isSuccess){//答过题了。而且答错		
		$('#p-lose').fadeIn(300)
		return;
	}
	if(has_dt){return;}
	has_dt = true;
	var index = $(this).index();
	$('.select-warp').eq(q_index).find('.select-i').attr('class','select-i')
	$(this).addClass('s-dos')
	var asw = $(this).attr('asw')
	setTimeout(function(){					
		$('.select-warp').eq(q_index).find('.select-i').attr('class','select-i')
		if(asw == 1){					
			$('.select-warp').eq(q_index).find('.select-i').eq(index).addClass('s-right')
			has_dt = false;
			isSuccess = true; 
			localStorage.at_isSuccess = 'true';			
			setTimeout(function(){//把其他选项 去掉
				$('.select-warp').eq(q_index).find('.select-i').each(function(el,item){
					if($(this).attr('asw') == '1'){						
					}else if(el == index){						
					}else{
						//$(this).fadeOut(300);
						$(this).addClass('hide-class')
						//$(this).css('visibility','hidden');
					}
				})				
				clearAllTimer();
			},1000)
			setTimeout(function(){
				if(q_index == 4){//答题到了第五题 而且 答对了
					clearAllTimer();
					$('#p-cj').fadeIn(300);
					has_dt = true;//全部答完 不能再点击了
					return;
				}
			},2000)				
			//swiper.slideNext(1500);
			//swiper.slideTo(0, 1500, false);//切换到第一个slide，速度为1秒
			setTimeout(function(){
				++q_index;
				swiper.slideNext(3000);
				len = 9;
				pageTimer['timer'+q_index] = setInterval(countDown10,1000)
			},3500)									
		}else{//答错题目
			isSuccess = false;
			localStorage.at_isSuccess = 'false';
			$('.select-warp').eq(q_index).find('.select-i').eq(index).addClass('s-wrong')
			$('.select-warp').eq(q_index).find('.select-i').each(function(el,item){
				if($('.select-warp').eq(q_index).find('.select-i').eq(el).attr('asw') == '1'){
					$('.select-warp').eq(q_index).find('.select-i').eq(el).addClass('s-right')
				}
			})
			setTimeout(function(){//把其他选项 去掉
				$('.select-warp').eq(q_index).find('.select-i').each(function(el,item){
					if($(this).attr('asw') == '1'){						
					}else if(el == index){						
					}else{
						//$(this).fadeOut(300);
//						$(this).css('visibility','hidden');
						$(this).addClass('hide-class')
					}
					setTimeout(function(){
						$('#p-lose').show()
					},1500)
				})				
				clearAllTimer();
			},1000)
		}					 
	},800)
}


function clipboardEve(){
	var clipboard = new Clipboard('#copy_btn',{
    	text: function(){
    		var targetText = $("#wechatid").val();
            return targetText;
        }
    });
    clipboard.on('success', function(e) {    
        console.info('Action:', e.action);    
        console.info('Text:', e.text);    
        console.info('Trigger:', e.trigger);    
        layer.open({content: '复制成功',skin: 'msg',time: 2});    	    
        e.clearSelection();  	            
    });
}




