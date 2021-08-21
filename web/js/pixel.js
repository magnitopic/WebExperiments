//Black=0
//White=1
//Red=2
//Green=3
//Blue=4
let number=-1,
start=false,
el = document.documentElement,
rfs = // for newer Webkit and Firefox
	el.requestFullScreen
	|| el.webkitRequestFullScreen
	|| el.mozRequestFullScreen
	|| el.msRequestFullScreen;



function startTest() {
	document.getElementById("page").style.visibility= "hidden";

	//This code whas copied from: https://hdeleon.net/cual-es-el-codigo-javascript-para-simular-la-tecla-f11-del-navegador-pantalla-completa-en-navegador/
	//Props to them for the full screen compatibility
	if(typeof rfs!="undefined" && rfs){
		rfs.call(el);
	} else if(typeof window.ActiveXObject!="undefined"){
		// for Internet Explorer
		var wscript = new ActiveXObject("WScript.Shell");
		if (wscript!=null) {
			wscript.SendKeys("{F11}");
		}
	}
	start=true;
	nextColour();
}

document.addEventListener('keydown', (e) => {
	if (e.key==" "){
		change();
	}
});

document.addEventListener('click', () => {
	change();
});

function change() {
	if(start){
		if(number<=3){
			number++;
		}else{
			number=0;
		}
		nextColour();
	}
}

function nextColour() {
	console.log(number);
	if(number==0){
		document.body.style.backgroundColor = "#000000";
	}else if(number==1){
		document.body.style.backgroundColor = "#ffffff";
	}else if(number==2){
		document.body.style.backgroundColor = "rgb(255,0,0)";
	}else if(number==3){
		document.body.style.backgroundColor = "rgb(0,255,0)";
	}else if(number==4){
		document.body.style.backgroundColor = "rgb(0,0,255)";
	}
}