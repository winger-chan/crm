package com.winger.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class Articles {
    private int id;
    private String title;
    private String type;
    private String sources;
    private String user_name;
    @JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
    private Date time;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSources() {
        return sources;
    }

    public void setSources(String sources) {
        this.sources = sources;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "Articles{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", type='" + type + '\'' +
                ", sources='" + sources + '\'' +
                ", user_name='" + user_name + '\'' +
                ", time=" + time +
                '}';
    }
}
