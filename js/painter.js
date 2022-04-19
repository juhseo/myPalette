//변수 지정
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const btns = document.querySelector('.btns');
const addBtn = document.querySelector('#addBtn');
const saveBtn = document.querySelector('.save');
const paintImg = document.querySelector('#paintImg');
const brushImg  = document.querySelector('#brushImg');
const bg = document.querySelector('#bg');
const popUp = document.querySelector('#popUp');
const close = document.querySelector('#exit')

let drawing = false;
let fill = false;

ctx.strokeStyle='black';

//이벤트 연결
//01.드로잉
canvas.addEventListener('mousemove',draw);

btns.addEventListener('click',function(e){
    let btnColor = e.target.innerHTML;
    ctx.strokeStyle = btnColor;
    ctx.fillStyle = btnColor;
})

//02. 지우기 버튼 활성화
addBtn.addEventListener('click',function(e){
    let btnColor = e.target.innerHTML;
    if(btnColor == 'RESET'){
        ctx.clearRect(0,0,canvas.width, canvas.height);
    }
})

//03. 채우기 버튼 활성화
function fillClick(){
    if(fill){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}
paintImg.addEventListener('click',function(){
    fill = true;
    drawing =false;
})
canvas.addEventListener('click',fillClick);
brushImg.addEventListener('click',function(){
    fill= false;
    canvas.addEventListener('mousedown',function(){
        drawing = true;
    })
    canvas.addEventListener('mouseup',function(){
        drawing = false;
    })
})

//04.그림 그리는 함수 생성
function draw(e){
    //좌표지정
    const x = e.offsetX;
    const y = e.offsetY;
    
    if(!drawing) return;

    //펜툴 지정
    ctx.lineWidth = 30;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x,y);
    ctx.stroke();
}

//05. 버튼 클릭시 색상변경
paintImg.addEventListener('click',function(){
    paintImg.style.boxShadow='2px 2px 2px lightblue, 2px 2px 2px lightblue';
    brushImg.style.boxShadow='0 2px 2px rgba(0,0,0,0.05), 0 2px 2px rgba(0,0,0,0.05)';
})
brushImg.addEventListener('click',function(){
    brushImg.style.boxShadow='2px 2px 2px lightblue, 2px 2px 2px lightblue';
    paintImg.style.boxShadow='0 2px 2px rgba(0,0,0,0.05), 0 2px 2px rgba(0,0,0,0.05)';
})

//06. 우클릭 저장 방지
function saveAutoimg(e){
    e.preventDefault();
}
canvas.addEventListener('contextmenu',saveAutoimg);


//07. SAVE 버튼 활성화
function saveCk(){
    const img = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = img;
    link.download = "다운로드";
    link.click();
}
if(saveBtn) {
    saveBtn.addEventListener('click',saveCk);
}

//08.팝업창
window.onload = function(){
    function closeBtn(){
        bg.style.display='none';
        popUp.style.display='none';
    }
    close.addEventListener('click',closeBtn);
}

