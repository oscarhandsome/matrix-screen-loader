const board = document.querySelector("#board");
const colors = ["54,186,1", "0,154,34", "0,255,43", "0,154,34", "54,186,1"];

// const SQUARES_NUMBERS = window.innerWidth - 30;
const SQUARES_COLUMNS = Math.floor(window.innerWidth / 20 - 20);
const SQUARES_NUMBERS = Math.floor((window.innerHeight / 20) * 2 - 20);
console.log(window.innerWidth, window.innerHeight);
console.log(SQUARES_COLUMNS, SQUARES_NUMBERS);

/* SET TIMERS */
const RANDOM_SPEED = 200;
const SPPED_FILLING_IDX = 50;
const STOP_TITMER_COLUMNS = 30000;
const HIDE_SPPED_FILLING_IDX = 600;

const randomIdn = Math.floor(Math.random * SQUARES_COLUMNS.length);
let filledColumns = [];

const INFINITE = true;

for (let idxCol = 0; idxCol < SQUARES_COLUMNS; idxCol++) {
  const column = document.createElement("div");
  column.classList.add("column");
  board.append(column);

  for (let iSq = 0; iSq < SQUARES_NUMBERS; iSq++) {
    const square = document.createElement("div");
    square.classList.add("square");
    column.append(square);
  }
}

function removeСharacter(element) {
  element.style.opacity = 0;
  setInterval(() => {
    element.remove();
  }, 200);
}

function randomChar() {
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  return possible.charAt(Math.floor(Math.random() * possible.length));
}

// HELPERS
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function runFillingCollumn(columIdx) {
  const column = document.querySelectorAll(".column")[columIdx];
  const color = `rgba(${getRandomColor()}, 1)`;
  setСharacter(column, color);
}

function setСharacter(column, color) {
  let counter = 0;
  let randomSpeed = getRandomArbitrary(
    SPPED_FILLING_IDX,
    SPPED_FILLING_IDX * 2
  );
  let randomFontSize = getRandomArbitrary(8, 16);

  let timerIdChar = setInterval(() => {
    element = column.querySelectorAll(".square")[counter];
    const character = document.createElement("div");
    character.innerHTML = randomChar();
    character.style.color = color;
    character.style.fontSize = `${randomFontSize}px`;
    if (!element) return;
    element.append(character);
    counter++;

    setTimeout(() => {
      removeСharacter(character);
    }, randomSpeed * getRandomArbitrary(10, 18));
  }, randomSpeed);

  setTimeout(() => {
    clearInterval(timerIdChar);
  }, SQUARES_NUMBERS * 1000);
}

let timerId = setInterval(() => {
  const randomIdn = Math.floor(Math.random() * SQUARES_COLUMNS);
  if (!filledColumns.includes(randomIdn)) {
    filledColumns.push(randomIdn);
    runFillingCollumn(randomIdn);
  }
  setTimeout(() => {
    filledColumns = [];
  }, SQUARES_NUMBERS * 1000);
}, RANDOM_SPEED);

if (!INFINITE)
  setTimeout(() => {
    clearInterval(timerId);
    console.log("stop");
  }, STOP_TITMER_COLUMNS);
