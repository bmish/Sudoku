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

	var val2 = 3;
	s.set(0,0,val2);
	assert.strictEqual(s.get(0,0), val, "(0,0) cannot be changed when locked");

	s.setLocked(0,0,false);
	assert.strictEqual(s.get(0,0), val, "(0,0) still has the same value after being unlocked");
	assert.strictEqual(s.isLocked(0,0), false, "(0,0) is unlocked as expected");

	s.set(0,0,val2);
	assert.strictEqual(s.get(0,0), val2, "(0,0) can be changed when unlocked");
});

QUnit.asyncTest("Loading in a sample board", function(assert){
	var s = new Sudoku();
	const sampleBoardIndex = 1;
	s.loadSampleBoard(sampleBoardIndex, function(){
		// Check a sample of spaces.

		assert.strictEqual(s.get(0,0), 5, "(0,0) has the expected value");
		assert.strictEqual(s.isLocked(0,0), true, "(0,0) is locked as expected");

		assert.strictEqual(s.get(1,0), 3, "(1,0) has the expected value");
		assert.strictEqual(s.isLocked(1,0), true, "(1,0) is locked as expected");

		assert.strictEqual(s.get(2,0), null, "(2,0) is empty as expected");
		assert.strictEqual(s.isLocked(2,0), false, "(2,0) is unlocked since its empty");

		assert.strictEqual(s.get(0,1), 6, "(0,1) has the expected value");
		assert.strictEqual(s.isLocked(0,1), true, "(0,1) is locked as expected");

		// Done with this test.
		QUnit.start();
	});
});

QUnit.asyncTest("Tracking the correct spaces count with a sample board", function(assert){
	var s = new Sudoku();

	assert.strictEqual(s.getCorrectSpacesCount(), 0, "Empty board has no correct spaces");
	assert.strictEqual(s.isSolved(), false, "Empty board is not solved");

	const sampleBoardIndex = 1;
	const sampleBoardStartingCorrectSpacesCount = 30;
	s.loadSampleBoard(sampleBoardIndex, function(){
		s.loadSampleSolution(sampleBoardIndex, function(){
			// Note: The spaces that are loaded in with the sample board will be locked.

			assert.strictEqual(s.getCorrectSpacesCount(), sampleBoardStartingCorrectSpacesCount, "Sample board starts with correct number of spaces");
			assert.strictEqual(s.isSolved(), false, "Sample board does not start out solved");

			// Experiment with locked space (0, 0).
			var correctValue = s.solution.get(0, 0);
			var incorrectValue = 1;

			s.set(0, 0, incorrectValue); // Attempt to set from correct to incorrect value.
			assert.strictEqual(s.getCorrectSpacesCount(), sampleBoardStartingCorrectSpacesCount, "Correct spaces count doesn't change when attempting to change a locked space");

			// Experiment with unlocked space (2, 0).
			correctValue = s.solution.get(2, 0);
			incorrectValue = 1;

			s.set(2, 0, incorrectValue); // Set from empty (incorrect) to incorrect value.
			assert.strictEqual(s.getCorrectSpacesCount(), sampleBoardStartingCorrectSpacesCount, "Correct spaces count doesn't change when setting a space from empty to an incorrect value");

			s.set(2, 0, correctValue); // Set from incorrect to correct value.
			assert.strictEqual(s.getCorrectSpacesCount(), sampleBoardStartingCorrectSpacesCount + 1, "Correct spaces count increases when changing a space from an incorrect to correct value");

			s.set(2, 0, correctValue); // Set from correct to correct value.
			assert.strictEqual(s.getCorrectSpacesCount(), sampleBoardStartingCorrectSpacesCount + 1, "Correct spaces count doesn't change when changing a space from a correct to correct value");

			s.set(2, 0, incorrectValue); // Set from correct to empty (incorrect).
			assert.strictEqual(s.getCorrectSpacesCount(), sampleBoardStartingCorrectSpacesCount, "Correct spaces count decreases when changing a space from a correct to incorrect value");

			// Fill in all the correct values.
			assert.strictEqual(s.isSolved(), false, "Board isn't solved before filling in all the correct values");
			for (var y = 0; y < s.getHeight(); y++)
			{
				for (var x = 0; x < s.getWidth(); x++)
				{
					s.set(x, y, s.solution.get(x, y));
				}
			}
			assert.strictEqual(s.isSolved(), true, "Board is solved after filling in all the correct values");
			assert.strictEqual(s.getCorrectSpacesCount(), s.getWidth() * s.getHeight(), "Solved board has the correct spaces count");

			// Experiment with unlocked space (2, 0).
			s.set(2, 0, null); // Set to empty.
			assert.strictEqual(s.isSolved(), false, "Board isn't solved after setting a space to empty.");

			// Done with this test.
			QUnit.start();
		});
	});
});

QUnit.asyncTest("Throwing an event when the game is solved", function(assert){
	var s = new Sudoku();

	// Listen for the solved event.
	var sawEvent = false;
	$(document).on("boardSolved", function(){
		if (!sawEvent)
		{
			sawEvent = true;

			assert.strictEqual(s.isSolved(), true, "Board is solved after seeing the solved event");

			// We are done with the test once we receive this event.
			QUnit.start();
		}
	});

	const sampleBoardIndex = 1;
	s.loadSampleBoard(sampleBoardIndex, function(){
		s.loadSampleSolution(sampleBoardIndex, function(){
			// Fill in all the correct values.
			assert.strictEqual(s.isSolved(), false, "Board isn't solved before filling in all the correct values");
			for (var y = 0; y < s.getHeight(); y++)
			{
				for (var x = 0; x < s.getWidth(); x++)
				{
					s.set(x, y, s.solution.get(x, y));
				}
			}

			// Timeout in case we fail to receive the event.
			setTimeout(function() {
				if (!sawEvent)
				{
					assert.ok(false, "Fail the test if we timed out without seeing the event we expected.");

					// Done with this test.
					QUnit.start();
				}
			  }, 150);
		});
	});
})