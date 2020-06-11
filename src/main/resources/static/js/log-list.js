function log_add(title, url, w, h) {
	layer_show(title, url, w, h);
}

$(function () {
	var current_name;

	getLogs();
	function getLogs() {
		$.ajax({
			url: "/logs/getLogs",
			type: "post",
			datatype: "json",
			success: function (data) {
				logsList(data.logs);
				queryCounts();
			}
		});
	}

	function queryCounts() {
		$.ajax({
			url: "/logs/queryCounts",
			type: "post",
			dataType: "json",
			success: function (data) {
				$('#data-line').text(data.line);
			}
		});
	}

	function queryline(title, target) {
		$.ajax({
			url: "/logs/queryCountsBySelect",
			type: "post",
			dataType: "json",
			data: {
				"title": title,
				"target": target
			},
			success: function (data) {
				$('#data-line').text(data.line);
			}
		});
	}

	$("#query_data").click(function () {
		var title = $("#title").val();
		var target = $('#target').val();
		$.ajax({
			url: "/logs/queryLogs",
			type: "post",
			dataType: 'json',
			data: {
				"title": title,
				"target": target
			},
			success: function (data) {
				logsList(data.logs);
				queryline(title, target);
			}
		});
	});

	function logsList(data) {
		var html = '';
		data.map(function (item, index) {
			html += '<tr class="text-c">'
				+ '<td><input type="checkbox" name="" value=""></td>'
				+ '<td>' + item.id + '</td> '
				+ '<td>' + item.title + '</td> '
				+ '<td><div class="t_hidden">' + item.content + '</div></td>'
				+ '<td>' + item.create_time.substring(0, 10) + '</td> '
				+ '<td>' + item.reserve_time.substring(0, 10) + '</td> '
				+ '<td>' + item.user_name + '</td>'
				+ '<td>' + item.target + '</td>'
				+ '<td class="td-manage"><a id="log_update" data-id="' + item.id + '" title="编辑" href="javascript:;" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe6df;</i></a><a id="log_del" data-id="' + item.id + '" data-username="' + item.user_name + '" class="ml-5" title="删除" style="text-decoration: none"><i class="Hui-iconfont">&#xe6e2;</i></a></td>' +
				'</tr>';
		});
		$('#log-list').html(html);
	}

	$('tbody').on('click', '#log_update', function (e) {
		var id = e.currentTarget.dataset.id;
		window.location.href = "/front/log-update?id=" + id;
	});

	$('tbody').on('click', '#log_del', function (e) {
		var id = e.currentTarget.dataset.id;
		var username = e.currentTarget.dataset.username;

		if (current_name != username || current_name != "root") {
			layer.msg("除root外仅可供删除自身发布的日志", {icon: 2, time: 1000})
		} else {
			layer.confirm('确认要删除吗？', function (index) {
				$.ajax({
					url: "/logs/delLog",
					type: "post",
					dataType: 'json',
					data: {
						"id": id,
					},
					success: function (data) {
						layer.msg(data.msg, { icon: 1, time: 1000 }, function () {
							window.location.href = "/front/log-list";
						});
					}
				});
			})
		}
	});

	changeName();
	function changeName() {
		$.ajax({
			url: "/users/session",
			async: false,
			cache: false,
			type: "post",
			dataType: "json",
			success: function (data) {
				current_name = data.session;
			}
		});
	}
});
