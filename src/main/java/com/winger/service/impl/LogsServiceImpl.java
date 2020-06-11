package com.winger.service.impl;

import java.util.List;

import com.winger.entity.Logs;
import com.winger.mapper.LogsMapper;
import com.winger.service.LogsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LogsServiceImpl implements LogsService {
    @Autowired
    private LogsMapper logsMapper;

    @Override
    public String addLog(Logs logs) {
        int result = logsMapper.addLog(logs);
        if (result > 0) {
            return "新增成功";
        } else {
            return "新增失败";
        }
    }

    @Override
    public List<Logs> getLogs() {
        List<Logs> logs = logsMapper.getLogs();
        return logs;
    }

    @Override
    public int queryCounts() {
        return logsMapper.queryCounts();
    }

    @Override
    public int queryCountsBySelect(Logs logs) {
        return logsMapper.queryCountsBySelect(logs);
    }

    @Override
    public List<Logs> queryLogs(Logs logs) {
        List<Logs> logsList = logsMapper.queryLogs(logs);
        return logsList;
    }

    @Override
    public String delLog(int id) {
        int result = logsMapper.delLog(id);
        if (result > 0) {
            return "删除成功";
        } else {
            return "删除失败";
        }
    }

    @Override
    public Logs getLogById(int id) {
        return logsMapper.getLogById(id);
    }

    @Override
    public String updateLog(Logs logs) {
        int result = logsMapper.updateLog(logs);
        if (result > 0) {
            return "修改成功";
        } else {
            return "修改失败";
        }
    }
}
