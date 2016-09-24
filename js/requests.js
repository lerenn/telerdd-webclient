function apiRequest(type, url, callback, args){
  var apiURL = getConfig().apiURL;

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
}

function replaceSpecialChars(orig){
  return orig.replace(/\n/g, "<br/>");
}
