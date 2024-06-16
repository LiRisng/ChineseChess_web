package com.rising.pojo;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class User {
    public Integer id;
    public String nickname;
    public Integer matchnum;
    public Integer winnum;

    public User(Integer id, String nickname, Integer matchnum, Integer winnum) {
        this.id = id;
        this.nickname = nickname;
        this.matchnum = matchnum;
        this.winnum = winnum;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", nickname='" + nickname + '\'' +
                ", matchnum=" + matchnum +
                ", winnum=" + winnum +
                '}';
    }
}
