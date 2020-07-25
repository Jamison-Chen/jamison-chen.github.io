$(document).ready(function(){
	$("#pb001").css("opacity", 0.5);
	$("#pb002").css("opacity", 0.5);
	$("#pb003").css("opacity", 0.5);
	$("#pb004").css("opacity", 0.5);
	$("#pb005").css("opacity", 0.5);
	$("#pb006").css("opacity", 0.5);
	$("#pb001").hover(
		function(){
			$("#pb001").css("opacity", "1");
			$(".imageContainer>div:nth-child(1)>h4").css("color", "#000000");
		},function(){
			$("#pb001").css("opacity", "0.5");
			$(".imageContainer>div:nth-child(1)>h4").css("color", "#FFFFFF");
		});
	$("#pb002").hover(
		function(){
			$("#pb002").css("opacity", "1");
			$(".imageContainer>div:nth-child(2)>h4").css("color", "#000000");
		},function(){
			$("#pb002").css("opacity", "0.5");
			$(".imageContainer>div:nth-child(2)>h4").css("color", "#FFFFFF");
		});
	$("#pb003").hover(
		function(){
			$("#pb003").css("opacity", "1");
			$(".imageContainer>div:nth-child(3)>h4").css("color", "#000000");
		},function(){
			$("#pb003").css("opacity", "0.5");
			$(".imageContainer>div:nth-child(3)>h4").css("color", "#FFFFFF");
		});
	$("#pb004").hover(
		function(){
			$("#pb004").css("opacity", "1");
			$(".imageContainer>div:nth-child(4)>h4").css("color", "#000000");
		},function(){
			$("#pb004").css("opacity", "0.5");
			$(".imageContainer>div:nth-child(4)>h4").css("color", "#FFFFFF");
		});
	$("#pb005").hover(
		function(){
			$("#pb005").css("opacity", "1");
			$(".imageContainer>div:nth-child(5)>h4").css("color", "#000000");
		},function(){
			$("#pb005").css("opacity", "0.5");
			$(".imageContainer>div:nth-child(5)>h4").css("color", "#FFFFFF");
		});
	$("#pb006").hover(
		function(){
			$("#pb006").css("opacity", "1");
			$(".imageContainer>div:nth-child(6)>h4").css("color", "#000000");
		},function(){
			$("#pb006").css("opacity", "0.5");
			$(".imageContainer>div:nth-child(6)>h4").css("color", "#FFFFFF");
		});
});
$(document).ready(function(){
	$("#pkm_phoenix").click(function(){
		$("#pkm_phoenix").animate({
			"margin-left": "80%"
		}, 5000);
		$("#pkm_phoenix").animate({
			"margin-left": "0%"
		}, 300 , "linear");
	});
});
$(document).ready(function(){
	$("#feed").click(function(){
		$("#pkm_bulbasaur").animate({
			"width": "+=3%"
		}, 1000)
	});
	$("#starve").click(function(){
		$("#pkm_bulbasaur").animate({
			"width": "-=3%"
		}, 1000)
	});
});
$(document).ready(function(){
	$("#hideBtn").click(function(){
		$("#pkm_pikachu").hide("slow");
	});
	$("#showBtn").click(function(){
		$("#pkm_pikachu").show("slow");
	});
});