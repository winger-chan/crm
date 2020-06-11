package com.winger.controller;

import com.winger.entity.Users;
import com.winger.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/users")
public class UsersController {
    @Autowired
    private UsersService usersService;

    //登录、检查账号状态
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Map<String, Object> login(@RequestParam("username") String username,
                                     @RequestParam("password") String password,
                                     HttpServletRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        Users result = usersService.login(username, password);
        String role = usersService.selectRole(username);
        if (result != null) {
            if (result.getStatus() == 0) {
                map.put("success", false);
                map.put("msg", "用户已被禁用!");
                return map;
            }
            request.getSession().setAttribute("username", username);
            request.getSession().setAttribute("role", role);
            map.put("success", true);
            map.put("msg", "登录成功");
        } else {
            map.put("success", false);
            map.put("msg", "用户名或密码错误！");
        }
        return map;
    }

    @RequestMapping(value = "/loginOut", method = RequestMethod.GET)
    public void loginOut(HttpServletRequest request) {
        request.getSession().setAttribute("username", null);
    }

    //系统管理员创建用户信息，默认角色为业务
    @RequestMapping(value = "/addUsers", method = RequestMethod.POST)
    public Map<String, Object> addUsers(@RequestParam("username") String username,
                                        @RequestParam("realname") String realname,
                                        @RequestParam("password") String password,
                                        @RequestParam("sex") String sex,
                                        @RequestParam("birthday") Date birthday,
                                        @RequestParam("phone") String user_phone,
                                        @RequestParam("email") String user_email,
                                        @RequestParam("userPosition") String userPosition,
                                        @RequestParam("role") String role,
                                        @RequestParam("remark") String remark) throws ParseException {
        Map<String, Object> map = new HashMap<String, Object>();
        Users user = new Users();
        user.setUser_name(username);
        user.setRealname(realname);
        user.setPassword(password);
        user.setSex(sex);
        user.setBirthday(birthday);
        user.setPhone(user_phone);
        user.setEmail(user_email);
        user.setUserPosition(userPosition);
        user.setRole(role);
        user.setRemark(remark);
        user.setStatus(1);
        String result = usersService.createUsers(user);
        map.put("msg", result);
        return map;
    }

    @RequestMapping(value = "/selectUsers", method = RequestMethod.POST)
    public Map<String, Object> selectUsers(@RequestParam("select_username") String username,
                                           @RequestParam("select_sex") String sex,
                                           @RequestParam("select_phone") String phone) {
        Map<String, Object> map = new HashMap<String, Object>();
        Users user = new Users();
        user.setRealname(username);
        user.setSex(sex);
        user.setPhone(phone);
        user.setStatus(100);
        List<Users> users = usersService.selectUsers(user);
        map.put("users", users);
        return map;
    }

    @RequestMapping(value = "/selectUsersByPosition", method = RequestMethod.POST)
    public Map<String, Object> selectUsersByPosition(@RequestParam("select_username") String username,
                                                     @RequestParam("select_sex") String sex,
                                                     @RequestParam("select_position") String position) {
        Map<String, Object> map = new HashMap<String, Object>();
        Users user = new Users();
        user.setRealname(username);
        user.setSex(sex);
        user.setUserPosition(position);
        user.setStatus(100);
        List<Users> users = usersService.selectUsers(user);
        map.put("users", users);
        return map;
    }

    @RequestMapping(value = "/selectUsersByRole", method = RequestMethod.POST)
    public Map<String, Object> selectUsersByRole(@RequestParam("select_username") String username,
                                                 @RequestParam("select_sex") String sex,
                                                 @RequestParam("select_role") String role,
                                                 @RequestParam("select_status") String status) {
        Map<String, Object> map = new HashMap<String, Object>();
        Users user = new Users();
        user.setRealname(username);
        user.setSex(sex);
        user.setRole(role);
        user.setStatus(Integer.parseInt(status));
        List<Users> users = usersService.selectUsers(user);
        map.put("users", users);
        return map;
    }

    //修改用户角色
    @RequestMapping(value = "/editUsers", method = RequestMethod.POST)
    public Map<String, Object> editUsers(@RequestParam("editname") String editname,
                                         @RequestParam("editPosition") String editPosition) {
        Map<String, Object> map = new HashMap<String, Object>();
        String result = usersService.editUsers(editname, editPosition);
        map.put("msg", result);
        return map;
    }

    //系统管理员对系统所有用户进行删除
    @RequestMapping(value = "/delUsers", method = RequestMethod.GET)
    public Map<String, Object> delUsers(@RequestParam("del_user_name") String del_user_name,
                                        @RequestParam("role") String role) {
        Map<String, Object> map = new HashMap<String, Object>();
        String result = usersService.delUsers(del_user_name);
        map.put("msg", result);
        return map;
    }

    //系统管理员对系统所有用户进行查看
    @RequestMapping(value = "/listUsers", method = RequestMethod.GET)
    public Map<String, Object> listUsers() {
        Map<String, Object> map = new HashMap<String, Object>();
        List<Users> users = new ArrayList<Users>();
        users = usersService.listUsers();
        map.put("users", users);
        return map;
    }

    //权限查询
    @RequestMapping(value = "/selectRole", method = RequestMethod.GET)
    public Map<String, Object> selectRole(@RequestParam("user_name") String user_name) {
        Map<String, Object> map = new HashMap<>();
        String role = usersService.selectRole(user_name);
        map.put("role", role);
        return map;
    }

    //获取session
    @RequestMapping(value = "/session", method = RequestMethod.POST)
    public Map<String, Object> session(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("session", request.getSession().getAttribute("username"));
        return map;
    }

    //获取role
    @RequestMapping(value = "/getRole", method = RequestMethod.POST)
    public Map<String, Object> getRole(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("role", request.getSession().getAttribute("role"));
        return map;
    }

    //检测用户名
    @RequestMapping(value = "/checkname", method = RequestMethod.POST)
    public Map<String, Object> checkname(@RequestParam("username") String username) {
        Map<String, Object> map = new HashMap<String, Object>();
        String result = usersService.checkname(username);
        map.put("msg", result);
        return map;
    }

    @RequestMapping(value = "/selectuser", method = RequestMethod.POST)
    public Map<String, Object> selectuser(@RequestParam("user_name") String user_name) {
        Map<String, Object> map = new HashMap<String, Object>();
        Users result = usersService.queryuser(user_name);
        map.put("users", result);
        return map;
    }

    @RequestMapping(value = "/updateuser", method = RequestMethod.POST)
    public Map<String, Object> updateUser(@RequestParam("user_id") String user_id,
                                          @RequestParam("username") String username,
                                          @RequestParam("realname") String realname,
                                          @RequestParam("password") String password,
                                          @RequestParam("sex") String sex,
                                          @RequestParam("birthday") Date birthday,
                                          @RequestParam("user_phone") String user_phone,
                                          @RequestParam("user_email") String user_email,
                                          @RequestParam("remark") String remark) throws ParseException {
        Map<String, Object> map = new HashMap<String, Object>();
        Users user = new Users();
        user.setUser_id(Integer.parseInt(user_id));
        user.setUser_name(username);
        user.setRealname(realname);
        user.setPassword(password);
        user.setSex(sex);
        user.setBirthday(birthday);
        user.setPhone(user_phone);
        user.setEmail(user_email);
        user.setRemark(remark);
        boolean result = usersService.updateUser(user);
        map.put("msg",result);
        return map;
    }

    @RequestMapping(value = "/updateRole", method = RequestMethod.POST)
    public Map<String, Object> updateRole(@RequestParam("role") String role,
                                          @RequestParam("editname") String editname) {
        Map<String, Object> map = new HashMap<String, Object>();
        boolean result = usersService.updateRole(role, editname);
        map.put("msg", result);
        return map;
    }

    @RequestMapping(value = "/updateStatus", method = RequestMethod.POST)
    public Map<String, Object> updateStatus(@RequestParam("editstatus") String editstatus,
                                            @RequestParam("editname") String editname) {
        Map<String, Object> map = new HashMap<String, Object>();
        Users user = new Users();
        user.setStatus(Integer.parseInt(editstatus));
        user.setUser_name(editname);
        boolean result = usersService.updateStatus(user);
        map.put("users", result);
        return map;
    }

    @RequestMapping(value = "/selectCounts", method = RequestMethod.GET)
    public Map<String, Object> selectCounts() {
        Map<String, Object> map = new HashMap<String, Object>();
        Users users = new Users();
        users.setStatus(100);
        int result = usersService.selectCounts(users);
        map.put("line", result);
        return map;
    }

    @RequestMapping(value = "/selectCountsByQuery", method = RequestMethod.GET)
    public Map<String, Object> selectCountsByQuery(@RequestParam("select_username") String username,
                                            @RequestParam("select_sex") String sex,
                                            @RequestParam("select_phone") String phone,
                                            @RequestParam("select_position") String position,
                                            @RequestParam("select_role") String role,
                                            @RequestParam("select_status") String status) {
        Map<String, Object> map = new HashMap<String, Object>();
        Users users = new Users();
        users.setRealname(username);
        users.setSex(sex);
        users.setPhone(phone);
        users.setUserPosition(position);
        users.setRole(role);
        users.setStatus(Integer.parseInt(status));
        int result = usersService.selectCounts(users);
        map.put("line", result);
        return map;
    }
}
