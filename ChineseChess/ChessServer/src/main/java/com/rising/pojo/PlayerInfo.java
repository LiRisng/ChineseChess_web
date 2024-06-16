package com.rising.pojo;

import lombok.Data;

@Data
public class PlayerInfo {
    private Integer id;
    private String nickname;
    private Float winrate;
    private Boolean side;//阵营true=红，false = 黑


}
