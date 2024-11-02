const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('share')
        .setDescription('Share a ripped asset from a Sonic game.')
        .addStringOption(option => 
            option.setName('game')
                .setDescription('The game the ripped asset belongs to.')
                .setRequired(true)
                .addChoices(
                    { name: 'Sonic Adventure Series', value: 'sonic_adventure' },
                    { name: 'Sonic Heroes', value: 'sonic_heroes' },
                    { name: 'Shadow The Hedgehog', value: 'shadow_05' },
                    { name: 'Sonic The Hedgehog (2006)', value: 'sonic_06' },
                    { name: 'Sonic Unleashed', value: 'sonic_unleashed' },
                    { name: 'Sonic The Hedgehog 4 Series', value: 'sonic_4' },
                    { name: 'Sonic Colors Series', value: 'sonic_colors' },
                    { name: 'Sonic Generations', value: 'sonic_generations' },
                    { name: 'Sonic Boom', value: 'sonic_boom' },
                    { name: 'Sonic Mobile Games', value: 'sonic_mobile' },
                    { name: 'Sonic Lost World', value: 'sonic_lost_world' },
                    { name: 'Sonic Forces', value: 'sonic_forces' },
                    { name: 'Sonic Frontiers', value: 'sonic_frontiers' },
                    { name: 'Sonic Superstars', value: 'sonic_superstars' },
                    { name: 'SONIC X SHADOW GENERATIONS', value: 'sonic_shadow_generations' },
                    { name: 'Sonic and the Secret Rings', value: 'sonic_rings' },
                    { name: 'Sonic and the Black Knight', value: 'sonic_knight' },
                    { name: 'Sonic Rush Series', value: 'sonic_rush' },
                    { name: 'Sonic Riders Series', value: 'sonic_riders' },
                    { name: 'Team Sonic Racing', value: 'team_sonic_racing' },
                    { name: 'Mario & Sonic at the Olympic Games Series', value: 'olympics' },
                ))
        .addStringOption(option =>
            option.setName('category')
                .setDescription('The category the ripped asset belongs to.')
                .setRequired(true)
                .addChoices(
                    { name: 'Character', value: 'character' },
                    { name: 'Boss', value: 'boss' },
                    { name: 'Enemy', value: 'enemy' },
                    { name: 'Vehicle', value: 'vehicle' },
                    { name: 'Stage', value: 'stage' },
                    { name: 'Video', value: 'video' },
                    { name: 'Audio', value: 'audio' },
                    { name: 'HUD', value: 'hud' },
                    { name: 'Miscellaneous', value: 'misc' },
                ))
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the ripped asset.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('link')
                .setDescription('The download link of the ripped asset.')
                .setRequired(true)),
    async execute(interaction) {
        const game = await interaction.options.getString('game');
        const category = await interaction.options.getString('category');
        const name = await interaction.options.getString('name');
        const link = await interaction.options.getString('link');

        const invalidDownloadLinkEmbed = new EmbedBuilder()
            .setColor(interaction.client.config.colors.redColor)
            .setAuthor({ name: 'Please input a valid download link for your ripped asset.', iconURL: interaction.client.config.assets.avatar });

        if (!link.startsWith('https')) return await interaction.reply({ embeds: [invalidDownloadLinkEmbed], ephemeral: true });

        await interaction.client.RippedAssets.create({
            game: game,
            category: category,
            author: interaction.user.username,
            name: name,
            link: link
        });

        const successEmbed = new EmbedBuilder()
            .setColor(interaction.client.config.colors.redColor)
            .setAuthor({ name: 'Successfully submitted your ripped asset to the database!', iconURL: interaction.client.config.assets.avatar })
            .addFields(
                { name: 'Game:', value: game },
                { name: 'Category:', value: category },
                { name: 'Name:', value: name },
                { name: 'Link:', value: link },
            );

        await interaction.reply({ embeds: [successEmbed] });
    },
};
