package com.winger.mapper;

import com.winger.entity.Sales;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SalesMapper {
    public int addSale(Sales sales);

    public int updateSale(Sales sales);

    public int delSale(@Param("id") int id);

    public List<Sales> getSales();

    public Sales getSaleById(Sales sales);

    public List<Sales> getLimit();
}
