const express = require('express');
const bodyParser = require('body-parser');
const {Client, GatewayIntentBits, Partials, Collection} = require('discord.js')
const Playtime = require('./Models/playtimeSchema')
const config = require('./config.json')

const { Guilds, GuildMembers, GuildMessages, MessageContent} = GatewayIntentBits
const { User, Message, GuildMember, ThreadMember} = Partials

const { loadEvents } = require('./Handlers/eventHandler')
const { loadCommands } = require('./Handlers/commandHandler');

const client = new Client({
  fetchAllMembers: true,
  intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
  Partials: [User, Message, GuildMember, ThreadMember]
})
client.commands = new Collection()
client.login(config.token).then(() => {
  loadEvents(client)
  loadCommands(client)
})

//[---------------------------------------EXPRESS---------------------------------------]
const app = express();

app.use(bodyParser.json());

app.post('/api/playtime', async (req, res) => {
    const { playerId, playerName, playtime, servernumb } = req.body;
    if (!playerId || !playerName || !playtime) {
        return res.status(400).send('Missing required fields');
    }

    try {
        Playtime.findOne({playerId: playerId, servernumb: servernumb})
          .then((docs) => {
            if(docs == null) {
              const newPlaytime = new Playtime({ playerId, playerName, playtime, servernumb });
              newPlaytime.save();
            }
            else {
              let i = parseFloat(`${docs.playtime}`.replace(",", "."))
              docs.playerName = playerName
              docs.playtime = playtime + i
              docs.save()
            }
          })
          .catch((err) => {
            console.log(err)
          })
        res.status(200).send('Playtime data saved');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving playtime data');
    }
});
app.get("/", async (req, res) => {
  res.send('hello world')
})

app.listen(config.port, config.host, () => {
    console.log(`Server running at http://${config.host}:${config.port}`);
});