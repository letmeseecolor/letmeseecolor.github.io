PossibleTons = {
	NOMAL: 0,
	CLARO: 1,
	ESCURO: 2
}

class simbol {
	constructor() {
		this.img = createGraphics(width, height)
		this.isBlue = true
		this.isRed = false
		this.isYellow = false
		this.tom = 0
		this.pos = createVector(50, 50)
		this.radiusSize = 10
		this.sizeX = 150
		this.sizeY = 150
		this.triangleDif = 20
	}

	show() {
		this.img.clear()
		let drawColor = 0
		this.img.strokeWeight(0)
		switch (this.tom) {
			case PossibleTons.CLARO:
				this.img.fill(255)
				this.img.rect(0, 0, this.sizeX, this.sizeY, this.radiusSize)
				break;
			case PossibleTons.ESCURO:
				this.img.fill(0)
				drawColor = 255
				this.img.rect(0, 0, this.sizeX, this.sizeY, this.radiusSize)
				break;
		}

		this.img.fill(drawColor)
		this.img.stroke(drawColor)
		if (this.isRed) {
			this.img.triangle(
				this.triangleDif, this.triangleDif,
				this.triangleDif, this.sizeY - this.triangleDif * 2,
				this.sizeX - this.triangleDif * 2, this.triangleDif)
		}

		if (this.isBlue) {
			this.img.triangle(
				this.sizeX - this.triangleDif, this.sizeY - this.triangleDif,
				this.triangleDif * 2, this.sizeY - this.triangleDif,
				this.sizeX - this.triangleDif, this.triangleDif + this.triangleDif)
		}

		if (this.isYellow) {
			this.img.strokeWeight(4)
			this.img.line(
				this.triangleDif, this.sizeY - this.triangleDif,
				this.sizeX - this.triangleDif, this.triangleDif)
		}

		// translate(this.pos.x, this.pos.y)
		image(this.img, 0, 0);
	}
}