const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ChannelType } = require('discord.js')
const Playtime = require('../../Models/playtimeSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clearbd")
        .setDMPermission(false)
        .setDescription("Полностью чистит Базу Данных")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ,
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0xff0000)
            .setTitle(`База данных очищена`)
            .setTimestamp()
        try {
            Playtime.deleteMany({})
            await interaction.reply({ embeds: [embed], ephemeral: true })
        } catch (err) {
            console.log(err)
            await interaction.reply({ content: "У вас нет прав или другая ошибка, смотри консоль", ephemeral: true })
        }
    }
}