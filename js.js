var canvas = document.getElementById('main');
var ctx  = canvas.getContext('2d');
var x = canvas.width / 2, y= canvas.height - 30, dx = 4, dy = -4;
var ballRadius = 13, paddleHeight = 15, paddleWidth = 110;
var paddleX = (canvas.width - paddleWidth) / 2 ;
var rightPressed =  false, leftPressed = false;
var blockRows = 4, blockColumns = 7, blockWidth = 117, blockHeight = 25, blockPadding = 20;
var blockOffsetTop = 30, blockOffsetLeft = 30, score = 0, lives = 1;

var Blocks = [];
for (c =0; c < blockColumns; c++){
    Blocks[c] = [];
    for (r = 0; r < blockRows; r++){ Blocks[c] [r] = { x:0, y:0, status:1 }; }
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
    if (e.keyCode === 39) { rightPressed = true; }
    else if (e.keyCode === 37) { leftPressed = true; }
}

function keyUp(e) {
    if (e.keyCode === 39) { rightPressed = false; }
    else if (e.keyCode === 37) { leftPressed = false; }
}


function drawBlocks() {
    for (c = 0; c < blockColumns; c++){
        for (r = 0; r < blockRows; r++){
            if (Blocks[c] [r].status === 1){
                var blockX = (c * (blockWidth + blockPadding)) + blockOffsetLeft;
                var blockY = (r * (blockHeight + blockPadding)) + blockOffsetTop;
                Blocks[c][r].x = blockX;
                Blocks[c][r].y = blockY;
                ctx.beginPath();
                ctx.rect(blockX, blockY, blockWidth, blockHeight);
                ctx.fillStyle = "#78FC17";
                ctx.fill();
                ctx.closePath()
            }
        }
    }

}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x,y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath()

}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath()
}

function drawScore() {
    ctx.font = "20px Arial"; ctx.fillStyle = "white"; ctx.fillText("Score:" + score, 8, 20);
}

function breakBlock() {
    for (c = 0; c < blockColumns; c++){
        for (r = 0; r < blockRows; r++){
            var b = Blocks[c] [r];
            if (b.status === 1){
                if (x > b.x && x < b.x + blockWidth && y > b.y && y < b.y + blockHeight) {
                    dy = -dy;
                    b.status = 0 ;
                    score++;
                    if (score === blockRows * blockColumns){
                        alert("You Win...!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBlocks(); drawBall(); drawPaddle(); drawScore();breakBlock();

    if (y+ dy < ballRadius) { dy = -dy; }
    else if (y+ dy > canvas.height - ballRadius){
        if (x > paddleX && x < paddleX + paddleWidth) { dy = -dy; }
        else{ lives--;
        if (!lives){
            alert("Game Over...!");
            document.location.reload();
        } else {
             x = canvas.width / 2;
             y = canvas.height - 30;
             dx = 4;
             dy = -4;
             paddleX = (canvas.width - paddleWidth) / 2;
           }
        }
    }
    if (x+ dx > canvas.width - ballRadius || x + dx < ballRadius) { dx = -dx }
    if (rightPressed && paddleX < canvas.width - paddleWidth) { paddleX += 7;}
    else if (leftPressed && paddleX > 0) { paddleX -= 7; }
    x += dx; y += dy;
    requestAnimationFrame(draw);
}
draw();
