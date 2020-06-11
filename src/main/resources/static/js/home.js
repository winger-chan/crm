$(function () {
    changeName();
    function changeName() {
        $.ajax({
            url: "/users/session",
            type: "post",
            dataType: "json",
            success: function (data) {
                $("#index_name").text(data.session);
            }
        });
    }

    $('#loginOut').click(function () {
        $.ajax({
            url: "/users/loginOut",
            type: "get",
            success: function (data) {
                layer.msg("注销成功", {icon: 1, time: 1000}, function () {
                    window.location.href = "/front/index";
                });
            }
        });
    })
});
