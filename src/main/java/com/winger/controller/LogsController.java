package com.winger.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.winger.entity.Logs;
import com.winger.service.LogsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/logs")
public class LogsController {
    @Autowired
    private LogsService logsService;

    @RequestMapping(value = "/addLog", method = RequestMethod.POST)
    public Map<String, Object> addLog(@RequestParam("title") String title,
                                      @RequestParam("content") String content,
                                      @RequestParam("reserve_time") Date reserve_time,
                                      @RequestParam("user_name") String user_name,
                                      @RequestParam("target") String target) {
        Map<String, Object> map = new HashMap<>();
        Logs logs = new Logs();
        logs.setTitle(title);
        logs.setContent(content);
        Date date = new Date();
        logs.setCreate_time(date);
        logs.setReserve_time(reserve_time);
        logs.setUser_name(user_name);
        logs.setTarget(target);
        map.put("msg", logsService.addLog(logs));
        return map;
    }

    @RequestMapping(value = "/getLogs", method = RequestMethod.POST)
    public Map<String, Object> getLogs() {
        Map<String, Object> map = new HashMap<>();
        List<Logs> logs = logsService.getLogs();
        map.put("logs", logs);
        return map;
    }

    @RequestMapping(value = "queryCounts", method = RequestMethod.POST)
    public Map<String, Object> queryCounts() {
        Map<String, Object> map = new HashMap<>();
        int line = logsService.queryCounts();
        map.put("line", line);
        return map;
    }

    @RequestMapping(value = "queryCountsBySelect", method = RequestMethod.POST)
    public Map<String, Object> queryCountsBySelect(@RequestParam("title") String title,
                                                   @RequestParam("target") String target) {
        Map<String, Object> map = new HashMap<>();
        Logs logs = new Logs();
        logs.setTitle(title);
        logs.setTarget(target);
        int line = logsService.queryCountsBySelect(logs);
        map.put("line", line);
        return map;
    }

    @RequestMapping(value = "queryLogs", method = RequestMethod.POST)
    public Map<String, Object> queryLogs(@RequestParam("title") String title,
                                         @RequestParam("target") String target) {
        Map<String, Object> map = new HashMap<>();
        Logs logs = new Logs();
        logs.setTitle(title);
        logs.setTarget(target);
        map.put("logs", logsService.queryLogs(logs));
        return map;
    }

    @RequestMapping(value = "delLog", method = RequestMethod.POST)
    public Map<String, Object> delLog(@RequestParam("id") String id) {
        Map<String, Object> map = new HashMap<>();
        map.put("msg", logsService.delLog(Integer.parseInt(id)));
        return map;
    }

    @RequestMapping(value = "/getLogById", method = RequestMethod.POST)
    public Map<String, Object> getLogById(@RequestParam("id") String id) {
        Map<String, Object> map = new HashMap<>();
        map.put("logs", logsService.getLogById(Integer.parseInt(id)));
        return map;
    }

    @RequestMapping(value = "/updateLog", method = RequestMethod.POST)
    public Map<String, Object> updateLog(@RequestParam("id") String id,
                                         @RequestParam("title") String title,
                                         @RequestParam("content") String content,
                                         @RequestParam("create_time") Date create_time,
                                         @RequestParam("reserve_time") Date reserve_time,
                                         @RequestParam("user_name") String user_name,
                                         @RequestParam("target") String target) {
        Map<String, Object> map = new HashMap<>();
        Logs logs = new Logs();
        logs.setId(Integer.parseInt(id));
        logs.setTitle(title);
        logs.setContent(content);
        logs.setCreate_time(create_time);
        logs.setReserve_time(reserve_time);
        logs.setUser_name(user_name);
        logs.setTarget(target);
        map.put("msg", logsService.updateLog(logs));
        return map;
    }
}
