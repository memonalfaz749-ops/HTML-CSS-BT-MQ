let startX = 0;
let startY = 0;

canvas.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

canvas.addEventListener("touchmove", function (e) {
    if (!startX || !startY) return;

    let diffX = e.touches[0].clientX - startX;
    let diffY = e.touches[0].clientY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0 && direction !== "LEFT") direction = "RIGHT";
        else if (diffX < 0 && direction !== "RIGHT") direction = "LEFT";
    } else {
        if (diffY > 0 && direction !== "UP") direction = "DOWN";
        else if (diffY < 0 && direction !== "DOWN") direction = "UP";
    }

    startX = 0;
    startY = 0;
});