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
                .setAuthor({ name: 'There was an error while trying to execute this command.', iconURL: interaction.client.config.assets.avatar })
                .setDescription(`\`\`\`- ${error.message}\`\`\``)
                .setFooter({ text: 'Please contact aiden if you see this error message.' });

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};
