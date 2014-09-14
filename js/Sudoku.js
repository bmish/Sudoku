function Sudoku()
{
	this.board = new Board();
}

Sudoku.prototype.loadSampleBoard = function(boardIndex, callback)
{
	var self = this;
	Board.loadBoardFromCSV('/examples/board'+boardIndex+'.csv', function(board){
		self.board = board;
		callback();
	});
}

Sudoku.prototype.loadSampleSolution = function(boardIndex, callback)
{
	var self = this;
	Board.loadBoardFromCSV('/examples/solution'+boardIndex+'.csv', function(board){
		self.solution = board;
		callback();
	});
}

Sudoku.prototype.set = function(x, y, val)
{
	this.board.set(x, y, val);
}

Sudoku.prototype.get = function(x, y)
{
	return this.board.get(x, y);
}

Sudoku.prototype.setLocked = function(x, y, isLocked)
{
	this.board.setLocked(x, y, isLocked);
}

Sudoku.prototype.isLocked = function(x, y)
{
	return this.board.isLocked(x, y)
}

Sudoku.prototype.getHeight = function()
{
	return this.board.getHeight();
}

Sudoku.prototype.getWidth = function()
{
	return this.board.getWidth();
}