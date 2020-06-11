function article_add(title, url, w, h) {
    layer_show(title, url, w, h);
}

$(function () {
    getArticles();
    function getArticles() {
        $.ajax({
            url: "/articles/getArticles",
            type: "post",
            datatype: "json",
            success: function (data) {
                articlesList(data.articles);
            }
        });
    }

    getline();
    function getline() {
        $.ajax({
            url: "/articles/queryCounts",
            type: "post",
            dataType: "json",
            success: function (data) {
                $('#data-line').text(data.line);
            }
        });
    }

    function queryline(title, type) {
        $.ajax({
            url: "/articles/queryCountsBySelect",
            type: "post",
            dataType: "json",
            data: {
                "title": title,
                "type": type
            },
            success: function (data) {
                $('#data-line').text(data.line);
            }
        });
    }

    $("#query_data").click(function () {
        var title = $("#title").val();
        var type = $('#type option:selected').val();
        $.ajax({
            url: "/articles/queryArticles",
            type: "post",
            dataType: 'json',
            data: {
                "title": title,
                "type": type
            },
            success: function (data) {
                articlesList(data.articles);
                queryline(title, type);
            }
        });
    });

    function articlesList(data) {
        var html = '';
        data.map(function (item, index) {
            html += '<tr class="text-c">'
                + '<td><input type="checkbox" name="" value=""></td>'
                + '<td>' + item.id + '</td> '
                + '<td>' + item.title + '</td> '
                + '<td>' + item.type + '</td>'
                + '<td><a href="' + item.sources + '" target="_blank">' + item.sources + '</a></td> '
                + '<td>' + item.user_name + '</td>'
                + '<td>' + item.time.substring(0, 10) + '</td>'
                + '<td class="td-manage"><a id="article_update" data-id="' + item.id + '" title="编辑" href="javascript:;" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe6df;</i></a><a id="article_del" data-id="' + item.id + '" class="ml-5" title="删除" style="text-decoration: none"><i class="Hui-iconfont">&#xe6e2;</i></a></td>' +
                '</tr>';
        })
        $('#article-list').html(html);
    }

    $('tbody').on('click', '#article_update', function (e) {
        var id = e.currentTarget.dataset.id;
        window.location.href = "/front/article-update?id=" + id;
    })

    $('tbody').on('click', '#article_del', function (e) {
        var id = e.currentTarget.dataset.id;
        if (current_role == "user") {
            layer.msg('user用户没有权限！',{icon:2,time:1000});
        } else {
            layer.confirm('确认要删除吗？', function (index) {
                $.ajax({
                    url: "/articles/delArticles",
                    type: "get",
                    dataType: 'json',
                    data: {
                        "id": id,
                    },
                    success: function (data) {
                        layer.msg(data.msg, { icon: 1, time: 1000 }, function () {
                            window.location.href = "/front/article-list";
                        });
                    }
                });
            })
        }
    })

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
