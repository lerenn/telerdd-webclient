// Variables
var g_messages_lastid = 0;
var g_messages_oldestid = 10000000;
var g_messages_ids = [];

function updateMessages(){
  checkNewMessages();
  setTimeout(checkExistingMessages, 1000);
}

function checkNewMessages(){
    apiRequest("GET", "/messages/next", function(obj){
    if (typeof obj.messages !== 'undefined'){
      var messagesNbr = obj.messages.length;
      for (var i = 0; i < messagesNbr; i++) {
          displayMessage(obj.messages[i], "top");
      }
    }
  }, { "id": g_messages_lastid, "offset": 10});
  updateStatus();
}

function loadMessages(){
    apiRequest("GET", "/messages/previous", function(obj){
    if (typeof obj.messages !== 'undefined'){
      var messagesNbr = obj.messages.length;
      for (var i = 0; i < messagesNbr; i++) {
          displayMessage(obj.messages[i], "bottom");
      }
    }
  }, { "id": g_messages_oldestid, "offset": 10});
  updateStatus();
}

function checkExistingMessages(){
  apiRequest("GET", "/messages", function(obj){
    // Check if everyone of them is displayed
    for (var i = 0; obj.list[i] < g_messages_lastid; i++){
      if(g_messages_ids.indexOf(obj.list[i])==-1){
        // If not, display him just before it predecessor
        previousID = obj.list[i-1];
        apiRequest("GET", "/messages/message", function(obj){
          displayMessage(obj, previousID);
        }, { "id": obj.list[i]});
      }
    }
    // Check if one has been refused
    for (var i = 0; i < g_messages_ids.length; i++){
      if(obj.list.indexOf(g_messages_ids[i])==-1){
        id = g_messages_ids[i];
        $("#message-"+id).remove();
        g_messages_ids.splice(i, 1);

        // Check if it's the last
        if (id==g_messages_lastid){
          max = Math.max.apply( Math, g_messages_ids );
          if (isFinite(max)==false){
            g_messages_lastid = 0;
          } else {
            g_messages_lastid = max;
          }
        }

        // Check if it's the first
        if (id==g_messages_oldestid){
          min = Math.min.apply( Math, g_messages_ids );
          if (isFinite(min)==false){
            g_messages_oldestid = 10000000;
          } else {
            g_messages_oldestid = min;
          }
        }
      }
    }
  }, { "start": g_messages_oldestid, g_messages_lastid: 10});
}

function displayMessage(message, place){
  // Check name
  var name = message.name;
  if (name == "") {
    name = "Anonymous";
  }

  var html = "<div id=\"message-"+message.id+"\" class=\"message panel panel-body\">";
  html += "<div class=\"message-text col-md-10 col-sm-9 col-xs-12\">"+replaceSpecialChars(message.text)+"</div>";
  html += "<div class=\"message-infos col-md-2 col-sm-3 col-xs-12\">par "+message.name+"<br/>"+message.time+"</div>";
  html+= "</div>";

  // Place message
  if (place == "bottom"){
    $("#messages").append(html);
  } else if (place == "top"){
    $("#messages").prepend(html);
  } else {
    $("#message-"+place).before(html);
  }

  id = parseInt(message.id);
  // Set g_messages_lastid
  if (g_messages_lastid < id){
    g_messages_lastid = id;
  }
  // Set g_messages_oldestid
  if (g_messages_oldestid > id){
    g_messages_oldestid = id;
  }

  // Add to array of ids
  g_messages_ids.push(id);
}

function sendMessage(){
  message = $("#message").val();
  name = $("#name").val();
  apiRequest("POST", "/messages", function(obj){
    if (obj.response == "OK"){
      messageSent();
    } else{
      errorPopup(obj.error);
    }
  }, { "message": message, "name": name});
}

function messageSent(){
  $("#messages-form").empty().append(
    "<div class=\"successful-message\">" +
    "<h3>Votre message a été envoyé avec succès</h3>" +
    "<p>Celui-ci sera affiché après validation d'un de nos modérateurs</p>" +
    "</div>"
  );
  setTimeout(function(){document.location.href="/"}, 5000)
}

function updateStatus(){
  var d = new Date();
  $("#update-status span").empty().append(
    d.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
  );
}
