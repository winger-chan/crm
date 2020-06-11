function customer_add(title, url, w, h) {
    layer_show(title, url, w, h);
}

var current_role;
$(function () {
    getCustomers();
    function getCustomers(e) {
        $.ajax({
            url: "/customers/customersList",
            type: "get",
            dataType: "json",
            success: function (data) {
                customersList(data.customers);
            }
        });
    }

    function customersList(data) {
        var html = '';
        data.map(function (item, index) {
            html += '<tr class="text-c">'
                + '<td><input type="checkbox" name="" value=""></td>'
                + '<td title="ID:'+ item.enterprise_id +'"><div class="en_hidden">' + item.enterprise_name + '</div></td> '
                + '<td title="ID:'+ item.id +'">' + item.name + '</td> '
                + '<td>' + item.sex + '</td>'
                + '<td>' + item.department + '</td>'
                + '<td>' + item.position + '</td> '
                + '<td>' + item.birthday.substring(0, 10) + '</td>'
                + '<td>' + item.phone + '</td>'
                + '<td>' + item.email + '</td>'
                + '<td>' + item.weChat + '</td>'
                + '<td>' + item.qq + '</td>'
                + '<td><div class="cu_hidden">' + item.contact_desc + '</div></td>'
                + '<td><div class="cu_hidden">' + item.requirement + '</div></td>'
                + '<td><div class="cu_hidden">' + item.interest + '</div></td>'
                + '<td>' + item.user_name + '</td>'
                + '<td>' + item.create_name + '</td>'
                + '<td>' + item.status + '</td>'
                + '<td class="td-manage"><a id="customer_update" data-id="' + item.id + '" data-enterId="' + item.enterprise_id + '" data-username="' + item.user_name + '" title="编辑" href="javascript:;" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe6df;</i></a><a id="customer_del" data-id="' + item.id + '" class="ml-5" title="删除" style="text-decoration: none"><i class="Hui-iconfont">&#xe6e2;</i></a></td>' +
                '</tr>';
        });
        $('#customer-list').html(html);
    }

    $('tbody').on('click', '#customer_update', function (e) {
        var id = e.currentTarget.dataset.id;
        window.location.href = "/front/customer-update?id=" + id;
    });

    $('tbody').on('click', '#customer_del', function (e) {
        var id = e.currentTarget.dataset.id;
        if (current_role == "user") {
            layer.msg('user用户没有权限！',{icon:2,time:1000});
        } else {
            layer.confirm('确认要删除吗？', function (index) {
                $.ajax({
                    url: "/customers/delCustomers",
                    type: "get",
                    dataType: 'json',
                    data: {
                        "id": id,
                        "status": null
                    },
                    success: function (data) {
                        layer.msg(data.msg, { icon: 1, time: 1000 }, function () {
                            window.location.href = "/front/customer-list";
                        });
                    }
                });
            })
        }
    });

    $('#delCustomersByStatus').click(function () {
        if (current_role == "user") {
            layer.msg('user用户没有权限！',{icon:2,time:1000});
        } else {
            layer.confirm('确认要删除所有处于放弃状态的客户信息吗？', function (index) {
                $.ajax({
                    url: "/customers/delCustomers",
                    type: "get",
                    dataType: 'json',
                    data: {
                        "id": null,
                        "status": "放弃"
                    },
                    success: function (data) {
                        layer.msg(data.msg, { icon: 1, time: 1000 }, function () {
                            window.location.href = "/front/customer-list";
                        });
                    }
                });
            })
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
        var html = '<option value="" selected>全部</option>';
        data.map(function(item, index) {
            html += '<option value="'+item.user_name+'">'+item.user_name+'</option>';
        });
        $('#user_name').html(html);
    }

    getLine();
    function getLine() {
        $.ajax({
            url: "/customers/queryCounts",
            type: "get",
            dataType: "json",
            success: function (data) {
                $('#data-line').text(data.line);
            }
        });
    }

    $('#query_data').click(function () {
        var enter_name = $("#enter_name").val();
        var name = $('#name').val();
        var sex = $("#sex option:selected").val();
        var status = $("#status option:selected").val();
        var user_name = $('#user_name option:selected').val();
        $.ajax({
            url: "/customers/queryCustomers",
            type: "post",
            dataType: 'json',
            data: {
                "enter_name": enter_name,
                "name": name,
                "sex": sex,
                "user_name": user_name,
                "status": status,
            },
            success: function (data) {
                customersList(data.customers);
                queryline(enter_name, name, sex, user_name, status);
            }
        });
    })

    function queryline(enter_name, name, sex, user_name, status){
        $.ajax({
            url: "/customers/queryCountsBySelect",
            type: "post",
            dataType: "json",
            data: {
                "enter_name": enter_name,
                "name": name,
                "sex": sex,
                "user_name": user_name,
                "status": status,
            },
            success: function (data) {
                $('#data-line').text(data.line);
            }
        });
    }

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
