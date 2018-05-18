document.getElementById('picField').onchange = function (evt) {
  var tgt = evt.target || window.event.srcElement, files = tgt.files

  if (FileReader && files && files.length) {
    var fr = new FileReader()

    fr.onload = function () {
      img = loadImage(fr.result, renderProcess);

    }
    fr.readAsDataURL(files[0])
  }
}
