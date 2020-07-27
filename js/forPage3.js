$(document).ready(function () {
	$("#last_page").click(
		function () {
			$("html,body").animate(
				{ scrollLeft: "-=500vw"}, 5
			);
		}
	);
	$("#next_page").click(function () {
		$("html,body").animate(
			{ scrollLeft: "+=500vw"}, 5
		);
	});

	var pressTimer;
	$("#next_page").mouseup(function(){
		$("html,body").animate(
			{ scrollLeft: "+=0vw"}, 5
		);
		clearTimeout(pressTimer);
		// Clear timeout
	}).mousedown(function(){
		// Set timeout
		pressTimer = window.setTimeout(function() {
			$("html,body").animate(
				{ scrollLeft: "5000vw"}, 5
			);
		},500);
	});
	var pressTimer2;
	$("#last_page").mouseup(function(){
		$("html,body").animate(
			{ scrollLeft: "+=0vw"}, 5
		);
		clearTimeout(pressTimer2);
		// Clear timeout
	}).mousedown(function(){
		// Set timeout
		pressTimer2 = window.setTimeout(function() {
			$("html,body").animate(
				{ scrollLeft: "0vw"}, 5
			);
		},500);
	});

});