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
    if (msg.img == "true") {
      html += "<div class=\"message-img\">Loading...</div>";
      self.displayImage(msg.id);
    } else {
      html += "<div class=\"message-text\">"+replaceSpecialChars(msg.text)+"</div>";
    }
    html += "<div class=\"message-infos\">";
    html += "<span class=\"message-author\">par <b>"+msg.name+"</b></span>";
    html += " <span class=\"message-time\">à "+msg.time.substr(12,9)+"</span>";
    $("#message-"+id).empty().append(html);

    // === ADAPT TEXT SIZE
    // Get original size
    var fontSize = parseInt($("#message-"+id+" .message-text").css('font-size'));
    // Adapt size until its too big
    while(($("#message-"+id+" .message-text").width()+32 < $("#messages").width() && fontSize < 40) || fontSize < 20) {
        fontSize += 5;
        $("#message-"+id+" .message-text").css('font-size', fontSize + "px" );
    }
    // Readapt under the "too big size"
    $("#message-"+id+" .message-text").css('font-size', (fontSize - 5) + "px" );

    // Adapt text
    $("#message-"+id+" .message-text").css('display', 'block').css('word-break', 'break-all');
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
