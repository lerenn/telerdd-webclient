var wall_background_image;
var wall_background_activated;

function doc_keyUp(e) {
    if (e.ctrlKey && e.altKey && e.keyCode == 66) {
      if(wall_background_activated){
        $("body").css("background-image", "none");
        wall_background_activated = false;
      } else {
        $("body").css("background-image", wall_background_image);
        wall_background_activated = true;
      }
    }
}

// Get image
wall_background_image = $("body").css("background-image");
wall_background_activated = true;

// register the handle
document.addEventListener('keyup', doc_keyUp, false);
