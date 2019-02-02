//grabbing a reference to the canvas
let canvas = document.getElementById("myCanvas");

//storing the 2d rendering context
let ctx = canvas.getContext("2d");

// //testing printing of canvas
// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle =  "#FF0000";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
// ctx.stroke();
// ctx.closePath();

//**** animation testing***

//defining x and y positions
let x = canvas.width/2;
let y = canvas.height-30;

//defining movement change value
let dx = 2;
let dy = -2;


function draw() {
    //clearing canvas 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //drawing the circle
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    
    //changing the x and y value of the ball
    x += dx;
    y += dy;
}

//calling draw funciton ever 10 miliseconds
setInterval(draw, 10);