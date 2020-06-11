package com.winger.mapper;

import com.winger.entity.Products;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProductsMapper {
    public int addProduct(Products products);

    public List<Products> getProducts();

    public Products getProductById(@Param("id") int id);

    public int queryCounts();

    public int queryCountsBySelect(Products products);

    public List<Products> queryProducts(Products products);

    public int delProduct(@Param("id") int id);

    public int updateProduct(Products products);
}
