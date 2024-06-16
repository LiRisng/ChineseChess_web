function login(){
    $.ajax({
        //几个参数需要注意一下
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "login" ,//url
        data: $("#login").serialize(),
        success: function (result) {
            let player = result;
            alert(player.nickname);
            if(player.id != null){
                let storage = window.sessionStorage;
                storage.setItem("player", JSON.stringify(player))
                window.open('inPage.html','_self');
            }
            else{
                alert("账号或密码错误");
            }

        },
        error : function() {
            alert("异常！");
        }
    });
}

function getMatch(player){

    let radio = document.getElementsByName("side");
    if(radio[0].checked) player.side=true;
    else player.side=false;
    sessionStorage.setItem("player",JSON.stringify(player));
    $.ajax({
        type: "POST",
        dataType: "json",
        data: JSON.stringify(player),
        url: "getMatch" ,//url
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            let against = result;
            alert(against.nickname);
            if(against.id != null){
                let storage = window.sessionStorage;
                storage.setItem("against",JSON.stringify(against))
                window.open('ChessBoard.html','_self');
            }
            else{
                alert("玩家较少，稍后再试");
            }

        },
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
}
