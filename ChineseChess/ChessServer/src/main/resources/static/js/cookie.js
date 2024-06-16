var thatcookie = new Map;
function initCookie() {
    var cookieArray = document.cookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var item = cookieArray[i].split('=');
        thatcookie.set(item[0],item[1])
    }
}

function getCookieItem(name){
    return thatcookie.get(name);
}