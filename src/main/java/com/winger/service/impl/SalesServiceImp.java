package com.winger.service.impl;

import com.winger.entity.Sales;
import com.winger.mapper.SalesMapper;
import com.winger.service.SalesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalesServiceImp implements SalesService {
    @Autowired
    private SalesMapper salesMapper;

    @Override
    public String addSale(Sales sales) {
        int result = salesMapper.addSale(sales);
        if (result > 0) {
            return "新增成功";
        } else {
            return "新增失败";
        }
    }

    @Override
    public String updateSale(Sales sales) {
        int result = salesMapper.updateSale(sales);
        if (result > 0) {
            return "修改成功";
        } else {
            return "修改失败";
        }
    }

    public String delSale(int id) {
        int result = salesMapper.delSale(id);
        if (result > 0) {
            return "删除成功";
        } else {
            return "删除失败";
        }
    }

    @Override
    public List<Sales> getSales() {
        List<Sales> sales = salesMapper.getSales();
        return sales;
    }

    @Override
    public Sales getSaleById(Sales sales) {
        return salesMapper.getSaleById(sales);
    }

    @Override
    public List<Sales> getLimit() {
        List<Sales> sales = salesMapper.getLimit();
        return sales;
    }
}
