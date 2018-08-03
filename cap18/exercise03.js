/*
  Conway’s Game of Life

  Conway’s Game of Life is a simple simulation that creates artificial “life”
  on a grid, each cell of which is either alive or not. Each generation (turn),
  the following rules are applied:

  Any live cell with fewer than two or more than three live neighbors dies.

  Any live cell with two or three live neighbors lives on to the next generation.

  Any dead cell with exactly three live neighbors becomes a live cell.

  A neighbor is defined as any adjacent cell, including diagonally adjacent ones.

  Note that these rules are applied to the whole grid at once, not one square at
  a time. That means the counting of neighbors is based on the situation at the start
  of the generation, and changes happening to neighbor cells during this
  generation should not influence the new state of a given cell.

  Implement this game using whichever data structure you find appropriate.
  Use Math.random to populate the grid with a random pattern initially.
  Display it as a grid of checkbox fields, with a button next to it to advance to
  the next generation. When the user checks or unchecks the checkboxes, their
  changes should be included when computing the next generation.

============================================================================= */

/*  Config
------------------------------------------------------------------------------- */

let state;

const view = document.querySelector('#grid');
const next = document.querySelector('#next');

view.addEventListener('click', updateState);
next.addEventListener('click', nextGeneration);



/*  Grid
------------------------------------------------------------------------------- */

function generateInitialGrid() {
  let grid = [];
  let line = [];
  let size = 10;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      line.push(Math.random() < 0.5 ? 'X' : '-');
    }
  
    grid.push(line);
    line = [];
  }

  return grid;
}

function updateView(state) {
  view.innerHTML = '';

  for (let y = 0; y < state.length; y++) {
    for (let x = 0; x < state[0].length; x++) {
      let col = document.createElement('input');
      
      col.type = 'checkbox';
      col.checked = state[y][x] == 'X';
      col.setAttribute('position-x-y', `${x}-${y}`);

      view.appendChild(col);
    }

    let breakLine = document.createElement('br');
    view.appendChild(breakLine);
  }
}

function updateState(event) {
  if (event.target.nodeName == 'INPUT') {
    let x = Number(event.target.getAttribute('position-x-y').split('-')[0]);
    let y = Number(event.target.getAttribute('position-x-y').split('-')[1]);
    let live = event.target.checked;

    state[y][x] = live ? 'X' : '-';
  }
}

/*  Next Generation
------------------------------------------------------------------------------- */

function countNeighborsOf(state, x, y) {
  let count = 0;

  if (state[y-1] && state[y-1][x-1] == 'X') count++;
  if (state[y-1] && state[y-1][x] == 'X') count++;
  if (state[y-1] && state[y-1][x+1] == 'X') count++;

  if (state[y][x-1] == 'X') count++;
  if (state[y][x+1] == 'X') count++;

  if (state[y+1] && state[y+1][x-1] == 'X') count++;
  if (state[y+1] && state[y+1][x] == 'X') count++;
  if (state[y+1] && state[y+1][x+1] == 'X') count++;

  return count;
}

function newState(state) {
  let newState = state;

  for (let y = 0; y < state.length; y++) {
    for (let x = 0; x < state[0].length; x++) {
      let neighbors = countNeighborsOf(state, x, y);

      if (state[y][x] == 'X') {
        if (neighbors < 2 || neighbors > 3) newState[y][x] = '-';
      } else {
        if (neighbors == 3) newState[y][x] = 'X';
      }
    }
  }

  return newState;
}

function nextGeneration() {
  state = newState(state);
  updateView(state);
}

/*  Initialize application
------------------------------------------------------------------------------- */

function run() {
  state = generateInitialGrid();
  updateView(state);
}

run();


