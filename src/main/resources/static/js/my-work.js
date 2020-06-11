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

    queryEnterprises();
    function queryEnterprises() {
        $.ajax({
            url: "/enterprises/queryEnterprises",
            type: "post",
            dataType: 'json',
            data: {
                "enterprise_name": null,
                "listed": null,
                "enterprise_background": null,
                "status": null,
                "user_name": current_name,
            },
            success: function (data) {
                showEnter(data.enterprises);
            }
        });
    }

    function showEnter(data) {
        var html = '';
        data.map(function(item, index) {
			html += item.enterprise_name + '、';
		});
		$('#enter').text(html);
    }

    queryCustomers();
    function queryCustomers() {
        $.ajax({
            url: "/customers/queryCustomers",
            type: "post",
            dataType: 'json',
            data: {
                "enter_name": null,
                "name": null,
                "sex": null,
                "user_name": current_name,
                "status": null,
            },
            success: function (data) {
                showCustomers(data.customers);
            }
        });
    }

    function showCustomers(data) {
        var html = '';
        data.map(function(item, index) {
			html += item.name + '、';
		});
		$('#customer').text(html);
    }
});
