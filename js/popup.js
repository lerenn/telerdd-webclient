var g_popup_id = 0;

function successPopup(message){
  deletePopups();
  id = g_popup_id++;
  popup(id, "success-popup", message);
}

function errorPopup(message){
  deletePopups();
  id = g_popup_id++;
  popup(id, "error-popup", message);
}

function waitPopup(){
  deletePopups();
  id = g_popup_id++;
  popup(id, "wait-popup", "Patientez s'il-vous-plaît...");
}

function deletePopups(){
  $(".wait-popup").remove();
  $(".error-popup").remove();
  $(".success-popup").remove();
}

function popup(id, type, message){
  html = "<div id='popup-"+id+"' class='popup "+type+"'>"+message+"</div>";
  $("body").append(html);
  $("#popup-"+id).delay(3000).fadeOut(500);
  setTimeout(function(){ $("#popup-"+id).remove(); }, 3500);
}
