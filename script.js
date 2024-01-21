const GAME_BACKGROUND_COLOR = "white";
const GAME_BORDER_COLOR = "black";
const SNAKE_COLOR = 'lightgreen';
const SNAKE_BORDER_COLOR = 'darkgreen';

const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

main();

document.addEventListener("keydown", changeDirection)

function clearCanvas(){
    ctx.fillStyle = GAME_BACKGROUND_COLOR;
    ctx.strokeStyle = GAME_BORDER_COLOR;
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

let snake = [ 
    {x: 150, y: 150}, 
    {x: 140, y: 150}, 
    {x: 130, y: 150}, 
    {x: 120, y: 150}, 
    {x: 110, y: 150}, 
];

let dx=10;
let dy=0;

function drawSnakePart(snakePart) {
    ctx.fillStyle = SNAKE_COLOR;
    ctx.strokeStyle = SNAKE_BORDER_COLOR;
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);  
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {  
    snake.forEach(drawSnakePart);
}

function advanceSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    snake.pop();
}

function main() {
    setTimeout(function onTick() {
        clearCanvas();
        advanceSnake();
        drawSnake();
        main();
    }, 100)
}

function changeDirection(event) {
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;

    const keyPress = event.keyCode;
    const goUp = dy === -10;
    const goDown = dy === 10;
    const goRight = dx ===10;
    const goLeft = dx === -10;

    if (keyPress === LEFT && !goRight) {
        dx = -10;
        dy = 0;
    }

    if (keyPress === UP && !goDown) {
        dx = 0;
        dy = -10;
    }

    if (keyPress === RIGHT && !goLeft) {
        dx = 10;
        dy = 0;
    }

    if (keyPress === DOWN && !goUp) {
        dx = 0;
        dy = 10;
    }

}   