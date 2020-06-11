package com.winger.controller;

import com.winger.entity.Orders;
import com.winger.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
public class OrdersController {
    @Autowired
    private OrdersService ordersService;

    @RequestMapping(value = "/addOrder", method = RequestMethod.POST)
    public Map<String, Object> addOrder(@RequestParam("name") String name,
                                        @RequestParam("price") String price,
                                        @RequestParam("count") String count,
                                        @RequestParam("buyer") String buyer,
                                        @RequestParam("phone") String phone,
                                        @RequestParam("address") String address,
                                        @RequestParam("create_time")Date create_time) {
        Map<String , Object> map = new HashMap<>();
        Orders orders = new Orders();
        orders.setName(name);
        orders.setPrice(price);
        orders.setCount(count);
        orders.setBuyer(buyer);
        orders.setPhone(phone);
        orders.setAddress(address);
        orders.setCreate_time(create_time);
        map.put("msg", ordersService.addOrder(orders));
        return map;
    }

    @RequestMapping(value = "/getOrders", method = RequestMethod.POST)
    public Map<String, Object> getOrders() {
        Map<String, Object> map = new HashMap<>();
        List<Orders> orders = ordersService.getOrders();
        map.put("orders", orders);
        return map;
    }

    @RequestMapping(value = "/delOrder", method = RequestMethod.POST)
    public Map<String, Object> delOrder(@RequestParam("id") String id) {
        Map<String, Object> map = new HashMap<>();
        map.put("msg", ordersService.delOrder(Integer.parseInt(id)));
        return map;
    }

    @RequestMapping(value = "updateOrder", method = RequestMethod.POST)
    public Map<String, Object> updateOrder(@RequestParam("id") String id,
                                           @RequestParam("name") String name,
                                           @RequestParam("price") String price,
                                           @RequestParam("count") String count,
                                           @RequestParam("buyer") String buyer,
                                           @RequestParam("phone") String phone,
                                           @RequestParam("address") String address,
                                           @RequestParam("create_time")Date create_time) {
        Map<String, Object> map = new HashMap<>();
        Orders orders = new Orders();
        orders.setId(Integer.parseInt(id));
        orders.setName(name);
        orders.setPrice(price);
        orders.setCount(count);
        orders.setBuyer(buyer);
        orders.setPhone(phone);
        orders.setAddress(address);
        orders.setCreate_time(create_time);
        map.put("msg", ordersService.updateOrder(orders));
        return map;
    }
}
