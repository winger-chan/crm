package com.winger.service.impl;

import com.winger.entity.Products;
import com.winger.mapper.ProductsMapper;
import com.winger.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductsServiceImp implements ProductsService {
    @Autowired
    private ProductsMapper productsMapper;

    @Override
    public String addProduct(Products products) {
        int result = productsMapper.addProduct(products);
        if (result > 0) {
            return "新增成功";
        } else {
            return "新增失败";
        }
    }

    @Override
    public List<Products> getProducts() {
        List<Products> products = productsMapper.getProducts();
        return products;
    }

    @Override
    public int queryCounts() {
        return productsMapper.queryCounts();
    }

    @Override
    public int queryCountsBySelect(Products products) {
        return productsMapper.queryCountsBySelect(products);
    }

    @Override
    public List<Products> queryProducts(Products products) {
        List<Products> productsList = productsMapper.queryProducts(products);
        return productsList;
    }

    @Override
    public String delProduct(int id) {
        int result = productsMapper.delProduct(id);
        if (result > 0) {
            return "删除成功";
        } else {
            return "删除失败";
        }
    }

    @Override
    public String updateProduct(Products products) {
        int result = productsMapper.updateProduct(products);
        if (result > 0) {
            return "修改成功";
        } else {
            return "修改失败";
        }
    }

    @Override
    public Products getProductById(int id) {
        return productsMapper.getProductById(id);
    }
}
