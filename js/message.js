function Message(api){
  this.api = api;
}

Message.prototype.send = function(){
  message = $("#message").val();
  name = $("#name").val();

  this.api.request("POST", "/messages", function(obj){
    if (obj.response == "OK"){
      $("#messages-form").empty().append(
        "<div class=\"successful-message\">" +
        "<h3>Votre message a été envoyé avec succès</h3>" +
        "<p>Celui-ci sera affiché après validation d'un de nos modérateurs</p>" +
        "</div>"
      );
      setTimeout(function(){document.location.href="/"}, 5000)
    } else{
      errorPopup(obj.error);
    }
  }, { "message": message, "name": name});
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
