package com.winger.mapper;

import com.winger.entity.Orders;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OrdersMapper {
    public int addOrder(Orders orders);

    public int delOrder(@Param("id") int id);

    public int updateOrder(Orders orders);

    public List<Orders> getOrders();
}
