function apiRequest(url, callback, args){
  var apiURL = getConfig().apiURL;

  var posting = $.post(apiURL+url, args);

  posting.done(function(data) {
    var obj = jQuery.parseJSON(data);
    if(typeof obj.error !== 'undefined'){
      errorPopup(obj.error);
    } else {
      callback(obj);
    }
  });
}

function replaceSpecialChars(orig){
  return orig.replace(/\n/g, "<br/>");
}
