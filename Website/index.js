const socket = io("127.0.0.1:8080");

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

wordConfirm.addEventListener("click", handleWordConfirm);
createNewButton.addEventListener("click", handleNewGame);
joinButton.addEventListener("click", handleJoinGame);

socket.on("init", (msg) => {
  console.log(msg);
});

socket.on("gameCode", handleGameCode);

function handleWordConfirm() {
  enableButton();
  if (wordInput.value) {
    if (currentSentence.innerText.length === 0) {
      currentSentence.innerText = `${currentSentence.innerText} ${wordInput.value}`;
    } else {
      currentSentence.innerText = `${
        currentSentence.innerText
      } ${wordInput.value.toLowerCase()}`;
    }
    wordInput.value = "";
    // disableButton();
  } else {
    alert("Please Input something bruh");
  }
}

function disableButton() {
  wordConfirm.style.display = "none";
  wordConfirmDisabled.style.display = "block";
}

function enableButton() {
  wordConfirm.style.display = "block";
  wordConfirmDisabled.style.display = "none";
}

function handleGameCode(gameCode) {
  id.innerText = gameCode;
}

function handleNewGame() {
  socket.emit("newGame");
  titleScreen.style.display = "none";
  gameScreen.style.display = "flex";
  // gameScreen.style.flexDirection =
}

function handleJoinGame() {
  const code = joinInput.value;
  socket.emit("joinGame", code);
  titleScreen.style.display = "none";
  gameScreen.style.display = "flex";
}
