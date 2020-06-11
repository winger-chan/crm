package com.winger.mapper;

import com.winger.entity.Users;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UsersMapper {
    //登陆
    public Users login(Users users);

    //注册
    public int register(Users user);

    //权限查询
    public String selectRole(String user_name);

    //删除用户
    public int deleteUsers(String user_name);

    //查看用户
    public List<Users> selectAll();

    //编辑用户
    public int updateUsers(@Param("editname") String editname, @Param("editPosition") String editPosition);

    //查询满足条件的用户
    public List<Users> selectUsers(Users user);

    public int checkname(String username);

    public Users queryuser(String user_name);

    public int updateUser(Users user);

    public int updateRole(@Param("role") String role, @Param("editname") String editname);

    public int updateStatus(Users user);

    public int selectCounts(Users users);
}
