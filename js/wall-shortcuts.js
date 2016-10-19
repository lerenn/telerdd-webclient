var backgroundImage = $("body").css("background-image");
var backgroundActivated = true;
var presentationMode = false;
var config = Config();

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

  // Presentation
  if (e.ctrlKey && e.altKey && e.keyCode == 80) {
    presentationMode = !presentationMode;
    if(presentationMode){
      $("body").css("overflow", "hidden");
      $("#update-bar").hide();
      $('link[data-role="normal"]').prop('disabled', true);
      $('link[data-role="presentation"]').prop('disabled', false);
    } else {
      $("body").css("overflow", "auto");
      $("#update-bar").show();
      $('link[data-role="normal"]').prop('disabled', false);
      $('link[data-role="presentation"]').prop('disabled', true);
    }
  }
}

// register the handle
document.addEventListener('keyup', doc_keyUp, false);
