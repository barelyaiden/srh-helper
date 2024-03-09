const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Delete a ripped asset from the database.')
        .addIntegerOption(option => 
            option.setName('entry-id')
                .setDescription('The ID of the ripped asset entry.')
                .setRequired(true)),
    async execute(interaction) {
        const entryId = await interaction.options.getInteger('entry-id');

        const row = await interaction.client.RippedAssets.findOne({ where: { id: entryId } });

        const noRippedAssetEmbed = new EmbedBuilder()
            .setColor(interaction.client.config.colors.redColor)
            .setAuthor({ name: `Ripped asset entry #${entryId} does not exist.`, iconURL: interaction.client.config.assets.avatar });

        if (!row) return await interaction.reply({ embeds: [noRippedAssetEmbed], ephemeral: true });

        await interaction.client.RippedAssets.destroy({ where: { id: entryId } });

        const successEmbed = new EmbedBuilder()
            .setColor(interaction.client.config.colors.redColor)
            .setAuthor({ name: `Successfully deleted ripped asset entry #${entryId} from the database.`, iconURL: interaction.client.config.assets.avatar });

        return await interaction.reply({ embeds: [successEmbed], ephemeral: true });
    },
};
