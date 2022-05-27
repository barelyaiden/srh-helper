const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('usage')
        .setDescription('Check to see how to use a certain command.')
        .addStringOption(option => 
            option.setName('command')
                .setDescription('The command you want to learn how to use.')
                .addChoices(
                    { name: 'Delete', value: 'deleteUsageGif' },
                    { name: 'Rips', value: 'ripsUsageGif' },
                    { name: 'Share', value: 'shareUsageGif' }
                )
                .setRequired(true)),
    async execute(interaction) {
        const command = interaction.options.getString('command');
        return await interaction.reply({ files: [interaction.client.config.usageGifs[command]] });
    },
};
