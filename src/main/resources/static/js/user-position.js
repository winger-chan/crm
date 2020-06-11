var current_name;
var current_role;

$(function () {
    getlist();
    function getlist(e) {
        $.ajax({
            url: "/users/listUsers",
            async: false,
            cache: false,
            type: "get",
            dataType: "json",
            success: function (data) {
                userList(data.users);
            }
        });
    }

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

    function queryline(username, sex, position) {
        $.ajax({
            url: "/users/selectCountsByQuery",
            type: "get",
            dataType: "json",
            data: {
                "select_username": username,
                "select_sex": sex,
                "select_phone": null,
                "select_position": position,
                "select_role": null,
                "select_status": 100
            },
            success: function (data) {
                $('#data-line').text(data.line);
            }
        });
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

    $("#query-data").click(function () {
        var select_username = $("#select_username").val();
        var select_sex = $('#select_sex option:selected').val();
        var select_position = $('#select_position option:selected').val();
        $.ajax({
            url: "/users/selectUsersByPosition",
            async: false,
            cache: false,
            type: "post",
            dataType: 'json',
            data: {
                "select_username": select_username,
                "select_sex": select_sex,
                "select_position": select_position
            },
            success: function (data) {
                userList(data.users);
                queryline(select_username, select_sex, select_position);
            }
        });
    })

    function userList(data) {
        var html = '';
        data.map(function (item, index) {
            html += '<tr class="text-c">'
                + '<td><input type="checkbox" name="" value=""></td>'
                + '<td>' + item.user_id + '</td> '
                + '<td>' + item.userPosition + '</td> '
                + '<td>' + item.realname + '</td>'
                + '<td>' + item.sex + '</td> '
                // + '<td class="td-status"><span class="label radius ' + (item.status==1?"label-success":"") +'">' + (item.status === 1 ? "已启用" : "已停用") + '</td>'
                // + '<td class="td-manage"><a style="text-decoration: none" onClick="' + (item.status==1?"admin_stop":"admin_start") + '(this, &apos;10001&apos;) href="javascript:;" title="' + (item.status==1?"停用":"启用") + '"><i class="Hui-iconfont">' + (item.status==1?&"#xe631;":"&#xe615;") + '</i></a><a title="编辑" href="javascript:;" onclick="admin_edit(&quot;管理员编辑&quot;, &quot;user-update.html&quot;, &quot;1&quot;, &quot;800&quot;, &quot;500&quot;)" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe6df;</i></a><a title="删除" href="javascript:;" onclick="admin_del(this, &apos;1&apos;)" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe6e2;</i></a></td>' +
                + '<td class="td-manage"><a id="position_update" data-name="' + item.user_name + '" title="修改职位" href="javascript:;" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe63c;</i></a></td>' +
                '</tr>';
        })
        $('#user-position').html(html);
    }

    $('body').on('click', '#position_update', function (e) {
        var editname = e.currentTarget.dataset.name;
        if (editname == "root") {
            layer.msg("root用户不能被修改", {icon: 2, time: 1000});
        } else if (current_role == "user") {
            layer.msg("user用户没有权限", {icon: 2, time: 1000});
        } else {
            $('#dialog').dialog({
                resizable: false,
                title: "职位修改",
                width: 180,
                height: 200,
                modal: true,
                buttons: {
                    "确定": function () {
                        editPosition = $('#select_dialog option:selected').val();
                        $.ajax({
                            url: "/users/editUsers",
                            async: false,
                            cache: false,
                            type: "post",
                            dataType: 'json',
                            data: {
                                "editname": editname,
                                "editPosition": editPosition
                            },
                            success: function (data) {
                                layer.msg(data.msg, {icon: 1, time: 1000}, function () {
                                    window.location.href = "/front/user-position";
                                });
                            }
                        });
                        $(this).dialog("close");
                    },
                    "取消": function () {
                        $(this).dialog("close");
                    }
                }
            })
        }
    })
});
