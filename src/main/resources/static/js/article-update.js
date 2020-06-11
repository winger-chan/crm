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

    var editId = getQueryString('id');
    getArticles();
    function getArticles() {
        $.ajax({
            url: "/articles/getArticlesById",
            type: "post",
            sync: false,
            cache: false,
            dataType: "json",
            data: {
                "id": editId
            },
            success : function (data) {
                fillArticles(data.article);
            }
        })
    }

    function fillArticles(data){
        $('#title').val(data.title);

        if (data.type == "行业资讯") {
            $('#type').find("option[value='行业资讯']").attr("selected", true);
        } else if (data.type == "行业动态") {
            $('#type').find("option[value='行业动态']").attr("selected", true);
        } else if (data.type == "行业新闻") {
            $('#type').find("option[value='行业新闻']").attr("selected", true);
        }

        $('#sources').val(data.sources);
    }

    getlist();
    function getlist(e) {
        var myDate = new Date();
        document.getElementById("time").value = myDate.toLocaleDateString();
        document.getElementById("user_name").value = current_name;
    }

    $("#submit").click(function () {
        var title = $('#title').val();
        var type = $('#type option:selected').val();
        var sources = $('#sources').val();
        var user_name = $('#user_name').val();
        if(title == '') {
            layer.msg('资讯标题不能为空！',{icon:2,time:1000});
        } else {
            $.ajax({
                url: "/articles/updateArticles",
                type: "post",
                dataType: 'json',
                data: {
                    "id": editId,
                    "title": title,
                    "type": type,
                    "sources": sources,
                    "user_name": user_name,
                },
                success: function (data) {
                    layer.msg(data.msg,{icon:1,time:1000}, function () {
                        window.location.href = "/front/article-list";
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
