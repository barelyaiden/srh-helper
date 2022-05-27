const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Delete a ripped asset from the database.')
        .setDefaultPermission(false)
        .addIntegerOption(option => 
            option.setName('entry-id')
                .setDescription('The ID of the ripped asset entry.')
                .setRequired(true)),
    async execute(interaction) {
        const entryId = interaction.options.getInteger('entry-id');

        const row = await interaction.client.RippedAssets.findOne({ where: { id: entryId } });

        const noRippedAssetEmbed = new MessageEmbed()
            .setColor(interaction.client.config.colors.redColor)
            .setAuthor({ name: 'That ripped asset entry does not exist.', iconURL: interaction.client.config.assets.avatar })
            .addField('Entry Id:', `${entryId}`);

        if (!row) return await interaction.reply({ embeds: [noRippedAssetEmbed], ephemeral: true });

        if (!interaction.member.roles.cache.some(role => role.name === interaction.client.config.roles.moderationRoleName)) {
            const noPermissionEmbed = new MessageEmbed()
                .setColor(interaction.client.config.colors.redColor)
                .setAuthor({ name: 'You do not have permission to delete that ripped asset entry from the database.', iconURL: interaction.client.config.assets.avatar });

            if (interaction.user.tag !== row.author) return await interaction.reply({ embeds: [noPermissionEmbed], ephemeral: true });
        }

        await interaction.client.RippedAssets.destroy({ where: { id: entryId } });

        const successEmbed = new MessageEmbed()
            .setColor(interaction.client.config.colors.redColor)
            .setAuthor({ name: 'Successfully deleted the ripped asset from the database.', iconURL: interaction.client.config.assets.avatar })
            .addField('Entry Id:', `${entryId}`);

        return await interaction.reply({ embeds: [successEmbed], ephemeral: true });
    },
};
