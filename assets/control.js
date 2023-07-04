const Boxed = document.querySelectorAll(".box");
const PlayerTurn = document.querySelector(".player-turn");
const Restart = document.querySelector(".restart");
const winReq = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "Rosmontis";
let running = false;

initializeGame();

function initializeGame() {
  Boxed.forEach(cell => cell.addEventListener("click", BoxClicked));
  Restart.addEventListener("click", restartGame);
  PlayerTurn.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function BoxClicked() {
  const cellIndex = Array.from(Boxed).indexOf(this);

  if (options[cellIndex] !== "" || !running) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  const image = document.createElement("img");
  image.src = currentPlayer === "Rosmontis" ? 
  "https://storage.googleapis.com/sticker-prod/N1Dtgi2CatO2BM5IesCo/0.thumb128.png" : 
  "https://storage.googleapis.com/sticker-prod/ezUIQ6i1nWeJKPXx7f4k/8.thumb128.png";
  image.className = "png";
  cell.innerHTML = "";
  cell.appendChild(image);
  cell.classList.add(currentPlayer === "Rosmontis" ? "x-move" : "o-move");
}

function changePlayer() {
  currentPlayer = currentPlayer === "Rosmontis" ? "Tallulah" : "Rosmontis";
  PlayerTurn.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winReq.length; i++) {
    const condition = winReq[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA === "" || cellB === "" || cellC === "") {
      continue;
    }
    if (cellA === cellB && cellB === cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    PlayerTurn.textContent = `${currentPlayer} wins!`;
    running = false;
  } else if (!options.includes("")) {
    PlayerTurn.textContent = "Losers! Draw!";
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = "Rosmontis";
  options = ["", "", "", "", "", "", "", "", ""];
  PlayerTurn.textContent = `${currentPlayer}'s turn`;
  Boxed.forEach(cell => {
    cell.innerHTML = "";
    cell.classList.remove("x-move", "o-move");
  });
  running = true;
}
