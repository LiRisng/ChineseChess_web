package com.rising.service.Impl;

import com.rising.mapper.UserMapper;
import com.rising.pojo.User;
import com.rising.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private UserMapper userMapper;
    @Autowired
    public void setUserMapper(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public List<User> findall() {
        List<User> users = userMapper.queryAll();
        return users;
    }



    @Override
    public User queryByID(Integer ID) {

        return userMapper.queryById(ID);
    }

    @Override
    public boolean isExist(Integer ID) {
        return userMapper.isExist(ID);
    }

    @Override
    public boolean isExist(Integer id, String password) {
        return userMapper.verification(id,password);
    }


    @Transactional(readOnly = false)
    @Override
    public void register(Integer ID, String name,String password) {
        System.out.println("hahahaah");
        System.out.println(userMapper.insert_user(ID,name));
        System.out.println(userMapper.insert_id_pwd(ID, password));

    }

}
