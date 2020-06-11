package com.winger.service.impl;

import com.winger.entity.Users;
import com.winger.mapper.UsersMapper;
import com.winger.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsersServiceImpl implements UsersService {

    @Autowired
    private UsersMapper usersMapper;

    @Override
    public Users login(String username, String password) {
        Users user = new Users();
        user.setUser_name(username);
        user.setPassword(password);
        Users result = usersMapper.login(user);
        if (result != null) {
            return result;
        } else {
            return null;
        }
    }

    @Override
    public String selectRole(String user_name) {
        String role = usersMapper.selectRole(user_name);
        return role;
    }

    @Override
    public String createUsers(Users user) {
        int result = usersMapper.register(user);
        if (result > 0) {
            return "创建用户成功！";
        } else {
            return "创建用户失败！";
        }
    }

    @Override
    public String editUsers(String editname, String editPosition) {
        int result = usersMapper.updateUsers(editname, editPosition);
        if (result > 0) {
            return "修改用户成功！";
        } else {
            return "修改用户失败！";
        }
    }

    @Override
    public String delUsers(String username) {
        int result = usersMapper.deleteUsers(username);
        if (result > 0) {
            return "删除用户成功！";
        } else {
            return "删除用户失败！";
        }
    }

    @Override
    public List<Users> listUsers() {
        List<Users> users = new ArrayList<Users>();
        users = usersMapper.selectAll();
        return users;
    }

    @Override
    public List<Users> selectUsers(Users user) {
        List<Users> users = new ArrayList<Users>();
        users = usersMapper.selectUsers(user);
        return users;
    }

    //检测用户名
    @Override
    public String checkname(String username) {
        int result = usersMapper.checkname(username);
        if (result > 0) {
            return "用户名已存在，不能使用！";
        } else {
            return "用户名可以使用！";
        }
    }

    //查询用户
    @Override
    public Users queryuser(String user_name) {
        return usersMapper.queryuser(user_name);
    }

    @Override
    public boolean updateUser(Users user) {
        int result = usersMapper.updateUser(user);
        if (result>0){
            return  true;
        }else {
            return false;
        }
    }

    @Override
    public boolean updateRole(String role, String editname) {
        int result = usersMapper.updateRole(role, editname);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean updateStatus(Users user) {
        int result = usersMapper.updateStatus(user);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public int selectCounts(Users users) {
        int result = usersMapper.selectCounts(users);
        return result;
    };
}
