//grabbing a reference to the canvas
let canvas = document.getElementById("myCanvas");
//storing the 2d rendering context
let ctx = canvas.getContext("2d");
//defining x and y positions
let x = canvas.width/2;
let y = canvas.height-30;
//defining movement change value
let dx = 2;
let dy = -2;
//ball properties
let ballRadius = 10;
//paddle properties
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2; //paddle starting point
//user interaction
let rightPressed = false;
let leftPressed = false;
//brick properties
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
//bricks
let bricks = [];
//score
let score = 0;
//lives
let lives = 3;


//creating brick objects in a 2d array
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1}
    }

}
//event listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

//calling draw funciton ever 10 miliseconds
//*********START OF GAME**********  
let interval = setInterval(draw, 10);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") { //finding if the right arrow key is pressed
        rightPressed = true;    //if so, then set coresponding var true
    } else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;

    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

//adding mouse control support
function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - (paddleWidth / 2);
    }
}

function drawBricks() {
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawBall() {
    //drawing the circle
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath;
    ctx.rect(paddleX, (canvas.height - paddleHeight), paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function collosionDetection() {
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == (brickColumnCount * brickRowCount)) {
                        alert("WINNER WINNER CHICKEN DINNER!");
                        document.location.reload();
                        clearInterval(interval);
                    }
                }
            }   
        }
    }
}

function draw() {
    //clearing canvas 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //calling draw bricks
    drawBricks();
    //calling draw ball
    drawBall();
    //calling draw paddle
    drawPaddle();
    //calling collesion detection
    collosionDetection();
    //drawing score
    drawScore();
    //changing the x and y value of the ball
    x += dx;
    y += dy;

    //collosion detection
    //if the position of the ball is lower than 0 or greater than the canvas width, reserve the movement
    if((x + dx) > (canvas.width - ballRadius) || (x + dx) < ballRadius) {
        //reverse
        dx = -dx;
    }
    //if the position of the ball is lower than 0 or greater than the canvas height, reverse the movement
    if((y + dy) < ballRadius) {
        //reverse
        dy = -dy;
    } else if ((y + dy) > (canvas.height - ballRadius)) { //if ball hits bottom then game over
        if(x > paddleX && x < (paddleX + paddleWidth)) {
            dy = -dy;
        } else {
            lives--;
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();
                clearInterval(interval); // Needed for Chrome to end game
            }
            else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }

    }

    //paddle movement
    //if arrow pressed and inside the canvas then move the paddle 7 pixels left or right
    if(rightPressed && paddleX < (canvas.width - paddleWidth)) {
        paddleX += 7;
    } else if(leftPressed && paddleX > 0) {
        paddleX += -7;
    }
}
