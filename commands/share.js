const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('share')
        .setDescription('Share a ripped asset from a Sonic game.')
        .setDefaultPermission(false)
        .addStringOption(option => 
            option.setName('game')
                .setDescription('The game the ripped asset belongs to.')
                .addChoice('Sonic Adventure Series', 'sonic_adventure')
                .addChoice('Sonic Heroes', 'sonic_heroes')
                .addChoice('Shadow The Hedgehog', 'shadow_05')
                .addChoice('Sonic The Hedgehog (2006)', 'sonic_06')
                .addChoice('Sonic Unleashed', 'sonic_unleashed')
                .addChoice('Sonic The Hedgehog 4 Series', 'sonic_4')
                .addChoice('Sonic Colors', 'sonic_colors')
                .addChoice('Sonic Generations', 'sonic_generations')
                .addChoice('Sonic Boom', 'sonic_boom')
                .addChoice('Sonic Lost World', 'sonic_lost_world')
                .addChoice('Sonic Forces', 'sonic_forces')
                .addChoice('Sonic and the Secret Rings', 'sonic_rings')
                .addChoice('Sonic and the Black Knight', 'sonic_knight')
                .addChoice('Sonic Rush Series', 'sonic_rush')
                .addChoice('Sonic Riders Series', 'sonic_riders')
                .addChoice('Team Sonic Racing', 'team_sonic_racing')
                .addChoice('Mario & Sonic at the Olympic Games Series', 'olympics')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('category')
                .setDescription('The category the ripped asset belongs to.')
                .addChoice('Character', 'character')
                .addChoice('Boss', 'boss')
                .addChoice('Enemy', 'enemy')
                .addChoice('Vehicle', 'vehicle')
                .addChoice('Stage', 'stage')
                .addChoice('Video', 'video')
                .addChoice('Audio', 'audio')
                .addChoice('HUD', 'hud')
                .addChoice('Miscellaneous', 'misc')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the ripped asset.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('link')
                .setDescription('The download link of the ripped asset.')
                .setRequired(true)),
    async execute(interaction) {
        const game = interaction.options.getString('game');
        const category = interaction.options.getString('category');
        const name = interaction.options.getString('name');
        const link = interaction.options.getString('link');

        const invalidDownloadLinkEmbed = new MessageEmbed()
            .setColor(interaction.client.config.colors.redColor)
            .setAuthor('Please input a valid download link for your ripped asset.', interaction.client.config.assets.avatar);

        if (!link.startsWith('https')) return await interaction.reply({ embeds: [invalidDownloadLinkEmbed], ephemeral: true });

        await interaction.client.RippedAssets.create({
            game: game,
            category: category,
            author: interaction.user.tag,
            name: name,
            link: link
        });

        const successEmbed = new MessageEmbed()
            .setColor(interaction.client.config.colors.redColor)
            .setAuthor('Successfully submitted your ripped asset to the database!', interaction.client.config.assets.avatar);

        return await interaction.reply({ embeds: [successEmbed] });
    },
};
