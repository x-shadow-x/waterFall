$(window).on("load", function() {
	waterFall();
	var dataInt = {
		"data": [
					{"src" : "0.jpg"},
					{"src" : "1.jpg"},
					{"src" : "2.jpg"},
					{"src" : "3.jpg"},
					{"src" : "4.jpg"},
					{"src" : "5.jpg"},
					{"src" : "6.jpg"},
					{"src" : "7.jpg"},
					{"src" : "8.jpg"},
					{"src" : "9.jpg"},
					{"src" : "10.jpg"},
					{"src" : "11.jpg"},
					{"src" : "12.jpg"},
					{"src" : "13.jpg"},
					{"src" : "14.jpg"},
					{"src" : "15.jpg"},
					{"src" : "16.jpg"},
					{"src" : "17.jpg"},
					{"src" : "18.jpg"},
					{"src" : "19.jpg"},
					{"src" : "20.jpg"},
					{"src" : "21.jpg"},
					{"src" : "22.jpg"},
					{"src" : "23.jpg"}
				]
	};
	$(window).on("scroll",function() {
		if(checkScrollSlide()) {
			$.each(dataInt.data,function(index, value) {
				var box = $("<div>").addClass("box").appendTo($("#main"));
				var pic = $("<div>").addClass("pic").appendTo($(box));
				//当然这里可以直接写value.src~只是这里统一用jquery来做
				var img = $("<img>").attr("src", "images/" + $(value).attr("src")).appendTo($(pic));
			})
			waterFall();
		}
	});
});

function waterFall() {
	var $boxs = $("#main>.box");
	//var colWidth = $boxs[0].width();//width()得到的是定义给元素的宽度
	var colWidth = $boxs.eq(0).outerWidth();//outerWidth()获取的是元素宽度包括其内、外边距和线宽
	var cols = Math.floor($(window).width() / colWidth);//获取列数~浏览器窗口的宽除以每一列的宽
	var heightArray = [];
	$boxs.each(function(index, value) {
		var height = $(value).outerHeight();//获取当前元素的高
		if(index < cols) {
			heightArray.push(height);
		}else {
			var minHeight = Math.min.apply(null, heightArray);
			var minIndex = $.inArray(minHeight, heightArray);//jquery就是那么任性~直接就可以拿到指定值的索引了
			$(value).css({
				"position": "absolute",
				"top": minHeight + "px",
				"left" : colWidth * minIndex + "px"
			});
			heightArray[minIndex] += height;
		}
	});
}

function checkScrollSlide() {
	var $lastBox = $("#main>.box").last();//直接获得最后一个元素
	var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight() / 2);
	var scrollDis = $(window).scrollTop();//获取页面滚动的距离
	var screanHeight = $(window).height();//获取浏览器窗口的高度
	return lastBoxDis < (scrollDis + screanHeight);
}