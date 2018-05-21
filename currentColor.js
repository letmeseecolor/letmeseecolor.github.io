class CurrentColor {
	constructor() {
		this.r = 0;
		this.g = 0;
		this.b = 0;
		this.name = "";
		this.tom = undefined;
	}

	getName() {
		return this.name + ( this.tom ? " " + this.tom : "" )
	}

	getRGB() {
		return "RGB(" + this.r + ", " + this.g + ", " + this.b + ")";
	}
}