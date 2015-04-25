function sendMsg(side){
	var chatDiv = document.getElementById(side + "chatContent");
	var username = document.getElementById(side + "username").innerHTML;
	var msg = document.getElementById(side + "Msg");

	if(msg.value == ""){
		warn(side);
		return ;
	}
	
	var userLi = document.createElement("li");
	var date = new Date();
	var sendTime =  date.getHours() + ":" + (date.getMinutes()<10?"0":"")+date.getMinutes() + ":" + (date.getSeconds()<10?"0":"")+date.getSeconds();
	userLi.className = "userLi usercolor";
	userLi.appendChild(document.createTextNode(username + "  " + sendTime));
	
	var msgDiv = document.createElement("div");
	var color = document.getElementById(side + "DivSelect").style.color;
	msgDiv.className = "msgDiv";
	msgDiv.style.color = color;
	msgDiv.appendChild(document.createTextNode(msg.value));
	
	chatDiv.appendChild(userLi);
	chatDiv.appendChild(msgDiv);
	chatDiv.scrollTop = chatDiv.scrollHeight;
	msg.value = "";
	
	//	other side chat
	var otherSide = (side=="left") ? "right" : "left";
	var otherChatDiv = document.getElementById(otherSide + "chatContent");
	var otherUserLi = userLi.cloneNode(true);
	otherUserLi.className = "userLi otherUsercolor";
	var otherMsgDiv = msgDiv.cloneNode(true);
	
	otherChatDiv.appendChild(otherUserLi);
	otherChatDiv.appendChild(otherMsgDiv);
	//alert(otherChatDiv.scrollTop);
	//alert(otherChatDiv.scrollHeight);
	otherChatDiv.scrollTop = otherChatDiv.scrollHeight;
}

function clearMsg(side){
	var msg = document.getElementById(side + "Msg");
	msg.value = "";
}

function warn(side){
	var img = document.getElementById(side + "Warn");
	img.className = "show";
	//setTimeout("hideWarn(" + img + ")", 2000);
	setTimeout(function (){
		hideWarn(img);
	}, 1500);
}
function hideWarn(img){
	img.className = "hide";
}

function alterText(span){
	var text = span.innerHTML;
	var input = document.createElement("input");
	span.parentNode.replaceChild(input, span);
	input.type = "text";
	input.value = text;
	input.id = span.id;
	input.select();
	input.onmouseout = function(){
		sureInput(this);
	};
}
function sureInput(input){
	var text = document.createTextNode(input.value);
	var span = document.createElement("span");
	input.parentNode.replaceChild(span, input);
	span.appendChild(text);
	span.id = input.id;
	span.onmouseover = function(){
		alterText(this);
	};
}

function showOption(side){
	var div = document.getElementById(side + "divOption");
	div.style.display = "block";
}
function hideOption(side){
	var div = document.getElementById(side + "divOption");
	div.style.display = "none";
}

function optionColor(option){
	var div = option.parentNode.parentNode;
	div.style.color = option.style.background;
	
	var side = div.id.substr(0, div.id.length-9);		//	"left" or "right"
	var msg = document.getElementById(side + "Msg");
	msg.style.color = option.style.background;
}
