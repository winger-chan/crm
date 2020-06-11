var current_name;
var current_role;

function admin_add(title, url, w, h) {
    layer_show(title, url, w, h);
}

$(function () {
    getline();
    function getline() {
        $.ajax({
            url: "/users/selectCounts",
            type: "get",
            dataType: "json",
            success: function (data) {
                $('#data-line').text(data.line);
            }
        });
    }

    function queryline(username, sex, phone) {
        $.ajax({
            url: "/users/selectCountsByQuery",
            type: "get",
            dataType: "json",
            data: {
                "select_username": username,
                "select_sex": sex,
                "select_phone": phone,
                "select_position": null,
                "select_role": null,
                "select_status": 100
            },
            success: function (data) {
                $('#data-line').text(data.line);
            }
        });
    }

    getlist();
    function getlist(e) {
        $.ajax({
            url: "/users/listUsers",
            type: "get",
            dataType: "json",
            success: function (data) {
                userList(data.users);
            }
        });
    }

    $("#query_data").click(function () {
        var select_username = $("#select_username").val();
        var select_sex = $('#select_sex option:selected').val();
        var select_phone = $("#select_phone").val();
        $.ajax({
            url: "/users/selectUsers",
            async: false,
            cache: false,
            type: "post",
            dataType: 'json',
            data: {
                "select_username": select_username,
                "select_sex": select_sex,
                "select_phone": select_phone
            },
            success: function (data) {
                userList(data.users);
                queryline(select_username, select_sex, select_phone);
            }
        });
    });

    function userList(data) {
        var html = '';
        data.map(function (item, index) {
            html += '<tr class="text-c">'
                + '<td><input type="checkbox" name="" value=""></td>'
                + '<td>' + item.user_id + '</td> '
                + '<td>' + item.user_name + '</td> '
                + '<td>' + item.realname + '</td>'
                + '<td>' + item.sex + '</td> '
                + '<td>' + item.phone + '</td>'
                + '<td>' + item.birthday.substring(0, 10) + '</td>'
                + '<td>' + item.email + '</td>'
                + '<td><div class="t_hidden">' + item.remark + '</div></td>'
                // + '<td class="td-status"><span class="label radius ' + (item.status==1?"label-success":"") +'">' + (item.status === 1 ? "已启用" : "已停用") + '</td>'
            // + '<td class="td-manage"><a style="text-decoration: none" onClick="' + (item.status==1?"admin_stop":"admin_start") + '(this, &apos;10001&apos;) href="javascript:;" title="' + (item.status==1?"停用":"启用") + '"><i class="Hui-iconfont">' + (item.status==1?&"#xe631;":"&#xe615;") + '</i></a><a title="编辑" href="javascript:;" onclick="admin_edit(&quot;管理员编辑&quot;, &quot;user-update.html&quot;, &quot;1&quot;, &quot;800&quot;, &quot;500&quot;)" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe6df;</i></a><a title="删除" href="javascript:;" onclick="admin_del(this, &apos;1&apos;)" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe6e2;</i></a></td>' +
                + '<td class="td-manage"><a id="user_update" data-id="' + item.user_id + '" data-name="' + item.user_name + '" title="编辑" href="javascript:;" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe6df;</i></a><a id="del_user" data-name="' + item.user_name + '" data-role="' + item.role + '" class="ml-5" title="删除" style="text-decoration: none"><i class="Hui-iconfont">&#xe6e2;</i></a></td>' +
                '</tr>';
        })
        $('#user-list').html(html);
    }

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

    selectRole();
    function selectRole() {
        $.ajax({
            url: "/users/selectRole",
            async: false,
            cache: false,
            type: "get",
            dataType: "json",
            data: {
                "user_name": current_name
            },
            success: function (data) {
                current_role = data.role;
            }
        });
    }

    function loginOut() {
        $.ajax({
            url: "/users/loginOut",
            type: "get",
            success: function (data) {
                layer.msg("注销成功", {icon: 1, time: 1000}, function () {
                    window.parent.location.href = "/front/index";
                });
            }
        });
    }

    $('body').on('click', '#user_update', function (e) {
        var user_id = e.currentTarget.dataset.id;
        var user_name = e.currentTarget.dataset.name;
        var editname = e.currentTarget.dataset.name;
        if (editname == "root") {
            layer.msg("root用户不能修改", {icon: 2, time: 1000});
        } else if (current_role != "user" || (current_role == "user" && current_name == editname)) {
            window.location.href = "/front/user-update?user_name="+user_name+"&user_id="+user_id;
        } else if (current_role == "user") {
            layer.msg("user用户仅可供修改自身信息", {icon: 2, time: 1000});
        }
    });

    $('body').on('click', '#del_user', function (e) {
        var role = e.currentTarget.dataset.role;
        var user_name = e.currentTarget.dataset.name;
        if (role == "root") {
            layer.msg("root用户不能删除", {icon: 2, time: 1000});
        } else if (current_role == "user") {
            layer.msg("user用户没有权限", {icon: 2, time: 1000});
        } else {
            layer.confirm('确认要删除吗？', function (index) {
                $.ajax({
                    url: "/users/delUsers",
                    async: false,
                    cache: false,
                    type: "get",
                    dataType: 'json',
                    data: {
                        "del_user_name": user_name,
                        "role": role
                    },
                    success: function (data) {
                        layer.msg(data.msg, {icon: 1, time: 1000}, function () {
                            if (user_name == current_name) {
                                loginOut();
                            } else {
                                window.location.href = "/front/user-list";
                            }
                        });
                    }
                });
            })
        }
    });
});
