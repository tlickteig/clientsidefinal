var value = 0;
var length = 160;

function start() {
    
    var canvas = document.getElementById("mainCanvas");
    var ctx = canvas.getContext("2d");
    
    drawMeter(canvas, ctx);
    drawDisplay(value, canvas, ctx);
    drawNeedle(0, canvas, ctx);    
}

function clickUp() {
    
    var canvas = document.getElementById("mainCanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.width;          
    
    if(value < 100) {
        value = value + 1;
    }
    
    drawMeter(canvas, ctx);
    drawDisplay(value, canvas, ctx);
    drawNeedle(value, canvas, ctx);           
}

function clickDown() {
    
    var canvas = document.getElementById("mainCanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.width;
    
    if(value > 0) {
        value = value - 1;
    }
    
    drawMeter(canvas, ctx);
    drawDisplay(value, canvas, ctx);
    drawNeedle(value, canvas, ctx);
}

function drawMeter(canvas, ctx) {
          
    ctx.beginPath();
    ctx.arc(250, 250, 240, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(250, 250, 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    
    ctx.font = "bold 30px Arial";
    ctx.fillStyle = 'blue';
    ctx.fillText("0", 120, 445);
    ctx.fillText("10", 40, 360);
    ctx.fillText("20", 20, 253);
    ctx.fillText("30", 50, 148);
    ctx.fillText("40", 125, 70);
    ctx.fillText("50", 235, 40);
    ctx.fillText("60", 340, 70);
    ctx.fillText("70", 415, 148);
    ctx.fillText("80", 445, 253);
    ctx.fillText("90", 425, 360);
    ctx.fillText("100", 340, 445);    
}

function drawNeedle(value, canvas, ctx) {
    
    //value = value * 1;
    value = (2.93 * value + 78.5);
    
    ctx.beginPath();
    ctx.lineWidth = 5;       
    ctx.translate(250, 250);   
    ctx.strokeStyle = 'red';
    ctx.rotate(value * (Math.PI / 180));    
    ctx.moveTo(0, 0);    
    ctx.lineTo(length, length);    
    ctx.stroke();
}

function drawDisplay(value, canvas, ctx) {
    
    value = value + "";
    
    if(value.length === 1) {
        value = "0" + value;
    }
    if(value.length === 2) {
        value  = "0" + value;
    }
    
    ctx.font = "bold 75px Arial";
    ctx.fillStyle = 'gray';
    ctx.fillText(value, 190, 400);
}