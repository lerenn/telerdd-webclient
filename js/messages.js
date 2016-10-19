function Messages(api, view, lotSize, msgStatus){
  // Properties
  this.firstId = 0;
  this.lastId = 0;
  this.list = [];
  this.api = api;
  this.lotSize = lotSize;
  this.view = view;
  this.msgStatus = msgStatus;

  // Init object
  var self = this;
  api.request("GET", "/messages", function(obj){
      self.list = obj.messages;

      if (obj.messages.length > 0){
        // Set last message
        self.lastId = obj.messages[obj.messages.length-1];
        // Set the first message
        var lotSize = self.lotSize;
        if (obj.messages.length > lotSize){
          self.firstId = obj.messages[obj.messages.length-lotSize];
        } else {
          self.firstId = obj.messages[0];
        }
      }

      // Display messages
      self.updateDisplay();

      // Update Status
      self.view.updateStatus();
  }, {"status": self.msgStatus});
  setInterval(function(){self.checkNewMsg();}, 5000);
  setInterval(function(){self.updateList();}, 30000);
};

Messages.prototype.updateDisplay = function(){
  c = this.list.indexOf(this.firstId);
  for(i = this.firstId; i <= this.lastId; i++){
    var obj = $("#message-" + i);

    if(this.list.indexOf(i) != -1){ // Check if its in the array
      if(obj.length == 0){ // If it doesn't exist, create it
        if(i > this.firstId){
          this.view.displayMessage(i, this.list[c-1], this.firstId);
        } else{
          this.view.displayMessage(i, 0, this.firstId);
        }
      }
      c++;
    } else if(obj.length != 0 && this.list.indexOf(i) == -1){ // If its not present in array, erase it if it exist on page
      total = this.list.length;
      // If its the first id
      if(i == this.lastId){
        if(total > 1){
          this.lastId = this.list[total-2];
        } else {
          this.lastId = 0;
        }
      }
      // If its the last id
      if(i == this.firstId){
        if(total > 1){
          this.firstId = this.list[1];
        } else {
          this.firstId = 0;
        }
      }
      obj.remove();
    }
  }
};


Messages.prototype.checkNewMsg = function(){ // checkNewMessages
  var self = this;
  this.api.request("GET", "/messages", function(obj){
    // Add new messages
    if(obj.messages != ""){
      for(i = 0; i < obj.messages.length; i++){
        self.list.push(obj.messages[i]);
      }

      // Update last id
      len = self.list.length;
      if(len > 0){
        self.lastId = self.list[len-1];
      }

      // Display messages
      self.updateDisplay();
    }
    self.view.updateStatus();
  }, { "start": self.lastId+1, "status": self.msgStatus});
};

Messages.prototype.updateList = function(){
  var self = this;
  this.api.request("GET", "/messages", function(obj){
      self.list = obj.messages;
      self.updateDisplay();
  }, {"status": self.msgStatus});
};

Messages.prototype.displayMore = function(){
  // Get the message id at one lot before the actual first
  first = this.list.indexOf(this.firstId) - this.lotSize;
  if(first < 0){
    first = 0;
  }

  // Check if button is still needed
  if (first == 0){
    $("#more-message-button").hide();
  }

  // Update first
  this.firstId = this.list[first];

  // Display them
  this.updateDisplay();
};

// Functions
function replaceSpecialChars(orig){
  return orig.replace(/\n/g, "<br/>");
}
