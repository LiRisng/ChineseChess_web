

class Chess {
    constructor(name, id, pos) {
        this.name = name;
        this.id = id;
        this.pos = pos; // pos should be an array [x, y]
    }

    pos2id(){
        return this.pos[0]+'-'+this.pos[1];
    }
    // Placeholder method for finding valid moves, should be overridden by subclasses
    findMoves(board) {
        return [];
    }

    // Method to move the piece to a new pos

}

class Rook extends Chess {
    constructor(id, pos) {
        super('車', id, pos);
    }

    findMoves(board) {
        const moves = [];
        let check = false;
        const [x, y] = this.pos;
        const dire = [[-1,0],[1,0],[0,-1],[0,1]];
        for (let i = 0;i<dire.length;i++){
            let curx = x;
            let cury = y;
            while(true){
                curx += dire[i][0];
                cury += dire[i][1];
                let id = board.getIDByPos([curx,cury]);
                if(id == -1) break;
                if(id == 0) moves.push([curx,cury]);
                else if((id>8)!=(this.id>8)){//如果此处棋子是对方的棋子可以吃掉,
                    if(id == 5 || id == 13) check=true;
                    moves.push([curx,cury]);
                    break;
                }
                else {//此处有己方棋子拦路
                    break;
                }
            }
        }

        return [moves,check];
    }
}

class Knight extends Chess {
    constructor(id, pos) {
        super('马', id, pos);
    }

    findMoves(board) {
        const moves = [];
        let  check = false;
        const [x, y] = this.pos;
        const dire = [
            [2, 1], [2, -1], [-2, 1], [-2, -1],
            [1, 2], [1, -2], [-1, 2], [-1, -2]
        ];
        let id;
        for (let i = 0;i<dire.length;i++) {

            if(Math.abs(dire[i][0])==2&&board.getIDByPos([x+dire[i][0]/2,y])!=0) continue;
            if(Math.abs(dire[i][1])==2&&board.getIDByPos([x,y+dire[i][1]/2])!=0) continue;

            let curx = x + dire[i][0];
            let cury = y + dire[i][1];
            id = board.getIDByPos([curx,cury]);
            if(id == -1) continue;
            if (id == 0 || (id-8)*(this.id-8)<0) {
                if(id == 5 || id == 13) check=true;
                moves.push([curx,cury]);
            }
        }

        return [moves,check];
    }
}

class Minister extends Chess {
    constructor(id, pos) {
        super(id<8?'象':'相', id, pos);
    }

    findMoves(board) {
        const moves = [];
        let  check = false;
        const [x, y] = this.pos;
        const dire = [
            [2, 2], [2, -2], [-2, 2], [-2, -2]
        ];

        let id;
        for (let i = 0; i < dire.length; i++) {
            //踩象眼
            if (board.getIDByPos([x + dire[i][0] / 2, y + dire[i][1] / 2]) != 0) continue;

            let curx = x + dire[i][0];
            let cury = y + dire[i][1];
            if ((this.id > 8 && curx < 5) || (this.id < 8 && curx > 4)) continue;//象不能过河

            id = board.getIDByPos([curx, cury]);
            if (id == -1) {
                continue;
            }
            if (id == 0 || (id > 8) != (this.id > 8)) {
                if (id == 5 || id == 13) check = true;
                moves.push([curx, cury]);
            }
        }

        return [moves,check];
    }
}

// Implementing other classes similarly...

class Guard extends Chess {
    constructor(id, pos) {
        super(id<8?'仕':'士', id, pos);
    }

    findMoves(board) {
        const moves = [];
        let check = false;
        const [x, y] = this.pos;
        const dire = [
            [1, 1], [1, -1], [-1, 1], [-1, -1]
        ];
        let id;
        for (let i = 0; i < dire.length; i++) {

            let curx = x + dire[i][0];
            let cury = y + dire[i][1];
            id = board.getIDByPos([curx, cury]);
            if (id == -1) {
                continue;
            }
            if (cury >= 3 && cury <= 5) {
                if ((this.id < 8 && curx >= 0 && curx <= 2) || (this.id > 8 && curx >= 7 && curx <= 9)) {
                    if (id == 0 || (id > 8) != (this.id > 8)) {
                        if (id == 5 || id == 13) check = true;
                        moves.push([curx, cury]);
                    }
                }
            }
        }

        return [moves,check];
    }
}

class General extends Chess {
    constructor(id, pos) {
        super(id<8?'将':'帅', id, pos);
    }

    findMoves(board) {
        const moves = [];
        let check = false;
        const [x, y] = this.pos;
        const dire = [
            [1, 0], [-1, 0], [0, 1], [0, -1]
        ];

        let id;
        for (let i = 0; i < dire.length; i++) {
            let curx = x + dire[i][0];
            let cury = y + dire[i][1];
            if (cury >= 3 && cury <= 5) {
                if ((this.id < 8 && curx >= 0 && curx <= 2) || (this.id > 8 && curx >= 7 && curx <= 9)) {
                    id = board.getIDByPos([curx, cury]);
                    if (id == -1) continue;
                    if (id == 0 || (id > 8) != (this.id > 8)) {
                        moves.push([curx, cury]);
                    }
                }
            }

        }
        let forward = x<5?1:-1;
        for(let i = x+(forward*2); i<10;i+=forward){

            if(id == 5||id == 13){
                check = true;
                moves.push([i,y]);
            }
            else{
                break;
            }
        }
        return [moves,check];
    }
}

class Cannon extends Chess {
    constructor(id, pos) {
        super('炮', id, pos);
    }

    findMoves(board) {
        const moves = [];
        let  check = false;
        const [x, y] = this.pos;

        // Horizontal and vertical moves with a jump over one piece
        const dire = [
            [1, 0], [-1, 0], [0, 1], [0, -1]
        ];

        let id;
        for (let i = 0; i < dire.length; i++) {
            let curx = x;
            let cury = y;
            while (true) {
                curx += dire[i][0];
                cury += dire[i][1];
                id = board.getIDByPos([curx, cury]);
                if (id == -1) break;//位置不可访问
                if (id == 0) {//如果此处没有棋子
                    moves.push([curx, cury]);
                } else {//此处有棋子
                    //需要继续探索棋子之后是否存在对方棋子
                    while (true) {
                        curx += dire[i][0];
                        cury += dire[i][1];
                        id = board.getIDByPos([curx, cury]);
                        if (id == -1) break;
                        if (id == 0) continue;
                        if ((this.id > 8) != (id > 8) ) {
                            if (id == 5 || id == 13) check = true;
                            moves.push([curx, cury]);
                            break;
                        }
                    }
                    break;
                }
            }
        }

        return [moves,check];
    }
}

class Soldier extends Chess {
    constructor(id, pos) {
        super(id<8?'卒':'兵', id, pos);
    }

    findMoves(board) {
        const moves = [];
        let  check = false;
        const [x, y] = this.pos;
        let dire = this.id<8?[[1,0]]:[[-1,0]];
        if(this.id<8&&x>4||this.id>8&&x<5) {
            dire.push([0,-1]);
            dire.push([0,1]);
        }
        let id;
        for (let i = 0; i < dire.length; i++) {

            let curx = x + dire[i][0];
            let cury = y + dire[i][1];
            id = board.getIDByPos([curx, cury]);
            if (id == -1) {
                continue;
            }
            if (id == 0 || (id > 8) != (this.id > 8)) {
                if (id == 5 || id == 13) check = true;
                moves.push([curx, cury]);
            }
        }

        return [moves,check];
    }
}

class ChessFactory {
    getChessObjectByID(id,pos){
        if(id == 1 || id == 9){
            return new Rook(id,pos);
        }
        if(id == 2 || id == 10){
            return new Knight(id,pos);
        }
        if(id == 3 || id == 11){
            return new Minister(id,pos);
        }
        if(id == 4|| id == 12){
            return new Guard(id,pos);
        }
        if(id == 5 || id == 13){
            return new General(id,pos);
        }
        if(id == 6 || id == 14){
            return new Cannon(id,pos);
        }
        if(id == 7 || id == 15){
            return new Soldier(id,pos);
        }
        return null;

    }
}

const chessFactory = new ChessFactory()

class ChessBoard{
    constructor(){
        this.chessboard = [
            //黑色方
            [1,2,3,4,5,4,3,2,1],
            [0,0,0,0,0,0,0,0,0],
            [0,6,0,0,0,0,0,6,0],
            [7,0,7,0,7,0,7,0,7],
            [0,0,0,0,0,0,0,0,0],
            //红色方
            [0,0,0,0,0,0,0,0,0],
            [15,0,15,0,15,0,15,0,15],
            [0,14,0,0,0,0,0,14,0],
            [0,0,0,0,0,0,0,0,0],
            [9,10,11,12,13,12,11,10,9],
        ]
    }
    clone(chessboard){
        for(let i = 0;i <chessboard.length; i++){
            for(let j = 0; j<chessboard[i].length;j++){
                this.chessboard[i][j] = chessboard[i][j]
            }
        }
    }
    getIDByPos(pos){
        const [x,y] = pos;
        if(x<0 || x>9 || y<0 || y>8) return -1;
        return this.chessboard[x][y];
    }

    getChessBySide(side){
        const chesses = [];
        for(let i = 0;i <this.chessboard.length; i++){
            for(let j = 0; j<this.chessboard[i].length;j++){
                let id = this.chessboard[i][j];
                if(id === 0) continue;
                if(id>8 === side){
                    chesses.push(chessFactory.getChessObjectByID(id,[i,j]))
                }

            }
        }
        return chesses;
    }
    move(src,tgt){
        this.chessboard[tgt[0]][tgt[1]] = this.chessboard[src[0]][src[1]];
        this.chessboard[src[0]][src[1]] = 0;
    }
}

// const chessboard = new ChessBoard();