const socket = io("127.0.0.1:8080");

// !127.0.0.1 == localhost

const wordConfirm = document.getElementById("wordConfirm");
const wordConfirmDisabled = document.getElementById("wordConfirmDisabled");
const wordInput = document.getElementById("wordInput");
const currentSentence = document.getElementById("currentSentence");

wordConfirm.addEventListener("click", handleWordConfirm);

socket.on("test", (msg) => {
  console.log(msg);
});

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
