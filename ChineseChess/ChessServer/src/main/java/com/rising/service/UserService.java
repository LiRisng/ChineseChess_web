package com.rising.service;

import com.rising.pojo.User;

import java.util.List;

public interface UserService {
    List<User> findall();
    User queryByID(Integer ID);
    boolean isExist(Integer ID);
    //boolean isExist(String name);
    boolean isExist(Integer id, String password);
    void register(Integer id, String name, String password);
}
