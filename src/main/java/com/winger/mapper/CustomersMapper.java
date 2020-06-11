package com.winger.mapper;

import com.winger.entity.Customers;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CustomersMapper {

    public int addCustomers(Customers customers);

    public List<Customers> customersList();

    public int delCustomers(Customers customers);

    public Customers getCustomersById(int id);

    public int queryCounts();

    public int queryCountsBySelect(Customers customers);

    public List<Customers> queryCustomers(Customers customers);

    public int updateCustomers(Customers customers);
}
