package com.atguigu.springboot.controller;

import com.atguigu.springboot.dao.DepartmentDao;
import com.atguigu.springboot.dao.EmployeeDao;
import com.atguigu.springboot.entities.Department;
import com.atguigu.springboot.entities.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@RestController
public class getList {

    @Autowired
    EmployeeDao employeeDao;
    @Autowired
    DepartmentDao departmentDao;

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/getList")
    public Map<String, Object> list() {
        Collection<Employee>employees = employeeDao.getAll();
        Map<String, Object>map = new HashMap<>();
        map.put("list", employees);
        return map;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/getDepartment")
    public Map<String, Object> getDepartment() {
        Map<String, Object>map = new HashMap<>();
        Collection departmentList = departmentDao.getDepartments();
        map.put("departmentList", departmentList);
        return map;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/addItem")
    public Map<String, Object> addItem(@RequestBody Employee employee) {
        System.out.println(employee);
        employeeDao.save(employee);
        Map<String, Object>map = new HashMap<>();
        map.put("status", "success");
        return map;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/getItemById")
    public Map<String, Object> getItemById(@RequestParam() Integer Id) {
        Employee employee = employeeDao.get(Id);
        Map<String, Object>map = new HashMap<>();
        map.put("dataItem", employee);
        return map;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/editItem")
    public Map<String, Object> editItem(@RequestBody Employee employee) {
        employeeDao.save(employee);
        Map<String, Object>map = new HashMap<>();
        map.put("status", "success");
        return map;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/deleteItem")
    public Map<String, Object> deleteItem(@RequestBody Employee employee) {
        employeeDao.delete(employee.getId());
        Map<String, Object>map = new HashMap<>();
        map.put("status", "success");
        return map;
    }
//    @RequestMapping("/hello")
//    public String hello () {
//        return "hello world";
//    }
}
