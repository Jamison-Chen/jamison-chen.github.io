var elem = document.getElementById( "thisIsHeader" )
var headroom = new Headroom( elem, {
	// 參數設定[註1]
	"offset": 100, // 當捲軸到哪時，取消固定
	"scroller": window, // 捲軸
	"classes": {
		"initial": "animated", // 初始的類別
		"pinned": "flipInX", // 固定時新增的類別(這裡運用Animate.css的類別)
		"unpinned": "flipOutX", // 取消固定時新增的類別(這裡運用Animate.css的類別)
		"top": "headroom--top", // 當捲軸在最上面時新增的類別
		"notTop": "headroom--not-top", // 當捲軸不在最上面時新增的類別
		"bottom": "headroom--bottom", // 當捲軸在最下面時新增的類別
		"notBottom": "headroom--not-bottom" // 當捲軸不在最下面時新增的類別
	},
	onPin: function() { 
		// 固定時觸發的事件
	},
	onUnpin: function() { 
		// 取消固定時觸發的事件
	},
	onTop: function() { 
		// 當捲軸在最上面時觸發的事件
	},
	onNotTop: function() { 
		// 當捲軸不在最上面時觸發的事件
	},
	onBottom: function() { 
		// 當捲軸在最下面時觸發的事件
	}, 
	onNotBottom: function() { 
		// 當捲軸不在最下面時事件
	}
});
headroom.init();