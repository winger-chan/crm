$(function() {
	var current_name;
	changeName();
	function changeName() {
		$.ajax({
			url: "/users/session",
			type: "post",
			dataType: "json",
			success: function (data) {
				current_name = data.session;
			}
		});
	}

	showEnterprises();
	function showEnterprises(e) {
		var id = getQueryString('id');
		$.ajax({
			url : "/enterprises/showEnterprises",
			type : "get",
			async: false,
			cache: false,
			dataType : "json",
			data:{
				"id": id,
			},
			success : function(data) {
				fillEnterprises(data.enterprises);
			}
		});
	}

	var editUsername;
	function fillEnterprises(data){
		$('#enter_name').val(data.enterprise_name);

		if (data.enterprise_type == "个人独资") {
			$('#enter_type').find("option[value='个人独资']").attr("selected", true);
		} else if (data.enterprise_type == "合伙企业") {
			$('#enter_type').find("option[value='合伙企业']").attr("selected", true);
		} else if (data.enterprise_type == "公司") {
			$('#enter_type').find("option[value='公司']").attr("selected", true);
		}

		if (data.listed == "是") {
			$('#listed').find("option[value='是']").attr("selected", true);
		} else if (data.listed == "否") {
			$('#listed').find("option[value='否']").attr("selected", true);
		}

		if (data.enterprise_background == "院校") {
			$('#enter_background').find("option[value='院校']").attr("selected", true);
		} else if (data.enterprise_background == "医院") {
			$('#enter_background').find("option[value='医院']").attr("selected", true);
		} else if (data.enterprise_background == "公司") {
			$('#enter_background').find("option[value='公司']").attr("selected", true);
		}

		if (data.reg_capital != 0) {
			$('#reg_capital').val(data.reg_capital);
		}

		if (data.year_sales != 0) {
			$('#year_sales').val(data.year_sales);
		}

		if (data.enter_scale != 0) {
			$('#enter_scale').val(data.enter_scale);
		}

		$('#url').val(data.url);
		$('#zip_code').val(data.zip_code);
		$('#address').val(data.address);
		$('#main_products').val(data.main_products);
		$('#major_services').val(data.major_services);
		$('#status').val(data.status);
		$('#create_time').val(data.create_time.substring(0, 10));
		$('#create_name').val(current_name);
		editUsername = data.user_name;
	}

	$("#submit").click(function () {
		var id = getQueryString('id');
		var enter_name = $('#enter_name').val();
		var enter_type = $('#enter_type option:selected').val();
		var enter_background = $('#enter_background option:selected').val();
		var listed = $('#listed option:selected').val();
		var reg_capital = $('#reg_capital').val();
		var year_sales = $('#year_sales').val();
		var enter_scale = $('#enter_scale').val();
		var url = $('#url').val();
		var zip_code = $('#zip_code').val();
		var address = $('#address').val();
		var main_products = $('#main_products').val();
		var major_services = $('#major_services').val();
		var status = $('#status').val();
		var user_name = $('#user_name option:selected').val();
		if (enter_name == '') {
            layer.msg('企业名称不能为空！',{icon:2,time:1000});
		} else {
			$.ajax({
				url: "/enterprises/updateEnterprises",
				type: "post",
				dataType: 'json',
				data: {
					"id": id,
					"enter_name": enter_name,
					"enter_type": enter_type,
					"enter_background": enter_background,
					"listed": listed,
					"reg_capital": reg_capital,
					"year_sales": year_sales,
					"enter_scale": enter_scale,
					"url": url,
					"zip_code": zip_code,
					"address": address,
					"main_products": main_products,
					"major_services": major_services,
					"status": status,
					"user_name": user_name,
					"create_name": current_name
				},
				success: function (data) {
					layer.msg(data.msg, { icon: 2, time: 1000 }, function () {
						window.location.href = "/front/enterprise-list";
					});
				}
			});
		}
	});

	getUsers();
	function getUsers(e) {
		$.ajax({
			url : "/users/listUsers",
			type : "get",
			dataType : "json",
			success : function(data) {
				usersSelect(data.users);
			}
		});
	}

	function usersSelect(data) {
		var html = '';
		data.map(function(item, index) {
			if (item.user_name == editUsername) {
				html += '<option value="'+item.user_name+'" selected>'+item.user_name+'</option>';
			} else {
				html += '<option value="'+item.user_name+'">'+item.user_name+'</option>';
			}
		});
		$('#user_name').html(html);
	}

	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return decodeURIComponent(r[2]);
		}
		return '';
	}
});
