package com.atguigu.springboot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.thymeleaf.util.StringUtils;

import javax.servlet.http.HttpServletResponse;
import java.util.*;

@RestController
public class HelloController {
    Logger logger = LoggerFactory.getLogger(getClass());
    @RequestMapping({"/success","/index.html"})
    public String index() {
        return "success";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/login")
    public Map<String, Object> login(@RequestBody Object object) {
        LinkedHashMap<String,Object> resultMap=(LinkedHashMap<String,Object>)object;
        Object username = resultMap.get("username");
        Object password = resultMap.get("password");
        Map<String, Object>map = new HashMap<>();
        if (!StringUtils.isEmpty(username.toString()) && "123456".equals(password)) {
            map.put("status","success");
            return map;
        } else {
            map.put("status","error");
            return map;
        }
    }

    @RequestMapping("/hello")
    public String hello () {
        return "hello world";
    }

    // 查出一些数据
    @RequestMapping("/success001")
      public Map<String, Object> test001(HttpServletResponse response) {
            Map<String, Object>map=new HashMap<>();
//            List<String> list=new ArrayList(){"a","b"};
            map.put("hello", "你好");
            map.put("users", Arrays.asList("zhangshao", "lishi"));
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setHeader("Cache-Control","no-cache");
            return map;
        }
}
