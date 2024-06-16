let targetPos = [];
let currentChess = [];
let chessObj;
let options = {};
const storage = window.sessionStorage;
const player = JSON.parse(storage.getItem("player"));
const against = JSON.parse(storage.getItem("against"));
openSocket(player.id);
let isMyTurn;
const cb = new ChessBoard();
function drewCB() {
    let canvas1 = document.getElementById("canvas1");
    let ctx = canvas1.getContext("2d");
    ctx.lineWidth = 6;
    ctx.strokeStyle = "brown";
    ctx.strokeRect(3, 3, 726, 816)
    //此方法用来画棋盘线
    function LineDrawing(mx, my, lx, ly) {
        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.lineTo(lx, ly);
        ctx.stroke();
    }
    /*
    1|2
    ---
    3|4
     */
    function drawPoint(x,y) {
        if(x-10>0&&y-10>0){

            LineDrawing(x-10,y-10,x-10,y-30)
            LineDrawing(x-10,y-10,x-30,y-10)
        }
        if(x+10<730&&y-10>0){
            LineDrawing(x+10,y-10,x+10,y-30)
            LineDrawing(x+10,y-10,x+30,y-10)

        }
        if(x+10<730&&y-10>0){
            LineDrawing(x+10,y+10,x+10,y+30)
            LineDrawing(x+10,y+10,x+30,y+10)

        }
        if(x-10>0&&y+10<820){
            LineDrawing(x-10,y+10,x-10,y+30)
            LineDrawing(x-10,y+10,x-30,y+10)

        }
    }
    //棋盘列上半部分
    ctx.lineWidth = 2;
    for (let i = 1; i < 8; i++) {
        LineDrawing(6+90*i,6,6+90*i,366)

        LineDrawing(6+90*i,456,6+90*i,816)
    }
    for (let i = 0; i < 9; i++) {
        LineDrawing(6,6+90*i,726,6+90*i)
    }
    LineDrawing(276,6,456,186)
    LineDrawing(276,186,456,6)
    LineDrawing(276,636,456,816)
    LineDrawing(276,816,456,636)
    for (let i = 0; i < 5; i++) {
        drawPoint(i*180+6,276)
        drawPoint(i*180+6,546)
    }

    drawPoint(96,186)
    drawPoint(96,636)
    drawPoint(636,186)
    drawPoint(636,636)
    //字体填充：楚河 汉界
    //设置线宽
    ctx.lineWidth = 1;
    //绘制文字
    ctx.font = "60px microsoft yahei";
    ctx.save();//保存点
    //将坐标中心作为起启点
    ctx.translate(canvas1.width / 2, canvas1.height / 2);
    let radian = Math.PI / 2; // 弧度制
    ctx.rotate(radian); // 旋转画布绘制刻度
    //填充
    ctx.fillText("楚", -30, -270);
    ctx.fillText("河", -30, -150);
    ctx.restore();//恢复到保存点
    ctx.save();
    //将坐标中心作为起启点
    ctx.translate(canvas1.width / 2, canvas1.height / 2);
    radian = Math.PI / -2;
    ctx.rotate(radian);
    ctx.fillText("汉", -30, -270);
    ctx.fillText("界", -30, -150);
    ctx.restore();
}

function addChess(x,y,color,name) {
    let chess = document.createElement("button")

    chess.innerHTML =name;

    chess.onclick=function (event) {
        if (isMyTurn){//如果不是玩家回合，玩家的点击没有任何效果。
            let element = event.target
            removeAll();
            currentChess.push(element.id);
            event.stopPropagation();
            // console.log(currentChess[0]);
            const op = options[currentChess[0]][0];
            for (let i = 0; i <op.length ; i++) {
                addTransChess(op[i][0],op[i][1],element.style.color);
            }
        }


    }
    chess.style.position="absolute";
    chess.style.top=(x*90+10).toString()+"px";
    chess.style.left=(y*90+10).toString()+"px";
    chess.className = "chess"
    chess.style.color = color
    x = x.toString()
    y = y.toString()
    chess.id = x+"-"+y;
    let chessboard = document.getElementById("chess_box")
    chessboard.appendChild(chess)

}

function addTransChess(x,y,color) {
    let chess = document.createElement("button")

    chess.onclick=function (event) {
        let src = currentChess[0];
        let tgtChess = event.target
        let tgt = tgtChess.id;
        let srcChess = document.getElementById(src);
        let [srcx,srcy] = src.split('-');
        let [tgtx,tgty] = tgt.split('+');
        let message = against.id+"_1-"+srcx+"+"+srcy+"+"+tgtx+"+"+tgty;
        sendMessage(message);
        cb.move([parseInt(srcx),parseInt(srcy)],[parseInt(tgtx),parseInt(tgty)]);
        srcChess.style.top = tgtChess.style.top;//tgtChess.style.top;
        srcChess.style.left = tgtChess.style.left;//tgtChess.style.left;
        removeAll();
        let tgtAgainstChess = document.getElementById(tgtx+'-'+tgty);
        if(tgtAgainstChess!=null) tgtAgainstChess.remove();
        srcChess.id = tgtx+'-'+tgty;
        isMyTurn = false;//行子后。归还操作权。
    }
    chess.style.position="absolute";
    chess.style.top=(x*90+10).toString()+"px";
    chess.style.left=(y*90+10).toString()+"px";
    chess.style.backgroundColor = color
    chess.style.opacity = "0.5"
    chess.className = "trans_chess"
    x = x.toString()
    y = y.toString()
    chess.id = x+"+"+y;
    targetPos.push(chess.id)
    let chessboard = document.getElementById("chess_box")
    chessboard.appendChild(chess)

}
function AgainstMove(src,tgt){
    let [srcx,srcy] = src;
    let [tgtx,tgty] = tgt;
    cb.move([parseInt(srcx),parseInt(srcy)],[parseInt(tgtx),parseInt(tgty)]);
    let srcChess = document.getElementById(srcx+"-"+srcy);
    let tgtChess = document.getElementById(tgtx+"-"+tgty);
    console.log("tgtchess:"+tgtChess);
    if(tgtChess != null) tgtChess.remove();
    srcChess.style.top = (tgtx*90+10).toString()+"px";
    srcChess.style.left = (tgty*90+10).toString()+"px";
    srcChess.id = tgtx+'-'+tgty;
    isMyTurn = true;//对方落子后，玩家获得操作权。
    takeObserve();
}
function removeAll() {
    currentChess = [];
    for (let i = 0; i < targetPos.length; i++) {
        let element = document.getElementById(targetPos[i])
        element.remove()
    }
    targetPos = []
}

function init() {
    let Cnames = [' ', '車', '马', '象', '仕', '将', '炮', '卒', ' ', '車', '马', '相', '士', '帅', '炮', '兵'];

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 9; j++) {
            let id = cb.getIDByPos([i,j])
            if(id == 0) continue;
            addChess(i,j,id<8?"black":"red",Cnames[id])
        }
    }
    isMyTurn = player.side;
    takeObserve();
}

function takeObserve() {
    if(isMyTurn) {
        chessObj = cb.getChessBySide(player.side);
        console.log(chessObj);
        for (let i = 0; i < chessObj.length; i++) {
            options[chessObj[i].pos2id()] = chessObj[i].findMoves(cb);
        }
    }



}
