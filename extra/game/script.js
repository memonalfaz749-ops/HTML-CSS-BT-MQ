const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let box = 20;
let snake = [];
snake[0] = { x: 9 * box, y: 9 * box };

let food = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
};

let score = 0;
let direction;
let game;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.key === "ArrowLeft" && direction !== "RIGHT")
        direction = "LEFT";
    else if (event.key === "ArrowUp" && direction !== "DOWN")
        direction = "UP";
    else if (event.key === "ArrowRight" && direction !== "LEFT")
        direction = "RIGHT";
    else if (event.key === "ArrowDown" && direction !== "UP")
        direction = "DOWN";
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 400);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "lime" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        document.getElementById("score").innerText = score;
        food = {
            x: Math.floor(Math.random() * 19) * box,
            y: Math.floor(Math.random() * 19) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if (
        snakeX < 0 || snakeY < 0 ||
        snakeX >= 400 || snakeY >= 400
    ) {
        clearInterval(game);
        alert("Game Over 😢");
    }

    snake.unshift(newHead);
}

function startGame() {
    game = setInterval(draw, 100);
}