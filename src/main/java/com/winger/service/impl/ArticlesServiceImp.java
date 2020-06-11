package com.winger.service.impl;

import com.winger.entity.Articles;
import com.winger.mapper.ArticlesMapper;
import com.winger.service.ArticlesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticlesServiceImp implements ArticlesService {
    @Autowired
    private ArticlesMapper articlesMapper;

    @Override
    public String addArticles(Articles articles) {
        int result = articlesMapper.addArticles(articles);
        if (result > 0) {
            return "新增成功！";
        } else {
            return "新增失败！";
        }
    }

    @Override
    public List<Articles> getArticles() {
        List<Articles> articles = articlesMapper.getArticles();
        return articles;
    }

    @Override
    public Articles getArticlesById(int id) {
        return articlesMapper.getArticlesById(id);
    }

    @Override
    public String updateArticles(Articles articles) {
        int result = articlesMapper.updateArticles(articles);
        if (result > 0) {
            return "修改成功";
        } else {
            return "修改失败";
        }
    }

    @Override
    public List<Articles> queryArticles(Articles articles) {
        List<Articles> articlesList = articlesMapper.queryArticles(articles);
        return articlesList;
    }

    @Override
    public int queryCounts() {
        return articlesMapper.queryCounts();
    }

    @Override
    public int queryCountsBySelect(Articles articles) {
        return articlesMapper.queryCountsBySelect(articles);
    }

    @Override
    public String delArticles(int id) {
        int result = articlesMapper.delArticles(id);
        if (result > 0) {
            return "删除成功";
        } else {
            return "删除失败";
        }
    }
}
