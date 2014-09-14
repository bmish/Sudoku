const defaultBoardSize = 9;
const defaultSampleBoardIndex = 1;

function Sudoku(loadSampleBoard)
{
	this.createEmptyBoard();
}

Sudoku.prototype.createEmptyBoard = function()
{
	this.board = new Array(defaultBoardSize);
	for (var y = 0; y < defaultBoardSize; y++)
	{
		this.board[y] = new Array(defaultBoardSize);
		for (var x = 0; x < defaultBoardSize; x++)
		{
			this.set(x, y, null);
		}
	}
}

Sudoku.prototype.loadSampleBoard = function(boardIndex, callback)
{
	var self = this;
	return $.get('/examples/board'+boardIndex+'.csv', function(csv)
	{
		var board = $.csv.toArrays(csv);
		for (var y = 0; y < self.getHeight(); y++)
		{
			for (var x = 0; x < self.getWidth(); x++)
			{
				var isEmpty = (board[y][x] === " " || board[y][x] === "");
				self.set(x, y, isEmpty ? null : parseInt(board[y][x]));
				self.setLocked(x, y, true);
			}
		}
		callback();
	});
}

Sudoku.prototype.set = function(x, y, val)
{
	if (val && val < 1 || val > 9)
	{
		return;
	}

	this.board[y][x] = val;
}

Sudoku.prototype.get = function(x, y)
{
	var val = this.board[y][x];
	if (!val)
	{
		// Space not filled in yet.
		return null;
	}

	// Ignore the negative sign if the space is locked.
	return Math.abs(val);
}

Sudoku.prototype.setLocked = function(x, y, isLocked)
{
	var val = this.board[y][x];
	if (!val)
	{
		// Can't lock an empty space.
		return;
	}

	// To lock a space, make its value negative.
	this.board[y][x] = Math.abs(val) * (isLocked ? -1 : 1);
}

Sudoku.prototype.isLocked = function(x, y)
{
	// A locked space has a negative value.
	var val = this.board[y][x];
	return (val !== null && val < 0);
}

Sudoku.prototype.getHeight = function()
{
	return this.board.length;
}

Sudoku.prototype.getWidth = function()
{
	return this.board[0].length;
}