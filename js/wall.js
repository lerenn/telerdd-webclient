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
    var html = "<div class=\"message-text col-md-10 col-sm-9 col-xs-12\"><div>"+replaceSpecialChars(msg.text)+"</div></div>";
    html += "<div class=\"message-infos col-md-2 col-sm-3 col-xs-12\">";
    html += "<span class=\"message-author\">par <b>"+msg.name+"</b></span><br/>";
    html += "<span class=\"message-time\">à "+msg.time.substr(12,9)+"</span>";
    html += "</div>";
    $("#message-"+id).empty().append(html);

    // === ADAPT TEXT SIZE
    // Get original size
    var fontSize = parseInt($("#message-"+id+" .message-text div").css('font-size'));
    // Adapt size until its too big
    while( ($("#message-"+id+" .message-text div").width() < $("#message-"+id+" .message-text").width()
            && $("#message-"+id+" .message-text div").height() < $("#message-"+id+" .message-text").height())
            || fontSize < 17) {
        fontSize += 1;
        $("#message-"+id+" .message-text div").css('font-size', fontSize + "px" );
    }
    // Readapt under the "too big size"
    $("#message-"+id+" .message-text div").css('font-size', (fontSize - 1) + "px" );
    // === END ADAPT
  });
};

Wall.prototype.updateStatus = function(){
  var d = new Date();
  $("#update-bar .time").empty().append(
    d.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
  );
};
