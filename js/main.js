var
    cvs     = document.getElementById('canvas'),
    ctx     = cvs.getContext('2d'),
    wWidth  = window.innerWidth,
    wHeight = window.innerHeight;
cvs.width = wWidth;
cvs.height = wHeight;

var 
    cell = 5,
    rows = 50,
    columns = 50;
var life = new Life(rows, columns);
window.onload = function() {
    life.reviveRandomCells(rows*columns/8);
    setInterval(draw, 1000/100); //10 fpc
    // window.requestAnimationFrame(draw);
};
function draw() {
    clearCanvas();
    life.changeAge();
    ctx.fillStyle = "white";
    ctx.font = "italic "+cell*2+"pt Arial";
    ctx.fillText("Ages: "+life.agesNum, rows*cell, cell*2);
    ctx.fillText("Live: "+life.liveCells, rows*cell, cell*4);
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < columns; y++) {
            let l = life.getCell(y,x,0);
            let e = life.getCell(y,x,1);
            let col = life.getCell(y,x,2);
            drawCell(y,x,e,col);
        }
    }
    // window.requestAnimationFrame(draw);
}
function clearCanvas() {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, wWidth, wHeight );
    ctx.closePath();
}
function drawCell(x,y,e=20,col) {
    ctx.beginPath();
    if (e == 3) {
        color = mapInt(e, 0, 20, 0, 255);
        ctx.fillStyle = 'rgba('+color+','+color+','+color+')';
        ctx.fillRect(x*cell+(cell/4), y*cell+(cell/4), cell/2, cell/2);
    } else {
        color = mapInt(e, 0, 20, 0, 255);
        ctx.fillStyle = 'rgba('+0+','+col+','+0+')';
        ctx.fillRect(x*cell, y*cell, cell, cell);
    }
    ctx.closePath();
}
function mapInt(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}