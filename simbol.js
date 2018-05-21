PossibleTons = {
	NOMAL: 0,
	CLARO: 1,
	ESCURO: 2
}

class simbol {
	constructor() {
		this.img = createGraphics( width, height )
		this.isBlue = true
		this.isRed = false
		this.isYellow = false
		this.isBranco = false
		this.tom = 0
		this.pos = createVector( width - SIZE_INFO_WIDTH + 12, 0 )
		this.radiusSize = 10
		this.sizeX = 150
		this.sizeY = 150
		this.triangleDif = 20
	}

	downloadCode() {
		saveCanvas( this.img, 'letmeseecolor_code', 'png' );
	}

	show() {
		this.img.clear()
		let drawColor = 0
		this.img.strokeWeight( 0 )
		translate( this.pos.x, this.pos.y )
		push();
		textAlign( CENTER );
		text( "ColorADD Code", 100, 25 );
		pop();
		translate( 25, 50 );

		switch ( this.tom ) {
			case PossibleTons.CLARO:
				this.img.fill( 255 )
				this.img.rect( 0, 0, this.sizeX, this.sizeY, this.radiusSize )
				break;
			case PossibleTons.ESCURO:
				this.img.fill( 0 )
				drawColor = 255
				this.img.rect( 0, 0, this.sizeX, this.sizeY, this.radiusSize )
				break;
		}

		this.img.fill( drawColor )
		this.img.stroke( drawColor )
		if ( this.isRed ) {
			this.img.triangle(
				this.triangleDif, this.triangleDif,
				this.triangleDif, this.sizeY - this.triangleDif * 2,
				this.sizeX - this.triangleDif * 2, this.triangleDif )
		}

		if ( this.isBlue ) {
			this.img.triangle(
				this.sizeX - this.triangleDif, this.sizeY - this.triangleDif,
				this.triangleDif * 2, this.sizeY - this.triangleDif,
				this.sizeX - this.triangleDif, this.triangleDif + this.triangleDif )
		}

		if ( this.isYellow ) {
			this.img.strokeWeight( 4 )
			this.img.line(
				this.triangleDif, this.sizeY - this.triangleDif,
				this.sizeX - this.triangleDif, this.triangleDif )
		}

		if ( this.isBranco ) {
			switch ( this.tom ) {
				case PossibleTons.CLARO: // White
					this.img.fill( 255 )
					this.img.rect( 0, 0, this.sizeX, this.sizeY, this.radiusSize )
					break;

				case PossibleTons.ESCURO: // Black
					this.img.fill( 0 )
					this.img.rect( 0, 0, this.sizeX, this.sizeY, this.radiusSize )
					break;

				default: // Gray
					this.img.fill( 150 )
					this.img.rect( 0, 0, this.sizeX, this.sizeY, this.radiusSize )
					break;
			}
		}

		// translate(this.pos.x, this.pos.y)
		image( this.img, 0, 0 );
	}
}