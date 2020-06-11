package com.winger.controller;

import com.winger.entity.Customers;
import com.winger.entity.Enterprises;
import com.winger.service.CustomersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/customers")
public class CustomersController {

    @Autowired
    private CustomersService customersService;

    @RequestMapping(value = "/addCustomers" , method = RequestMethod.POST)
    public Map<String, String> addCustomers(@RequestParam("enterprise_id") String enterprise_id,
                                            @RequestParam("enterprise_name") String enterprise_name,
                                            @RequestParam("name") String name,
                                            @RequestParam("sex") String sex,
                                           @RequestParam("department") String department,
                                           @RequestParam("position") String position,
                                           @RequestParam("birthday") Date birthday,
                                           @RequestParam("phone") String phone,
                                           @RequestParam("email") String email,
                                           @RequestParam("weChat") String weChat,
                                           @RequestParam("qq") String qq,
                                           @RequestParam("contact_desc") String contact_desc,
                                           @RequestParam("requirement") String requirement,
                                           @RequestParam("interest") String interest,
                                            @RequestParam("user_name") String user_name,
                                            @RequestParam("create_name") String create_name,
                                           @RequestParam("status") String status) {
        Map<String, String> map = new HashMap<>();
        Customers customers = new Customers();
        customers.setEnterprise_id(Integer.parseInt(enterprise_id));
        customers.setEnterprise_name(enterprise_name);
        customers.setName(name);
        customers.setSex(sex);
        customers.setDepartment(department);
        customers.setPosition(position);
        customers.setBirthday(birthday);
        customers.setPhone(phone);
        customers.setEmail(email);
        customers.setWeChat(weChat);
        customers.setQq(qq);
        customers.setContact_desc(contact_desc);
        customers.setRequirement(requirement);
        customers.setInterest(interest);
        customers.setUser_name(user_name);
        customers.setCreate_name(create_name);
        customers.setStatus(status);
        String result = customersService.addCustomers(customers);
        map.put("msg",result);
        return  map;
    }

    @RequestMapping(value = "/customersList" , method = RequestMethod.GET)
    public Map<String,Object> customersList() {
        Map<String, Object> map = new HashMap<String, Object>();
        List<Customers> customers = customersService.customersList();
        map.put("customers", customers);
        return map;
    }
    @RequestMapping(value = "/delCustomers" , method = RequestMethod.GET)
    public Map<String,Object> delCustomers(@RequestParam("id") String id,
                                           @RequestParam("status") String status) {
        Map<String, Object> map = new HashMap<String, Object>();
        Customers customers = new Customers();
        if (!id.equals("")) {
            customers.setId(Integer.parseInt(id));
        }
        customers.setStatus(status);
        String result = customersService.delCustomers(customers);
        map.put("msg",result);
        return map;
    }

    @RequestMapping(value = "/getCustomersById" , method = RequestMethod.POST)
    public Map<String,Object> getCustomersById(@RequestParam("id") String id) {
        Map<String, Object> map = new HashMap<String, Object>();
        Customers customers = customersService.getCustomersById(Integer.parseInt(id));
        map.put("customers", customers);
        return map;
    }

    @RequestMapping(value = "/updateCustomers" , method = RequestMethod.POST)
    public Map<String, String> updateCustomers(@RequestParam("id") String id,
                                               @RequestParam("enterprise_id") String enterprise_id,
                                            @RequestParam("enterprise_name") String enterprise_name,
                                            @RequestParam("name") String name,
                                            @RequestParam("sex") String sex,
                                            @RequestParam("department") String department,
                                            @RequestParam("position") String position,
                                            @RequestParam("birthday") Date birthday,
                                            @RequestParam("phone") String phone,
                                            @RequestParam("email") String email,
                                            @RequestParam("weChat") String weChat,
                                            @RequestParam("qq") String qq,
                                            @RequestParam("contact_desc") String contact_desc,
                                            @RequestParam("requirement") String requirement,
                                            @RequestParam("interest") String interest,
                                            @RequestParam("user_name") String user_name,
                                            @RequestParam("create_name") String create_name,
                                            @RequestParam("status") String status) {
        Map<String, String> map = new HashMap<>();
        Customers customers = new Customers();
        customers.setId(Integer.parseInt(id));
        customers.setEnterprise_id(Integer.parseInt(enterprise_id));
        customers.setEnterprise_name(enterprise_name);
        customers.setName(name);
        customers.setSex(sex);
        customers.setDepartment(department);
        customers.setPosition(position);
        customers.setBirthday(birthday);
        customers.setPhone(phone);
        customers.setEmail(email);
        customers.setWeChat(weChat);
        customers.setQq(qq);
        customers.setContact_desc(contact_desc);
        customers.setRequirement(requirement);
        customers.setInterest(interest);
        customers.setUser_name(user_name);
        customers.setCreate_name(create_name);
        customers.setStatus(status);
        String result = customersService.updateCustomers(customers);
        map.put("msg",result);
        return  map;
    }

    @RequestMapping(value = "/queryCustomers" , method = RequestMethod.POST)
    public Map<String,Object> queryCustomers(@RequestParam("enter_name") String enter_name,
                                             @RequestParam("name") String name,
                                             @RequestParam("sex") String sex,
                                             @RequestParam("user_name") String user_name,
                                             @RequestParam("status") String status) {
        Map<String, Object> map = new HashMap<String, Object>();
        Customers customers = new Customers();
        customers.setEnterprise_name(enter_name);
        customers.setName(name);
        customers.setSex(sex);
        customers.setUser_name(user_name);
        customers.setStatus(status);
        List<Customers> customersList = customersService.queryCustomers(customers);
        map.put("customers", customersList);
        return map;
    }

    @ResponseBody
    @RequestMapping(value = "/queryCounts", method = RequestMethod.GET)
    public Map<String, Object> queryCounts() {
        Map<String, Object> map = new HashMap<String, Object>();
        int line = customersService.queryCounts();
        map.put("line", line);
        return map;
    }

    @ResponseBody
    @RequestMapping(value = "/queryCountsBySelect", method = RequestMethod.POST)
    public Map<String, Object> queryCountsBySelect(@RequestParam("enter_name") String enter_name,
                                                   @RequestParam("name") String name,
                                                   @RequestParam("sex") String sex,
                                                   @RequestParam("user_name") String user_name,
                                                   @RequestParam("status") String status) {
        Map<String, Object> map = new HashMap<String, Object>();
        Customers customers = new Customers();
        customers.setEnterprise_name(enter_name);
        customers.setName(name);
        customers.setSex(sex);
        customers.setUser_name(user_name);
        customers.setStatus(status);
        int line = customersService.queryCountsBySelect(customers);
        map.put("line", line);
        return map;
    }
}
