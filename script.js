let currentPlayer = "X";
const NUMBER_OF_ROWS = 3;
const turns = NUMBER_OF_ROWS ** 2;
let turnsCounter = 0;

const createBoardArray = () => {
  let board = [];
  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    board.push(Array.from({ length: NUMBER_OF_ROWS }, () => "_"));
  }
  return board;
};

let board = createBoardArray();

const cellClickHandler = (event, index) => {
  const cell = event.target;
  const row = Math.floor(index / NUMBER_OF_ROWS);
  const col = index % NUMBER_OF_ROWS;

  console.log([row, col]);

  const checkRows = (currentPlayer) => {
    let columns = 0;
    for (let row = 0; row < NUMBER_OF_ROWS; row++) {
      while (columns < NUMBER_OF_ROWS) {
        if (board[row][columns] !== currentPlayer) {
          columns = 0;
          break;
        } else {
          columns++;
        }
      }
      if (columns === NUMBER_OF_ROWS) {
        return true;
      }
    }
  };

  const checkColumns = (currentPlayer) => {
    let rows = 0;
    for (let column = 0; column < NUMBER_OF_ROWS; column++) {
      while (rows < NUMBER_OF_ROWS) {
        if (board[rows][column] !== currentPlayer) {
          rows = 0;
          break;
        } else {
          rows++;
        }
      }
      if (rows === NUMBER_OF_ROWS) {
        return true;
      }
    }
  };

  const checkDiogonals = () => {
    let count = 0;
    while (count < NUMBER_OF_ROWS) {
      if (board[count][count] !== currentPlayer) {
        count = 0;
        break;
      } else {
        count++;
      }
    }
    if (count === NUMBER_OF_ROWS) {
      return true;
    }
  };

  const checkReverseDiogonals = () => {
    let count = 0;
    while (count < NUMBER_OF_ROWS) {
      if (board[count][NUMBER_OF_ROWS - count - 1] !== currentPlayer) {
        count = 0;
        break;
      } else {
        count++;
      }
    }
    if (count === NUMBER_OF_ROWS) {
      return true;
    }
  };

  const checkWin = () => {
    if (
      checkRows(currentPlayer) ||
      checkColumns(currentPlayer) ||
      checkDiogonals(currentPlayer) ||
      checkReverseDiogonals(currentPlayer)
    ) {
      return true;
    }
    return false;
  };
  // Reset function
  const resetBoard = () => {
    document.querySelector(".board").remove();
    createBoard();

    board = createBoardArray();
    currentPlayer = "X";
    turnsCounter = 0;
  };
  // Win Event Function
  const runWinEvent = (currentPlayer) => {
    setTimeout(() => {
      alert(`Player ${currentPlayer} won`);
      resetBoard();
    }, 100);
  };
  // Draw Event Function
  const runDrawEvent = () => {
    setTimeout(() => {
      alert("Draw!");
      resetBoard();
    }, 100);
  };

  const drawMarkInCell = (cell, currentPlayer) => {
    cell.querySelector(".value").textContent = currentPlayer;
    cell.classList.add(`cell--${currentPlayer}`);
  };
  if (board[row][col] === "_") {
    turnsCounter++;
    board[row][col] = currentPlayer;

    drawMarkInCell(cell, currentPlayer);

    if (checkWin()) {
      runWinEvent(currentPlayer);
    } else {
      turnsCounter === turns && runDrawEvent();

      currentPlayer === "X" ? (currentPlayer = "O") : (currentPlayer = "X");
    }
  }
  // reset button
  const resetButton = document.querySelector("#reset");
  resetButton.addEventListener("click", () => resetBoard());
};

const createBoard = () => {
  const container = document.querySelector(".container");
  const board = document.createElement("div");

  board.classList.add("board");

  for (let i = 0; i < turns; i++) {
    const cellElementString = `
    <div class="cell" role="button" tabindex="${i + 1}">
    <span class="value"></span>
    </div>`;
    const cellElement = document
      .createRange()
      .createContextualFragment(cellElementString);

    cellElement.querySelector(".cell").onclick = (event) =>
      cellClickHandler(event, i);
    cellElement.querySelector(".cell").onkeydown = (event) =>
      event.key === "Enter" ? cellClickHandler(event, i) : true;

    board.appendChild(cellElement);
    document.documentElement.style.setProperty("--grid-rows", NUMBER_OF_ROWS);
  }

  container.insertAdjacentElement("afterbegin", board);
};

createBoard();
/* ---------------- */
