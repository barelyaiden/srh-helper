const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('usage')
        .setDescription('Check to see how to use a certain command.')
        .addStringOption(option => 
            option.setName('command')
                .setDescription('The command you want to learn how to use.')
                .setRequired(true)
                .addChoices(
                    { name: 'Delete', value: 'deleteUsageGif' },
                    { name: 'Rips', value: 'ripsUsageGif' },
                    { name: 'Share', value: 'shareUsageGif' }
                )),
    async execute(interaction) {
        const command = await interaction.options.getString('command');
        const file = new AttachmentBuilder(interaction.client.config.usageGifs[command]);
        return await interaction.reply({ files: [file] });
    },
};
