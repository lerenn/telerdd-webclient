// Create Main App
var TeleRDD = TeleRDD || {};

// Get Config
TeleRDD.config = Config();

// Set request
TeleRDD.api = {
  request: function(type, url, callback, args){
    var apiURL = TeleRDD.config.apiURL;
    $.ajax({
      url: apiURL+url,
      type: type,
      data: args,
    }).done(function(obj) {
      if(typeof obj.error !== 'undefined'){
        errorPopup(obj.error+" (URL: "+url+")");
      } else {
        callback(obj);
      }
    }).fail(function() {
      errorPopup("Can't reach API");
    });
  },
}

// Set messages
TeleRDD.messages = {
  firstId: 0,
  lastId: 0,
  ids: [],
  init: function(){
    TeleRDD.messages.update();
    setInterval(TeleRDD.messages.update, 5000);
    setInterval(TeleRDD.messages.check, 30000);
  },
  update: function(){
    alert("update");
    // TODO
    TeleRDD.messages.updateStatus();
  },
  check: function(){
    alert("check");
    // TODO
  },
  more: function(){
    alert("more");
    // TODO
  },
  send: function(){
    message = $("#message").val();
    name = $("#name").val();
    apiRequest("POST", "/messages", function(obj){
      if (obj.response == "OK"){
        messageSent();
      } else{
        errorPopup(obj.error);
      }
    }, { "message": message, "name": name});
  },
  updateStatus: function(){
    var d = new Date();
    $("#update-status span").empty().append(
      d.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
    );
  }
}
