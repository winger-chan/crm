package com.winger.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class Products {
    private int id;
    private String name;
    private String desc;
    private String supplier;
    private String sources;
    private String price;
    private String sales;
    private String inventory;
    @JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
    private Date create_time;
    private String user_name;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    public String getSources() {
        return sources;
    }

    public void setSources(String sources) {
        this.sources = sources;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getSales() {
        return sales;
    }

    public void setSales(String sales) {
        this.sales = sales;
    }

    public String getInventory() {
        return inventory;
    }

    public void setInventory(String inventory) {
        this.inventory = inventory;
    }

    public Date getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Date create_time) {
        this.create_time = create_time;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }



    @Override
    public String toString() {
        return "Products{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", desc='" + desc + '\'' +
                ", supplier='" + supplier + '\'' +
                ", sources='" + sources + '\'' +
                ", price='" + price + '\'' +
                ", sales='" + sales + '\'' +
                ", inventory='" + inventory + '\'' +
                ", create_time=" + create_time +
                ", user_name='" + user_name + '\'' +
                '}';
    }
}
