var img;
var doSavingCanvas = false

let sim = null;
let drawMouse = false;

let lastSavedX = 0;
let lastSavedY = 0;

const SIZE_INFO_WIDTH = 200;

const MIN_CANVAS_HEIGHT = 400;

const LIMIT_IMAGE_SIZE = false;
const LIMIT_IMAGE_SIZE_BASED_SCREEN = true;
const SCREEN_BASED_IMAGE_LIMITATION_PERCENT = 80;

const MAX_CANVAS_WIDTH = 800;
const MAX_CANVAS_HEIGHT = 800;

let current_color = new CurrentColor();

let infoText;

let buttonDownloadImage;
let buttonDownloadCode;

let backupPixels = [];
let backupPixelsHasFilled = false;

function setup() {
	createCanvas(400, 400)

	document.getElementById('sketch-holder').append(canvas);

	drag = select("#draggable").drop(handleFileDropped).dragOver(handleFileDraggedOver).dragLeave(handleFileDraggedLeave);
	buttonDownloadImage = select("#btDowImage");
	buttonDownloadCode = select("#btDowCode")

	infoText = select("#infoText");
	fill(color(255, 255, 255));

	pixelDensity(1);
}

/*
 * This function is called everytime a image is loaded to adjust the page.
 */
function renderProcess() {
	if (LIMIT_IMAGE_SIZE) {
		resizeCanvas(min(img.width, MAX_CANVAS_WIDTH) + SIZE_INFO_WIDTH, max(min(img.height, MAX_CANVAS_HEIGHT), MIN_CANVAS_HEIGHT));
	} else if (LIMIT_IMAGE_SIZE_BASED_SCREEN) {
		resizeCanvas(min(img.width, window.innerWidth * (SCREEN_BASED_IMAGE_LIMITATION_PERCENT / 100)) + SIZE_INFO_WIDTH, max(min(img.height, window.innerHeight * (SCREEN_BASED_IMAGE_LIMITATION_PERCENT / 100)), MIN_CANVAS_HEIGHT));
	} else {
		resizeCanvas(img.width + SIZE_INFO_WIDTH, max(img.height, MIN_CANVAS_HEIGHT));
	}

	delete sim;
	sim = new simbol();

	lastSavedX = 0;
	lastSavedY = 0;

	buttonDownloadImage.elt.hidden = false;
	buttonDownloadCode.elt.hidden = false;

	backupPixels = [];
	backupPixelsHasFilled = false;

	first = false


	pixelDensity(1);
}

function pickColor(fromMouseClicked) {
	// No simbol = no image ;)
	if (!sim || !mouseIsPressed) {
		return false
	}

	// Lets not do all the calculation without a good reason :)
	if (mouseX > width - SIZE_INFO_WIDTH || mouseX < 0 || mouseY > height || mouseY < 0) {
		return false
	}

	// Force draw
	hasUpdate = true;

	// Get color from canvas
	let t;
	if (normalFilterApplyied) {
		t = get(mouseX, mouseY);
	} else {
		let index = (floor(mouseX) + floor(mouseY) * width) * 4;
		t = [
			backupPixels[index],
			backupPixels[index + 1],
			backupPixels[index + 2],
			backupPixels[index + 3],
		]
	}
	let names = findNearestColorName(t).split(":")
	let cor;
	let tom;
	if (names.length == 3) {
		cor = names[0]
		tom = names[1]
	} else {
		cor = names[0]
	}

	let tomNum = 0

	if (tom === "Claro") {
		tomNum = 1
	}
	if (tom === "Escuro") {
		tomNum = 2
	}

	switch (cor) {
		case "Vermelho":
			setSim(true, false, false, false, tomNum);
			break;

		case "Azul":
			setSim(false, true, false, false, tomNum);
			break;

		case "Amarelo":
			setSim(false, false, true, false, tomNum);
			break;

		case "Rosa":
			setSim(true, true, false, false, tomNum);
			break;

		case "Roxo":
			setSim(true, true, false, false, tomNum);
			break;

		case "Verde":
			setSim(false, true, true, false, tomNum);
			break;

		case "Laranja":
			setSim(true, false, true, false, tomNum);
			break;

		case "Marrom":
			setSim(true, true, true, false, tomNum);
			break;

		case "Branco":
			setSim(false, false, false, true, 1);
			break;

		case "Cinza":
			setSim(false, false, false, true, 0);
			break;

		case "Preto":
			setSim(false, false, false, true, 2);
			break;
	}

	current_color.r = t[0];
	current_color.g = t[1];
	current_color.b = t[2];
	current_color.name = cor;
	current_color.tom = tom;

	return true

}

function setSim(isRed, isBlue, isYellow, isBranco, tom) {
	sim.isRed = isRed
	sim.isBlue = isBlue
	sim.isYellow = isYellow
	sim.isBranco = isBranco
	sim.tom = tom
}


function normalFilter() {
	rr = 1;
	rg = 0;
	rb = 0;
	gr = 0;
	gg = 1;
	gb = 0;
	br = 0;
	bg = 0;
	bb = 1;
	normalFilterApplyied = true;
}

function deuteranopiaFilter() {

	rr = 0.5;
	rg = 0.5;
	rb = 0;
	gr = 0;
	gg = 1;
	gb = 0;
	br = 0.5;
	bg = 0;
	bb = 0.5;
	normalFilterApplyied = false;
}

function protanotopiaFilter() {
	rr = 1;
	rg = 0;
	rb = 0;
	gr = 0.5;
	gg = 0.5;
	gb = 0;
	br = 0;
	bg = 0.5;
	bb = 0.5;
	normalFilterApplyied = false;
}

function tritanotopiaFilter() {
	rr = 0;
	rg = 0.5;
	rb = 0.5;
	gr = 0.5;
	gg = 0.5;
	gb = 0;
	br = 0;
	bg = 0;
	bb = 1;
	normalFilterApplyied = false;
}

var normalFilterApplyied = true;
var rr = 1,
	rg = 0,
	rb = 0;
var gr = 0,
	gg = 1,
	gb = 0;
var br = 0,
	bg = 0,
	bb = 1;

function applyFilter() {
	if (normalFilterApplyied) {
		return;
	}
	loadPixels();

	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width - SIZE_INFO_WIDTH; x++) {
			var index = (x + y * width) * 4;

			if (!backupPixelsHasFilled) {
				backupPixels[index + 0] = pixels[index + 0];
				backupPixels[index + 1] = pixels[index + 1];
				backupPixels[index + 2] = pixels[index + 2];
				backupPixels[index + 3] = pixels[index + 3];
			}

			// R G B
			pixels[index] = int(pixels[index] * rr + pixels[index + 1] * rg + pixels[index + 2] * rb);
			pixels[index + 1] = int(pixels[index] * gr + pixels[index + 1] * gg + pixels[index + 2] * gb);
			pixels[index + 2] = int(pixels[index] * br + pixels[index + 1] * bg + pixels[index + 2] * bb);
		}
	}
	backupPixelsHasFilled = true

	updatePixels();
}

var hasUpdate = true;
var forceDrawn = 0;

function draw() {
	forceDrawn++;

	if (forceDrawn > 30) {
		hasUpdate = true;
	}

	if (!hasUpdate) {
		return;
	}

	forceDrawn = 0;
	hasUpdate = false;

	if (doSavingCanvas) {
		clear();
	} else {
		background(0, 0, 0, 0);
	}
	if (!img) {
		push();
		textSize(30);
		textAlign(CENTER);
		text("Arraste uma imagem aqui", width / 2, height / 2)
		pop();
		return
	}
	background(122, 203, 153, 255);
	image(img, 0, 0, width - SIZE_INFO_WIDTH, height);

	push();
	noFill();
	if (drawMouse) {
		ellipse(min(mouseX, width - SIZE_INFO_WIDTH), mouseY, 16, 16);
		lastSavedX = min(mouseX, width - SIZE_INFO_WIDTH);
		lastSavedY = mouseY;
	} else {
		ellipse(lastSavedX, lastSavedY, 16, 16);
	}

	pop();

	applyFilter();
	if (sim) {
		drawInfo();
	}

	if (sim != null) {
		sim.show()
	}
	if (doSavingCanvas) {
		doSavingCanvas = false
		saveCanvas('letmeseecolor_image', 'png');
	}

}

function drawInfo() {
	textSize(14);
	push();

	translate(width - SIZE_INFO_WIDTH + 12, height / 2);

	text(current_color.getName(), 45, 30);
	text(current_color.getRGB(), 45, 50);

	translate(50, 60);
	strokeWeight(1);
	fill(current_color.r, current_color.g, current_color.b);
	rect(0, 0, SIZE_INFO_WIDTH / 2, SIZE_INFO_WIDTH / 2, 15);

	pop();
}