var tile = [
	[" ", " ", " "],
	[" ", " ", " "],
	[" ", " ", " "]
];

var current = "X";
var ended = false;

function tik(row, id, htmlContent) {
	if(ended) {
		return;
	}
	tile[row][id] = current;
	Check(row, id);
	htmlContent.innerText = current;
	htmlContent.disabled = true;
	current = current == "X" ? "O" : "X";
}

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
		alert("tie")
	}
}

function StyleWinners(winners) {
	for (var i = 0; i < winners.length; i++) {
		document.querySelector(`.row${winners[i][0]+1}.button${winners[i][1]+1}`).style.background = "orange";
	}
}

