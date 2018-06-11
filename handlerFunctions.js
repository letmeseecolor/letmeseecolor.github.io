// Button handlers:

function onMouseClickedSaveImage( evt ) {
	doSavingCanvas = true
}

function onMouseClickedSaveCode( evt ) {
	if ( sim ) {
		sim.downloadCode()
	}
}


// P5 Mouse Callbacks:
function mouseClicked() {
	if ( pickColor( true ) || mouseIsPressed ) {
		drawMouse = true
	}
}

function mouseDragged() {
	if ( pickColor( false ) ) {
		drawMouse = true
	}
}

function mouseReleased() {
	drawMouse = false
}


// P5 DOM drag callbacks:
function handleFileDraggedOver( evt ) {
	infoText.html( "<font color=\"#F00\">Solte o arquivo</font>" );
	evt.preventDefault();
}

function handleFileDraggedLeave( evt ) {
	infoText.html( "Clique e arraste sobre a imagem para escolher uma cor" );
	evt.preventDefault();
}

function handleFileDropped( file ) {
	if ( file.type === 'image' ) {
		img = loadImage( file.data, renderProcess );
		infoText.html( "Clique e arraste sobre a imagem para escolher uma cor" );
	} else {
		infoText.html( "<font color=\"#F00\">O arquivo deve ser uma imagem!</font>" );
	}

}