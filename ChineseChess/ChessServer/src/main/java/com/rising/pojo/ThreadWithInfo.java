package com.rising.pojo;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ThreadWithInfo{
    private final Thread thread;
    private Player Info;

    public ThreadWithInfo(Thread thread, Player info) {
        this.thread = thread;
        Info = info;
    }
    public void notifyTheThread(){
        synchronized (this.thread){
            this.thread.notify();
        };
    }
    public void waitTheThread(long time) throws InterruptedException {
        synchronized (this.thread){
            this.thread.wait(time);
        }

    }
}
