const { Client } = require('discord.js')
const mongoose = require('mongoose')
const config = require('../../config.json')
const Message = require('../../Models/messageSchema');
const { startEmbedUpdate } = require('../../Utils/updater');
const serverips = require('../../serverlist.json');



module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        await mongoose.connect(config.mongodb)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log('MongoDB connection error:', err));
        const messages = await Message.find();
        for (const msg of messages) {
            const servername = serverips.servers.find(el => el.value === msg.serverId)?.name || 'Неизвестный сервер';
            startEmbedUpdate(msg.channelId, msg.messageId, msg.serverId, servername, client);
        }
    }
}