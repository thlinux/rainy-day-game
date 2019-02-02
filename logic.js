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


//event listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//calling draw funciton ever 10 miliseconds
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

function draw() {
    //clearing canvas 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //calling draw ball
    drawBall();
    //calling draw paddle
    drawPaddle();

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
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
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
