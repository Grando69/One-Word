const socket = io("https://rows-josh-newcastle-bay.trycloudflare.com");

// !127.0.0.1 == localhost

const wordConfirm = document.getElementById("wordConfirm");
const wordConfirmDisabled = document.getElementById("wordConfirmDisabled");
const wordInput = document.getElementById("wordInput");
const currentSentence = document.getElementById("currentSentence");
const id = document.getElementById("id");
const joinButton = document.getElementById("joinButton");
const joinInput = document.getElementById("joinInput");
const createNewButton = document.getElementById("createNewButton");
const titleScreen = document.getElementById("titleScreen");
const gameScreen = document.getElementById("gameScreen");
const reset = document.getElementById("reset");
const resetDisabled = document.getElementById("resetDisabled");

let buttonEnabled = true;
let playerNumber;
wordInput.value = "";
let currentPlayer;

wordConfirm.addEventListener("click", handleWordConfirm);
createNewButton.addEventListener("click", handleNewGame);
joinButton.addEventListener("click", handleJoinGame);
reset.addEventListener("click", handleReset);

document.querySelector("#wordInput").addEventListener("keyup", (event) => {
  if (event.key !== "Enter" || !buttonEnabled) return;
  else wordConfirm.click();
});

socket.on("gameCode", handleGameCode);

socket.on("init", handleInit);

socket.on("continue", handleContinue);

// socket.on("gameState")

// TODO get the next player if state.currentPlayer == playerNumber enableButton()
// on click of the button send the new state and now do /\

function handleWordConfirm() {
  if (wordInput.value) {
    if (currentSentence.innerText.length === 0) {
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
  reset.style.display = "none";
  wordConfirmDisabled.style.display = "block";
  resetDisabled.style.display = "block";
}

function enableButton() {
  buttonEnabled = true;
  wordConfirm.style.display = "block";
  reset.style.display = "block";
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
  enableButton();
}

function handleJoinGame() {
  const code = joinInput.value;
  socket.emit("joinGame", code);
  init();
  handleGameCode(code);
  disableButton();
}

function init() {
  titleScreen.style.display = "none";
  gameScreen.style.display = "flex";
}

function handleInit(number) {
  playerNumber = number;
  console.log(playerNumber);
}

function handleContinue(state) {
  currentPlayer = state.currentPlayer;
  console.log(state);
  if (state.currentPlayer === playerNumber.toString()) {
    enableButton();
  }

  currentSentence.innerText = state.currentSentence;
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
