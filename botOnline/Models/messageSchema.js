const {model, Schema} = require('mongoose')
const messageSchema = new Schema({
    channelId: String,
    messageId: String,
    serverId: String
});
module.exports = model("Messages", messageSchema)