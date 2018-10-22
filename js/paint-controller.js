"use strict";

const MAIN = "#393e46";
const SECONDARY = "#00adb5";
const LIGHT = "#eeeeee";
const DARK = "#222831";

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var renderInterval;

addEventListener("mousemove", updateCurrPos);
addEventListener("mousedown", mouseDown);
addEventListener("mouseup", mouseUp);

function mouseDown() {
  gSets.isDown = true;
}
function mouseUp() {
  gSets.isDown = false;
}

//draw shapes functions
function useBrush() {
  //decides which shape
  let sets = getSettings();

  switch (sets.brushStyle) {
    case "rect":
      drawRect(sets.currPos, sets.prevPos, sets.color, sets.bgColor);
      break;
    case "circle":
      drawCircle(sets.currPos, sets.prevPos, sets.color, sets.bgColor);
      break;
    case "triangle":
      drawTriangle(sets.currPos, sets.prevPos, sets.color, sets.bgColor);
      break;
  }
}

function drawRect(pos, prevPos, color, bgColor) {
  let x = prevPos.x;
  let y = prevPos.y;
  let i = pos.x;
  let j = pos.y;

  //calc rect vertexes
  var firstDot = { x: x + (j - y), y: y - (i - x) };
  var secondDot = { x: i + (j - y), y: j - (i - x) };
  var thirdDot = { x: i - (j - y), y: j + (i - x) };
  var fourthDot = { x: x - (j - y), y: y + (i - x) };

  ctx.beginPath();
  ctx.moveTo(firstDot.x, firstDot.y);
  ctx.lineTo(secondDot.x, secondDot.y);
  ctx.lineTo(thirdDot.x, thirdDot.y);
  ctx.lineTo(fourthDot.x, fourthDot.y);
  ctx.closePath();

  ctx.fillStyle = bgColor;
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.fill();
}
function drawTriangle(pos,prevPos, color, bgColor) {
  
  let x = prevPos.x;
  let y = prevPos.y;
  let i = pos.x;
  let j = pos.y;
  var firstDot = {
    x:(x+i)/2+j-y,
    y:(y+j)/2+i-x
  }
  var secondDot = {
    x:2*x-firstDot.x,
    y:2*y-firstDot.y
  }
  var thirdDot = {
    x:2*i-firstDot.x,
    y:2*j-firstDot.y
  }


  ctx.beginPath();
  ctx.fillStyle = bgColor;
  ctx.strokeStyle = color;

  ctx.moveTo(firstDot.x,firstDot.y);
  ctx.lineTo(secondDot.x, secondDot.y);
  ctx.lineTo(thirdDot.x, thirdDot.y);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}
function drawCircle(pos, prevPos, color, bgColor) {
  let x = prevPos.x;
  let y = prevPos.y;
  let i = pos.x;
  let j = pos.y;

  ctx.beginPath();
  ctx.fillStyle = bgColor;
  ctx.strokeStyle = color;
  ctx.arc((x + i) / 2, (y + j) / 2, Math.sqrt((i - x) * (i - x) + (j - y) * (j - y))/2, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
}


//nav bar functions
function updateBrushStyle(brush) {
  gSets.brushStyle = brush;
}
function udpateBrushColor(color) {
  gSets.color = color;
}
function updateFillColor(color) {
  gSets.bgColor = color;
  document.body.style.backgroundColor = gSets.bgColor;
}
function onClearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function downloadCanvas(ev) {
  var download = document.getElementById("download");
  var image = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  download.setAttribute("href", image);
  //download.setAttribute("download","archive.png");
}