const { CommandInteraction } = require('discord.js')

module.exports = {
    name: 'interactionCreate',

    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName)

            if (!command) {
                interaction.reply({ content: "устаревшая команда" })
            }

            command.execute(interaction, client)
        } else {
            return;
        }
    },
}