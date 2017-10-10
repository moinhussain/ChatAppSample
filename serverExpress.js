var http = require('http');
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var urlencodeParser = bodyParser.urlencoded({extended:false});

app.use(urlencodeParser);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ChatDB');


var ChatRoom     = require('./app/models/chatroom');
 
app.post('/saveMessage',function(req,res){
    
    
    ChatRoom.findById(req.body.roomId, function(err, chatRoom) {

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

    
})

app.put('/editMessage/:messageId',function(req,res){
    
    	ChatRoom.findById(req.params.messageId, function(err, chatRoom) {

			if (err){
                             res.send(err);
                        }


			chatRoom.name = req.body.name;
			chatRoom.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Bear updated!' });
			});

		});
    
    
    
     var result = false;
    var messageId = req.params.messageId;
    var senderId = req.body.senderId;
    var recieverId = req.body.recieverId;
    
    /*connect db and save the data*/
   
    if(result){
 $responseObj = {"status":201,"message":"message updated successfulyy"};
 res.send(JSON.stringify($responseObj));  
   } res.send(JSON.stringify(books));
    
})

app.post('/getMessages',function(req,res){
    var messages = [];
    var result = false;
    var senderId = req.body.senderId;
    var recieverId = req.body.recieverId;
    
    /*connect db and save the data*/
   
    if(result){
     $responseObj = {"status":200,"data":messages};
     res.send(JSON.stringify($responseObj));  
   } 
    
})




var server = app.listen(8083,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log(host+"-----"+port);
});