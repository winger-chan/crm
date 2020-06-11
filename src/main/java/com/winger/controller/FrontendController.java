package com.winger.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/front")
public class FrontendController {

    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String login() {
        return "index";
    }

    @RequestMapping(value = "/home", method = RequestMethod.GET)
    public String index() {
        return "home";
    }

    @RequestMapping(value = "/user-add", method = RequestMethod.GET)
    public String userAdd() {
        return "user-add";
    }

    @RequestMapping(value = "/user-list", method = RequestMethod.GET)
    public String userList() {
        return "user-list";
    }

    @RequestMapping(value = "/user-position", method = RequestMethod.GET)
    public String userPosition() {
        return "user-position";
    }

    @RequestMapping(value = "/user-role", method = RequestMethod.GET)
    public String userRole() {
        return "user-role";
    }

    @RequestMapping(value = "/user-update", method = RequestMethod.GET)
    public String userUpdate() {
        return "user-update";
    }

    @RequestMapping(value = "/customer-add", method = RequestMethod.GET)
    public String contactAdd() {
        return "customer-add";
    }

    @RequestMapping(value = "/customer-list", method = RequestMethod.GET)
    public String contactList() {
        return "customer-list";
    }

    @RequestMapping(value = "/customer-update", method = RequestMethod.GET)
    public String contactUpdate() {
        return "customer-update";
    }

    @RequestMapping(value = "/enterprise-add", method = RequestMethod.GET)
    public String enterpriseAdd() {
        return "enterprise-add";
    }

    @RequestMapping(value = "/enterprise-list", method = RequestMethod.GET)
    public String enterpriseList() {
        return "enterprise-list";
    }

    @RequestMapping(value = "/enterprise-update", method = RequestMethod.GET)
    public String enterpriseUpdate() {
        return "enterprise-update";
    }

    @RequestMapping(value = "/article-add", method = RequestMethod.GET)
    public String articleAdd() {
        return "article-add";
    }

    @RequestMapping(value = "/article-list", method = RequestMethod.GET)
    public String articleList() {
        return "article-list";
    }

    @RequestMapping(value = "/article-update", method = RequestMethod.GET)
    public String articleUpdate() {
        return "article-update";
    }

    @RequestMapping(value = "/log-add", method = RequestMethod.GET)
    public String logAdd() {
        return "log-add";
    }

    @RequestMapping(value = "/log-list", method = RequestMethod.GET)
    public String logList() {
        return "log-list";
    }

    @RequestMapping(value = "/log-update", method = RequestMethod.GET)
    public String logUpdate() {
        return "log-update";
    }

    @RequestMapping(value = "/product-add", method = RequestMethod.GET)
    public String productAdd() {
        return "product-add";
    }

    @RequestMapping(value = "/product-list", method = RequestMethod.GET)
    public String productList() {
        return "product-list";
    }

    @RequestMapping(value = "/product-update", method = RequestMethod.GET)
    public String productUpdate() {
        return "product-update";
    }

    @RequestMapping(value = "/product-statistics", method = RequestMethod.GET)
    public String productStatistics() {
        return "product-statistics";
    }

    @RequestMapping(value = "/chart-sale", method = RequestMethod.GET)
    public String chartSale() {
        return "chart-sale";
    }

    @RequestMapping(value = "/chart-sale-update", method = RequestMethod.GET)
    public String chartSaleUpdate() {
        return "chart-sale-update";
    }

    @RequestMapping(value = "/order-add", method = RequestMethod.GET)
    public String orderAdd() {
        return "order-add";
    }

    @RequestMapping(value = "/order-list", method = RequestMethod.GET)
    public String orderList() {
        return "order-list";
    }

    @RequestMapping(value = "/order-update", method = RequestMethod.GET)
    public String orderUpdate() {
        return "order-update";
    }

    @RequestMapping(value = "/chart-line", method = RequestMethod.GET)
    public String chartLine() {
        return "chart-line";
    }

    @RequestMapping(value = "/chart-3D", method = RequestMethod.GET)
    public String chart3D() {
        return "chart-3D";
    }

    @RequestMapping(value = "/my-work", method = RequestMethod.GET)
    public String myWork() {
        return "my-work";
    }
}
