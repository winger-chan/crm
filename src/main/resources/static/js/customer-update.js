$(function () {
    $(function () {
        var editId = getQueryString('id');
        var editUser;
        var editEnter;

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

        getCustomers();
        function getCustomers() {
            $.ajax({
                url: "/customers/getCustomersById",
                type: "post",
                sync: false,
                cache: false,
                dataType: "json",
                data: {
                    "id": editId
                },
                success : function (data) {
                    fillCustomers(data.customers);
                }
            })
        }

        function fillCustomers(data){
            editEnter = data.enterprise_id;
            editUser = data.user_name;
            $('#name').val(data.name);

            if (data.sex == "男") {
                $("#sex-1").attr("checked","checked");
            } else {
                $("#sex-0").attr("checked","checked");
            }

            $('#department').val(data.department);
            $('#position').val(data.position);
            $('#birthday').val(data.birthday.substring(0, 10));
            $('#phone').val(data.phone);
            $('#email').val(data.email);
            $('#weChat').val(data.weChat);
            $('#qq').val(data.qq);
            $('#contact_desc').val(data.contact_desc);
            $('#requirement').val(data.requirement);
            $('#interest').val(data.interest);

            if (data.status == "潜在") {
                $('#status').find("option[value='潜在']").attr("selected", true);
            } else if (data.status == "签约") {
                $('#status').find("option[value='签约']").attr("selected", true);
            } else if (data.status == "正式") {
                $('#status').find("option[value='正式']").attr("selected", true);
            } else if (data.status == "放弃") {
                $('#status').find("option[value='放弃']").attr("selected", true);
            }
        }

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
                if (editEnter == item.id) {
                    html += '<option value="'+item.enterprise_id+" "+item.enterprise_name+'" selected>'+ item.enterprise_id + ' ' + item.enterprise_name+'</option>';
                } else {
                    html += '<option value="'+item.enterprise_id+" "+item.enterprise_name+'" >'+ item.enterprise_id + ' ' + item.enterprise_name+'</option>';
                }
            })
            $('#enter_id').html(html);
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
                url: "/customers/updateCustomers",
                type: "post",
                dataType: 'json',
                data: {
                    "id": editId,
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
                        window.location.href = "/front/customer-list";
                    });
                },
                error: function(XmlHttpRequest, textStatus, errorThrown){
                    layer.msg('error!',{icon:2,time:1000});
                }
            });
        });

        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURIComponent(r[2]);
            }
            return '';
        }

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
                if (item.user_name == editUser) {
                    html += '<option value="'+item.user_name+'" selected>'+item.user_name+'</option>';
                } else {
                    html += '<option value="'+item.user_name+'">'+item.user_name+'</option>';
                }
            });
            $('#user_name').html(html);
        }
    });
});
