const io = require("socket.io")();
const { createGameState, gameLoop, getUpdatedVelocity } = require("./game");
const { FRAME_RATE } = require("./constants");

io.on("connection", (client) => {
  const state = createGameState();

  client.on("keyDown", handleKeyDown);

  function handleKeyDown(keyCode) {
    try {
      keyCode = parseInt(keyCode);
    } catch (error) {
      console.error(error);
      return;
    }

    const vel = getUpdatedVelocity(keyCode);

    if (vel) state.player.vel = vel;
  }

  startGameInterval(client, state);
});

function startGameInterval(client, gameState) {
  const intervalID = setInterval(() => {
    const winner = gameLoop(gameState);

    if (!winner) {
      client.emit("gameState", JSON.stringify(gameState));
    } else {
      client.emit("gameOver");
      clearInterval(intervalID);
    }
  }, 1000 / FRAME_RATE);
}

io.listen(8080);
