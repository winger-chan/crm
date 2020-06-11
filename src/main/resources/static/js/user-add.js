$.validator.setDefaults({
    submitHandler: function() {
        alert("添加成功!");
    }
});

$(function () {
    $('.skin-minimal input').iCheck({
        checkboxClass: 'icheckbox-blue',
        radioClass: 'iradio-blue',
        increaseArea: '20%'
    });

    var current_role;
    getRole();
    function getRole() {
        $.ajax({
            url: "/users/getRole",
            type: "post",
            dataType: "json",
            success: function (data) {
                current_role = data.role;
                if (current_role == "user") {
                    $('#_role').html('<option value="user">user</option>');
                }
            }
        });
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
            },
            _userPosition:{
                required:true
            },
            _role:{
                required:true
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
                    if(data.msg == "用户名可以使用！") {
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
                            url: "/users/addUsers",
                            async: false,
                            cache: false,
                            type: 'post',
                            dataType: 'json',
                            data: {
                                "username": username,
                                "realname": realname,
                                "password": password,
                                "sex": sex,
                                "birthday": birthday,
                                "user_phone": user_phone,
                                "user_email": user_email,
                                "userPosition": userPosition,
                                "role": role,
                                "remark": remark
                            },
                            success: function(data){
                                layer.msg(data.msg,{icon:1,time:1000}, function () {
                                    window.location.href = "/front/user-add";

                                    var index = parent.layer.getFrameIndex(window.name);
                                    parent.$('.btn-refresh').click();
                                    parent.layer.close(index);
                                });
                            },
                            error: function(XmlHttpRequest, textStatus, errorThrown){
                                layer.msg('error!',{icon:2,time:1000});
                            }
                        });
                    } else {
                        layer.msg(data.msg,{icon:2,time:1000});
                    }
                }
            });
        }
    });

    $("#check_username").click(function () {
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
                if (data.msg == "用户名可以使用！") {
                    layer.msg(data.msg, {icon: 1, time: 1000});
                }
                else if(data.msg == "用户名已存在，不能使用！") {
                    layer.msg(data.msg, {icon: 2, time: 1000});
                }
            }
        });
    });
});
