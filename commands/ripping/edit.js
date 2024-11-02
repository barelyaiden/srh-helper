const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('edit')
        .setDescription('Edit a ripped asset entry in the database.')
        .addIntegerOption(option => 
            option.setName('id')
                .setDescription('The ID of the asset entry.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The updated name of the entry.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('link')
                .setDescription('The updated link of the entry.')
                .setRequired(true)),
    async execute(interaction) {
        const id = interaction.options.getInteger('id');
        const name = interaction.options.getString('name');
        const link = interaction.options.getString('link');

        const invalidDownloadLinkEmbed = new EmbedBuilder()
            .setColor(interaction.client.config.colors.redColor)
            .setAuthor({ name: 'Please input a valid download link for your ripped asset.', iconURL: interaction.client.config.assets.avatar });

        if (!link.startsWith('https')) return await interaction.reply({ embeds: [invalidDownloadLinkEmbed], ephemeral: true });

        const rip = await interaction.client.RippedAssets.findOne({ where: { id: id } });
        await rip.update({ name: name, link: link });
        
        const successEmbed = new EmbedBuilder()
            .setColor(interaction.client.config.colors.redColor)
            .setAuthor({ name: 'Successfully the entry!', iconURL: interaction.client.config.assets.avatar })
            .addFields(
                { name: 'ID:', value: `${id}` },
                { name: 'Name:', value: name },
                { name: 'Link:', value: link },
            );
            
        await interaction.reply({ embeds: [successEmbed] });
    },
};
