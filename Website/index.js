// const socket = io("139.177.178.13:8080");
const socket = io("127.0.0.1:8080");

// !127.0.0.1 == localhost

const wordConfirm = document.getElementById("wordConfirm");
const wordConfirmDisabled = document.getElementById("wordConfirmDisabled");
const wordInput = document.getElementById("wordInput");
const currentSentence = document.getElementById("currentSentence");
const id = document.getElementById("id");
const joinButton = document.getElementById("joinButton");
const joinInput = document.getElementById("joinInput");
const joinButtonMobile = document.getElementById("joinButtonMobile");
const joinInputMobile = document.getElementById("joinInputMobile");
const createNewButton = document.getElementById("createNewButton");
const titleScreen = document.getElementById("titleScreen");
const gameScreen = document.getElementById("gameScreen");
const resetButton = document.getElementById("reset");
const resetDisabled = document.getElementById("resetDisabled");
const currentPlayerSpan = document.getElementById("currentPlayerSpan");
const playerNumberSpan = document.getElementById("playerNumberSpan");

let buttonEnabled = true;
let playerNumber;
wordInput.value = "";
let currentPlayer;
let playerCount = 1;
wordConfirm.addEventListener("click", handleWordConfirm);
createNewButton.addEventListener("click", handleNewGame);
joinButton.addEventListener("click", handleJoinGame);
joinButtonMobile.addEventListener("click", handleJoinGameMobile);
resetButton.addEventListener("click", handleReset);

document.querySelector("#wordInput").addEventListener("keyup", (event) => {
  if (event.key !== "Enter" || !buttonEnabled) return;
  else wordConfirm.click();
});

socket.on("gameCode", handleGameCode);
socket.on("init", handleInit);
socket.on("continue", handleContinue);
socket.on("running", handleRunning);
socket.on("tooManyPlayers", handleTooManyPlayers);
socket.on("unknownCode", handleUnknownCode);

function handleWordConfirm() {
  if (wordInput.value) {
    if (
      currentSentence.innerText.length === 0 ||
      currentSentence.innerText
        .split(" ")
        [currentSentence.innerText.split(" ").length - 1].endsWith(".")
    ) {
      currentSentence.innerText = `${wordInput.value}`;
    } else {
      currentSentence.innerText = `${
        currentSentence.innerText
      } ${wordInput.value.toLowerCase()}`;
    }
    wordInput.value = "";
    disableButton();
    socket.emit("next", id.innerText, currentSentence.innerText);
  } else {
    alert("Please Input something bruh");
  }
}

function disableButton() {
  buttonEnabled = false;
  wordConfirm.style.display = "none";
  resetButton.style.display = "none";
  wordConfirmDisabled.style.display = "block";
  resetDisabled.style.display = "block";
}

function enableButton() {
  buttonEnabled = true;
  wordConfirm.style.display = "block";
  resetButton.style.display = "block";
  wordConfirmDisabled.style.display = "none";
  resetDisabled.style.display = "none";
}

function handleGameCode(gameCode) {
  id.innerText = gameCode;
}

function handleNewGame() {
  socket.emit("newGame");
  init();
  currentPlayer = playerNumber;
  currentPlayerSpan.innerText = "your";
  enableButton();
}

function handleJoinGame() {
  const code = joinInput.value;
  socket.emit("joinGame", code);
  init();
  handleGameCode(code);
  currentPlayerSpan.innerText = `player number 1's`;
  disableButton();
}

function handleJoinGameMobile() {
  const code = joinInputMobile.value;
  socket.emit("joinGame", code);
  init();
  handleGameCode(code);
  currentPlayerSpan.innerText = `player number 1's`;
  disableButton();
}

function init() {
  titleScreen.style.display = "none";
  gameScreen.style.display = "flex";
}

function handleInit(number) {
  playerNumber = number;
  playerNumberSpan.innerText = `${playerNumber}/${playerCount}`;
  console.log(playerNumber);
}

function handleContinue(state) {
  currentPlayer = state.currentPlayer;
  // console.log(state);
  if (state.currentPlayer === playerNumber.toString()) {
    enableButton();
    currentPlayerSpan.innerText = "your";
  } else {
    currentPlayerSpan.innerText = "player number " + currentPlayer + "'s";
  }
  currentSentence.innerText = state.currentSentence;
  playerCount = state.players.length;
  playerNumberSpan.innerText = `${playerNumber}/${playerCount}`;
}

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function handleReset() {
  if (currentSentence.innerText.split(" ").length < 3) {
    alert(
      "Please have a sentence with 3 or more words to reset and download it."
    );
    return;
  }
  socket.emit("reset", id.innerText);
  download(`${id.innerText}.txt`, currentSentence.innerText);
}

function reset() {
  playerNumber = null;
  joinInput.value = "";
  titleScreen.style.display = "flex";
  gameScreen.style.display = "none";
}

function handleRunning() {
  reset();
  alert("The game you tried to join is allready running");
}

function handleTooManyPlayers() {
  reset();
  alert("This room already has 8 players in it.");
}

function handleUnknownCode() {
  reset();
  alert("The gamecode is invalid. Please try again.");
}
