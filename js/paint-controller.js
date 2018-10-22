'use strict'

const MAIN = '#393e46';
const SECONDARY = '#00adb5';
const LIGHT = '#eeeeee';
const DARK = '#222831';

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var renderInterval;

addEventListener('mousemove', updateCurrPos)
addEventListener('mousedown', mouseDown);
addEventListener('mouseup', mouseUp);


function mouseDown() {
    gSets.isDown = true;
}
function mouseUp() {
    gSets.isDown = false;
}



//draw shapes functions
function useBrush() {
    //decides which shape
    let sets = getSettings()
    
    switch (sets.brushStyle) {
        case 'rect':
            drawRect(sets.currPos,sets.prevPos,sets.color,sets.bgColor);
            break;
        case 'circle':
            drawCircle(pos, sets.color,sets.bgColor);
            break;
        case 'triangle':
            drawTriangle(pos, sets.color,sets.bgColor);
            break;
    }
}

function drawRect(pos,prevPos, color, bgColor) {

    let x=prevPos.x;
    let y=prevPos.y;
    let i=pos.x;
    let j=pos.y;
    
    //calc rect vertexes
    var firstDot = {x:x+(j-y),y:y-(i-x)};
    var secondDot ={x:i+(j-y),y:j-(i-x)} 
    var thirdDot = {x:i-(j-y),y:j+(i-x)};
    var fourthDot = {x:x-(j-y),y:y+(i-x)};

    ctx.beginPath();
    ctx.moveTo(firstDot.x,firstDot.y)
    ctx.lineTo(secondDot.x, secondDot.y);
    ctx.lineTo(thirdDot.x, thirdDot.y);
    ctx.lineTo(fourthDot.x, fourthDot.y);
    ctx.closePath(); 
    
    


    
    ctx.fillStyle = bgColor
    ctx.strokeStyle = color;
    ctx.stroke()
    ctx.fill()
    
}
function drawTriangle(pos, color, bgColor) {
    console.log('drawing a Triangle in:', color, pos, gSets.brushStyle, typeof(color), color);
    ctx.beginPath();
    ctx.fillStyle = bgColor
    ctx.strokeStyle = color;   
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(pos.x +100, pos.y +200);
    ctx.lineTo(pos.x +200, pos.y+200);
    ctx.closePath(); 
    ctx.stroke();   
    ctx.fill()
}
function drawCircle(pos, color,bgColor) {
    console.log('drawing a Circle in:', color, pos);
    ctx.beginPath();
    ctx.fillStyle = bgColor
    ctx.strokeStyle = color;
    ctx.arc(pos.x, pos.y, 100, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill()
}


//nav bar functions
function updateBrushStyle(brush) {
    gSets.brushStyle =   brush;
}
function udpateBrushColor(color) {
    gSets.color = color;
}
function updateFillColor(color) {
    gSets.bgColor = color;
    document.body.style.backgroundColor = gSets.bgColor;
}

function onClearCanvas() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
}