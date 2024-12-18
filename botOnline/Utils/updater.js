const { EmbedBuilder } = require('discord.js');
const Playtime = require('../Models/playtimeSchema');

async function startEmbedUpdate(channelId, messageId, server, servername, client) {
    const interval = 60 * 1000; // Интервал обновления (60 секунд)

    setInterval(async () => {
        try {
            const channel = await client.channels.fetch(channelId);
            if (!channel) return;

            const message = await channel.messages.fetch(messageId);
            if (!message) return;

            const embed = new EmbedBuilder()
                .setColor(0xff0000)
                .setTitle(`Лидеры по наигранному времени на сервере ${servername} 🕐`)
                .setTimestamp()
                .setFooter({ text: 'Последнее обновление' });

            let getdocs = await Playtime.find({ servernumb: server }).sort({ playtime: -1 }).limit(30);
            let formdocs = [];
            let time;

            for (let i = 0; i < getdocs.length; i++) {
                let sec = Math.floor(getdocs[i].playtime) - 15;
                time = new Date(sec * 1000).toISOString().substring(11, 19);
                formdocs.push(
                    `${i + 1} - ${time.substring(0, 2)} ч. ${time.substring(3, 5)} м. ${time.substring(6)} с. - [${getdocs[i].playerName}](https://steamcommunity.com/profiles/${getdocs[i].playerId})`
                );
            }

            embed.setDescription(formdocs.join('\n'));
            await message.edit({ embeds: [embed] });
        } catch (err) {
            //тут не критическая ошибка, на которую можно забить болт. Но если интересно console.log(err) и console.error(err.message)
        }
    }, interval);
}

module.exports = { startEmbedUpdate };