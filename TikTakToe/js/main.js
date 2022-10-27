var tile = [
[" ", " ", " "],
[" ", " ", " "],
[" ", " ", " "]
];

var current = "X";
var ended = false;
var currentMode = "PvP";
const availableModes = {
	"0": "PvP",
	"1": "Ai-E",
	"2": "Ai-M",
}

function ChangeMode(self) {
	Restart();
	currentMode = availableModes[self.toString()];
}

function tik(row, id, htmlContent) {
	if(ended) {
		return;
	}else if(currentMode == "PvP") {
		PvP(row, id, htmlContent);
	}else if(currentMode == "Ai-E") {
		Ai(row, id, htmlContent, currentMode);
	}else if(currentMode == "Ai-M") {
		Ai(row, id, htmlContent, currentMode);
	}
	
}

var pause = false;

function Ai(row, id, htmlContent, mode) {
	if(!ended && !pause) {
		current = "X";
		tile[row][id] = current;
		Check(row, id);
		htmlContent.innerText = current;
		htmlContent.disabled = true;
		document.querySelector(".current").innerText = current;
	}
	if(!pause && mode == "Ai-E") {
		if(!ended) {
			current = "O"
			AiEasyPlace();
			document.querySelector(".current").innerText = current;
		}
	}else if(!pause && mode == "Ai-M") {
		if(!ended) {
			current = "O"
			AiMediumPlace();
			document.querySelector(".current").innerText = current;
		}
	}
	
}
let randomRow; let randomCol; let predictedMediumPlace = {};

function AiMediumPlace(row, id) {
	randomRow = Math.floor(Math.random() * 3) + 1;
	randomCol = Math.floor(Math.random() * 3) + 1;
	if(tile[randomRow-1][randomCol-1] == " ") { 

		pause = true;
		setTimeout(() => {
			for (var i = 0; i <= 2; i++) {
				var verticle = (tile[0][i] + tile[1][i] + tile[2][i]).toString().replaceAll(' ','')
				var horizontal = (tile[i][0] + tile[i][1] + tile[i][2]).toString().replaceAll(' ','')
				var cross1 = (tile[0][0] + tile[1][1] + tile[2][2]).toString().replaceAll(' ','')
				var cross2 = (tile[0][2] + tile[1][1] + tile[2][0]).toString().replaceAll(' ','')
				AiMediumPredict(verticle,horizontal,cross1,cross2,i,"OO");
				if(predictedMediumPlace.row == undefined) {
					AiMediumPredict(verticle,horizontal,cross1,cross2,i,"XX");
				}
				
			}
			if(predictedMediumPlace.row !== undefined ) {
				console.log(predictedMediumPlace)
				tile[predictedMediumPlace.row][predictedMediumPlace.col] = current;
				document.querySelector(`.row${predictedMediumPlace.row+1}.button${predictedMediumPlace.col+1}`).innerText = "O"
				document.querySelector(`.row${predictedMediumPlace.row+1}.button${predictedMediumPlace.col+1}`).disabled = true;
				Check(predictedMediumPlace.row, predictedMediumPlace.col)
				predictedMediumPlace = {};
				pause = false;
			}else {
				console.log(predictedMediumPlace)
				tile[randomRow-1][randomCol-1] = current;
				document.querySelector(`.row${randomRow}.button${randomCol}`).innerText = "O"
				document.querySelector(`.row${randomRow}.button${randomCol}`).disabled = true;
				Check(randomRow-1, randomCol-1)
				pause = false;
			}
			current = "X"
			document.querySelector(".current").innerText = current;
		}, 500)
	}else if(tile[randomRow-1][randomCol-1] !== " ") {
		setTimeout(() =>{
			AiMediumPlace()
		}, 1);
	}
}

function AiEasyPlace() {
	randomRow = Math.floor(Math.random() * 3) + 1;
	randomCol = Math.floor(Math.random() * 3) + 1;
	if(tile[randomRow-1][randomCol-1] == " ") { 
		pause = true;
		setTimeout(() => {
			tile[randomRow-1][randomCol-1] = current;
			document.querySelector(`.row${randomRow}.button${randomCol}`).innerText = "O"
			document.querySelector(`.row${randomRow}.button${randomCol}`).disabled = true;
			Check(randomRow-1, randomCol-1)
			pause = false;
			current = "X"
			document.querySelector(".current").innerText = current;
		}, 500)
	}else if(tile[randomRow-1][randomCol-1] !== " ") {
		setTimeout(() =>{
			AiEasyPlace()
		}, 1);
	}
	
	
}

function PvP(row, id, htmlContent) {
	console.log("hey")
	tile[row][id] = current;
	Check(row, id);
	htmlContent.innerText = current;
	htmlContent.disabled = true;
	current = current == "X" ? "O" : "X";
	document.querySelector(".current").innerText = current;
}
