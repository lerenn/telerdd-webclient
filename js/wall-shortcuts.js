var backgroundImage = $("body").css("background-image");
var backgroundActivated = true;
var presentationMode = false;

function doc_keyUp(e) {
    // Background
    if (e.ctrlKey && e.altKey && e.keyCode == 66) {
      if(backgroundActivated){
        $("body").css("background-image", "none");
        backgroundActivated = false;
      } else {
        $("body").css("background-image", backgroundImage);
        backgroundActivated = true;
      }
    }

    // Presentation mode
    if (e.ctrlKey && e.altKey && e.keyCode == 80) {
      presentationMode = !presentationMode;
      if(presentationMode){
        $("body").css("overflow", "hidden");
        $("#update-bar").hide();
      } else {
        $("body").css("overflow", "auto");
        $("#update-bar").show();
      }
    }
}

// register the handle
document.addEventListener('keyup', doc_keyUp, false);
