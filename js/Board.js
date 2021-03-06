const defaultBoardSize = 9;

function Board(sudoku)
{
	this.sudoku = sudoku;
	this.board = Board.getEmptyBoard();
}

Board.loadBoardFromCSV = function(sudoku, path, callback)
{
	return $.get(path, function(csv){
		var board = new Board(sudoku);
		var boardRaw = $.csv.toArrays(csv);
		var filledInSpacesCount = 0;
		for (var y = 0; y < boardRaw.length; y++)
		{
			for (var x = 0; x < boardRaw[0].length; x++)
			{
				var isEmpty = (boardRaw[y][x] === " " || boardRaw[y][x] === "");
				board.set(x, y, isEmpty ? null : parseInt(boardRaw[y][x]));

				// Any spaces we load in should be locked so the user can't change them.
				board.setLocked(x, y, true);

				if (!isEmpty)
				{
					filledInSpacesCount++;
				}
			}
		}
		callback(board, filledInSpacesCount);
	});
}

Board.getEmptyBoard = function()
{
	var board = new Array(defaultBoardSize);
	for (var y = 0; y < defaultBoardSize; y++)
	{
		board[y] = new Array(defaultBoardSize);
		for (var x = 0; x < defaultBoardSize; x++)
		{
			board[y][x] = null;
		}
	}
	return board;
}

Board.prototype.set = function(x, y, val)
{
	if (this.isLocked(x, y))
	{
		return false;
	}

	if (val && (val < 1 || val > 9))
	{
		return false;
	}

	if (val == this.board[y][x])
	{
		return false;
	}

	this.board[y][x] = val;

	return true;
}

Board.prototype.get = function(x, y)
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

Board.prototype.setLocked = function(x, y, isLocked)
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

Board.prototype.isLocked = function(x, y)
{
	// A locked space has a negative value.
	var val = this.board[y][x];
	return (val !== null && val < 0);
}

Board.prototype.getHeight = function()
{
	return this.board.length;
}

Board.prototype.getWidth = function()
{
	return this.board[0].length;
}

Board.prototype.draw = function(container)
{
	var self = this;

	var table = $("<table></table>").addClass("board");
	container.append(table);
	for (var y = 0; y < this.getHeight(); y++)
	{
		var tr = $("<tr></tr>");
		table.append(tr);
		for (var x = 0; x < this.getWidth(); x++)
		{
			var td = $("<td></td>").addClass("boardSpace");
			if (this.get(x, y))
			{
				td.addClass("boardSpaceLocked");
				td.text(this.get(x, y));
			}
			else
			{
				var textbox = $("<input />").addClass("boardSpaceTextbox");
				textbox.attr("type", "text");
				textbox.attr("maxlength", 1);
				textbox.attr("data-x", x);
				textbox.attr("data-y", y);
				textbox.attr("pattern", "[0-9]*"); // Ensure iOS shows the numeric keyboard.
				textbox.click(function(){this.select()}); // Auto-select any text in textbox for editing convenience.
				textbox.change(function(e){
					// Update the board with the new value.
					self.sudoku.set(e.target.dataset.x, e.target.dataset.y, parseInt(e.target.value));
				});
				textbox.keypress(function(e){
					// Only allow non-zero digits to be typed in this textbox.
					return e.which >= '1'.charCodeAt(0) && e.which <= '9'.charCodeAt(0);
				});
				td.append(textbox);
			}
			if ((Math.floor(x / 3) % 2) != (Math.floor(y / 3) % 2))
			{
				td.addClass("boardSectionAlternating");
			}
			tr.append(td);
		}
	}
}