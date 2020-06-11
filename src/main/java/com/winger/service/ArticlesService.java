package com.winger.service;

import com.winger.entity.Articles;

import java.util.List;

public interface ArticlesService {
    public String addArticles(Articles articles);

    public List<Articles> getArticles();

    public Articles getArticlesById(int id);

    public String updateArticles(Articles articles);

    public List<Articles> queryArticles(Articles articles);

    public int queryCounts();

    public int queryCountsBySelect(Articles articles);

    public String delArticles(int id);
}
