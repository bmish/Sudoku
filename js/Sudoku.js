const size = 9;
const defaultBoardIndex = 1;

function Sudoku()
{
	this.createEmptyBoard();
	this.setSampleBoard(defaultBoardIndex);
}

Sudoku.prototype.createEmptyBoard = function()
{
	this.board = new Array(size);
	for (var y = 0; y < size; y++)
	{
		this.board[y] = new Array(size);
		for (var x = 0; x < size; x++)
		{
			this.board[y][x] = null;
		}
	}
}

Sudoku.prototype.setSampleBoard = function(boardIndex)
{
	var self = this;
	return $.get('examples/board'+boardIndex+'.csv', function(csv)
	{
		var board = $.csv.toArrays(csv);
		for (var y = 0; y < self.board.length; y++)
		{
			for (var x = 0; x < self.board[0].length; x++)
			{
				self.board[y][x] = (board[y][x] == " " || board[y][x] == "") ? null : board[y][x];
			}
		}
	});
}