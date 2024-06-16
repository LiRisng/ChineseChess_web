package com.rising.pojo;

import lombok.Data;

@Data
public class Player {
    private Integer id;
    private String nickname;
    private Float winrate;
    private Boolean side;//阵营true=红，false = 黑
    public Player(){}

    public Player(Integer id, String nickname, Float winrate, Boolean side) {
        this.id = id;
        this.nickname = nickname;
        this.winrate = winrate;
        this.side = side;
    }
}
