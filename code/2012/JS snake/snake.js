/*-------------------------------------------
下面的 javascript 代码不属于游戏的核心代码。
因此，在设计、健壮性等方面没有进行优化，仅保证功能的实现
-------------------------------------------*/

//	显示某 Tag 标签里的内容（为了简便，这两个方法没有加强容错性）
function showDivTagContent(divTagTitle){
	var divTagContent = divTagTitle.nextSibling;
	
	while(divTagContent.nodeType != 1){
		divTagContent = divTagContent.nextSibling;		//	if(null || undefined)return;
	}
	
	hideDivTagExcept(divTagTitle.parentNode);
	
	divTagContent.style.display = "block";
}

//	隐藏所有 Tag 标签里的内容除了 参数Tag
function hideDivTagExcept(divTag){
	var divTags = divTag.parentNode.childNodes;
	
	for(i in divTags){
		if(divTags[i].nodeType == 1 && divTags[i].nodeName == "DIV"){
			divTags[i].style.cssText = "border-bottom:1px solid red;";
		
			//divTags[i].getElementsByTagName("div")[0].style.color = "";
			divTags[i].getElementsByTagName("div")[1].style.display = "none";
		/*
			var div = divTags[i].getElementsByTagName("div");
			for(j in div){
				if(div[j].className == "divTagContent"){
					div[j].style.display = "none";
					//alert(div[j].style.cssText);
				}
			}
		*/
			
			if(divTags[i] == divTag){
				divTags[i].style.cssText = "border-bottom:0px solid red;";
				//divTags[i].getElementsByTagName("div")[0].style.color = "red";
			}
		}
	}
}

//	重玩（本局重新开始，并保持当前设置）
function reBegin(){
	unCircle();
	newDefaultSnake();
	resetView();
	repaint();
}
//	清除上局游戏画面
function resetView(){
	for(var i=0; i<tdRows; i++){
		for(var j=0; j<tdCols; j++){
			tMap[i][j].style.backgroundColor = "";
		}
	}
	
	document.getElementById("gameState_span").innerHTML = "未开始";
	document.getElementById("gameState_button").value = "开始";
}

//	切换游戏状态（继续/暂停）
function changeState(){
	if(circleID == null){
		circle();
	}else{
		unCircle();
	}
}

//	设置。会使游戏重新开始（因为有的设置需重新开始才生效）
function setData(){
	unCircle();
	applyInstantData();
/*
	tdRows = document.setForm.setTdRows.value;
	tdCols = document.setForm.setTdCols.value;
	var table = document.getElementById("tMap");
	var tableInnerHTML = "";
	var row=0, col=0;
	for(row=0; row<tdRows; row++){
		tableInnerHTML += "<tr>";
		for(col=0; col<tdCols; col++){
			tableInnerHTML +="<td></td>";
		}
		tableInnerHTML += "</tr>";
	}
	//	下面两句在谷歌和火狐中可以被支持，在IE中不被支持
	//table.innerHTML = tableInnerHTML;
	//getFirstChildNode(table).innerHTML = tableInnerHTML;
	
	//table.width = tdCols*cell_px;		//	有效
	//table.height = tdRows*cell_px;	//	无效
	
	tMap.length = 0;
	reflectMap();
*/
	tMap.length = 0;
	var table = document.getElementById("tMap");
	//	delete table:rows
	for(var i=0; i<tdRows; i++){
		table.deleteRow(0);
	}
	
	tdRows = document.setForm.setTdRows.value;
	tdCols = document.setForm.setTdCols.value;
	
/*	//	reflect table map : tMap
	tMap = new Array(tdRows);
	for(var row=0, tr; row<tdRows; row++){
		tr = table.insertRow(row);
		//tr = table.insertRow(0);	//	往前插入表格行，会使tMap布局颠倒（包括tr.insertCell(0)）
		tMap[row] = new Array(tdCols);
		for(var col=0; col<tdCols; col++){
			tMap[row][col] = tr.insertCell(col);
			//tMap[row][col] = tr.insertCell(0);
		}
	}
*/
	reflectMap(tdRows, tdCols);

	//	resize table : width&height
	table.style.width = tdCols*cell_px + "px";
	table.style.height = tdRows*cell_px + "px";
	
	sTowards = document.setForm.setTowards.value;
	sPassSelf = document.setForm.setPassSelf.value;
	sInitLength = document.setForm.setInitLength.value;
	s = new Snake({
		maxCol : tdCols,
		maxRow : tdRows,
		//maxLength : ,
		towards : sTowards,
		passSelf : sPassSelf,
		initLength : sInitLength
	});
	
	resetView();
	repaint();
}
//	应用。在当前游戏下，使部分设置即时生效
function apply(){
	applyInstantData();
	repaint();
}
//	应用即时生效的数据
function applyInstantData(){
	timeout = document.setForm.setTime.value;
	
	SCOLOR.HEAD = document.setForm.setHeadColor.value;
	SCOLOR.BODY = document.setForm.setBodyColor.value;
	SCOLOR.FOOD = document.setForm.setFoodColor.value;

	s.passSelf = document.setForm.setPassSelf.value;
}

//	重置预览视觉效果
function resetPreviewColor(){
	document.getElementById('previewHead').style.cssText = "";
	document.getElementById('previewBody').style.cssText = "";
	document.getElementById('previewFood').style.cssText = "";
}

function addSnakeLength(addNum){
	for(var i=0; i<addNum; i++){
		s.add(s.tail().y, s.tail().x);
	}
}
function minusSnakeLength(minusNum){
	for(var i=0; i<minusNum; i++){
		s.remove();
		tMap[s.last.y][s.last.x].style.backgroundColor = "";
	}
}
