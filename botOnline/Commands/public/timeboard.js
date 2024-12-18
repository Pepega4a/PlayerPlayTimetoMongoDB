const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ChannelType } = require('discord.js')
const Playtime = require('../../Models/playtimeSchema')
const Message = require('../../Models/messageSchema')
const { startEmbedUpdate } = require('../../Utils/updater')
const serverips = require('../../serverlist.json')

let data = new SlashCommandBuilder()
    .setName("timeboard")
    .setDMPermission(false)
    .setDescription("Выводит таблицу с лидерами по наигранному времени");
data.addStringOption(option => 
    option.setName('server')
        .setDescription("Название сервера")
        .setRequired(true)
);
serverips.servers.forEach(el => {
    data.options[0].addChoices(el)
})
module.exports = {
    data: data,
    async execute(interaction) {
        const { options } = interaction
        const server = options.getString("server")
        console.log(server)
        let servername

        serverips.servers.forEach(el => {
            if(el.value == server) {
                servername = el.name
            }
        })
        const embed = new EmbedBuilder()
            .setColor(0xff0000)
            .setTitle(`Лидеры по наигранному времени на сервере ${servername}🕐`)
            .setTimestamp()
            .setFooter({ text: "Последнее обновление" });
        try {

            let getdocs = await Playtime.find({servernumb: server}).sort({ playtime: -1 }).limit(30)
            let formdocs = []
            let time

            for (let i = 0; i < getdocs.length; i++) {
                let sec = Math.floor(getdocs[i].playtime) - 15;
                time = new Date(sec * 1000).toISOString().substring(11, 19);
                formdocs.push(
                    `${i + 1} - ${String(Math.floor(sec / 3600)).padStart(2, "0")} ч. ${String(Math.floor((sec % 3600) / 60)).padStart(2, "0")} м. ${String((sec % 60)).padStart(2, "0")} с. - [${getdocs[i].playerName}](https://steamcommunity.com/profiles/${getdocs[i].playerId})`
                    //`${i + 1} - ${time.substring(0, 2)} ч. ${time.substring(3, 5)} м. ${time.substring(6)} с. - [${getdocs[i].playerName}](https://steamcommunity.com/profiles/${getdocs[i].playerId})`
                );
            }

            embed.setDescription(formdocs.join('\n'))
            const messagereply = await interaction.reply({ embeds: [embed], ephemeral: false, fetchReply:  true})

            await Message.create({
                channelId: messagereply.channelId,
                messageId: messagereply.id,
                serverId: server
            })

            startEmbedUpdate(messagereply.channelId, messagereply.id, server, servername)
        } catch (err) {
            console.log(err)
            await interaction.reply({ content: "В БД нет игроков или игроков с таким ip сервера не существует", ephemeral: true })
        }
    }
}