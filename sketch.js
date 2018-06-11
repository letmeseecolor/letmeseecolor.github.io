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

function setup() {
	createCanvas(400, 400)

	// img = loadImage( "https://yt3.ggpht.com/a-/AJLlDp1pqPH9_gvQnyGUIjkGjENtVAYqU57DDgHL8Q=s900-mo-c-c0xffffffff-rj-k-no", renderProcess );

	// Add canvas to sketch-holder, so that it is placed in the right place
	document.getElementById('sketch-holder').append(canvas);

	drag = select("#draggable").drop(handleFileDropped).dragOver(handleFileDraggedOver).dragLeave(handleFileDraggedLeave);

	buttonDownloadImage = select("#btDowImage");

	buttonDownloadCode = select("#btDowCode")

	infoText = select("#infoText");
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

	console.log(img.width, MAX_CANVAS_WIDTH);

	delete sim;
	sim = new simbol();

	lastSavedX = 0;
	lastSavedY = 0;

	buttonDownloadImage.elt.hidden = false;
	buttonDownloadCode.elt.hidden = false;
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

	// Get color from canvas
	t = get(mouseX, mouseY);
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

function draw() {
	if (doSavingCanvas) {
		clear();
	} else {
		background(24, 188, 156);
	}
	if (!img) {
		push();
		textSize(30);
		textAlign(CENTER);
		text("Arraste uma imagem aqui", width / 2, height / 2)
		pop();
		return
	}
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
	textSize(16);
	push();

	translate(width - SIZE_INFO_WIDTH + 12, height / 2);

	text(current_color.getName(), 0, 50);
	text(current_color.getRGB(), 0, 75);

	strokeWeight(2);
	translate(25, 100);
	fill(current_color.r, current_color.g, current_color.b);
	rect(0, 0, SIZE_INFO_WIDTH / 2, SIZE_INFO_WIDTH / 2, 15);

	pop();
}