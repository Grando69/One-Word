const BgColor = "#247BA0";
const SnakeColor = "#F0F4EF";
const FoodColor = "#DB9D47";

const socket = io("http://127.0.0.1:8080");

socket.on("init", handleInit);
socket.on("gameState", handleGameState);
socket.on("gameOver", handleGameOver);

const gameScreen = document.getElementById("gameScreen");
const initialScreen = document.getElementById("initialScreen");
// ! 42:32 https://www.youtube.com/watch?v=ppcBIHv_ZPs&t=43m32s

let canvas, ctx;

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  canvas.width = canvas.height = 600;

  ctx.fillStyle = BgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  document.addEventListener("keydown", keydown);
}

function keydown(key) {
  socket.emit("keyDown", key.keyCode);
}

init();

function paintGame(state) {
  ctx.fillStyle = BgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const food = state.food;
  const gridSize = state.gridSize;
  const size = canvas.width / gridSize;

  ctx.fillStyle = FoodColor;
  ctx.fillRect(food.x * size, food.y * size, size, size);

  paintPlayer(state.player, size, SnakeColor);
}

function paintPlayer(playerState, size, color) {
  const snake = playerState.snake;

  ctx.fillStyle = color;
  for (let cell of snake) {
    ctx.fillRect(cell.x * size, cell.y * size, size, size);
  }
}

function handleInit(msg) {
  console.log(msg);
}

function handleGameState(gameState) {
  gameState = JSON.parse(gameState);

  requestAnimationFrame(() => {
    paintGame(gameState);
  });
}

function handleGameOver() {
  alert("You Lose!");
}
