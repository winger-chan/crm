$.validator.setDefaults({
    submitHandler: function() {
        alert("修改成功!");
    }
});


$(function () {
    var user_name;
    var user_id = getQueryString("user_id");
    getlist();
    function getlist(e) {
        user_name = getQueryString("user_name");
        $.ajax({
            url: "/users/selectuser",
            async: false,
            cache: false,
            type: "post",
            dataType: 'json',
            data: {
                "user_name": user_name
            },
            success: function (data) {
                var users = data.users;
                $('#adminName').val(users.user_name);
                $('#realName').val(users.realname);
                $('#_password').val(users.password);
                $('#confirmPassword').val(users.password);

                if (users.sex == "男") {
                    $("#sex-1").attr("checked","checked");
                } else {
                    $("#sex-0").attr("checked","checked");
                }

                $('#_birthday').val(users.birthday.substring(0, 10));
                $('#phone').val(users.phone);
                $('#email').val(users.email);

                if (users.userPosition == "业务员") {
                    $("#_userPosition").find("option[value='业务员']").attr("selected", true);
                } else if (users.userPosition == "销售员") {
                    $("#_userPosition").find("option[value='销售员']").attr("selected", true);
                } else if (users.userPosition == "推销员") {
                    $("#_userPosition").find("option[value='推销员']").attr("selected", true);
                } else if (users.userPosition == "业务经理") {
                    $("#_userPosition").find("option[value='业务经理']").attr("selected", true);
                } else if (users.userPosition == "销售经理") {
                    $("#_userPosition").find("option[value='销售经理']").attr("selected", true);
                }

                if (users.role == "admin") {
                    $("#_role").find("option[value='admin']").attr("selected", true);
                } else if (users.role == "user") {
                    $("#_role").find("option[value='user']").attr("selected", true);
                }

                $("#_remark").val(users.remark);
            }
        });
    }

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return '';
    }

    $("#form-admin-add").validate({
        rules:{
            adminName:{
                required:true,
                maxlength:16
            },
            _password:{
                required:true,
                minlength:6
            },
            confirmPassword:{
                required:true,
                minlength: 6,
                equalTo: "#_password"
            },
            _sex:{
                required:true
            },
            _birthday: {
                required:true
            },
            phone:{
                required:true,
                isPhone:true
            },
            email:{
                required:true,
                email:true
            }
        },
        messages: {
            adminName: "请输入你的名字",
            _password: {
                required: "请输入密码",
                minlength: "密码长度不能小于6"
            },
            confirmPassword: {
                required: "请再次输入密码",
                minlength: "密码长度不能小于6",
                equalTo: "两次密码输入不一致"
            },
            phone: {
                required: "请输入你的手机号码",
                isPhone: "请输入正确的手机格式"
            },
            email: {
                required: "请输入你的邮箱地址",
                email: "请输入正确的邮箱格式"
            }
        },
        onkeyup:false,
        focusCleanup:true,
        success:"valid",
        submitHandler:function(form){
            var username = $('#adminName').val();
            $.ajax({
                url: "/users/checkname",
                async: false,
                cache: false,
                type: "post",
                dataType: 'json',
                data: {
                    "username": username,
                },
                success: function (data) {
                    if(data.msg == "用户名可以使用！" || username == user_name) {
                        var realname = $('#realName').val();
                        var password = $('#_password').val();
                        var sex = $("input[name='_sex']:checked").val();
                        var birthday = new Date($('#_birthday').val().replace('-','/'));
                        var user_phone = $('#phone').val();
                        var user_email = $('#email').val();
                        var userPosition = $('#_userPosition option:selected').val();
                        var role = $('#_role option:selected').val();
                        var remark = $('#_remark').val();
                        $(form).ajaxSubmit({
                            url: "/users/updateuser",
                            async: false,
                            cache: false,
                            type: 'post',
                            dataType: 'json',
                            data: {
                                "user_id": user_id,
                                "username": username,
                                "realname": realname,
                                "password": password,
                                "sex": sex,
                                "birthday": birthday,
                                "user_phone": user_phone,
                                "user_email": user_email,
                                "remark": remark
                            },
                            success: function(data){
                                layer.msg('修改成功!',{icon:1,time:1000}, function () {
                                    window.location.href = "/front/user-list";
                                });
                            },
                            error: function(XmlHttpRequest, textStatus, errorThrown){
                                layer.msg('error!',{icon:2,time:1000});
                            }
                        });
                        var index = parent.layer.getFrameIndex(window.name);
                        parent.$('.btn-refresh').click();
                        parent.layer.close(index);
                    } else {
                        layer.msg(data.msg,{icon:2,time:1000});
                    }
                }
            });
        }
    });
})
