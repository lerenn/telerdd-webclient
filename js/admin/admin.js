// Variables
var g_checkNewMessagesIntervale = null;
var g_actual_view = "dashboard";

function changeView(view){
  deactivate(g_actual_view);
  $("#admin-menu").children().hide();
  $("#"+view+"-view").show();
  activate(view);
}

function activate(view){
  if(view == "moderation"){
    loadMessages();
    g_checkNewMessagesIntervale = setInterval(checkNewMessages, 1000);
    g_actual_view = "moderation";
  }
}

function deactivate(view){
  if(view == "moderation"){
    g_pending_messages_lastid = 0;
    g_pending_messages_firstid = -1;
    $("#pending-messages").empty();
    clearInterval(g_checkNewMessagesIntervale);
  }
}
