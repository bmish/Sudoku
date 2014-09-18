// Global variables.
var s = null; // Sudoku instance.
var showSolvedNotification = true;

// Timer variables.
var seconds = 0;
var timer = null;

$(document).ready(function() {
	// Game events.
	$("#divSudoku").on("boardLoaded", boardLoaded);
	$("#divSudoku").on("boardSolved", boardSolved);

	// UI events.
	$("#buttonRestart").click(buttonRestart);
	$("#buttonSolve").click(buttonSolve);
});

startTimer = function(){
	// Make sure the timer is stopped.
	stopTimer();

	// Reset the timer UI.
	$("#seconds").html("00");
	$("#minutes").html("00");

	// Start the timer.
	seconds = 0;
	function pad(n) { return (n > 9) ? n : "0" + n; }
	timer = setInterval(function() {
	    $("#seconds").html(pad(++seconds % 60));
	    $("#minutes").html(pad(parseInt(seconds / 60, 10) % 60));
	}, 1000);
}

stopTimer = function(){
	if (timer)
	{
		clearInterval(timer);
	}
	timer = null;
}

boardLoaded = function(){
	startTimer();
}

boardSolved = function(){
	stopTimer();

	if (showSolvedNotification)
	{
		alert("Game solved in " + seconds + " seconds!");
	}
}

buttonRestart = function(){
	if (s)
	{
		s.clear();
		startTimer();
	}
}

buttonSolve = function(){
	if (s)
	{
		showSolvedNotification = false;
		s.solve();
		showSolvedNotification = true;
	}
}