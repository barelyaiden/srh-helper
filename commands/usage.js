const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('usage')
        .setDescription('Get GIFs that show you how to use a certain command.')
        .addStringOption(option => 
            option.setName('command')
                .setDescription('The command you want to learn how to use.')
                .addChoice('Delete', 'delete')
                .addChoice('Rips', 'rips')
                .addChoice('Share', 'share')
                .setRequired(true)),
    async execute(interaction) {
        const command = interaction.options.getString('command');

        if (command === 'delete') return await interaction.reply({ content: 'https://cdn.discordapp.com/attachments/880464361175547935/882194488511057951/zVxroTpeFv.gif' });
        if (command === 'rips') return await interaction.reply({ content: 'https://cdn.discordapp.com/attachments/880464361175547935/882194849464451072/VLbfLar3PE.gif' });
        if (command === 'share') return await interaction.reply({ content: 'https://cdn.discordapp.com/attachments/880464361175547935/882195442006380564/919DIf9lIW.gif' });
    },
};
