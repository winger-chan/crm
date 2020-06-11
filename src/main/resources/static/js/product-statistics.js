$(function () {
    $("#submit").click(function () {
        var product_id = $('#product_id').val();
        var product_name = $('#product_name').val();
        var years = $('#years').val();
        var january = $('#january').val();
        var february = $('#february').val();
        var march = $('#march').val();
        var april = $('#april').val();
        var may = $('#may').val();
        var june = $('#june').val();
        var july = $('#july').val();
        var august = $('#august').val();
        var september = $('#september').val();
        var october = $('#october').val();
        var november = $('#november').val();
        var december = $('#december').val();
        var yearSales = $('#yearSales').val();
        $.ajax({
            url: "/sales/addSale",
            type: "post",
            dataType: 'json',
            data: {
                "product_id": product_id,
                "product_name": product_name,
                "years": years,
                "january": january,
                "february": february,
                "march": march,
                "april": april,
                "may": may,
                "june": june,
                "july": july,
                "august": august,
                "september": september,
                "october": october,
                "november": november,
                "december": december,
                "yearSales": yearSales
            },
            success: function (data) {
                layer.msg(data.msg,{icon:1,time:1000}, function () {
                    window.location.href = "/front/product-statistics";

                    var index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);
                });
            },
            error: function(XmlHttpRequest, textStatus, errorThrown){
                layer.msg('error!',{icon:2,time:1000});
            }
        });
    });
});

