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

    getlist();
    function getlist(e) {
        document.getElementById("create_name").value = current_name;
    }

    $('.skin-minimal input').iCheck({
        checkboxClass: 'icheckbox-blue',
        radioClass: 'iradio-blue',
        increaseArea: '20%'
    });

    getEnters();
    function getEnters(e) {
        $.ajax({
            url: "/enterprises/getEnterprises",
            type: "get",
            dataType: "json",
            success: function (data) {
                showEnters(data.enterprises);
            }
        });
    }

    function showEnters(data) {
        var html = '';
        data.map(function (item, index) {
            html += '<option value="'+item.enterprise_id+" "+item.enterprise_name+'" >'+ item.enterprise_id + ' ' + item.enterprise_name+'</option>';
            $('#enter_id').html(html);
        })
    }

    $('#submit').click(function () {
        var enter = $('#enter_id option:selected').val();
        var enterprise = enter.split(" ");
        var enterprise_id = enterprise[0];
        var enterprise_name = enterprise[1];
        var name = $('#name').val();
        var sex = $("input[name='_sex']:checked").val();
        var department = $('#department').val();
        var position = $('#position').val();
        var birthday = new Date($('#birthday').val().replace('-','/'));
        var phone = $('#phone').val();
        var email = $('#email').val();
        var weChat = $('#weChat').val();
        var qq = $('#qq').val();
        var contact_time = $('#contact_time').val();
        var contact_desc = $('#contact_desc').val();
        var requirement = $('#requirement').val();
        var interest = $('#interest').val();
        var user_name = $('#user_name option:selected').val();
        var status = $('#status').val();
        $.ajax({
            url: "/customers/addCustomers",
            type: "post",
            dataType: 'json',
            data: {
                "enterprise_id": enterprise_id,
                "enterprise_name": enterprise_name,
                "name": name,
                "sex": sex,
                "department": department,
                "position": position,
                "birthday": birthday,
                "phone": phone,
                "email": email,
                "weChat": weChat,
                "qq": qq,
                "contact_time": contact_time,
                "contact_desc": contact_desc,
                "requirement": requirement,
                "interest": interest,
                "user_name": user_name,
                "create_name": current_name,
                "status": status
            },
            success: function (data) {
                layer.msg(data.msg,{icon:1,time:1000}, function () {
                    window.location.href = "/front/customer-add";

                    var index = parent.layer.getFrameIndex(window.name);
                    parent.$('.btn-refresh').click();
                    parent.layer.close(index);
                });
            },
            error: function(XmlHttpRequest, textStatus, errorThrown){
                layer.msg('error!',{icon:2,time:1000});
            }
        });
    })

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
        var html = '';
        data.map(function(item, index) {
            html += '<option value="'+item.user_name+'">'+item.user_name+'</option>';
        });
        $('#user_name').html(html);
    }
});
