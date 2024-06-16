var User =  {
    "ID":1223,
    "nickname":"某某某",
    "winnum":10,
    "matchnum":100
};

function sendJson(tgt) {
    $.ajax({
        type : "POST",
        url : tgt,
        data : {
            'jsonObj' : JSON.parse(User) //将原始json对象转为String
        },
        success : function(msg, status) {
            alert("请求提交后得到了成功的响应");
        }
    });
}

