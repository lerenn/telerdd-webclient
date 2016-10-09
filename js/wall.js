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
  var self = this;
  this.api.request("GET", "/messages/"+id, function(msg){
    var html = "";
    var textClass = "col-md-10 col-sm-9 col-xs-12";
    if (msg.img == "true") {
      textClass = "col-md-5 col-sm-5 col-xs-12";
      html += "<div class=\"message-img col-md-5 col-sm-4 col-xs-12\">Loading...</div>";
      self.displayImage(msg.id);
    }
    html += "<div class=\"message-text "+textClass+"\"><div>"+replaceSpecialChars(msg.text)+"</div></div>";
    html += "<div class=\"message-infos col-md-2 col-sm-3 col-xs-12\">";
    html += "<span class=\"message-author\">par <b>"+msg.name+"</b></span><br/>";
    html += "<span class=\"message-time\">à "+msg.time.substr(12,9)+"</span>";
    $("#message-"+id).empty().append(html);

    // === ADAPT TEXT SIZE
    // Get original size
    var fontSize = parseInt($("#message-"+id+" .message-text div").css('font-size'));
    // Adapt size until its too big
    while( ($("#message-"+id+" .message-text div").width() < $("#message-"+id+" .message-text").width() && fontSize < 30)
            || fontSize < 17) {
        fontSize += 1;
        $("#message-"+id+" .message-text div").css('font-size', fontSize + "px" );
    }
    // Readapt under the "too big size"
    $("#message-"+id+" .message-text div").css('font-size', (fontSize - 1) + "px" );
    // === END ADAPT
  });
};

Wall.prototype.displayImage = function(msg_id){
  var self = this;
  this.api.request("GET", "/messages/"+msg_id+"/image", function(msg){
    $("#message-"+msg_id+" .message-img").empty().append("<img src=\""+msg.img+"\" />");
  });
}

Wall.prototype.updateStatus = function(){
  var d = new Date();
  $("#update-bar .time").empty().append(
    d.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
  );
};
