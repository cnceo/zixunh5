
$(function(){
	ifGetPrize();
	getTotalPeople();
	initEvent();
})

function initEvent(){
	//点击开始答题
	$('#btn-dt').click(function(e){
		//参与人数加1
		if(sessionStorage.at_addpeople && sessionStorage.at_addpeople != ""){
			addPeople();
		}
		sessionStorage.at_addpeople = "has added people count!";
		window.location.href = "at_dt.html";
	})
	//点击领取红包
	$('#btn-hb').click(function(){
		$('#p-hb').fadeIn(300)
	})
	//点击 规则
	$('.rlue-top').click(function(){
		$('#p-rule').fadeIn(300)
	})			
	//关闭按钮
	$('.close').click(function(){
		$('.za-pormt').fadeOut(300)
	})	
}
//查看答题总人数
function getTotalPeople(){
	var res = HCCP.ajax.get('/iation/league/question/index',{
		method : "2"
	})
	if(res.code == 200){
		$('.match-peple').text("已有"+(parseInt(res.data.basics_number)+parseInt(res.data.real_number))+"人参与答题")
	}
}
//增加参与人数
function addPeople(){
	var res = HCCP.ajax.get('/iation/league/question/index',{
		method : "1"
	})
}
//判断用户是否中奖
function ifGetPrize(){
	var phonenum;
	if(!localStorage.at_phone){
		localStorage.at_phone = "";
	}
	phonenum = localStorage.at_phone;
	if(!localStorage.at_phone && localStorage.at_phone != ""){
		phonenum = parseInt(localStorage.at_phone);
	}//13413333333
	var res = HCCP.ajax.get('/iation/league/question/receivePrize',{
		mobile : phonenum
	})
	if(res.code == 903){//没有中奖
		$('#btn-dt').show()
		$('#btn-hb').hide()
	}else if(res.code == 200){//中奖
		$('#btn-dt').hide()
		$('#btn-hb').show()
		$('.match-hj').show()
		$('#djcode').text(res.data.code)
		$('#wechatid').val(res.data.code)
		clipboardEve();
	}
	//console.log(JSON.stringify(res))	
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


