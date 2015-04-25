function faceState(state){
	document.getElementById("faceDiv").className = state;
}
function addFace(img){
	var textDiv = document.getElementById("textDiv");
	var imgClone = document.createElement("img");
	imgClone.src = img.src;
	
	textDiv.appendChild(imgClone);
	faceState('hide');
}
function claerContent(){
	document.getElementById("textDiv").innerHTML = "";
}
