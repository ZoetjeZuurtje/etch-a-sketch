const board = document.querySelector("#board");
const settingsRange = document.querySelector("#resolution");
const settingsEraser = document.querySelector("#eraser");
const settingsClear = document.querySelector("#clear-btn");
const settingsColorRandom = document.querySelector("#color-random");
let isErasing = false;
let isColorRandom = false;
settingsRange.addEventListener("mouseup", generateBoard);
settingsEraser.addEventListener("click", toggleEraser);
settingsColorRandom.addEventListener("click", toggleRandomColor);
settingsClear.addEventListener("click", generateBoard);

function generateBoard() {
	board.innerHTML = "";
	
	let rowLength = getResolution();
	const blockSize = (1 / rowLength) * 100;

	for (let i = 0; i < rowLength ** 2; i++) {
		let div = document.createElement("div");
		div.style.width  = `${blockSize}%`;
		div.style.height = `${blockSize}%`;
		div.addEventListener("mousedown", changeStyle);
		div.addEventListener("mouseover", changeStyle);
		div.classList.add("board-pixel");
		board.appendChild(div);
	}
}

function getResolution() {
	return settingsRange.value;
}

function toggleEraser(event) {
	isErasing = isErasing ? false : true;

	setButtonBackground(event.target, isErasing);
}

function toggleRandomColor(event) {
	isColorRandom = isColorRandom ? false : true;

	setButtonBackground(event.target, isColorRandom);
}

function setButtonBackground(element, condition) {
	if (condition) {
		element.style.backgroundColor = "#a5ffbf";
	} else {
		element.style.backgroundColor = "white";
	}
}

function generateRandomColor() {
	let red = Math.floor(Math.random() * 256);
	let green = Math.floor(Math.random() * 256);
	let blue = Math.floor(Math.random() * 256);

	return `rgb(${red}, ${green}, ${blue})`;
}

function changeStyle(event) {
	event.preventDefault();

	if (event.buttons !== 1) return; // Only do something when the Left Mouse Button is clicked

	let element = event.target;
	if (isErasing) {
		element.style.backgroundColor = "transparent";
		return;
	}

	let color = document.querySelector("#color-input").value;
	if (isColorRandom) {
		color = generateRandomColor();
	}
	element.style.backgroundColor = color;
}

generateBoard();
