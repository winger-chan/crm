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

	getlist();
    function getlist(e) {
    	var myDate = new Date();
    	document.getElementById("create_time").value = myDate.toLocaleDateString();
        document.getElementById("create_name").value = current_name;
	}

    $("#submit").click(function () {
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
        if(enter_name == '') {
            layer.msg('企业名称不能为空！',{icon:2,time:1000});
        } else {
            $.ajax({
                url: "/enterprises/addEnterprises",
                async: false,
                cache: false,
                type: "post",
                dataType: 'json',
                data: {
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
                    layer.msg(data.msg,{icon:1,time:1000}, function () {
                        window.location.href = "/front/enterprise-add";

                        var index = parent.layer.getFrameIndex(window.name);
                        parent.$('.btn-refresh').click();
                        parent.layer.close(index);
                    });
                },
                error: function(XmlHttpRequest, textStatus, errorThrown){
                    layer.msg('error!',{icon:2,time:1000});
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
            html += '<option value="'+item.user_name+'">'+item.user_name+'</option>';
        });
        $('#user_name').html(html);
    }
});
