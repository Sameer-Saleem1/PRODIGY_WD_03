let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset-btn");
let gameContainer = document.querySelector("#container");
let msgContainer = document.querySelector(".win-container");
let newGameBtn = document.querySelector("#new-btn");
let msg = document.querySelector(".msg");

let clicks = 0;
let turnO = true;

const winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
      box.classList.add("redbox");
    } else if (!turnO) {
      box.innerText = "X";
      box.classList.add("greenbox");
      turnO = true;
    }
    box.disabled = true;
    clicks++;
    checkWinner();
  });
});

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const matchDraw = () => {
  if (clicks === 9) {
    msg.innerText = "Draw! No one wins this time. Better luck next game!";
    msgContainer.classList.remove("hide");
    disableBoxes();
    gameContainer.classList.add("hide");
  }
};

const showWinner = (winner) => {
  if (winner === "O") {
    msg.classList.add("redbox");
    msg.innerText = `Winner is ${winner}`;
  } else if (winner === "X") {
    msg.classList.add("greenbox");
    msg.innerText = `Winner is ${winner}`;
  }
  msgContainer.classList.remove("hide");
  disableBoxes();
  gameContainer.classList.add("hide");
};

const checkWinner = () => {
  for (let pattern of winningPattern) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;
    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
      }
    }
  }
  matchDraw();
};

const resetGame = () => {
  turnO = true;
  clicks = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  gameContainer.classList.remove("hide");
};

newGameBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
