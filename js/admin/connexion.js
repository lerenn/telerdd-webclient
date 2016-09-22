var g_username = null;
var g_token = null;

function connect(){
  g_username = $("#username").val();
  password = $("#password").val();
  accountType = $("#accountType").val();

  // Hash password
  password = md5(password);

  apiRequest("/account/connect", function(obj){
    successPopup("Connection successful");

    // Get token
    g_token = obj.token;

    // Delete connection interface
    $("#connexion").fadeOut(1000);
    setTimeout(function(){ $("#connexion").remove(); }, 1000);

    // Display first screen
    changeView('moderation');
  }, { "username": g_username, "password": password, "type": parseInt(accountType)});
  waitPopup();
}

$('#connexion input').keydown(function(e) {
    if (e.keyCode == 13) {
      connect();
    }
});
