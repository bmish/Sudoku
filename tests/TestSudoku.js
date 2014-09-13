QUnit.test("Sudoku board creation", function(assert){
	var s = new Sudoku();

	assert.notEqual(s.board, null, "Board exists");
	assert.strictEqual(s.getHeight(), defaultBoardSize, "Board has correct height");
	assert.strictEqual(s.getWidth(), defaultBoardSize, "Board has correct width");
	assert.strictEqual(s.get(0,0), null, "(0,0) is empty");
	assert.strictEqual(s.get(1,0), null, "(1,0) is empty");
	assert.strictEqual(s.get(s.getWidth()-1,s.getHeight()-1), null, "(width-1,height-1) space is empty");
});

QUnit.test("Filling in a space on the board", function(assert){
	var s = new Sudoku();

	assert.strictEqual(s.get(0,0), null, "(0,0) is empty initially");

	s.set(0,0,20);
	assert.strictEqual(s.get(0,0), null, "(0,0) is unchanged after attempting to set it to a higher-than-allowed number");

	s.set(0,0,-20);
	assert.strictEqual(s.get(0,0), null, "(0,0) is unchanged after attempting to set it to a negative number");

	s.set(0,0,0);
	assert.strictEqual(s.get(0,0), null, "(0,0) is unchanged after attempting to set it to 0");

	var val = 5;
	s.set(0,0,val);
	assert.strictEqual(s.get(0,0), val, "(0,0) changed to "+val+" successfully");

	var val = 7;
	s.set(0,0,val);
	assert.strictEqual(s.get(0,0), val, "(0,0) changed to "+val+" successfully");

	var val = null;
	s.set(0,0,val);
	assert.strictEqual(s.get(0,0), val, "(0,0) changed to empty successfully");
});

QUnit.test("Locking a space on the board", function(assert){
	var s = new Sudoku();

	assert.strictEqual(s.get(0,0), null, "(0,0) is empty initially");
	assert.strictEqual(s.isLocked(0,0), false, "(0,0) is not locked");

	var val = 5;
	s.set(0,0,val);
	assert.strictEqual(s.get(0,0), val, "(0,0) changed to "+val+" successfully");
	assert.strictEqual(s.isLocked(0,0), false, "(0,0) is not locked");

	s.setLocked(0,0,true);
	assert.strictEqual(s.get(0,0), val, "(0,0) still has the same value after being locked");
	assert.strictEqual(s.isLocked(0,0), true, "(0,0) is locked as expected");

	s.setLocked(0,0,false);
	assert.strictEqual(s.get(0,0), val, "(0,0) still has the same value after being unlocked");
	assert.strictEqual(s.isLocked(0,0), false, "(0,0) is unlocked as expected");
});