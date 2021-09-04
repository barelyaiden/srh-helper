const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('usage')
        .setDescription('Get GIFs that show you how to use a certain command.')
        .addStringOption(option => 
            option.setName('command')
                .setDescription('The command you want to learn how to use.')
                .addChoice('Delete', 'deleteUsageGif')
                .addChoice('Rips', 'ripsUsageGif')
                .addChoice('Share', 'shareUsageGif')
                .setRequired(true)),
    async execute(interaction) {
        const command = interaction.options.getString('command');

        return await interaction.reply({ files: [interaction.client.config.usageGifs[command]] });
    },
};
