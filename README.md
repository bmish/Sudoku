Sudoku
======

A web-based Sudoku game.

### How to play
1. Visit this directory in a browser.
2. Fill in the empty spaces in the grid such that each of the following contains all numbers from 1 to 9.
  * Row
  * Column
  * 3x3 section
3. When you have reached the solution, a notification will be displayed.

### Using the sudoku engine
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

This is a constant O(1) time approach to checking if the board is solved since only one space needs to be checked on each move. However, this approach depends on knowing the solution ahead of time. If the solution was not supplied, the game would either need to compute the solution upfront or calculate if the current board is solved on each move.

### Future work
* Show a UI to indicate what numbers are valid choices for each space
* Replace the textbox in each space with a number-picking UI to eliminate the need for the keyboard to pop up on mobile devices
* Incorporate jQuery Mobile to produce a UI that fits better on mobile devices