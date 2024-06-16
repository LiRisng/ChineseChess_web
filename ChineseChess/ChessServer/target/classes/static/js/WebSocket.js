let socket;


function openSocket(id) {
    if (typeof (WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
    } else {
        console.log("您的浏览器支持WebSocket");
        //指定要连接的服务器地址与端口
        let socketUrl = "ws://127.0.0.1:8080/websocket/" + id;
        console.log(socketUrl);
        if (socket != null) {
            socket.close();
            socket = null;
        }
        // 实例化WebSocket对象，建立连接
        socket = new WebSocket(socketUrl);
        //打开事件
        socket.onopen = function () {
            console.log("websocket已打开");
            setMessageInnerHTML("websocket已打开");
        };
        //获得消息事件
        socket.onmessage = function (msg) {

            console.log(msg.data);
            //消息进入后的处理逻辑
            let [type,message] = msg.data.split('-')
            if(type == "1"){
                message = message.split('+');
                AgainstMove([message[0],message[1]],[message[2],message[3]]);
            }
            else{
                setMessageInnerHTML("服务端回应: " + message);
            }

        };
        //关闭事件
        socket.onclose = function () {
            console.log("websocket已关闭");
            setMessageInnerHTML("websocket已关闭");
        };
        //发生了错误事件
        socket.onerror = function () {
            console.log("websocket发生了错误");
        }
    }
}
/*
构建一种信息和请求的映射关系
1.匹配
2.局内用户对话
3.对局
4.。。。
 */
function sendMessage(message) {
    if (typeof (WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
    } else {
        console.log("您的浏览器支持WebSocket");

        socket.send(message);

        // setMessageInnerHTML(message);
    }
}

//将消息显示在网页上
function setMessageInnerHTML(innerHTML) {
    $("#message").append(innerHTML + '<br/>');
}

//关闭WebSocket连接
function closeWebSocket() {
    socket.close();
}
// window.onload = function (){
//     openSocket();
// }
//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
    let storage = window.localStorage;
    storage.clear();
    closeWebSocket();
}
