var clickTime = true;			//	判断是否执行单击事件
var count1 =0;					//	单双击次数

function setBgcolor(td){		//	设置单元格背景颜色（把out改为over，把over给为out。如果都不是，则说明已被点击过，将不再改变背景颜色）
	if(td.className == "out"){
		td.className = "over";
	}else if(td.className == "over"){
		td.className = "out";
	}
}

function setFlag(td){			//	双击时触发此函数，使单元格背景变为旗帜
	if(td.className == "flag"){
		td.className = "over";
	}else if(td.className == "over"){
		td.className = "flag";
	}
	clickTime = false;
}

function time1(td){				//	延迟函数，双击时利用此间隔 屏蔽单击事件
	setTimeout(function (){
		showNumber(td);
	}, 300);
}

function showNumber(td){
//	td.innerHTML = setMine(9,9,10);
//	if(td.className != "out")return null;
	//setTimeout();
	//alert(clickTime);
	if(clickTime){
		var ifMine = exploreMine(td);
		if(ifMine === true){
			gameover();
			td.className = "hit";
		}else{
			if(ifMine == 0){
				mineSurround(td);
				//a();
			}
			td.className = "clicked";
		}
		td.innerHTML = ifMine;
		clickTime = true;
	}else{		//	当单击事件被双击事件所屏蔽时，双击事件后重置clickTime
		count1++;
		if(count1==2){
			clickTime=true;
			count1=0;
		}
	}
	
//	alert(ifMine);
}

function getNodeIndex(node){	//	得到某节点 在父节点中 相对于其它同类型兄弟节点 的下标
	if(node == null){
		return null;
	}

	var index = 0;
	var name = node.nodeName;	//	节点名字
	
	while(node.previousSibling != null){
		if(node.previousSibling.nodeName == name){		//	当节点名字相同时，下标才被统计
			index++;
		}
		node = node.previousSibling;
	}
	return index;
}

function setMine(width, height, number){	//	设置地雷位置，参数为：宽、长、地雷数量
	var mineSubscript = [];
	for(var i=0; i<height; i++){
		mineSubscript[i] = [];
		for(var j=0; j<width; j++){
			mineSubscript[i][j] = false;	//	根据参数的宽、长 创建一个二维数组存放地雷信息，默认为没有地雷
		}
	}
	
	var x, y;
	for(var k=0; k<number; k++){
		x = Math.floor(Math.random()*width);
		y = Math.floor(Math.random()*height);
		if(mineSubscript[y][x] == true){	//	if(mineSubscript[y][x])
			k--;							//	当地雷存在时，提前结束本次循环，重新再来
			continue;
		}
		mineSubscript[y][x] = true;			//	if(mineSubscript[y][x]){k--;}else{mineSubscript[y][x] = true;}
	}
	return mineSubscript;					//	返回一个包含地雷位置信息的二维数组
}

function exploreMine(td){					//	探雷
	var x = getNodeIndex(td);
	var y = getNodeIndex(td.parentNode);
	
	if(minePosition[y][x]){
		return minePosition[y][x];			//	根据td的行坐标与列坐标，判断二维数组的该位置是否有雷
	}else{
		return countMine(x,y);
	}
}

function countMine(x,y){					//	计雷数
	var count = 0;
	var height = minePosition.length;
	var width = (height==0) ? 0: minePosition[0].length;
	
	for(var i=-1; i<=1; i++){				//	循环从坐上角开始，到右下角结束
		for(var j=-1; j<=1; j++){
			if(y+i>=0 && y+i<=height-1 && x+j>=0 && x+j<=width-1){
				if(minePosition[y+i][x+j]){
					count++;
				}
			}
			//	if(y+i>=0 && y+i<=height-1 && x+j>=0 && x+j<=width-1 && minePosition[y+i][x+j])count++:
		}
	}
	return count;
}

function previousSameSibling(node){			//	安全函数，用于获得同名的前一个兄弟节点
	if(node == null)return null;
	
	var name = node.nodeName;	//	节点名字
	node = node.previousSibling;
	
	while(node != null){
		if(node.nodeName == name){
			return node;
		}
		node = node.previousSibling;
	}
	return null;
}

function nextSameSibling(node){				//	安全函数，用于获得同名的下一个兄弟节点
	if(node == null)return null;
	
	var name = node.nodeName;	//	节点名字
	node = node.nextSibling;
	
	while(node != null){
		if(node.nodeName == name){
			return node;
		}
		node = node.nextSibling;
	}
	return null;
}

function mineSurround(td){	//	另一种数据结构：获取每一个td对象，并存储在一个二维数组中，这样就可以直接利用数组下标对特定td进行操作 而不用通过繁杂的间接引用
//	if(td.className == "clicked"){
//		return null;
//	}
	mineSide(td);
	mineUp(td);
	mineDown(td);
}

function mineSide(td){		//	判断左右两边是否有地雷。此方法应该拆为“向左”和“向右”，这样可以减少递归次数，避免重复递归
	//	下面是繁杂的间接引用
	var preTd = previousSameSibling(td);
	var nextTd = nextSameSibling(td);
	var flag = false;
//	preTd.innerHTML = exploreMine(preTd);
//	preTd.className = "clicked";
//	nextTd.innerHTML = exploreMine(nextTd);
//	nextTd.className = "clicked";
	if(preTd != null && autoShowNumber(preTd) == 0){
		mineSurround(preTd);
		flag = true;
	}
	if(nextTd != null && autoShowNumber(nextTd) == 0){
		mineSurround(nextTd);		//	再次递归调用“向上扫雷区”和“向下扫雷区”方法
		flag = true;
	}
	return flag;
}

function mineUp(td){		//	判断上方的雷区
	var tdIndex = getNodeIndex(td);
	var previousTdParent = previousSameSibling(td.parentNode);
	var name = td.name;
	td.innerHTML = exploreMine(td);
	td.className = (td.innerHTML=="true") ? "mine" : "clicked";
	
	if(previousTdParent != null){
		var aboveTd = previousTdParent.firstChild;	//	安全处理，检查空文本节点等 其它非目标类型节点
		while(aboveTd.name != name){
			aboveTd = aboveTd.nextSibling;
		}
		
		for(var i=0; i<tdIndex; i++){		//	得到上一行此横坐标的元素
			aboveTd = nextSameSibling(aboveTd);
		}
		if(mineSide(aboveTd)){				//	如果周围8个方向没有雷，则需要继续递归向上扫雷
			mineUp(aboveTd);
		}
	}
}

function mineDown(td){		//	判断下方的雷区
	var tdIndex = getNodeIndex(td);
	var nextTdParent = nextSameSibling(td.parentNode);
	var name = td.name;
	td.innerHTML = exploreMine(td);
	td.className = (td.innerHTML=="true") ? "mine" : "clicked";
	
	if(nextTdParent != null){
		var belowTd = nextTdParent.firstChild;	//	safe deal
		while(belowTd.name != name){
			belowTd = belowTd.nextSibling;
		}
		
		for(var i=0; i<tdIndex; i++){
			belowTd = nextSameSibling(belowTd);
		}
		if(mineSide(belowTd)){
			mineDown(belowTd);
		}
	}
}

function autoShowNumber(td){	//	扫雷区时调用的函数
	if(td == null || td.className == "clicked"){	//	对于空节点或 已扫过的雷区，直接返回null
		return null;
	}
	
	var ifMine = exploreMine(td);	//	如果该点是地雷，则也直接返回true
	if(ifMine === true){
		return ifMine;
	}
	td.innerHTML = ifMine;			//	处理雷区，设置雷区文字提醒，并改变样式
	td.className = "clicked";
	return ifMine;
}

function previewMine(){				//	预览地雷位置
	var table = document.getElementsByTagName("table");
	var tr = table[0].firstChild.firstChild;
	var td;
	while(tr != null){				//	遍历table所有的td节点，改变地雷的样式（显示地雷位置）
		td = tr.firstChild;
		while(td != null){
			if((td.className == "out") && (exploreMine(td) === true)){	//	被点击过的区域（class不为out）不处理
				td.className = "pre";
			}
			td = td.nextSibling;
		}
		tr = tr.nextSibling;
	}
}

function unpreviewMine(){			//	取消预览
	var table = document.getElementsByTagName("table");
	var tr = table[0].firstChild.firstChild;
	var td;
	while(tr != null){
		td = tr.firstChild;
		while(td != null){
			if(td.className == "pre"){
				td.className = "out";
			}
			td = td.nextSibling;
		}
		tr = tr.nextSibling;
	}
}

function a(){	//	弹框测试，用于调试 代码在哪行之后无法继续执行（谷歌浏览器的脚本调试，可以很清楚看出哪些代码有“故障”）
	alert("test");
}

function gameover(){		//	游戏结束（需要把所有的地雷信息显示出来）
	var table = document.getElementsByTagName("table");
	var tr = table[0].firstChild.firstChild;
	var td;
	while(tr != null){
		td = tr.firstChild;
		while(td != null){
			if(td.className == "out"){
				td.innerHTML = exploreMine(td);
				td.className = (td.innerHTML=="true") ? "mine" : "clicked";
			}
			td = td.nextSibling;
		}
		tr = tr.nextSibling;
	}
}

function testAgain(){		//	该函数用于重新测试，而不改变随机的雷区。（有些特殊的雷阵会引发bug，所以需要次函数来反复测试）
	var table = document.getElementsByTagName("table");
	var tr = table[0].firstChild.firstChild;
	var td;
	while(tr != null){
		td = tr.firstChild;
		while(td != null){
			td.innerHTML = "";
			td.className = "out";
			td = td.nextSibling;
		}
		tr = tr.nextSibling;
	}
}
//	所有利用innerHTML判断样式的，都是不安全的，因为 0的雷区信息最终将不会显示，这会导致innerHTML失误
