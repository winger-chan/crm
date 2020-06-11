package com.winger.controller;

import com.winger.entity.Sales;
import com.winger.service.SalesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/sales")
public class SalesController {
    @Autowired
    private SalesService salesService;

    @RequestMapping(value = "/addSale", method = RequestMethod.POST)
    public Map<String, Object> addSale(@RequestParam("product_id") String product_id,
                                       @RequestParam("product_name") String product_name,
                                       @RequestParam("years") String years,
                                                    @RequestParam("january") String january,
                                                    @RequestParam("february") String february,
                                                    @RequestParam("march") String march,
                                                    @RequestParam("april") String april,
                                                    @RequestParam("may") String may,
                                                    @RequestParam("june") String june,
                                                    @RequestParam("july") String july,
                                                    @RequestParam("august") String august,
                                                    @RequestParam("september") String september,
                                                    @RequestParam("october") String october,
                                                    @RequestParam("november") String november,
                                                    @RequestParam("december") String december,
                                       @RequestParam("yearSales") String yearSales) {
        Map<String, Object> map = new HashMap<>();
        Sales sales = new Sales();
        if (!product_id.equals("")) {
            sales.setProduct_id(Integer.parseInt(product_id));
        }
        sales.setProduct_name(product_name);
        if (!years.equals("")) {
            sales.setYears(Integer.parseInt(years));
        }
        if (!january.equals("")) {
            sales.setJanuary(Integer.parseInt(january));
        }
        if (!february.equals("")) {
            sales.setFebruary(Integer.parseInt(february));
        }
        if (!march.equals("")) {
            sales.setMarch(Integer.parseInt(march));
        }
        if (!april.equals("")) {
            sales.setApril(Integer.parseInt(april));
        }
        if (!may.equals("")) {
            sales.setMay(Integer.parseInt(may));
        }
        if (!june.equals("")) {
            sales.setJune(Integer.parseInt(june));
        }
        if (!july.equals("")) {
            sales.setJuly(Integer.parseInt(july));
        }
        if (!august.equals("")) {
            sales.setAugust(Integer.parseInt(august));
        }
        if (!september.equals("")) {
            sales.setSeptember(Integer.parseInt(september));
        }
        if (!october.equals("")) {
            sales.setOctober(Integer.parseInt(october));
        }
        if (!november.equals("")) {
            sales.setNovember(Integer.parseInt(november));
        }
        if (!december.equals("")) {
            sales.setDecember(Integer.parseInt(december));
        }
        if (!yearSales.equals("")) {
            sales.setYearSales(Integer.parseInt(yearSales));
        }
        map.put("msg", salesService.addSale(sales));
        return map;
    }

    @RequestMapping(value = "/getSales", method = RequestMethod.POST)
    public Map<String, Object> getSales() {
        Map<String, Object> map = new HashMap<>();
        map.put("sales", salesService.getSales());
        return map;
    }

    @RequestMapping(value = "/getSaleById", method = RequestMethod.POST)
    public Map<String, Object> getSaleById(@RequestParam("id") String id,
                                                 @RequestParam("years") String years) {
        Map<String, Object> map = new HashMap<>();
        Sales sales = new Sales();
        sales.setId(Integer.parseInt(id));
        sales.setYears(Integer.parseInt(years));
        map.put("sale", salesService.getSaleById(sales));
        return map;
    }

    @RequestMapping(value = "/getLimit", method = RequestMethod.POST)
    public Map<String, Object> getLimit() {
        Map<String, Object> map = new HashMap<>();
        map.put("sales", salesService.getLimit());
        return map;
    }

    @RequestMapping(value = "/delSale", method = RequestMethod.POST)
    public Map<String, Object> delSale(@RequestParam("id") String id) {
        Map<String, Object> map = new HashMap<>();
        map.put("msg", salesService.delSale(Integer.parseInt(id)));
        return map;
    }

    @RequestMapping(value = "/updateSale", method = RequestMethod.POST)
    public Map<String, Object> updateSale(@RequestParam("id") String id,
                                          @RequestParam("product_id") String product_id,
                                          @RequestParam("product_name") String product_name,
                                                    @RequestParam("years") String years,
                                                    @RequestParam("january") String january,
                                                    @RequestParam("february") String february,
                                                    @RequestParam("march") String march,
                                                    @RequestParam("april") String april,
                                                    @RequestParam("may") String may,
                                                    @RequestParam("june") String june,
                                                    @RequestParam("july") String july,
                                                    @RequestParam("august") String august,
                                                    @RequestParam("september") String september,
                                                    @RequestParam("october") String october,
                                                    @RequestParam("november") String november,
                                                    @RequestParam("december") String december,
                                          @RequestParam("yearSales") String yearSales) {
        Map<String, Object> map = new HashMap<>();
        Sales sales = new Sales();
        sales.setId(Integer.parseInt(id));
        if (!product_id.equals("")) {
            sales.setProduct_id(Integer.parseInt(product_id));
        }
        sales.setProduct_name(product_name);
        if (!years.equals("")) {
            sales.setYears(Integer.parseInt(years));
        }
        if (!january.equals("")) {
            sales.setJanuary(Integer.parseInt(january));
        }
        if (!february.equals("")) {
            sales.setFebruary(Integer.parseInt(february));
        }
        if (!march.equals("")) {
            sales.setMarch(Integer.parseInt(march));
        }
        if (!april.equals("")) {
            sales.setApril(Integer.parseInt(april));
        }
        if (!may.equals("")) {
            sales.setMay(Integer.parseInt(may));
        }
        if (!june.equals("")) {
            sales.setJune(Integer.parseInt(june));
        }
        if (!july.equals("")) {
            sales.setJuly(Integer.parseInt(july));
        }
        if (!august.equals("")) {
            sales.setAugust(Integer.parseInt(august));
        }
        if (!september.equals("")) {
            sales.setSeptember(Integer.parseInt(september));
        }
        if (!october.equals("")) {
            sales.setOctober(Integer.parseInt(october));
        }
        if (!november.equals("")) {
            sales.setNovember(Integer.parseInt(november));
        }
        if (!december.equals("")) {
            sales.setDecember(Integer.parseInt(december));
        }
        if (!yearSales.equals("")) {
            sales.setYearSales(Integer.parseInt(yearSales));
        }
        map.put("msg", salesService.updateSale(sales));
        return map;
    }
}
