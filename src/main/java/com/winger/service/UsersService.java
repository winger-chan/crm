package com.winger.service;

import com.winger.entity.Users;

import java.util.List;

public interface UsersService {

    //登录
    public Users login(String username, String password);

    //系统管理员创建用户信息，默认角色为销售
    public String createUsers(Users user);

    //权限查询
    public String selectRole(String user_name);

    //系统管理员对系统所有用户进行编辑
    public String editUsers(String editname, String editPosition);

    //系统管理员对系统所有用户进行删除
    public String delUsers(String user_name);

    //系统管理员对系统所有用户进行查看
    public List<Users> listUsers();

    //查询满足条件的Users
    public List<Users> selectUsers(Users user);

    //检测用户名
    public String checkname(String username);

    //查询用户
    public Users queryuser(String user_name);

    public  boolean updateUser(Users user);

    public  boolean updateRole(String role, String editname);

    public  boolean updateStatus(Users user);

    public int selectCounts(Users users);
}
