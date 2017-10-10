var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ChatRoomSchema   = new Schema({
	roomId: String,
        messages:[],
});

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);