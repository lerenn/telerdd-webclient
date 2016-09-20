// Variables
var g_messages_lastid = -1;
var g_messages_oldestid = 10000000;

// Functions
function checkNewMessages(){
    apiRequest("/api/messages/next", function(obj){
    if (typeof obj.messages !== 'undefined'){
      displayMessages_callback(obj.messages, "top");
    }
  }, { "id": g_messages_lastid, "offset": 100, "status": "all"});
}

// Functions
function loadMessages(){
    apiRequest("/api/messages/previous", function(obj){
    if (typeof obj.messages !== 'undefined'){
      displayMessages_callback(obj.messages, "bottom");
    }
  }, { "id": g_messages_oldestid, "offset": 5, "status": "all"});
}

displayMessages_callback = function(messages, place){
  var messagesNbr = messages.length;
  for (var i = 0; i < messagesNbr; i++) {
      var message = messages[i];

      // Check name
      var name = messages[i].name;
      if (name == "") {
        name = "Anonymous";
      }

      var html = "<tr id=\"message-"+message.id+"\">";
      html += "<td>"+message.id+"</td>";
      html += "<td>"+replaceSpecialChars(message.text)+"</td>"
      html += "<td>"+message.name+"</td>";
      html += "<td class=\"message-status\"></td>"
      html += '<td>';
      html += '<a onclick="accept('+message.id+')"><button type="button" class="btn btn-sm btn-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></button></a> ';
      html += '<a onclick="refuse('+message.id+')"><button type="button" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></a>';
      html += '</td>';
      html += "</tr>";

      // Place message
      if (place == "bottom"){
        $("#messages").append(html);
      } else if (place == "top"){
        $("#messages").prepend(html);
      }

      // Change message status
      changeStatus(message.id, message.status);

      id = parseInt(message.id);
      // Set g_messages_lastid
      if (g_messages_lastid < id){
        g_messages_lastid = id;
      }
      // Set g_messages_oldestid
      if (g_messages_oldestid > id){
        g_messages_oldestid = id;
      }
  }
};

function changeStatus(id, status){
  html = "<span class=\"label label-default\">Inconnu</span>"
  if (status == "accepted"){
    html = "<span class=\"label label-success\">Accepté</span>"
  } else if (status == "pending"){
    html = "<span class=\"label label-warning\">En attente</span>"
  } else if (status == "refused"){
    html = "<span class=\"label label-danger\">Refusé</span>"
  }
  $("#message-"+id+" .message-status").empty().append("."+html); // Add point for alignment
}

function accept(id){
  apiRequest("/api/messages/status", function(obj){
    if (obj.response == "OK"){
      successPopup("Message "+id+" accepted");
      changeStatus(id, "accepted");
    } else{
      errorPopup(obj.error);
    }
  },{"id": id, "status": "accepted", "username": g_username, "token": g_token});
}

function refuse(id){
  apiRequest("/api/messages/status", function(obj){
    if (obj.response == "OK"){
      successPopup("Message "+id+" refused");
      changeStatus(id, "refused");
    } else{
      errorPopup(obj.error);
    }
  },{"id": id, "status": "refused", "username": g_username, "token": g_token});
}
