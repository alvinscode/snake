const GAME_BACKGROUND_COLOR = "white";
const GAME_BORDER_COLOR = "black";
const SNAKE_COLOR = 'lightgreen';
const SNAKE_BORDER_COLOR = 'darkgreen';

const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

ctx.fillStyle = GAME_BACKGROUND_COLOR;
ctx.strokeStyle = GAME_BORDER_COLOR;
ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);

let snake = [ {x: 150, y: 150}, {x: 140, y: 150}, {x: 130, y: 150}, {x: 120, y: 150}, {x: 110, y: 150}, ];

function drawSnakePart(snakePart) {
    ctx.fillStyle = SNAKE_COLOR;
    ctx.strokeStyle = SNAKE_BORDER_COLOR;
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);  
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {  
    snake.forEach(drawSnakePart);
}

drawSnake();