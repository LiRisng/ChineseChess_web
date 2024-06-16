package com.rising.controller;


import com.rising.pojo.Player;
import com.rising.pojo.Server;
import com.rising.pojo.User;
import com.rising.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;




@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private Server server;
    @RequestMapping("login")
    public Player login(@RequestParam String id, @RequestParam String pwd){

        if(userService.isExist(Integer.parseInt(id),pwd)){
            User user = userService.queryByID(Integer.valueOf(id));
            Player player = new Player(user.id,user.nickname, user.matchnum==0? (float) 0.0 :user.winnum/user.matchnum,null);
            return player;
        }
        return new Player();
    }
    @RequestMapping("register")
    public void register(@RequestParam String id,@RequestParam String name,@RequestParam String pwd,@RequestParam String pwd_a){
        userService.register(Integer.parseInt(id),name,pwd);
    }
    @RequestMapping("getInfo")
    public User getInfo(@RequestParam String id){

        User user = null;
        user  = userService.queryByID(Integer.valueOf(id));
        return user;
    }

    @PostMapping("getMatch")
    public Player getMatch(@RequestBody Player player) throws InterruptedException {
        Player against = server.getMatch(player);
        return against;
    }


    public void findAll(){
        System.out.println(userService.findall());
    }
}
