var u_sex = 0;
var u_province="",u_city="",u_birthday = "";
var _userObj = {};//初始化 用户对象  用于 比较 某些属性是否修改
var operation = {//用户操作
	ifModify : false,// 是否修改了
	ifClickSave : false//是否点击了保存
};
//初始化 选择器插件
(function($, doc) {
	$.init();
	$.ready(function() {
		/**
		 * 获取对象属性的值
		 * 主要用于过滤三级联动中，可能出现的最低级的数据不存在的情况，实际开发中需要注意这一点；
		 * @param {Object} obj 对象
		 * @param {String} param 属性名
		 */
		var _getParam = function(obj, param) {
			return obj[param] || '';
		};
		//普通示例
		var userPicker = new $.PopPicker();
		userPicker.setData([{
			value:1,
			text: '男'
		}, {
			value: 2,
			text: '女'
		}]);
		var showUserPickerButton = doc.getElementById('sex-btn');
		showUserPickerButton.addEventListener('tap', function(event) {
			userPicker.show(function(items) {				
				doc.getElementById('sex').value = items[0].text
				u_sex = items[0].value;
			});
		}, false);
		
		var usero = getUserInfo();//获取用户信息	
		//级联示例
		var cityPicker = new $.PopPicker({
			layer: 2
		});
		cityPicker.setData(cityData);
		if(usero){
			cityPicker.pickers[0].setSelectedValue(usero.province_id, 0,function(){
				setTimeout(function() {
					cityPicker.pickers[1].setSelectedValue(usero.city_id);
				},100);				
			});			
		}
		var showCityPickerButton = doc.getElementById('city-btn');
		var city = doc.getElementById('city');
		showCityPickerButton.addEventListener('tap', function(event) {
			cityPicker.show(function(items) {
				city.value = items[0].text + items[1].text;
				u_province = items[0].value;
				u_city = items[1].value;
			});
		}, false);
		
		//日期插件
		var btn = doc.getElementById('birthday-btn');
		var birthday = doc.getElementById('birthday');
		btn.addEventListener('tap', function() {
			var _self = this;
			if(_self.picker) {
				_self.picker.setSelectedValue(USER.params.reDate(usero.birthday))
				if(usero.birthday == "-" || usero.birthday.length < 4){
					_self.picker.setSelectedValue("1980-01-01")
				}
				_self.picker.show(function (rs) {
					birthday.value = rs.text;
					_self.picker.dispose();
					_self.picker = null;
				});
			} else {
				var optionsJson = this.getAttribute('data-options') || '{}';
				var options = JSON.parse(optionsJson);
				var id = this.getAttribute('id');
				_self.picker = new $.DtPicker(options);
				_self.picker.setSelectedValue(USER.params.reDate(usero.birthday))
				if(usero.birthday == "-" || usero.birthday.length < 4){
					_self.picker.setSelectedValue("1980-01-01")
				}
				_self.picker.show(function(rs) {
					birthday.value = rs.text;
					_self.picker.dispose();
					_self.picker = null;
				});
			}						
		}, false);
		
	});
})(mui, document);

$(function(){
	initEvent();
})
function initEvent(){
	//选择图片 上传
	$("#avatar").change(function(){
		var formData = new FormData( );
		var fileobj = $("#uploadForm")[0][0].files[0];
		var filename = fileobj.name;
		var filesize = fileobj.size / (1024*1024);
		var filetype = filename.split('.')[1];
		if(filetype != "jpg" && filetype != "jpeg" && filetype != "png" && filetype != "gif"){
			layer.open({ content: '文件格式不对，请选择图片上传',skin: 'msg',time: 3});return;
		}
		if(filesize > 2){
			layer.open({ content: '请选择小于2M的图片上传',skin: 'msg',time: 3});return;
		}		
		formData.append("avatar" , fileobj);
		$.ajax({
	          url:REMOTE_DATA_URL+"/iation/haocai/uploadAvatar",
	          type:"POST",
	          data:formData,
	          async:false,
	          xhrFields: {
					withCredentials: true
				},
			  crossDomain: true,
	          cache:false,
	          contentType:false,
	          processData:false,
	          success:function(res){
	            console.log(JSON.stringify(res));
	            //图片上传成功后  重新设置 localstorage
	            layer.open({ content: '头像上传成功',skin: 'msg',time: 2});
	            localStorage.setItem("userImgUrl",res.data.path)
	            $("#userimg").attr("src",localStorage.getItem("userImgUrl"))
	          },
	          error:function(res){
	            console.log(JSON.stringify(res));
	            layer.open({ content: res.message,skin: 'msg',time: 3});
	          }
	    });
	})
	//点击完成
	$("#finishbtn").click(function(){		
	    operation.ifClickSave = true;//点击了保存 按钮
	    saveUser();
	})
	$("#finishbtn").on("touchstart",function(){
		$(this).css("background","#e76666");
	})
	$("#finishbtn").on("touchend",function(){
		$(this).css("background","#FD8237 ");
	})
	//返回点击
	$("#goback").click(function(e){
		e.preventDefault();	
		checkIfMod();
		if(operation.ifModify == true && operation.ifClickSave == false){//进行了修改 但是没点击 保存
			//询问框
			$("#isSave").show(); 		
	}else{
			setTimeout(function(){
				window.history.go(-1);
			},100)			
		}
	})
	//取消
	$(".saveNo").click(function(e){
		$("#isSave").hide();
		window.location.href = USER.hrefUrl.index;
	})
	//确定
	$(".saveYes").click(function(e){
		$("#isSave").hide();
		saveUser();
	})
}
//校验用户 是否进行修改 操作
function checkIfMod(){
	_userObj.sex = USER.params.sex(_userObj.sex);
	var dataObj = {
		"uid":localStorage.getItem("uid"),
		"nickname":$("#nickname").val(),					
		"avatar":localStorage.getItem("userImgUrl"),
		"cityName":$("#city").val(),
		"sex":$("#sex").val(),
		"birthday":$("#birthday").val()			
	}
    $.each(dataObj,function(key,val){
    	console.log(key+" :"+val)
    	if(key != "uid" &&_userObj[key] == val){
    		operation.ifModify = false;
    	}else if(key != "uid"){
    		operation.ifModify = true;//进行了修改操作
    		return false;
    	}
    })
}
//保存 用户信息
function saveUser(){
	var dataObj = {
		"uid":localStorage.getItem("uid"),
		"nickname":$("#nickname").val(),					
		"avatar":localStorage.getItem("userImgUrl"),
		"province":u_province,//省份id
		"city":u_city,//城市id
		"sex":u_sex,
		"birthday":$("#birthday").val()				
	}
    $.each(dataObj,function(key,val){
    	console.log(key+" :"+val)
    	if(key != "uid" &&_userObj[key] == val){
    		delete dataObj[key];
    	}else{
    		operation.ifModify = true;//进行了修改操作
    	}
    })
    console.log(JSON.stringify(dataObj))
    var res = HCCP.ajax.post('/iation/haocai/resetPersonal',dataObj);
	console.log(JSON.stringify(res));
	if(res && res.code == 200){
		$("#commetSuccess  p").html("设置成功!")
		$("#commetSuccess").show();
		setTimeout(function() {
			$("#commetSuccess").hide();
			// 然后跳转 index 页面
			window.location.href = USER.hrefUrl.index;
		}, 1500)
		
	}else if(res){//
		$("#commetSuccess  p").html(res.messagge)
		$("#commetSuccess").show();
		setTimeout(function() {
			$("#commetSuccess").hide();
		}, 1500)
		operation.ifClickSave = false;
	}else{
		$("#commetSuccess  p").html("网络异常,请稍后再试")
		$("#commetSuccess").show();
		setTimeout(function() {
			$("#commetSuccess").hide();
		}, 1500)
	}
}
//
//获取用户信息
function getUserInfo(){
	var res = HCCP.ajax.get('/iation/haocai/userInfo');
	if(res && res.code == 200){
		//填充界面 
		initPage(res.data);
		return res.data;
	}else if(res && res.code == 401){
		//登录已经失效  跳转登录界面
		window.location.href = USER.hrefUrl.login + "?router=info";
		return null;
	}
}
//初始化界面
function initPage(userObj){
	_userObj = userObj;
	localStorage.setItem("uid",userObj.uid);
	if(userObj.avatar != null && userObj.avatar != ""){
		$("#userimg").attr("src",userObj.avatar);
	}
	$("#nickname").val(userObj.nickname);
	u_sex = userObj.sex;
	$("#sex").val(USER.params.sex(userObj.sex));
//	$("#birthday").val(USER.params.reDate(userObj.birthday));
	$("#birthday").val(userObj.birthday);
	$("#city").val(userObj.cityName);
	
}











