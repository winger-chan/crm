$(function () {
	$("#submit").click(function () {
		var name = $('#name').val();
		var price = $('#price').val();
		var count = $('#count').val();
		var buyer = $('#buyer').val();
		var phone = $('#phone').val();
		var address = $('#address').val();
		var create_time = new Date($('#create_time').val().replace('-','/'));
		if(name == '') {
			layer.msg('订单名不能为空！',{icon:2,time:1000});
		} else {
			$.ajax({
				url: "/orders/addOrder",
				type: "post",
				dataType: 'json',
				data: {
					"name": name,
					"price": price,
					"count": count,
					"buyer": buyer,
					"phone": phone,
					"address": address,
					"create_time": create_time
				},
				success: function (data) {
					layer.msg(data.msg,{icon:1,time:1000}, function () {
						window.location.href = "/front/order-add";

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

