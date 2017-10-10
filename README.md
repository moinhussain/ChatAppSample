# ChatAppSample
Sample Chat Application

Mongo Database name: ChatDB <br/>
Collection: ChatRoom <br/>

{ <br/>
"_id":MongoId, <br/>
"roomId:'Room_1_100', <br/>
"messages":[ <br/>
{ <br/>
"messageId": <ObjectId>, <br/>
"senderId" : 1, <br/>
"recieverId":100,<br/>
"message":"Hi how are you",<br/>
"date":"2017-09-10 13:45:00"<br/>
},<br/>
{<br/>
"messageId": <ObjectId>,<br/>
"senderId" : 100,<br/>
"recieverId":1,<br/>
"message":"I am fine",<br/>
"date":"2017-09-10 13:47:00"<br/>
}<br/>
]<br/>

}
