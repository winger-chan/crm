package com.winger.service;

import com.winger.entity.Customers;

import java.util.List;

public interface CustomersService {
    public String addCustomers(Customers customers);

    public List<Customers> customersList();

    public String delCustomers(Customers customers);

    public Customers getCustomersById(int id);

    public int queryCounts();

    public int queryCountsBySelect(Customers customers);

    public List<Customers> queryCustomers(Customers customers);

    public String updateCustomers(Customers customers);
}
