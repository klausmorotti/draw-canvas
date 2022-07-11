// INITIAL DATA
let currentColor = 'black';
let colors = document.querySelectorAll('.colorArea .color');
let canDraw = false;
let mouseX = 0;
let mouseY = 0;
// Selecionando o canvas e criando seu contexto onde faremos tudo
let screen = document.querySelector('canvas');
let context = screen.getContext('2d');




// EVENTS
colors.forEach((color) => {
    color.addEventListener('click', selectColor);
})
document.querySelector('.clear').addEventListener('click', clearScreen);


/*
LÓGICA UTILIZADA:
- Ao clicar no mouse, ative o modo desenho.
- Ao mover o mouse, se o modo desenho estiver ativado, desenhe.
- Ao desclicar o mouse, desative o modo desenho.
*/
screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);



// FUNCTIONS
// Função selecionar cor
function selectColor(e) {
    // Pegando a cor selecionada
    currentColor = e.target.getAttribute('data-color');

    // Adicionando a borda na cor selecionada
    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}

//Função ao clicar no mouse para desenhar
function mouseDownEvent(e) {
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e) {
    if( canDraw ) {
        draw(e.pageX, e.pageY);
    }
}

function mouseUpEvent() {
    canDraw = false;
}

function draw(x, y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    context.beginPath();
    context.lineWidth = 5;
    context.lineJoin = 'round';
    context.moveTo(mouseX, mouseY);
    context.lineTo(pointX, pointY);
    context.closePath();
    context.strokeStyle = currentColor;
    context.stroke();

    mouseX = pointX;
    mouseY = pointY;
}

function clearScreen() {
    context.setTransform(1, 0, 0, 1, 0, 0)
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}
