const canvas = document.querySelector("#canvas");
canvas.height = window.innerHeight - 100;
canvas.width = window.innerWidth - 500;
const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let draw_color = "black";
let draw_width = "10";
let is_drawing = false;
let is_shape = false;
let canvasArea = document.querySelector(".canvasArea");
const clears = document.querySelector(".select");
clears.addEventListener("click", clear);

let arr = [];
let index = -1;

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);

canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

function start(e) {
  is_drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  e.preventDefault();
}
function draw(e) {
  if (is_drawing === false) return;
  ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  ctx.strokeStyle = draw_color;
  ctx.lineWidth = draw_width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
  e.preventDefault();
}

function stop(e) {
  if (is_drawing) {
    ctx.stroke();
    ctx.closePath();
    is_drawing = false;
  }
  e.preventDefault();
  if (e.type != "mouseout") {
    arr.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
  }
}
const pen = document.querySelector(".pen");
const dropdown = document.querySelector(".color");
pen.addEventListener("click", penfunc);
function penfunc(e) {
  is_shape = false;
  draw_width = "5";
  draw_color = "black";
  console.log(pen.parentElement);
  pen.parentElement.classList.add("btn-click");
  eraser.parentElement.classList.remove("btn-click");
  shape.parentElement.classList.remove("btn-click");
  dropdown_shape.classList.remove("shapes1");
  size.classList.remove("size1");
  dropdown.classList.toggle("color1");
  pen.parentElement.style.backgroundColor = "black";
}
console.log(dropdown);
dropdown.addEventListener("click", dropdownfunc);

function dropdownfunc(e) {
  console.log(e.target.id);
  if (e.target.id === "s1") {
    draw_width = "5";
  }
  if (e.target.id === "s2") {
    draw_width = "10";
  }
  if (e.target.id === "s3") {
    draw_width = "15";
  }
  if (e.target.id === "s4") {
    draw_width = "20";
  }
  if (e.target.id === "yellow") {
    draw_color = "orange";
    pen.parentElement.style.backgroundColor = "orange";
  }
  if (e.target.id === "red") {
    draw_color = "red";
    pen.parentElement.style.backgroundColor = "red";
  }
  if (e.target.id === "blue") {
    draw_color = "blue";
    pen.parentElement.style.backgroundColor = "blue";
  }
  if (e.target.id === "green") {
    draw_color = "green";
    pen.parentElement.style.backgroundColor = "green";
  }
}
function clear() {
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  arr = [];
  index = -1;
}
const eraser = document.querySelector(".eraser");
const size = document.querySelector(".size");
eraser.addEventListener("click", function (e) {
  eraser.parentElement.classList.add("btn-click");
  pen.parentElement.classList.remove("btn-click");
  shape.parentElement.classList.remove("btn-click");
  dropdown.classList.remove("color1");
  dropdown_shape.classList.remove("shapes1");
  size.classList.toggle("size1");
  pen.parentElement.style.backgroundColor = "white";
  draw_width = "15";
  draw_color = "white";
});
size.addEventListener("click", function (e) {
  if (e.target.id === "s5") {
    draw_width = "10";
  }
  if (e.target.id === "s6") {
    draw_width = "15";
  }
  if (e.target.id === "s7") {
    draw_width = "20";
  }
  if (e.target.id === "s8") {
    draw_width = "50";
  }
});
const undo = document.querySelector(".undo");
undo.addEventListener("click", function () {
  dropdown.classList.remove("color1");
  dropdown_shape.classList.remove("shapes1");
  pen.parentElement.classList.remove("btn-click");
  eraser.parentElement.classList.remove("btn-click");
  shape.parentElement.classList.remove("btn-click");
  size.classList.remove("size1");
  pen.parentElement.style.backgroundColor = "white";
  if (index <= 0) {
    clear();
  }
  index -= 1;
  arr.pop();
  ctx.putImageData(arr[index], 0, 0);
});
const shape = document.querySelector(".shape");
const dropdown_shape = document.querySelector(".shapes");
shape.addEventListener("click", function () {
  shape.parentElement.classList.add("btn-click");
  pen.parentElement.classList.remove("btn-click");
  eraser.parentElement.classList.remove("btn-click");
  dropdown_shape.classList.toggle("shapes1");
  dropdown.classList.remove("color1");
  size.classList.remove("size1");
  pen.parentElement.style.backgroundColor = "white";
});
let drawShape = "";

dropdown_shape.addEventListener("click", function (e) {
  drawShape = e.target.id;
  is_shape = true;
  is_drawing = false;
  canvasArea.addEventListener("click", addEvent);
});
function addEvent(e) {
  console.log(is_shape);
  if (is_shape === false) return;
  let x = e.clientX - canvas.offsetLeft;
  let y = e.clientY - canvas.offsetTop;
  if (drawShape === "s9") {
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, 2 * Math.PI);
    ctx.stroke();
  } else if (drawShape === "s10") {
    ctx.beginPath();
    ctx.rect(x, y, 150, 100);
    ctx.stroke();
  } else if (drawShape === "s11") {
    ctx.beginPath();
    ctx.rect(x, y, 150, 150);
    ctx.stroke();
  }
}
canvasArea.addEventListener("click", function () {
  dropdown.classList.remove("color1");
  dropdown_shape.classList.remove("shapes1");
  size.classList.remove("size1");
});

const themeSwitch = document.querySelector("input");

themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark-theme");
});
