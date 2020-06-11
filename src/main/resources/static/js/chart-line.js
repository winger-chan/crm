$(function () {
    var firstName;
    var secondName;
    var thirdName;
    var fourthName;
    var arrayOne = new Array([12]);
    var arrayTwo = new Array([12]);
    var arrayThree = new Array([12]);
    var arrayFour = new Array([12]);

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
        arrayOne=[data[0].january, data[0].february, data[0].march, data[0].april, data[0].may, data[0].june, data[0].july, data[0].august, data[0].september, data[0].october, data[0].november, data[0].december];
        secondName=data[1].product_name;
        arrayTwo=[data[1].january, data[1].february, data[1].march, data[1].april, data[1].may, data[1].june, data[1].july, data[1].august, data[1].september, data[1].october, data[1].november, data[1].december];
        thirdName=data[2].product_name;
        arrayThree=[data[2].january, data[2].february, data[2].march, data[2].april, data[2].may, data[2].june, data[2].july, data[2].august, data[2].september, data[2].october, data[2].november, data[2].december];
        fourthName=data[3].product_name;
        arrayFour=[data[3].january, data[3].february, data[3].march, data[3].april, data[3].may, data[3].june, data[3].july, data[3].august, data[3].september, data[3].october, data[3].november, data[3].december];
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
                    arrayOne=[0,0,0,0,0,0,0,0,0,0,0,0];
                }else if (data.sale.years == years) {
                    arrayOne=[data.sale.january, data.sale.february, data.sale.march, data.sale.april, data.sale.may, data.sale.june, data.sale.july, data.sale.august, data.sale.september, data.sale.october, data.sale.november, data.sale.december];
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
                    arrayTwo=[0,0,0,0,0,0,0,0,0,0,0,0];
                }else if (data.sale.years == years) {
                    arrayTwo=[data.sale.january, data.sale.february, data.sale.march, data.sale.april, data.sale.may, data.sale.june, data.sale.july, data.sale.august, data.sale.september, data.sale.october, data.sale.november, data.sale.december];
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
                    arrayThree=[0,0,0,0,0,0,0,0,0,0,0,0];
                } else if (data.sale.years == years) {
                    arrayThree=[data.sale.january, data.sale.february, data.sale.march, data.sale.april, data.sale.may, data.sale.june, data.sale.july, data.sale.august, data.sale.september, data.sale.october, data.sale.november, data.sale.december];
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
                    arrayFour=[0,0,0,0,0,0,0,0,0,0,0,0];
                } else if (data.sale.years == years) {
                    arrayFour=[data.sale.january, data.sale.february, data.sale.march, data.sale.april, data.sale.may, data.sale.june, data.sale.july, data.sale.august, data.sale.september, data.sale.october, data.sale.november, data.sale.december];
                }
            }
        });
        chart();
    });

    function chart() {
        Highcharts.chart('container', {
            title: {
                text: 'Monthly Average Sales',
                x: -20 //center
            },
            subtitle: {
                text: '明日文化有限公司',
                x: -20
            },
            xAxis: {
                categories: ['一月', '二月', '三月', '四月', '五月', '六月','七月', '八月', '九月', '十月', '十一月', '十二月']
            },
            yAxis: {
                title: {
                    text: 'Sales (件)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '件'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: firstName,
                data: arrayOne
            }, {
                name: secondName,
                data: arrayTwo
            }, {
                name: thirdName,
                data: arrayThree
            }, {
                name: fourthName,
                data: arrayFour
            }]
        });
    }
});
