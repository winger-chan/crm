package com.winger.service;

import com.winger.entity.Orders;

import java.util.List;

public interface OrdersService {
    public String addOrder(Orders orders);

    public String delOrder(int id);

    public String updateOrder(Orders orders);

    public List<Orders> getOrders();
}
