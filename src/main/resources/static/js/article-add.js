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
        document.getElementById("time").value = myDate.toLocaleDateString();
        document.getElementById("user_name").value = current_name;
    };

    $("#submit").click(function () {
        var title = $('#title').val();
        var type = $('#type option:selected').val();
        var sources = $('#sources').val();
        var user_name = $('#user_name').val();
        if(title == '') {
            layer.msg('资讯标题不能为空！',{icon:2,time:1000});
        } else {
            $.ajax({
                url: "/articles/addArticles",
                type: "post",
                dataType: 'json',
                data: {
                    "title": title,
                    "type": type,
                    "sources": sources,
                    "user_name": user_name
                },
                success: function (data) {
                    layer.msg(data.msg,{icon:1,time:1000}, function () {
                        window.location.href = "/front/article-add";

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
