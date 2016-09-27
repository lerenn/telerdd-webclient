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
  content: [],
  init: function(){
    // Init IDs
    TeleRDD.api.request("GET", "/messages", function(obj){
        TeleRDD.messages.ids = obj.messages;
        TeleRDD.messages.lastId = obj.messages[obj.messages.length-1];
    });
    // TODO
    // Display messages
    TeleRDD.messages.updateStatus();
    setInterval(TeleRDD.messages.checkNewMessages, 5000);
    setInterval(TeleRDD.messages.check, 30000);
  },
  checkNewMessages: function(){ // checkNewMessages
    TeleRDD.api.request("GET", "/messages", function(obj){
      for(var i = 0; i < obj.messages.length; i++){ // For each ids in response
        for(var j = 0; j < TeleRDD.messages.ids; j++){ // For each message already present
          if (TeleRDD.messages.ids[j] == obj.messages[i]){ // If already present
            break;
          } else if (TeleRDD.messages.ids[j] > obj.messages[i]){ // If not present
            TeleRDD.messages.ids.insert(j, obj.messages[i]);
            break;
          }
        }
      }
    }, { "start": TeleRDD.messages.lastId});
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
