var current_name;
var current_role;

$(function () {
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

    function queryline(username, sex, role, status) {
        $.ajax({
            url: "/users/selectCountsByQuery",
            type: "get",
            dataType: "json",
            data: {
                "select_username": username,
                "select_sex": sex,
                "select_phone": null,
                "select_position": null,
                "select_role": role,
                "select_status": status
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

    $("#query_data").click(function () {
        var select_username = $("#select_username").val();
        var select_sex = $('#select_sex option:selected').val();
        var select_role = $('#select_role option:selected').val();
        var select_status = $('#select_status option:selected').val();
        $.ajax({
            url: "/users/selectUsersByRole",
            async: false,
            cache: false,
            type: "post",
            dataType: 'json',
            data: {
                "select_username": select_username,
                "select_sex": select_sex,
                "select_role": select_role,
                "select_status": select_status
            },
            success: function (data) {
                userList(data.users);
                queryline(select_username, select_sex, select_role, select_status);
            }
        });
    })

    function userList(data) {
        var html = '';
        data.map(function (item, index) {
            html += '<tr class="text-c">'
                + '<td><input type="checkbox" name="" value=""></td>'
                + '<td>' + item.user_id + '</td> '
                + '<td>' + item.role + '</td> '
                + '<td>' + item.realname + '</td>'
                + '<td>' + item.sex + '</td> '
                + '<td class="td-status"><span class="label radius ' + (item.status==1?"label-success":"label-default") +'">' + (item.status === 1 ? "已启用" : "已停用") + '</td>'
                + '<td class="td-manage"><a id="status_update" data-status="' + item.status + '" data-name="' + item.user_name + '" style="text-decoration: none" href="javascript:;" title="' + (item.status==1?"停用":"启用") + '"><i class="Hui-iconfont">' + (item.status==1?"&#xe631;":"&#xe615;") + '</i></a><a id="role_update" data-name="' + item.user_name + '" title="修改权限" href="javascript:;" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe63c;</i></a></td>' +
                // + '<td class="td-manage"><a id="role_update" data-name="' + item.user_name + '" title="修改权限" href="javascript:;" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe63c;</i></a></td>' +
                '</tr>';
        })
        $('#user-role').html(html);
    }

    $('body').on('click', '#status_update', function (e) {
        var status = e.currentTarget.dataset.status;
        layer.confirm((status==1?'确认要停用吗？':'确认要启用吗？'), function (index) {
            var editname = e.currentTarget.dataset.name;
            if (editname == "root") {
                layer.msg("root用户不能被修改", {icon: 2, time: 1000});
            } else if (current_role == "user") {
                layer.msg("user用户没有权限", {icon: 2, time: 1000});
            } else {
                editstatus=(status==1?0:1);
                $.ajax({
                    url: "/users/updateStatus",
                    async: false,
                    cache: false,
                    type: 'post',
                    dataType: 'json',
                    data: {
                        "editstatus": editstatus,
                        "editname": editname
                    },
                    success: function (data) {
                        layer.msg((status==1?'已停用!':'已启用!'), {icon: (status==1?5:6), time:1000}, function () {
                            window.location.href = "/front/user-role";
                        });
                    }
                })
            }

        })
    })

    $('body').on('click', '#role_update', function (e) {
        var editname = e.currentTarget.dataset.name;
        if (editname == "root") {
            layer.msg("root用户不能被修改", {icon: 2, time: 1000});
        } else if (current_role == "user") {
            layer.msg("user用户没有权限", {icon: 2, time: 1000});
        } else {
            $('#dialog').dialog({
                resizable: false,
                title: " 权限修改",
                width: 180,
                height: 200,
                modal: true,
                buttons: {
                    "确定": function () {
                        var role = $('#select_dialog option:selected').val();
                        $.ajax({
                            url: "/users/updateRole",
                            async: false,
                            cache: false,
                            type: "post",
                            dataType: 'json',
                            data: {
                                "role": role,
                                "editname": editname
                            },
                            success: function (data) {
                                layer.msg(data.msg, {icon: 1, time: 1000}, function () {
                                    window.location.href = "/front/user-role";
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
