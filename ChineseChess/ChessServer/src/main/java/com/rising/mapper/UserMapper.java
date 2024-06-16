package com.rising.mapper;

import com.rising.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper {
    User queryById(Integer id);
    List<User> queryAll();
    Boolean isExist(Integer id);
    Boolean verification(@Param("id") Integer id, @Param("password") String password);
    int insert_id_pwd(@Param("id") Integer id,@Param("password") String password);
    int insert_user(@Param("id") Integer id,@Param("name") String name);
}
