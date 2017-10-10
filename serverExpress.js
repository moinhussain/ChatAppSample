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
    var recieverId = req.body.reciverId;
    
    var roomId = "Room_"+senderId+"_"+recieverId
     ChatRoom.findById(roomId, function(err, chatRoom) {

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

      })
 })
/**
 * Save the messages in given room.
 */
app.post('/saveMessage',function(req,res){
    
    
 

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
    


/**
 * Update a message for a given room and message
 */
app.put('/editMessage/:roomId/:messageId/',function(req,res){
    
    	ChatRoom.findById(req.params.messageId, function(err, chatRoom) {

			if (err){
                             res.send(err);
                        }


			chatRoom.name = req.params.roomId;
			chatRoom.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Bear updated!' });
			});

		});
    
})

/**
 * Return all the messages in a room
 */
app.get('/getMessages/:roomId',function(req,res){
    
        var messages = [];
       	ChatRoom.findById(req.params.roomId, function(err, chatRoom) {

			if (err){
                             res.send(err);
                        }
               messages = chatRoom.messages;
               $responseObj = {"status":200,"data":messages};
               res.send(JSON.stringify($responseObj));
			});

});
  

var server = app.listen(8083,function(){
 
});