var img;
let sim = null;
var name = ""

function setup() {
	createCanvas(400, 400)

	img = loadImage("https://yt3.ggpht.com/a-/AJLlDp1pqPH9_gvQnyGUIjkGjENtVAYqU57DDgHL8Q=s900-mo-c-c0xffffffff-rj-k-no", renderProcess);
}

function renderProcess() {
	resizeCanvas(img.width, img.height)
	textSize(img.width * (3 / 100))

	document.getElementById('sketch-holder').append(canvas)

	sim = new simbol()
}

function mouseMoved() {
	// px = img.get(mouseX, mouseY)
	indx = (mouseX + mouseY * height) * 4;
	pr = pixels[indx]
	pg = pixels[indx + 1]
	pb = pixels[indx + 2]
	t = [pr, pg, pb]
	name = findNearestColorName(t)
	names = name.split(":")
	let cor;
	let tom;
	if (names.length == 3) {
		cor = names[0]
		tom = names[1]
	} else {
		cor = names[0]
	}

	sim.tom = 0

	console.log(tom)
	if (tom === "Claro") {

		sim.tom = 1
	}
	if (tom === "Escuro") {
		sim.tom = 2
	}

	switch (cor) {
		case "Vermelho":
			sim.isRed = true
			sim.isBlue = false
			sim.isYellow = false
			break;
		case "Azul":
			sim.isRed = false
			sim.isBlue = true
			sim.isYellow = false
			break;
		case "Amarelo":
			sim.isRed = false
			sim.isBlue = false
			sim.isYellow = true
			break;

		case "Rosa":
			sim.isRed = true
			sim.isBlue = true
			sim.isYellow = false
			break;
		case "Roxo":
			sim.isRed = true
			sim.isBlue = true
			sim.isYellow = false
			break;

		case "Verde":
			sim.isRed = false
			sim.isBlue = true
			sim.isYellow = true
			break;

		case "Laranja":
			sim.isRed = true
			sim.isBlue = false
			sim.isYellow = true
			break;

		case "Marrom":
			sim.isRed = true
			sim.isBlue = true
			sim.isYellow = true
			break;

		case "Branco":
			sim.isRed = false
			sim.isBlue = false
			sim.isYellow = false
			break;

		case "Cinza":
			sim.isRed = false
			sim.isBlue = false
			sim.isYellow = false
			break;

		case "Preto":
			sim.isRed = false
			sim.isBlue = false
			sim.isYellow = false
			break;
		default:

	}

}

function draw() {
	background(0)
	image(img, 0, 0);
	text(name, 50, 50)

	loadPixels()
	if (sim != null) {
		sim.show()
	}
}
