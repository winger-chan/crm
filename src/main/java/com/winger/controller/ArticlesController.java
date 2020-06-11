package com.winger.controller;


import com.winger.entity.Articles;
import com.winger.service.ArticlesService;
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
@RequestMapping("/articles")
public class ArticlesController {
    @Autowired
    private ArticlesService articlesService;

    @RequestMapping(value = "/addArticles", method = RequestMethod.POST)
    public Map<String, Object> addArticles(@RequestParam("title") String title,
                                           @RequestParam("type") String type,
                                           @RequestParam("sources") String sources,
                                           @RequestParam("user_name") String user_name) {
        Map<String, Object> map = new HashMap<>();
        Articles articles = new Articles();
        articles.setTitle(title);
        articles.setType(type);
        articles.setSources(sources);
        articles.setUser_name(user_name);
        Date date = new Date();
        articles.setTime(date);
        String result = articlesService.addArticles(articles);
        map.put("msg", result);
        return map;
    }

    @RequestMapping(value = "/getArticles", method = RequestMethod.POST)
    public Map<String, Object> getArticles() {
        Map<String, Object> map = new HashMap<>();
        List<Articles> articles = articlesService.getArticles();
        map.put("articles", articles);
        return map;
    }

    @RequestMapping(value = "/getArticlesById", method = RequestMethod.POST)
    public Map<String, Object> getArticlesById(@RequestParam("id") String id) {
        Map<String, Object> map = new HashMap<>();
        Articles articles = articlesService.getArticlesById(Integer.parseInt(id));
        map.put("article", articles);
        return map;
    }

    @RequestMapping(value = "/updateArticles", method = RequestMethod.POST)
    public Map<String, Object> updateArticles(@RequestParam("id") String id,
                                              @RequestParam("title") String title,
                                              @RequestParam("type") String type,
                                              @RequestParam("sources") String sources,
                                              @RequestParam("user_name") String user_name) {
        Map<String, Object> map = new HashMap<>();
        Articles articles = new Articles();
        articles.setId(Integer.parseInt(id));
        articles.setTitle(title);
        articles.setType(type);
        articles.setSources(sources);
        articles.setUser_name(user_name);
        Date date = new Date();
        articles.setTime(date);
        String result = articlesService.updateArticles(articles);
        map.put("msg", result);
        return map;
    }

    @RequestMapping(value = "/queryCounts", method = RequestMethod.POST)
    public Map<String, Object> queryCounts() {
        Map<String, Object> map = new HashMap<>();
        map.put("line", articlesService.queryCounts());
        return map;
    }

    @RequestMapping(value = "/queryCountsBySelect", method = RequestMethod.POST)
    public Map<String, Object> queryCountsBySelect(@RequestParam("title") String title,
                                                   @RequestParam("type") String type) {
        Map<String, Object> map = new HashMap<>();
        Articles articles = new Articles();
        articles.setTitle(title);
        articles.setType(type);
        map.put("line", articlesService.queryCountsBySelect(articles));
        return map;
    }

    @RequestMapping(value = "/queryArticles", method = RequestMethod.POST)
    public Map<String, Object> queryArticles(@RequestParam("title") String title,
                                             @RequestParam("type") String type) {
        Map<String, Object> map = new HashMap<>();
        Articles articles = new Articles();
        articles.setTitle(title);
        articles.setType(type);
        map.put("articles", articlesService.queryArticles(articles));
        return map;
    }

    @RequestMapping(value = "/delArticles", method = RequestMethod.GET)
    public Map<String, Object> delArticles(@RequestParam("id") String id) {
        Map<String, Object> map = new HashMap<>();
        String result = articlesService.delArticles(Integer.parseInt(id));
        map.put("msg", result);
        return map;
    }
}
