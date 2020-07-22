$(document).ready(function(){
	$("#kPic01").css("opacity", 0.4);
	$("#kPic02").css("opacity", 0.6);
	$("#kPic03").css("opacity", 0.8);
	$("#kPic04").css("opacity", 1);
	$("#kPic01").hover(
		function(){
			$("#kPic01").css("opacity", "1");
		},function(){
			$("#kPic01").css("opacity", "0.4");
		});
	$("#kPic02").hover(function(){
		$("#kPic02").css("opacity", "1");
	},function(){
		$("#kPic02").css("opacity", "0.6");
	});
	$("#kPic03").hover(function(){
		$("#kPic03").css("opacity", "1");
	},function(){
		$("#kPic03").css("opacity", "0.8");
	});
});
$(document).ready(function(){
	$("#kPic05").click(function(){
		$("#kPic05").animate({
			"margin-left": "75%"
		}, 500, "linear");
		$("#kPic05").animate({
			"margin-left": "0%"
		}, 1000);
	});
});
$(document).ready(function(){
	if($("#kPic06").css("width","25%")){
		$("#feedKeynes").click(function(){
			$("#kPic06").animate({
				"width": "+=3%"
			}, 100)
		});
	};
	$("#starveKeynes").click(function(){
		$("#kPic06").animate({
			"width": "-=3%"
		}, 100)
	});
});
$(document).ready(function(){
	$("#hideKeynes").click(function(){
		$("#kPic07").hide("slow");
	});
	$("#showKeynes").click(function(){
		$("#kPic07").show("slow");
	});
});