package com.winger.mapper;

import java.util.List;

import com.winger.entity.Logs;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface LogsMapper {
    public int addLog(Logs logs);

    public List<Logs> getLogs();

    public int queryCounts();

    public int queryCountsBySelect(Logs logs);

    public List<Logs> queryLogs(Logs logs);

    public int delLog(@Param("id") int id);

    public Logs getLogById(@Param("id") int id);

    public int updateLog(Logs logs);
}
