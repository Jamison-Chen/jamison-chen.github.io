document.writeln("<!DOCTYPE html>");
document.writeln("<head>");
document.writeln("	<meta charset=\'UTF-8\'>");
document.writeln("	<title>Jamison</title>");
document.writeln("	<script type=\'text/javascript\' src=\'jquery-3.5.1.js\'></script>");
document.writeln("	<script type=\'text/javascript\' src=\'forHeader.js\'></script>");
document.writeln("	<link href=\'./css/forHeader.css\' rel=\'stylesheet\' type=\'text/css\'>");
document.writeln("  <link href=\'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css\' rel=\'stylesheet\' />");
document.writeln("  <script src=\'https://unpkg.com/headroom.js@0.9.4/dist/headroom.js\'></script>");
document.writeln("</head>");

document.writeln("<body>");
document.writeln("<header id=\'thisIsHeader\'>");
document.writeln("	<div>");
document.writeln("		<img src=\'./images/html5.svg\' id=\'webLogo\' alt=\'This is logo.\'/>");
document.writeln("		<a href=\'index.html\' id=\'webName\'>HTML Practice</a>");
document.writeln("	</div>");
document.writeln("	<ol class=\'main_menu\'>");
document.writeln("		<li><a href=\'index.html\'><div class=\'headerLinks\'>Home</div></a></li>");
document.writeln("		<li><a href=\'page1.html\'><div class=\'headerLinks\'>Link1</div></a></li>");
document.writeln("		<li><a href=\'page2.html\'><div class=\'headerLinks\'>Link2</div></a></li>");
document.writeln("		<li><a href=\'page3.html\'><div class=\'headerLinks\'>Link3</div></a>");
document.writeln("			<ol class=\'sub_menu\'>");
document.writeln("				<li><a href=\'test.html\'><div class=\'sub_headerLinks\'>test</div></a></li>");
document.writeln("				<li><a href=\'test.html\'><div class=\'sub_headerLinks\'>test</div></a></li>");
document.writeln("				<li><a href=\'test.html\'><div class=\'sub_headerLinks\'>test</div></a></li>");
document.writeln("				<li><a href=\'test.html\'><div class=\'sub_headerLinks\'>test</div></a></li>");
document.writeln("				<li><a href=\'test.html\'><div class=\'sub_headerLinks\'>test</div></a></li>");
document.writeln("			</ol>");
document.writeln("		</li>");
document.writeln("	</ol>");
document.writeln("	<a href=\'https://www.google.com.tw/\' target=\'_blank\'>");
document.writeln("		<img id=\'googleLogo\' src=\'./images/google.svg\' alt=\'This is google's logo.\'/>");
document.writeln("	</a>");
document.writeln("</header>");



//########################################以下為「次選單」自動隱藏之JS部分
document.writeln("<script>");
document.writeln("$(function(){");
document.writeln("	$(\'.sub_menu\').hide();");
document.writeln("	$(\'header>ol>li\').hover(");
document.writeln("		function(){");
document.writeln("			$(this).find(\'.sub_menu\').stop(false,false).slideDown(100);");
document.writeln("		}, function(){");
document.writeln("			$(this).find(\'.sub_menu\').stop(false,false).slideUp(100);");
document.writeln("		}");
document.writeln("	);");
document.writeln("});");
document.writeln("</script>");
//##################################################################


//########################################以下為header自動隱藏之JS部分
document.writeln("<script>");
document.writeln("var elem = document.getElementById( \'thisIsHeader\' )");
document.writeln("var headroom = new Headroom( elem, {");

// 參數設定
document.writeln("	\'offset\': 100,"); // 當捲軸到哪時，取消固定
document.writeln("	\'scroller\': window,"); // 捲軸
document.writeln("	\'classes\': {");
document.writeln("		\'initial\': \'animated\',"); // 初始的類別
document.writeln("		\'pinned\': \'fadeInDown\',"); // 固定時新增的類別(這裡運用Animate.css的類別)
document.writeln("		\'unpinned\': \'fadeOutUp\',"); // 取消固定時新增的類別(這裡運用Animate.css的類別)
document.writeln("		\'top\': \'headroom--top\',"); // 當捲軸在最上面時新增的類別
document.writeln("		\'notTop\': \'headroom--not-top\',"); // 當捲軸不在最上面時新增的類別
document.writeln("		\'bottom\': \'headroom--bottom\',"); // 當捲軸在最下面時新增的類別
document.writeln("		\'notBottom\': \'headroom--not-bottom\'"); // 當捲軸不在最下面時新增的類別
document.writeln("	},");

document.writeln("	onPin: function() { ");
// 固定時觸發的事件
document.writeln("	},");

document.writeln("	onUnpin: function() { ");
// 取消固定時觸發的事件
document.writeln("	},");

document.writeln("	onTop: function() { ");
// 當捲軸在最上面時觸發的事件
document.writeln("	},");

document.writeln("	onNotTop: function() { ");
// 當捲軸不在最上面時觸發的事件
document.writeln("	},");

document.writeln("	onBottom: function() { ");
// 當捲軸在最下面時觸發的事件
document.writeln("	}, ");

document.writeln("	onNotBottom: function() { ");
// 當捲軸不在最下面時事件
document.writeln("	}");
document.writeln("});");
document.writeln("headroom.init();");
document.writeln("</script>");
//###########################################################
document.writeln("</body>");