package com.winger.service;

import com.winger.entity.Products;

import java.util.List;

public interface ProductsService {
    public String addProduct(Products products);

    public List<Products> getProducts();

    public Products getProductById(int id);

    public int queryCounts();

    public int queryCountsBySelect(Products products);

    public List<Products> queryProducts(Products products);

    public String delProduct(int id);

    public String updateProduct(Products products);
}
