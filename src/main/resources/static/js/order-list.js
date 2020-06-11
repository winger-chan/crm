function order_add(title, url, w, h) {
    layer_show(title, url, w, h);
}

$(function () {
    getOrders();
    function getOrders() {
        $.ajax({
            url: "/orders/getOrders",
            type: "post",
            dataType: "json",
            success: function (data) {
                ordersList(data.orders)
            }
        });
    }

    function ordersList(data) {
        var html = '';
        data.map(function (item, index) {
            html += '<tr class="text-c">'
                + '<td><input type="checkbox" name="" value=""></td>'
                + '<td>' + item.id + '</td> '
                + '<td>' + item.name + '</td> '
                + '<td>' + item.price + '</td> '
                + '<td>' + item.count + '</td> '
                + '<td>' + item.buyer + '</td> '
                + '<td>' + item.phone + '</td> '
                + '<td>' + item.address + '</td> '
                + '<td>' + item.create_time + '</td> '
                + '<td class="td-manage"><a id="order_update" data-id="' + item.id + '" title="编辑" href="javascript:;" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe6df;</i></a><a id="order_del" data-id="' + item.id + '" class="ml-5" title="删除" style="text-decoration: none"><i class="Hui-iconfont">&#xe6e2;</i></a></td>' +
                '</tr>';
        })
        $('#order-list').html(html);
    }

    $('tbody').on('click', '#order_update', function (e) {
        var id = e.currentTarget.dataset.id;
        window.location.href = "/front/order-update?id="+ id;
    });

    $('tbody').on('click', '#order_del', function (e) {
        var id = e.currentTarget.dataset.id;
        layer.confirm('确认要删除吗？', function (index) {
            $.ajax({
                url: "/orders/delOrder",
                type: "post",
                dataType: 'json',
                data: {
                    "id": id,
                },
                success: function (data) {
                    layer.msg(data.msg, {icon: 1, time: 1000}, function () {
                        window.location.href = "/front/order-list";
                    });
                }
            });
        })
    })
});
