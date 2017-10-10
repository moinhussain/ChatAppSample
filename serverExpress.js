var http = require('http');
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var urlencodeParser = bodyParser.urlencoded({extended:false});
app.use(urlencodeParser);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ChatDB');
var ChatRoom     = require('./app/models/chatroom');

/**
 * Initiate a conversation by creating room
 */
app.post('/initiateChatRoom',function(req, res){
    var senderId = req.body.senderId;
    var recieverId = req.body.recieverId;
    
    var roomId = "Room_"+senderId+"_"+recieverId;
    
    ChatRoom.findOne({ roomId: roomId}, function (err, doc){
        if (err){
           res.send(err);
         }
      if(!doc){
        var chatRoom = new ChatRoom({ roomId: roomId, messages:[]});
        chatRoom.save(function (err) {
          if (err) return handleError(err);
          // saved!
          $responseObj = {"status":201,"message":"Room created successfuly",data:{"roomId":roomId}};
          res.json(JSON.stringify($responseObj));
        })  
      }
});
    
    
 })
/**
 * Save the messages in given chat room.
 */
app.post('/saveMessage',function(req,res){
        ChatRoom.findOne({ roomId: req.body.roomId}, function (err, chatRoom){
        
                if (err){
                 res.send(err);
                }		
                var message = { userId:req.body.senderId, messageId:  mongoose.Types.ObjectId(), message: req.body.message };
                chatRoom.messages.push(message);
                chatRoom.save(function(err) {
                        if (err){
                            res.send(err);

                        }else{
                         $responseObj = {"status":201,"message":"message saved successfulyy"};
                         res.json(JSON.stringify($responseObj));

                        }
       
	          });

   });  
 });    


/**
 * Update a message for a given roomId and messageId
 */
app.put('/editMessage/:roomId/:messageId/',function(req,res){
               
    var roomId   = req.params.roomId;
    var messageId = req.params.messageId;
    var newMessage = req.body.message;
    ChatRoom.findOneAndUpdate({ "roomId": roomId, "messages.messageId": messageId },
    { 
        "$set": {
            "messages.$": newMessage
        }
    },
    function(err,chat) {
     if (err){
       res.send(err);
     }else{
          $responseObj = {"status":204,"message":"Updated successfully"};
          res.send($responseObj);  
     }
    }
);
    
})

/**
 * Return all the messages in a room
 */
app.get('/getMessages/:roomId',function(req,res){
    
      var messages = [];  
      var roomId = req.params.roomId;
      ChatRoom.findOne({ roomId: roomId}, function (err, chatRoom){
		if (err){
                             res.send(err);
                        }
               messages = chatRoom.messages;
               $responseObj = {"status":200,"data":messages};
               res.send($responseObj);
   });
        
});
  

var server = app.listen(8083,function(){
 
});