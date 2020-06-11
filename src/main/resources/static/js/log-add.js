$(function () {
	var current_name;
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

	window.onload = function () {
		var myDate = new Date();
		document.getElementById("create_time").value = myDate.toLocaleDateString();
		document.getElementById("user_name").value = current_name;
	};

	$("#submit").click(function () {
		var title = $('#title').val();
		var content = $('#content').val();
		var reserve_time = new Date($('#reserve_time').val().replace('-','/'));
		var user_name = $('#user_name').val();
		var target = $('#target').val();
		if(title == '') {
			layer.msg('日志标题不能为空！',{icon:2,time:1000});
		} else {
			$.ajax({
				url: "/logs/addLog",
				type: "post",
				dataType: 'json',
				data: {
					"title": title,
					"content": content,
					"reserve_time": reserve_time,
					"user_name": user_name,
					"target": target
				},
				success: function (data) {
					layer.msg(data.msg,{icon:1,time:1000}, function () {
						window.location.href = "/front/log-add";

						var index = parent.layer.getFrameIndex(window.name);
						parent.layer.close(index);
					});
				},
				error: function(XmlHttpRequest, textStatus, errorThrown){
					layer.msg('error!',{icon:2,time:1000});
				}
			});
		}
	});
});

