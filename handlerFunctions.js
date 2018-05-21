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
	infoText.html( "<font color=\"#F00\">Drop the file</font>" )
	evt.preventDefault();
}

function handleFileDraggedLeave( evt ) {
	infoText.html( "Click and drag to select the color" )
	evt.preventDefault();
}

function handleFileDropped( file ) {
	if ( file.type === 'image' ) {
		img = loadImage( file.data, renderProcess );
		infoText.html( "Click and drag to select the color" )
	} else {
		infoText.html( "<font color=\"#F00\">The file was not an image!</font>" )
	}

}