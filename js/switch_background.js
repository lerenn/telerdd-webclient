// Events
var background_image;
var background_activated;

function doc_keyUp(e) {
    if (e.ctrlKey && e.altKey && e.keyCode == 66) {
      if(background_activated){
        $("body").css("background-image", "none");
        background_activated = false;
      } else {
        $("body").css("background-image", background_image);
        background_activated = true;
      }
    }
}

// Get image
background_image = $("body").css("background-image");
background_activated = true;

// register the handle
document.addEventListener('keyup', doc_keyUp, false);
