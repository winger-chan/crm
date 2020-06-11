var current_role;

function enterprise_add(title, url, w, h) {
	layer_show(title, url, w, h);
}

$(function() {
	getList();
	function getList(e) {
		$.ajax({
			url: "/enterprises/getEnterprises",
			type: "get",
			dataType: "json",
			success: function (data) {
				enterprisesList(data.enterprises);
			}
		})
	}

	$('#query_data').click(function () {
		var enterprise_name = $("#select_enter_name").val();
		var listed = $('#select_listed option:selected').val();
		var enterprise_background = $("#select_background option:selected").val();
		var status = $("#select_status option:selected").val();
		var user_name = $("#select_user_name option:selected").val();
		$.ajax({
			url: "/enterprises/queryEnterprises",
			type: "post",
			dataType: 'json',
			data: {
				"enterprise_name": enterprise_name,
				"listed": listed,
				"enterprise_background": enterprise_background,
				"status": status,
				"user_name": user_name,
			},
			success: function (data) {
				enterprisesList(data.enterprises);
				queryline(enterprise_name, listed, enterprise_background, status, user_name);
			}
		});
	})

	function enterprisesList(data) {
		var html = '';
		data.map(function (item, index) {
			html += '<tr class="text-c">'
				+ '<td><input type="checkbox" name="" value=""></td>'
				+ '<td title="ID:'+ item.enterprise_id +'"><div class="en_hidden">' + item.enterprise_name + '</div></td> '
				+ '<td>' + item.listed + '</td>'
				+ '<td>' + item.enterprise_type + '</td>'
				+ '<td>' + item.enterprise_background + '</td> '
				+ '<td>' + item.reg_capital + '</td>'
				+ '<td>' + item.year_sales + '</td>'
				+ '<td>' + item.enter_scale + '</td>'
				+ '<td><div class="en_hidden">' + item.address + '</div></td>'
				+ '<td><div class="en_hidden"><a href="' + item.url + '" target="_blank">' + item.url + '</a></div></td>'
				+ '<td>' + item.zip_code + '</td>'
				+ '<td><div class="en_hidden">' + item.main_products + '</div></td>'
				+ '<td><div class="en_hidden">' + item.major_services + '</div></td>'
				+ '<td>' + item.status + '</td>'
				+ '<td>' + item.user_name + '</td>'
				+ '<td>' + item.create_time.substring(0, 10) + '</td>'
				+ '<td>' + item.create_name + '</td>'
				+ '<td class="td-manage"><a id="enterprise_update" data-id="' + item.enterprise_id + '" data-name="' + item.enterprise_name + '" title="编辑" href="javascript:;" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe6df;</i></a><a id="enterprise_del" data-id="' + item.enterprise_id + '" class="ml-5" title="删除" style="text-decoration: none"><i class="Hui-iconfont">&#xe6e2;</i></a></td>' +
				'</tr>';
		})
		$('#enterprise-list').html(html);
	}

	$('tbody').on('click', '#enterprise_del', function (e) {
		var id = e.currentTarget.dataset.id;
		if (current_role == "user") {
            layer.msg('user用户没有权限！',{icon:2,time:1000});
		} else {
			layer.confirm('确认要删除吗？', function (index) {
				$.ajax({
					url: "/enterprises/delEnterprises",
					type: "get",
					dataType: 'json',
					data: {
						"enterprise_id": id,
						"status": null
					},
					success: function (data) {
						layer.msg(data.msg, { icon: 1, time: 1000 }, function () {
							window.location.href = "/front/enterprise-list";
						});
					}
				});
			})
		}
	});

	$('#delEnterprisesByStatus').click(function () {
		if (current_role == "user") {
            layer.msg('user用户没有权限！',{icon:2,time:1000});
		} else {
			layer.confirm('确认要删除所有处于放弃状态的企业信息吗？', function (index) {
				$.ajax({
					url: "/enterprises/delEnterprises",
					type: "get",
					dataType: 'json',
					data: {
						"enterprise_id": null,
						"status": "放弃"
					},
					success: function (data) {
						layer.msg(data.msg, { icon: 1, time: 1000 }, function () {
							window.location.href = "/front/enterprise-list";
						});
					}
				});
			})
		}
	});

	$('tbody').on('click', '#enterprise_update', function (e) {
		var id = e.currentTarget.dataset.id;
		window.location.href = "/front/enterprise-update?id=" + id;
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
		var html = '<option value="" selected>==请选择==</option>';
		data.map(function(item, index) {
			html += '<option value="'+item.user_name+'">'+item.user_name+'</option>';
		});
		$('#select_user_name').html(html);
	}

	getLine();
	function getLine() {
		$.ajax({
			url: "/enterprises/queryCounts",
			type: "get",
			dataType: "json",
			success: function (data) {
				$('#data-line').text(data.line);
			}
		});
	}

	function queryline(enterprise_name, listed, enterprise_background, status, user_name){
		$.ajax({
			url: "/enterprises/queryCountsBySelect",
			type: "get",
			dataType: "json",
			data: {
				"enterprise_name": enterprise_name,
				"listed":listed,
				"enterprise_background":enterprise_background,
				"status":status,
				"user_name":user_name
			},
			success: function (data) {
				$('#data-line').text(data.line);
			}
		});
	}

	getRole();
	function getRole() {
		$.ajax({
			url: "/users/getRole",
			type: "post",
			dataType: "json",
			success: function (data) {
				current_role = data.role;
			}
		});
	}
});
