package com.winger.service;

import com.winger.entity.Sales;

import java.util.List;

public interface SalesService {
    public String addSale(Sales sales);

    public String updateSale(Sales sales);

    public String delSale(int id);

    public List<Sales> getSales();

    public Sales getSaleById(Sales sales);

    public List<Sales> getLimit();
}
