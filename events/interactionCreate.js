const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isCommand()) return;
        
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);

            const errorEmbed = new MessageEmbed()
                .setColor(interaction.client.config.colors.redColor)
                .setAuthor('There was an error while executing this command.', interaction.client.config.assets.avatar)
                .setDescription(`\`\`\`- ${error.message}\`\`\``);

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};
