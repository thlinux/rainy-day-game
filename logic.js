//grabbing a reference to the canvas
let canvas = document.getElementById("myCanvas");

//storing the 2d rendering context
let ctx = canvas.getContext("2d");

//testing printing of canvas
ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle =  "#FF0000";
ctx.fill();
ctx.closePath();