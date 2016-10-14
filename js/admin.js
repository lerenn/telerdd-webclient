function Admin(api){
  this.api = api;
};

Admin.prototype.changeView = function(view){
  $("#admin-menu").children().hide();
  $("#"+view+"-view").show();
}

Admin.prototype.displayMessage = function(id, previous, firstId){
  var html = "<div id=\"message-"+id+"\" class=\"row\">Loading message...</div><hr/>";
  if (id > firstId){
    $("#message-"+previous).before(html);
  } else {
    $("#messages").append(html);
  }

  //Download message
  var self = this;
  this.api.request("GET", "/messages/"+id, function(msg){
    var text = replaceSpecialChars(msg.text);
    if (text.length == 0) {
      text = "[No text given]";
    }

    // Display message content
    html = "<div class=\"col-md-1 message-id\"><b>"+msg.id+"</b></div>";
    html += "<div class=\"col-md-6 message-text\">"+text+"</div>"
    if(msg.img == "true"){
      html += "<div class='img-link col-md-1 message-img'><button type='button' class='btn btn-xs btn-default'>Loading...</button></div>";
      self.displayImage(msg.id);
    } else {
      html += "<div class=\"col-md-1 message-img\"><button disabled='disabled' type='button' class='btn btn-xs btn-default'>No image</button></div>";
    }
    html += "<div class=\"col-md-1 message-author\">"+msg.name+"</div>";
    html += "<div class=\"col-md-1 message-status\"></div>"
    html += '<div class=\"col-md-2 message-actions\">';
    html += '<a onclick="admin.accept('+msg.id+')"><button type="button" class="btn btn-sm btn-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></button></a> ';
    html += '<a onclick="admin.refuse('+msg.id+')"><button type="button" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></a>';
    html += '</div>';
    $("#message-"+msg.id).empty().append(html);

    // Change message status
    self.changeStatus(msg.id, msg.status);
  });
}

Admin.prototype.displayImage = function(msg_id){
  var self = this;
  this.api.request("GET", "/messages/"+msg_id+"/image", function(msg){
    $("#message-"+msg_id+" .img-link").empty().append("<a href=\""+msg.img+"\" data-lightbox=\"lightbox\">"
      + "<button type='button' class='btn btn-xs btn-success'>Image</button>"
      + "</a>");
  });
}

Admin.prototype.changeStatus = function(id, status){
  html = "<span class=\"label label-default\">Inconnu</span>"
  if (status == "accepted"){
    html = "<span class=\"label label-success\">Accepté</span>"
  } else if (status == "pending"){
    html = "<span class=\"label label-warning\">En attente</span>"
  } else if (status == "refused"){
    html = "<span class=\"label label-danger\">Refusé</span>"
  }
  $("#message-"+id+" .message-status").empty().append("."+html); // Add point for alignment
};

Admin.prototype.accept = function(id){
  var self = this;
  this.api.request("PUT", "/messages/"+id, function(obj){
    if (obj.response == "OK"){
      successPopup("Message "+id+" accepted");
      self.changeStatus(id, "accepted");
    } else{
      errorPopup(obj.error);
    }
  },{"status": "accepted", "username": this.api.username, "token": this.api.token});
}

Admin.prototype.refuse = function(id){
  var self = this;
  this.api.request("PUT", "/messages/"+id, function(obj){
    if (obj.response == "OK"){
      successPopup("Message "+id+" refused");
      self.changeStatus(id, "refused");
    } else{
      errorPopup(obj.error);
    }
  },{"status": "refused", "username": this.api.username, "token": this.api.token});
}

Admin.prototype.updateStatus = function(){
  // TODO
}
