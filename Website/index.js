const socket = io("127.0.0.1:8080");

const wordConfirm = document.getElementById("wordConfirm");
const wordInput = document.getElementById("wordInput");
const currentSentence = document.getElementById("currentSentence");

wordConfirm.addEventListener("click", handleWordConfirm);

let test = "hello";

test.toLowerCase();

function handleWordConfirm() {
  if (wordInput.value) {
    if (currentSentence.innerText.length === 0) {
      currentSentence.innerText = `${currentSentence.innerText} ${wordInput.value}`;
    } else {
      currentSentence.innerText = `${
        currentSentence.innerText
      } ${wordInput.value.toLowerCase()}`;
    }
    wordInput.value = "";
  } else {
    alert("Please Input something bruh");
  }
}
