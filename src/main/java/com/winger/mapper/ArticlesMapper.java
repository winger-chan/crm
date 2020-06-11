package com.winger.mapper;

import com.winger.entity.Articles;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ArticlesMapper {
    public int addArticles(Articles articles);

    public List<Articles> getArticles();

    public Articles getArticlesById(int id);

    public int updateArticles(Articles articles);

    public List<Articles> queryArticles(Articles articles);

    public int queryCounts();

    public int queryCountsBySelect(Articles articles);

    public int delArticles(@Param("id") int id);
}
