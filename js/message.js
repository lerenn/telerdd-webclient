function Message(api){
  this.api = api;
  this.reader = new FileReader();
}

Message.prototype.responseOK = function(){
  $(".message").remove();
  $("#messages-form").append(
    "<div class=\"message successful-message\">" +
    "<h3>Votre message a été envoyé avec succès</h3>" +
    "<p>Celui-ci sera affiché après validation d'un de nos modérateurs</p>" +
    "<a href=\"/\">" +
    "<button type=\"button\" class=\"btn btn-sm btn-default\">Retourner à l'accueil</button>" +
    "</a>" +
    "</div>"
  );
}

Message.prototype.send = function(){
  message = $("#message").val();
  name = $("#name").val();
  img = $("#photo input").val();

  // Waiting for message sending
  $("#messages-form").children().hide();
  $("#messages-form").append(
    "<div class=\"message waiting-message\">" +
    "<h3>Message en cours d'envoi...</h3>" +
    "</div>"
  );

  // Prepare callback
  var self = this;
  var callback = function(obj){
    self.responseOK();
  };

  // If there is an image, send it
  if(img != ""){
    // Prepare for image loading and send request
    self.reader.addEventListener("load", function () {
      self.api.request("POST", "/messages", callback, { "message": message, "name": name, "image": self.reader.result});
    }, false);
    // Image loading
    var file = document.querySelector('input[type=file]').files[0];
    self.reader.readAsDataURL(file);
  } else {
    self.api.request("POST", "/messages", callback, { "message": message, "name": name });
  }
};

// Events
$('#photo button').click(function(){
  $('#photo input').click();

  $('#photo input').on('input', function() {
    if($(this).val() != ""){
      $('#photo button').removeClass("btn-default").addClass("btn-warning");
    }
  });
});
