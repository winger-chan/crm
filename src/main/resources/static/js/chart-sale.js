function sale_add(title, url, w, h) {
    layer_show(title, url, w, h);
}

$(function () {
    getSales();
    function getSales() {
        $.ajax({
            url: "/sales/getSales",
            type: "post",
            dataType: "json",
            success: function (data) {
                salesList(data.sales)
            }
        });
    }

    function salesList(data) {
        var html = '';
        data.map(function (item, index) {
            html += '<tr class="text-c">'
                + '<td><input type="checkbox" name="" value=""></td>'
                + '<td>' + item.id + '</td> '
                + '<td>' + item.product_id + '</td> '
                + '<td>' + item.years + '</td> '
                + '<td>' + item.january + '</td> '
                + '<td>' + item.february + '</td> '
                + '<td>' + item.march + '</td> '
                + '<td>' + item.april + '</td> '
                + '<td>' + item.may + '</td> '
                + '<td>' + item.june + '</td> '
                + '<td>' + item.july + '</td> '
                + '<td>' + item.august + '</td> '
                + '<td>' + item.september + '</td> '
                + '<td>' + item.october + '</td> '
                + '<td>' + item.november + '</td> '
                + '<td>' + item.december + '</td> '
                + '<td>' + item.yearSales + '</td> '
                + '<td class="td-manage"><a id="sale_update" data-id="' + item.id + '" title="编辑" href="javascript:;" class="ml-5" style="text-decoration: none"><i class="Hui-iconfont">&#xe621;</i></a><a id="sale_del" data-id="' + item.id + '" class="ml-5" title="删除" style="text-decoration: none"><i class="Hui-iconfont">&#xe6e2;</i></a></td>' +
                '</tr>';
        })
        $('#chart-sale').html(html);
    }

    $('tbody').on('click', '#sale_update', function (e) {
        var id = e.currentTarget.dataset.id;
        window.location.href = "/front/chart-sale-update?id="+ id;
    });

    $('tbody').on('click', '#sale_del', function (e) {
        var id = e.currentTarget.dataset.id;

        layer.confirm('确认要删除吗？', function (index) {
            $.ajax({
                url: "/sales/delSale",
                type: "post",
                dataType: 'json',
                data: {
                    "id": id,
                },
                success: function (data) {
                    layer.msg(data.msg, {icon: 1, time: 1000}, function () {
                        window.location.href = "/front/chart-sale";
                    });
                }
            });
        })
    })
});
