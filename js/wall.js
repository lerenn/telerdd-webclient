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
      // If there is a message
      var text = "";
      if(msg.text != ""){
        text += "<div class=\"message-img-txt\" style=\"display: none;\">"+msg.text+"</div>";
      }

      // Load image
      html += "<div class=\"message-img\"><span>Loading image...</span>"+text+"</div>";
      self.displayImage(msg.id);
    } else {
      html += "<div class=\"message-text\">"+replaceSpecialChars(msg.text)+"</div>";
    }
    html += "<div class=\"message-infos\">";
    html += "<span class=\"message-author\">par <b>"+msg.name+"</b></span>";
    html += " <span class=\"message-time\">à "+msg.time.substr(12,9)+"</span>";
    $("#message-"+id).empty().append(html);
  });
};

Wall.prototype.displayImage = function(msg_id){
  var self = this;
  this.api.request("GET", "/messages/"+msg_id+"/image", function(msg){
    $("#message-"+msg_id+" .message-img span").remove();
    $("#message-"+msg_id+" .message-img").append("<img src=\""+msg.img+"\" />");
    $("#message-"+msg_id+" .message-img-txt").show();
  });
}

Wall.prototype.updateStatus = function(){
  var d = new Date();
  $("#update-bar .time").empty().append(
    d.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
  );
};
