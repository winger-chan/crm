$(function () {
    var id = getQueryString('id');
    getProductById();
    function getProductById() {
        $.ajax({
            url: "/products/getProductById",
            type: "post",
            datatype: "json",
            data: {
                "id": id
            },
            success: function (data) {
                fillProduct(data.product);
            }
        });
    }

    function fillProduct(data) {
        $('#name').val(data.name);
        $('#desc').val(data.desc);
        $('#supplier').val(data.supplier);
        $('#sources').val(data.sources);
        $('#price').val(data.price);
        $('#sales').val(data.sales);
        $('#inventory').val(data.inventory);
        $('#time').val(data.create_time.substring(0, 10));
        $('#user_name').val(data.user_name);
    }

    $("#submit").click(function () {
        var name = $('#name').val();
        var desc = $('#desc').val();
        var supplier = $('#supplier').val();
        var sources = $('#sources').val();
        var price = $('#price').val();
        var sales = $('#sales').val();
        var inventory = $('#inventory').val();
        if(name == '') {
            layer.msg('产品名称不能为空！',{icon:2,time:1000});
        } else {
            $.ajax({
                url: "/products/updateProduct",
                type: "post",
                dataType: 'json',
                data: {
                    "id": id,
                    "name": name,
                    "desc": desc,
                    "supplier": supplier,
                    "sources": sources,
                    "price": price,
                    "sales": sales,
                    "inventory": inventory,
                },
                success: function (data) {
                    layer.msg(data.msg,{icon:1,time:1000}, function () {
                        window.location.href = "/front/product-list";
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

