// Timer variables.
var sec = 0;
var timer = null;

$(document).ready(function() {
	$("#divSudoku").on("boardLoaded", boardLoaded);
	$("#divSudoku").on("boardSolved", boardSolved);
});

boardLoaded = function(){
	// Start the timer.
	function pad(n) { return (n > 9) ? n : "0" + n; }
	timer = setInterval(function() {
	    $("#seconds").html(pad(++sec % 60));
	    $("#minutes").html(pad(parseInt(sec / 60, 10) % 60));
	}, 1000);
}

boardSolved = function(){
	// Stop the timer.
	clearInterval(timer);

	alert("Game solved in " + sec + " seconds!");
}