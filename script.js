const CANVAS_BACKGROUND_COLOR = "white";
const CANVAS_BORDER_COLOR = "black";

const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
ctx.strokeStyle = CANVAS_BORDER_COLOR;
ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
