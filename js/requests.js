function apiRequest(url, callback, args){
  var posting = $.post(url, args);

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
