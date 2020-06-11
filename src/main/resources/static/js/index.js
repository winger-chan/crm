$(function () {
    var loginUrl = '/users/login';
    $('#sub').click(function () {
        var username = $('#username').val();
        var password = $('#password').val();
        $.ajax({
            url: loginUrl,
            type: "post",
            dataType: 'json',
            data: {"username": username, "password": password},
            success: function (data) {
                if (data.success) {
                    layer.msg(data.msg, {icon: 1, time: 1000}, function () {
                        window.location.href = "/front/home";
                    });
                } else {
                    layer.msg(data.msg, {icon: 2, time: 1000});
                }
            }
        });
    });
});
