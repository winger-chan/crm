package com.winger.service;

import java.util.List;

import com.winger.entity.Logs;

public interface LogsService {
    public String addLog(Logs logs);

    public List<Logs> getLogs();

    public int queryCounts();

    public int queryCountsBySelect(Logs logs);

    public List<Logs> queryLogs(Logs logs);

    public String delLog(int id);

    public Logs getLogById(int id);

    public String updateLog(Logs logs);
}
