package com.winger.service.impl;

import com.winger.entity.Orders;
import com.winger.mapper.OrdersMapper;
import com.winger.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdersServiceImp implements OrdersService {
    @Autowired
    private OrdersMapper ordersMapper;

    @Override
    public String addOrder(Orders orders) {
        int result = ordersMapper.addOrder(orders);
        if (result > 0) {
            return "新增成功";
        } else {
            return "新增失败";
        }
    }

    @Override
    public String delOrder(int id) {
        int result = ordersMapper.delOrder(id);
        if (result > 0) {
            return "删除成功";
        } else {
            return "删除失败";
        }
    }

    @Override
    public String updateOrder(Orders orders) {
        int result = ordersMapper.updateOrder(orders);
        if (result > 0) {
            return "修改成功";
        } else {
            return "修改失败";
        }
    }

    @Override
    public List<Orders> getOrders() {
        List<Orders> orders = ordersMapper.getOrders();
        return orders;
    }
}
