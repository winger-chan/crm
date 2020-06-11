$(function () {
    var id = getQueryString('id');
    getLogById();
    function getLogById() {
        $.ajax({
            url: "/logs/getLogById",
            type: "post",
            datatype: "json",
            data: {
                "id": id
            },
            success: function (data) {
                fillLog(data.logs);
            }
        });
    }

    function fillLog(data) {
        $('#title').val(data.title);
        $('#content').val(data.content);
        $('#create_time').val(data.create_time.substring(0, 10));
        $('#reserve_time').val(data.reserve_time.substring(0, 10));
        $('#user_name').val(data.user_name);
        $('#target').val(data.target);
    }

    $("#submit").click(function () {
        var title = $('#title').val();
        var content = $('#content').val();
        var create_time = new Date($('#create_time').val().replace('-','/'));
        var reserve_time = new Date($('#reserve_time').val().replace('-','/'));
        var user_name = $('#user_name').val();
        var target = $('#target').val();
        if(title == '') {
            layer.msg('日志标题不能为空！',{icon:2,time:1000});
        } else {
            $.ajax({
                url: "/logs/updateLog",
                type: "post",
                dataType: 'json',
                data: {
                    "id": id,
                    "title": title,
                    "content": content,
                    "create_time": create_time,
                    "reserve_time": reserve_time,
                    "user_name": user_name,
                    "target": target
                },
                success: function (data) {
                    layer.msg(data.msg,{icon:1,time:1000}, function () {
                        window.location.href = "/front/log-list";
                    });
                },
                error: function(XmlHttpRequest, textStatus, errorThrown){
                    layer.msg('error!',{icon:2,time:1000});
                }
            });
        }
    });

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return '';
    }
});

