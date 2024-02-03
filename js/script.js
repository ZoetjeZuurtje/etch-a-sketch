const board = document.querySelector("#board");
const settingsRange = document.querySelector("#resolution");
const settingsEraser = document.querySelector("#eraser");
const settingsClear = document.querySelector("#clear-btn");
const settingsColorRandom = document.querySelector("#color-random");
let isErasing = false;
let isColorRandom = false;
settingsRange.addEventListener("pointerup", generateBoard);
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
		div.addEventListener("pointerdown", pointerHandler);
		div.addEventListener("pointermove", pointerHandler);
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

function pointerHandler(pointerEvent) {
	pointerEvent.preventDefault();
	let element = pointerEvent.target;

	if (pointerEvent.pointerType == "touch") {

		// Get the element under the touch
		let x = event.pageX;
		let y = event.pageY;
		element = document.elementFromPoint(x, y);
		// If the element is outside of the canvas, do nothing
		if (!element.classList.contains("board-pixel")) return;
		changeStyle(element);
		return;
	}

	// Only do something when the Left Mouse Button is clicked
	if (pointerEvent.buttons !== 1) return; 
	changeStyle(element);
}

function changeStyle(element) {
	
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
