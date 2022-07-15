// INITIAL DATA
let canvas = document.querySelector('main .drawingBoard');
let ctxCanvas = canvas.getContext('2d');
let currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;
let btnEraser = document.querySelector('.buttons .btnEraser');
let btnDownload = document.querySelector('.buttons .btnDownload');

// EVENTS
btnEraser.addEventListener('click', switchCursor);
btnDownload.addEventListener('click', downloadDraw);

document.querySelectorAll('.colorPalette .color').forEach((color) => {
    color.addEventListener('click', selectColor);
})

// Eventos de clique do quadro de desenhos
canvas.addEventListener('mousedown', mouseDownEvent);
canvas.addEventListener('mousemove', mouseMoveEvent);
canvas.addEventListener('mouseup', mouseUpEvent);

// Evento que chama a função de limpar quadro
document.querySelector('.buttons .btnCleanAll').addEventListener('click', cleanDraw);

// FUNCTIONS

// Transformando cursor normal para borracha
function switchCursor(e) {
    let cursor = e.target.getAttribute('data-cursor');
    
    if ( cursor == 'eraser' ) {
        e.target.src = '../assets/images/crosshair.png';
        e.target.setAttribute('data-cursor', 'crosshair');
        
    } else {
        e.target.src = '../assets/images/eraser.png';
        e.target.setAttribute('data-cursor', 'eraser')
    }
}

// Função que faz download do desenho
function downloadDraw() {
    btnDownload.download = 'Desenho-canvas.png';
    btnDownload.href = canvas.toDataURL('image/png');
}

// Selecionando a cor do pincel
function selectColor(e) {
    currentColor = e.target.getAttribute('data-color')
    
    document.querySelector('.colorPalette .color.active').classList.remove('active');
    e.target.classList.add('active');
}

// Funções de clique na tela de desenho
function mouseDownEvent(e) {
    canDraw = true;
    mouseX = e.pageX - canvas.offsetLeft;
    mouseY = e.pageY - canvas.offsetTop;
}  

function mouseMoveEvent(e) {
    if( canDraw ) {
        draw(e.pageX, e.pageY);
    }
}

function mouseUpEvent() {
    canDraw = false;
}

// Função que desenha efetivamente
function draw(x, y) {
    let pointX = x - canvas.offsetLeft;
    let pointY = y - canvas.offsetTop;

    ctxCanvas.beginPath();
    ctxCanvas.lineWidth = 3;
    ctxCanvas.lineJoin = 'round';
    ctxCanvas.moveTo(mouseX, mouseY);
    ctxCanvas.lineTo(pointX, pointY);
    ctxCanvas.closePath();
    ctxCanvas.strokeStyle = currentColor;
    ctxCanvas.stroke();

    mouseX = pointX;
    mouseY = pointY;
}

// Função que limpa o quadro
function cleanDraw() {
    ctxCanvas.setTransform(1, 0, 0, 1, 0, 0);
    ctxCanvas.clearRect(0, 0, ctxCanvas.canvas.width, ctxCanvas.canvas.height);
}
