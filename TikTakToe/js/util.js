
function Check(row, id) {
	var equality = current + current + current;
	if(tile[0][id] + tile[1][id] + tile[2][id] == equality) {
		StyleWinners([[0, Number(id)], [1, Number(id)],[2, Number(id)]])
		ended = true;
	}else if(tile[row][0] + tile[row][1] + tile[row][2] == equality) {
		StyleWinners([[Number(row), 0],[Number(row), 1],[Number(row),2]])
		ended = true;
	}else if(tile[0][2] + tile[1][1] + tile[2][0] == equality) {
		StyleWinners([[0, 2],[1, 1],[2,0]])
		ended = true;
	}else if(tile[0][0] + tile[1][1] + tile[2][2] == equality) {
		StyleWinners([[0, 0],[1, 1],[2,2]])
		ended = true;
	}else if(tile[0][0] != " " && tile[0][1] != " " && tile[0][2] != " " &&
		tile[1][0] != " " && tile[1][1] != " " && tile[1][2] != " " &&
		tile[2][0] != " " && tile[2][1] != " " && tile[2][2] != " ") {
		Restart();
	}
}

function Restart() {
	tile = [
	[" ", " ", " "],
	[" ", " ", " "],
	[" ", " ", " "]
	];
	current = "X";
	document.querySelector(".current").innerText = current;
	document.querySelector(".winnerAnnounce").style.opacity = "0%";
	document.querySelector(".restart").style.display = "none";
	ended = false;
	for (var i = 1; i <= 3; i++) {
		for (var j = 1; j <= 3; j++) {
			document.querySelector(`.row${i}.button${j}`).innerHTML = " ";
			document.querySelector(`.row${i}.button${j}`).classList.remove("win");
			document.querySelector(`.row${i}.button${j}`).disabled = false;
		}
	}
}

function StyleWinners(winners) {
	document.querySelector(".winner").innerText = current;
	document.querySelector(".winnerAnnounce").style.opacity = "100%";
	document.querySelector(".restart").style.display = "flex";
	for (var i = 0; i < winners.length; i++) {
		document.querySelector(`.row${winners[i][0]+1}.button${winners[i][1]+1}`).classList.add("win");
	}
}

function AiMediumPredict(verticle,horizontal,cross1,cross2, i, Aug) {
	if(verticle == Aug) {
		for (var j = 0; j <= 2; j++) {
			if(tile[j][i] == " ") {
				return predictedMediumPlace = { row: j, col: i };
			}
		}
		console.log(predictedMediumPlace)
	}else if(horizontal == Aug) {
		for (var j = 0; j <= 2; j++) {
			if(tile[i][j] == " ") {
				return predictedMediumPlace = { row: i, col: j }
			}
		}
	}else if(cross1 == Aug) {
		for (var j = 0; j <= 2; j++) {
			if(tile[j][j] == " ") {
				return predictedMediumPlace = { row: j, col: j }
			}
		}
			
	}else if(cross2 == Aug) {
		if(tile[0][2] == " ") {
			return predictedMediumPlace = { row: 0, col: 2 }
		}else if(tile[1][1] == " ") {
			return predictedMediumPlace = { row: 1, col: 1 }
		}else if(tile[2][0] == " ") {
			return predictedMediumPlace = { row: 2, col: 0 }
		}
	}
	
	
}

