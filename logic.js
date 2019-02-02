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


//calling draw funciton ever 10 miliseconds
setInterval(draw, 10);


function drawBall() {
    //drawing the circle
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    //clearing canvas 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //calling draw ball
    drawBall();

    //changing the x and y value of the ball
    x += dx;
    y += dy;

    //collosion detection
    //if the position of the ball is lower than 0 or greater than the canvas width, reserve the movement
    if(x + dx > canvas.width || x + dx < 0) {
        //reverse
        dx = -dx;
    }
    //if the position of the ball is lower than 0 or greater than the canvas height, reverse the movement
    if(y + dy > canvas.height || y + dy < 0) {
        //reverse
        dy = -dy;
    }
}
