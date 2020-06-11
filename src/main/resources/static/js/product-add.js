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

    window.onload = function () {
        var myDate = new Date();
        document.getElementById("time").value = myDate.toLocaleDateString();
        document.getElementById("user_name").value = current_name;
    };

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
                url: "/products/addProduct",
                type: "post",
                dataType: 'json',
                data: {
                    "name": name,
                    "desc": desc,
                    "supplier": supplier,
                    "sources": sources,
                    "price": price,
                    "sales": sales,
                    "inventory": inventory,
                    "user_name": current_name
                },
                success: function (data) {
                    layer.msg(data.msg,{icon:1,time:1000}, function () {
                        window.location.href = "/front/product-add";

                        var index = parent.layer.getFrameIndex(window.name);
                        parent.layer.close(index);
                    });
                },
                error: function(XmlHttpRequest, textStatus, errorThrown){
                    layer.msg('error!',{icon:2,time:1000});
                }
            });
        }
    });
});
