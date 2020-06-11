package com.winger.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.winger.entity.Enterprises;
import com.winger.service.EnterprisesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/enterprises")
public class EnterprisesController {

    @Autowired
    private EnterprisesService enterprisesService;

    @ResponseBody
    @RequestMapping(value = "/getEnterprises", method = RequestMethod.GET)
    public Map<String, Object> getEnterprises() {
        Map<String, Object> map = new HashMap<String, Object>();
        List<Enterprises> enterprisesList = enterprisesService.getEnterprises();
        map.put("enterprises", enterprisesList);
        return map;
    }

    @ResponseBody
    @RequestMapping(value = "/addEnterprises", method = RequestMethod.POST)
    public Map<String, Object> addEnterprises(@RequestParam("enter_name") String enterprise_name,
                                           @RequestParam("enter_type") String enterprise_type,
                                           @RequestParam("enter_background") String enterprise_background,
                                           @RequestParam("listed") String listed,
                                           @RequestParam("reg_capital") String reg_capital,
                                           @RequestParam("year_sales") String year_sales,
                                           @RequestParam("enter_scale") String enter_scale,
                                           @RequestParam("url") String url,
                                           @RequestParam("zip_code") String zip_code,
                                           @RequestParam("address") String address,
                                           @RequestParam("main_products") String main_products,
                                           @RequestParam("major_services") String major_services,
                                           @RequestParam("status") String status,
                                           @RequestParam("user_name") String user_name,
                                           @RequestParam("create_name") String create_name) {
        Map<String, Object> map = new HashMap<String, Object>();
        Enterprises enterprises = new Enterprises();
        enterprises.setEnterprise_name(enterprise_name);
        enterprises.setEnterprise_type(enterprise_type);
        enterprises.setEnterprise_background(enterprise_background);
        enterprises.setListed(listed);
        if (!reg_capital.equals("")) {
            enterprises.setReg_capital(Integer.valueOf(reg_capital));
        }
        if (!year_sales.equals("")) {
             enterprises.setYear_sales(Integer.valueOf(year_sales));
        }
        if (!enter_scale.equals("")) {
            enterprises.setEnter_scale(Integer.valueOf(enter_scale));
        }
        enterprises.setUrl(url);
        enterprises.setZip_code(zip_code);
        enterprises.setAddress(address);
        enterprises.setMain_products(main_products);
        enterprises.setMajor_services(major_services);
        enterprises.setStatus(status);
        enterprises.setUser_name(user_name);
        enterprises.setCreate_name(create_name);
        Date date = new Date();
        enterprises.setCreate_time(date);
        if (enterprisesService.insertEnterprise(enterprises) > 0) {
            map.put("msg", "新增成功！");
        } else {
            map.put("msg", "新增失败！");
        }
        return map;
    }

   @ResponseBody
   @RequestMapping(value = "/showEnterprises", method = RequestMethod.GET)
   public Map<String, Object> updateShowEnterprises(@RequestParam("id") String id) {
       Map<String, Object> map = new HashMap<String, Object>();
       Enterprises enterprises = enterprisesService.getEnterprisesById(Integer.parseInt(id));
       map.put("enterprises", enterprises);
       return map;
   }

    @ResponseBody
    @RequestMapping(value = "/updateEnterprises", method = RequestMethod.POST)
    public Map<String, Object> updateEnterprises(@RequestParam("id") String id,
                                                 @RequestParam("enter_name") String enterprise_name,
                                                 @RequestParam("enter_type") String enterprise_type,
                                                 @RequestParam("enter_background") String enterprise_background,
                                                 @RequestParam("listed") String listed,
                                                 @RequestParam("reg_capital") String reg_capital,
                                                 @RequestParam("year_sales") String year_sales,
                                                 @RequestParam("enter_scale") String enter_scale,
                                                 @RequestParam("url") String url,
                                                 @RequestParam("zip_code") String zip_code,
                                                 @RequestParam("address") String address,
                                                 @RequestParam("main_products") String main_products,
                                                 @RequestParam("major_services") String major_services,
                                                 @RequestParam("status") String status,
                                                 @RequestParam("user_name") String user_name,
                                                 @RequestParam("create_name") String create_name) {
        Map<String, Object> map = new HashMap<String, Object>();
        Enterprises enterprises = new Enterprises();
        enterprises.setEnterprise_id(Integer.parseInt(id));
        enterprises.setEnterprise_name(enterprise_name);
        enterprises.setEnterprise_type(enterprise_type);
        enterprises.setEnterprise_background(enterprise_background);
        enterprises.setListed(listed);
        if (!reg_capital.equals("")) {
            enterprises.setReg_capital(Integer.valueOf(reg_capital));
        }
        if (!year_sales.equals("")) {
            enterprises.setYear_sales(Integer.valueOf(year_sales));
        }
        if (!enter_scale.equals("")) {
            enterprises.setEnter_scale(Integer.valueOf(enter_scale));
        }
        enterprises.setUrl(url);
        enterprises.setZip_code(zip_code);
        enterprises.setAddress(address);
        enterprises.setMain_products(main_products);
        enterprises.setMajor_services(major_services);
        enterprises.setStatus(status);
        enterprises.setUser_name(user_name);
        enterprises.setCreate_name(create_name);
        Date date = new Date();
        enterprises.setCreate_time(date);
        if (enterprisesService.updateEnterprise(enterprises) > 0) {
            map.put("msg", "修改成功！");
        } else {
            map.put("msg", "修改失败！");
        }
        return map;
    }

    @ResponseBody
    @RequestMapping(value = "/delEnterprises", method = RequestMethod.GET)
    public Map<String, Object> delEnterprises(@RequestParam("enterprise_id") String enterprise_id,
                                              @RequestParam("status") String status) {
        Map<String, Object> map = new HashMap<String, Object>();
        Enterprises enterprises = new Enterprises();
        if (!enterprise_id.equals("")) {
            enterprises.setEnterprise_id(Integer.parseInt(enterprise_id));
        }
        enterprises.setStatus(status);
        if (enterprisesService.delEnterprises(enterprises) > 0) {
            map.put("msg", "删除成功！");
        } else {
            map.put("msg", "目前没有处于放弃状态的企业信息！");
        }
        return map;
    }

    @ResponseBody
    @RequestMapping(value = "/queryEnterprises", method = RequestMethod.POST)
    public Map<String, Object> queryEnterprises(@RequestParam("enterprise_name") String enterprise_name,
                                              @RequestParam("listed") String listed,
                                              @RequestParam("enterprise_background") String enterprise_background,
                                              @RequestParam("status") String status,
                                              @RequestParam("user_name") String user_name) {
        Map<String, Object> map = new HashMap<String, Object>();
        Enterprises enterprises = new Enterprises();
        enterprises.setEnterprise_name(enterprise_name);
        enterprises.setListed(listed);
        enterprises.setEnterprise_background(enterprise_background);
        enterprises.setStatus(status);
        enterprises.setUser_name(user_name);
        List<Enterprises> enterprisesList = enterprisesService.queryEnterprises(enterprises);
        map.put("enterprises", enterprisesList);
        return map;
    }

    @ResponseBody
    @RequestMapping(value = "/queryCounts", method = RequestMethod.GET)
    public Map<String, Object> queryCounts() {
        Map<String, Object> map = new HashMap<String, Object>();
        int line = enterprisesService.queryCounts();
        map.put("line", line);
        return map;
    }

    @ResponseBody
    @RequestMapping(value = "/queryCountsBySelect", method = RequestMethod.GET)
    public Map<String, Object> queryCountsBySelect(@RequestParam("enterprise_name") String enterprise_name,
                                                @RequestParam("listed") String listed,
                                                @RequestParam("enterprise_background") String enterprise_background,
                                                @RequestParam("status") String status,
                                                @RequestParam("user_name") String user_name) {
        Map<String, Object> map = new HashMap<String, Object>();
        Enterprises enterprises = new Enterprises();
        enterprises.setEnterprise_name(enterprise_name);
        enterprises.setListed(listed);
        enterprises.setEnterprise_background(enterprise_background);
        enterprises.setStatus(status);
        enterprises.setUser_name(user_name);
        int line = enterprisesService.queryCountsBySelect(enterprises);
        map.put("line", line);
        return map;
    }
}
