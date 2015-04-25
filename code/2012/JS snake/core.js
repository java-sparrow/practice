/*-------------------------------------------
写在前面的话：

为提高文字录入速度，以下将“贪食蛇”简称为“蛇”
-------------------------------------------*/

var cell_px = 20;				//	单元格边长
var tdCols = tdRows = 20;		//	默认列数和行数
//var tMap = new Array(tdRows);	//	映射表格 与 “蛇”的范围信息（ tMap 是一个二维数组）
var tMap = null;				//	映射表格 与 “蛇”的范围信息（ tMap 是一个二维数组）
var s;							//	Snake Object
var sTowards = 2;				//	“蛇”的朝向：1上、2右、3下、4左（默认向右）
var sPassSelf = "false";		//	是否允许“蛇”穿过自身（默认为否）
var sInitLength = 3;			//	“蛇”的初始长度（含头部）
var timeout = 300;				//	默认停顿时间 300 毫秒
var circleID = null;

//	WASD和方向键对应的键盘码
var WASD = {
	W : 87, A : 65, S : 83, D : 68,
	w : 119, a : 97, s : 115, d : 100,
	UP : 38, LEFT : 37, DOWN : 40, RIGHT : 39
};
//	色彩控制常量
var SCOLOR = {
	HEAD : "red", BODY : "yellow", FOOD : "#09f",
	
	//	默认颜色，供 恢复默认时使用
	DEFAULT_HEAD : "red", DEFAULT_BODY : "yellow", DEFAULT_FOOD : "#09f"
};

/*--------------------- 已过时 ---------------------
//	初始化映射（这里使用 htmlDOM 标准方法，也可以采用 tableDOM 专属方法处理）
function reflectMap(){
	var table = document.getElementById("tMap");
	
	var trs = getFirstChildNode(table).childNodes;
	
	var row=0, col=0;		//	tMap[row][col]
	for(i in trs){
		if(trs[i].nodeType == 1){
			var tds = trs[i].childNodes;
			
			tMap[row] = new Array(tdCols);
			for(j in tds){
				if(tds[j].nodeType == 1){
					tMap[row][col++] = tds[j];
				}
			}
			
			row++;
			col = 0;
		}
	}
}
//	辅助方法，获取第一个子元素。主要用于表格
function getFirstChildNode(parent){			//	重命名为 getFirstChildElement 更好
	var child = parent.firstChild;
	
	while(child && child.nodeType != 1){
		child = child.nextSibling;
	}
	
	return child;
}
-----------------------------------------------*/
//	初始化映射（使用 tableDOM 专属方法处理）
function reflectMap(y, x){
	var table = document.getElementById("tMap");

	tMap = new Array(y);
	for(var row=0, tr; row<y; row++){
		tr = table.insertRow(row);
		//tr = table.insertRow(0);	//	往前插入表格行，会使tMap布局颠倒（包括tr.insertCell(0)）
		tMap[row] = new Array(x);
		for(var col=0; col<x; col++){
			tMap[row][col] = tr.insertCell(col);
			//tMap[row][col] = tr.insertCell(0);
		}
	}
}

//	游戏初始化
function init(){
	reflectMap(tdRows, tdCols);
	newDefaultSnake();
	repaint();
}
//	按当前配置重新初始化“蛇”
function newDefaultSnake(){
	s = new Snake({
		maxCol : tdCols,
		maxRow : tdRows,
		//maxLength : ,
		towards : sTowards,
		passSelf : sPassSelf,
		initLength : sInitLength
	});
}

//	循环（定时移动）
function circle(){
	//	以 timeout 毫秒为间隔，反复调用 snakeMove()
	circleID = setInterval("snakeMove()", timeout);
	document.getElementById("gameState_span").innerHTML = "游戏中";
	document.getElementById("gameState_button").value = "暂停";
}
//	取消（定时移动）
function unCircle(){
	clearInterval(circleID);
	circleID = null;
	document.getElementById("gameState_span").innerHTML = "暂停中";
	document.getElementById("gameState_button").value = "继续";
}

//	重画，即刷新视觉效果（作用：①“蛇”移动之后，重画可覆盖之前的图案；②当改变颜色配置时，利用这个可以即时看到效果）
function repaint(){
	for(var i=1; i<s.length(); i++){
		tMap[s.body[i].y][s.body[i].x].style.backgroundColor = SCOLOR.BODY;
	}
	
	tMap[s.head.y][s.head.x].style.backgroundColor = SCOLOR.HEAD;	//	if the snake can pass itself, that its head can cover its body
	
	tMap[s.food.y][s.food.x].style.backgroundColor = SCOLOR.FOOD;
}

//	让“蛇”移动
function snakeMove(){
	if(s.move()){	//	如果能继续移动，则移动。否则出 Game over! 提示（但还是可以继续的，具体方法参考 帮助说明）
		if(s.head.y == s.food.y && s.head.x == s.food.x){
			s.add(s.last.y, s.last.x);
			s.newFood();
		}else{
			tMap[s.last.y][s.last.x].style.backgroundColor = "";
		}
		
		repaint();
	}else{
		unCircle();
		alert("Game over!");
	}
}

//	点：坐标对象模型，辅助建模
var Point = function (y, x){
	this.x = x;
	this.y = y;
}
//	“蛇”模型，内置：增加、减少“蛇身”长度、“蛇”移动、生成“新食物”坐标等方法
var Snake = function(snakeInitData){
	//	“蛇”运动方向 常量
	Snake.side = {
		UP :	1,
		RIGHT :	2,
		DOWN :	3,
		LEFT :	4
	};
	this.towards = (snakeInitData.towards>=1 && snakeInitData.towards<=4) ? Math.floor(snakeInitData.towards) : Snake.side.RIGHT;
	this.back = (this.towards>2) ? this.towards-2 : this.towards+2;
	
	this.maxCol = (snakeInitData.maxCol>=2) ? Math.floor(snakeInitData.maxCol) : 10;		//	0-9
	this.maxRow = (snakeInitData.maxRow>=2) ? Math.floor(snakeInitData.maxRow) : 10;		//	0-9
	
	this.body = new Array();		//	var body = new Array();
	
	this.add = function (y, x){		//	var add ------- in release
		if(this.body.length >= this.maxLength-1){	//	if(this.body.length >= this.maxLength-2)
			return;
		}
		
		this.body.push(new Point(y, x));
		//	在snake2.html中，蛇身各节点x、y均相同，是因为它们引用了同一对象point。这导致一个point的改变，全部节点都受影响！
		//this.body[this.body.length-1];	//	对象创建过程中，并没有直接使用x、y的值。直至对象初次使用时，才赋予x、y值（此时均为0）。
	}
	this.remove = function (){
		if(this.body.length > initLength){
			this.last = this.body.pop();
		}
	}
	
	//var initLength = (snakeInitData.length==null || isNaN(snakeInitData.length) || snakeInitData.length<1) ? 1 : snakeInitData.length;
	var initLength = (snakeInitData.initLength>1) ? Math.round(snakeInitData.initLength) : 1;	//	Math.floor
/*
	if((this.towards == Snake.side.RIGHT || this.towards == Snake.side.LEFT) && initLength>this.maxCol){	//	Cannot read property 'RIGHT' of undefined
		initLength = this.maxCol;
	}else if((this.towards == Snake.side.DOWN || this.towards == Snake.side.UP) && initLength>this.maxRow){
		initLength = this.maxRow;
	}
*/
	if(!(this.towards&1) && initLength>this.maxCol){	//	if((this.towards == Snake.side.RIGHT || this.towards == Snake.side.LEFT) && initLength>this.maxCol)
		initLength = this.maxCol;
	}else if((this.towards&1) && initLength>this.maxRow){
		initLength = this.maxRow;
	}
	
	var initBodyX, initBodyY;
	if(this.towards == Snake.side.UP){
		initBodyY = "this.maxRow-initLength+i";
		initBodyX = "this.maxCol-1";
	}else if(this.towards == Snake.side.RIGHT){
		initBodyY = "0";
		initBodyX = "initLength-1-i";
	}else if(this.towards == Snake.side.DOWN){
		initBodyY = "initLength-1-i";
		initBodyX = "0";
	}else if(this.towards == Snake.side.LEFT){
		initBodyY = "this.maxRow-1";
		initBodyX = "this.maxCol-initLength+i";
	}
	for(var i=0; i<initLength; i++){
		//this.add(0, initLength-1-i);
		eval("this.add(" + initBodyY + ", " + initBodyX + ");");	//if(this.towards == 1)this.add(this.maxRow-initLength+i, this.maxCol);
	}
	this.maxLength = (snakeInitData.maxLength>initLength && snakeInitData.maxLength<this.maxCol*this.maxRow) ? snakeInitData.maxLength : this.maxCol*this.maxRow;
	
	this.head = this.body[0];
	this.tail = function (){
		return this.body[this.body.length-1];
	};
	this.last = this.body[this.body.length-1];		//	last time tail
	
	this.length = function (){
		return this.body.length;
	}
	
	
	this.passSelf = snakeInitData.passSelf;
	this.isInBody = function (y, x){
		if(this.passSelf == "true"){
			return false;
		}
	
		for(var i=0; i<this.body.length-1; i++){		//	for(i in this.body) 时，蛇头的下一个位置不可以是原蛇尾的位置
			if(y == this.body[i].y && x == this.body[i].x){
				return true;
			}
		}
		return false;
	}
	
	this.move = function (){
		var x = this.body[0].x;
		var y = this.body[0].y;
		
		if(this.towards == Snake.side.UP){
			if(y == 0 || this.isInBody(y-1, x)){		//	若 this.isInBody 定义为 var isInBody，则isInBody函数不会返回 true
				return false;
			}
		
			this.body.unshift(new Point(y-1, x));
			
		}else if(this.towards == Snake.side.RIGHT){
			if(x == this.maxCol-1 || this.isInBody(y, x+1)){
				return false;
			}
		
			this.body.unshift(new Point(y, x+1));
			
		}else if(this.towards == Snake.side.DOWN){
			if(y == this.maxRow-1 || this.isInBody(y+1, x)){
				return false;
			}
		
			this.body.unshift(new Point(y+1, x));
			
		}else if(this.towards == Snake.side.LEFT){
			if(x == 0 || this.isInBody(y, x-1)){
				return false;
			}
		
			this.body.unshift(new Point(y, x-1));
		}
		
		this.head = this.body[0];
		this.last = this.body.pop();
		this.back = (this.towards>2) ? this.towards-2 : this.towards+2;
		return true;
	}
	
	// validata food not in body
	this.food = new Point(Math.floor(Math.random()*this.maxRow), Math.floor(Math.random()*this.maxCol));
	while( this.isInBody(this.food.y, this.food.x) ){
		this.food.x =  Math.floor(Math.random()*this.maxCol);
		this.food.y =  Math.floor(Math.random()*this.maxRow);
	}
	
	this.newFood = function (){
		var x =  Math.floor(Math.random()*this.maxCol);
		var y =  Math.floor(Math.random()*this.maxRow);
		
		while( this.isInBody(y, x) ){
			x =  Math.floor(Math.random()*this.maxCol);
			y =  Math.floor(Math.random()*this.maxRow);
		}
		
		this.food.x = x;
		this.food.y = y;
	}
}

//	键盘控制，获取键盘码
function kbControl(evt){
	var e = window.event || evt;
	
	//alert(e.keyCode || e.which);
	var keyNum = e.keyCode || e.which;

	return control(keyNum);
}
//	响应键盘码操作，包括：“蛇”的移动 或 暂停、开始
function control(keyNum){
	
	if(circleID == null){
		if(keyNum == 32){
			circle();
		}
		return false;
	}
	
	if(keyNum == WASD.W || keyNum == WASD.UP){
		if(s.back != Snake.side.UP){
			s.towards = Snake.side.UP;
		}
		if(s.back == Snake.side.DOWN){	//	加速
			snakeMove();
		}
		
	}else if(keyNum == WASD.A || keyNum == WASD.LEFT){
		if(s.back != Snake.side.LEFT){
			s.towards = Snake.side.LEFT;
		}
		if(s.back == Snake.side.RIGHT){
			snakeMove();
		}
		
	}else if(keyNum == WASD.S || keyNum == WASD.DOWN){
		if(s.back != Snake.side.DOWN){
			s.towards = Snake.side.DOWN;
		}
		if(s.back == Snake.side.UP){
			snakeMove();
		}
		
	}else if(keyNum == WASD.D || keyNum == WASD.RIGHT){
		if(s.back != Snake.side.RIGHT){
			s.towards = Snake.side.RIGHT;
		}
		if(s.back == Snake.side.LEFT){
			snakeMove();
		}
		
	}else if(keyNum == 32){
		unCircle();
	}
	
	return false;
}
