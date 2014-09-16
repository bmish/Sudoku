Sudoku
======

A web-based Sudoku game.

### Usage
```js
Sudoku.draw($("#divSudoku"));
```

### Running the tests
Visit the tests directory in a browser.

### Libraries used
* jQuery
* jQuery-csv
* QUnit

### Implementation
When the game is created, two boards are loaded in from CSV files: the initial board and the solution board. Each board is represented by a two-dimensional array of integers. As the user fills in spaces on the board, the game keeps track of how many spaces have been filled in correctly. Once the number of correctly filled in spaces reaches the total number of spaces on the board, an event is thrown to indicate that the game has been solved.
