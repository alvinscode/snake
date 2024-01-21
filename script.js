/* init game structure */

const GAME_BACKGROUND_COLOR = "white";
const GAME_BORDER_COLOR = "black";
const SNAKE_COLOR = 'lightgreen';
const SNAKE_BORDER_COLOR = 'darkgreen';
const FOOD_COLOR = 'red';
const FOOD_BORDER_COLOR = 'darkred';

let snake = [ 
    {x: 150, y: 150}, 
    {x: 140, y: 150}, 
    {x: 130, y: 150}, 
    {x: 120, y: 150}, 
    {x: 110, y: 150}, 
];

let foodX;
let foodY;
let dx=10;
let dy=0;
let score=0;

const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

/* init game start */

main();
createFood();
document.addEventListener("keydown", changeDirection)

/* main game function */

function main() {
    if (didGameEnd()) return;

    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();
        main();
    }, 100)
}

/* snake function */

function clearCanvas(){
    ctx.fillStyle = GAME_BACKGROUND_COLOR;
    ctx.strokeStyle = GAME_BORDER_COLOR;
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

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
    const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
    if (didEatFood) {
        score += 10;
        document.getElementById('score').innerHTML = score;
        createFood();
    } else {
        snake.pop();
    }
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

/* food function */

function randomTen(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function createFood() {
    foodX = randomTen(0, gameCanvas.width - 10);
    foodY = randomTen(0, gameCanvas.height - 10);

    snake.forEach(function isFoodOnSnake(part) {
        const foodIsOnSnake = part.x == foodX && part.y == foodY;
        if (foodIsOnSnake) createFood();
    });   
}

function drawFood() {
    ctx.fillStyle = FOOD_COLOR;
    ctx.strokeStyle = FOOD_BORDER_COLOR;
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}

/* game end function */

function didGameEnd() {
    for (let i = 4; i < snake.length; i++) {
        const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y
        if (didCollide)
            return true
    }

    const hitLeftWall = snake[0].x <0;
    const hitRightWall = snake[0].x >gameCanvas.width - 10;
    const hitTopWall = snake[0].y <0;
    const hitBottomWall = snake[0].y > gameCanvas.height - 10;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
}