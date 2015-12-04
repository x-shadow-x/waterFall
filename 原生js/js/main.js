window.onload = function() {
	waterFall("main","box");
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
	window.onscroll = function() {
		if(checkScrollSide()) {
			//将数据块渲染到页面尾部
			var parent = document.getElementById("main");
			var datas = dataInt.data;
			for(var i = 0; i < datas.length; i++) {
				var box = document.createElement("div");
				var pic = document.createElement("div");
				var img = document.createElement("img");
				box.className = "box";
				pic.className = "pic";
				img.src = "images/" + datas[i].src;
				pic.appendChild(img);
				box.appendChild(pic);
				parent.appendChild(box);
			}
			waterFall("main","box");
		}
	}
}

function waterFall(parentId, elementClass) {
	//取出parentId下类名为elementClass的所有子元素
	var oParent = document.getElementById(parentId);
	var elements = getElementsByClass(oParent,elementClass);
	//计算整个页面显示的列数（页面的宽/box的宽度~注意每个盒子都是等宽的~所以随便拿一个取宽就好了）
	var boxWidth = elements[0].offsetWidth;//包括内外边距和border
	var cols = Math.floor(document.documentElement.clientWidth / boxWidth);//document.documentElement.clientWidth获得的是页面的宽
	var heightArray = [];//存放每一列图片的总高度
	for(var i = 0, len = elements.length; i < len; i++) {
		if(i < cols) {
			heightArray.push(elements[i].offsetHeight);
		}else {
			//min求一系列数字的最小值~但是不能传数组~所以这里使用apply~调用它的指针用全局的window就好了
			var currentElement = elements[i];//缓存集合中的当前元素~提高程序运行速度
			var minHeight = Math.min.apply(null,heightArray);
			var index = getMinHeightIndex(heightArray, minHeight);//获取最小高度的列的索引

			currentElement.style.position = "absolute";
			currentElement.style.top = minHeight + "px";
			currentElement.style.left = index * boxWidth + "px";

			heightArray[index] += currentElement.offsetHeight;
			
		}
	}
	console.log(heightArray);
}

//获取指定父元素下类名为elementClass的所有子元素
function getElementsByClass(parent,elementClass) {
	var elements = [];  //用来存储符合条件的元素
	var children = parent.getElementsByTagName("*");//获取所有的子元素~文本元素和注释那些会被直接过滤
	for(var i = 0, len = children.length; i < len; i++) {
		if(children[i].className == elementClass) {
			elements.push(children[i]);
		}
	}
	return elements;
}

function getMinHeightIndex(heightArray, minHeight) {
	for(var i = 0, len = heightArray.length; i < len; i++) {
		if(heightArray[i] == minHeight) {
			return i;
		}
	}
}

function checkScrollSide() {
	var parent = document.getElementById("main");
	var elements = getElementsByClass(parent,"box");
	var lastBox = elements[elements.length - 1];
	var lastBoxHeight = lastBox.offsetTop + Math.floor(lastBox.offsetHeight / 2);
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;//获取滚动条滚动的距离
	var screanHeight = document.body.clientHeight || document.documentElement.clientHeight;//获取浏览器可视窗口的高度
	return lastBoxHeight < (scrollTop + screanHeight);
}