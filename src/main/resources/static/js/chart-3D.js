$(function () {
    var firstName;
    var secondName;
    var thirdName;
    var fourthName;
    var firstSales;
    var secondSales;
    var thirdSales;
    var fourthSales;

    getProducts();
    function getProducts() {
        $.ajax({
            url: "/products/getProducts",
            type: "post",
            datatype: "json",
            success: function (data) {
                display(data.products);
            }
        })
    }

    limit();
    function limit() {
        $.ajax({
            url: "/sales/getLimit",
            type: "post",
            dataType: "json",
            success: function (data) {
                showLimit(data.sales);
            }
        })
    }

    function showLimit(data) {
        firstName=data[0].product_name;
        secondName=data[1].product_name;
        thirdName=data[2].product_name;
        fourthName=data[3].product_name;
        firstSales=data[0].yearSales;
        secondSales=data[1].yearSales;
        thirdSales=data[2].yearSales;
        fourthSales=data[3].yearSales;
        chart();
    }


    function display(data) {
        var html = '';
        data.map(function (item, index) {
            html += '<option value="'+item.id+ " " +item.name+'" >'+ item.id + ' ' + item.name+'</option>';
        });
        $('#selectOne').html(html);
        $('#selectTwo').html(html);
        $('#selectThree').html(html);
        $('#selectFour').html(html);
    }


    $('#query_data').click(function () {
        var first = $('#selectOne option:selected').val().split(" ")[0];
        firstName = $('#selectOne option:selected').val().split(" ")[1];
        var second = $('#selectTwo option:selected').val().split(" ")[0];
        secondName = $('#selectTwo option:selected').val().split(" ")[1];
        var third = $('#selectThree option:selected').val().split(" ")[0];
        thirdName = $('#selectThree option:selected').val().split(" ")[1];
        var fourth = $('#selectFour option:selected').val().split(" ")[0];
        fourthName = $('#selectFour option:selected').val().split(" ")[1];
        var years = $('#years option:selected').val();
        $.ajax({
            url: "/sales/getSaleById",
            type: "post",
            datatype: "json",
            data: {
                "id": first,
                "years": years
            },
            success: function (data) {
                if (data.sale == null) {
                    firstSales=null;
                }else if (data.sale.years == years) {
                    firstSales=data.sale.yearSales;
                }
            }
        });
        $.ajax({
            url: "/sales/getSaleById",
            type: "post",
            datatype: "json",
            data: {
                "id": second,
                "years": years
            },
            success: function (data) {
                if (data.sale == null) {
                    secondSales=null;
                }else if (data.sale.years == years) {
                    secondSales=data.sale.yearSales;
                }
            }
        });
        $.ajax({
            url: "/sales/getSaleById",
            type: "post",
            datatype: "json",
            data: {
                "id": third,
                "years": years
            },
            success: function (data) {
                if (data.sale == null) {
                    thirdSales=null;
                } else if (data.sale.years == years) {
                    thirdSales=data.sale.yearSales;
                }
            }
        });
        $.ajax({
            url: "/sales/getSaleById",
            type: "post",
            datatype: "json",
            data: {
                "id": fourth,
                "years": years
            },
            success: function (data) {
                if (data.sale == null) {
                    fourthSales=null;
                } else if (data.sale.years == years) {
                    fourthSales=data.sale.yearSales;
                }
            }
        });
        chart();
    });

    function chart() {
        $('#container').highcharts({
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: 'Product annual sales percentage'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Annual sales',
                data: [
                    [firstName,   firstSales],
                    [secondName,       secondSales],
                    {
                        name: thirdName,
                        y: thirdSales,
                        sliced: true,
                        selected: true
                    },
                    [fourthName,    fourthSales]
                ]
            }]
        });
    }
});
