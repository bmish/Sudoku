function Sudoku()
{
	this.board = new Board();
	this.solution = null;
	this.correctSpacesCount = 0;
}

Sudoku.prototype.loadSampleBoard = function(boardIndex, callback)
{
	var self = this;
	Board.loadBoardFromCSV('/examples/board'+boardIndex+'.csv', function(board, filledInSpacesCount){
		self.board = board;
		self.correctSpacesCount = filledInSpacesCount;
		callback();
	});
}

Sudoku.prototype.loadSampleSolution = function(boardIndex, callback)
{
	var self = this;
	Board.loadBoardFromCSV('/examples/solution'+boardIndex+'.csv', function(board, filledInSpacesCount){
		self.solution = board;
		callback();
	});
}

Sudoku.prototype.updateCorrectSpacesCount = function(oldValue, newValue, correctValue)
{
	var correctBefore = (correctValue === oldValue);
	var correctAfter = (correctValue === newValue);

	// Keep track of the number of correctly-filled-in spaces.
	if (correctBefore && !correctAfter)
	{
		this.correctSpacesCount--;
	}
	else if (!correctBefore && correctAfter)
	{
		this.correctSpacesCount++;
	}
}

Sudoku.prototype.isSolved = function()
{
	return this.correctSpacesCount == this.getWidth() * this.getHeight();
}

Sudoku.prototype.set = function(x, y, val)
{
	var oldValue = this.board.get(x, y);

	var ret = this.board.set(x, y, val);

	if (ret)
	{
		this.updateCorrectSpacesCount(oldValue, val, this.solution ? this.solution.get(x, y) : null);

		if (this.isSolved())
		{
			$.event.trigger({type: 'boardSolved'});
		}
	}

	return ret;
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

Sudoku.prototype.getCorrectSpacesCount = function()
{
	return this.correctSpacesCount;
}

Sudoku.draw = function(container)
{
	var s = new Sudoku();

	const sampleBoardIndex = 1;
	s.loadSampleBoard(sampleBoardIndex, function(){
		s.loadSampleSolution(sampleBoardIndex, function(){
			s.draw(container);
		});
	});
}

Sudoku.prototype.draw = function(container)
{
	this.board.draw(container);
}