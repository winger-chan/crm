package com.winger.controller;

import com.winger.entity.Products;
import com.winger.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/products")
public class ProductsController {
    @Autowired
    private ProductsService productsService;

    @RequestMapping(value = "/addProduct", method = RequestMethod.POST)
    public Map<String, Object> addProduct(@RequestParam("name") String name,
                                          @RequestParam("desc") String desc,
                                          @RequestParam("supplier") String supplier,
                                          @RequestParam("sources") String sources,
                                          @RequestParam("price") String price,
                                          @RequestParam("sales") String sales,
                                          @RequestParam("inventory") String inventory,
                                          @RequestParam("user_name") String user_name) {
        Map<String, Object> map = new HashMap<>();
        Products products = new Products();
        products.setName(name);
        products.setDesc(desc);
        products.setSupplier(supplier);
        products.setSources(sources);
        products.setPrice(price);
        products.setSales(sales);
        products.setInventory(inventory);
        Date date = new Date();
        products.setCreate_time(date);
        products.setUser_name(user_name);
        map.put("msg", productsService.addProduct(products));
        return map;
    }

    @RequestMapping(value = "/getProducts", method = RequestMethod.POST)
    public Map<String, Object> getProducts() {
        Map<String, Object> map = new HashMap<>();
        List<Products> products = productsService.getProducts();
        map.put("products", products);
        return map;
    }

    @RequestMapping(value = "/getProductById", method = RequestMethod.POST)
    public Map<String, Object> getProducts(@RequestParam("id") String id) {
        Map<String, Object> map = new HashMap<>();
        map.put("product", productsService.getProductById(Integer.parseInt(id)));
        return map;
    }

    @RequestMapping(value = "/queryCounts", method = RequestMethod.POST)
    public Map<String, Object> queryCounts() {
        Map<String, Object> map = new HashMap<>();
        map.put("line", productsService.queryCounts());
        return map;
    }

    @RequestMapping(value = "/queryCountsBySelect", method = RequestMethod.POST)
    public Map<String, Object> queryCountsBySelect(@RequestParam("name") String name,
                                                   @RequestParam("supplier") String supplier) {
        Map<String, Object> map = new HashMap<>();
        Products products = new Products();
        products.setName(name);
        products.setSupplier(supplier);
        map.put("line", productsService.queryCountsBySelect(products));
        return map;
    }

    @RequestMapping(value = "/queryProducts", method = RequestMethod.POST)
    public Map<String, Object> queryProducts(@RequestParam("name") String name,
                                             @RequestParam("supplier") String supplier) {
        Map<String, Object> map = new HashMap<>();
        Products products = new Products();
        products.setName(name);
        products.setSupplier(supplier);
        List<Products> productsList = productsService.queryProducts(products);
        map.put("products", productsList);
        return map;
    }

    @RequestMapping(value = "/delProduct", method = RequestMethod.POST)
    public Map<String, Object> delProduct(@RequestParam("id") String id) {
        Map<String, Object> map = new HashMap<>();
        map.put("msg", productsService.delProduct(Integer.parseInt(id)));
        return map;
    }

    @RequestMapping(value = "/updateProduct", method = RequestMethod.POST)
    public Map<String, Object> updateProduct(@RequestParam("id") String id,
                                             @RequestParam("name") String name,
                                             @RequestParam("desc") String desc,
                                             @RequestParam("supplier") String supplier,
                                             @RequestParam("sources") String sources,
                                             @RequestParam("price") String price,
                                             @RequestParam("sales") String sales,
                                             @RequestParam("inventory") String inventory) {
        Map<String, Object> map = new HashMap<>();
        Products products = new Products();
        products.setId(Integer.parseInt(id));
        products.setName(name);
        products.setDesc(desc);
        products.setSupplier(supplier);
        products.setSources(sources);
        products.setPrice(price);
        products.setSales(sales);
        products.setInventory(inventory);
        map.put("msg", productsService.updateProduct(products));
        return map;
    }
}
