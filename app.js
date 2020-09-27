const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
/* 캔버스 너비를 설정해야 선을 그릴 수 있다.*/
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

/* 맥북은 default 설정을 해줘야 한다. */
ctx.fillStyle="white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR; //선의 색상선택
ctx.fillStyle = INITIAL_COLOR; 
ctx.lineWidth = 2.5; // 선의 너비

let painting = false;
let filling = false;

function startPainting() {
    painting = true;   
}

function stopPainting() {
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        //console.log("creating path in " + x,y)
        ctx.beginPath(); // 라인
        ctx.moveTo(x,y); // 이동한 경로를 저장
    } else {
        //console.log("creatin line in " + x,y)
        ctx.lineTo(x,y); // path의 이전 위치서 지금 위치까지 선 이동
        ctx.stroke(); // 현재의 strokeStyle로 선을 긋는다.
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;    
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const value = event.target.value;
    ctx.lineWidth = value;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText= "Paint";
    }
     
}

function handCanvasClick() {
    if(filling) {
       ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[Export]";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handCanvasClick)
    canvas.addEventListener("contextmenu", handleCM)
}

Array.from(colors).forEach(color => 
    color.addEventListener("click",handleColorClick)
);

if(range) {
    range.addEventListener("input",handleRangeChange)
}

if(mode) {
    mode.addEventListener("click",handleModeClick)
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick)
}