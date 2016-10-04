function Wall(api){
  this.api = api;
}

Wall.prototype.displayMessage = function(id, previous, firstId){
  var html = "<div id=\"message-"+id+"\" class=\"message panel panel-body\">";
  html += 'Loading message...';
  html += '</div>';
  if (id > firstId){
    $("#message-"+previous).before(html);
  } else {
    $("#messages").append(html);
  }
  // Download message
  this.api.request("GET", "/messages/"+id, function(msg){
    var html = "<div class=\"message-text col-md-10 col-sm-9 col-xs-12\">"+replaceSpecialChars(msg.text)+"</div>";
    html += "<div class=\"message-infos col-md-2 col-sm-3 col-xs-12\">par "+msg.name+"<br/>"+msg.time+"</div>";
    $("#message-"+id).empty().append(html);
  });
};

Wall.prototype.updateStatus = function(){
  var d = new Date();
  $("#update-status span").empty().append(
    d.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
  );
};
