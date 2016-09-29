function API(url){
  this.url = url;
  this.username = "";
  this.token = "";
}

API.prototype.request = function(type, url, callback, args){
  var apiURL = this.url;
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
};

API.prototype.connect = function(){
  this.username = $("#username").val();
  password = $("#password").val();
  accountType = $("#accountType").val();

  // Hash password
  password = md5(password);

  var api = this;
  this.request("GET", "/account/token", function(obj){
    successPopup("Connection successful");

    // Get token
    api.token = obj.token;

    // Delete connection interface
    $("#connexion").trigger('remove').fadeOut(1000);
    setTimeout(function(){ $("#connexion").remove(); }, 1000);
  }, { "username": this.username, "password": password, "type": parseInt(accountType)});
  waitPopup();
}
