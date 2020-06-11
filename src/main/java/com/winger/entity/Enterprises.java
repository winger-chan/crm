package com.winger.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class Enterprises {
    private int enterprise_id;
    private String enterprise_name;
    private String enterprise_type;
    private String enterprise_background;
    private String listed;
    private int reg_capital;
    private int year_sales;
    private int enter_scale;
    private String url;
    private String zip_code;
    private String address;
    private String major_services;
    private String main_products;
    private String status;
    @JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
    private Date create_time;
    private String user_name;
    private String create_name;

    public Enterprises() {

    }

    public int getEnterprise_id() {
        return enterprise_id;
    }

    public void setEnterprise_id(int enterprise_id) {
        this.enterprise_id = enterprise_id;
    }

    public String getEnterprise_name() {
        return enterprise_name;
    }

    public void setEnterprise_name(String enterprise_name) {
        this.enterprise_name = enterprise_name;
    }

    public String getEnterprise_type() {
        return enterprise_type;
    }

    public void setEnterprise_type(String enterprise_type) {
        this.enterprise_type = enterprise_type;
    }

    public String getEnterprise_background() {
        return enterprise_background;
    }

    public void setEnterprise_background(String enterprise_background) {
        this.enterprise_background = enterprise_background;
    }

    public String getListed() {
        return listed;
    }

    public void setListed(String listed) {
        this.listed = listed;
    }

    public int getReg_capital() {
        return reg_capital;
    }

    public void setReg_capital(int reg_capital) {
        this.reg_capital = reg_capital;
    }

    public int getYear_sales() {
        return year_sales;
    }

    public void setYear_sales(int year_sales) {
        this.year_sales = year_sales;
    }

    public int getEnter_scale() {
        return enter_scale;
    }

    public void setEnter_scale(int enter_scale) {
        this.enter_scale = enter_scale;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getZip_code() {
        return zip_code;
    }

    public void setZip_code(String zip_code) {
        this.zip_code = zip_code;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMajor_services() {
        return major_services;
    }

    public void setMajor_services(String major_services) {
        this.major_services = major_services;
    }

    public String getMain_products() {
        return main_products;
    }

    public void setMain_products(String main_products) {
        this.main_products = main_products;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public String getCreate_name() {
        return create_name;
    }

    public void setCreate_name(String create_name) {
        this.create_name = create_name;
    }

    @Override
    public String toString() {
        return "Enterprises{" +
                "enterprise_id=" + enterprise_id +
                ", enterprise_name='" + enterprise_name + '\'' +
                ", enterprise_type=" + enterprise_type +
                ", cust_background=" + enterprise_background +
                ", listed=" + listed +
                ", reg_capital=" + reg_capital +
                ", year_sales=" + year_sales +
                ", enter_scale=" + enter_scale +
                ", url='" + url + '\'' +
                ", zip_code='" + zip_code + '\'' +
                ", address='" + address + '\'' +
                ", major_services='" + major_services + '\'' +
                ", main_products='" + main_products + '\'' +
                ", status=" + status +
                ", create_time=" + create_time +
                ", user_name=" + user_name +
                ", create_name='" + create_name + '\'' +
                '}';
    }
}
