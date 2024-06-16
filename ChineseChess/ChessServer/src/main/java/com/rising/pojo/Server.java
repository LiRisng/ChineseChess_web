package com.rising.pojo;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.concurrent.ConcurrentLinkedQueue;
@Component
public class Server {
    /*
    在线匹配的玩家队列，pQ1表示红色方，pQ2表示黑色方
     */
    private static final ConcurrentLinkedQueue<Player> redPlayerQueue = new ConcurrentLinkedQueue<>();
    private static final ConcurrentLinkedQueue<Player> blackPlayerQueue = new ConcurrentLinkedQueue<>();
    private static final HashMap<Integer, ThreadWithInfo> threadMap = new HashMap<>();


    public Player getMatch(Player player) throws InterruptedException {
        Player against;
        ConcurrentLinkedQueue<Player> againstQueue = player.getSide()?blackPlayerQueue:redPlayerQueue;
        ConcurrentLinkedQueue<Player> playerQueue = player.getSide()?redPlayerQueue:blackPlayerQueue;
        if(!againstQueue.isEmpty()){//对手不为空
            against = againstQueue.poll();
            ThreadWithInfo threadWithInfo = threadMap.get(against.getId());
            threadWithInfo.setInfo(player);
            threadWithInfo.notifyTheThread();

        }
        else{
            playerQueue.add(player);
            ThreadWithInfo threadWithInfo = new ThreadWithInfo(Thread.currentThread(), null);
            threadMap.put(player.getId(),threadWithInfo);
            threadWithInfo.waitTheThread(30000);
            against = threadWithInfo.getInfo();
            threadMap.remove(player.getId());
        }

        if(against == null)
            return new Player();
        return against;
    }
}
