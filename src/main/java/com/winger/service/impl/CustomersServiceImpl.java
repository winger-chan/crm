package com.winger.service.impl;

import com.winger.entity.Customers;
import com.winger.mapper.CustomersMapper;
import com.winger.service.CustomersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomersServiceImpl implements CustomersService {

    @Autowired
    private CustomersMapper customersMapper;

    @Override
    public String addCustomers(Customers customers) {
        int result = customersMapper.addCustomers(customers);
        if (result > 0) {
            return "添加成功！";
        } else {
            return "添加失败！";
        }
    }

    @Override
    public List<Customers> customersList() {
        List<Customers> customers = customersMapper.customersList();
        return customers;
    }

    @Override
    public String delCustomers(Customers customers) {
        int result = customersMapper.delCustomers(customers);
        if (result > 0) {
            return "删除成功！";
        } else {
            return "删除失败！";
        }
    }

    @Override
    public Customers getCustomersById(int id) {
        return customersMapper.getCustomersById(id);
    }

    @Override
    public int queryCounts() {
        return customersMapper.queryCounts();
    }

    @Override
    public int queryCountsBySelect(Customers customers) {
        return customersMapper.queryCountsBySelect(customers);
    }

    @Override
    public List<Customers> queryCustomers(Customers customers) {
        List<Customers> customersList = customersMapper.queryCustomers(customers);
        return customersList;
    }

    @Override
    public String updateCustomers(Customers customers){
        int result = customersMapper.updateCustomers(customers);
        if(result>0){
            return "修改成功";
        }else {
            return "修改失败";
        }
    }
}
