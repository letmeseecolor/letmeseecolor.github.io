document.getElementById('picField').onchange = function (evt) {
  var tgt = evt.target || window.event.srcElement, files = tgt.files

  if (FileReader && files && files.length) {
    if (files[0].type == "image/png" || files[0].type == "image/jpg" ||files[0].type == "image/jpeg" ){
      var fr = new FileReader()

      fr.onload = function () {
        img = loadImage(fr.result, renderProcess);
      }
      fr.readAsDataURL(files[0])
    }else{
        infoText.html( "<font color=\"#F00\">O arquivo deve ser uma imagem!</font>" );
        console.log("ahdua");
        document.getElementById('picField').value = "";
    }
  }
  hasUpdate = true;
}
