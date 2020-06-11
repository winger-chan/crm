function product_add(title, url, w, h) {
    layer_show(title, url, w, h);
}

var current_name;
var current_role;
$(function () {
    getProducts();
    function getProducts() {
        $.ajax({
            url: "/products/getProducts",
            type: "post",
            datatype: "json",
            success: function (data) {
                productsList(data.products);
                queryCounts();
            }
        })
    }

    function queryCounts() {
        $.ajax({
            url: "/products/queryCounts",
            type: "post",
            dataType: "json",
            success: function (data) {
                $('#data-line').text(data.line);
            }
        });
    }

    $("#query_data").click(function () {
        var name = $("#name").val();
        var supplier = $('#supplier').val();
        $.ajax({
            url: "/products/queryProducts",
            type: "post",
            dataType: 'json',
            data: {
                "name": name,
                "supplier": supplier
            },
            success: function (data) {
                productsList(data.products);
                queryline(name, supplier);
            }
        });
    });

    function queryline(name, supplier) {
        $.ajax({
            url: "/products/queryCountsBySelect",
            type: "post",
            dataType: "json",
            data: {
                "name": name,
                "supplier": supplier
            },
            success: function (data) {
                $('#data-line').text(data.line);
            }
        });
    }

    function productsList(data) {
        var html = '';
        data.map(function (item, index) {
            html += '<tr class="text-c">'
                + '<td><input type="checkbox" name="" value=""></td>'
                + '<td>' + item.id + '</td> '
                + '<td>' + item.name + '</td> '
                + '<td><div class="t_hidden">' + item.desc + '</div></td>'
                + '<td><div class="en_hidden"><a href="'+ item.sources +'" target="_blank">' + item.sources + '</a><div></div></td> '
                + '<td>' + item.supplier + '</td> '
                + '<td>' + item.price + '</td>'
                + '<td>' + item.sales + '</td>'
                + '<td>' + item.inventory + '</td>'
                + '<td>' + item.user_name + '</td>'
                + '<td>' + item.create_time + '</td>'
                + '<td class="td-manage"><a id="product_update" data-id="' + item.id + '" title="编辑" href="javascript:;" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe6df;</i></a><a id="product_del" data-id="' + item.id + '" data-name="' + item.user_name + '" class="ml-5" title="删除" style="text-decoration: none"><i class="Hui-iconfont">&#xe6e2;</i></a></td>' +
                '</tr>';
        });
        $('#product-list').html(html);
    }

    $('tbody').on('click', '#product_update', function (e) {
        var id = e.currentTarget.dataset.id;
        window.location.href = "/front/product-update?id=" + id;
    });

    $('tbody').on('click', '#product_del', function (e) {
        var id = e.currentTarget.dataset.id;
        var name = e.currentTarget.dataset.name;
        if (current_name != name || (current_role != "root" && current_role != "admin")) {
            layer.msg("你需要admin或root权限，当前仅可供删除自身发布的产品", {icon: 2, time: 1000})
        } else {
            layer.confirm('确认要删除该产品吗？', function (index) {
                $.ajax({
                    url: "/products/delProduct",
                    type: "post",
                    dataType: 'json',
                    data: {
                        "id": id,
                    },
                    success: function (data) {
                        layer.msg(data.msg, { icon: 1, time: 1000 }, function () {
                            window.location.href = "/front/product-list";
                        });
                    }
                });
            })
        }
    });


    changeName();
    function changeName() {
        $.ajax({
            url: "/users/session",
            type: "post",
            dataType: "json",
            success: function (data) {
                current_name = data.session;
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
